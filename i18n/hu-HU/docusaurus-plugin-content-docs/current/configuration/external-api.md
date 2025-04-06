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

### Zene kedvelése (albumok és dalok)

#### dal kedvelése

A dal kedveltnek lesz jelölve.

| Funkció                  | Dal kedvelése, amelyet a musicBrainz trackId azonosít    |
| ------------------------ | -------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                | `musicBrainz_trackID`                                    |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Elérhető                 | 10.20                                                    |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dal nem kedvelése

A dal nem lesz nem kedvelt.

| Funkció                  | Dal nem kedvelése, amelyet a musicBrainz trackId azonosít   |
| ------------------------ | ----------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                | `musicBrainz_trackID`                                       |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Elérhető                 | 10.20                                                       |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### a dal kedvelt?

Ellenőrizni, hogy a dal kedvelt-e.

| Funkció                  | Ellenőrizni, hogy a dal kedvelt-e, amelyet a musicBrainz trackId azonosít                       |
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

Ez a hívás hozzáadja a kedvelt attribútumot az albumhoz, amelyet a musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` azonosít.

#### album kedvelése

Állítsd be az album kedveltségi állapotát igazra.

| Funkció                  | Album kedvelése, amelyet a musicBrainz releaseID azonosít |
| ------------------------ | --------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                | `musicBrainz_releaseID`                                   |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Elérhető                 | 10.20                                                     |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### album nem kedvelése

Az album kedveltségi állapotának eltávolítása.

| Funkció                  | Dal nem kedvelése, amelyet a musicBrainz releaseID azonosít  |
| ------------------------ | ------------------------------------------------------------ |
| URI                      | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                | `musicBrainz_releaseID`                                      |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Elérhető                 | 10.20                                                        |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Ez a hívás eltávolítja a kedvelt attribútumot az albumról, amelyet a musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` azonosít.

#### az album kedvelt?

Ellenőrizni az album kedveltségi állapotát.

| Funkció                  | Ellenőrizni, hogy az album kedvelt-e, amelyet a musicBrainz releaseID azonosít. |
| ------------------------ | ------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/like/</span>isalbumliked`                    |
| POST BODY                | `musicBrainz_releaseID`                                                         |
| POST BODY példa / leírás | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                            |
| RESPONSE BODY            | "TRUE" or "FALSE"                                                               |
| Elérhető                 | 10.20                                                                           |

Példa:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Ez a hívás ellenőrzi, hogy az album, amelyet a musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` azonosít, kedvelt-e.

### Értékelés

Az értékelési API a dalok értékeléséért felelős. Az értékelési információk a belső adatbázisban (gyorsítótár aktív) kerülnek mentésre, és opcionálisan magában a fájlban is tárolhatók. Ha az `audio_update_rating_tag = true` be van állítva az UMS.conf fájlban, akkor az IDv3 értékelési mező is frissítésre kerül a dal fájlban (ha a fájlformátum támogatott).

A tartalomkönyvtár szerver böngészése során a MusicBrainzTrackID (ha elérhető) és az audiotrackID a `desc` metadataként kerül átadásra a DIDL elemben.

#### értékelés beállítása

| Funkció                  | Értékelés beállítása csillagokban (0 - 5) egy dalon, amelyet a musicBrainz trackId azonosít     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Elérhető                 | 10.20                                                                                           |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Ez a hívás beállítja az összes, a musicbrainz track-id-val `b8695995-45e9-405d-b4aa-e50e8760fe25` azonosított dal felhasználói értékelését `3`-ra.

#### értékelés lekérése

A dal értékelésének lekérése az adatbázisból.

| Funkció                  | A dal értékelésének lekérése csillagokban (0 - 5) a musicBrainz trackID alapján. A RESPONSE BODY tartalmazza az értékelési információkat. |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                          |
| POST BODY                | `musicbrainzTrackId`                                                                                                                      |
| POST BODY példa / leírás | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                      |
| RESPONSE BODY példa      | 3                                                                                                                                         |
| Elérhető                 | 10.20                                                                                                                                     |

Példa:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Ez a hívás lekéri a felhasználói értékelést egy dalról, amelyet a musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` azonosít.

#### értékelés beállítása audiotrack ID alapján

| Funkció                  | Értékelés beállítása csillagokban (0 - 5) egy dalon, amelyet az UMS belső audiotrackID azonosít                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                | `trackID` /`stars`                                                                                             |
| POST BODY példa / leírás | 32                                                                                                             |
| Elérhető                 | 11.0                                                                                                           |

Példa:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Ez a hívás beállítja a `32` audiotrackID-val azonosított dal felhasználói értékelését `3`-ra.

#### értékelés lekérése audiotrack ID alapján

A dal értékelésének lekérése az adatbázisból.

| Funkció                  | A dal értékelésének lekérése csillagokban (0 - 5) az UMS belső audiotrackID alapján. A RESPONSE BODY tartalmazza az értékelési információkat. |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                      | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                                 |
| POST BODY                | trackId                                                                                                                                       |
| POST BODY példa / leírás | 32                                                                                                                                            |
| RESPONSE BODY példa      | 3                                                                                                                                             |
| Elérhető                 | 11.0                                                                                                                                          |

Példa:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Ez a hívás lekéri a felhasználói értékelést egy dalról, amelyet az UMS audiotrack-id `32` azonosít.

### Biztonsági mentés / Visszaállítás

A felhasználó által kezelt "kedvelt album" bejegyzések biztonsági mentése elvégezhető egy profil mappáján belüli `database_backup` nevű almappába. A fájlnév `MUSIC_BRAINZ_RELEASE_LIKE`. Ha az UMS adatbázis törlődik, egyszerűen hajtsd végre a visszaállítást.

#### kedvelt albumok biztonsági mentése

A `MUSIC_BRAINZ_RELEASE_LIKE` tábla biztonsági mentése a fájlrendszerre

| Funkció       | kedvelt dalok biztonsági mentése a fájlrendszerre                                                     |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| URI           | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                   |
| RESPONSE BODY | `OK` vagy hibaüzenet                                                                                  |
| Elérhető      | 10.20                                                                                                 |

Példa:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Ez a hívás létrehoz egy biztonsági mentés fájlt, amely a kedvelt albumokat tartalmazza.

#### kedvelt albumok visszaállítása

A `MUSIC_BRAINZ_RELEASE_LIKE` tábla visszaállítása a fájlrendszerről.

| Funkció       | kdvelt dalok visszaállítása a biztonsági mentés fájlból                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI           | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `OK` vagy hibaüzenet                                                                                                                       |
| Elérhető      | 10.20                                                                                                                                      |

Példa:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Ez a hívás visszaállítja a biztonsági mentés fájlt.

### Lejátszási lista

#### szolgáltatás engedélyezése

Szerkeszd az UMS.conf fájlt, és konfiguráld a kezelt lejátszási lista mappát az alábbi beállítással 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

a szolgáltatás engedélyezéséhez. Alapértelmezés szerint ez a szolgáltatás le van tiltva. A lejátszási lista mappa elérési útjának a konfigurált megosztott `<span class="s1">folders</span>` mappa alatt kell elhelyezkednie, hogy az API által végrehajtott lejátszási lista módosítások láthatóvá váljanak az UMS számára.

#### összes lejátszási lista felsorolása

Elérhető lejátszási listák olvasása. Ezeket a lejátszási lista neveket kell használni a további hívásokhoz, hogy dalokat adjunk hozzá vagy távolítsunk el.

| Funkció             | Szállítja az összes támogatott (`m3u`, `m3u8` és `pls`) és elérhető lejátszási listát a konfigurált mappából. A lejátszási lista neve mellett a lejátszási lista `playlistId` is |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>`  |
| REQUEST TYPE        | GET                                                                                                                                                                              |
| RESPONSE BODY       | lejátszási lista nevek JSON tömbje                                                                                                                                               |
| RESPONSE BODY példa | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                   |
| Elérhető            | 11.0                                                                                                                                                                             |

Példa:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Ez a hívás felsorolja az összes elérhető lejátszási listát.

#### felsorolni a szerver által elérhető lejátszási listákat

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

#### dalok hozzáadása a lejátszási listákhoz

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

#### dalok eltávolítása a lejátszási listákból

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

#### új lejátszási listák létrehozása

A lejátszási lista nevét úgy kell megadni, hogy ne tartalmazzon semmilyen elérési utat és fájl kiterjesztést. 

| Funkció                  | Új lejátszási listák létrehozása a kezelt lejátszási lista mappában                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                      | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE             | POST                                                                                                                                                                           |
| POST BODY                | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY példa / leírás | Kortárs                                                                                                                                                                        |
| RESPONSE BODY            | NINCS                                                                                                                                                                          |
| Elérhető                 | 11.0                                                                                                                                                                           |

Példa:

```shell
curl -d "Kortárs" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
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
