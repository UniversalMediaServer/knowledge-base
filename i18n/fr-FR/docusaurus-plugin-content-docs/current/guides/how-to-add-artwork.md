# Comment ajouter une illustration

Vous pouvez ajouter vos propres illustrations pour les dossiers et les listes de lecture afin que votre interface affiche des vignettes personnalisées au lieu des images par défaut génériques.

Ce guide explique :

- Quels formats d'image sont pris en charge
- Comment nommer les fichiers d'illustrations
- Où placer ces fichiers
- Que se passe-t-il lorsqu'une image de liste de lecture est manquante ?

## Formats d'image pris en charge

Les types de fichiers suivants sont pris en charge et vérifiés dans cet ordre. Le premier fichier image correspondant est utilisé :

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Vous pouvez utiliser n'importe lequel de ces formats aussi bien pour les pochettes d'albums que pour celles des listes de lecture.

## Dossier

Pour définir une image de couverture pour un dossier, placez un fichier image nommé `folder.ext` à l'intérieur de ce dossier.

Remplacez `.ext` par une des extensions supportées.

Exemples :

- `dossier.webp`
- `dossier.jpg`
- `dossier.png`

## Listes de lecture

Pour définir une image de couverture pour une liste de lecture, utilisez le même nom de fichier de base que celui du fichier de la liste de lecture.

Exemple :

- Fichier de la playlist : `Jazz.m3u8`
- Artwork file: `Jazz.jpg` (or `Jazz.webp`, `Jazz.png`, and so on)

If a matching playlist artwork file is not found, the folder artwork is used as a fallback.

## Example folder structure

Use this as a reference:

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

In this example:

- `Music/folder.jpg` is the artwork for the top-level `Music` folder.
- `Music/Jazz/folder.png` is the artwork for the `Jazz` folder.
- `Music/Jazz/Jazz.jpg` is used for the `Jazz.m3u8` playlist.
- `Music/Jazz/Smooth.m3u8` has no matching `Smooth.*` image, so the `Jazz` folder artwork is used.

