# Pokyny pro sestavení

Tento dokument popisuje, jak vytvořit Universal Media Server ze zdrojových souborů.

_Důležitá poznámka:_
Předsestavené verze Universal Media Server mohou být staženy z: http://www. universalmediaserver.com/ takže nemusíte tyto kroky spustit jako obecný uživatel.

Jsou vyžadovány následující balíčky programů:

- Java JDK 17 (JRE nestačí)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

V sekci [plné instrukce] (#full-instructions) najdete kompletní vysvětlení jak instalovat všechen potřebný software a jak vytvořit UMS pro každý operační systém.

# Krátké pokyny

Pokud jsou nainstalovány všechny požadované balíky, následující příkazy
stáhnou nejnovější zdroje a sestaví UMS:

```bash
git klonone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Kde `PACKAGENAME` je název cílového operačního systému: `windows`, `macos-arm`, `macos-pre1015` nebo `linux-*`, kde `*` je architektura; jeden z: `x86`, `x86_64`, `arm64`, `armel`, nebo `armhf`

Výsledek bude uložen v adresáři "cíl":

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Úplné pokyny

Nejprve musí být nainstalován požadovaný software:

## 1. Stáhnout a nainstalovat Java JDK 17

Viz https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Stáhnout a nainstalovat Git

Viz https://git-scm.com/

## 3. Stáhnout a extrahovat Maven

Viz http://maven.apache.org/

## 4. Nastavit proměnné prostředí

### Windows

Vytvořit nové proměnné nebo přidat hodnotu, pokud proměnná již existuje:

- Úroveň: System, proměnná: `JAVA_HOME`, hodnota: JDK instalační umístění
- Úroveň: Uživatel, proměnná `M2_HOME`, hodnota: umístění extraktu Maven
- Úroveň: Uživatel, proměnná `M2`, hodnota: `%M2_HOME%\bin`
- Úroveň: Uživatel, proměnná `PATH`, hodnota `%M2%`

### Linux

Žádná akce.

### macOS

Žádná akce.

## 5. Stáhnout zdrojový kód UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Aktualizovat na nejnovější zdroj (volitelné)

```bash
git pull
```

## 7. Kompilovat nejnovější verzi UMS

```bash
mvn package -P PACKAGENAME
```

Kde `PACKAGENAME` je název cílového operačního systému: `windows`, `macos-arm`, `macos-pre1015` nebo `linux-*`, kde `*` je architektura; jeden z: `x86`, `x86_64`, `arm64`, `armel`, nebo `armhf`

Pokud chcete přeskočit stahování binárních souborů, můžete také zadat volitelný příznak. což může být užitečné pro urychlení přípravy, zejména na Windows a Linuxu:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Výsledek bude uložen v adresáři "target":

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Automatické sestavení

Tyto poslední dva příkazy mohou být snadno automatizovány pomocí skriptu, např.:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn balíček
```

### Linux, macOS &c.

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn balík
```

# Balení a křížové kompilace

Tato část vysvětluje, jak je možné zkompilovat a balit pro jeden systém zatímco pro jiný.

## Vytváření binárních souborů Windows

Instalační systémy Windows (`UMS-setup.exe`) a spustitelné Windows (`UMS.exe`) mohou být postaveny na jiných platformách než Windows.

Nejprve budete muset mít nainstalovaný binární soubor `makensis`. On Debian/Ubuntu,
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
