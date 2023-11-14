# API externe

L'API externe permet aux programmes tiers d'accéder ou de déclencher des fonctionnalités UMS avec un appel HTTP.

## Comment activer l'API externe

Modifiez UMS.conf et configurez une api_key comme ceci

`api_key = secret_password`

Le _`secret_password`_ doit avoir un minimum de 12 caractères.

## Utilisation de l'API

Si l'API externe est activée, elle sera accessible via un appel POST sur /api/COMMAND

### Analyse des dossiers

#### rescan

| Intention                       | Ré-analyse complète de la bibliothèque                               |
| ------------------------------- | -------------------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescan`                                          |
| POST BODY                       |                                                                      |
| POST BODY example / description | Cette commande ne requiert aucun contenu dans le corps de la requête |
| Disponible depuis               | 10.4.2                                                               |

:::info
Cela peut être lent pour les grandes bibliothèques
:::

Exemple :

```shell

```

####

|                   | Ré-analyse partielle du système de fichiers                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
|                   | ``                                                                                                   |
|                   |                                                                                                      |
|                   | exemple: "/music/pop/Madonna". Le chemin doit être la racine ou un sous-dossier d'un chemin partagé. |
| Disponible depuis | 10.4.2                                                                                               |

Exemple :

```shell

```

### J'aime la musique (albums et chansons)

#### Aimer la chanson

La chanson sera marquée comme aimée.

| Intention                            | Comme une chanson identifiée par musicBrainz trackId     |
| ------------------------------------ | -------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/likesong</span>` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                    |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Disponible depuis                    | 10.20                                                    |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Je n'aime pas la chanson

La chanson sera appréciée

| Intention                            | Ne pas aimer une chanson identifiée par musicBrainz trackId |
| ------------------------------------ | ----------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>dislikesong` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                       |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Disponible depuis                    | 10.20                                                       |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### est une chanson aimée

Vérifier si la chanson est aimée.

| Intention                            | Vérifier si la chanson est aimée identifier par musicBrainz trackId                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                                                           |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSABILITÉ                       | `Vrai` ou `Faux`                                                                                |
| Disponible depuis                    | 10.20                                                                                           |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Cet appel ajoute l'attribut aimé de l'album identifié par musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Aimez cet album

Définissez l’état de l’album sur Vrai.

| Intention                            | Aime un album identifié par musicBrainz releaseID         |
| ------------------------------------ | --------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>likealbum` |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                   |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Disponible depuis                    | 10.20                                                     |

Exemple :

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Je n'aime pas l'album

Supprimer l'état de l'album.

| Intention                            | Je n'aime pas une chanson identifiée par musicBrainz releaseID |
| ------------------------------------ | -------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>dislikealbum`   |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                        |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                           |
| Disponible depuis                    | 10.20                                                          |

Exemple :

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Cet appel a supprimé l'attribut aimé de l'album identifié par musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### est un album aimé

Vérifier l'état de l'album.

| Intention                            | Vérifier si l'album est aimé identifié par musicBrainz releaseID |
| ------------------------------------ | ---------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>isalbumliked`     |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                          |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                             |
| RESPONSABILITÉ                       | "Vrai" ou "Faux"                                                 |
| Disponible depuis                    | 10.20                                                            |

Exemple :

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
