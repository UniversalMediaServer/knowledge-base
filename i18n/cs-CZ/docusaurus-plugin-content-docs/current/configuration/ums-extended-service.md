# Služba UPnP v UMS

UMS poskytuje rozšířenou službu UPnP, která externím řídicím bodům zpřístupňuje další systémové funkce.

## Využití

Služba je dostupná ve jmenném prostoru `schemas-upnp-org` s typem služby `UmsExtendedServices`.

V řídicím bodu napsaném v Javě s použitím JUPnP zavolejte `findService` na objektu `RemoteDevice` představujícím UMS:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Následující akce jsou dostupné prostřednictvím rozhraní služby.

## Práce s MyMusic

Oblíbená alba lze procházet přímo pomocí ID objektu `MYMUSIC$` nebo otevřením složky `My Albums` v kořenové složce.

Správa oblíbených alb je užitečná zejména u rozsáhlých sbírek, ve kterých ruční procházení celé knihovny zabírá hodně času. Vlastní výběr oblíbených alb umožňuje rychlý návrat k požadovanému obsahu bez opakovaného rozsáhlého vyhledávání nebo procházení hluboké struktury složek.

Oblíbené položky v praxi přinášejí tyto výhody:

- Rychlejší přístup k často přehrávaným albům, a to i ve velmi velkých knihovnách.
- Lepší každodenní navigace oddělením preferovaného obsahu od celého katalogu.
- Jednotnější postupy přehrávání pro klienty a automatizace, které závisejí na stálém výběru alb.

### Vstupní parametry

Všechny akce v této sekci vyžadují vstupní parametr. Album musí být identifikováno pomocí MusicBrainz ID nebo ID vydání Discogs. Alespoň jedno ID je vyžadováno; jinak není provedena žádná akce.

Příklad pro album Madonny `Like a Virgin`:

| Atribut       |            Typ           |            Příklad hodnoty           |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          String          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Pokud byly při označení alba jako oblíbeného zadány oba parametry (`MusicBrainzId` a `DiscogsId`), musí být oba zadány také při odebrání tohoto označení.
:::

### LikeAlbum

Označí hudební album jako oblíbené.

### DislikeAlbum

Odebere hudebnímu albu označení jako oblíbené.

### IsAlbumLikedInput

Ověří, zda je album právě označeno jako oblíbené. Pokud jsou zadány identifikátory MusicBrainz i Discogs, metoda vrátí `true`, pokud je alespoň jeden z nich označen jako oblíbený.

## Akce pro zálohování

Služba poskytuje akce pro zálohování a obnovení.

:::info
Před provedením obnovy musí být vytvořena záloha.
:::

### BackupAudioLikes

Vytvoří zálohu tabulky `liked` s oblíbenými hudebními alby identifikovanými pomocí ID MusicBrainz nebo Discogs.

### RestoreAudioLikes

Obnoví tabulku oblíbených alb. Před spuštěním této akce zavolejte `BackupAudioLikes`.

### BackupRatings

Zapíše hodnocení zvukových položek do záložního souboru, který obsahuje hash souboru a hodnotu hodnocení.

### RestoreRatings

Obnoví hodnocení ze zálohy vytvořené pomocí `BackupRatings`.

## Práce s knihovnou

### RescanMediaStore

Znovu prohledá celou hudební knihovnu.

### RescanMediaStoreFolder

Znovu prohledá konkrétní složku bez rekurze. Vstupním parametrem musí být `ObjectID` složky.

