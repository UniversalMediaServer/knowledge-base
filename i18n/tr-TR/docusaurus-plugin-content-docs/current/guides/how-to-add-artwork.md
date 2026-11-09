# Görsel çalışma nasıl eklenir

Klasörler ve oynatma listeleri için kendi görsel çalışmalarınızı ekleyebilirsiniz, böylece ön uçta genel varsayılan resimler yerine özel küçük resimler gösterilir.

Bu kılavuz şunları açıklamaktadır:

- hangi resim biçimleri desteklenir
- görsel çalışma dosyalarına nasıl ad verilir
- bu dosyalar nereye koyulur
- bir oynatma listesi resmi eksik olduğunda ne olur

## Desteklenen resim biçimleri

Aşağıdaki dosya türleri bu sırayla desteklenir ve denetlenir. İlk eşleşen resim dosyası kullanılır:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Bu biçimlerden herhangi birini hem klasör görsel çalışması hem de çalma listesi görsel çalışması için kullanabilirsiniz.

## Klasör

Bir klasörün görsel çalışmasını ayarlamak için o klasörün içine `klasor.uzt` adlı bir resim dosyası yerleştirin.

`.uzt`’yi desteklenen uzantılardan biriyle değiştirin.

Örnekler:

- `klasor.webp`
- `klasor.jpg`
- `klasor.png`

## Çalma listeleri

Bir çalma listesi için görsel çalışma ayarlamak amacıyla çalma listesi dosyasıyla aynı temel dosya adını kullanın.

Örnek:

- Çalma listesi dosyası: `Jazz.m3u8`
- Görsel çalışma dosyası: `Jazz.jpg` (veya `Jazz.webp`, `Jazz.png` ve benzeri)

Eğer eşleşen bir çalma listesi görsel çalışma dosyası bulunamazsa, klasör görsel çalışması geri dönüş olarak kullanılır.

## Örnek klasör yapısı

Bunu başvuru olarak kullanın:

```text
Müzik/
|-- klasör.jpg
|-- Jazz/
|   |-- klasör.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-parça01.mp3
`-- Rock/
    |-- klasör.webp
    |-- RockHits.m3u8
    `-- parça01.mp3
```

Bu örnekte:

- `Müzik/klasör.jpg`, üst seviye `Müzik` klasörünün görsel çalışmasıdır.
- `Müzik/Jazz/kalsör.png', `Jazz\` klasörünün görsel çalışmasıdır.
- `Müzik/Jazz/Jazz.jpg`, `Jazz.m3u8` çalma listesi için kullanılır.
- `Müzik/Jazz/Smooth.m3u8`, eşleşen `Smooth.*` resmine sahip değil, bu yüzden `Jazz` klasörü görsel çalışması kullanılır.

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
