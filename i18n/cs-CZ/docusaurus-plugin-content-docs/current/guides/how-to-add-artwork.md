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

