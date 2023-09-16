# Externí API

Externí API umožňuje programům přístup k funkcím UMS pomocí volání HTTP protokolu.

## Jak povolit externí API

Upravte UMS.conf a nakonfigurujte api_key podobně jako toto

`api_key = secret_password`

_`secret_password`_ musí mít minimálně 12 znaků.

## Využití API

Pokud je externí API povoleno, API je dostupné s POST voláním na /api/COMMAND

### Skenování složky

#### Znovu prohledat

| Úmysl                     | Rescanuje kompletní knihovnu         |
| ------------------------- | ------------------------------------ |
| URI                       | `/api/folderscanner/rescan`          |
| POST BODY                 | NONE                                 |
| Příklad / popis POST BODY | Tento příkaz nepotřebuje žádný obsah |
| Dostupné od               | 10.4.2                               |

:::info
Toto může být pomalé pro velké knihovny :
:::

Příklad:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### rescanFileOrFolder

| Úmysl                     | Rescanuje částečnou větev souborového systému.                                               |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| URI                       | `/api/folderscanner/rescanFileOrder`                                                         |
| POST BODY                 | PATH_TO_SCAN                                                                               |
| Příklad / popis POST BODY | příklad: "/music/pop/Madonna". Cesta musí být kořenový adresář nebo podsložka sdílené cesty. |
| Dostupné od               | 10.4.2                                                                                       |

Příklad:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Líbí se hudba (alba a skladby)

#### líbí se song

Skladba bude označena jako „oblíbená“.

| Úmysl                     | Oblíbená píseň identifikovaná musicBrainz trackId        |
| ------------------------- | -------------------------------------------------------- |
| URI                       | `<span class="s1">/api/like/likesong</span>` |
| POST BODY                 | `musicBrainz_trackID`                                    |
| Příklad / popis POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Dostupné od               | 10.20                                                    |

Příklad:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### nelíbí se píseň

Skladba se nebude nelíbit

| Úmysl                     | Nelíbí se vám skladba identifikovaná musicBrainz trackId    |
| ------------------------- | ----------------------------------------------------------- |
| URI                       | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY                 | `musicBrainz_trackID`                                       |
| Příklad / popis POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Dostupné od               | 10.20                                                       |

Příklad:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### skladba se líbí

Zkontrolujte, zda se skladba líbí.

| Úmysl                     | Zkontrolujte, zda je skladba líbí, identifikována podle musicBrainz trackId                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                 | `musicBrainz_trackID`                                                                           |
| Příklad / popis POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY             | `TRUE` or `FALSE`                                                                               |
| Dostupné od               | 10.20                                                                                           |

Příklad:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Toto volání přidává oblíbený atribut alba identifikovaný podle musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Album se mi líbí

Nastaví album se líbí jako true.

| Úmysl                     | Líbí se vám album identifikované podle musicBrainz releaseID |
| ------------------------- | ------------------------------------------------------------ |
| URI                       | `<span class="s1">/api/like/</span>likealbum`    |
| POST BODY                 | `musicBrainz_releaseID`                                      |
| Příklad / popis POST BODY | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Dostupné od               | 10.20                                                        |

Příklad:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### albume se vám nelíbí

Odstranit album se líbí status.

| Úmysl                     | Nemám rád skladbu identifikovanou musicBrainz releaseID      |
| ------------------------- | ------------------------------------------------------------ |
| URI                       | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY                 | `musicBrainz_releaseID`                                      |
| Příklad / popis POST BODY | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Dostupné od               | 10.20                                                        |

Příklad:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Tento příkaz odstraní atribut alba  "je oblíbené" identifikované musicbrainz release-id `1e0ee38-a9f6-49bf-84d0-45d0647799af`.

#### album se líbí

Zkontrolujte oblíbenost alba.

| Úmysl                     | Zkontrolujte, zda se album líbí pomocí musicBrainz releaseID |
| ------------------------- | ------------------------------------------------------------ |
| URI                       | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                 | `musicBrainz_releaseID`                                      |
| Příklad / popis POST BODY | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY             | "TRUE" nebo "FALSE"                                          |
| Dostupné od               | 10.20                                                        |

Příklad:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Tento příkaz kontroluje, zda se líbí album identifikované v musicbrainz release-id `1e0ee38-a9f6-49bf-84d0-45d0647799af`.

### Hodnocení

API hodnocení je zodpovědné za hodnocení skladeb. Hodnotící informace jsou uloženy v interní databázi (povolena mezipaměť) a volitelně v samotném souboru. Pokud je `audio_update_rating_tag = true` nastaveno v UMS.conf pole pro hodnocení IDv3 je také aktualizováno v souboru skladby (pokud je podporován formát souboru).

Při procházení adresáře obsahu, MusicBrainzTrackID (je-li k dispozici) a audiotrackID jsou dodány jako `desc` metadata v rámci DIDL elementu.

#### nastavit hodnocení

| Úmysl                     | Nastavte hodnocení v hvězdách (0 - 5) pro skladbu identifikovanou musicBrainz trackId           |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                 | `musicbrainzTrackId` /`stars`                                                                   |
| Příklad / popis POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Dostupné od               | 10.20                                                                                           |

Příklad:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Tento příkaz nastavuje uživatelské hodnocení všech skladeb identifikovaných podle musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` na `3`.

#### získej hodnocení

Čte hodnocení skladeb z databáze

| Úmysl                     | Získejte hodnocení skladeb v hvězdách (0 - 5) od musicBrainz trackID. Odpověď obsahuje ratingové informace. |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`            |
| POST BODY                 | `musicbrainzTrackId`                                                                                        |
| Příklad / popis POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                        |
| Příklad RESPONSE BODY     | 3                                                                                                           |
| Dostupné od               | 10.20                                                                                                       |

Příklad:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Toto volání čte uživatelské hodnocení písně označené musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### nastavit hodnocení podle audiotrack id

| Úmysl                     | Nastaví hodnocení v hvězdičkách (0–5) skladby identifikované interním audiotrackID.                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                 | `trackID` /`stars`                                                                                             |
| Příklad / popis POST BODY | 32                                                                                                             |
| Dostupné od               | 11.0                                                                                                           |

Příklad:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Toto volání nastavuje uživatelské hodnocení skladeb identifikovaných audiotrack id`32` na `3`.

#### získej hodnocení pomocí audiotrack id

Čte hodnocení skladeb z databáze

| Úmysl                     | Získejte hodnocení skladeb ve hvězdách (0 - 5) od UMS interních audiotrackID. Odpověď obsahuje ratingové informace. |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`       |
| POST BODY                 | trackId                                                                                                             |
| Příklad / popis POST BODY | 32                                                                                                                  |
| Příklad RESPONSE BODY     | 3                                                                                                                   |
| Dostupné od               | 11.0                                                                                                                |

Příklad:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Toto volání čte uživatelské hodnocení skladby identifikované pomocí UMS audiotrack-id `32`.

### Zálohování / Obnovení

Uživatelem spravované "like album" položky mohou být zálohovány do adresáře s názvem `database_backup`. Název souboru je `MUSIC_BRAINZ_RELEASE_LIKE`. Pokud bude databáze UMS smazána, stačí volat obnovu.

#### zálohování oblíbených alb

Zálohovat tabulku `MUSIC_BRAINZ_RELEASE_LIKE` do souborového systému

| Úmysl         | zálohování oblíbených skladeb do souborového systému                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| URI           | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                   |
| RESPONSE BODY | `OK` nebo chybová zpráva                                                                              |
| Dostupné od   | 10.20                                                                                                 |

Příklad:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Tento volání vytvoří záložní soubor obsahující oblíbená alba.

#### obnovit oblíbené alba

Obnoví tabulku `MUSIC_BRAINZ_RELEASE_LIKE` ze souborového systému

| Úmysl         | obnovit oblíbené skladby ze záložního souboru                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI           | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `OK` nebo chybová zpráva                                                                                                                   |
| Dostupné od   | 10.20                                                                                                                                      |

Příklad:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Tento volání obnoví záložní soubor.

### Seznam stop

#### Povolit službu

Upravte UMS.conf a nakonfigurujte spravovanou složku playlistu 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

pro povolení této služby. Ve výchozím nastavení je tato služba zakázána. Cesta ke složce playlistu by měla být umístěna pod nakonfigurovanou sdílenou `<span class="s1">složkou</span>` pro změnu playlistu, kterou toto API vidí UMS.

#### seznam všech playlistů

Číst dostupné seznamy skladeb. Tyto názvy playlistu musí být použity pro následná volání pro přidání nebo odebrání skladeb.

| Úmysl                 | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder. Besides playlist name, the playlists `playlistId` is                           |
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

Tento požadavek bude zobrazovat všechny dostupné seznamy skladeb.

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

#### přidávání skladeb do playlistu

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

#### odebírání skladeb z playlistu

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

#### vytvořit nový playlist

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

## Příklad kódu Java

Tento úryvek kódu ukazuje, jak používat API v knihovně okhttp3.

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
