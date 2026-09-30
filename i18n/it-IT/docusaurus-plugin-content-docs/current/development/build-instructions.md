# Istruzioni di compilazione

Questo documento descrive come compilare Universal Media Server a partire dai file sorgente.

_Nota importante:_
Le versioni precompilate di Universal Media Server possono essere scaricate all'indirizzo: http://www.universalmediaserver.com/; pertanto NON è necessario eseguire questi passaggi come utente generico.

Sono richiesti i seguenti software:

- Java JDK 17 (il JRE non è sufficiente)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

# Istruzioni brevi

Se tutti i software richiesti sono installati, i seguenti comandi
scaricheranno gli ultimi sorgenti e genereranno UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Dove `PACKAGENAME` è il nome del sistema operativo di destinazione: `windows`, `macos`, `macos-arm`, `macos-pre1015` o `linux-*`, dove `*` è l'architettura; una delle seguenti: `x86`, `x86_64`, `arm64`, `armel`, o `armhf`

Il risultato sarà depositato nella directory "target":

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Istruzioni complete

Prima tutto il software richiesto deve essere installato:

## 1. Scarica e installa Java JDK 17

Vedi https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Scarica e installa Git

Vedi https://git-scm.com/

## 3. Scarica ed estrai Maven

Vedi http://maven.apache.org/

## 4. Impostazione variabili di ambiente

### Windows

Crea nuove variabili o aggiungi il valore se la variabile esiste già:

- Livello: Sistema, variabile: `JAVA_HOME`, valore: path di installazione JDK
- Livello: utente, variabile `M2_HOME`, valore: path di estrazione di Maven
- Livello: Utente, variabile `M2`, valore: `%M2_HOME%\bin`
- Livello: Utente, variabile `PATH`, valore `%M2%`

### Linux

Niente da fare.

### Mac OS X

Niente da fare.

## 5. Scarica il codice sorgente UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Aggiorna i sorgenti all'ultima versione (opzionale)

```bash
git pull
```

## 7. Compila l'ultima versione di UMS

```bash
pacchetto mvn -P PACKAGENAME
```

Dove `PACKAGENAME` è il nome del sistema operativo di destinazione: `windows`, `macos`, `macos-arm`, `macos-pre1015` o `linux-*`, dove `*` è l'architettura; uno di: `x86`, `x86_64`, `arm64`, `armel`, o `armhf`

È anche possibile specificare un flag opzionale se si desidera saltare il download di binari, che può essere utile per accelerare il tempo di compilazione, in particolare su Windows e Linux:

```bash
pacchetto mvn -P PACKAGENAME -Doffline=true
```

I binari risultanti saranno costruiti nella directory "target":

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Compilazioni automatiche

These last two commands can easily be automated using a script e.g.:

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

# Packaging and cross-compilation

This section explains how it is possible to compile and package for one system while on another.

## Building the Windows binaries

The Windows installers (`UMS-setup.exe`) and Windows executable (`UMS.exe`) can be built on non-Windows platforms.

First of all, you'll need to have the `makensis` binary installed. On Debian/Ubuntu,
this can be done with:

```bash
sudo apt-get install nsis
```

Then the `NSISDIR` environment needs to be set to the **absolute path** to the
`nsis` directory. This can either be set per-command:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Either:

- Temporarily in the current shell:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Or permanently:
    ```bash
    # these two commands only need to be run once
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

For the sake of brevity, the following examples assume it has already been set.

The Windows installer can now be built with one of the following commands:

### On Linux and macOS

```bash
mvn package -P system-makensis,windows
```

## Building a Linux tarball

### On Windows and macOS

```bash
mvn package -P linux-*
```

where `*` is one of: x86, x86_64, arm64, armel, or armhf

## Building the macOS disk image

### On Windows and Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Building the macOS wizard installer

1. Build UMS
2. Install http://s.sudre.free.fr/Software/Packages/about.html
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

5. Build .pkg installer. This will output to `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Quick builds

We have quick build scripts that are recommended during development for fast
iteration. The scripts will compile the Java code, put it in the default install
directory, and run the program, which will close any existing instance of UMS.

It should work for 64-bit Windows and macOS. Can be extended for others easily if desired.

```bash
mvn verify -P quickrun-* -DskipTests
```

Where `*` is `macos` or `windows`
