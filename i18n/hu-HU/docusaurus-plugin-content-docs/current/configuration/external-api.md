# Külső API

Külső API lehetővé teszi a programok számára, hogy HTTP-hívással elérjék vagy aktiválják az UMS-funkciókat.

## Hogyan lehet engedélyezni a külső API-t

Szerkessze az UMS.conf fájlt, és állítson be egy ilyen api_key-t

`api_key = secret_password`

A _`secret_password`_ legalább 12 karakter hosszúnak kell lennie.

## API használat

Ha a külső API engedélyezve van, az API elérhető egy POST hívással a /api/COMMAND végponton.

### Mappa beolvasás

#### újra beolvasás

| Funkció                  | Újravizsgálja a teljes könyvtárat                 |
| ------------------------ | ------------------------------------------------- |
| URI                      | `/api/folderscanner/rescan`                       |
| POST BODY                | NINCS                                             |
| POST BODY példa / leírás | Ennek a parancsnak nincs szüksége body tartalomra |
| Elérhető                 | 10.4.2                                            |

:::info
Ez nagy könyvtárak esetén lassú lehet
:::

Példa:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### fájl vagy mappa újravizsgálata

| Funkció                  | A fájlrendszer egy részleges almappájának újravizsgálata.                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| URI                      | `/api/folderscanner/rescanFileOrFolder`                                                               |
| POST BODY                | PATH_TO_SCAN                                                                                        |
| POST BODY példa / leírás | példa: "/music/pop/Madonna". Az útvonalnak egy megosztott útvonal gyökere vagy almappája kell lennie. |
| Elérhető                 | 10.4.2                                                                                                |

Példa:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Liking Music (albums and songs)

#### like song

Song will be marked as liked.

| Funkció                  | Like a song identified by musicBrainz trackId            |
| ------------------------ | -------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                | `musicBrainz_trackID`                                    |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Elérhető                 | 10.20                                                    |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| Funkció                  | Dislike a song identified by musicBrainz trackId            |
| ------------------------ | ----------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                | `musicBrainz_trackID`                                       |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Elérhető                 | 10.20                                                       |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### is song liked

Check if song is liked.

| Funkció                  | Check if song is liked identified by musicBrainz trackId                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                | `musicBrainz_trackID`                                                                           |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY            | `TRUE` or `FALSE`                                                                               |
| Elérhető                 | 10.20                                                                                           |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

This call adds the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### like album

Set album like state to true.

| Funkció                  | Likes an album identified by musicBrainz releaseID        |
| ------------------------ | --------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                | `musicBrainz_releaseID`                                   |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Elérhető                 | 10.20                                                     |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### dislike album

Remove album like state.

| Funkció                  | Dislike a song identified by musicBrainz releaseID           |
| ------------------------ | ------------------------------------------------------------ |
| URI                      | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                | `musicBrainz_releaseID`                                      |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Elérhető                 | 10.20                                                        |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

This call removed the liked attribute of the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### is album liked

Check album like state.

| Funkció                  | Check if album is liked identified by musicBrainz releaseID  |
| ------------------------ | ------------------------------------------------------------ |
| URI                      | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                | `musicBrainz_releaseID`                                      |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY            | "TRUE" or "FALSE"                                            |
| Elérhető                 | 10.20                                                        |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

This call checks if the album identified by musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` is liked.

### Rating

The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

While browsing the content directory server, MusicBrainzTrackID (if available) and audiotrackID are delivered as `desc` metadata within the DIDL element.

#### set rating

| Funkció                  | Set rating in stars (0 - 5) on a song identified by musicBrainz trackId                         |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Elérhető                 | 10.20                                                                                           |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Reads song rating from database

| Funkció                  | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`        |
| POST BODY                | `musicbrainzTrackId`                                                                                    |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                    |
| RESPONSE BODY példa      | 3                                                                                                       |
| Elérhető                 | 10.20                                                                                                   |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

This call reads the user rating of a song identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| Funkció                  | Set rating in stars (0 - 5) on a song identified by UMS internal audiotrackID                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                | `trackID` /`stars`                                                                                             |
| POST BODY példa / leírás | 32                                                                                                             |
| Elérhető                 | 11.0                                                                                                           |

Példa:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets songs user rating identified by audiotrack id `32` to `3`.

#### get rating by audiotrack id

Reads song rating from database

| Funkció                  | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY                | trackId                                                                                                       |
| POST BODY példa / leírás | 32                                                                                                            |
| RESPONSE BODY példa      | 3                                                                                                             |
| Elérhető                 | 11.0                                                                                                          |

Példa:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Backup / Restore

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

| Funkció       | backup liked songs to filesystem                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| URI           | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                   |
| RESPONSE BODY | `OK` vagy hibaüzenet                                                                                  |
| Elérhető      | 10.20                                                                                                 |

Példa:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| Funkció       | restore liked songs from backup file                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI           | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `OK` vagy hibaüzenet                                                                                                                       |
| Elérhető      | 10.20                                                                                                                                      |

Példa:

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

Elérhető lejátszási listák olvasása. Ezeket a lejátszási lista neveket kell használni a további hívásokhoz, hogy dalokat adjunk hozzá vagy távolítsunk el.

| Funkció             | Szállítja az összes támogatott (`m3u`, `m3u8` és `pls`) és elérhető lejátszási listát a konfigurált mappából. Besides playlist name, the playlists `playlistId` is              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE        | GET                                                                                                                                                                             |
| RESPONSE BODY       | lejátszási lista nevek JSON tömbje                                                                                                                                              |
| RESPONSE BODY példa | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Elérhető            | 11.0                                                                                                                                                                            |

Példa:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Ez a hívás felsorolja az összes elérhető lejátszási listát.

#### Felsorolni a szerver által elérhető lejátszási listákat

Ezek azok a lejátszási listák, amelyeket az UMS ismer (adatbázis/gyorsítótár engedélyezve). Ezeket a lejátszási lista neveket kell használni a további hívásokhoz a dalok hozzáadásához vagy eltávolításához. A lejátszási lista azonosítója közvetlenül a lejátszási listához navigálhat, ha az `objectId` `$DBID$PLAYLIST$` és a databaseId összefűzésével böngészel.

| Funkció             | Szállítja az összes támogatott (`m3u`, `m3u8` és `pls`) és elérhető lejátszási listát a konfigurált mappából.                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE        | GET                                                                                                                                                      |
| RESPONSE BODY       | lejátszási lista nevek JSON tömbje                                                                                                                       |
| RESPONSE BODY példa | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Elérhető            | dev branch                                                                                                                                               |

Példa:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Ez a hívás felsorolja az összes elérhető lejátszási listát, amelyek az UMS által hozzáférhetők.

#### Dalok hozzáadása a lejátszási listákhoz

A szükséges `audiotrackid` az UPnP böngészési kérelmek során kerül átadásra, és a DIDL válasz `descMetadata` attribútumából nyerhető ki.

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Funkció                  | Dal hozzáadása a lejátszási listához                                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE             | POST                                                                                                                                                                              |
| POST BODY                | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY példa / leírás | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY            | NINCS                                                                                                                                                                             |
| Elérhető                 | 11.0                                                                                                                                                                              |

Példa:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Ez hozzáadja a `123` azonosítójú dalt a `Pop` lejátszási listához.

#### Dalok eltávolítása a lejátszási listákból

A szükséges `audiotrackid` az UPnP böngészési kérelmek során kerül átadásra, és a DIDL válasz `descMetadata` attribútumából nyerhető ki.

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Funkció                  | Dal eltávolítása a lejátszási listáról                                                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE             | POST                                                                                                                                                                                   |
| POST BODY                | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY példa / leírás | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY            | NINCS                                                                                                                                                                                  |
| Elérhető                 | 11.0                                                                                                                                                                                   |

Példa:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Ez eltávolítja a `123` azonosítójú dalt a `Pop` lejátszási listáról.

#### Új lejátszási listák létrehozása

A lejátszási lista nevét úgy kell megadni, hogy ne tartalmazzon semmilyen elérési utat és fájl kiterjesztést. 

| Funkció                  | Új lejátszási listák létrehozása a kezelt lejátszási lista mappában                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                      | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE             | POST                                                                                                                                                                           |
| POST BODY                | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY példa / leírás | Contemporary                                                                                                                                                                   |
| RESPONSE BODY            | NINCS                                                                                                                                                                          |
| Elérhető                 | 11.0                                                                                                                                                                           |

Példa:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Ez a hívás egy új lejátszási lista fájlt hoz létre `Contemporary.m3u8` néven a kezelt lejátszási lista mappában.

## Java kód példa

Ez a kódrészlet bemutatja, hogyan lehet használni az API-t az okhttp3 könyvtárral.

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

## HTTP válaszkódok

| 200 | OK | | 204 | siker, ha nem kell tartalmat visszaadni | | 401 | érvénytelen API kulcs | | 404 | a kért objektum nem található | | 417 | API kérés nem sikerült | | 503 | a külső API nincs engedélyezve Állíts be egy `api_key` értéket az UMS.conf fájlban, amely legalább 12 karakter hosszú |
