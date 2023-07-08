# Harici API

Harici API, programların bir HTTP çağrısıyla UMS işlevlerine erişmesini veya bunları tetiklemesini sağlar.

## Harici API nasıl etkinleştirilir

UMS.conf dosyasını düzenleyin ve şunun gibi bir api_anahtarı yapılandırın

`api_anahtarı = gizli_parola`

_`gizli_parola`_ en az 12 karakterden oluşmak zorundadır.

## API kullanımı

Eğer harici API etkinleştirildiyse, API’ye /api/KOMUT olarak yapılan bir POST çağrısıyla erişilebilir.

### Klasör Tarama

#### rescan

| Niyet                      | Tüm kütüphaneyi yeniden tarar              |
| -------------------------- | ------------------------------------------ |
| URI                        | `/api/folderscanner/rescan`                |
| POST BODY                  | YOK                                        |
| POST BODY örnek / açıklama | Bu komutun gövde içeriğine ihtiyacı yoktur |
| Şu sürümden beri mevcut    | 10.4.2                                     |

:::info
Bu, büyük kütüphaneler için yavaş olabilir
:::

Örnek:

```shell
curl -w "%{http_code}\n" -H "api-key: gizli_parola" http://localhost:5001/api/folderscanner/rescan
```

#### rescanFileOrFolder

| Niyet                      | Dosya sisteminin kısmi bir alt ağacını yeniden tarar.                                         |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| URI                        | `/api/folderscanner/rescanFileOrFolder`                                                       |
| POST BODY                  | TARANACAK_YOL                                                                                 |
| POST BODY örnek / açıklama | örnek: "/music/pop/Madonna". Yol, paylaşılan bir yolun kök veya alt klasörü olmak zorundadır. |
| Şu sürümden beri mevcut    | 10.4.2                                                                                        |

Örnek:

```shell
curl -d "TARANACAK_YOL" -w "%{http_code}\n" -H "api-key: gizli_parola" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Müzik Beğenme (albümler ve şarkılar)

#### like song

Şarkı beğenildi olarak işaretlenecektir.

| Niyet                      | musicBrainz trackId ile tanımlanan bir şarkıyı beğenir   |
| -------------------------- | -------------------------------------------------------- |
| URI                        | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                  | `musicBrainz_trackID`                                    |
| POST BODY örnek / açıklama | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Şu sürümden beri mevcut    | 10.20                                                    |

Örnek:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Şarkı beğenilmeyecektir

| Niyet                      | musicBrainz trackId ile tanımlanan bir şarkıyı beğenmez     |
| -------------------------- | ----------------------------------------------------------- |
| URI                        | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                  | `musicBrainz_trackID`                                       |
| POST BODY örnek / açıklama | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Şu sürümden beri mevcut    | 10.20                                                       |

Örnek:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Şarkının beğenilip beğenilmediğini denetleyin.

| Niyet                      | musicBrainz trackId ile tanımlanan şarkının beğenilip beğenilmediğini denetler                  |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                  | `musicBrainz_trackID`                                                                           |
| POST BODY örnek / açıklama | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY              | `TRUE` veya `FALSE`                                                                             |
| Şu sürümden beri mevcut    | 10.20                                                                                           |

Örnek:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Bu çağrı, musicbrainz yayım kimliği `1e0eee38-a9f6-49bf-84d0-45d0647799af` ile tanımlanan albümün beğenildi özniteliğini ekler.

#### like album

Albüm beğenme durumunu true olarak ayarlayın.

| Niyet                      | musicBrainz releaseID ile tanımlanan bir albümü beğenir   |
| -------------------------- | --------------------------------------------------------- |
| URI                        | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                  | `musicBrainz_releaseID`                                   |
| POST BODY örnek / açıklama | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Şu sürümden beri mevcut    | 10.20                                                     |

Örnek:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### dislike album

Albüm beğenme durumunu kaldırın.

| Niyet                      | musicBrainz releaseID ile tanımlanan bir şarkıyı beğenmez    |
| -------------------------- | ------------------------------------------------------------ |
| URI                        | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                  | `musicBrainz_releaseID`                                      |
| POST BODY örnek / açıklama | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Şu sürümden beri mevcut    | 10.20                                                        |

Örnek:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Bu çağrı, musicbrainz yayım kimliği `1e0eee38-a9f6-49bf-84d0-45d0647799af` ile tanımlanan albümün beğenildi özniteliğini kaldırır.

#### is album liked

Albüm beğenme durumunu denetleyin.

| Niyet                      | musicBrainz releaseID ile tanımlanan albümün beğenilip beğenilmediğini denetler |
| -------------------------- | ------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/like/</span>isalbumliked`                    |
| POST BODY                  | `musicBrainz_releaseID`                                                         |
| POST BODY örnek / açıklama | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                            |
| RESPONSE BODY              | "TRUE" veya "FALSE"                                                             |
| Şu sürümden beri mevcut    | 10.20                                                                           |

Örnek:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Bu çağrı, musicbrainz yayım kimliği `1e0eee38-a9f6-49bf-84d0-45d0647799af` ile tanımlanan albümün beğenilip beğenilmediğini denetler.

### Derecelendirme

Derecelendirme API’si, şarkıları değerlendirmekten sorumludur. Derecelendirme bilgileri dahili veritabanına (önbellek etkin) ve isteğe bağlı olarak dosyanın kendisine kaydedilir. Eğer UMS.conf içinde  `audio_update_rating_tag = true` olarak ayarlanırsa, IDv3 derecelendirme alanı da şarkı dosyasında güncellenir (şarkı dosyası biçimi destekleniyorsa).

İçerik dizini sunucusuna göz atarken, MusicBrainzTrackID (varsa) ve audiotrackID, DIDL öğesi içinde `desc` üstverisi olarak teslim edilir.

#### set rating

| Niyet                      | musicBrainz trackId ile tanımlanan bir şarkıda derecelendirmeyi yıldız (0 - 5) olarak ayarlar   |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                  | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY örnek / açıklama | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Şu sürümden beri mevcut    | 10.20                                                                                           |

Örnek:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Bu çağrı, musicbrainz parça kimliği `b8695995-45e9-405d-b4aa-e50e8760fe25` ile tanımlanan tüm şarkıların kullanıcı derecelendirmesini `3` olarak ayarlar.

#### get rating

Veritabanından şarkı derecelendirmesini okur

| Niyet                      | musicBrainz trackID ile şarkı derecelendirmesini yıldız (0 - 5) olarak alır. Yanıt gövdesi derecelendirme bilgilerini içerir. |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                              |
| POST BODY                  | `musicbrainzTrackId`                                                                                                          |
| POST BODY örnek / açıklama | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                          |
| RESPONSE BODY örnek        | 3                                                                                                                             |
| Şu sürümden beri mevcut    | 10.20                                                                                                                         |

Örnek:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Bu çağrı, musicbrainz parça kimliği `b8695995-45e9-405d-b4aa-e50e8760fe25` ile tanımlanan bir şarkının kullanıcı derecelendirmesini okur.

#### set rating by audiotrack id

| Niyet                      | UMS dahili audiotrackID ile tanımlanan bir şarkıda derecelendirmeyi yıldız (0 - 5) olarak ayarlar              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                  | `trackID` /`stars`                                                                                             |
| POST BODY örnek / açıklama | 32                                                                                                             |
| Şu sürümden beri mevcut    | 11.0                                                                                                           |

Örnek:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Bu çağrı, audiotrack kimliği `32` ile tanımlanan şarkıların kullanıcı derecelendirmesini `3` olarak ayarlar.

#### get rating by audiotrack id

Veritabanından şarkı derecelendirmesini okur

| Niyet                      | UMS dahili audiotrackID ile şarkı derecelendirmesini yıldız (0 - 5) olarak alır. Yanıt gövdesi derecelendirme bilgilerini içerir. |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                     |
| POST BODY                  | trackId                                                                                                                           |
| POST BODY örnek / açıklama | 32                                                                                                                                |
| RESPONSE BODY örnek        | 3                                                                                                                                 |
| Şu sürümden beri mevcut    | 11.0                                                                                                                              |

Örnek:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Bu çağrı, UMS audiotrack-id `32` ile tanımlanan bir şarkının kullanıcı derecelendirmesini okur.

### Yedekleme / Geri yükleme

Kullanıcı tarafından yönetilen "beğenilen albüm" girişleri, `database_backup` adlı bir profil dizini alt klasörüne yedeklenebilir. Dosya adı `MUSIC_BRAINZ_RELEASE_LIKE`’dır. UMS veritabanının silinmesi durumunda geri yüklemeyi çağırmanız yeterlidir.

#### backup liked albums

`MUSIC_BRAINZ_RELEASE_LIKE` tablosunu dosya sistemine yedekler

| Niyet                   | Beğenilen şarkıları dosya sistemine yedekler                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------- |
| URI                     | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE            | GET                                                                                                   |
| RESPONSE BODY           | `OK` veya hata iletisi                                                                                |
| Şu sürümden beri mevcut | 10.20                                                                                                 |

Örnek:

```shell
curl -w "%{http_code}\n" -H "api-key: gizli_parola" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Bu çağrı, beğenilen albümleri içeren bir yedekleme dosyası oluşturacaktır.

#### restore liked albums

`MUSIC_BRAINZ_RELEASE_LIKE` tablosunu dosya sisteminden geri yükler

| Niyet                   | Beğenilen şarkıları yedekleme dosyasından geri yükler                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                     | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE            | GET                                                                                                                                        |
| RESPONSE BODY           | `OK` veya hata iletisi                                                                                                                     |
| Şu sürümden beri mevcut | 10.20                                                                                                                                      |

Örnek:

```
curl -w "%{http_code}\n" -H "api-key: gizli_parola" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Bu çağrı, yedekleme dosyasını geri yükler.

### Çalma listesi

#### enable service

Bu hizmeti etkinleştirmek için UMS.conf dosyasını düzenleyin ve 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

parametresini ayarlayarak yönetilen bir çalma listesi klasörü yapılandırın. Varsayılan olarak bu hizmet etkisizleştirilmiştir. Çalma listesi klasörü yolu, UMS tarafından görünür olması için bu API tarafından yapılan değiştirilmiş çalma listesi için yapılandırılmış bir paylaşılan `<span class="s1">klasörler</span>` yolunun altında bulunmalıdır.

#### list all playlists

Mevcut çalma listelerini okur. Bu çalma listesi adları, sonraki çağrılarda şarkı eklemek veya kaldırmak için kullanılmak zorundadır.

| Niyet                   | Tüm desteklenen (`m3u`, `m3u8` ve `pls`) ve yapılandırılmış klasördeki mevcut çalma listelerini sunar. Çalma listesi adının yanı sıra `playlistId` oynatma listeleri            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE            | GET                                                                                                                                                                             |
| RESPONSE BODY           | Çalma listesi adlarının JSON dizilimi                                                                                                                                           |
| RESPONSE BODY örnek     | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Şu sürümden beri mevcut | 11.0                                                                                                                                                                            |

Örnek:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: gizli_parola" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Bu çağrı, tüm mevcut çalma listelerini listeleyecek.

#### list server accessible playlists

Bunların tümü UMS tarafından bilinen çalma listeleridir (veritabanı/önbellek etkin). Bu çalma listesi adları, sonraki çağrılarda şarkı eklemek veya kaldırmak için kullanılmak zorundadır. Çalma listesi kimliği, `objectId` `$DBID$PLAYLIST$` concat databaseId’ye göz atarak doğrudan çalma listesine gitmek için kullanılabilir.

| Niyet                   | Tüm desteklenen (`m3u`, `m3u8` ve `pls`) ve yapılandırılmış klasördeki mevcut çalma listelerini sunar                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE            | GET                                                                                                                                                      |
| RESPONSE BODY           | Çalma listesi adlarının JSON dizilimi                                                                                                                    |
| RESPONSE BODY örnek     | [{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]                                                                      |
| Şu sürümden beri mevcut | dev dalı                                                                                                                                                 |

Örnek:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: gizli_parola" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Bu çağrı, UMS tarafından erişilebilen tüm mevcut çalma listelerini listeleyecek.

#### adding songs to playlists

Gerekli `audiotrackid`, UPnP tarama istekleri sırasında teslim edilir ve `descMetadata` DIDL yanıt özniteliğinden çıkarılabilir

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Niyet                      | Çalma listesine şarkı ekler                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE               | POST                                                                                                                                                                              |
| POST BODY                  | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY örnek / açıklama | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY              | YOK                                                                                                                                                                               |
| Şu sürümden beri mevcut    | 11.0                                                                                                                                                                              |

Örnek:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: gizli_parola" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Bu, kimliği `123` olan şarkıyı `Pop` çalma listesine ekler.

#### removing songs from playlists

Gerekli `audiotrackid`, UPnP tarama istekleri sırasında teslim edilir ve `descMetadata` DIDL yanıt özniteliğinden çıkarılabilir

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Niyet                      | Şarkıyı çalma listesinden kaldırır                                                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                        | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE               | POST                                                                                                                                                                                   |
| POST BODY                  | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY örnek / açıklama | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY              | YOK                                                                                                                                                                                    |
| Şu sürümden beri mevcut    | 11.0                                                                                                                                                                                   |

Örnek:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: gizli_parola" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Bu, kimliği `123` olan şarkıyı `Pop` çalma listesinden kaldırır.

#### create new playlists

Çalma listesi adı herhangi bir yol ve dosya uzantısı olmadan sağlanmalıdır. 

| Niyet                      | Yönetilen çalma listesi klasöründe yeni çalma listeleri oluşturma                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                        | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE               | POST                                                                                                                                                                           |
| POST BODY                  | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">ÇALMALİSTESİ_ADI</span>`                                                      |
| POST BODY örnek / açıklama | Modern                                                                                                                                                                         |
| RESPONSE BODY              | YOK                                                                                                                                                                            |
| Şu sürümden beri mevcut    | 11.0                                                                                                                                                                           |

Örnek:

```shell
curl -d "Modern" -w "\n%{http_code}\n" -H "api-key: gizli_parola" -X POST http://localhost:5001/api/playlist/createPlaylist
```

This call creates a new playlist file named `Contemporary.m3u8` in the managed playlist folder.

## Java code example

This code snippet shows how to use the API with okhttp3 library.

```Java
import nextcp.dto.Config;
import nextcp.dto.UmsServerApiKey;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

[...]

    public String executeCall() throws IOException
    {
        String postBody = "1e0eee38-a9f6-49bf-84d0-45d0647799af";
        String apiKey = "secret_password";
        RequestBody body = RequestBody.create(postBody, MediaType.parse("application/text"));
        String requestUrl = "http://127.0.0.1:5001/api/like/likealbum";
        Request request = new Request.Builder().url(requestUrl).addHeader("api-key", apiKey).post(body).build();
        Call call = okClient.newCall(request);
        Response response = call.execute();
        return response.body().string();
    }
```

## HTTP return codes

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Set a `api_key` in UMS.conf with a length of 12 or more character |
