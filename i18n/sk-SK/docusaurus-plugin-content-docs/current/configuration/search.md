# Vyhľadávanie

Keď ovládací bod ponúka vyhľadávacie pole, nefiltruje zoznam, ktorý už má k dispozícii. Odošle vyhľadávanie do UMS ako kritérium UPnP, napríklad `dc:title contains "beatles"`, a UMS vráti zodpovedajúce položky. Nastavenia na tejto stránke určujú, ako sa toto kritérium prevedie na vyhľadávací dopyt.

## Dva spôsoby vyhľadávania

UMS môže vyhľadávať dvoma spôsobmi:

- **Fulltextový index (predvolené).** UMS udržiava popri databáze index Lucene a vyhľadáva v ňom.
  Je rýchly aj pri veľkých knižniciach a umožňuje vyhľadávanie častí slov aj tolerovanie preklepov.
- **Priame vyhľadávanie v databáze.** Priamy dopyt SQL. Pri veľkých knižniciach je pomalšie a vyhľadá iba doslovné zhody, ale nepoužíva index, ktorý by mohol byť neaktuálny.

Fulltextový index zahŕňa názov každého mediálneho súboru a pri zvukových súboroch aj názov skladby, album, interpreta, interpreta albumu, skladateľa, dirigenta a žáner.

Ak ovládací bod odošle kritérium, ktoré index nedokáže spracovať, UMS automaticky prejde na vyhľadávanie v databáze. Index preto zvyčajne netreba vypínať.

```
# Použiť fulltextový index. Hodnota FALSE prepne na priame vyhľadávanie v databáze.
search_lucene_use_engine = TRUE
```

## Vyhľadávanie časti slova

Väčšina vyhľadávacích polí odosiela kritérium `contains` už počas písania. UMS prevedie každé slovo zo zadania súčasne na dve alternatívy:

- zhodu podľa **začiatku slova**, takže `beat` nájde _Beatles_ ešte pred dopísaním celého slova
- **približnú zhodu**, takže `beatlse` nájde _Beatles_ aj napriek preklepu

```
# Okrem zhody začiatkov slov tolerovať aj preklepy.
search_lucene_contains_fuzzy = TRUE
```

Obe hodnoty nastavenia vyhľadávajú zhodné začiatky slov. Líšia sa tým, aké ďalšie zhody vyhľadajú:

|                                         | `TRUE` (predvolené) | `FALSE` |
| --------------------------------------- | ------------------- | ------- |
| `beat` nájde _Beatles_                  | áno                 | áno     |
| `beatlse` nájde _Beatles_               | áno                 | nie     |
| nesúvisiace výsledky pri krátkom zadaní | možné               | nie     |

Posledný riadok vysvetľuje, prečo toto nastavenie existuje. Tolerovanie preklepov pripúšťa až dve nesprávne, chýbajúce alebo nadbytočné písmená. Pri krátkom slove to môže viesť k prekvapivým výsledkom: vyhľadávanie výrazu `ranz` vráti aj všetko s názvom _Jazz_, pretože na zmenu jedného slova na druhé stačia dve zámeny písmen. Ak vám takéto nechcené výsledky prekážajú viac, než vám tolerovanie preklepov pomáha, nastavte hodnotu `FALSE`.

Dve užitočné podrobnosti:

- Zhoda podľa začiatku slova sa používa až od **troch znakov**. Jedno alebo dve písmená by zodpovedali veľkej časti knižnice a nepriniesli by nič navyše oproti tomu, čo už nájde vyhľadávanie s tolerovaním preklepov.
- Ak zadanie vložíte do úvodzoviek, vyhľadávajú sa namiesto toho **slová vedľa seba**. To je užitočné, keď sú jednotlivé slová bežné, ale ich kombinácia nie.

## Vyhľadávanie presnej hodnoty

Niektoré kritériá vyžadujú presnú hodnotu namiesto jej časti. Napríklad ovládací bod pri prehliadaní podľa žánru odosiela `upnp:genre = "Jazz"`. Predvolene sa toto kritérium vyhodnocuje doslovne.

```
# Tolerovať preklepy aj pri presných zhodách. Predvolene vypnuté.
search_lucene_equal_fuzzy = FALSE
```

Po zapnutí tohto nastavenia sa preklepy tolerujú aj pri presnom porovnávaní. To je zriedka žiaduce, pretože tieto kritériá zvyčajne vytvára samotný ovládací bod, nie používateľ pri písaní. Takmer správna hodnota sa potom bez upozornenia považuje za správnu.

## Poznámky

Vyhľadávanie nerozlišuje veľké a malé písmená. `chapitre`, `Chapitre` a `CHAPITRE` vrátia rovnaké výsledky.

Ak vyhľadávanie nevráti očakávané výsledky, v ladiacom protokole nájdete dopyt, ktorý UMS vytvoril z vášho zadania, na riadku začínajúcom výrazom `lucene search string is`. Porovnanie tohto dopytu so zadaným textom zvyčajne hneď vysvetlí výsledok.
