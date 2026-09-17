# Miten lisätä kansitaidetta

Voit lisätä omaa kansitaidetta kansioille ja soittolistoille, joten etupaneelisi näyttää mukautettuja pienkuvia oletuskuvien sijaan.

Tämä opas selittää:

- mitkä kuvamuodot ovat tuettuja
- miten nimetään kansikuvia
- mihin nämä tiedostot sijoitetaan
- mitä tapahtuu, kun soittolistan kuva puuttuu

## Tuetut kuvamuodot

Seuraavat tiedostotyypit ovat tuettu ja tarkistetaan tässä järjestyksessä. Ensimmäinen vastaava kuvatiedosto otetaan käyttöön:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Voit käyttää mitä tahansa näistä tiedostomuodoista sekä kansioiden että soittolistan kansikuviin.

## Kansio

Asettaaksesi kansiolle kuva, aseta kuvatiedosto nimeltä `folder.ext` kyseisen kansion sisään.

Korvaa `.ext` yhdellä tuetuista tiedostomuodoista.

Esimerkkejä:

- `folder.webp`
- `folder.jpg`
- `folder.png`

## Soittolistat

Jos haluat asettaa soittolistalle kansikuvan, käytä samaa perustiedostonimeä kuin soittolistan tiedosto.

Esimerkki:

- Soittolistan tiedosto: `Jazz.m3u8`
- Kuvatiedosto: `Jazz.jpg` (tai `Jazz.webp`, `Jazz.png`, ja niin edelleen)

Jos sopivaa soittolistan kuvaa ei löydy, käytetään kansion kansikuvaa.

## Esimerkki kansiorakenteesta

Käytä tätä ohjeellisena esimerkkinä:

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

Tässä esimerkissä

- `Music/folder.jpg` on kuva ylimmälle tasolle, eli `Music`-kansiolle.
- `Music/Jazz/folder.png` on kuva `Jazz`-kansiolle.
- `Music/Jazz/Jazz.jpg` on käytössä `Jazz.m3u8`-soittolistalle.
- `Musiikki/Jazz/Smooth.m3u8`:lle ei ole vastaavaa `Smooth.*` -kuvaa, joten käytetään `Jazz`-kansion kansikuvaa.

