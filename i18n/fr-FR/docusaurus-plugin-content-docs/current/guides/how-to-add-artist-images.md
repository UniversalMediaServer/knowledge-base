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

Tout ce qu'il affiche est un artiste qui affichera l'icône par défaut.

Deux causes sont courantes. Soit le dossier ne contient effectivement encore aucune image, soit le nom du dossier et le
nom de l'artiste figurant dans les balises ne correspondent plus — il peut s'agir d'un artiste invité, d'une orthographe différente, ou d'un nom écrit
sous la forme _Nom, Prénom_ sur le disque, mais dans l'ordre inverse dans les balises. Dans ce deuxième cas, il vaut mieux
vérifier avant de chercher une image qui se trouve déjà là.

## Définition du répertoire depuis votre point de contrôle

Si votre point de contrôle le supporte, vous pouvez pointer UMS vers le répertoire d'artistes en naviguant vers lui et
en le choisissant là, au lieu de modifier le fichier de configuration. UMS enregistre le chemin d'accès lui-même ; ainsi, le
paramètre est conservé après un redémarrage, quelle que soit la méthode utilisée.
