# Externt API

Det externa API:et gör det möjligt för program att komma åt eller utlösa UMS funktioner med ett HTTP-anrop.

## Hur man aktiverar det externa API:et

Edit UMS.conf and configure an api_key like this

`api_key = secret_password`

The _`secret_password`_ must have a minimum of 12 chars.

## API usage

If the external API is enabled, the API is accessible with a POST call to /api/COMMAND

### Folder Scanning

#### rescan

| Avsikt                          | Rescans the complete library       |
| ------------------------------- | ---------------------------------- |
| URI                             | `/api/folderscanner/rescan`        |
| POST BODY                       | NONE                               |
| POST BODY exempel / beskrivning | This command needs no body content |
| Tillgängligt sedan              | 10.4.2                             |

:::info
This can be slow for large libraries
:::

Exempel:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### rescan file or folder

| Avsikt                          | Rescans a partial subtree of the file system.                                         |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescanFileOrFolder`                                               |
| POST BODY                       | PATH_TO_SCAN                                                                        |
| POST BODY exempel / beskrivning | example: "/music/pop/Madonna". Path must be the root or a subfolder of a shared path. |
| Tillgängligt sedan              | 10.4.2                                                                                |

Exempel:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Liking Music (albums and songs)

#### like song

Song will be marked as liked.

| Avsikt                          | Like a song identified by musicBrainz trackId            |
| ------------------------------- | -------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                       | `musicBrainz_trackID`                                    |
| POST BODY exempel / beskrivning | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Tillgängligt sedan              | 10.20                                                    |

Exempel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| Avsikt                          | Dislike a song identified by musicBrainz trackId            |
| ------------------------------- | ----------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                       | `musicBrainz_trackID`                                       |
| POST BODY exempel / beskrivning | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Tillgängligt sedan              | 10.20                                                       |

Exempel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Check if song is liked.

| Avsikt                          | Check if song is liked identified by musicBrainz trackId                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                       | `musicBrainz_trackID`                                                                           |
| POST BODY exempel / beskrivning | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                   | `TRUE` or `FALSE`                                                                               |
| Tillgängligt sedan              | 10.20                                                                                           |

Exempel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

This call adds the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### like album

Set album like state to true.

| Avsikt                          | Likes an album identified by musicBrainz releaseID        |
| ------------------------------- | --------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                   |
| POST BODY exempel / beskrivning | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Tillgängligt sedan              | 10.20                                                     |

Exempel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### dislike album

Remove album like state.

| Avsikt                          | Dislike a song identified by musicBrainz releaseID           |
| ------------------------------- | ------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY exempel / beskrivning | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Tillgängligt sedan              | 10.20                                                        |

Exempel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

This call removed the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### is album liked

Check album like state.

| Avsikt                          | Check if album is liked identified by musicBrainz releaseID  |
| ------------------------------- | ------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY exempel / beskrivning | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY                   | "TRUE" eller "FALSE"                                         |
| Tillgängligt sedan              | 10.20                                                        |

Exempel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

This call checks if the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` is liked.

### Rating

The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

While browsing the content directory server, MusicBrainzTrackID (if available) and audiotrackID are delivered as `desc` metadata within the DIDL element.

#### set rating

| Avsikt                          | Set rating in stars (0 - 5) on a song identified by musicBrainz trackId                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY exempel / beskrivning | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Tillgängligt sedan              | 10.20                                                                                           |

Exempel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Reads song rating from database

| Avsikt                          | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`        |
| POST BODY                       | `musicbrainzTrackId`                                                                                    |
| POST BODY exempel / beskrivning | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                    |
| RESPONSE BODY exempel           | 3                                                                                                       |
| Tillgängligt sedan              | 10.20                                                                                                   |

Exempel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

This call reads the user rating of a song identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| Avsikt                          | Set rating in stars (0 - 5) on a song identified by UMS internal audiotrackID                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                       | `trackID` /`stars`                                                                                             |
| POST BODY exempel / beskrivning | 32                                                                                                             |
| Tillgängligt sedan              | 11.0                                                                                                           |

Exempel:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets songs user rating identified by audiotrack id `32` to `3`.

#### get rating by audiotrack id

Reads song rating from database

| Avsikt                          | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY                       | trackId                                                                                                       |
| POST BODY exempel / beskrivning | 32                                                                                                            |
| RESPONSE BODY exempel           | 3                                                                                                             |
| Tillgängligt sedan              | 11.0                                                                                                          |

Exempel:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Backup / Restore

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

| Avsikt             | backup liked songs to filesystem                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| URI                | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE       | GET                                                                                                   |
| RESPONSE BODY      | `OK` eller felmeddelande                                                                              |
| Tillgängligt sedan | 10.20                                                                                                 |

Exempel:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| Avsikt             | restore liked songs from backup file                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE       | GET                                                                                                                                        |
| RESPONSE BODY      | `OK` eller felmeddelande                                                                                                                   |
| Tillgängligt sedan | 10.20                                                                                                                                      |

Exempel:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

This call restores the backup file.

### Spellista

#### aktivera tjänst

Edit UMS.conf and configure a managed playlist folder by setting 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

for enabling this service. By default this service is disabled. The playlist folder path should be located beneath a configured shared `<span class="s1">folders</span>` path for playlist changed made by this API to be visible by UMS.

#### lista alla spellistor

Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs.

| Avsikt                | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder. Besides playlist name, the playlists `playlistId` is                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE          | GET                                                                                                                                                                             |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                                                    |
| RESPONSE BODY exempel | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Tillgängligt sedan    | 11.0                                                                                                                                                                            |

Exempel:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

This call will list all available playlists.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Avsikt                | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY exempel | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Tillgängligt sedan    | dev branch                                                                                                                                               |

Exempel:

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

| Avsikt                          | Lägg till låt i spellistan                                                                                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                              |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY exempel / beskrivning | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                   | NONE                                                                                                                                                                              |
| Tillgängligt sedan              | 11.0                                                                                                                                                                              |

Exempel:

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

| Avsikt                          | Remove song from playlist                                                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                                   |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY exempel / beskrivning | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                   | NONE                                                                                                                                                                                   |
| Tillgängligt sedan              | 11.0                                                                                                                                                                                   |

Exempel:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

This removes the song with the ID `123` from the playlist `Pop`.

#### skapa nya spellistor

Playlist name should be provided without any path and without file extensions. 

| Avsikt                          | Creating new playlists in managed playlist folder                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                           |
| POST BODY                       | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY exempel / beskrivning | Contemporary                                                                                                                                                                   |
| RESPONSE BODY                   | NONE                                                                                                                                                                           |
| Tillgängligt sedan              | 11.0                                                                                                                                                                           |

Exempel:

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
