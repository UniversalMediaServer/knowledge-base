# Hodnocení a oblíbené položky

UMS si dokáže zapamatovat vaše hodnocení hudby od nuly do pěti hvězdiček. Řídicí body, které nabízejí tlačítka hodnocení, mohou tyto hodnoty nastavovat a měnit během poslechu.

Označení „líbí se mi“ není samostatný mechanismus. **„Líbí se mi“ odpovídá pěti hvězdičkám**, **„nelíbí se mi“ odpovídá nule**. Pokud řídicí bod zobrazuje místo hvězdiček srdíčko, zapisuje stejnou hodnotu na stejné místo. Proto si tyto dva způsoby hodnocení nikdy neodporují.

## Kde se hodnocení ukládá

Hodnocení je uloženo v databázi UMS a je přiřazeno k položce, nikoli k souboru. To má dva důležité důsledky:

- Funguje i pro položky, které nemají kam vlastní hodnocení uložit — například internetové rozhlasové stanice nebo zvukové formáty, jejichž značky neobsahují pole pro hodnocení.
- Hodnocení je nezávislé na souboru, takže změna značek vaší sbírky jiným nástrojem nepřepíše hodnocení nastavené v UMS.

Pokud chcete mít hodnocení také v souborech, aby je mohly číst jiné programy, může je UMS při hodnocení zapsat do značky souboru:

```
# Zapisovat hodnocení také do značky souboru. Ve výchozím nastavení vypnuto.
audio_update_rating_tag = TRUE
```

To platí pouze pro soubory, které hodnocení podporují, a až od okamžiku zapnutí. Dříve zadaná hodnocení se zpětně nezapíší.

Hodnocení, které se má zachovat při opětovném vytvoření databáze nebo při kopírování seznamu skladeb jinam, patří do souboru seznamu skladeb. Viz [Direktivy seznamů skladeb](./playlist-directives).

## Složka Moje alba

Alba označená jako oblíbená se shromažďují ve složce **Moje alba**. Její obsah se vytváří automaticky: když u alba označíte „líbí se mi“, objeví se v ní; po odebrání označení opět zmizí.

Ve výchozím nastavení je složka umístěna v knihovně médií spolu s ostatními složkami zvuku. Pokud ji používáte často, můžete ji místo toho zobrazit na nejvyšší úrovni:

```
# Zobrazit Moje alba v kořenové složce. Ve výchozím nastavení vypnuto.
audio_likes_visible_root = TRUE
```

## Vyhledávání podle hodnocení

UMS uvádí hodnocení mezi vlastnostmi, podle kterých lze vyhledávat, takže se na ně může řídicí bod dotazovat stejně jako na název nebo interpreta. Dotaz na vše s hodnocením pěti hvězdiček najde obsah zobrazovaný ve složce Moje alba; fungují i ostatní hodnoty.

Vyhledávání hledá **přesnou** hodnotu. Jedním dotazem nelze požádat o „čtyři hvězdičky nebo více“. Řídicí bod, který takový filtr nabízí, se musí na každou hodnotu zeptat zvlášť a výsledky sám spojit.

Hodnocení se čtou z databáze, takže vyhledávání najde i položky, které nemají hodnocení uložené v souboru, například rozhlasové stanice.

## Zálohování hodnocení

Protože hodnocení i označení oblíbených položek jsou uloženy v databázi, vyplatí se je zálohovat před jakýmkoli zásadním zásahem do databáze. UMS je umí exportovat i znovu importovat, což umožňuje také jejich přenesení do jiné instalace. Akce, které k tomu řídicí bod používá, jsou uvedeny v části [Služba UPnP v UMS](./ums-extended-service).
