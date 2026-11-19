# Jak přidat obrázky

Ke složkám a seznamům skladeb můžete přidat vlastní obrázky, aby klientské rozhraní zobrazovalo vlastní miniatury místo obecných výchozích obrázků.

Tato příručka vysvětluje:

- které formáty obrázků jsou podporovány
- jak pojmenovat soubory s obrázky
- kam tyto soubory umístit
- co se stane, když chybí obrázek seznamu skladeb

## Podporované formáty obrázků

UMS podporuje pro obrázky složek a seznamů skladeb tyto formáty:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## Složka

Chcete-li nastavit obrázek složky, umístěte do ní soubor s obrázkem pojmenovaný `folder.ext`.

Nahraďte `.ext` jednou z podporovaných přípon.

Příklady:

- `folder.webp`
- `folder.jpg`
- `folder.png`

### Použití stávajících názvů souborů, například `cover.jpg`

Pro obrázky složek můžete nastavit i jiné názvy souborů. Chcete-li vyhledávat soubory `cover.jpg` nebo `front.png`, přidejte do souboru `UMS.conf` ve složce profilu UMS následující řádek a poté UMS restartujte.

```ini
folder_thumbnail_names = cover, front
```

Názvy zadávejte bez přípon souborů a oddělujte je čárkami. Při hledání se nerozlišují velká a malá písmena, takže názvu `cover` odpovídá i soubor `Cover.JPG`.

S tímto nastavením UMS nejprve hledá `folder.*`, poté `cover.*`, následně `front.*` a nakonec obrázky v podporovaných formátech, jejichž název obsahuje `albumart`. Chcete-li použít standardní způsob vyhledávání obrázků složek, ponechte toto nastavení prázdné.

Vybraný obrázek může sloužit také jako náhradní obrázek pro skladby ve složce a pro místní seznamy skladeb ve stejném adresáři.

## Seznamy skladeb

Pro obrázek seznamu skladeb použijte stejný název souboru bez přípony, jaký má soubor seznamu skladeb.

Příklad:

- Soubor seznamu skladeb: `Jazz.m3u8`
- Soubor s obrázkem: `Jazz.jpg` (nebo `Jazz.webp`, `Jazz.png` a tak dále)

U místního seznamu skladeb UMS kontroluje následující zdroje v uvedeném pořadí.

1. Obrázek se zcela shodným názvem souboru bez přípony, jaký má seznam skladeb, například `Jazz.jpg` pro `Jazz.m3u8`.
2. Obrázek přiřazený k danému seznamu skladeb prostřednictvím kompatibilního řídicího bodu.
3. Obrázek adresáře ze souboru `folder.*`, ze souboru s názvem uvedeným v `folder_thumbnail_names` nebo z obrázku s `albumart` v názvu.

## Příklad struktury složek

Řiďte se tímto příkladem:

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

V tomto příkladu:

- `Music/folder.jpg` je obrázek složky `Music` na nejvyšší úrovni.
- `Music/Jazz/folder.png` je obrázek pro složku `Jazz`.
- `Music/Jazz/Jazz.jpg` se používá pro seznam skladeb `Jazz.m3u8`.
- Pro `Music/Jazz/Smooth.m3u8` neexistuje odpovídající obrázek `Smooth.*`, takže se použije obrázek složky `Jazz`.

## Webové streamy v seznamu skladeb

Výše uvedená pravidla pojmenování fungují proto, že existuje soubor, vedle kterého lze obrázek umístit. Internetová rozhlasová stanice ani jiná webová adresa v seznamu skladeb takový soubor nemá, a proto potřebuje jiný způsob přiřazení obrázku: řádek `#EXTIMG:`, který na něj odkazuje.

Řádek umístěte přímo **nad položku**, ke které patří, stejně jako u `#EXTINF:`. Platí pouze pro následující položku, takže každý stream potřebuje vlastní řádek:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

UMS obrázek jednou stáhne, uloží jej a od té chvíle jej pro daný stream používá. Při každém spuštění jej znovu nestahuje.

Co lze na řádku uvést:

- **Absolutní** adresu. `https://example.com/cover.png` funguje, ale `cover.png` a `../art/cover.png` nikoli — relativní cesta se ignoruje a u streamu zůstane výchozí obrázek.
- URI s předponou `data:`, pokud chcete obrázek uchovat přímo v souboru seznamu skladeb místo jeho umístění na webu.
- Pouze pro seznamy skladeb `.m3u` a `.m3u8`. Jiné formáty seznamů skladeb nemají pro tento řádek místo.

Na velikosti písmen v direktivě nezáleží: funguje `#EXTIMG:` i `#extimg:`.

### Automatický zápis řádku pomocí UMS

Pokud řídicí bod umožňuje nastavit obrázek položky, nemusíte seznam skladeb upravovat ručně.
UMS zapíše řádek `#EXTIMG:` přímo do souboru seznamu skladeb, a to až po úspěšném načtení obrázku. Nefunkční adresa tak ponechá soubor beze změny, místo aby se do něj uložil neplatný odkaz.

Protože je odkaz na obrázek uložen v souboru seznamu skladeb, nikoli pouze v databázi, zůstane zachován i při opětovném vytvoření databáze a přenese se se souborem při kopírování seznamu skladeb jinam.
