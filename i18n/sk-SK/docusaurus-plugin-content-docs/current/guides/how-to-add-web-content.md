# Ako pridať webový obsah

Tento článok vysvetľuje, ako pridať webový obsah.

## Videokanály

Videokanály môžete odoberať pridaním odkazov na ich kanály RSS. Pri YouTube stačí zadať odkaz na samotný kanál.

### 1: Prejdite do časti Zdieľaný obsah

V nastaveniach UMS vo webovom prehliadači otvorte ponuku a vyberte Zdieľaný obsah.  
![Ponuka nastavení](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Otvorte dialóg „Pridať nový zdieľaný obsah“

Kliknutím na tlačidlo „Pridať nový zdieľaný obsah“ otvoríte dialóg, ktorý umožňuje pridať ľubovoľný typ médií. Najprv vyberte typ „Videokanál“.  
![Dialóg s možnosťami nového zdieľaného obsahu](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Pridajte kanál

Tu môžete pridať svoj kanál.

#### Názov

Pole „Názov“ je pri videokanáloch neaktívne, pretože kanály určujú vlastný názov.

#### Cesta

Pole „Cesta“ určuje štruktúru priečinkov, ktorú UMS zobrazí. Ak napríklad zadáte `Web/YouTube Channels`, kanál bude v priečinku `YouTube Channels` umiestnenom v priečinku `Web`. Obsah si tak môžete usporiadať podľa vlastných potrieb. Je to užitočné najmä vtedy, keď používate kanály od rôznych poskytovateľov a chcete ich mať v UMS na jednom mieste.

#### Zdroj/URL

Ide o odkaz na videokanál. Zvyčajne sa končí príponou `.xml`. YouTube však spracúvame odlišne a prijímame priamo adresu kanála, takže môžete zadať napríklad `https://www.youtube.com/@kurzgesagt`.

#### Oprávnené skupiny

Pole „Oprávnené skupiny“ umožňuje sprístupniť kanál iba určitým skupinám vytvoreným v UMS, ku ktorým sú priradení používatelia alebo zariadenia. Podrobnosti nájdete v časti [Bezpečnosť a súkromie](../configuration/security-and-privacy.md#link-person-to-renderer).

Keď sú zadané možnosti správne, kliknite na tlačidlo „Pridať“.

### Poradie kanálov

Ak bol odkaz na kanál platný, pole „Názov“ by už malo byť vyplnené. Kanál teraz môžete presunúť nahor alebo nadol a upraviť tak poradie.  
![Zoznam zdieľaného obsahu a možnosť zmeny poradia](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Uloženie zmien

Predchádzajúce kroky môžete zopakovať a pridať alebo upraviť ďalší obsah. Keď ste so zmenami spokojní, kliknite na tlačidlo „Uložiť“ v dolnej časti stránky. Teraz si môžete obsah pozrieť na svojich zariadeniach:  
![Príklad videokanála vo webovom prehrávači](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)