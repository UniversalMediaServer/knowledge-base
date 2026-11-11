# Bezpečnosť a súkromie

## Úvod

UMS sprístupňuje médiá dvoma hlavnými spôsobmi: cez DLNA/UPnP pre aplikácie na prehrávanie médií a cez HTTP(S) pre webové prehliadače.

Vo webových prehliadačoch možno bezpečnosť a súkromie jednoducho riadiť pomocou používateľských účtov s prihlasovaním.

Aplikácie na prehrávanie médií spravidla nepracujú s pojmom „používateľ“, takže každé zariadenie zvyčajne dostáva rovnaký obsah. To vám nemusí vyhovovať. Ak napríklad máte dva priečinky kids_safe a kids_unsafe, môžete chcieť obmedziť prehrávače v detskej izbe tak, aby mali prístup iba k priečinku kids_safe. Ďalšou bežnou situáciou je zdieľanie siete s ľuďmi, ktorým nechcete sprístupniť svoje médiá, napríklad so spolubývajúcimi. Vtedy môžete chcieť určité prehrávače úplne zablokovať.

UMS ponúka niekoľko spôsobov, ako v takýchto situáciách riadiť prístup.

## Predvolené povolenie alebo blokovanie prehrávačov a sieťových zariadení
Pre prehrávače a sieťové zariadenia si môžete zvoliť predvolený spôsob riadenia prístupu. Predvolene ich môžete povoliť alebo zakázať a pomocou zoznamov povolených a blokovaných zariadení mať prístup úplne pod kontrolou.

To je užitočné pri spoločnom bývaní alebo v rozsiahlych miestnych sieťach či sieťach s nízkou úrovňou dôvery. Je to užitočné aj pri používaní sieťových adaptérov powerline, pretože cez ne môžu získať nechcený prístup susedia.

![Príklad nastavenia predvoleného povolenia sieťových zariadení](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Príklad nastavenia predvoleného povolenia prehrávačov](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Blokovanie a povoľovanie prehrávačov a sieťových zariadení

Keď zvolíte, či sa nerozpoznané prehrávače majú predvolene povoliť alebo zablokovať, môžete na domovskej obrazovke v nastaveniach vytvoriť zoznam blokovaných alebo povolených zariadení.

![Príklad zablokovania prehrávača](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Prepojenie osoby s prehrávačom {#link-person-to-renderer}

Používateľské účty môžete prepojiť s prehrávačmi alebo zariadeniami a oddeliť tak ich prístup k obsahu aj sledovanie prehrávania.

Ak napríklad máte jeden televízor v obývačke a druhý v spálni, sledovanie v spálni nemusí ovplyvňovať obsah a stav prehrávania na televízore v obývačke.

![Príklad priradenia účtu k prehrávaču](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Obmedzenie zdieľaného obsahu na určité skupiny

Teraz si môžete vybrať, s ktorými skupinami budete zdieľať priečinky alebo online obsah. Ak je napríklad používateľom dieťa alebo je zariadenie priradené dieťaťu, môžete ho zaradiť do skupiny „Deti“. Tejto skupine môžete sprístupniť priečinok „Rodina“, ale nie obsah „Horor“ alebo „Iba pre dospelých“. Môžete im tiež sprístupniť webový kanál Kurzgesagt, ale nie historické podcasty.

![Príklad skupín pre zdieľaný obsah](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Skrytie priečinkov

Určite, ktoré virtuálne priečinky budú viditeľné. Tieto nastavenia nájdete v súbore UMS.conf. Ak chcete pri prehliadaní skryť niektoré priečinky, nastavte príslušné hodnoty na true alebo začiarknite ich možnosti na karte Nastavenia navigácie a zdieľania v rozšírenom režime grafického rozhrania.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Ak chcete skryť priečinok Web, v rozšírenom režime grafického rozhrania na karte Všeobecné nastavenia zrušte začiarknutie možnosti Povoliť externú sieť alebo v súbore UMS.conf nastavte `external_network = false`. Vedľajším účinkom je, že prestane fungovať automatická aktualizácia. Zmeny vykonané v grafickom rozhraní sa prejavia po reštarte.

## Kód PIN

Všetky uvedené metódy obmedzujú prístup jednotlivých prehrávačov. Ak však niekto získa prístup k prehrávaču, ktorý má daný priečinok povolený, tieto metódy nepomôžu. Ak majú napríklad deti prístup k televízoru v obývačke so všetkými médiami, získajú prístup aj k týmto médiám. Tento problém rieši kód PIN. Umožňuje chrániť priečinky a médiá kódom PIN, ktorý musíte zadať priamo z prehrávača. Predvolene ide o postupnosť číslic (0–9), podobne ako pri kóde k bankomatu. Dôrazne odporúčame používať číselné kódy, pretože iné znaky sa na prehrávači zadávajú ťažko. Ak však chcete zvýšiť ochranu, môžete pridať aj písmená. Postup je nasledujúci: Do priečinka so súborom UMS.conf pridajte súbor s názvom UMS.code. Doň vložte zápis regexp,code, kde regexp je regulárny výraz ako v súbore „UMS.deny“ a code je kód, ktorý umožní prístup k priečinku alebo médiu. Dĺžka kódu nie je obmedzená. Napríklad:
```
.*private.*,1234
```

Ak názov priečinka alebo média obsahuje slovo „private“, tento zápis vyžiada kód. Správny kód je 1234. Kód potom zostáva platný 4 hodiny, ak túto dobu nezmeníte.

## Vlastná konfigurácia zariadenia

Každú konfiguračnú vlastnosť možno nastaviť aj pre konkrétne zariadenie. Vytvorte preň vlastnú konfiguráciu, ktorá prepíše predvolené nastavenia UMS. Podrobnosti nájdete v časti Vytvorenie vlastnej konfigurácie zariadenia.

Ak chcete napríklad prispôsobiť detský televízor:
- V pravom hornom rohu vyskakovacieho panela prehrávača v grafickom rozhraní kliknite na tlačidlo „Prispôsobiť toto zariadenie“ a zadajte názov konfigurácie.
- Do novootvoreného súboru conf pridajte nastavenia, ktoré chcete pre televízor prepísať. Napríklad takto zmeníte názov servera a určíte iné priečinky:
```
#----------------------------------------------------------------------------
# Vlastný profil zariadenia
# Popis všetkých možností prehrávača nájdete v súbore DefaultRenderer.conf
# a možnosti programu v súbore UMS.conf.

# Možnosti v tomto súbore prepisujú predvolené nastavenia konkrétnych zariadení Sony Bravia EX uvedených nižšie.
# Zariadenia určite pomocou uuid (alebo adresy, ak uuid nemajú). Viaceré zariadenia oddeľte čiarkami.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
