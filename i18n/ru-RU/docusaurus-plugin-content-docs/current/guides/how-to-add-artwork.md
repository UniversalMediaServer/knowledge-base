# Как добавить обложки

Вы можете добавлять собственные обложки для папок и плейлистов, чтобы ваш интерфейс отображал пользовательские миниатюры вместо стандартных изображений по умолчанию.

В этом руководстве объясняется:

- какие форматы изображений поддерживаются
- как называть файлы обложек
- где размещать эти файлы
- что происходит, когда изображение плейлиста отсутствует

## Поддерживаемые форматы изображений

Поддерживаются следующие типы файлов, которые проверяются в указанном порядке. Используется первый подходящий файл изображения:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Вы можете использовать любой из этих форматов как для обложек папок, так и для обложек плейлистов.

## Папка

Чтобы установить обложку для папки, поместите файл изображения с именем `folder.ext` внутрь этой папки.

Замените `.ext` на одно из поддерживаемых расширений.

Примеры:

- `папка.webp`
- `папка.jpg`
- `папка.png`

## Плейлисты

Чтобы установить обложку для плейлиста, используйте то же базовое имя файла, что и у файла плейлиста.

Пример:

- Файл плейлиста: `Jazz.m3u8`
- Файл обложки: `Jazz.jpg` (или `Jazz.webp`, `Jazz.png` и так далее)

Если подходящий файл обложки для плейлиста не найден, в качестве запасного варианта используется обложка папки.

## Пример структуры папок

Используйте это в качестве примера:

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

В этом примере:

- `Music/folder.jpg` — это обложка для папки верхнего уровня `Music`.
- `Music/Jazz/folder.png` — это обложка для папки `Jazz`.
- `Music/Jazz/Jazz.jpg` используется для плейлиста `Jazz.m3u8`.
- `Music/Jazz/Smooth.m3u8` не имеет соответствующего изображения `Smooth.*`, поэтому используется обложка папки `Jazz`.

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
