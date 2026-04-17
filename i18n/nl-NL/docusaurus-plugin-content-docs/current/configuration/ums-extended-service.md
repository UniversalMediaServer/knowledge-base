# UMS UPnP Service

UMS biedt een uitgebreide UPnP-service die het mogelijk maakt om externe controlepunten te laten communiceren met extra systeemfuncties.

## Gebruik

De service is bekend onder namespace `schemas-upnp-org` met service type `UmsExtendedServices`.

Voor Java control punten met behulp van JUPnP, zoek `findService` op de UMS `RemoteDevice`:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

De volgende acties zijn beschikbaar via deze service interface.

## MijnMuziek interacties

Je kunt je vind-ik-leuk albums bekijken via de object-ID `MijnMuziek` als een directe link of door naar `Mijn albums` in de hoofdmap te navigeren.

Het behouden van favorieten is vooral nuttig in grote albumverzamelingen, waar het handmatig browsen van de volledige bibliotheek tijdrovend kan worden. Een samengestelde lijst van vind-ik-leuk albums helpt gebruikers snel naar relevante inhoud terug te keren zonder herhaalde uitgebreide zoekopdrachten of diepe mappen navigatie.

In de praktijk bieden favorieten de volgende voordelen:

- Snellere toegang tot vaak gespeelde albums, zelfs in zeer grote bibliotheken.
- Betere dagelijkse navigatie door de voorkeursinhoud te scheiden van de volledige catalogus.
- Meer consistente afspeelwerkstromen voor spelers en automatiseringen die afhankelijk zijn van stabiele albumkeuzes.

### Invoerparameters

Alle acties in deze sectie vereisen een invoerparameter. Het album moet worden geïdentificeerd door een MusicBrainz ID of een Discogs release ID. Er is ten minste één ID vereist; anders wordt er geen actie uitgevoerd.

Voorbeeld voor de uitgave van Madonna's `Like een Virgin`:

| Attribuut     |           Type           |           Voorbeeld waarde           |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |        Tekenreeks        | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Als beide parameters (`MusicBrainzId` en `DiscogsId`) waren verstrekt tijdens het leuk vinden van een album, moeten beide ook worden verstrekt bij het niet-leuk-vinden van  een album.
:::

### Album leuk-vinden

Markeert een album als vind-ik-leuk.

### Album niet-leuk-vinden

Verwijdert de vind-ik-leuk status van een muziekalbum.

### IsAlbumLeukbevondenInvoer

Controleert of een album momenteel als vind-ik-leuk wordt gemarkeerd. Als zowel MusicBrainz als Discogs IDs zijn voorzien, geeft de methode `true`  als ten minste één van de ID's is gemarkeerd is als vind-ik-leuk.

## Back-up Acties

De service biedt back-up en herstel acties.

:::info
Er moet een back-up worden gemaakt voordat een herstel kan worden uitgevoerd.
:::

### BackupAudioVind-ik-leuks

Maakt een back-up van de `vind-ik-leuk` audio albums tabel geïdentificeerd door MusicBrainz of Discogs IDs.

### HerstelAudioVind-ik-leuks

Herstelt de vind-ik-leuk albums tabel. Call `BackupAudioLikes` before running this action.

### BackupRatings

Writes audio rating data to a backup file containing the file hash and rating value.

### RestoreRatings

Restores rating information from a backup created with `BackupRatings`.

## Library Interactions

### RescanMediaStore

Rescans the entire music library.

### RescanMediaStoreFolder

Rescans a specific folder without recursion. The input parameter must be the folder's `ObjectID`.

