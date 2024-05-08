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

#### rescan file or folder

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

| Úmysl                 | Dodává všechny podporované (`m3u`, `m3u8` a `pls`) a dostupné seznamy skladeb z nakonfigurované složky. Kromě názvu playlistu je playlist `playlistId`                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE          | GET                                                                                                                                                                             |
| RESPONSE BODY         | JSON pole jmen playlistu                                                                                                                                                        |
| Příklad RESPONSE BODY | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Dostupné od           | 11.0                                                                                                                                                                            |

Příklad:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Tento požadavek bude zobrazovat všechny dostupné seznamy skladeb.

#### seznam playlistů na serveru

Všechny tyto playlisty jsou známy UMS (databáze/mezipaměti). Tyto názvy playlistu musí být použity pro následné dotazy pro přidání nebo odebrání skladeb. ID playlistu může být použito k přímé navigaci do playlistu prohlížením `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Úmysl                 | Dodá všechny podporované (`m3u`, `m3u8` a `pls`) a dostupné seznamy skladeb z nakonfigurované složky                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| Příklad RESPONSE BODY | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Dostupné od           | vývojová větev                                                                                                                                           |

Příklad:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Toto volání bude zobrazovat seznam všech dostupných playlistů, které jsou dostupné pomocí UMS.

#### přidávání skladeb do playlistů

Požadovaný `audiotrackid` je doručen během prohlížení požadavků UPnP a lze jej extrahovat z DIDL atributu odezvy `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Úmysl                     | Přidat skladbu do seznamu skladeb                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE              | POST                                                                                                                                                                              |
| POST BODY                 | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| Příklad / popis POST BODY | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY             | NONE                                                                                                                                                                              |
| Dostupné od               | 11.0                                                                                                                                                                              |

Příklad:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Toto přidá píseň s ID `123` do playlistu `Pop`.

#### odstranění skladeb ze seznamů skladeb

Požadovaný `audiotrackid` je doručen během prohlížení požadavků UPnP a lze jej extrahovat z DIDL atributu odezvy `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Úmysl                     | Odstranit skladbu ze seznamu skladeb                                                                                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                       | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE              | POST                                                                                                                                                                                   |
| POST BODY                 | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| Příklad / popis POST BODY | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY             | NONE                                                                                                                                                                                   |
| Dostupné od               | 11.0                                                                                                                                                                                   |

Příklad:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Tímto odstraníte skladbu s ID `123` z playlistu `Pop`.

#### vytvořit nové seznamy skladeb

Název playlistu by měl být uveden bez cesty a bez přípony souborů. 

| Úmysl                     | Vytváření nových seznamů skladeb ve spravované složce seznamu skladeb                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                       | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE              | POST                                                                                                                                                                           |
| POST BODY                 | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| Příklad / popis POST BODY | Současný                                                                                                                                                                       |
| RESPONSE BODY             | NONE                                                                                                                                                                           |
| Dostupné od               | 11.0                                                                                                                                                                           |

Příklad:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Toto volání vytvoří nový soubor playlistu s názvem `Contemporary.m3u8` ve spravované složce playlistu.

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

## HTTP návratové kódy

| 200 | OK | | 204 | Úspěch, pokud nemá být žádný obsah vrácen | | 401 | neplatný api klíč | | 404 | Požadovaný objekt nebyl nalezen | | 417 | API požadavek selhal | | 503 | externí api není povoleno. Nastavte `api_key` v UMS.conf o délce 12 nebo více znaků |
