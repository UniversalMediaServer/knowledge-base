# API esterne

Le API esterne consentono ai programmi di accedere o attivare funzionalità di UMS con chiamate HTTP.

## Come abilitare le API esterne

Modificare UMS.conf e configurare un api_key come:

`api_key = password_segreta`

La _`secret_password`_ deve avere un minimo di 12 caratteri.

## Utilizzo API

Se l'API esterna è abilitata, l'API è accessibile con una chiamata POST a /api/COMANDO

### Scansione cartelle

#### rescan

| Scopo                           | Riscansiona la libreria completa                        |
| ------------------------------- | ------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescan`                             |
| POST BODY                       | Niente                                                  |
| POST BODY esempio / descrizione | Questo comando non ha bisogno di contenuti per il corpo |
| Disponibile da                  | 10.4.2                                                  |

:::info
Questo può essere lento per le grandi librerie
:::

Esempio:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### rescan file or folder

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

| Scopo                           | Mettere non mi piace a una canzone identificata da musicBrainz trackId |
| ------------------------------- | ---------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikesong`            |
| POST BODY                       | `musicBrainz_trackID`                                                  |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                   |
| Disponibile da                  | 10.20                                                                  |

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

#### album simile

Imposta a VERO lo stato mi piace all'album.

| Scopo                           | Mette mi piace un album identificato da musicBrainz releaseID |
| ------------------------------- | ------------------------------------------------------------- |
|                                 | `<span class="s1">/api/like/</span>likealbum`     |
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

Modificare UMS.conf per configurare una cartella della playlist impostando 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

per abilitare questo servizio. Per impostazione predefinita questo servizio è disabilitato. Il percorso della cartella della playlist dovrebbe essere situato sotto un percorso di una cartella condivisa `<span class="s1">folders</span>` per la playlist modificata da questa API per essere visibile da UMS.

#### list all playlists

Legge le playlist disponibili. Questi nomi di playlist devono essere usati per le chiamate successive per aggiungere o rimuovere brani.

| Scopo                 | Fornisce tutti i supportati (`m3u`, `m3u8` e `pls`) e le playlist disponibili per la cartella configurata. Oltre al nome della playlist, la playlist `playlistId` è             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE          | GET                                                                                                                                                                             |
| RESPONSE BODY         | Array JSON dei nomi delle playlist                                                                                                                                              |
| RESPONSE BODY example | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Disponibile da        | 11.0                                                                                                                                                                            |

Esempio:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Questa chiamata elencherà tutte le playlist disponibili.

#### list server accessible playlists

Queste sono tutte playlist note a UMS (database/cache abilitato). Questi nomi di playlist devono essere usati per le chiamate successive per aggiungere o rimuovere brani. L'ID della playlist può essere utilizzato per navigare direttamente alla playlist sfogliando l' `objectId` `$DBID$PLAYLIST$` con concatenato databaseId.

| Intention             | Fornisce tutti i supportati (`m3u`, `m3u8` e `pls`) e le playlist disponibili per la cartella configurata.                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | Array JSON dei nomi delle playlist                                                                                                                       |
| RESPONSE BODY example | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Disponibile da        | dev branch                                                                                                                                               |

Esempio:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Questa chiamata elencherà tutte le playlist disponibili accessibili da UMS.

#### adding songs to playlists

L'`audiotrackid` è restituito durante la richiesta di browse UPnP e può essere estratto dall'attributo `descMetadata` della risposta DIDL

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Scopo                           | Aggiunge brano alla playlist                                                                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                              |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY example / description | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                   | NONE                                                                                                                                                                              |
| Disponibile da                  | 11.0                                                                                                                                                                              |

Esempio:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Aggiunge la canzone con l'ID `123` alla playlist `Pop`.

#### removing songs from playlists

L'`audiotrackid` è restituito durante la richiesta di browse UPnP e può essere estratto dall'attributo `descMetadata` della risposta DIDL

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Scopo                           | Rimuove brano dalla playlist                                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                                   |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY example / description | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                   | NONE                                                                                                                                                                                   |
| Disponibile da                  | 11.0                                                                                                                                                                                   |

Esempio:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Rimuove la canzone con l'ID `123` dalla playlist `Pop`.

#### create new playlists

Il nome della playlist deve essere fornito senza alcun percorso e senza estensioni di file. 

| Scopo                           | Creazione di nuove playlist nella cartella delle playlist gestite                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                           |
| POST BODY                       | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY example / description | Contemporary                                                                                                                                                                   |
| RESPONSE BODY                   | NONE                                                                                                                                                                           |
| Disponibile da                  | 11.0                                                                                                                                                                           |

Esempio:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Questa chiamata crea un nuovo file di playlist chiamato `Contemporary.m3u8` nella cartella di playlist gestita.

## Esempio di codice Java

Questo pezzo di codice mostra come usare l'API con la libreria okhttp3.

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

## Codici di stato HTTP

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Set a `api_key` in UMS.conf with a length of 12 or more character |
