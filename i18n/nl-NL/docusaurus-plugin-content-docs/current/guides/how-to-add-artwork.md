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

Je kunt elk van deze formaten gebruiken voor zowel map artwork als afspeellijst artwork.

## Map

Om artwork in te stellen voor een map, plaats je een afbeeldingsbestand genaamd `map.ext` in die map.

Vervang `.ext` met een van de ondersteunde extensies.

Voorbeelden:

- `map.webp`
- `map.jpg`
- `map.png`

## Afspeellijsten

Om artwork voor een afspeellijst in te stellen, gebruik je dezelfde basisbestandsnaam als het afspeellijstbestand.

Voorbeeld:

- Afspeellijst bestand: `Jazz.m3u8`
- Artwork bestand: `Jazz.jpg` (of `Jazz.webp`, `Jazz.png`, enzovoort)

Als een overeenkomend afspeellijst artwork bestand niet wordt gevonden, wordt de map artwork gebruikt als een terugval.

## Voorbeeld mappenstructuur

Gebruik dit als referentie:

```text
Muziek/
|-- map.jpg
|-- Jazz/
|   |-- map.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- map.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

In dit voorbeeld:

- `Muziek/map.jpg` is het artwork voor de hoofdmap `Muziek`.
- `Muziek/Jazz/map.png` is het artwork voor de `Jazz` map.
- `Muziek/Jazz/Jazz.jpg` is gebruikt voor de `Jazz.m3u8` afspeellijst.
- `Muziek/Jazz/Smooth.m3u8` heeft geen overeenkomende `Smooth.*` afbeelding, dus de `Jazz` map artwork wordt gebruikt.

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
