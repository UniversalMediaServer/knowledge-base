# Direktívy zoznamov skladieb

Položka zoznamu skladieb obsahuje iba adresu. Pri súbore na disku to stačí, pretože UMS z neho môže načítať značky a nájsť vedľa neho obal. Pri internetovej rozhlasovej stanici však žiadny súbor na načítanie nie je, a preto obrázok, hodnotenie a ďalšie údaje nemajú prirodzené miesto na uloženie.

Tento nedostatok riešia direktívy. Sú to riadky komentárov, ktoré uchovávajú chýbajúce informácie spolu s položkou priamo v súbore zoznamu skladieb.

## Ako sa zapisuje direktíva

Direktívu umiestnite **priamo nad** položku, ku ktorej patrí, rovnako ako pri `#EXTINF:`:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz.png
#EXTRATING:4
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock.png
http://stream.example.com/rock.mp3
```

Pre všetky platia rovnaké pravidlá:

- Direktíva platí **iba pre nasledujúcu položku**. Pred jednou položkou môže byť viac direktív, ako v príklade vyššie. Každá položka potrebuje vlastné riadky.
- Podporované sú iba zoznamy skladieb `.m3u` a `.m3u8`. Iné formáty zoznamov skladieb pre ne nemajú miesto.
- Na veľkosti písmen v názve direktívy nezáleží: funguje `#EXTIMG:` aj `#extimg:`.
- Ostatné riadky komentárov zostanú bez zmeny, takže vlastné poznámky v súbore sa zachovajú.

## Prehľad direktív

| Direktíva             | Platí pre            | Účel                                                                   |
| --------------------- | -------------------- | ---------------------------------------------------------------------- |
| `#EXTIMG:`            | nasledujúcu položku  | Obrázok položky, ktorá nemá vlastný súbor, z ktorého by sa dal načítať |
| `#EXTRATING:`         | nasledujúcu položku  | Hodnotenie danej položky hviezdičkami                                  |
| `#EXTICYORDER:`       | nasledujúcu položku  | Spôsob čítania názvu práve prehrávanej skladby rozhlasovej stanice     |
| `#RADIOBROWSERUUID:`  | nasledujúcu položku  | Identifikácia stanice v adresári RadioBrowser                          |
| `#EXTPLAYLISTRATING:` | celý zoznam skladieb | Hodnotenie samotného zoznamu skladieb hviezdičkami                     |

### Obrázky

`#EXTIMG:` obsahuje absolútnu adresu obrázka. UMS ho raz stiahne a potom používa pre danú položku. Podrobnosti a podporované formy zápisu nájdete v časti [Ako pridať obrázky](/guides/how-to-add-artwork).

### Hodnotenia

`#EXTRATING:` a `#EXTPLAYLISTRATING:` prijímajú celé číslo od **0 do 5**. Prvá direktíva hodnotí nasledujúcu položku. Druhá hodnotí celý zoznam skladieb a môže byť kdekoľvek v súbore.

```text
#EXTPLAYLISTRATING:5
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTRATING:4
http://stream.example.com/jazz.mp3
```

Hodnotenie v súbore je **počiatočná hodnota**, nie priebežne čítaný záznam: UMS ho použije iba pri položke, ktorá ešte nemá hodnotenie. Existujúce hodnotenie ponechá bez zmeny. Úprava súboru preto nezmení hodnotenie položky, ktorú ste už ohodnotili v ovládacom bode. Zmeňte ho tam a UMS príslušný riadok upraví za vás.

Pri súbore na disku je to praktický doplnok, pretože hodnotenie je uložené v databáze a možno ho zapísať aj do značiek súboru. Pri rozhlasovej stanici je to jediné trvalé úložisko hodnotenia. Vďaka nemu sa hodnotenie zachová po opätovnom vytvorení databázy a prenesie sa spolu so skopírovaným zoznamom skladieb.

### Identifikácia rozhlasovej stanice

`#RADIOBROWSERUUID:` uchováva identifikátor stanice v adresári RadioBrowser. UMS vďaka nemu môže vyhľadať ďalšie informácie o stanici namiesto zobrazovania iba tých údajov, ktoré poskytuje samotný prúd. Ovládacie body s výberom staníc zapisujú tento riadok automaticky pri výbere stanice, takže ho zvyčajne netreba zadávať ručne.

### Poradie údajov v názve

`#EXTICYORDER:` určuje, či sa oznámenie stanice číta ako _Interpret - Názov skladby_ alebo _Názov skladby - Stanica_. Pozrite si časť [Internetové rádio a názvy práve prehrávaných skladieb](./internet-radio).

## Direktívy, ktoré UMS zapisuje automaticky

Zoznamy skladieb nemusíte upravovať ručne. Keď ovládací bod nastaví obrázok, hodnotenie alebo poradie údajov v názve, UMS zapíše príslušný riadok do súboru zoznamu skladieb. Každá direktíva sa nahrádza samostatne, takže zmena obalu neovplyvní hodnotenie a naopak. Odstránením hodnoty sa odstráni iba jej riadok.

Údaj o obrázku sa zapíše až po jeho úspešnom načítaní. Pri nefunkčnej adrese tak súbor zostane bez zmeny a neuloží sa doň neplatný odkaz.
