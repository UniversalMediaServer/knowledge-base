# UMS UPnP Hizmeti

UMS, harici denetim noktalarının ek sistem özellikleriyle etkileşime girmesini sağlayan genişletilmiş bir UPnP hizmeti sağlar.

## Kullanım

Hizmet, `UmsExtendedServices` hizmet türüyle `schemas-upnp-org` ad alanı altında kullanıma sunulur.

JUPnP kullanan Java denetim noktaları için UMS `RemoteDevice`’da `findService`’i çağrır:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Bu hizmet arayüzü aracılığıyla aşağıdaki eylemler gerçekleştirilebilir.

## MyMusic etkileşimleri

Beğenilen albümlere derin bağlantı olarak `MYMUSIC$` nesne kimliği kullanılarak veya kök klasördeki `Albümlerim`e gidilerek göz atılabilir.

Sık kullanılanları korumak özellikle kitaplığın tamamına el ile göz atmanın zaman alıcı olabileceği büyük albüm koleksiyonlarında kullanışlıdır. Beğenilen albümlerin derlenmiş bir listesi, kullanıcıların tekrarlanan geniş aramalara veya derin klasörlerde gezinmeye gerek kalmadan ilgili içeriğe hızlı bir şekilde dönmelerine yardımcı olur.

Pratikte, sık kullanılanlar aşağıdaki faydaları sağlar:

- Çok büyük kitaplıklarda bile sık çalınan albümlere daha hızlı erişim.
- Tercih edilen içeriği tam katalogdan ayırarak günlük gezinmeyi daha iyi hale getirin.
- Kararlı albüm seçimlerine bağlı olan istemciler ve otomatikleştirmeler için daha tutarlı oynatma iş akışları.

### Giriş Parametreleri

Bu bölümdeki tüm eylemler bir giriş parametresi gerektirir. Albüm, MusicBrainz kimliği veya Discogs yayıö kimliğiyle tanımlanmak zorundadır. At least one ID is required; otherwise, no action is performed.

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

