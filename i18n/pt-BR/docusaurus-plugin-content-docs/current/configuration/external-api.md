# API Externa

A API externa permite que programas acessem ou acionem as funcionalidades do UMS com uma chamada HTTP.

## Como ativar a API Externa

Edite o arquivo UMS.conf e configure uma "api_key" assim:

`api_key = senha_secreta`

A _`senha_secreta`_ deve conter um número mínimo de 12 caracteres.

## Uso da API

Se a API Externa estiver habilitada, a API estará acessível com uma chamada POST para o endereço /api/COMMAND

### Escaneamento das pastas

#### rescan

| Intenção                      | Escanear novamente a biblioteca de mídia completa |
| ----------------------------- | ------------------------------------------------- |
| URI                           | `/api/folderscanner/rescan`                       |
| POST BODY                     | NONE                                              |
| POST BODY exemplo / descrição | Este comando não necessita de conteúdo no BODY    |
| Disponível desde              | 10.4.2                                            |

:::Informação
Este comando pode ser bem lento para bibliotecas de mídia grandes
:::

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: senha_secreta" http://localhost:5001/api/folderscanner/rescan
```

#### re-escanear arquivo ou pasta

| Intenção                      | Escanear novamente uma subárvore parcial do sistema de arquivos.                                               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                           | `/api/folderscanner/rescanFileOrFolder`                                                                        |
| POST BODY                     | CAMINHO_PARA_ESCANEAR                                                                                        |
| POST BODY exemplo / descrição | exemplo: "/music/pop/Madonna". O caminho deve ser a raiz da pasta ou uma subpasta de um caminho compartilhado. |
| Disponível desde              | 10.4.2                                                                                                         |

Exemplo:

```shell
curl -d "CAMINHO_PARA_ESCANEAR" -w "%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Curtindo Músicas (álbuns e músicas)

#### like song

A música será marcada como curtida.

| Intenção                      | Curtir uma música identificada por um trackId do musicBrainz |
| ----------------------------- | ------------------------------------------------------------ |
| URI                           | `<span class="s1">/api/like/likesong</span>`     |
| POST BODY                     | `musicBrainz_trackID`                                        |
| POST BODY exemplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                         |
| Disponível desde              | 10.20                                                        |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Descurtir uma música

A música será descurtida

| Intenção                      | Descurtir uma música identificada pelo trackId do musicBrainz |
| ----------------------------- | ------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>dislikesong`   |
| POST BODY                     | `musicBrainz_trackID`                                         |
| POST BODY exemplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                          |
| Disponível desde              | 10.20                                                         |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### É uma música curtida

Checar se uma música foi curtida.

| Intenção                      | Checar se uma música foi curtida identificada pelo trackId do musicBrainz                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                     | `musicBrainz_trackID`                                                                           |
| POST BODY exemplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                 | `VERDADEIRO` ou `FALSO`                                                                         |
| Disponível desde              | 10.20                                                                                           |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Esta chamada acrescenta o atributo curtido do álbum identificado pelo release-id do musicBrainz `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Curtir um álbum

Definir o estado de curtido de um álbum para verdadeiro.

| Intenção                      | Curtir um álbum identificado pelo releaseId do musicBrainz |
| ----------------------------- | ---------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>likealbum`  |
| POST BODY                     | `musicBrainz_releaseID`                                    |
| POST BODY exemplo / descrição | 1e0eee38-a9f6-49bf-84d0-45d0647799af                       |
| Disponível desde              | 10.20                                                      |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Descurtir um álbum

Remover o estado de curtido de um álbum.

| Intenção                      | Descurtir uma música identificada pelo releaseId do musicBrainz |
| ----------------------------- | --------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>dislikealbum`    |
| POST BODY                     | `musicBrainz_releaseID`                                         |
| POST BODY exemplo / descrição | 1e0eee38-a9f6-49bf-84d0-45d0647799af                            |
| Disponível desde              | 10.20                                                           |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Esta chamada removeu o atributo curtido do álbum identificado pelo release-id do musicBrainz `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### O álbum gostou

Verifique o estado do álbum.

| Intenção                                                                                   | Verificar se o álbum foi curtido, utilizando o releaseID do MusicBrainz para identificação. |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Verificar se o álbum foi curtido, utilizando o releaseID do MusicBrainz para identificação | `<span class="s1">/api/like/</span>isalbumliked`                                |
| POST BODY                                                                                  | `musicBrainz_releaseID`                                                                     |
| POST BODY exemplo / descrição                                                              | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                        |
| RESPONSE BODY                                                                              | "TRUE" or "FALSE"                                                                           |
| Disponível desde                                                                           | 10.20                                                                                       |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Essa chamada verifica se o álbum identificado pelo musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` é gostado.

### Avaliação

A API de avaliação é responsável pela avaliação de músicas. Informações de avaliação são salvas no banco de dados interno (cache habilitado) e, opcionalmente, no próprio arquivo. Se `audio_update_rating_tag = true` estiver definido em UMS.conf, o campo de classificação IDv3 também será atualizado no arquivo de música (se o formato do arquivo de música for suportado).

Ao navegar pelo servidor de diretórios de conteúdo, MusicBrainzTrackID (se disponível) e audiotrackID são entregues no metadado `desc` dentro do elemento DIDL.

#### Defina a classificação

| Intenção                      | Define a classificação em estrelas (0 - 5) em uma música identificada pelo trackId do musicBrainz |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>`   |
| POST BODY                     | `musicbrainzTrackId` /`stars`                                                                     |
| POST BODY exemplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                            |
| Disponível desde              | 10.20                                                                                             |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Esta chamada define a classificação do usuário de todas as músicas identificadas pelo track-id do musicbrainz `b8695995-45e9-405d-b4aa-e50e8760fe25` para `3`.

#### Obter classificação

Lê a avaliação de músicas do banco de dados

| Intenção                      | Obtém a avaliação de uma música em estrelas (0 - 5) através do musicBrainz trackID. O Response body possui as informações de classificação. |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                            |
| POST BODY                     | `musicbrainzTrackId`                                                                                                                        |
| POST BODY exemplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                        |
| RESPONSE BODY exemplo         | 3                                                                                                                                           |
| Disponível desde              | 10.20                                                                                                                                       |

Exemplo:

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

Esta chamada listará todas as listas de reprodução disponíveis.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Intention             | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY example | ``                                                                                                                                                       |
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
import nextcp.dto. Config;
import nextcp.dto. UmsServerApiKey;
import okhttp3. Call;
import okhttp3. MediaType;
import okhttp3. OkHttpClient;
import okhttp3. Request;
import okhttp3. RequestBody;
import okhttp3.

    Response;

[...]

    public String executeCall() throws IOException
    {
        String postBody = "1e0eee38-a9f6-49bf-84d0-45d0647799af";
        String apiKey = "secret_password";
        RequestBody body = RequestBody.create(postBody, MediaType.parse("application/text"));
        String requestUrl = "http://127.0.0.1:5001/api/like/likealbum";
        Request request = new Request. Builder().url(requestUrl).addHeader("api-key", apiKey).post(body).build();
        Call call = okClient.newCall(request);
        Response response = call.execute();
        return response.body().string();
    }
```

## HTTP return codes

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Set a `api_key` in UMS.conf with a length of 12 or more character |
