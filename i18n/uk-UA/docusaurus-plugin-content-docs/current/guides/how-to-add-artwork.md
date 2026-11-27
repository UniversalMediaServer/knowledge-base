# Як додавати обкладинки

Ви можете додати власні обкладинки для тек та списків відтворення, щоб в інтерфейсі показувалися власні мініатюри замість типових зображень.

Цей посібник пояснює:

- які формати зображень підтримуються
- як називати файли обкладинок
- куди розміщувати такі файли
- що трапляється, коли зображення списку відтворення відсутнє

## Підтримувані формати файлів зображень

UMS supports these image formats for folder and playlist artwork:

- `.webp`
- `.png`
- `.jpeg`
- `.jpg`
- `.bmp`
- `.gif`

## Теки

Аби встановити обкладинку для теки, помістіть у неї файл зображення із назвою `folder.ext`.

Замініть `.ext` на одне з підтримуваних розширень.

Приклади:

- `folder.webp`
- `folder.jpg`
- `folder.png`

### Use existing filenames such as `cover.jpg`

You can define alternative names for folder artwork. To look for
`cover.jpg` or `front.png`, add this line to `UMS.conf` in your UMS profile folder, then restart UMS.

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

## Списки відтворення

Щоб встановити обкладинку для списку відтворення, використовуйте те саме базове ім’я файлу, що й у самому файлі списку відтворення.

Приклад:

- Файл списку відтворення: `Jazz.m3u8`
- Файл обкладинки: `Jazz.jpg` (або `Jazz.webp`, `Jazz.png` тощо)

For a local playlist, UMS checks these sources in order.

1. An image with exactly the same base filename as the playlist, such as `Jazz.jpg` for `Jazz.m3u8`.
2. Artwork assigned to that playlist through a compatible control point.
3. The directory's artwork, which can come from `folder.*`, a name in
   `folder_thumbnail_names`, or an `albumart` image.

## Приклад структури тек

Використовуйте його за зразок:

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

У цьому прикладі:

- `Music/folder.jpg` – це обкладинка для теки верхнього рівня `Music`.
- `Music/Jazz/folder.png` – це обкладинка для теки `Jazz`.
- Обкладинка `Music/Jazz/Jazz.jpg` використовується для списку відтворення `Jazz.m3u8`.
- Список відтворення `Music/Jazz/Smooth.m3u8` немає відповідної обкладинки з назвою `Smooth.*`, натомість використовується обкладинка з теки `Jazz`.

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
