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

