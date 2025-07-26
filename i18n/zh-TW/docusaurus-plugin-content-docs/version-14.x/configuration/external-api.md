# 外部 API

外部 API 使程式能夠透過 HTTP 呼叫存取或觸發 UMS 功能。

## 如何啟用外部 API

編輯 UMS.conf 並像這樣配置 api_key

`api_key = secret_password`

_`secret_password`_ 必須至少有 12 個字元。

## API 使用

如果啟用了外部 API，則可以透過 POST 呼叫 /api/COMMAND 來存取 API

### 資料夾掃描

#### 重新掃描

| 意圖              | 重新掃描完整的藏庫                   |
| --------------- | --------------------------- |
| 統一資源識別碼         | `/api/folderscanner/rescan` |
| POST BODY       | 無                           |
| POST BODY 範例／描述 | 此指令不需要 BODY 內容              |
| 自此版本可用          | 10.4.2                      |

:::資訊
對於大型藏庫來說這可能會很慢
:::

範例：

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### 重新掃描檔案或資料夾

| 意圖              | Rescans a partial subtree of the file system.                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼         | `/api/folderscanner/rescanFileOrFolder`                                                                              |
| POST BODY       | PATH_TO_SCAN                                                                                                       |
| POST BODY 範例／描述 | example: "/music/pop/Madonna". example: "/music/pop/Madonna". Path must be the root or a subfolder of a shared path. |
| 自此版本可用          | 10.4.2                                                                                                               |

範例：

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Liking Music (albums and songs)

#### like song

Song will be marked as liked.

| 意圖                              | Like a song identified by musicBrainz trackId            |
| ------------------------------- | -------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                       | `musicBrainz_trackID`                                    |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| 自此版本可用                          | 10.20                                                    |

範例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| 意圖                              | Dislike a song identified by musicBrainz trackId            |
| ------------------------------- | ----------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                       | `musicBrainz_trackID`                                       |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| 自此版本可用                          | 10.20                                                       |

範例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Check if song is liked.

| 意圖                              | Check if song is liked identified by musicBrainz trackId                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                       | `musicBrainz_trackID`                                                                           |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                   | `TRUE` or `FALSE`                                                                               |
| 自此版本可用                          | 10.20                                                                                           |

範例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

This call adds the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### like album

Set album like state to true.

| 意圖                              | Likes an album identified by musicBrainz releaseID        |
| ------------------------------- | --------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                   |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| 自此版本可用                          | 10.20                                                     |

範例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### dislike album

Remove album like state.

| 意圖                              | Dislike a song identified by musicBrainz releaseID           |
| ------------------------------- | ------------------------------------------------------------ |
| 統一資源識別碼                         | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| 自此版本可用                          | 10.20                                                        |

範例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

This call removed the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### is album liked

Check album like state.

| 意圖                              | Check if album is liked identified by musicBrainz releaseID  |
| ------------------------------- | ------------------------------------------------------------ |
| 統一資源識別碼                         | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY                   | "TRUE" or "FALSE"                                            |
| 自此版本可用                          | 10.20                                                        |

範例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

This call checks if the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` is liked.

### Rating

The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

While browsing the content directory server, MusicBrainzTrackID (if available) and audiotrackID are delivered as `desc` metadata within the DIDL element.

#### set rating

| 意圖                              | Set rating in stars (0 - 5) on a song identified by musicBrainz trackId                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| 自此版本可用                          | 10.20                                                                                           |

範例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Reads song rating from database

| 意圖                              | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                                       |
| POST BODY                       | `musicbrainzTrackId`                                                                                                                                   |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                                   |
| RESPONSE BODY example           | 3                                                                                                                                                      |
| 自此版本可用                          | 10.20                                                                                                                                                  |

範例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

This call reads the user rating of a song identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| 意圖                              | Set rating in stars (0 - 5) on a song identified by UMS internal audiotrackID                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                       | `trackID` /`stars`                                                                                             |
| POST BODY example / description | 32                                                                                                             |
| 自此版本可用                          | 11.0                                                                                                           |

範例：

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets songs user rating identified by audiotrack id `32` to `3`.

#### get rating by audiotrack id

Reads song rating from database

| 意圖                              | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                                                |
| POST BODY                       | trackId                                                                                                                                                      |
| POST BODY example / description | 32                                                                                                                                                           |
| RESPONSE BODY example           | 3                                                                                                                                                            |
| 自此版本可用                          | 11.0                                                                                                                                                         |

範例：

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Backup / Restore

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

| 意圖            | backup liked songs to filesystem                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| 統一資源識別碼       | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                   |
| RESPONSE BODY | `OK` or error message                                                                                 |
| 自此版本可用        | 10.20                                                                                                 |

範例：

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| 意圖            | restore liked songs from backup file                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 統一資源識別碼       | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `OK` or error message                                                                                                                      |
| 自此版本可用        | 10.20                                                                                                                                      |

範例：

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

This call restores the backup file.

### Playlist

#### enable service

Edit UMS.conf and configure a managed playlist folder by setting 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

for enabling this service. By default this service is disabled. for enabling this service. By default this service is disabled. The playlist folder path should be located beneath a configured shared `<span class="s1">folders</span>` path for playlist changed made by this API to be visible by UMS.

#### list all playlists

Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs.

| 意圖                    | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder. Besides playlist name, the playlists `playlistId` is Besides playlist name, the playlists `playlistId` is |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>`                            |
| REQUEST TYPE          | GET                                                                                                                                                                                                        |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                                                                               |
| RESPONSE BODY example | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                                             |
| 自此版本可用                | 11.0                                                                                                                                                                                                       |

範例：

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

This call will list all available playlists.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs. These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| 意圖                    | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼               | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY example | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| 自此版本可用                | dev branch                                                                                                                                               |

範例：

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
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| 意圖                              | Add song to playlist                                                                                                                                                              |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                              |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY example / description | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                   | NONE                                                                                                                                                                              |
| 自此版本可用                          | 11.0                                                                                                                                                                              |

範例：

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
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| 意圖                              | Remove song from playlist                                                                                                                                                              |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                                   |
| POST BODY                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY example / description | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                   | NONE                                                                                                                                                                                   |
| 自此版本可用                          | 11.0                                                                                                                                                                                   |

範例：

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

This removes the song with the ID `123` from the playlist `Pop`.

#### create new playlists

Playlist name should be provided without any path and without file extensions. 

| 意圖                              | Creating new playlists in managed playlist folder                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 統一資源識別碼                         | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                    | POST                                                                                                                                                                           |
| POST BODY                       | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY example / description | Contemporary                                                                                                                                                                   |
| RESPONSE BODY                   | NONE                                                                                                                                                                           |
| 自此版本可用                          | 11.0                                                                                                                                                                           |

範例：

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

This call creates a new playlist file named `Contemporary.m3u8` in the managed playlist folder.

## Java 程式碼範例

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

## HTTP 回應代碼

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Set a `api_key` in UMS.conf with a length of 12 or more character | Set a `api_key` in UMS.conf with a length of 12 or more character |
