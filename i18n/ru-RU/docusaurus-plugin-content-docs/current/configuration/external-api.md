# Внешний API

Внешний API позволяет программам получать доступ к функциям UMS или запускать их с помощью HTTP-вызова.

## Как включить внешний API

Отредактируйте UMS.conf и настройте api_key следующим образом

`api_key = секретный_пароль`

_`secret_password`_ должен содержать не менее 12 символов.

## Использование API

Если внешний API включен, API доступен с помощью POST вызова в /api/COMMAND

### Сканирование папок

#### повторное сканирование

| Замысел                              | Повторно пересканировать всю библиотеку         |
| ------------------------------------ | ----------------------------------------------- |
| URI                                  | `/api/сканер папок/повторное сканирование`      |
| Содержание сообщения                 | Никто                                           |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | Эта команда не нуждается в содержании сообщения |
| Доступно с                           | 10.4.2                                          |

::info  
Это может быть медленно для больших библиотек
:::

Пример:

```shell
curl -w "%{http_code}\n" -H "api-ключ: секретный_пароль" http://localhost:5001/api/сканируемые папки/повторное сканирование
```

#### Повторно сканировать файл или папку

| Замысел                              | Пересканирует частично дерево файловой системы.                                               |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| URI                                  | `/api/сканируемые папки/повторно сканировать файл или папку`                                  |
| Содержание сообщения                 | ПУТЬ_ К_СКАНИРОВАНИЮ                                                                          |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | пример: "/music/pop/Madonna". Путь должен быть корневым или к вложенной папке общего доступа. |
| Доступно с                           | 10.4.2                                                                                        |

Пример:

```shell
curl -d "ПУТЬ_ К_СКАНИРОВАНИЮ" -w "%{http_code}\n" -H "api-key: секретный_пароль" -X СООБЩЕНИЕ http://localhost:5001/api/сканируемые папки/Повторно просканировать файл или папку
```

### Нравится музыка (альбомы и песни)

#### нравится песня

Песня будет отмечена как понравившаяся.

| Замысел                              | желаемая песня, идентифицированная с помощью MusicBrainz TrackID         |
| ------------------------------------ | ------------------------------------------------------------------------ |
| URI                                  | `<span class="s1">/api/нравится/lпонравившаяся песня</span>` |
| Содержание сообщения                 | `musicBrainz_trackID`                                                    |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | b8695995-45e9-405d-b4aa-e50e8760fe25                                     |
| Доступно с                           | 10.20                                                                    |

Пример:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-ключ: секретный_пароль" -X СООБЩЕНИЕ http://localhost:5001/api/нравится/понравившаяся песня
```

#### не нравится песня

Песня не нравится

| Замысел                              | Не нравится песня, идентифицированная MusicBrainz TrackID             |
| ------------------------------------ | --------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/нравится/</span>песня не нравится` |
| Содержание сообщения                 | `musicBrainz_trackID`                                                 |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | b8695995-45e9-405d-b4aa-e50e8760fe25                                  |
| Доступно с                           | 10.20                                                                 |

Пример:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-ключ: секретный_пароль" -X POST http://localhost:5001/api/нравится/песня не нравится
```

#### песня понравилась

Проверьте, нравится ли песне.

| Замысел                              | Проверьте, понравилась ли песня, идентифицированная с помощью MusicBrainz TrackID               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| Содержание сообщения                 | `musicBrainz_trackID`                                                                           |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| СОДЕРЖАНИЕ ОТВЕТА                    | `ИСТИНА` или `ЛОЖЬ`                                                                             |
| Доступно с                           | 10.20                                                                                           |

Пример:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-ключ: секретный_пароль" -X СООБЩЕНИЕ http://localhost:5001/api/нравится/понравившаяся песня
```

Этот вызов добавляет связанный атрибут понравившегося альбома, идентифицированный musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### нравится альбом

Установите для состояния album like значение true.

| Замысел                              | Понравившийся  альбом, идентифицированный MusicBrainz ReleaseID          |
| ------------------------------------ | ------------------------------------------------------------------------ |
| URI                                  | `<span class="s1">/api/нравится/</span>понравившийся альбом` |
| Содержание сообщения                 | `musicBrainz_releaseID`                                                  |
| Пример СОДЕРЖАНИЯ СООБЩЕНИЯ/описание | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                     |
| Доступно с                           | 10.20                                                                    |

Пример:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-ключ: секретный_пароль" -X СООБЩЕНИЕ http://localhost:5001/api/нравится/понравившаяся песня
```

#### не нравится альбом

Удалить статус альбома, как понравившегося .

| Замысел                            | Не нравится песня, идентифицированная MusicBrainz ReleaseID  |
| ---------------------------------- | ------------------------------------------------------------ |
| URI                                | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                          | `musicBrainz_releaseID`                                      |
| Пример / описание текста сообщения | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Доступно с                         | 10.20                                                        |

Пример:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

This call removed the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### нравится альбом

Check album like state.

| Intention                       | Проверьте, понравился ли альбом, указанный в MusicBrainz ReleaseID |
| ------------------------------- | ------------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked`       |
| POST BODY                       | `musicBrainz_releaseID`                                            |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                               |
| RESPONSE BODY                   | "TRUE" or "FALSE"                                                  |
| Available since                 | 10.20                                                              |

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
| Доступно с                      | 10.20                                                                                           |

Пример:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### получить оценку

Считывает рейтинг песни из базы данных

| Intention                       | Получите рейтинг песни в звездах (0 - 5) по MusicBrainz TrackID. Текст ответа содержит информацию о рейтинге. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`              |
| POST BODY                       | `musicbrainzTrackId`                                                                                          |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                          |
| RESPONSE BODY example           | 3                                                                                                             |
| Доступно с                      | 10.20                                                                                                         |

Пример:

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

| Intention                          | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY                          | trackId                                                                                                       |
| Пример / описание текста сообщения | 32                                                                                                            |
| Пример ОТВЕТА                      | 3                                                                                                             |
| Available since                    | 11.0                                                                                                          |

Example:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Backup / Restore

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

| Intention     | backup liked songs to filesystem                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| URI           | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | ПОЛУЧИТЬ                                                                                              |
| RESPONSE BODY | `OK` or error message                                                                                 |
| Доступно с    | 10.20                                                                                                 |

Пример:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| Intention         | восстановить понравившиеся песни из файла резервной копии                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| ТИП ЗАПРОСА       | ПОЛУЧИТЬ                                                                                                                                   |
| СОДЕРЖАНИЕ ОТВЕТА | `OK` или сообщение об ошибке                                                                                                               |
| Доступно с        | 10.20                                                                                                                                      |

Пример:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Этот вызов восстанавливает файл резервной копии.

### Плейлист

#### Включить службу

Отредактируйте UMS.conf и настройте папку управляемого списка воспроизведения, установив 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

для включения этой службы. По умолчанию эта служба отключена. Путь к папке плейлиста должен быть расположен под настроенным общим `<span class="s1">каталогом</span>` для изменения плейлиста, созданным этим API, который будет виден UMS.

#### список всех плейлистов

Читать доступные плейлисты Эти имена плейлистов должны использоваться для последующих звонков для добавления или удаления песен.

| Intention         | Доставляет все поддерживаемые (`m3u`, `m3u8` и `pls`) и доступные плейлисты из настроенной папки. Кроме имени плейлиста `плейлист`                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| ТИП ЗАПРОСА       | ПОЛУЧИТЬ                                                                                                                                                                        |
| СОДЕРЖАНИЕ ОТВЕТА | JSON массив имён плейлистов                                                                                                                                                     |
| Пример ОТВЕТА     | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Доступно с        | 11.0                                                                                                                                                                            |

Пример:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Этот вызов выведет список всех доступных плейлистов.

#### список доступных на сервере плейлистов

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

Пример:

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

| Intention                          | Remove song from playlist                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                       | СООБЩЕНИЕ                                                                                                                                                                              |
| POST BODY                          | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| Пример / описание текста сообщения | 123/Pop                                                                                                                                                                                |
| СОДЕРЖАНИЕ ОТВЕТА                  | ОТСУТСТВУЕТ                                                                                                                                                                            |
| Доступно с                         | 11.0                                                                                                                                                                                   |

Пример:

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
| СОДЕРЖАНИЕ ОТВЕТА               | ОТСУТСТВУЕТ                                                                                                                                                                    |
| Доступно с                      | 11.0                                                                                                                                                                           |

Пример:

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

## HTTP коды возврата

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Установите `api_key` в UMS.conf с длиной 12 или более символов |
