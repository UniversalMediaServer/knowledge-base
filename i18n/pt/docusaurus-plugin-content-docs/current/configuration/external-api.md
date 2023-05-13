# API externa

A API externa permite que programas acessem ou acionem funcionalidades do UMS com uma chamada HTTP.

## Como ativar a API externa

Edite UMS.conf e configure uma api_key como esta

`api_key = senha_secreta`

A _`senha_secreta`_ deve ter no mínimo 12 caracteres.

## Uso da API

Se a API externa estiver ativada, a API estará acessível com uma chamada POST para /api/COMMAND

### Pesquisa de Pastas

#### Pesquisar novamente

| Intenção                         | Pesquisar toda a biblioteca novamente |
| -------------------------------- | ------------------------------------- |
| URI                              | `/api/folderscanner/rescan`           |
| POST BODY                        | NENHUM                                |
| Exemplo / descrição do POST BODY | This command needs no body content    |
| Disponível desde                 | 10.4.2                                |

:::info
Isto pode ser demorado para bibliotecas grandes
:::

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: senha_secreta" http://localhost:5001/api/folderscanner/rescan
```

#### rescanFileOrFolder

| Intenção                         | Pesquisar novamente uma sub-árvore parcial do sistema de arquivos.                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| URI                              | `/api/folderscanner/rescanFileOrFolder`                                                               |
| POST BODY                        | PATH_TO_SCAN                                                                                        |
| Exemplo / descrição do POST BODY | exemplo: "/music/pop/Madonna". O caminho deve ser a raiz ou uma subpasta de um caminho compartilhado. |
| Disponível desde                 | 10.4.2                                                                                                |

Exemplo:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n-H "api-key: senha_secreta" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Curtindo Música (álbuns e músicas)

#### curtir música

A música será marcada como curtida.

| Intenção                         | Curtir uma música identificada pelo trackId da música Brainz |
| -------------------------------- | ------------------------------------------------------------ |
| URI                              | `<span class="s1">/api/like/likesong</span>`     |
| POST BODY                        | `musicBrainz_trackID`                                        |
| Exemplo / descrição do POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                         |
| Disponível desde                 | 10.20                                                        |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### dislike song

Song will not be disliked

| Intention                       | Dislike a song identified by musicBrainz trackId            |
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

Example:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### descurtir álbum

Remover curtir/descurtir do álbum.

| Intenção                         | Descurtir uma música identificada pelo trackId da música Brainz |
| -------------------------------- | --------------------------------------------------------------- |
| URI                              | `<span class="s1">/api/like/</span>dislikealbum`    |
| POST BODY                        | `musicBrainz_releaseID`                                         |
| Exemplo / descrição do POST BODY | 1e0eee38-a9f6-49bf-84d0-45d0647799af                            |
| Disponível desde                 | 10.20                                                           |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/like/dislikealbum
```

Esta chamada removeu o curtir/descurtir do álbum identificado pelo relead-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` do musicbrainz.

#### é um álbum curtido

Verificar curtir/descurtir do álbum.

| Intenção                         | Verificar se o álbum foi curtido identificado pelo releaseID do musicBrainz |
| -------------------------------- | --------------------------------------------------------------------------- |
| URI                              | `<span class="s1">/api/like/</span>dislikealbum`                |
| POST BODY                        | `musicBrainz_releaseID`                                                     |
| Exemplo / descrição do POST BODY | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                        |
| RESPONSE BODY                    | "TRUE" or "FALSE"                                                           |
| Disponível desde                 | 10.20                                                                       |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: senha_secreta -X POST http://localhost:5001/api/like/isalbumliked
```

Esta chamada verifica se o álbum identificado pelo relead-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` do musicbrainz foi curtido.

### Classificação

A API de avaliação é responsável pela avaliação de músicas. Informações de avaliação são salvas no banco de dados interno (cache habilitado) e, opcionalmente, no próprio arquivo. Se`o audio_update_rating_tag = true` estiver definido em UMS.conf, o campo de classificação IDv3 também é atualizado no arquivo de música (se o formato do arquivo de músicas for suportado).

Ao navegar pelo servidor de diretórios de conteúdo, MusicBrainzTrackID (se disponível) e audiotrackID são entregues no metadado `desc` dentro do elemento DIDL.

#### defina a classificação

| Intenção                         | Define a classificação em estrelas (0 - 5) em uma música identificada pelo trackId do musicBrainz |
| -------------------------------- | ------------------------------------------------------------------------------------------------- |
| URI                              | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>`   |
| POST BODY                        | `musicbrainzTrackId` /`stars`                                                                     |
| Exemplo / descrição do POST BODY | b8695995-45e9-405d-b4aa-e50e8760fe25                                                              |
| Disponível desde                 | 10.20                                                                                             |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Reads song rating from database

| Intention                       | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`        |
| POST BODY                       | `musicbrainzTrackId`                                                                                    |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                    |
| RESPONSE BODY example           | 3                                                                                                       |
| Available since                 | 10.20                                                                                                   |

Example:

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
curl -d "32" -w "%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Esta chamada lê a classificação do usuário de uma música identificada pelo audiotrack-id `32` do UMS.

### Backup / Restore

Entradas "álbum curtido" gerenciadas pelo usuário podem salvas em uma subpasta do diretório de perfil chamada `database_backup`. O nome de arquivo é `MUSIC_BRAINZ_RELEASE_LIKE`. Caso o banco de dados do UMS seja apagado, basta chamar restaurar.

#### fazer backup de álbuns curtidos

Fazer backup da tabela `MUSIC_BRAINZ_RELEASE_LIKE` para o sistema de arquivos

| Intenção         | Fazer backup de músicas curtidas para o sistema de arquivos                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| URI              | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE     | GET                                                                                                   |
| RESPONSE BODY    | `OK` ou mensagem de erro                                                                              |
| Disponível desde | 10.20                                                                                                 |

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: senha_secreta" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Esta chamada criará um arquivo de backup contendo álbuns curtidos.

#### restaurar álbuns curtidos

Restaura tabela `MUSIC_BRAINZ_RELEASE_LIKE` do sistema de arquivos

| Intenção         | restaurar músicas curtidas do arquivo de backup                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI              | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE     | GET                                                                                                                                        |
| RESPONSE BODY    | `OK` ou mensagem de erro                                                                                                                   |
| Disponível desde | 10.20                                                                                                                                      |

Exemplo:

```
curl -w "%{http_code}\n" -H "api-key: senha_secreta" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Esta chamada restaura o arquivo de backup.

### Lista de reprodução

#### ativar serviço

Edite o UMS.conf e configure uma pasta de lista de reprodução gerenciada configurando 

`<span class="s1">managed_playlist_folder</span> = CAMINHO_PARA_PASTA`

por ativar esse serviço. Por padrão, este serviço está desativado. O caminho da pasta de listas de reprodução deve estar abaixo do caminho de `<span class="s1">pastas</span>` compartilhadas de listas de reprodução alterado por esta API para ser visível pelo UMS.

#### listar todas as listas de reprodução

Leia as listas de reprodução disponíveis. Estes nomes de listas de reprodução precisam ser usados nas chamadas subsequentes para adicionar ou remover músicas.

| Intenção              | Entrega todas as listas de reprodução (`m3u`, `m3u8` e `pls`) disponíveis na pasta configurada. Além do nome da lista de reprodução, a lista `playlistId` é                     |
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

This call will list list all available playlist.

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

Exemplo:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Isso adiciona a música com o ID `123` na listas de reprodução `Pop`.

#### Remover Músicas da Lista de Reprodução

O `audiotrackid` requerido é entregue durante solicitações de navegação UPnP e pode ser extraído do atributo de resposta `descMetadata` do DIDL

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Intenção                         | Remove música da lista de reprodução                                                                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                              | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                     | POST                                                                                                                                                                                   |
| POST BODY                        | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| Exemplo / descrição do POST BODY | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                    | NONE                                                                                                                                                                                   |
| Disponível desde                 | 11.0                                                                                                                                                                                   |

Exemplo:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: senha_secreta" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Isso remove a música com o ID `123` da lista de reprodução `Pop`.

#### Cria novas listas de reprodução

O nome da lista de reprodução deve ser fornecido sem o caminho e sem extensões de arquivo. 

| Intenção                         | Criando novas listas de reprodução na pasta de listas de reprodução gerenciada                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                              | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                     | POST                                                                                                                                                                           |
| POST BODY                        | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">NOME_DA_LISTA_DE_REPRODUÇÃO</span>`                                           |
| Exemplo / descrição do POST BODY | Contemporânea                                                                                                                                                                  |
| RESPONSE BODY                    | NONE                                                                                                                                                                           |
| Disponível desde                 | 11.0                                                                                                                                                                           |

Example:

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
