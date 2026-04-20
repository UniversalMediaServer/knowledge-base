# UMS UPnP Service

UMS poskytuje rozšířenou službu UPnP, která umožňuje externím kontrolním bodům interakci s dalšími systémovými funkcemi.

## Využití

Služba je vystavena pod názvem `schemas-upnp-org` s typem služby `UmsExtendedServices`.

Pro ovládací body Javy pomocí JUPnP, volejte `findService` na UMS `RemoteDevice`:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Následující akce jsou dostupné prostřednictvím rozhraní služby.

## MyMusic interakce

Alba, která se mi líbí lze prohlížet pomocí ID objektu `MYMUSIC$` jako hluboký odkaz nebo navigací do `My Albums` v kořenové složce.

Udržování oblíbených je užitečné zejména ve velkých sbírkách alb, kde se ruční prohlížení celé knihovny může stát časově náročným. Upravený seznam oblíbených alb pomáhá uživatelům rychle se vrátit k relevantnímu obsahu bez opakovaného širokého vyhledávání nebo hluboké navigace se složkami.

V praxi dávají oblíbené tyto výhody:

- Rychlejší přístup k často přehrávaným albům, a to i ve velmi velkých knihovnách.
- Lepší každodenní navigace oddělením preferovaného obsahu od celého katalogu.
- Konsistentnější pracovní postupy přehrávání pro klienty a automatizace, které závisejí na stabilním výběru alba.

### Vstupní parametry

Všechny akce v této sekci vyžadují vstupní parametr. Album musí být identifikováno pomocí MusicBrainz ID nebo ID vydání Discogs. Alespoň jedno ID je vyžadováno; jinak není provedena žádná akce.

Příklad pro Madonnino vydání `Like a Virgin`:

| Atribut       |            Typ           |            Příklad hodnoty           |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          Řetězec         | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Pokud byly oba parametry (`MusicBrainzId` a `DiscogsId`) poskytnuty při ocenění alba, musí být také poskytnuty při neocenění tohoto alba.
:::

### LikeAlbum

Označí hudební album jako líbící se.

### DislikeAlbum

Odstraní oblíbený stav z hudebního alba.

### IsAlbumLikedInput

Zkontroluje, zda je album v současné době označeno jako líbící se. Pokud jsou poskytnuty jak MusicBrainz, tak Discogs ID, metoda vrátí `true` pokud je alespoň jedno z ID označeno jako líbící se.

## Zálohovat akce

Služba poskytuje zálohu a obnovení.

:::info
Před provedením obnovy musí být vytvořena záloha.
:::

### BackupAudioLikes

Vytvoří zálohu tabulky 'líbí' audio alba identifikované MusicBrainz nebo Discogs ID.

### RestoreAudioLikes

Obnoví tabulku oblíbených alb. Před spuštěním této akce zavolejte `backupAudioLikes`.

### BackupRatings

Zapisuje zvuková hodnocení do záložního souboru obsahující hash souboru a hodnotu hodnocení.

### RestoreRatings

Obnoví hodnocení ze zálohy vytvořené pomocí `BackupRatings`.

## Interakce knihovny

### RescanMediaStore

Rescans the entire music library.

### RescanMediaStoreFolder

Rescans a specific folder without recursion. The input parameter must be the folder's `ObjectID`.

