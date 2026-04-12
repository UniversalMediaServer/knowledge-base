# Instructions de construction

Ce document décrit comment construire Universal Media Server à partir des fichiers source.

_Note importante :_
Les versions précompilées de Universal Media Server peuvent être téléchargées depuis : http://www. niversalmediaserver.com/ donc vous NE devez PAS exécuter ces étapes en tant qu'utilisateur général.

Les progiciels suivants sont requis :

- Le JDK Java 17 (le JRE ne suffit pas)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

Lisez la section [Instructions complètes] (#full-instructions) pour une explication complète de la façon dont
installer tous les logiciels nécessaires et comment construire UMS pour chaque système d'exploitation.

# Instructions de construction

Si tous les paquets logiciels nécessaires sont installés, les commandes suivantes
téléchargeront les dernières sources et compileront les UMS :

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
paquet mvn -P PACKAGENAME
```

Où `PACKAGENAME` est le nom du système d'exploitation cible: `windows`, `macos`, `macos-arm`, `macos-pre1015` ou `linux-*`, où `*` est l'architecture ; un des : `x86`, `x86_64`, `arm64`, `armel`, ou `armhf`

Le résultat sera compilé dans le répertoire « target » :

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Instructions complètes

Tout d'abord, le logiciel requis doit être installé :

## 1. Télécharger et installer Java JDK 17

Voir https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Télécharger et installer Git

Voir https://git-scm.com/

## 3. Télécharger et extraire Maven

Voir http://maven.apache.org/

## 4. Définir les variables d'environnement

### Windows

Créer de nouvelles variables ou ajouter la valeur si la variable existe déjà:

- Niveau : Système, variable: `JAVA_HOME`, valeur: emplacement d'installation JDK
- Niveau : Utilisateur, variable `M2_HOME`, valeur: emplacement d'extraction Maven
- Niveau : Utilisateur, variable `M2`, valeur: `%M2_HOME%\bin`
- Niveau : Utilisateur, variable `PATH`, valeur `%M2%`

### Linux

Rien à faire.

### macOS

Rien à faire.

## 5. Télécharger le code source UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Update to the latest source (optional)

```bash
git pull
```

## 7. Compile the latest version of UMS

```bash
mvn package -P PACKAGENAME
```

Where `PACKAGENAME` is the name of the target operating system: `windows`, `macos`, `macos-arm`, `macos-pre1015` or `linux-*`, where `*` is the architecture; one of: `x86`, `x86_64`, `arm64`, `armel`, or `armhf`

You can also specify an optional flag if you want to skip downloading binaries, which can be useful to speed up build time, particularly on Windows and Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

The resulting binaries will be built in the "target" directory:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Automatic builds

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

5. Construire l'installateur .pkg. Cela affichera dans `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Compilations rapides

Nous disposons de scripts de compilation rapide, recommandés pendant la phase de développement pour permettre des
itérations rapides. Les scripts compileront le code Java, mettez-le dans le répertoire d'installation
par défaut, et exécutez le programme, qui fermera toute instance existante de UMS.

Il devrait fonctionner pour Windows et macOS 64 bits. Peut être étendu à d'autres facilement si désiré.

```bash
mvn verify -P quickrun-* -DskipTests
```

Where `*` is `macos` or `windows`
