# External API

The external API enables programs to access or trigger UMS functionalities with a HTTP call.

## How to enable the external API

编辑 UMS.conf 文件并设置 api_key 的值，格式如下：

`api_key = secret_password`

_ ` secret_password` _ 的内容必须不小于 12 个字符

## API usage

If the external API is enabled, the API is accessible with a POST call to /api/COMMAND

### Folder Scanning

#### rescan

| 功能           | Rescans the complete library |
| ------------ | ---------------------------- |
| URI          | `/api/folderscanner/rescan`  |
| POST 表单      | 无                            |
| POST 表单示例或说明 | 此命令无需提供参数                    |
| 可用版本自        | 10.4.2                       |

:::信息
对于大型库来说，这可能会很慢
:::

示例：

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### 重新扫描文件或文件夹

| Intention       | 重新扫描文件系统的部分子树。                              |
| --------------- | ------------------------------------------- |
| URI             | `/api/folderscanner/rescanFileOrFolder`     |
| POST BODY       | 扫描路径                                        |
| POST BODY 示例/说明 | 例如: "/music/pop/Madonna". 路径必须是共享路径的根或子文件夹。 |
| 可用版本自           | 10.4.2                                      |

示例：

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### 收藏音乐（专辑及歌曲）

#### 喜欢歌曲

歌曲将被标记为喜欢。

| Intention    | 像音乐Brainz trackId 识别的歌曲                                  |
| ------------ | -------------------------------------------------------- |
| URI          | `<span class="s1">/api/like/likesong</span>` |
| POST 表单      | `musicBrainz_trackID`                                    |
| POST 表单示例或说明 | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| 可用版本自        | 10.20                                                    |

示例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### 不喜欢歌曲

歌曲不会被忽略

| 功能           | 不喜欢由 musicBrainz trackId 识别的歌曲                              |
| ------------ | ----------------------------------------------------------- |
| URI          | `<span class="s1">/api/like/</span>dislikesong` |
| POST 表单      | `musicBrainz_trackID`                                       |
| POST 表单示例或说明 | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| 可用版本自        | 10.20                                                       |

示例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### 这首歌是否受欢迎

检查是否喜欢歌曲。

| 功能           | 检查音乐Brainz trackId 是否喜欢歌曲                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------- |
| URI          | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST 表单      | `musicBrainz_trackID`                                                                           |
| POST 表单示例或说明 | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| 恢复购买         | `TRUE` or `FALSE`                                                                               |
| 可用版本自        | 10.20                                                                                           |

示例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

这个调用添加了音乐brainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` 所指定的相册的喜欢属性。

#### 收藏专辑

设置专辑状态为已收藏

| 功能    | 喜欢一个由 musicBrainz releaseID 标识的相册                         |
| ----- | --------------------------------------------------------- |
|       | `<span class="s1">/api/like/</span>likealbum` |
|       | `musicBrainz_releaseID`                                   |
|       | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| 可用版本自 | 10.20                                                     |

示例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### 不喜欢专辑

删除专辑喜欢状态。

| 功能      | 不喜欢由 musicBrainz releaseID 识别的歌曲                             |
| ------- | ------------------------------------------------------------ |
| URI     | `<span class="s1">/api/like/</span>dislikealbum` |
| POST 表单 | `musicBrainz_releaseID`                                      |
|         | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| 可用版本自   | 10.20                                                        |

示例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

这次调用删除了musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` 指定的专辑喜欢属性。

#### 专辑是否被喜欢

检查专辑类似状态。

| 功能                | 检查专辑是否被MusicBrainz releaseID 识别。                             |
| ----------------- | ------------------------------------------------------------ |
| 网址                | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY         | `musicBrainz_releaseID`                                      |
| POST BODY 示例 / 描述 | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY     | "TRUE" or "FALSE"                                            |
| 适用日期              | 10.20                                                        |

示例：

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

此通话检查是否喜欢由 musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` 确定的专辑。

### 评分

评分 API 负责给歌曲评分。 评分信息保存在内部数据库（启用缓存），也可以选择把评分保存到歌曲文件中。 假如在 UMS.conf 文件中设置了  `audio_update_rating_tag = true `选项，IDv3 评分信息也会被更新到歌曲文件中（歌曲文件格式支持的话）。

当浏览内容目录服务器时，MusicBrainzTrackID (如果有的话)和audiotrackID 在 DIDL 元素中以 `描述` 元数据。

#### 设置评分

| 功能           | 在音乐Brainz trackId 识别的歌曲上设置星级 (0-5)                                                              |
| ------------ | ----------------------------------------------------------------------------------------------- |
| URI          | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST 表单      | `musicbrainzTrackId` /`stars`                                                                   |
| POST 表单示例或说明 | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| 可用版本自        | 10.20                                                                                           |

示例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

本次通话设置音乐brainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` 至 `3`. 的用户评分。

#### 获取评分

从数据库读取歌曲的评分信息

| 功能                | 通过音乐Brainz trackID获得星星级的歌曲评分(0-5)。 响应机构包含评分信息。                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| 网址                | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>` |
| POST BODY         | `musicbrainzTrackId`                                                                             |
| POST BODY 示例 / 描述 | b8695995-45e9-405d-b4aa-e50e8760fe25                                                             |
| 重置BODY 示例         | 3                                                                                                |
| 适用日期              | 10.20                                                                                            |

示例：

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

此通话读取了音乐brainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` 所识别的歌曲的用户评分。

#### 根据音轨 ID 设置评分

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

### 备份及恢复

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

| Intention     | restore liked songs from backup file                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI           | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `OK` or error message                                                                                                                      |
| 适用日期          | 10.20                                                                                                                                      |

示例：

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

此通话将恢复备份文件。

### 播放列表

#### 启用服务

编辑 UMS.conf 并通过设置配置管理的播放列表文件夹 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

启用此服务。 默认情况下，此服务将被禁用。 播放列表文件夹路径应位于已配置的共享`<span class="s1">文件夹</span>`路径下方，以便通过此 API 更改的播放列表可供 UMS 看到。

#### 列出所有播放列表

读取可用的播放列表。 这些播放列表名称必须用于随后的通话以添加或删除歌曲。

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

#### 列出服务器可用播放列表

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

#### 添加歌曲到播放列表

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

#### 从播放列表中移除歌曲

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

#### 创建新的播放列表

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

## Java 代码示例

此代码片段展示了如何使用 okhttp3 库的 API ：

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

## HTTP 返回代码

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Set a `api_key` in UMS.conf with a length of 12 or more character |
