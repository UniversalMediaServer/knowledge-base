# Come aggiungere un'immagine

Puoi aggiungere le tue immagini personalizzate per le cartelle e le playlist, in modo che l'interfaccia visualizzi miniature personalizzate anziché le immagini predefinite generiche.

Questa guida spiega:

- quali formati immagine sono supportati
- how to name artwork files
- where to place those files
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

## Folder

To set artwork for a folder, place an image file named `folder.ext` inside that folder.

Replace `.ext` with one of the supported extensions.

Examples:

- `folder.webp`
- `folder.jpg`
- `folder.png`

## Playlists

To set artwork for a playlist, use the same base filename as the playlist file.

Example:

- Playlist file: `Jazz.m3u8`
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

