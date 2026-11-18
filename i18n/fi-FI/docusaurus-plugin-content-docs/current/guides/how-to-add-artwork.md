# Miten lisätä kansitaidetta

Voit lisätä omaa kansitaidetta kansioille ja soittolistoille, joten etupaneelisi näyttää mukautettuja pienkuvia oletuskuvien sijaan.

Tämä opas selittää:

- mitkä kuvamuodot ovat tuettuja
- miten nimetään kansikuvia
- mihin nämä tiedostot sijoitetaan
- mitä tapahtuu, kun soittolistan kuva puuttuu

## Tuetut kuvamuodot

UMS tukee näitä kuvaformaatteja kansion ja soittolistan taideteokselle:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## Kansio

Asettaaksesi kansiolle kuva, aseta kuvatiedosto nimeltä `folder.ext` kyseisen kansion sisään.

Korvaa `.ext` yhdellä tuetuista tiedostomuodoista.

Esimerkkejä:

- `folder.webp`
- `folder.jpg`
- `folder.png`

### Käytä olemassa olevia tiedostonimiä kuten `cover.jpg`

Voit määritellä vaihtoehtoisia nimiä kansioiden taideteoksille. Jos haluat etsiä
`cover.jpg` tai `front.png`, lisää tämä rivi `UMS.conf`-tiedostoon UMS-profiilikansiossasi ja käynnistä UMS uudelleen.

```ini
folder_thumbnail_names = cover, front
```

Enter the names without file extensions and separate them with commas. Matching ignores
capitalization, so `cover` also matches `Cover.JPG`.

With this setting, UMS looks for `folder.*` first, then `cover.*`, then `front.*`, and finally
supported images with `albumart` in the filename. Leave the setting empty to use the standard
folder artwork lookup.

The selected image can also serve as fallback artwork for tracks in the folder and for local
playlists in the same directory.

## Soittolistat

Jos haluat asettaa soittolistalle kansikuvan, käytä samaa perustiedostonimeä kuin soittolistan tiedosto.

Esimerkki:

- Soittolistan tiedosto: `Jazz.m3u8`
- Kuvatiedosto: `Jazz.jpg` (tai `Jazz.webp`, `Jazz.png`, ja niin edelleen)

For a local playlist, UMS checks these sources in order.

1. An image with exactly the same base filename as the playlist, such as `Jazz.jpg` for `Jazz.m3u8`.
2. Artwork assigned to that playlist through a compatible control point.
3. The directory's artwork, which can come from `folder.*`, a name in
   `folder_thumbnail_names`, or an `albumart` image.

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
