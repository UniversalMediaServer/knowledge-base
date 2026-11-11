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
- Fichier d'illustration: `Jazz.jpg` (or `Jazz.webp`, `Jazz.png`, and so on)

Si aucun fichier d'illustration correspondant à la playlist n'est trouvé, l'illustration du dossier est utilisée à la place.

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

## Web streams inside a playlist

The naming rules above work because there is a file to put the image next to. An internet radio
station or any other web address listed in a playlist has no such file, so it needs a different way
to carry its artwork: a `#EXTIMG:` line that points at the picture.

Put the line directly **above** the entry it belongs to, the same way `#EXTINF:` works. It applies to
the next entry only, so each stream gets its own line:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

UMS downloads the image once, stores it, and uses it for that stream from then on. It does not fetch
it again on every start.

What the line accepts:

- An **absolute** address. `https://example.com/cover.png` works, `cover.png` and `../art/cover.png`
  do not — a relative path is ignored and the stream keeps the default image.
- A `data:` URI, if you would rather keep the picture inside the playlist file than host it somewhere.
- Only `.m3u` and `.m3u8` playlists. Other playlist formats have no place to put the line.

Capitalization of the directive itself does not matter, `#EXTIMG:` and `#extimg:` both work.

### Letting UMS write the line for you

If your control point can set the artwork of an entry, you do not have to edit the playlist by hand.
UMS writes the `#EXTIMG:` line into the playlist file itself, and only after it has successfully
loaded the picture — so a broken address leaves the file untouched instead of storing a dead link.

Because the artwork then lives in the playlist file rather than only in the database, it survives a
rebuilt database and travels with the file when you copy the playlist elsewhere.
