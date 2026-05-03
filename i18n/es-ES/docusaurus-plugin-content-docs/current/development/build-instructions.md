# Instrucciones de compilación

Este documento describe cómo compilar Universal Media Server a partir de los archivos fuente.

_Nota importante:_
Los lanzamientos de precompilaciones de Universal Media Server se pueden descargar desde: http://www.universalmediaserver.com/ por lo que NO necesita ejecutar estos pasos como usuario general.

Se requieren los siguientes paquetes de software:

- Java JDK 17 (el JRE no es suficiente)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

Lea la sección [Instrucciones completas](#full-instructions) para obtener una explicación completa de cómo instalar todo el software necesario y cómo compilar UMS para cada sistema operativo.

# Instrucciones cortas

Si se han instalado todos los paquetes de software requeridos, los siguientes comandos descargarán el código fuente más reciente y la compilación UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Donde `PACKAGENAME` es el nombre del sistema operativo objetivo: `windows`, `macos`, `macos-arm`, `macos-pre1015` o `linux-*`, donde `*` es la arquitectura; una de: `x86`, `x86_64`, `arm64`, `armel` o `armhf`.

El resultado se compilará en el directorio "target":

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Instrucciones completas

Primero se debe instalar todo el software requerido:

## 1. Descargar e instala Java JDK 17.

Consulte https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Descargar e instala Git

Consulte https://git-scm.com/

## 3. Descargar y extraer Maven

Consulte http://maven.apache.org/

## 4. Establecer variables de entorno

### Windows

Crea nuevas variables o agrega el valor si la variable ya existe:

- Level: System, variable: `JAVA_HOME`, value: JDK install location
- Level: User, variable `M2_HOME`, value: Maven extract location
- Level: User, variable `M2`, value: `%M2_HOME%\bin`
- Level: User, variable `PATH`, value `%M2%`

### Linux

No hacer nada.

### macOS

No hacer nada.

## 5. Descarga el código fuente UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Actualizar a la última versión (opcional)

```bash
git pull
```

## 7. Compilar la última versión de UMS

```bash
mvn package -P PACKAGENAME
```

Donde `PACKAGENAME` es el nombre del sistema operativo objetivo: `windows`, `macos`, `macos-arm`, `macos-pre1015` o `linux-*`, donde `*` es la arquitectura; una de: `x86`, `x86_64`, `arm64`, `armel`, o `armhf`

También puedes especificar una bandera opcional si quieres omitir la descarga de binarios, lo que puede ser útil para acelerar el tiempo de compilación, particularmente en Windows y Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Los binarios resultantes se compilarán en el directorio "target":

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Compilaciones automáticas

Estos dos últimos comandos se pueden automatizar fácilmente usando un script p. ej.:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### Linux, macOS &c.

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# Empaquetado y compilación cruzada

Esta sección explica cómo es posible compilar y empaquetar para un sistema mientras se está en otro.

## Compilación de binarios de Windows

Los instaladores de Windows (`UMS-setup.exe`) y el ejecutable de Windows (`UMS.exe`) se pueden compilar en plataformas que no sean Windows.

Primero que todo, necesitarás tener instalado el binario `makensis`. En Debian/Ubuntu, esto se puede hacer con:

```bash
sudo apt-get install nsis
```

Después es necesario establecer la **ruta absoluta** del entorno `NSISDIR` con el directorio `nsis`. Esto se puede establecer por comando:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Either:

- Temporalmente en el shell actual:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- O permanentemente:
    ```bash
    # these two commands only need to be run once
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

For the sake of brevity, the following examples assume it has already been set.

The Windows installer can now be built with one of the following commands:

### En Linux y macOS

```bash
mvn package -P system-makensis,windows
```

## Compilando un tarball de Linux

### En Windows y macOS

```bash
mvn package -P linux-*
```

donde `*` es uno de: x86, x86_64, arm64, armel o armhf

## Compilando la imagen de disco de macOS

### En Windows y Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Compilando el instalador del asistente de macOS

1. Compilar UMS
2. Instalar http://s.sudre.free.fr/Software/Packages/about.html
3. Set a variable storing the directory path of the build distribution file, e.g.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Replace desired path inside the .pkgproj file

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Compilar instalador .pkg. This will output to `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Compilaciones rápidas

Disponemos de scripts de compilación rápidos que se recomiendan durante el desarrollo para una iteración rápida. The scripts will compile the Java code, put it in the default install
directory, and run the program, which will close any existing instance of UMS.

It should work for 64-bit Windows and macOS. Can be extended for others easily if desired.

```bash
mvn verify -P quickrun-* -DskipTests
```

Donde `*` es `macOS` o `windows`
