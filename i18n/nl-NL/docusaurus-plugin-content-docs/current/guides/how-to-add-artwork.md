# Hoe je artwork toevoegt

Je kunt je eigen artwork toevoegen voor mappen en afspeellijsten, zodat je frontend aangepaste miniaturen laat zien in plaats van algemene standaardafbeeldingen.

Deze handleiding legt uit:

- welke afbeeldingsformaten worden ondersteund
- hoe je artwork bestanden een naam kan geven
- waar je deze bestanden moet plaatsen
- wat er gebeurt als een afspeellijst afbeelding ontbreekt

## Ondersteunde afbeeldingsformaten

De volgende bestandstypes worden ondersteund en aangevinkt in deze volgorde. Het eerste overeenkomende afbeeldingsbestand wordt gebruikt:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

You can use any one of these formats for both folder artwork and playlist artwork.

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

