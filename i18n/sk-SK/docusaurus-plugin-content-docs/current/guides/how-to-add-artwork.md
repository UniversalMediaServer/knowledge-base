# Ako pridať obrázky

K priečinkom a zoznamom skladieb môžete pridať vlastné obrázky, aby používateľské rozhranie zobrazovalo vlastné miniatúry namiesto všeobecných predvolených obrázkov.

Tento návod vysvetľuje:

- ktoré obrazové formáty sú podporované
- ako pomenovať súbory obrázkov
- kam tieto súbory umiestniť
- čo sa stane, keď obrázok zoznamu skladieb chýba

## Podporované obrazové formáty

UMS podporuje pre obrázky priečinkov a zoznamov skladieb tieto formáty:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## Priečinok

Ak chcete nastaviť obrázok priečinka, vložte doň obrázok s názvom `folder.ext`.

Časť `.ext` nahraďte jednou z podporovaných prípon.

Príklady:

- `folder.webp`
- `folder.jpg`
- `folder.png`

### Použitie existujúcich názvov súborov, napríklad `cover.jpg`

Pre obrázky priečinkov môžete nastaviť aj iné názvy súborov. Ak chcete vyhľadávať súbory `cover.jpg` alebo `front.png`, pridajte do súboru `UMS.conf` v priečinku profilu UMS nasledujúci riadok a potom UMS reštartujte.

```ini
folder_thumbnail_names = cover, front
```

Názvy zadávajte bez prípon súborov a oddeľujte ich čiarkami. Pri vyhľadávaní sa nerozlišujú veľké a malé písmená, takže názvu `cover` zodpovedá aj súbor `Cover.JPG`.

S týmto nastavením UMS najprv hľadá `folder.*`, potom `cover.*`, následne `front.*` a nakoniec obrázky v podporovaných formátoch, ktorých názov obsahuje `albumart`. Ak chcete použiť štandardný spôsob vyhľadávania obrázkov priečinkov, ponechajte toto nastavenie prázdne.

Vybraný obrázok môže slúžiť aj ako náhradný obrázok pre skladby v priečinku a pre miestne zoznamy skladieb v tom istom adresári.

## Zoznamy skladieb

Ak chcete nastaviť obrázok zoznamu skladieb, použite rovnaký základ názvu ako pri súbore zoznamu skladieb.

Príklad:

- Súbor zoznamu skladieb: `Jazz.m3u8`
- Súbor obrázka: `Jazz.jpg` (alebo `Jazz.webp`, `Jazz.png` a podobne)

Pri miestnom zozname skladieb UMS kontroluje nasledujúce zdroje v uvedenom poradí.

1. Obrázok s presne rovnakým názvom súboru bez prípony, aký má zoznam skladieb, napríklad `Jazz.jpg` pre `Jazz.m3u8`.
2. Obrázok priradený k danému zoznamu skladieb prostredníctvom kompatibilného ovládacieho bodu.
3. Obrázok adresára zo súboru `folder.*`, zo súboru s názvom uvedeným v `folder_thumbnail_names` alebo z obrázka s `albumart` v názve.

## Príklad štruktúry priečinkov

Riaďte sa týmto príkladom:

```text
Music/
|-- folder.jpg
|-- Jazz/
|   |-- folder.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- folder.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

V tomto príklade:

- `Music/folder.jpg` je obrázok priečinka `Music` na najvyššej úrovni.
- `Music/Jazz/folder.png` je obrázok priečinka `Jazz`.
- `Music/Jazz/Jazz.jpg` sa používa pre zoznam skladieb `Jazz.m3u8`.
- Pre `Music/Jazz/Smooth.m3u8` neexistuje zodpovedajúci obrázok `Smooth.*`, preto sa použije obrázok priečinka `Jazz`.

## Webové prúdy v zozname skladieb

Uvedené pravidlá pomenovania fungujú preto, že existuje súbor, vedľa ktorého možno obrázok umiestniť. Internetová rozhlasová stanica ani iná webová adresa v zozname skladieb takýto súbor nemá. Jej obrázok sa preto určuje inak: riadkom `#EXTIMG:`, ktorý naň odkazuje.

Riadok umiestnite priamo **nad** položku, ku ktorej patrí, rovnako ako pri `#EXTINF:`. Platí iba pre nasledujúcu položku, takže každý prúd potrebuje vlastný riadok:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

UMS obrázok raz stiahne, uloží a odvtedy ho používa pre daný prúd. Pri každom spustení ho nesťahuje znova.

Čo riadok prijíma:

- **Absolútnu** adresu. `https://example.com/cover.png` funguje, ale `cover.png` a `../art/cover.png` nie. Relatívna cesta sa ignoruje a prúd si ponechá predvolený obrázok.
- URI so schémou `data:`, ak chcete obrázok uchovať priamo v súbore zoznamu skladieb namiesto jeho umiestnenia na serveri.
- Podporované sú iba zoznamy skladieb `.m3u` a `.m3u8`. Iné formáty zoznamov skladieb nemajú pre tento riadok miesto.

Na veľkosti písmen v samotnej direktíve nezáleží. Funguje `#EXTIMG:` aj `#extimg:`.

### Automatický zápis riadka pomocou UMS

Ak ovládací bod umožňuje nastaviť obrázok položky, zoznam skladieb nemusíte upravovať ručne.
UMS zapíše riadok `#EXTIMG:` do súboru zoznamu skladieb až po úspešnom načítaní obrázka. Pri nefunkčnej adrese tak súbor zostane bez zmeny a neuloží sa doň neplatný odkaz.

Keďže je odkaz na obrázok uložený v súbore zoznamu skladieb, nielen v databáze, zachová sa po opätovnom vytvorení databázy a prenesie sa aj pri skopírovaní zoznamu skladieb inam.
