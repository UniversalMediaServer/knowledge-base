# Vyhledávání

Pokud řídicí bod nabízí vyhledávací pole, nefiltruje seznam, který již má k dispozici. Odesílá do UMS vyhledávací kritérium UPnP, například `dc:title contains "beatles"`, a UMS vrátí odpovídající položky. Nastavení popsaná na této stránce určují, jak se toto kritérium převede na dotaz.

## Dva způsoby vyhledávání

UMS může vyhledávat dvěma způsoby:

- **Fulltextový index (výchozí).** UMS vedle databáze udržuje index Lucene a vyhledává v něm.
  Vyhledávání je rychlé i ve velkých knihovnách a umožňuje hledat části slov a tolerovat překlepy.
- **Přímé vyhledávání v databázi.** Používá přímý dotaz SQL. Ve velkých knihovnách je pomalejší a vyhledává pouze doslovné shody, ale nepoužívá žádný index, který by mohl být neaktuální.

Fulltextový index zahrnuje názvy všech mediálních souborů a u zvukových souborů také název skladby, album, interpreta, interpreta alba, skladatele, dirigenta a žánr.

Pokud řídicí bod odešle kritérium, které index nedokáže zpracovat, UMS automaticky přejde na vyhledávání v databázi. Proto je vypnutí indexu potřeba jen zřídka.

```
# Používat fulltextový index. Hodnota FALSE přepne na přímé vyhledávání v databázi.
search_lucene_use_engine = TRUE
```

## Vyhledávání části slova

Většina vyhledávacích polí odesílá kritérium s operátorem `contains` už během psaní. UMS pro každé slovo zadaného textu hledá současně dva druhy shod:

- shodu podle **začátku slova (prefixu)**, takže `beat` najde _Beatles_ ještě před dopsáním celého slova
- **přibližnou shodu (fuzzy)**, takže `beatlse` najde _Beatles_ i přes překlep

```
# Kromě shody podle začátku slova tolerovat i překlepy.
search_lucene_contains_fuzzy = TRUE
```

Při obou hodnotách tohoto nastavení se vyhledává podle začátku slova. Liší se tím, jaké další shody najdou:

|                                           | `TRUE` (výchozí) | `FALSE` |
| ----------------------------------------- | ---------------- | ------- |
| `beat` najde _Beatles_                    | ano              | ano     |
| `beatlse` najde _Beatles_                 | ano              | ne      |
| Nesouvisející výsledky při krátkém zadání | možné            | ne      |

Poslední řádek vysvětluje, proč toto nastavení existuje. Tolerance překlepů připouští až dvě chybná, chybějící nebo nadbytečná písmena. U krátkého slova tak může vést k překvapivě široké shodě: vyhledání `ranz` vrátí i všechny položky s názvem _Jazz_, protože k přeměně jednoho slova na druhé stačí dvě záměny písmen. Pokud vám nesouvisející výsledky vadí více, než vám tolerance překlepů pomáhá, nastavte hodnotu na `FALSE`.

Dvě užitečné podrobnosti:

- Shoda podle začátku slova se používá až od **tří znaků**. Jedno nebo dvě písmena by odpovídala velké části knihovny, aniž by našla něco navíc oproti vyhledávání s tolerancí překlepů.
- Pokud zadaný text uzavřete do uvozovek, hledají se místo toho **slova stojící vedle sebe**. To je užitečné, když jsou jednotlivá slova běžná, ale jejich kombinace nikoli.

## Vyhledávání přesné hodnoty

Některá kritéria požadují přesnou hodnotu, nikoli jen její část. Například při procházení podle žánru řídicí bod odesílá `upnp:genre = "Jazz"`. Ve výchozím nastavení se takové kritérium vyhodnocuje doslovně.

```
# Tolerovat překlepy i při hledání přesné shody. Ve výchozím nastavení vypnuto.
search_lucene_equal_fuzzy = FALSE
```

Zapnutím tohoto nastavení se překlepy tolerují i při porovnávání přesných hodnot. To je žádoucí jen zřídka, protože tato kritéria obvykle vytváří sám řídicí bod a nevycházejí z textu, který zadáváte. Hodnota, která je správná jen přibližně, se pak bez upozornění považuje za správnou.

## Poznámky

Vyhledávání nerozlišuje velká a malá písmena. `chapitre`, `Chapitre` a `CHAPITRE` vracejí stejné výsledky.

Pokud vyhledávání nevrací očekávané výsledky, v ladicím protokolu najdete dotaz, který UMS vytvořil ze zadaného textu, na řádku začínajícím `lucene search string is`. Porovnání tohoto dotazu se zadaným textem obvykle hned objasní, proč vyhledávání vrátilo daný výsledek.
