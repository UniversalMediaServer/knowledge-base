# Direktivy seznamů skladeb

Položka seznamu skladeb je v základu jen adresa. U souboru na disku to stačí, protože UMS může přečíst jeho značky a najít vedle něj obrázek obalu. U internetové rozhlasové stanice ale žádný soubor k načtení není, takže obrázek, hodnocení a další údaje nemají kam být uloženy.

Tento nedostatek řeší direktivy. Jsou to řádky komentářů, které přímo v souboru seznamu skladeb doplňují k položce chybějící informace.

## Jak zapsat direktivu

Direktivu umístěte **přímo nad položku**, ke které patří, stejně jako u `#EXTINF:`:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz.png
#EXTRATING:4
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock.png
http://stream.example.com/rock.mp3
```

Pro všechny direktivy platí stejná pravidla:

- Direktiva platí **jen pro následující položku**. Jedné položce může předcházet několik direktiv, jak ukazuje příklad výše. Každá položka potřebuje vlastní řádky.
- Pouze pro seznamy skladeb `.m3u` a `.m3u8`. Jiné formáty seznamů skladeb pro ně nemají místo.
- Na velikosti písmen v názvu direktivy nezáleží: funguje `#EXTIMG:` i `#extimg:`.
- Ostatní řádky komentářů se nemění, takže vaše poznámky v souboru zůstanou zachovány.

## Přehled direktiv

| Direktiva             | Platí pro           | Účel                                                                            |
| --------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `#EXTIMG:`            | následující položku | Obrázek položky, která nemá vlastní soubor, ze kterého by jej bylo možné načíst |
| `#EXTRATING:`         | následující položku | Hvězdičkové hodnocení položky                                                   |
| `#EXTICYORDER:`       | následující položku | Způsob rozpoznání názvu aktuálně přehrávané skladby rozhlasové stanice          |
| `#RADIOBROWSERUUID:`  | následující položku | Identifikace stanice v adresáři RadioBrowser                                    |
| `#EXTPLAYLISTRATING:` | celý seznam skladeb | Hvězdičkové hodnocení samotného seznamu skladeb                                 |

### Obrázky

`#EXTIMG:` obsahuje absolutní adresu obrázku, který UMS jednou stáhne a poté jej používá pro danou položku. Podrobnosti a podporované podoby adres najdete v části [Jak přidat obrázky](/guides/how-to-add-artwork).

### Hodnocení

`#EXTRATING:` a `#EXTPLAYLISTRATING:` přijímají celé číslo od **0 do 5**. První direktiva hodnotí následující položku, druhá celý seznam skladeb a může být kdekoli v souboru.

```text
#EXTPLAYLISTRATING:5
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTRATING:4
http://stream.example.com/jazz.mp3
```

Hodnocení v souboru je **počáteční hodnota**, nikoli průběžný záznam: UMS je použije, jen pokud položka dosud není ohodnocena. Existující hodnocení ponechá beze změny. Úprava souboru tedy nezmění hodnocení položky, kterou jste již ohodnotili v řídicím bodu. Změňte hodnocení tam a UMS příslušný řádek upraví za vás.

U souboru na disku jde o usnadnění práce, protože hodnocení je uloženo v databázi a lze je zapsat také do značek souboru. U rozhlasové stanice je to jediné trvalé úložiště hodnocení: díky němu se hodnocení zachová při opětovném vytvoření databáze i při zkopírování seznamu skladeb.

### Identifikace rozhlasové stanice

`#RADIOBROWSERUUID:` obsahuje identifikátor stanice v adresáři RadioBrowser. Díky němu může UMS vyhledat další údaje o stanici a nemusí zobrazovat jen informace dostupné ze samotného streamu. Řídicí body, které nabízejí výběr stanice, tento řádek při výběru zapisují samy, takže jej obvykle nemusíte zadávat ručně.

### Pořadí údajů v názvu

`#EXTICYORDER:` určuje, zda se oznámení stanice vykládá jako _Interpret - Název skladby_, nebo jako _Název skladby - Stanice_. Viz [Internetová rádia a názvy právě přehrávaných skladeb](./internet-radio).

## Direktivy zapisované automaticky UMS

Seznamy skladeb nemusíte upravovat ručně. Když v řídicím bodu nastavíte obrázek, hodnocení nebo pořadí údajů v názvu, UMS zapíše odpovídající řádek do souboru seznamu skladeb. Každá direktiva se nahrazuje samostatně, takže nastavení obrázku nikdy nezmění hodnocení a naopak. Odstranění hodnoty odstraní pouze její řádek.

Direktiva s obrázkem se zapíše až po jeho úspěšném načtení. Nefunkční adresa tak ponechá soubor beze změny, místo aby se do něj uložil neplatný odkaz.
