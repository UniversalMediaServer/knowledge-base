# 外部 API

外部 API により、プログラムは HTTP 呼び出しで UMS 機能にアクセスしたり、トリガーしたりすることができます。

## 外部 API を有効にする方法

UMS.conf を編集し、このような api_key を設定します。

`api_key = secret_password`

_`secret_password`_ は 12 文字以上でなければなりません。

## API の説明

外部 API が有効になっている場合、/api/COMMAND への POST コールで API にアクセスできます。

### フォルダスキャン

#### 再スキャン

| ご注意             | 完全なライブラリを再スキャン              |
| --------------- | --------------------------- |
| URI             | `/api/folderscanner/rescan` |
|                 | なし                          |
| ボディの例 / 説明      | このコマンドは本体の内容を必要としません        |
| Available since | 10.4.2                      |

:::info
This can be slow for large libraries
:::

例:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### ファイルまたはフォルダを再スキャン

| Intention                       | Rescans a partial subtree of the file system.                                         |
| ------------------------------- | ------------------------------------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescanFileOrFolder`                                               |
| POST BODY                       | PATH_TO_SCAN                                                                        |
| POST BODY example / description | example: "/music/pop/Madonna". Path must be the root or a subfolder of a shared path. |
| 以下から利用可能：                       | 10.4.2                                                                                |

例

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: Secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### ライクした音楽（アルバムや曲）

#### ライクした曲

曲は「いいね」としてマークされます。

| ご注意                             | Like a song identified by musicBrainz trackId            |
| ------------------------------- | -------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                       | `musicBrainz_trackID`                                    |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Available since                 | 10.20                                                    |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| Intention                       | musicBrainz trackId によって識別された曲が嫌いです                         |
| ------------------------------- | ----------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                       | `musicBrainz_trackID`                                       |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Available since                 | 10.20                                                       |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Check if song is liked.

| Intention                       | Check if song is liked identified by musicBrainz trackId                                        |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                       | `musicBrainz_trackID`                                                                           |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                   | `TRUE` or `FALSE`                                                                               |
| Available since                 | 10.20                                                                                           |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

This call adds the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### like album

Set album like state to true.

| Intention                       | Likes an album identified by musicBrainz releaseID        |
| ------------------------------- | --------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                   |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Available since                 | 10.20                                                     |

例

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### 嫌いなアルバム

アルバムから「いいね」を取る

| ご注意                             | musicBrainz releaseID で識別された曲が嫌いです                           |
| ------------------------------- | ------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Available since                 | 10.20                                                        |

Example:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

この呼び出しはmusicbrainz release-id `1e0ee38-a9f6-49bf-84d0-45d0647799af` で識別されたアルバムの liked 属性を削除しました。

#### アルバムがいいね！されました

状態のようなアルバムをチェックします。

| ご注意                             | アルバムがmusicBrainzのreleaseIDによって認識されているかどうかを確認します              |
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

評価APIは曲を評価する責任があります。 Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

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

このコールはmusicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` によって識別された曲のユーザー評価を読み込みます。

#### get rating

ソングレーティングをデータベースから読み込みます

| Intention                       | musicBrainzのtrackIDで星の評価を取得します。 Response body contains the rating information.                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>` |
| POST BODY                       | `musicbrainzTrackId`                                                                             |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                             |
| RESPONSE BODY example           | 3                                                                                                |
| Available since                 | 10.20                                                                                            |

例

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

このコールはmusicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` によって識別された曲のユーザー評価を読み込みます。

#### オーディオトラックIDで評価を設定

| ご注意                             | UMS内部オーディオトラックIDで特定された曲の星評価（0 - 5）を設定する                                                                        |
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

ソングレーティングをデータベースから読み込みます

| ご注意                             | UMS内蔵のaudiotrackIDで星評価(0 - 5)を取得します。 Response body contains the rating information.                           |
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

この呼び出しは、UMS audiotrack-id `32` によって識別された曲のユーザー評価を読み込みます。

### バックアップ / 復元

ユーザー管理 "liked album" エントリは `database_backup` という名前の profile-directory サブフォルダにバックアップすることができます。 ファイル名は `MUSIC_BRAINZ_RELEASE_LIKE` です。 UMSデータベースが削除された場合は、リストアを呼び出します。

#### お気に入りアルバムのバックアップ

バックアップ テーブル `MUSIC_BRAINZ_RELEASE_LIKE` をファイルシステムにする

| ご注意             | backup liked songs to filesystem                                                                      |
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

テーブル `MUSIC_BRAINZ_RELEASE_LIKE` をファイルシステムから復元する

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

このサービスを有効にするために By default this service is disabled. The playlist folder path should be located beneath a configured shared `<span class="s1">folders</span>` path for playlist changed made by this API to be visible by UMS.

#### list all playlists

Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs.

| Intention | サポートされているすべてのプレイリスト(`m3u`, `m3u8` と `pls`)と、設定されたフォルダから利用可能なプレイリストを提供します。 プレイリスト名のほか、プレイリスト `プレイリスト` は                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI       | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| 要求の種類     | GET                                                                                                                                                                             |
| 応答する体型    | プレイリスト名のJSON配列                                                                                                                                                                  |
| リスポーン体の例  | `<span class="s1">["ポップ","ジャズ","クラシック"]</span>`                                                                                                                     |
| 以下から利用可能： | 11.0                                                                                                                                                                            |

例

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

この通話には、利用可能なプレイリストがすべて表示されます。

#### リストサーバーアクセス可能なプレイリスト

これらはすべてUMS(データベース/キャッシュが有効)になっているプレイリストです。 これらのプレイリスト名は、曲を追加または削除するために、その後の通話に使用する必要があります。 プレイリストIDは、 `objectId` `$DBID$PLAYLIST$` concat databaseIdをブラウズすることで、プレイリストに直接移動するために使用できます。

| Intention             | サポートされているすべてのプレイリスト(`m3u`, `m3u8` と `pls`)と設定されたフォルダからプレイリストを配信します。                                                                                      |
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

必要な `audiotrackid` は UPnP ブラウズリクエスト中に配信され、DIDL レスポンス属性 `descMetadata` から抽出できます。

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

この通話は、管理プレイリストフォルダーに `Contemporary.m3u8` という名前の新しいプレイリストファイルを作成します。

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
