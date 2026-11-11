# Služba UPnP v UMS

UMS poskytuje rozšírenú službu UPnP, ktorá externým ovládacím bodom umožňuje používať ďalšie funkcie systému.

## Použitie

Služba je dostupná v mennom priestore `schemas-upnp-org` s typom služby `UmsExtendedServices`.

V ovládacích bodoch napísaných v Jave s knižnicou JUPnP zavolajte `findService` na objekte `RemoteDevice` predstavujúcom UMS:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Prostredníctvom tohto rozhrania služby sú dostupné nasledujúce akcie.

## Práca s MyMusic

Obľúbené albumy možno prehliadať priamym odkazom s identifikátorom objektu `MYMUSIC$` alebo prechodom do priečinka `My Albums` v koreňovom priečinku.

Správa obľúbených položiek je užitočná najmä vo veľkých zbierkach albumov, kde môže byť ručné prehliadanie celej knižnice zdĺhavé. Vybraný zoznam obľúbených albumov umožňuje rýchly návrat k požadovanému obsahu bez opakovaného širokého vyhľadávania alebo prechádzania hlbokej štruktúry priečinkov.

V praxi prinášajú obľúbené položky tieto výhody:

- Rýchlejší prístup k často prehrávaným albumom aj vo veľmi veľkých knižniciach.
- Pohodlnejšie každodenné prehliadanie vďaka oddeleniu uprednostňovaného obsahu od celého katalógu.
- Stabilnejšie postupy prehrávania pre klientov a automatizácie, ktoré potrebujú nemenný výber albumov.

### Vstupné parametre

Všetky akcie v tejto časti vyžadujú vstupný parameter. Album musí byť určený identifikátorom MusicBrainz alebo identifikátorom vydania Discogs. Vyžaduje sa aspoň jeden identifikátor. Inak sa žiadna akcia nevykoná.

Príklad pre album Madonny `Like a Virgin`:

| Atribút       |            Typ           |            Príklad hodnoty           |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          String          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Ak boli pri označení albumu ako obľúbeného zadané oba parametre (`MusicBrainzId` a `DiscogsId`), pri zrušení tohto označenia sa musia zadať tiež oba.
:::

### LikeAlbum

Označí hudobný album ako obľúbený.

### DislikeAlbum

Zruší označenie hudobného albumu ako obľúbeného.

### IsAlbumLikedInput

Overí, či je album aktuálne označený ako obľúbený. Ak sú zadané identifikátory MusicBrainz aj Discogs, metóda vráti `true`, ak je ako obľúbený označený aspoň jeden z nich.

## Akcie zálohovania

Služba poskytuje akcie na zálohovanie a obnovenie.

:::info
Pred obnovením je potrebné vytvoriť zálohu.
:::

### BackupAudioLikes

Vytvorí zálohu tabuľky `liked` s obľúbenými hudobnými albumami identifikovanými pomocou MusicBrainz alebo Discogs ID.

### RestoreAudioLikes

Obnoví tabuľku obľúbených albumov. Pred spustením tejto akcie zavolajte `BackupAudioLikes`.

### BackupRatings

Zapíše hodnotenia zvukových súborov do záložného súboru, ktorý obsahuje hash súboru a hodnotu hodnotenia.

### RestoreRatings

Obnoví hodnotenia zo zálohy vytvorenej pomocou `BackupRatings`.

## Práca s knižnicou

### RescanMediaStore

Znova preskenuje celú hudobnú knižnicu.

### RescanMediaStoreFolder

Znova preskenuje konkrétny priečinok bez rekurzívneho prechádzania podpriečinkov. Vstupným parametrom musí byť `ObjectID` priečinka.

