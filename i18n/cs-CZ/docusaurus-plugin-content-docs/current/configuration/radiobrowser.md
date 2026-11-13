# RadioBrowser

Přidání internetové rozhlasové stanice do seznamu skladeb obvykle znamená vyhledat na webu adresu jejího streamu a vložit ji do souboru. UMS to může udělat za vás: je propojený s **RadioBrowserem**, komunitně spravovaným adresářem internetových rozhlasových stanic, ve kterém může stanici vyhledat a přidat ji do seznamu.

Není třeba nic nastavovat. Adresář se používá pouze na vyžádání.

## Vyhledání stanice

Pokud řídicí bod nabízí vyhledávání stanic, obrací se na UMS, který se následně dotazuje RadioBrowseru.
Výběr stanic lze omezit podle

- názvu
- země
- jazyka
- štítku, například žánru nebo tématu

Které z těchto možností můžete využít a jak se zobrazují, záleží na řídicím bodu. UMS poskytuje také možné hodnoty pro filtry země, jazyka a štítků, takže je vyhledávací pole může nabídnout v seznamu a nemusíte je psát ručně.

Dlouhé seznamy výsledků se načítají po částech, takže výsledky širokého vyhledávání není nutné přenést najednou.

## Přidání stanice

Po výběru stanice UMS zapíše do zvoleného seznamu skladeb úplnou položku, která obsahuje více než jen adresu:

- **adresu streamu**
- **název stanice**, případně vlastní název, pokud jej řídicí bod umožňuje zadat
- **logo stanice**, aby se u položky zobrazoval obrázek místo výchozí ikony
- **identifikátor stanice** z adresáře

Právě poslední údaj je zajímavý. Zůstává v souboru seznamu skladeb jako [direktiva `#RADIOBROWSERUUID:`](./playlist-directives), takže položka zůstává propojena se svým původním záznamem v adresáři. UMS toto propojení využívá k doplnění údajů, které samotný stream neposkytuje, například žánru a datového toku.

Výsledkem je soubor, který nadále vypadá jako obyčejný seznam skladeb a funguje i v jiných přehrávačích:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUUID:962cf2e0-0601-11e8-ae97-52543be04c81
http://stream.example.com/jazz.mp3
```

Pokud znáte identifikátor stanice, můžete takovou položku zapsat i ručně. Vynecháním direktivy přijdete pouze o doplňující údaje; stanice se bude přehrávat i bez ní.

## Po přidání

Stanice se pak chová jako jakákoli jiná položka seznamu skladeb. Můžete ji ohodnotit, vyměnit její obrázek a opravit rozpoznávání názvů právě přehrávaných skladeb; viz [Internetová rádia a názvy právě přehrávaných skladeb](./internet-radio).
