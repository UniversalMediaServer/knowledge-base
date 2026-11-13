# Pokyny na zostavenie

Tento dokument opisuje, ako zostaviť Universal Media Server zo zdrojových súborov.

_Dôležitá poznámka:_
Hotové vydania Universal Media Server si môžete stiahnuť z http://www.universalmediaserver.com/. Bežný používateľ preto tieto kroky NEMUSÍ vykonávať.

Vyžadujú sa nasledujúce softvérové balíky:

- Java JDK 17 (samotné JRE nestačí)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

# Stručný postup

Ak máte nainštalované všetky potrebné balíky, nasledujúce príkazy stiahnu najnovšie zdrojové kódy a zostavia UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

`PACKAGENAME` je názov cieľového operačného systému: `windows`, `macos`, `macos-arm`, `macos-pre1015` alebo `linux-*`. Znak `*` označuje architektúru: `x86`, `x86_64`, `arm64`, `armel` alebo `armhf`.

Výsledok zostavenia bude v priečinku „target“:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Úplný postup

Najprv nainštalujte všetok potrebný softvér:

## 1. Stiahnite a nainštalujte Java JDK 17

Pozrite si https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Stiahnite a nainštalujte Git

Pozrite si https://git-scm.com/

## 3. Stiahnite a rozbaľte Maven

Pozrite si http://maven.apache.org/

## 4. Nastavte premenné prostredia

### Windows

Vytvorte nové premenné, alebo ak už existujú, pripojte k nim uvedenú hodnotu:

- Úroveň: systémová; premenná: `JAVA_HOME`; hodnota: umiestnenie inštalácie JDK
- Úroveň: používateľská; premenná: `M2_HOME`; hodnota: umiestnenie rozbaleného Mavenu
- Úroveň: používateľská; premenná: `M2`; hodnota: `%M2_HOME%\bin`
- Úroveň: používateľská; premenná: `PATH`; hodnota: `%M2%`

### Linux

Netreba nič nastavovať.

### macOS

Netreba nič nastavovať.

## 5. Stiahnite zdrojový kód UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Aktualizujte zdrojový kód na najnovšiu verziu (voliteľné)

```bash
git pull
```

## 7. Zostavte najnovšiu verziu UMS

```bash
mvn package -P PACKAGENAME
```

`PACKAGENAME` je názov cieľového operačného systému: `windows`, `macos`, `macos-arm`, `macos-pre1015` alebo `linux-*`. Znak `*` označuje architektúru: `x86`, `x86_64`, `arm64`, `armel` alebo `armhf`.

Môžete tiež pridať voliteľný parameter, ktorý preskočí sťahovanie binárnych súborov. To môže zrýchliť zostavenie, najmä v systémoch Windows a Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Výsledné binárne súbory budú v priečinku „target“:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Automatické zostavenia

Posledné dva príkazy možno jednoducho automatizovať pomocou skriptu, napríklad:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### Linux, macOS a ďalšie systémy

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# Vytváranie balíkov a krížová kompilácia

Táto časť vysvetľuje, ako zostaviť a pripraviť balík pre jeden operačný systém pri práci v inom systéme.

## Zostavenie binárnych súborov pre Windows

Inštalátor pre Windows (`UMS-setup.exe`) aj spustiteľný súbor pre Windows (`UMS.exe`) možno zostaviť aj na iných platformách.

Najprv musíte mať nainštalovaný program `makensis`. V systémoch Debian a Ubuntu ho môžete nainštalovať takto:

```bash
sudo apt-get install nsis
```

Potom nastavte premennú prostredia `NSISDIR` na **absolútnu cestu** k priečinku `nsis`. Môžete ju nastaviť pre jednotlivý príkaz:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Alebo:

- Dočasne v aktuálnom shelli:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Prípadne natrvalo:
    ```bash
    # Tieto dva príkazy stačí spustiť raz
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Pre stručnosť nasledujúce príklady predpokladajú, že premenná už je nastavená.

Inštalátor pre Windows teraz môžete zostaviť jedným z nasledujúcich príkazov:

### V systémoch Linux a macOS

```bash
mvn package -P system-makensis,windows
```

## Vytvorenie archívu tar pre Linux

### V systémoch Windows a macOS

```bash
mvn package -P linux-*
```

kde `*` je jedna z hodnôt: x86, x86_64, arm64, armel alebo armhf

## Vytvorenie obrazu disku pre macOS

### V systémoch Windows a Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Vytvorenie sprievodcu inštaláciou pre macOS

1. Zostavte UMS
2. Nainštalujte nástroj z http://s.sudre.free.fr/Software/Packages/about.html
3. Nastavte premennú s cestou k priečinku zostavenej distribúcie, napríklad:

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Nahraďte požadovanú cestu v súbore .pkgproj

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Zostavte inštalátor .pkg. Výsledok sa uloží do `/target/Universal Media Server.pkg`.

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Rýchle zostavenia

Na rýchle opakovanie cyklu úprav počas vývoja odporúčame naše skripty na rýchle zostavenie. Skripty skompilujú kód Javy, umiestnia ho do predvoleného inštalačného priečinka a spustia program. Tým sa ukončí prípadná už spustená inštancia UMS.

Mali by fungovať v 64-bitových systémoch Windows a macOS. V prípade potreby ich možno jednoducho rozšíriť aj pre ďalšie systémy.

```bash
mvn verify -P quickrun-* -DskipTests
```

Znak `*` nahraďte hodnotou `macos` alebo `windows`.
