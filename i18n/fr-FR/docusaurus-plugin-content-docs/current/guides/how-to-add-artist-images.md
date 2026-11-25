# Comment ajouter des images d'artiste

Lorsque vous naviguez dans votre bibliothèque par artiste, UMS peut afficher une image pour chaque artiste au lieu d'une icône de dossier
générique. L'image ne provient pas des fichiers audio — elle provient du dossier qui porte
le nom de l'artiste.

## Comment UMS trouve l'image

Vous indiquez à UMS **un** répertoire: celui dont les sous-répertoires sont nommés d'après vos artistes. Pour un artiste,
UMS recherche ensuite un sous-dossier avec exactement ce nom et utilise l'œuvre de ce dossier.

```
# Le répertoire dont les sous-dossiers sont nommés d'après les artistes.
audio_artist_dir = /music/Albums
```

Donc, avec une librairie comme celle-ci :

```text
/music/Albums/
|-- Frank Sinatra/
| |-- dossier. pg <- l'image affichée pour "Frank Sinatra"
| `-- Come Fly with Me/
|-- Miles Davis/
| |-- dossier. pg
| `-- Type de bleu/
`-- Zaz/
    `-- Paris/ <- pas de dossier. pg, donc Zaz obtient l'icône par défaut
```

_Frank Sinatra_ et _Miles Davis_ obtiennent leurs photos, _Zaz_ ne le fait pas.

L'œuvre d'art dans le dossier d'artistes suit les règles ordinaires, donc le fichier est appelé `folder.jpg`,
`folder.png`, `folder.webp` et ainsi de suite. Voir [Comment ajouter un artwork](/guides/how-to-add-artwork) pour la liste complète
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
