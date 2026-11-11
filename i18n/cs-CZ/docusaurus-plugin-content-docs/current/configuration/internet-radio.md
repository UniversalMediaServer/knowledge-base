# Internetová rádia a názvy právě přehrávaných skladeb

Internetová rozhlasová stanice neposílá jen zvuk, ale také oznamuje, kterou skladbu právě přehrává. UMS tuto informaci zachytí a předá dál, takže řídicí bod může místo pouhého názvu stanice zobrazit právě vysílanou skladbu.

To funguje pro rozhlasové streamy přidané do seznamu skladeb i pro stanice sítě [Audio Addict Network](./audio-addict).

## Jak se název dostane do přehrávače

Název lze předat dvěma způsoby a UMS použije ten, který je vhodný:

- Přehrávače, které požadují metadata přímo ve streamu, dostanou název vložený do zvukového streamu, jak je u internetových rádií běžné.
- Přehrávače, které je nepožadují: UMS čte oznámení sám a název posílá řídicímu bodu samostatně, takže se aktuální název zobrazí i při použití přehrávačů, které metadata internetových rádií nepodporují.

V jednom případě se aktuální názvy do streamu nedostanou: pokud UMS musí stream pro přehrávač **překódovat**, název do něj nelze vložit, protože zvuk vytváří překódovací nástroj, který o oznámeních stanice nic neví. Streamů přehrávaných přímo — což je u stanic ve formátu MP3 a AAC běžné — se to netýká.

## Rozpoznání obsahu oznámení

Stanice posílají jediný řádek textu a žádné pravidlo neurčuje, která část obsahuje jméno interpreta.
Běžně se používá toto pořadí:

```text
Miles Davis - So What
```

Některé stanice ale na konec místo toho připojují název stanice:

```text
So What - Jazz Radio on example.com
```

Při výkladu „nejprve interpret“ by druhý řádek uváděl _So What_ jako interpreta. UMS proto zkoumá část za poslední pomlčkou a považuje ji za název stanice, nikoli interpreta, pokud platí alespoň jedna z těchto podmínek:

- obsahuje něco, co vypadá jako webová adresa, například `example.com`
- podobá se názvu stanice, který UMS již zná ze seznamu skladeb
- podobá se názvu hostitele v adrese streamu, přičemž se ignorují obecné části jako `stream`, `listen` nebo `radio`

Pokud neplatí žádná z těchto podmínek, první část se považuje za interpreta, jak je obvyklé.

## Ruční oprava pro konkrétní stanici

U většiny stanic fungují uvedená pravidla správně, některé stanice se jim však mohou vymykat — například názvem pořadu na konci, neobvyklým oddělovačem nebo jménem interpreta, které obsahuje doménu. V takovém případě zadejte pořadí výslovně pomocí řádku `#EXTICYORDER:` v seznamu skladeb, přímo nad adresou streamu:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTICYORDER:title-first
http://stream.example.com/jazz.mp3
```

| Hodnota        | Význam                                                                           |
| -------------- | -------------------------------------------------------------------------------- |
| `auto`         | Rozhodnout automaticky podle pravidel uvedených výše. Toto je výchozí nastavení. |
| `artist-first` | Vždy vykládat oznámení jako _Interpret - Název skladby_.                         |
| `title-first`  | Vždy je vykládat jako _Název skladby - Stanice_.                                 |

Neznámá hodnota se vyhodnotí jako `auto`. Nastavení platí pouze pro danou stanici. Obecné fungování těchto řádků popisuje část [Direktivy seznamů skladeb](./playlist-directives).

Pokud řídicí bod umožňuje přepnout pořadí během poslechu, může stejnou hodnotu nastavit prostřednictvím UMS. UMS ji zapíše do souboru seznamu skladeb, takže se volba zachová i po restartu.

## Stanice Audio Addict

Stanice sítě Audio Addict Network neposílají názvy skladeb ve streamu. UMS se místo toho dotazuje služby na aktuální skladbu a předává ji stejným způsobem, takže navenek je chování totožné.

```
# Předávat názvy právě přehrávaných skladeb ze stanic Audio Addict. Ve výchozím nastavení zapnuto.
audio_addict_icy_metadata = TRUE
```

Pokud některý přehrávač špatně reaguje na metadata vložená do streamu, toto nastavení vypněte. Na názvy posílané samostatně řídicímu bodu to nemá vliv.
