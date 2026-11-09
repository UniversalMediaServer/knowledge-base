# Jak přidat obrázky

Můžete přidat vlastní obrázky pro složky a seznamy skladeb, aby vaše stránka zobrazovala vlastní náhledy namísto obecných výchozích obrázků.

Tato příručka vysvětluje:

- které formáty obrázků jsou podporovány
- jak pojmenovat soubory s obrázkem
- kde tyto soubory umístit
- co se stane, když chybí obrázek playlistu

## Podporované formáty obrázků

Následující typy souborů jsou podporovány a zaškrtnuty v tomto pořadí. Používá se první odpovídající obrázek:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Můžete použít libovolný z těchto formátů jak pro obrázky složek, tak pro obrázky skladeb.

## Složka

Chcete-li nastavit obrázek pro složku, umístěte soubor s názvem `folder.ext` do této složky.

Nahraďte `.ext` jedním z podporovaných rozšíření.

Příklady:

- `folder.webp`
- `folder.jpg`
- `folder.png`

## Seznamy stop

Chcete-li nastavit obrázek pro playlist, použijte stejné jméno souboru jako soubor playlistu.

Příklad:

- Soubor playlistu: `Jazz.m3u8`
- Soubor s obrázkem: `Jazz.jpg` (nebo `Jazz.webp`, `Jazz.png` a tak dále)

Pokud není nalezen odpovídající soubor s obrázkem playlistu, použije se jako záložní soubor.

## Příklad struktury složek

Použije se jako odkaz:

```text
Hudba/
|-- folder.jpg
|-- Jazz/
| |-- složka. ng
| |-- Jazz.m3u8
| |-- Jazz.jpg
| |-- Smooth. 3u8
| `-- smooth-track01.mp3
`-- Rock/
    |-- složka. ebp
    |-- RockHits.m3u8
    `-- track01.mp3
```

V tomto příkladu:

- `Music/folder.jpg` je obrázek pro nejvyšší úroveň složky `Music`.
- `Music/Jazz/folder.png` je obrázek pro složku `Jazz`.
- `Music/Jazz/Jazz.jpg` se používá pro `Jazz.m3u8` playlist.
- `Music/Jazz/Smooth.m3u8` nemá odpovídající obrázek `Smooth.*`, takže se používá obrázek `Jazz`.

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
