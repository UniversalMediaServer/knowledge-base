# External API

Le API esterne consentono ai programmi di accedere o attivare funzionalità di UMS con chiamate HTTP.

## Come abilitare le API esterne

Modificare UMS.conf e configurare un api_key come:

`api_key = secret_password`

La _`secret_password`_ deve avere un minimo di 12 caratteri.

## Utilizzo API

Se l'API esterna è abilitata, l'API è accessibile con una chiamata POST a /api/COMANDO

### Scansione cartelle

#### rescan

| Scopo                           | Riscansiona la libreria completa                        |
| ------------------------------- | ------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescan`                             |
| POST BODY                       | NONE                                                    |
| POST BODY example / description | Questo comando non ha bisogno di contenuti per il corpo |
| Disponibile da                  | 10.4.2                                                  |

:::info
This can be slow for large libraries
:::

Esempio:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### rescanFileOrFolder

| Scopo                           | Riscansiona un sottoalbero parziale del file system.                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescanFileOrFolder`                                                                        |
| POST BODY                       | PATH_TO_SCAN                                                                                                 |
| POST BODY example / description | esempio: "/music/pop/Madonna". Il percorso deve essere la radice o una sottocartella di un percorso condiviso. |
| Disponibile da                  | 10.4.2                                                                                                         |

Esempio:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Mettere mi piace a Musica (album e canzoni)

#### like song

Il brano sarà contrassegnato con mi pace.

| Scopo                           | Mettere mi piace a una canzone identificata da musicBrainz trackId |
| ------------------------------- | ------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/likesong</span>`           |
| POST BODY                       | `musicBrainz_trackID`                                              |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                               |
| Disponibile da                  | 10.20                                                              |

Esempio:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| Intention                       | Mettere non mi piace a una canzone identificata da musicBrainz trackId |
| ------------------------------- | ---------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikesong`            |
| POST BODY                       | `musicBrainz_trackID`                                                  |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                   |
| Available since                 | 10.20                                                                  |

Esempio:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Controlla se il brano è marcato con mi piace.

| Scopo                           | Controlla se il brano identificato da musicBrainz trackId è marcato con mi piace                |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                       | `musicBrainz_trackID`                                                                           |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                   | `TRUE` o `FALSE`                                                                                |
| Disponibile da                  | 10.20                                                                                           |

Esempio:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Questa chiamata aggiunge l'attributo liked all'album identificato da musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### like album

Imposta a VERO lo stato mi piace all'album.

| Scopo                           | Mette mi piace un album identificato da musicBrainz releaseID |
| ------------------------------- | ------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>likealbum`     |
| POST BODY                       | `musicBrainz_releaseID`                                       |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                          |
| Disponibile da                  | 10.20                                                         |

Esempio:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### dislike album

Rimuovere lo stato mi piace all'album.

| Scopo                           | Mettere non mi piace a un album identificata da musicBrainz releaseID |
| ------------------------------- | --------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikealbum`          |
| POST BODY                       | `musicBrainz_releaseID`                                               |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                  |
| Disponibile da                  | 10.20                                                                 |

Esempio:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Questa chiamata rimuove l'attributo mi piace all'album identificato da musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### is album liked

Controlla lo stato mi piace dell'album.

| Scopo                           | Controlla se l'album identificato da musicBrainz releaseID è piaciuto |
| ------------------------------- | --------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked`          |
| POST BODY                       | `musicBrainz_releaseID`                                               |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                  |
| RESPONSE BODY                   | "TRUE" o "FALSE"                                                      |
| Disponibile da                  | 10.20                                                                 |

Esempio:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Questa chiamata controlla se l'album identificato da musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` ha lo stato mi piace.

### Valutazione

L'API di valutazione è responsabile la valutazione delle canzoni. Le informazioni di valutazione vengono salvate nel database interno (cache abilitata) e opzionalmente nel file stesso. Se in UMS.conf è impostato `audio_update_rating_tag = true` il  campo di valutazione IDv3 viene aggiornato anche nel file della canzone (se il formato di file delle canzoni è supportato).

Durante la navigazione della directory dei contenuti, MusicBrainzTrackID (se disponibile) e audiotrackID vengono consegnati come metadati `desc` all'interno dell'elemento DIDL.

#### set rating

| Scopo                           | Imposta la valutazione in stelle (0 - 5) su una canzone identificata da musicBrainz trackId     |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Disponibile da                  | 10.20                                                                                           |

Esempio:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Questa chiamata imposta la valutazione utente di tutte le canzoni identificate dal musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` a `3`.

#### get rating

Legge la valutazione del brano dal database

| Scopo                           | Ottiene la valutazione delle canzoni nelle stelle (0 - 5) da musicBrainz trackID. Il body di risposta contiene le informazioni sulla valutazione. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                                  |
| POST BODY                       | `musicbrainzTrackId`                                                                                                                              |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                              |
| RESPONSE BODY example           | 3                                                                                                                                                 |
| Disponibile da                  | 10.20                                                                                                                                             |

Esempio:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Questa chiamata legge la valutazione utente di una canzone identificata da musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| Scopo                           | Imposta la valutazione in stelle (0 - 5) su un brano identificato dall'audiotrackID interno di UMS             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                       | `trackID` /`stars`                                                                                             |
| POST BODY example / description | 32                                                                                                             |
| Available since                 | 11.0                                                                                                           |

Esempio:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Questa chiamata imposta la valutazione utente delle canzoni identificata da audiotrack id `32` a `3`.

#### get rating by audiotrack id

Legge la valutazione del brano dal database

| Scopo                           | Ottiene la valutazione delle canzoni in stelle (0 - 5) dall'audiotrackID interno di UMS. Il body di risposta contiene le informazioni sulla valutazione. |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                                            |
| POST BODY                       | trackId                                                                                                                                                  |
| POST BODY example / description | 32                                                                                                                                                       |
| RESPONSE BODY example           | 3                                                                                                                                                        |
| Disponibile da                  | 11.0                                                                                                                                                     |

Esempio:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Questa chiamata legge la valutazione utente di un brano identificato da UMS audiotrack-id `32`.

### Backup / Ripristino

Gli "album piaciuti" possono essere salvate in una sottocartella di profile-directory chiamata `database_backup`. Il nome del file è `MUSIC_BRAINZ_RELEASE_LIKE`. Nel caso in cui il database UMS venga eliminato, basta chiamare restore.

#### backup liked albums

Backup della tabella `MUSIC_BRAINZ_RELEASE_LIKE` su file system

| Scopo          | backup dei brani preferiti nel file system                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| URI            | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE   | GET                                                                                                   |
| RESPONSE BODY  | `OK` o messaggio di errore                                                                            |
| Disponibile da | 10.20                                                                                                 |

Esempio:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Questa chiamata creerà un file di backup contenente album preferiti.

#### restore liked albums

Ripristina la tabella `MUSIC_BRAINZ_RELEASE_LIKE` dal filesystem

| Scopo          | ripristinare i brani marcati con mi piace dal file di backup                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI            | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE   | GET                                                                                                                                        |
| RESPONSE BODY  | `OK` o messaggio di errore                                                                                                                 |
| Disponibile da | 10.20                                                                                                                                      |

Esempio:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Questa chiamata ripristina il file di backup.

### Playlist

#### enable service

Edit UMS.conf and configure a managed playlist folder by setting 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

for enabling this service. By default this service is disabled. The playlist folder path should be located beneath a configured shared `<span class="s1">folders</span>` path for playlist changed made by this API to be visible by UMS.

#### list all playlists

Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs.

| Intention             | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder. Besides playlist name, the playlists `playlistId` is                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE          | GET                                                                                                                                                                             |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                                                    |
| RESPONSE BODY example | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Available since       | 11.0                                                                                                                                                                            |

Example:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

This call will list all available playlists.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Intention             | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY example | [{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]                                                                      |
| Available since       | dev branch                                                                                                                                               |

Example:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

This call will list list all available playlist accessible by UMS.

#### adding songs to playlists

The required `audiotrackid` is delivered during UPnP browse requests and can be extracted from the DIDL response attribute `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Intention                       | Add song to playlist                                                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                              |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY example / description | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                   | NONE                                                                                                                                                                              |
| Available since                 | 11.0                                                                                                                                                                              |

Example:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

This adds the song with the ID `123` to the playlist `Pop`.

#### removing songs from playlists

The required `audiotrackid` is delivered during UPnP browse requests and can be extracted from the DIDL response attribute `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Intention                       | Remove song from playlist                                                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                                   |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY example / description | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                   | NONE                                                                                                                                                                                   |
| Available since                 | 11.0                                                                                                                                                                                   |

Example:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

This removes the song with the ID `123` from the playlist `Pop`.

#### create new playlists

Playlist name should be provided without any path and without file extensions. 

| Intention                       | Creating new playlists in managed playlist folder                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                           |
| POST BODY                       | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY example / description | Contemporary                                                                                                                                                                   |
| RESPONSE BODY                   | NONE                                                                                                                                                                           |
| Available since                 | 11.0                                                                                                                                                                           |

Example:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
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
