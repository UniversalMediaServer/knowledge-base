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

## Oynatma listeleri

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

