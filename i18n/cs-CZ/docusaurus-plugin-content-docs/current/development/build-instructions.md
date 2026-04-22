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
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
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

# Balení a křížové kompilace

Tato část vysvětluje, jak je možné zkompilovat a balit pro jeden systém zatímco pro jiný.

## Vytváření binárních souborů Windows

Instalační systémy Windows (`UMS-setup.exe`) a spustitelné Windows (`UMS.exe`) mohou být postaveny na jiných platformách než Windows.

Nejprve budete muset mít nainstalovaný binární soubor `makensis`. Na Debianu/Ubuntu
to lze provést pomocí:

```bash
sudo apt-get install nsis
```

Pak je nutné nastavit prostředí `NSISDIR` na **absolutní cestu** do adresáře
`nsis`. Toto může být nastaveno pro každý příkaz:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Zatím:

- Dočasně v aktuálním shellu:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Nebo trvale:
    ```bash
    # Tyto dva příkazy musí být spuštěny pouze jednou
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Pro stručnost se v následujících příkladech předpokládá, že to bylo již nastaveno.

Instalační systém Windows může být nyní vytvořen jedním z následujících příkazů:

### Na Linuxu a macOS

```bash
mvn package -P system-makensis,windows
```

## Vytváření linuxového tarbalu

### Na Windows a macOS

```bash
mvn package -P linux-*
```

kde `*` je jeden z: x86, x86_64, arm64, armel, nebo armhf

## Vytváření macOS obrazu disku

### Na Windows a Linuxu

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Budování průvodce intalací macOS

1. Sestavit UMS
2. Nainstalujte http://s.sudre.free.fr/Software/Packages/about.html
3. Nastavte proměnnou ukládající cestu k adresáři souboru, např.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Nahradit požadovanou cestu uvnitř .pkgproj souboru

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Postav .pkg instalátor. Toto bude výstup na `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Rychlé sestavení

Máme rychle sestavené skripty, které jsou doporučeny během vývoje pro rychlou
iteraci. Skripty zkompilují Java kód, vloží jej do výchozího instalačního adresáře
a spustí program, který ukončí všechny existující instance UMS.

Měl by fungovat pro 64bitové Windows a macOS. Lze snadno rozšířit i pro ostatní, je-li to žádoucí.

```bash
mvn verify -P quickrun-* -DskipTests
```

Kde je `*` je `macos` nebo `windows`
