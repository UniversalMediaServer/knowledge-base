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

Bu bölümdeki tüm eylemler bir giriş parametresi gerektirir. Albüm, MusicBrainz kimliği veya Discogs yayıö kimliğiyle tanımlanmak zorundadır. En az bir kimlik gerekir; aksi halde bir eylem gerçekleşmez.

Madonna’nın `Like a Virgin` albümüne örnek:

| Öznitelik     |            Tür           |              Örnek değer             |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |           Dizgi          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Bir albümü beğenirken her iki parametre de (`MusicBrainzId` ve `DiscogsId`) sağlandıysa, o albümü beğenmediğinizde de her ikisi de sağlanmak zorundadır.
:::

### LikeAlbum

Bir müzik albümünü beğenildi olarak işaretler.

### DislikeAlbum

Bir müzik albümünden beğenildi durumunu kaldırır.

### IsAlbumLikedInput

Bir albümün şu anda beğenildi olarak işaretlenip işaretlenmediğini denetler. Eğer hem MusicBrainz hem de Discogs kimlikleri sağlanırsa, kimliklerden en az biri beğenildi olarak işaretlenmişse yöntem `true` değerine döndürür.

## Yedekleme Eylemleri

Hizmet, yedekleme ve geri yükleme eylemleri sağlar.

:::info
Geri yüklemenin gerçekleştirilebilmesi için önce bir yedekleme oluşturulmak zorundadır.
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

