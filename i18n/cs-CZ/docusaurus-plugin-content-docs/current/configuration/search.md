# Hledat

Pokud kontrolní bod nabízí vyhledávací pole, nefiltruje seznam, který již má. Vysílá
hledání UMS jako UPnP kritérium jako \`dc:title obsahuje "beatles"a UMS odpovědi s odpovídajícími
položkami. Jak se toto kritérium změnilo v dotaz, je to, co je nastaveno na tomto ovládání stránky.

## Dva vyhledávače

UMS může odpovědět na hledání dvěma způsoby:

- **Celotextový index (výchozí).** UMS udržuje index Lucene vedle databáze a hledá to.
  Je rychlý i na velkých knihovnách a právě to umožňuje částečná slova a toleranci vůči špatnému zápisu.
- **Prosté vyhledávání databáze.** Přímý SQL dotaz. Pomalejší na velkých knihovnách a odpovídá pouze
  tomu, co je doslova tam, ale nemá žádný index, který by byl zastaralý.

Celý textový index pokrývá název souboru každého mediálního souboru a pro zvuk také název písně,
album, umělce, album umělce, skladatel, dirigent a žánr.

UMS přepíná na vlastní vyhledávání v databázi, když kontrolní bod odesílá kritérium, na které index
nemůže odpovědět, vypnutí indexu je zřídka nutné.

```
# Použijte fulltextový index. FALSE se vrátí k prostému vyhledávání databáze.
search_lucene_use_engine = TRUE
```

## Vyhledávání části slova

Většina vyhledávacích polí odesílá kritérium `obsahuje`, zatímco stále píšete. UMS promění každé slovo
váš vstup ve dvě alternativy najednou:

- **prefix** shoda, takže `beat` již náleží _Beatles_ před tím, než dokončíte slovo
- **fuzzy** odpovídá, takže `beatlse` stále náleží _Beatles_ navzdory chybě zápisu

```
# Povolte chybné zápisy kromě odpovídajících prefixů.
search_lucene_contains_fuzzy = TRUE
```

Obě nastavení odpovídají prefixům. Rozlišují se v tom, co ostatní odpovídají:

|                                    | `TRUE` (výchozí) | `FALSE` |
| ---------------------------------- | ---------------- | ------- |
| `beat` nalezne _Beatles_           | ano              | ano     |
| `beatlse` nalezne _Beatles_        | ano              | ne      |
| Nezávislé výsledky krátkého vstupu | možné            | ne      |

Poslední řádek je důvodem, proč nastavení existuje. Typo tolerance allows up to two wrong, missing or
extra letters, and on a short word that reaches surprisingly far: searching for `ranz` also returns
everything called _Jazz_, because two substitutions get you from one to the other. If that noise
bothers you more than the typo tolerance helps, set it to `FALSE`.

Two details worth knowing:

- A prefix is only used from **three characters** on. One or two letters would match a large part of
  the library without telling you anything the typo tolerance does not already find.
- Putting your input in quotation marks searches for the **words next to each other** instead, which
  is useful when the individual words are common but the combination is not.

## Searching for an exact value

Some criteria ask for an exact value rather than a part of one — a control point browsing by genre
sends `upnp:genre = "Jazz"`, for instance. By default that is taken literally.

```
# Tolerate typos in exact matches as well. Off by default.
search_lucene_equal_fuzzy = FALSE
```

Turning this on makes exact comparisons tolerate typos too. That is rarely what you want, because
these criteria usually come from the control point itself rather than from something you typed, and
a value that is nearly right is then quietly treated as right.

## Notes

Search ignores capitalization. `chapitre`, `Chapitre` and `CHAPITRE` return the same results.

If a search does not return what you expect, the debug log shows the query UMS built from your
input, on a line beginning with `lucene search string is`. Comparing it with what you typed usually
explains the result on the spot.
