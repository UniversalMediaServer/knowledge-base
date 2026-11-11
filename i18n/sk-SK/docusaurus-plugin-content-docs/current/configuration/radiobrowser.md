# RadioBrowser

Pri pridávaní internetovej rozhlasovej stanice do zoznamu skladieb zvyčajne musíte nájsť adresu jej prúdu na webe a vložiť ju do súboru. UMS to môže urobiť za vás: je prepojený s **RadioBrowser**, komunitne spravovaným adresárom internetových rozhlasových staníc, v ktorom dokáže vyhľadať stanicu a pridať ju.

Netreba nič nastavovať. Adresár sa používa iba na vyžiadanie, keď o to požiadate.

## Vyhľadanie stanice

Ak váš ovládací bod ponúka vyhľadávanie staníc, posiela požiadavku UMS a UMS sa následne pýta služby RadioBrowser.
Výber staníc môžete zúžiť podľa:

- názvu
- krajiny
- jazyka
- značky, napríklad žánru alebo témy

Ktoré z týchto možností môžete použiť a ako sa zobrazia, závisí od ovládacieho bodu. UMS poskytuje aj dostupné hodnoty filtrov krajiny, jazyka a značky. Vyhľadávacie pole ich tak môže ponúknuť v zozname namiesto ručného zadávania.

Dlhé zoznamy výsledkov sa načítavajú po častiach, takže výsledok širokého vyhľadávania netreba preniesť naraz.

## Pridanie stanice

Keď vyberiete stanicu, UMS zapíše do zvoleného zoznamu skladieb úplnú položku, nielen adresu:

- **adresu prúdu**
- **názov stanice** alebo vlastný názov, ak ho ovládací bod umožňuje zadať
- **logo stanice**, aby mala položka vlastný obrázok namiesto predvolenej ikony
- **identifikátor stanice** z adresára

Posledný údaj je obzvlášť užitočný. V súbore zoznamu skladieb zostáva uložený ako [direktíva `#RADIOBROWSERUUID:`](./playlist-directives). Položka tak zostáva prepojená so svojím pôvodným záznamom v adresári. UMS toto prepojenie využíva na doplnenie údajov, ktoré samotný prúd neposkytuje, napríklad žánru a dátového toku.

Výsledný súbor zostáva bežným zoznamom skladieb a funguje aj v iných prehrávačoch:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUUID:962cf2e0-0601-11e8-ae97-52543be04c81
http://stream.example.com/jazz.mp3
```

Ak poznáte identifikátor stanice, takúto položku môžete zapísať aj ručne. Vynechaním direktívy prídete iba o doplňujúce údaje. Samotná stanica sa prehrá aj bez nej.

## Ďalšie používanie

Od tej chvíle sa stanica správa ako ktorákoľvek iná položka zoznamu skladieb. Môžete ju hodnotiť, zmeniť jej obrázok a opraviť spôsob čítania názvov aktuálnych skladieb. Pozrite si časť [Internetové rádio a názvy práve prehrávaných skladieb](./internet-radio).
