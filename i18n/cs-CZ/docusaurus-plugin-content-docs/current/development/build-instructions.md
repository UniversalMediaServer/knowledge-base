# Pokyny pro sestavení

Tento dokument popisuje, jak sestavit Universal Media Server ze zdrojových souborů.

_Důležitá poznámka:_
Hotová vydání Universal Media Serveru si můžete stáhnout z http://www.universalmediaserver.com/, takže jako běžný uživatel tyto kroky NEMUSÍTE provádět.

Jsou vyžadovány následující balíčky programů:

- Java JDK 17 (JRE nestačí)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

# Krátké pokyny

Pokud jsou nainstalovány všechny požadované balíky, následující příkazy
stáhnou nejnovější zdroje a sestaví UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

`PACKAGENAME` označuje cílový operační systém: `windows`, `macos`, `macos-arm`, `macos-pre1015` nebo `linux-*`. Hvězdičku `*` nahraďte jednou z architektur: `x86`, `x86_64`, `arm64`, `armel` nebo `armhf`.

Výsledné soubory se vytvoří v adresáři „target“:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Úplné pokyny

Nejprve musí být nainstalován požadovaný software:

## 1. Stáhněte a nainstalujte Java JDK 17

Viz https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Stáhněte a nainstalujte Git

Viz https://git-scm.com/

## 3. Stáhněte a rozbalte Maven

Viz http://maven.apache.org/

## 4. Nastavte proměnné prostředí

### Windows

Vytvořte nové proměnné, nebo pokud už existují, připojte k nim uvedenou hodnotu:

- Úroveň: Systém, proměnná: `JAVA_HOME`, hodnota: umístění instalace JDK
- Úroveň: Uživatel, proměnná: `M2_HOME`, hodnota: adresář, do kterého jste rozbalili Maven
- Úroveň: Uživatel, proměnná `M2`, hodnota: `%M2_HOME%\bin`
- Úroveň: Uživatel, proměnná `PATH`, hodnota `%M2%`

### Linux

Není třeba nic nastavovat.

### macOS

Není třeba nic nastavovat.

## 5. Stáhněte zdrojový kód UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Aktualizujte zdrojový kód na nejnovější verzi (volitelné)

```bash
git pull
```

## 7. Zkompilujte nejnovější verzi UMS

```bash
mvn package -P PACKAGENAME
```

`PACKAGENAME` označuje cílový operační systém: `windows`, `macos`, `macos-arm`, `macos-pre1015` nebo `linux-*`. Hvězdičku `*` nahraďte jednou z architektur: `x86`, `x86_64`, `arm64`, `armel` nebo `armhf`.

Pomocí volitelného přepínače můžete přeskočit stahování binárních souborů. To může urychlit sestavení, zejména ve Windows a Linuxu:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Výsledné binární soubory se vytvoří v adresáři „target“:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Automatická sestavení

Tyto poslední dva příkazy mohou být snadno automatizovány pomocí skriptu, např.:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### Linux, macOS a další systémy

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# Vytváření balíčků a křížová kompilace

Tato část vysvětluje, jak zkompilovat program a vytvořit balíček pro jeden operační systém při práci v jiném systému.

## Sestavení binárních souborů pro Windows

Instalátor pro Windows (`UMS-setup.exe`) a spustitelný soubor pro Windows (`UMS.exe`) lze sestavit i na jiných platformách.

Nejprve budete muset mít nainstalovaný binární soubor `makensis`. Na Debianu/Ubuntu
to lze provést pomocí:

```bash
sudo apt-get install nsis
```

Poté nastavte proměnnou prostředí `NSISDIR` na **absolutní cestu** k adresáři `nsis`. Proměnnou můžete nastavit pro jednotlivý příkaz:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Nebo:

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

Pro stručnost následující příklady předpokládají, že proměnná už je nastavena.

Instalátor pro Windows nyní můžete sestavit jedním z následujících příkazů:

### Na Linuxu a macOS

```bash
mvn package -P system-makensis,windows
```

## Vytvoření archivu tar pro Linux

### Na Windows a macOS

```bash
mvn package -P linux-*
```

kde `*` je jedna z hodnot: x86, x86_64, arm64, armel nebo armhf

## Vytvoření obrazu disku pro macOS

### Na Windows a Linuxu

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Vytvoření instalátoru s průvodcem pro macOS

1. Sestavte UMS
2. Nainstalujte http://s.sudre.free.fr/Software/Packages/about.html
3. Nastavte proměnnou s cestou k sestavené distribuci, například:

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Nahraďte příslušné cesty v souboru .pkgproj

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Sestavte instalátor .pkg. Výsledný soubor se vytvoří v `/target/Universal Media Server.pkg`.

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Rychlé sestavení

Pro rychlé ověřování změn během vývoje doporučujeme skripty pro rychlé sestavení. Skripty zkompilují Java kód, vloží jej do výchozího instalačního adresáře
a spustí program, který ukončí všechny existující instance UMS.

Měly by fungovat v 64bitových Windows a v macOS. V případě potřeby je lze snadno rozšířit i pro další systémy.

```bash
mvn verify -P quickrun-* -DskipTests
```

Kde `*` je `macos` nebo `windows`.
