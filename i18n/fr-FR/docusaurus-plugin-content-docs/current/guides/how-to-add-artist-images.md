# How to add artist images

When you browse your library by artist, UMS can show a picture for each artist instead of a generic
folder icon. The picture does not come from the audio files — it comes from the folder that carries
the artist's name.

## How UMS finds the picture

You tell UMS **one** directory: the one whose subfolders are named after your artists. For an artist,
UMS then looks for a subfolder with exactly that name and uses that folder's artwork.

```
# The directory whose subfolders are named after the artists.
audio_artist_dir = /music/Albums
```

So with a library like this:

```text
/music/Albums/
|-- Frank Sinatra/
|   |-- folder.jpg          <- the picture shown for "Frank Sinatra"
|   `-- Come Fly with Me/
|-- Miles Davis/
|   |-- folder.jpg
|   `-- Kind of Blue/
`-- Zaz/
    `-- Paris/              <- no folder.jpg, so Zaz gets the default icon
```

_Frank Sinatra_ and _Miles Davis_ get their pictures, _Zaz_ does not.

The artwork inside the artist folder follows the ordinary rules, so the file is called `folder.jpg`,
`folder.png`, `folder.webp` and so on. Voir [Comment ajouter un artwork](/guides/how-to-add-artwork) pour la liste complète
des formats pris en charge.

## Deux conditions

Une photo d'artiste n'apparaît que lorsque les deux sont vraies :

1. Un sous-dossier du répertoire d'artistes est nommé **exactement** comme l'artiste, ignorant la capitalisation.
   _Frank Sinatra_ trouve le dossier `Frank Sinatra`, et aussi `frank sinatra`, mais pas

    `Sinatra, Frank`. Le nom doit correspondre à l'ensemble du nom du dossier, pas à une partie.

2. Ce dossier contient ses propres illustrations.

Si l'une ou l'autre est manquante, UMS utilise l'icône par défaut. Rien n'est cassé — il n'y a tout simplement pas
d'image à afficher.

## Découvrir quels artistes n'en ont aucun

La vérification la plus rapide consiste à examiner le système de fichiers : listez les sous-dossiers de votre répertoire d’artiste et recherchez

ceux qui ne contiennent pas de fichier image. Sous Linux ou macOS :

```bash
cd /music/Albums
for d in */; do
  find "$d" -maxdepth 1 -iname 'folder.*' | grep -q . || echo "no image: $d"
done
```

Everything it prints is an artist that will show the default icon.

Two causes are common. Either the folder really has no picture yet, or the folder name and the
artist name in the tags have drifted apart — a guest artist, a different spelling, or a name written
as _Surname, First name_ on disk but the other way round in the tags. The second case is worth
checking before you go looking for a picture that is already there.

## Setting the directory from your control point

If your control point supports it, you can point UMS at the artist directory by browsing to it and
choosing it there, instead of editing the configuration file. UMS stores the path itself, so the
setting survives a restart either way.
