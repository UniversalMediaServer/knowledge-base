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
mvn package -P PACKAGENAME
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

## 6. Mettre à jour vers la dernière source (optionnel)

```bash
git pull
```

## 7. Compiler la dernière version de UMS

```bash
mvn package -P PACKAGENAME
```

Où `PACKAGENAME` est le nom du système d'exploitation cible: `windows`, `macos`, `macos-arm`, `macos-pre1015` ou `linux-*`, où `*` est l'architecture ; un des : `x86`, `x86_64`, `arm64`, `armel`, ou `armhf`

Vous pouvez également spécifier un indicateur facultatif si vous voulez ignorer le téléchargement de binaires, qui peut être utile pour accélérer le temps de compilation, en particulier sous Windows et Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Les binaires qui en résulteront seront compilés dans le répertoire « target » :

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS : `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Compilations automatiques

Ces deux dernières commandes peuvent facilement être automatisées en utilisant un script, par exemple:

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

# Emballage et compilation croisée

Cette section explique comment il est possible de compiler et d'empaqueter un système sur un autre.

## Construction des binaires Windows

Les installateurs Windows (`UMS-setup.exe`) et l'exécutable Windows (`UMS.exe`) peuvent être construits sur des plates-formes non-Windows.

Tout d'abord, vous aurez besoin d'avoir le binaire `makensis` installé. Sur Debian/Ubuntu,
cela peut être fait avec:

```bash
sudo apt-get install nsis
```

Puis l'environnement `NSISDIR` doit être défini sur le **chemin absolu** du répertoire
`nsis`. Cela peut soit être défini par commande :

```bash
NSISDIR=$PWD/src/main/external-resources/third party/nsis mvn ...
```

Soit :

- Temporairement dans le shell actuel :
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third party/nsis
    mvn ...
    ```
- Ou définitivement:
    ```bash
    # Ces deux commandes n'ont besoin d'être exécutées qu'une fois
    echo "export NSISDIR=$PWD/src/main/external-resources/third party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Pour des raisons de concision, les exemples suivants supposent qu'il a déjà été défini.

L'installateur Windows peut maintenant être compilé avec l'une des commandes suivantes :

### Sous Linux et macOS

```bash
mvn paquet -P system-makensis,windows
```

## Construire une archive Linux

### Sous Windows et macOS

```bash
mvn package -P linux-*
```

où `*` fait partie de : x86, x86_64, arm64, armel, ou armhf

## Construction de l'image disque macOS

### Sous Windows et Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Construction de l'assistant d'installation macOS

1. Construire UMS
2. Installez http://s.sudre.free.fr/Software/Packages/about.html
3. Définit une variable de stockage du répertoire du fichier de distribution de compilation, par ex.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Remplacer le chemin souhaité dans le fichier .pkgproj

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

Où `*` est `macos` ou `windows`
