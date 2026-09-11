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

