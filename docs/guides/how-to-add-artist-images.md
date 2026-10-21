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

*Frank Sinatra* and *Miles Davis* get their pictures, *Zaz* does not.

The artwork inside the artist folder follows the ordinary rules, so the file is called `folder.jpg`,
`folder.png`, `folder.webp` and so on. See [How to add artwork](/guides/how-to-add-artwork) for the full
list of supported formats.

## Two conditions

An artist picture appears only when both are true:

1. A subfolder of the artist directory is named **exactly** like the artist, ignoring capitalisation.
   *Frank Sinatra* finds the folder `Frank Sinatra`, and also `frank sinatra`, but not
   `Sinatra, Frank`. The name has to match the whole folder name, not a part of it.
2. That folder has artwork of its own.

If either is missing, UMS falls back to the default icon. Nothing is broken — there is simply no
picture to show.

## Finding out which artists have none

The quickest check is on the file system: list the subfolders of your artist directory and look for
those without an image file. On Linux or macOS:

```bash
cd /music/Albums
for d in */; do
  find "$d" -maxdepth 1 -iname 'folder.*' | grep -q . || echo "no image: $d"
done
```

Everything it prints is an artist that will show the default icon.

Two causes are common. Either the folder really has no picture yet, or the folder name and the
artist name in the tags have drifted apart — a guest artist, a different spelling, or a name written
as *Surname, First name* on disk but the other way round in the tags. The second case is worth
checking before you go looking for a picture that is already there.

## Setting the directory from your control point

If your control point supports it, you can point UMS at the artist directory by browsing to it and
choosing it there, instead of editing the configuration file. UMS stores the path itself, so the
setting survives a restart either way.
