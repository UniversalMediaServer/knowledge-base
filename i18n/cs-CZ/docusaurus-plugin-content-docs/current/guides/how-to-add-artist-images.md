# Jak přidat obrázky interpretů

Při procházení knihovny podle interpretů může UMS u každého interpreta zobrazit obrázek místo obecné ikony složky. Obrázek se nenačítá ze zvukových souborů, ale ze složky pojmenované podle interpreta.

## Jak UMS obrázek vyhledá

UMS zadáte **jediný** adresář: ten, jehož podsložky jsou pojmenované podle interpretů. Pro daného interpreta pak UMS vyhledá podsložku přesně tohoto jména a použije její obrázek.

```
# Adresář, jehož podsložky jsou pojmenované podle interpretů.
audio_artist_dir = /music/Albums
```

Například v takto uspořádané knihovně:

```text
/music/Albums/
|-- Frank Sinatra/
|   |-- folder.jpg          <- obrázek zobrazený pro interpreta "Frank Sinatra"
|   `-- Come Fly with Me/
|-- Miles Davis/
|   |-- folder.jpg
|   `-- Kind of Blue/
`-- Zaz/
    `-- Paris/              <- chybí folder.jpg, takže Zaz dostane výchozí ikonu
```

_Frank Sinatra_ a _Miles Davis_ dostanou své obrázky, _Zaz_ nikoli.

Pro obrázek ve složce interpreta platí obvyklá pravidla, takže soubor se jmenuje `folder.jpg`, `folder.png`, `folder.webp` a podobně. Úplný seznam podporovaných formátů najdete v části [Jak přidat obrázky](/guides/how-to-add-artwork).

## Dvě podmínky

Obrázek interpreta se zobrazí pouze tehdy, když platí obě podmínky:

1. Podsložka v adresáři interpretů má **přesně** stejné jméno jako interpret, bez ohledu na velikost písmen.
   Pro interpreta _Frank Sinatra_ se najde složka `Frank Sinatra` i `frank sinatra`, ale ne `Sinatra, Frank`. Jméno se musí shodovat s celým názvem složky, nikoli jen s jeho částí.
2. Tato složka má vlastní obrázek.

Pokud některá podmínka není splněna, UMS použije výchozí ikonu. Nejde o chybu — jen není k dispozici obrázek, který by se dal zobrazit.

## Jak zjistit, kterým interpretům obrázek chybí

Nejrychlejší je kontrola v souborovém systému: projděte podsložky adresáře interpretů a vyhledejte ty, které neobsahují soubor s obrázkem. V Linuxu nebo macOS:

```bash
cd /music/Albums
for d in */; do
  find "$d" -maxdepth 1 -iname 'folder.*' | grep -q . || echo "no image: $d"
done
```

Každý vypsaný řádek označuje interpreta, u kterého se zobrazí výchozí ikona.

Běžné jsou dvě příčiny. Buď složka obrázek skutečně ještě nemá, nebo se její název liší od jména interpreta ve značkách — například kvůli hostujícímu interpretovi, jinému pravopisu nebo jménu zapsanému na disku jako _Příjmení, Jméno_, ale ve značkách v opačném pořadí. Druhý případ se vyplatí zkontrolovat dříve, než začnete hledat obrázek, který už ve složce je.

## Nastavení adresáře z řídicího bodu

Pokud to řídicí bod podporuje, můžete adresář interpretů v jeho rozhraní vyhledat a vybrat místo úpravy konfiguračního souboru. UMS cestu sám uloží, takže nastavení v obou případech zůstane zachováno i po restartu.
