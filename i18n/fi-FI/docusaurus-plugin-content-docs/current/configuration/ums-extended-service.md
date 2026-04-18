# UMS UPnP-palvelu

UMS tarjoaa laajennetun UPnP-palvelun, jonka avulla ulkoiset ohjauspisteet voivat olla vuorovaikutuksessa järjestelmän lisäominaisuuksien kanssa.

## Käyttö

Palvelu löytyy nimiavaruudessa `schemas-upnp-org`-alta, jonka palvelutyyppi on `UmsExtendedServices`.

Javassa käyttäen JUPnP:tä, kutsu `findService` UMS `RemoteDevice`ssa:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Seuraavat toiminnot ovat käytettävissä tämän palvelukäyttöliittymän kautta.

## MyMusic vuorovaikutukset

Pidettyjä albumeja voidaan selata käyttämällä object ID:tä `MYMUSIC$` syvänä linkkinä tai navigoimalla `My Albums`-kansioon.

Maintaining favorites is especially useful in large album collections, where manually browsing the complete library can become time-consuming. A curated list of liked albums helps users quickly return to relevant content without repeated broad searches or deep folder navigation.

In practice, favorites provide the following benefits:

- Faster access to frequently played albums, even in very large libraries.
- Better day-to-day navigation by separating preferred content from the full catalog.
- More consistent playback workflows for clients and automations that depend on stable album selections.

### Input Parameters

All actions in this section require an input parameter. The album must be identified by a MusicBrainz ID or a Discogs release ID. At least one ID is required; otherwise, no action is performed.

Example for Madonna's release `Like a Virgin`:

| Attribute     |           Type           |             Example value            |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          String          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
If both parameters (`MusicBrainzId` and `DiscogsId`) were provided when liking an album, both must also be provided when disliking that album.
:::

### LikeAlbum

Marks a music album as liked.

### DislikeAlbum

Removes the liked status from a music album.

### IsAlbumLikedInput

Checks whether an album is currently marked as liked. If both MusicBrainz and Discogs IDs are provided, the method returns `true` if at least one of the IDs is marked as liked.

## Backup Actions

The service provides backup and restore actions.

:::info
A backup must be created before a restore can be performed.
:::

### BackupAudioLikes

Creates a backup of the `liked` audio albums table identified by MusicBrainz or Discogs IDs.

### RestoreAudioLikes

Restores the liked albums table. Call `BackupAudioLikes` before running this action.

### BackupRatings

Writes audio rating data to a backup file containing the file hash and rating value.

### RestoreRatings

Restores rating information from a backup created with `BackupRatings`.

## Library Interactions

### RescanMediaStore

Rescans the entire music library.

### RescanMediaStoreFolder

Rescans a specific folder without recursion. The input parameter must be the folder's `ObjectID`.

