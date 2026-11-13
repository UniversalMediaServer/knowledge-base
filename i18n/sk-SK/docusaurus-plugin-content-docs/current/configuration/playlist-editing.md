# Úprava zoznamov skladieb z ovládacieho bodu

Zoznamy skladieb sú bežné súbory `.m3u8` a vždy ich môžete upravovať v textovom editore. UMS môže umožniť úpravy aj vášmu ovládaciemu bodu: vytvoriť zoznam, pridať práve počúvanú skladbu, odstrániť nechcenú položku alebo celý zoznam premenovať či vymazať, a to bez ručnej úpravy súboru.

Táto funkcia je predvolene **vypnutá**. Zápis do zoznamu skladieb znamená zápis na váš disk. Preto ho musíte povoliť zámerne; nie je automaticky zapnutý.

```
# Povoliť ovládacím bodom vytvárať, meniť a odstraňovať objekty. Predvolene vypnuté.
upnp_cds_write = TRUE
```

## Čo bude možné

Po zapnutí nastavenia môže ovládací bod, ktorý túto funkciu podporuje:

- vytvoriť nový zoznam skladieb,
- pridať položku do zoznamu skladieb vrátane práve prehrávanej položky,
- odstrániť položku zo zoznamu skladieb,
- premenovať alebo odstrániť zoznam skladieb.

To, či uvidíte tlačidlá pre všetky tieto úkony, závisí od vášho ovládacieho bodu. UMS tieto operácie iba sprístupňuje. Nič sa nestane, kým o ne niečo nepožiada.

UMS zapisuje bežné súbory zoznamov skladieb do zdieľaných priečinkov, nie záznamy do databázy, ktorým rozumie iba UMS. Neskôr ich môžete otvoriť v ľubovoľnom editore, skopírovať do iného prehrávača alebo zálohovať. Doplňujúce údaje, ktoré samotná položka zoznamu skladieb nedokáže vyjadriť, napríklad obrázok rozhlasovej stanice, sa ukladajú ako [direktívy](./playlist-directives) do toho istého súboru.

Zmeny sa oznamujú pripojeným ovládacím bodom. Zoznam upravený na jednom zariadení preto zobrazí nový obsah aj na ostatných bez ručného obnovenia.

## Nahrávanie súborov

Druhé nastavenie riadi odlišnú funkciu s podstatne väčším dosahom: či zariadenie môže odoslať UMS **obsah súboru** a nechať ho zapísať na disk.

```
# Povoliť neidentifikovaným zariadeniam zápis súborov na disk. Predvolene vypnuté.
anonymous_devices_write = TRUE
```

Ak na zapnutie nemáte konkrétny dôvod, ponechajte ho vypnuté. Umožňuje zariadeniu v sieti, ktoré UMS nedokáže priradiť k známemu používateľovi, vytvárať, nahrádzať a odstraňovať mediálne súbory v zdieľaných priečinkoch.
To znamená vysokú mieru dôvery voči akémukoľvek zariadeniu prítomnému v sieti. Preto má táto funkcia samostatné nastavenie a nie je súčasťou povolenia úprav zoznamov skladieb.

## Obe nastavenia možno meniť na diaľku

Ovládací bod môže obe nastavenia sám načítať a zmeniť, rovnako ako iné nastavenia UMS. Je to pohodlné, pretože úpravy zoznamov skladieb môžete povoliť priamo z používanej aplikácie. Zároveň to však znamená, že hodnota v konfiguračnom súbore nie je konečná: zmeniť ju môže čokoľvek v sieti, čo sa dokáže pripojiť k službe UPnP.

Ak je to pre vás dôležité, obmedzte, ktoré zariadenia sa vôbec môžu pripojiť k UMS. Pozrite si časť [Bezpečnosť a súkromie](/configuration/security-and-privacy).
