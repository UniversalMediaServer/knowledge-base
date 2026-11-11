# Come aggiungere un'immagine

Puoi aggiungere le tue immagini personalizzate per le cartelle e le playlist, in modo che l'interfaccia visualizzi miniature personalizzate anziché le immagini predefinite generiche.

Questa guida spiega:

- quali formati immagine sono supportati
- come nominare le immagini
- dove posizionare questi file
- cosa succede quando manca l'immagine di una playlist

## Formati di immagine supportati

I seguenti tipi di file sono supportati e controllati in questo ordine. Viene utilizzato il primo file immagine corrispondente:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

È possibile utilizzare uno qualsiasi di questi formati sia per le copertine delle cartelle che per quelle delle playlist.

## Cartella

Per impostare un'immagine di una cartella, posiziona un file immagine chiamato `cartella.ext` all'interno della cartella stessa.

Sostituisci `.ext` con una delle estensioni supportate.

Esempi:

- `cartella.webp`
- `cartella.jpg`
- `folder.png`

## Playlist

Per impostare l'immagine di una playlist, usa lo stesso nome file della playlist.

Esempio

- File playlist: `Jazz.m3u8`
- File immagine: `Jazz.jpg` (oppure `Jazz.webp`, `Jazz.png`, e così via)

Se non viene trovato il file immagine corrispondente per la playlist, sarà utilizzato il file immagine della cartella.

## Esempio di struttura cartelle

Utilizzare il seguente come riferimento:

```text
Musica/
|-- cartella.jpg
|-- Jazz/
|   |-- cartella.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- folder.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

In questo esempio:

- `Musica/cartella.jpg` è l'immagine per la cartella radice `Musica`.
- `Musica/Jazz/cartella.png` è l'immagine della cartella `Jazz` .
- `Musica/Jazz/Jazz.jpg` è l'immagine per la playlist `Jazz.m3u8`.
- `Musica/Jazz/Smooth.m3u8` non ha un'immagine corrispondente chiamata `Smooth.*`, quindi sarà utilizzata della cartella `Jazz` .

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
