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

- `folder.webp`
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

