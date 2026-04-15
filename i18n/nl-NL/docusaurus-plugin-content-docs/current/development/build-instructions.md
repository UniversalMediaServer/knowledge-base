# Instructies voor bouwen

Dit document beschrijft hoe je Universal Media Server bouwt van de bronbestanden.

_Belangrijke opmerking:_
Vooraf gebouwde Universal Media Server releases kunnen worden gedownload van: http://www. niversalmediaserver.com/ zodat je deze stappen NIET hoeft uit te voeren als een algemene gebruiker.

De volgende softwarepakketten zijn vereist:

- De Java JDK 17 (de JRE is niet genoeg)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

Lees de [Volledige instructies] (#full-instructions) sectie voor een volledige uitleg over hoe je
alle benodigde software installeert en hoe je UMS voor elk besturingssysteem kunt bouwen.

# Korte instructies

Als alle benodigde softwarepakketten zijn geïnstalleerd, zullen de volgende commando's
de nieuwste broncode downloaden en UMS compileren:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Waar `PACKAGENAME` de naam is van het doel besturingssysteem: `windows`, `macos-arm`, `macos-pre1015` of `linux-*`, waar `*` de architectuur is; één van: `x86`, `x86_64`, `arm64`, `armel`, or `armhf`

Het resultaat zal worden opgebouwd in de "target"-map:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Volledige instructies

Eerst moet alle vereiste software worden geïnstalleerd:

## 1. Download en installeer de Java JDK 17

Zie https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Download en installeer Git

Zie https://git-scm.com/

## 3. Maven downloaden en uitpakken

Zie http://maven.apache.org/

## 4. Instellen omgevingsvariabelen

### Windows

Maak nieuwe variabelen of voeg de waarde toe als de variabele al bestaat:

- Level: System, variable: `JAVA_HOME`, value: JDK install location
- Level: User, variable `M2_HOME`, value: Maven extract location
- Level: User, variable `M2`, value: `%M2_HOME%\bin`
- Level: User, variable `PATH`, value `%M2%`

### Linux

Niets te doen.

### macOS

Niets te doen.

## 5. Download de UMS broncode

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Update naar de nieuwste bron (optioneel)

```bash
git pull
```

## 7. Compileren van de nieuwste versie van UMS

```bash
mvn package -P PACKAGENAME
```

Waar `PACKAGENAME` de naam is van het doel besturingssysteem: `windows`, `macos-arm`, `macos-pre1015` of `linux-*`, waar `*` de architectuur is; één van: `x86`, `x86_64`, `arm64`, `armel`, or `armhf`

Je kunt ook een optionele vlag opgeven als je het downloaden  van binaries wilt overslaan, dit kan handig kunnen zijn om de bouwtijd te versnellen, vooral op Windows en Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

De resulterende binaries zullen in de "target" map worden gebouwd:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Automatische builds

Deze laatste twee commando's kunnen eenvoudig geautomatiseerd worden met behulp van een script, bijvoorbeeld:

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

# Verpakken en samenvoegen

Deze sectie legt uit hoe het mogelijk is om een systeem te compileren en te maken voor een ander systeem.

## De Windows binaries bouwen

De Windows installers (`UMS-setup.exe`) en Windows executable (`UMS.exe`) kunnen op niet-Windows platformen worden gebouwd.

Ten eerste moet het `makensis` binary geïnstalleerd zijn. Op Debian/Ubuntu,
kan dit gedaan worden met:

```bash
sudo apt-get install nsis
```

Dan moet de `NSISDIR` omgeving op het **absolute pad** gezet worden naar de
`nsis` map. Dit kan per commando ingesteld worden:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Of:

- Tijdelijk in de huidige shell:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Of permanent:
    ```bash
    # deze twee opdrachten hoeven eenmaal uitgevoerd te worden
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Om het kort te houden gaan de volgende voorbeelden ervan uit dat dit al gebeurd is.

De Windows installatieprogramma kan nu worden gebouwd met een van de volgende commando's:

### Op Linux en macOS

```bash
mvn package -P system-makensis,windows
```

## Een Linux tarball bouwen

### Op Windows en macOS

```bash
mvn package -P linux-*
```

waar `*` een van: x86, x86_64, arm64, armel, of armhf is

## Bouwen van de macOS-schijf image

### Op Windows en Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Bouw de macOS-wizard installatieprogramma

1. Bouw UMS
2. Installeer http://s.sudre.free.fr/Software/Packages/about.html
3. Stel een variabele in voor het opslaan van de map van het build distributiebestand, b.v.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Vervang gewenste pad in het .pkgproj bestand

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Bouw .pkg installatieprogramma. Dit zal uitvoeren naar `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Snelle builds

We hebben snelle build scripts die worden aanbevolen tijdens het ontwikkelen voor snelle
iteratie. De scripts zullen de Java-code compileren, plaats het in de standaard installatiemap
map en voer het programma uit, elk bestaand exemplaar van UMS zal gesloten worden.

Het zou moeten werken voor 64-bit Windows en macOS. Kan gemakkelijk worden uitgebreid voor anderen indien gewenst.

```bash
mvn verify -P quickrun-* -DskipTests
```

Waar `*` is `macos` of `windows`
