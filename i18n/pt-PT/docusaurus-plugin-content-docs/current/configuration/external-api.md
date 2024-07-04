# API Externa

A API externa permite que programas acedam ou acionem funcionalidades UMS com um pedido HTTP.

## Como ativar a API externa

Editar UMS.conf e configurar uma api_key como esta

`api_key = palavra_passe`

A _`secret_password`_ deve ter no mínimo 12 caracteres.

## Utilização da API

Se a API externa estiver ativada, a API estará acessível através de um pedido POST para /api/COMMAND

### Verificação de Pastas

#### Pesquisar novamente

| Intenção                      | Verificar toda a biblioteca.                |
| ----------------------------- | ------------------------------------------- |
| URI                           | `/api/folderscanner/rescan`                 |
| CAIXA DE PUBLICAÇÃO           | NADA                                        |
| POST BODY examplo / descrição | Este comando não precisa de corpo no pedido |
| Disponível desde              | 10.4.2                                      |

:::info
Isto pode ser lento para bibliotecas grandes
:::

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### Pesquisar novamente ficheiro ou pasta

| Intenção                      | Verificar parte do sistema de ficheiros.                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| URI                           | `/api/folderscanner/rescanFileOrFolder`                                                            |
| CAIXA DE PUBLICAÇÃO           | CAMINHO_PARA_PESQUISA                                                                            |
| POST BODY examplo / descrição | exemplo: "/music/pop/Madonna". O caminho deve ser a raiz ou uma subpasta de um caminho partilhado. |
| Disponível desde              | 10.4.2                                                                                             |

Exemplo:

```shell

```

### Gostos em Músicas (Álbuns e Canções)

#### Gostar da música

A música será marcada com Gosto.

| Intenção                      | Colocar gosto numa música identificada pelo trackId da musicBrainz. |
| ----------------------------- | ------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/likesong</span>`            |
| CAIXA DE PUBLICAÇÃO           | `musicBrainz_trackID`                                               |
| POST BODY examplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                |
| Disponível desde              | 10.20                                                               |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Não gostar a música

Música deixará de estar marcada com Gosto.

| Intenção                      | Retirar gosto numa música identificada pelo trackId da musicBrainz. |
| ----------------------------- | ------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>dislikesong`         |
| CAIXA DE PUBLICAÇÃO           | `musicBrainz_trackID`                                               |
| POST BODY examplo / descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                |
| Disponível desde              | 10.20                                                               |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### Gostaram da música

Verificar se gostaram da música.

| Intenção                              | Verificar se gostaram da música identificada por musicBrainz trackId                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| CAIXA DE PUBLICAÇÃO                   | `musicBrainz_trackID`                                                                           |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| CAIXA DE RESPOSTA                     | `TRUE` or `FALSE`                                                                               |
| Disponível desde                      | 10.20                                                                                           |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Esta escolha adiciona o atributo gostado do álbum identificado por musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Gostar do álbum

Define o estado do álbum como true.

| Intenção            | Colocar gosto num álbum identificado pelo trackId da musicBrainz. |
| ------------------- | ----------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/like/</span>likealbum`         |
| CAIXA DE PUBLICAÇÃO | `musicBrainz_releaseID`                                           |
|                     | 1e0eee38-a9f6-49bf-84d0-45d0647799af                              |
|                     | 10.20                                                             |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Não gostar do álbum

Remover gostar do estado do álbum.

| Intenção                              | Remover gosto numa música identificada pelo trackId da musicBrainz. |
| ------------------------------------- | ------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/like/</span>dislikealbum`        |
| CAIXA DE PUBLICAÇÃO                   | `musicBrainz_releaseID`                                             |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                |
| Disponível desde                      | 10.20                                                               |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Esta escolha adiciona o atributo gostado do álbum identificado por musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### é um álbum com gosto

Verificar o estado de gosto do álbum

| Intenção                              | Verificar se o álbum tem gosto identificado por musicBrainz trackId |
| ------------------------------------- | ------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/like/</span>isalbumliked`        |
| CAIXA DE PUBLICAÇÃO                   | `musicBrainz_releaseID`                                             |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                |
| CAIXA DE RESPOSTA                     | "TRUE" or "FALSE"                                                   |
| Disponível desde                      | 10.20                                                               |

Exemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Esta opção verifica se o álbum identificado por musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`está com gosto.

### Classificação

A API de avaliação é responsável pela avaliação de músicas. Informações de avaliação são guardadas no base de dados interna (cache habilitado) e, opcionalmente, no próprio arquivo. Se o`audio_update_rating_tag = true` estiver definido no UMS.  o campo de classificação conf IDv3 também está a ser actualizado no arquivo de música (se o formato do arquivo de músicas for suportado).

Ao navegar pelo servidor de directório de conteúdo, MusicBrainzTrackID (se disponível) e audiotrackID são disponibilizados como metadados `desc` dentro do elemento DIDL.

#### Defina a classificação

| Intenção                              | Classificar com estrelas (0 - 5) uma música identificada pelo trackId do musicBrainz            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| CAIXA DE PUBLICAÇÃO                   | `musicbrainzTrackId` /`stars`                                                                   |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Disponível desde                      | 10.20                                                                                           |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Esta opção define a classificação do utilizador de todas as músicas identificadas pelo track-id de música `b8695995-45e9-405d-b4aa-e50e8760fe25` para `3`.

#### Aceda à classificação

Lê avaliação de músicas na base de dados

| Intenção                              | Obtenha a classificação da música em estrelas (0 - 5) pela musicBrainz trackID. A caixa de resposta contém as informações da classificação. |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                            |
| CAIXA DE PUBLICAÇÃO                   | `musicbrainzTrackId`                                                                                                                        |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                        |
| CAIXA DE RESPOSTA  exemplo            | 3                                                                                                                                           |
| Disponível desde                      | 10.20                                                                                                                                       |

Exemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Esta opção define a classificação do utilizador de todas as músicas identificadas pelo track-id de música `b8695995-45e9-405d-b4aa-e50e8760fe25` .

#### Definir avaliação por id da faixa de áudio

| Intenção                              | Classificar com estrelas (0 - 5) uma música identificada pelo audiotrackID interno do UMS                      |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                                   | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| CAIXA DE PUBLICAÇÃO                   | `trackID` /`stars`                                                                                             |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | 32                                                                                                             |
| Disponível desde                      | 11.0                                                                                                           |

Exemplo:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Esta opção define a classificação das músicas identificadas pelo id da faixa de áudio`32` para `3`.

#### Definir avaliação por id da faixa de áudio

Lê avaliação de músicas na base de dados

|                                       | Obtenha a classificação da música em estrelas (0 - 5) pela ID da faixa de áudio interna  do UMS. A caixa de resposta contém informações da classificação. |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                       | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                                             |
|                                       | Id da faixa                                                                                                                                               |
| CAIXA DE PUBLICAÇÃO exemplo/descrição | 32                                                                                                                                                        |
| CAIXA DE RESPOSTA  exemplo            | 3                                                                                                                                                         |
|                                       | 11.0                                                                                                                                                      |

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Esta opção lê a classificação do utilizador de uma música identificada pelo audiotrack-id UMS `32`.

### Cópia de segurança / Restauro

Entradas marcadas pelo utilizador como "álbum que gosto" podem ser guardadas numa sub-pasta de diretórios chamada `database_backup`. O nome de arquivo é `MUSIC_BRAINZ_RELEASE_LIKE`. No caso em que o banco de dados UMS seja apagado, basta escolher "Restaurar".

#### Cópia de segurança de álbuns que gosto

Cópia de segurança da tabela `MUSIC_BRAINZ_RELEASE_LIKE` no sistema de arquivos

| Intenção          | Fazer cópia de segurança das músicas com gosto para o sistema de arquivos                             |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| SOLICITAR TIPO    | GET                                                                                                   |
| CAIXA DE RESPOSTA | `OK` ou mensagem de erro                                                                              |
| Disponível desde  | 10.20                                                                                                 |

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Esta opção cria um arquivo da cópia de segurança contendo álbuns com gosto.

#### restaurar álbuns com gosto

Restaura tabela `MUSIC_BRAINZ_RELEASE_LIKE` a partir do sistema de ficheiros

| Intenção          | Restaurar músicas com gosto do arquivo da cópia de segurança                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| SOLICITAR TIPO    | GET                                                                                                                                        |
| CAIXA DE RESPOSTA | `OK` ou mensagem de erro                                                                                                                   |
| Disponível desde  | 10.20                                                                                                                                      |

Exemplo:

```
curl -w "%{http_code}\n" -H "api-chave: palavra-passe" -X GET http://localhost:5001/api/gosto/restaurar álbuns com gosto
```

Esta opção restaura o arquivo da cópia de segurança.

### Lista de reprodução

#### Habilitar serviço

Edite o UMS.conf e configure uma pasta da lista de reprodução gerida pela configuração 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

Por habilitar este serviço. Este serviço está desativado por padrão O caminho da pasta da lista de reprodução, deverá estar localizado debaixo de um caminho partilhado `<span class="s1">pastas</span>` configurado para a lista de reprodução, criado por esta API para ficar visível pelo UMS

#### Listar todas as listas de reprodução

Ler listas de reprodução disponíveis Estes nomes de listas de reprodução devem ser usados para subsequentes acções de remoção ou adição de músicas

| Intenção         | Entrega todos os  (`m3u`, `m3u8` e `pls`) suportados e listas de reprodução disponíveis a partir da pasta configurada. Ao lado do nome da lista de reprodução, as listas de reprodução  `playlistId` são |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI              | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>`                          |
|                  | GET                                                                                                                                                                                                      |
|                  | Variedade JSON de nomes de listas de reprodução                                                                                                                                                          |
|                  | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                                           |
| Disponível desde | 11.0                                                                                                                                                                                                     |

Exemplo:

```shell
curl -w "%{http_code}\n" -H "api-chave: palavra-passe" -X GET http://localhost:5001/api/lista de reprodução/aceder a todas as listas de reprodução
```

Este comando listará todas as listas de reprodução disponíveis.

#### Enumera as listas de reprodução acessíveis no servidor

Estas são todas as listas de reprodução conhecidas pelo UMS (base de dados/cache habilitado). Estes nomes de listas de reprodução devem ser usados para subsequentes acções de remoção ou adição de músicas O ID da playlist pode ser usado para navegar directamente para a lista de reprodução navegando pelo `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Intenção                   | Entrega todos os  (`m3u`, `m3u8` e `pls`) suportados e listas de reprodução disponíveis a partir da pasta configurada.                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                        | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| SOLICITAR TIPO             | GET                                                                                                                                                      |
| CAIXA DE RESPOSTA          | Variedade JSON de nomes de listas de reprodução                                                                                                          |
| CAIXA DE RESPOSTA  exemplo | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Tabelas","playlistId":343}]`                                                                   |
| Disponível desde           | dev branch                                                                                                                                               |

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
