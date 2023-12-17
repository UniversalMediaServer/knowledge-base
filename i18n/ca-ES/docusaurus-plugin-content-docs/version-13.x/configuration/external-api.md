# Aplicacions externes

Sense clau Text del paràgraf XPath: /p[1]

## How to enable the external API

Editeu UMS.conf i configureu una api_key com aquesta

`api_key = contrasenya_secreta`

La _`contrasenya_secreta`_ ha de tenir un mínim de 12 caràcters.

## Ús de l'API

Si l'API externa està habilitada, es pot accedir a l'API amb una trucada POST a /api/COMMAND

### Escaneig de carpetes

#### Tornar a escanejar

| Sense clau Capçalera de la taula XPath: /table[1]/thead/tr/th[1] | Sense clau Capçalera de la taula XPath: /table[1]/thead/tr/th[2] |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| Sense clau Dades de la taula XPath: /table[1]/tbody/tr[1]/td[1]  | `Sense clau
Text
XPath: /table[1]/tbody/tr[1]/td[2]/code`        |
| Sense clau Dades de la taula XPath: /table[1]/tbody/tr[2]/td[1]  | Sense clau Dades de la taula XPath: /table[1]/tbody/tr[2]/td[2]  |
| Sense clau Dades de la taula XPath: /table[1]/tbody/tr[3]/td[1]  | Sense clau Dades de la taula XPath: /table[1]/tbody/tr[3]/td[2]  |
| Sense clau Dades de la taula XPath: /table[1]/tbody/tr[4]/td[1]  | Sense clau Dades de la taula XPath: /table[1]/tbody/tr[4]/td[2]  |

:::info
Això pot ser lent per a biblioteques grans
:::

Exemple:

```shell
Sense clau
Text
XPath: /pre[1]/code
```

#### Sense clau Títol 4 XPath: /h4[2]

| Sense clau Capçalera de la taula XPath: /table[2]/thead/tr/th[1] | Sense clau Capçalera de la taula XPath: /table[2]/thead/tr/th[2]                               |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| No key Table Data XPath: /table[2]/tbody/tr[1]/td[1]             | `Sense clau
Text
XPath: /table[2]/tbody/tr[1]/td[2]/code`                                      |
| Sense clau Dades de la taula XPath: /table[2]/tbody/tr[2]/td[1]  | Sense clau Dades de la taula XPath: /table[2]/tbody/tr[2]/td[2]                                |
| Sense clau Dades de la taula XPath: /table[2]/tbody/tr[3]/td[1]  | Exemple: "/music/pop/Madonna". El camí ha de ser l'arrel o una subcarpeta d'un camí compartit. |
| Disponible des de                                                | Sense clau Dades de la taula XPath: /table[2]/tbody/tr[4]/td[2]                                |

Exemple:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "clau-api: contrasenya_secreta" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Sense clau Títol 3 XPath: /h3[2

#### Sense clau Títol 4 XPath: /h4[3]

La cançó es marcarà com que t'agrada.

| Intenció                       | Com una cançó identificada per "musicBrainz trackId"            |
| ------------------------------ | --------------------------------------------------------------- |
| URI                            | `<span class="s1">/api/like/likesong</span>`        |
| POST BODY                      | `musicBrainz_trackID`                                           |
| POST BODY exemple / descripció | b8695995-45e9-405d-b4aa-e50e8760fe25                            |
| Disponible des de              | Sense clau Dades de la taula XPath: /table[3]/tbody/tr[4]/td[2] |

Exemple:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### La cançó no m'agrada

La cançó no és desagradable

| Intenció                       | No m'agrada una cançó identificada per musicBrainz trackId- |
| ------------------------------ | ----------------------------------------------------------- |
| URI                            | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                      | `musicBrainz_trackID`                                       |
| POST BODY exemple / descripció | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Disponible des de              | 10.20                                                       |

Exemple:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### és la cançó que us agrada

Comproveu si la cançó us agrada.

| Intenció                                                        | Comproveu si la cançó identificada per musicBrainz trackId ha agradat                           |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                                                             | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                                                       | `musicBrainz_trackID`                                                                           |
| POST BODY exemple / descripció                                  | Sense clau Dades de la taula XPath: /table[5]/tbody/tr[3]/td[2]                                 |
| Sense clau Dades de la taula XPath: /table[5]/tbody/tr[4]/td[1] | Sense clau Dades de la taula XPath: /table[5]/tbody/tr[4]/td[2]                                 |
| Sense clau Dades de la taula XPath: /table[5]/tbody/tr[5]/td[1] | Sense clau Dades de la taula XPath: /table[5]/tbody/tr[5]/td[2]                                 |

Sense clau Text del paràgraf XPath: /p[14].

```shell
Sense clau
Text
XPath: /pre[5]/code
```

Aquesta trucada afegeix l'atribut M'agrada de l'àlbum identificat per musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### aprecia l'àlbum

Estableix l'estat "m'agrada", a l'àlbum, com a cert.

| Intenció                       | Aprecia un àlbum identificat per musicBrainz releaseID    |
| ------------------------------ | --------------------------------------------------------- |
| URI                            | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                      | `musicBrainz_releaseID`                                   |
| POST BODY exemple / descripció | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Disponible des de              | 10.20                                                     |

Exemple:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### deixa d'apreciar l'àlbum

Treu l'estat de m'agrada a l'àlbum

| Intention                      | Deixa d'apreciar un àlbum identificat per musicBrainz releaseID |
| ------------------------------ | --------------------------------------------------------------- |
| URI                            | `<span class="s1">/api/like/</span>dislikealbum`    |
| POST BODY                      | `musicBrainz_releaseID`                                         |
| POST BODY exemple / descripció | 1e0eee38-a9f6-49bf-84d0-45d0647799af                            |
| Disponible des de              | 10.20                                                           |

Exemple:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Aquesta trucada ha eliminat l'atribut M'agrada de l'àlbum identificat per musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### li agrada l'àlbum

Marca l'estat de m'agrada a l'àlbum

| Intenció                        | Check if album is liked identified by musicBrainz releaseID  |
| ------------------------------- | ------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY                   | "TRUE" or "FALSE"                                            |
| Available since                 | 10.20                                                        |

Example:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

This call checks if the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` is liked.

### Rating

The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

While browsing the content directory server, MusicBrainzTrackID (if available) and audiotrackID are delivered as `desc` metadata within the DIDL element.

#### set rating

| Intention                       | Set rating in stars (0 - 5) on a song identified by musicBrainz trackId                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Available since                 | 10.20                                                                                           |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Reads song rating from database

| Intention                       | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`        |
| POST BODY                       | `musicbrainzTrackId`                                                                                    |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                    |
| RESPONSE BODY example           | 3                                                                                                       |
| Available since                 | 10.20                                                                                                   |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

This call reads the user rating of a song identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| Intention                       | Set rating in stars (0 - 5) on a song identified by UMS internal audiotrackID                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                       | `trackID` /`stars`                                                                                             |
| POST BODY example / description | 32                                                                                                             |
| Available since                 | 11.0                                                                                                           |

Example:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets songs user rating identified by audiotrack id `32` to `3`.

#### get rating by audiotrack id

Reads song rating from database

| Intention                       | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY                       | trackId                                                                                                       |
| POST BODY example / description | 32                                                                                                            |
| RESPONSE BODY example           | 3                                                                                                             |
| Available since                 | 11.0                                                                                                          |

Example:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Backup / Restore

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

| Intention       | backup liked songs to filesystem                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| URI             | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE    | GET                                                                                                   |
| RESPONSE BODY   | `OK` or error message                                                                                 |
| Available since | 10.20                                                                                                 |

Example:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| Intention       | restore liked songs from backup file                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI             | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE    | GET                                                                                                                                        |
| RESPONSE BODY   | `OK` or error message                                                                                                                      |
| Available since | 10.20                                                                                                                                      |

Example:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

This call restores the backup file.

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

Aquesta trucada mostrarà totes les llistes de reproducció disponibles.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Intention             | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY example | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
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
