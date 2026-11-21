# Comment ajouter une illustration

Vous pouvez ajouter vos propres illustrations pour les dossiers et les listes de lecture afin que votre interface affiche des vignettes personnalisées au lieu des images par défaut génériques.

Ce guide explique :

- Quels formats d'image sont pris en charge
- Comment nommer les fichiers d'illustrations
- Où placer ces fichiers
- Que se passe-t-il lorsqu'une image de liste de lecture est manquante ?

## Formats d'image pris en charge

UMS prend en charge ces formats d'image pour les fichiers de dossier et de playlist :

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## Dossier

Pour définir une image de couverture pour un dossier, placez un fichier image nommé `folder.ext` à l'intérieur de ce dossier.

Remplacez `.ext` par une des extensions supportées.

Exemples :

- `dossier.webp`
- `dossier.jpg`
- `dossier.png`

### Utiliser des noms de fichiers existants tels que `cover.jpg`

Vous pouvez définir des noms alternatifs pour les illustrations de dossiers. Pour rechercher
`cover.jpg` ou `front.png`, ajoutez cette ligne à `UMS.conf` dans votre dossier de profil UMS, puis redémarrez UMS.

```ini
dossier_thumbnail_names = couverture, devant
```

Entrez les noms sans extensions de fichier et séparez-les par des virgules. La correspondance ignore la casse ; donc `cover` correspond également à `Cover.JPG`.

Avec ce paramètre, UMS recherche d'abord le `répertoire.*`, puis `cover.*`, puis `front.*`, et enfin
les images supportées avec `albumart` dans le nom du fichier. Laissez le paramètre vide pour utiliser la recherche standard
de fichier d'illustration.

L'image sélectionnée peut également servir d'illustration de secours pour les pistes dans le dossier et pour les playlists
locales dans le même répertoire.

## Listes de lecture

Pour définir une image de couverture pour une liste de lecture, utilisez le même nom de fichier de base que celui du fichier de la liste de lecture.

Exemple :

- Fichier de la playlist : `Jazz.m3u8`
- Fichier d'illustration: `Jazz.jpg` (or `Jazz.webp`, `Jazz.png`, and so on)

Pour une playlist locale, UMS vérifie ces sources dans l'ordre.

1. Une image avec exactement le même nom de fichier de base que la playlist, comme `Jazz.jpg` pour `Jazz.m3u8`.
2. Œuvre assignée à cette playlist à travers un point de contrôle compatible.
3. L'œuvre d'art du répertoire, qui peut provenir de `dossier.*`, un nom dans
   `dossier_thumbnail_names`, ou une image `albumart`.

## Structure de dossier d'exemple

Utilisez ceci comme référence :

```text
Music/
|-- folder.jpg
|-- Jazz/
|   |-- folder.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- folder.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

Dans cet exemple :

- « Music/folder.jpg » est l'image de couverture du dossier de niveau supérieur « Music ».
- « Music/Jazz/folder.png » est l'image de couverture du dossier « Jazz ».
- `Music/Jazz/Jazz.jpg` is used for the `Jazz.m3u8` playlist.
- Le fichier `Music/Jazz/Smooth.m3u8` ne contient aucune image correspondant à `Smooth.*` ; c'est donc la pochette du dossier `Jazz` qui est utilisée.

## Flux Web dans une playlist

Les règles de nommage ci-dessus fonctionnent car il y a un fichier à placer à côté de l'image. Une station de radio
ou toute autre adresse Web listée dans une playlist n'a pas de fichier de ce type, donc il a besoin d'une façon différente
pour porter son œuvre : une ligne `#EXTIMG:` qui pointe sur l'image.

Mettez la ligne directement **au-dessus** de l'entrée à laquelle elle appartient, de la même manière que `#EXTINF:` fonctionne. Il s'applique à
seulement à l'entrée suivante, donc chaque flux obtient sa propre ligne:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

UMS télécharge l'image une fois, la stocke et l'utilise pour ce flux à partir de ce moment. Il ne récupère pas
à chaque démarrage.

Ce que la ligne accepte:

- Une adresse **absolue**. `https://example.com/cover.png` fonctionne, `cover.png` et `../art/cover.png`
  ne fonctionnent pas — un chemin relatif est ignoré et le flux conserve l'image par défaut.
- Une URI `data:`, si vous préférez garder l'image dans le fichier de la playlist plutôt que de l'héberger quelque part.
- Seulement les listes de lecture `.m3u` et `.m3u8`. D'autres formats de playlist n'ont pas de place pour mettre la ligne.

La capitalisation de la directive elle-même n'a pas d'importance, `#EXTIMG:` et `#extimg:` fonctionnent tous les deux.

### Laisser UMS écrire la ligne pour vous

Si votre point de contrôle peut définir l'œuvre d'une entrée, vous n'avez pas à modifier la playlist à la main.
UMS écrit la ligne `#EXTIMG:` dans le fichier de la playlist elle-même, et seulement après qu'il ait réussi
chargé l'image — donc une adresse cassée laisse le fichier intact au lieu de stocker un lien mort.

Comme l'illustration est alors stockée dans le fichier de la liste de lecture et non plus seulement dans la base de données, elle survit à une
reconstruction de la base de données et est conservée avec le fichier lorsque vous copiez la liste de lecture ailleurs.
