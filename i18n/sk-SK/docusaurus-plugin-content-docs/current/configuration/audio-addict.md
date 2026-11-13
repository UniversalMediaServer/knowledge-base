# Internetové rádio Audio Addict Network

**Audio Addict Network** je skupina prémiových internetových rozhlasových služieb, medzi ktoré patria:

Classical Radio, Radio Tunes, Rock Radio, Jazz Radio, Zen Radio a DI.fm.

Na prístup k týmto rozhlasovým staniciam je potrebný platený **prémiový účet**. Stačí sa zaregistrovať na jednej z týchto stránok. Rovnaké používateľské meno a heslo vám umožnia prístup ku všetkým.

UMS automaticky načíta všetky dostupné rozhlasové služby AudioAddict, ich kanály a filtre. Podporovaný je aj kanál **Obľúbené**.

## Nastavenie

Ak chcete povoliť podporu AudioAddict, pridajte do súboru `UMS.conf` nasledujúce riadky:

```
# TRUE = uprednostniť európsky streamovací server
audio_addict_europe = TRUE or FALSE

# Vaše používateľské meno
audio_addict_user = USERNAME

# Vaše heslo
audio_addict_pass = PASSWORD
```

## Umiestnenie

Priečinok **Audio Addict Radio Network** sa nachádza vo vašej knižnici médií. Odtiaľ môžete priamo prehliadať a prehrávať všetky dostupné stanice.

## Relácie a epizódy

Okrem živých staníc ponúka sieť DI.fm aj priečinok **Udalosti**. Nájdete v ňom nadchádzajúce relácie. Pri už odvysielaných reláciách ponúka aj záznam, takže si ich môžete vypočuť neskôr.

Relácie s archívom majú vlastný priečinok so staršími epizódami. Niektoré relácie ich majú stovky, preto sa priečinok rozdelí do menších skupín. Každá je označená číslami a dátumami epizód, ktoré obsahuje.

```
# Počet epizód v jednej skupine pred jej rozdelením. Predvolene 20, najmenej 1.
audio_addict_episodes_per_container = 20
```

Zostavenie tohto zoznamu chvíľu trvá, pretože UMS musí od služby získať udalosti aj epizódy jednotlivých relácií. UMS si odpoveď zapamätá, aby pri každom prehliadaní alebo spustení prehrávania nemusel tento postup opakovať:

```
# Ako dlho sa zoznamy relácií a epizód opakovane používajú, v minútach.
# Predvolene 60. Hodnota 0 znamená, že sa služba osloví zakaždým.
audio_addict_tree_cache_ttl_minutes = 60
```

Dlhší interval zrýchli prehliadanie, kratší skôr zachytí novo zverejnené epizódy. Adresy, ktoré UMS dostáva, zostávajú platné podstatne dlhšie než predvolenú hodinu. Túto hodnotu preto netreba udržiavať nízku.

## Názvy práve prehrávaných skladieb

Stanice Audio Addict neposielajú názov aktuálnej skladby v samotnom zvukovom prúde. UMS si túto informáciu vyžiada od služby a odovzdá ju prehrávaču, takže stále vidíte, čo sa práve prehráva. Podrobnosti nájdete v časti [Internetové rádio a názvy práve prehrávaných skladieb](./internet-radio).

```
# Posielať názvy práve prehrávaných skladieb staníc Audio Addict. Predvolene zapnuté.
audio_addict_icy_metadata = TRUE
```

## Zostavené zoznamy skladieb

Zostavené zoznamy skladieb prehrávajú jednu skladbu za druhou z vášho účtu. Keď zoznam dosiahne koniec, UMS môže namiesto zastavenia začať znova:

```
# Po skončení znova spustiť zostavený zoznam skladieb. Predvolene vypnuté.
audio_addict_playlist_loop = FALSE
```

## Prehľad všetkých nastavení

| Nastavenie                            | Predvolená hodnota | Účel                                                     |
| ------------------------------------- | ------------------ | -------------------------------------------------------- |
| `audio_addict_user`                   | —                  | Názov vášho účtu                                         |
| `audio_addict_pass`                   | —                  | Vaše heslo                                               |
| `audio_addict_europe`                 | `TRUE`             | Uprednostniť európsky streamovací server                 |
| `audio_addict_icy_metadata`           | `TRUE`             | Posielať prehrávaču názvy práve prehrávaných skladieb    |
| `audio_addict_episodes_per_container` | `20`               | Počet epizód v skupine pred jej rozdelením               |
| `audio_addict_tree_cache_ttl_minutes` | `60`               | Ako dlho sa opakovane používajú zoznamy relácií a epizód |
| `audio_addict_playlist_loop`          | `FALSE`            | Po skončení zopakovať zostavený zoznam skladieb          |
