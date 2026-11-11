# Hodnotenia a obľúbené položky

UMS si môže pamätať hodnotenie vašej hudby od nuly do piatich hviezdičiek. Ovládacie body s tlačidlami na hodnotenie môžu tieto hodnoty nastavovať a meniť počas počúvania.

Označenie ako obľúbené nie je samostatný mechanizmus. Označenie **„páči sa mi“ znamená päť hviezdičiek**, **„nepáči sa mi“ znamená nulu**. Ak ovládací bod zobrazuje namiesto hviezdičiek srdce, zapisuje rovnakú hodnotu na rovnaké miesto. Preto si tieto dva spôsoby hodnotenia nikdy neodporujú.

## Kde sa hodnotenie uchováva

Hodnotenie je uložené v databáze UMS a je priradené k položke, nie k súboru. Má to dva dôležité dôsledky:

- Funguje aj pri položkách, ktoré nemajú vlastné miesto na uloženie hodnotenia, napríklad pri internetových rozhlasových staniciach alebo zvukových formátoch, ktorých značky neobsahujú pole hodnotenia.
- Je nezávislé od súboru, takže zmena značiek vašej zbierky iným nástrojom neprepíše hodnotenia v UMS.

Ak chcete mať hodnotenie aj v súboroch, aby ho videli iné programy, UMS ho môže pri hodnotení zapísať do značky súboru:

```
# Zapisovať hodnotenie aj do značky súboru. Predvolene vypnuté.
audio_update_rating_tag = TRUE
```

Platí to iba pre súbory, ktoré podporujú uloženie hodnotenia, a až od zapnutia tejto možnosti. Staršie hodnotenia sa spätne nezapíšu.

Hodnotenie, ktoré sa má zachovať po opätovnom vytvorení databázy alebo preniesť so zoznamom skladieb inam, patrí do súboru zoznamu skladieb. Pozrite si časť [Direktívy zoznamov skladieb](./playlist-directives).

## Priečinok Moje albumy

Albumy označené ako obľúbené sa zhromažďujú v priečinku **Moje albumy**. Napĺňa sa automaticky: keď album označíte ako obľúbený, objaví sa v ňom; po zrušení označenia z neho zmizne.

Predvolene sa priečinok nachádza v knižnici médií medzi ostatnými zvukovými priečinkami. Ak ho používate často, môžete ho namiesto toho zobraziť na najvyššej úrovni:

```
# Zobraziť Moje albumy v koreňovom priečinku. Predvolene vypnuté.
audio_likes_visible_root = TRUE
```

## Vyhľadávanie podľa hodnotenia

UMS uvádza hodnotenie medzi vlastnosťami, podľa ktorých možno vyhľadávať. Ovládací bod sa naň teda môže pýtať rovnako ako na názov alebo interpreta. Požiadavka na všetko s piatimi hviezdičkami nájde obsah zobrazený v priečinku Moje albumy. Fungujú aj ostatné hodnoty.

Vyhľadávanie používa **presnú** hodnotu. Jednou požiadavkou nemožno vyhľadať „štyri alebo viac hviezdičiek“. Ovládací bod, ktorý takýto filter ponúka, musí vyhľadať každú hodnotu samostatne a výsledky sám spojiť.

Hodnotenia sa načítavajú z databázy, takže vyhľadávanie nájde aj položky, ktoré nemajú hodnotenie v súbore, napríklad rozhlasové stanice.

## Zálohovanie

Keďže hodnotenia a obľúbené položky sú uložené v databáze, pred výraznými zásahmi do nej sa oplatí vytvoriť ich zálohu. UMS ich môže exportovať a znova importovať, čo umožňuje aj prenos do inej inštalácie. Akcie, ktoré na to ovládací bod používa, sú uvedené v časti [Služba UPnP v UMS](./ums-extended-service).
