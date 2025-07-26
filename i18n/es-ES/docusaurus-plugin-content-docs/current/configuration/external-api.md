# API externa

La API externa permite a los programas acceder o activar funcionalidades de UMS con una llamada HTTP.

## Cómo activar la API externa

Editar UMS.conf y configura una api_key como esta

`api_key = llave_secreta`

La _`llave_secreta`_ debe tener un mínimo de 12 caracteres.

## Uso de API

Si la API externa está habilitada, la API es accesible con una llamada POST a /api/INSTRUCCION

### Escaneo de carpeta

#### Volver a escanear

| Intención                       | Volver a escanear la biblioteca completa               |
| ------------------------------- | ------------------------------------------------------ |
|                                 | ``                                                     |
|                                 |                                                        |
| Ejemplo POST BODY / descripción | Este comando no necesita ningún contenido en el cuerpo |
| Disponible desde                | 10.4.2                                                 |

:::info
Esto puede ser lento para bibliotecas grandes
:::

Ejemplo:

```shell
curl -w "%{http_code}\n" -H "api-key: llave_secreta" http://localhost:5001/api/folderscanner/rescan
```

#### reescanee archivo o carpeta

| Encabezado de tabla             | Volver a escanear parcialmente el sistema de ficheros                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
|                                 | ``                                                                                             |
|                                 |                                                                                                |
| POST BODY ejemplo / descripción | Ejemplo:"/music/pop/Madonna". La ruta debe ser la raíz o una subcarpeta de una ruta compartida |
| Disponible desde                | 10.4.2                                                                                         |

Ejemplo:

```shell

```

### Música "Me Gusta" (álbumes y canciones)

#### Canción "me gusta"

Canción marcada como "Me Gusta"

| Encabezado de tabla             | Canción "Me Gusta" identificada por musicBrainz trackID  |
| ------------------------------- | -------------------------------------------------------- |
|                                 | `<span class="s1">/api/like/likesong</span>` |
|                                 | `musicBrainz_trackID`                                    |
| POST BODY ejemplo / descripción | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Disponible desde                | 10.20                                                    |

Ejemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Canción "no me gusta"

Canción marcada como "no me gusta"

| Encabezado de tabla           | No le gusta una canción identificada por musicBrainz trackId |
| ----------------------------- | ------------------------------------------------------------ |
| URI                           | `<span class="s1">/api/like/</span>dislikesong`  |
| POST BODY                     | `musicBrainz_trackID`                                        |
| POST BODY ejemplo/descripcion | b8695995-45e9-405d-b4aa-e50e8760fe25                         |
| Disponible desde              | 10.20                                                        |

Ejemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### es una canción como me gusta

Comprueba si la canción es querida.

| Encabezado de tabla           | Comprobar si la canción es identificada por musicBrainz trackId                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                     | `musicBrainz_trackID`                                                                           |
| POST BODY ejemplo/descripcion | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                 | `CIERTO` o `FALSO`                                                                              |
| Disponible desde              | 10.20                                                                                           |

Ejemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Esta llamada añade el atributo que le gusta del álbum identificado por musicbrainz release-id `1e0ee38-a9f6-49bf-84d0-45d0647799af`.

#### álbum de me gusta

Establecer el estado del álbum como verdadero.

| Encabezado de tabla           | Canción "Me Gusta" identificada por musicBrainz trackID   |
| ----------------------------- | --------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY                     | `musicBrainz_releaseID`                                   |
| POST BODY ejemplo/descripcion | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Disponible desde              | 10.20                                                     |

Ejemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### álbum no me gusta

Eliminar álbum como estado.

| Intención                     | No me gusta una canción identificada por musicBrainz releaseID |
| ----------------------------- | -------------------------------------------------------------- |
| URI                           | `<span class="s1">/api/like/</span>dislikealbum`   |
| POST BODY                     | `musicBrainz_releaseID`                                        |
| POST BODY ejemplo/descripcion | 1e0eee38-a9f6-49bf-84d0-45d0647799af                           |
| Disponible desde              | 10.20                                                          |

Ejemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Esta llamada eliminó el atributo liked del álbum identificado por musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### es un álbum que gusta

Comprobar álbum como estado.

| Intención                       | Check if album is liked identified by musicBrainz releaseID  |
| ------------------------------- | ------------------------------------------------------------ |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY                       | `musicBrainz_releaseID`                                      |
| POST BODY example / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY                   | "TRUE" or "FALSE"                                            |
| Disponible desde                | 10.20                                                        |

Ejemplo:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Esta llamada comprueba si el álbum identificado por musicaran ralease-id &lt;0&gt;1e0eee38-a9f6-49bf-84d0-45d0647799af le gusta.

### Rating

The rating API is responsible for rating songs. Rating information is saved in the internal database (cache enabled) and optionally in the file itself. If `audio_update_rating_tag = true` is set in UMS.conf the IDv3 rating field also being updated in the song file (if the songs file format is supported).

While browsing the content directory server, MusicBrainzTrackID (if available) and audiotrackID are delivered as `desc` metadata within the DIDL element.

#### set rating

| Intención                       | Set rating in stars (0 - 5) on a song identified by musicBrainz trackId                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Disponible desde                | 10.20                                                                                           |

Example:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets the user rating of all songs identified by the musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` to `3`.

#### get rating

Lee la calificación de canciones de la base de datos

| Intención                       | Get song rating in stars (0 - 5) by musicBrainz trackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`        |
| POST BODY                       | `musicbrainzTrackId`                                                                                    |
| POST BODY example / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                    |
| RESPONSE BODY example           | 3                                                                                                       |
| Disponible desde                | 10.20                                                                                                   |

Ejemplo:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Esta llamada lee la puntuación de una canción identificada por musicBrainz track.id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### set rating by audiotrack id

| Encabezado de tabla             | Set rating in stars (0 - 5) on a song identified by UMS internal audiotrackID                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                       | `trackID` /`stars`                                                                                             |
| POST BODY example / description | 32                                                                                                             |
| Disponible desde                | 11.0                                                                                                           |

Ejemplo:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

This call sets songs user rating identified by audiotrack id `32` to `3`.

#### get rating by audiotrack id

Lee la calificación de canciones de la base de datos

| Encabezado de tabla             | Get song rating in stars (0 - 5) by UMS internal audiotrackID. Response body contains the rating information. |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY                       | trackId                                                                                                       |
| POST BODY example / description | 32                                                                                                            |
| RESPONSE BODY example           | 3                                                                                                             |
| Disponible desde                | 11.0                                                                                                          |

Ejemplo:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

This call reads the user rating of a song identified by UMS audiotrack-id `32`.

### Respaldo / Restauración

User managed "liked album" entries can be backed up into a profile-directory subfolder named `database_backup`. The filename is `MUSIC_BRAINZ_RELEASE_LIKE`. In case UMS database gets deleted, just call restore.

#### backup liked albums

Backup table `MUSIC_BRAINZ_RELEASE_LIKE` to filesystem

|                 | backup liked songs to filesystem                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| URI             | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE    | GET                                                                                                   |
| RESPONSE BODY   | `OK` or error message                                                                                 |
| Available since | 10.20                                                                                                 |

Ejemplo:

```shell

```

This call will create a backup file containing liked albums.

#### restore liked albums

Restores table `MUSIC_BRAINZ_RELEASE_LIKE` from filesystem

| Encabezado de tabla | restore liked songs from backup file                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                 | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE        | GET                                                                                                                                        |
| RESPONSE BODY       | `OK` or error message                                                                                                                      |
| Available since     | 10.20                                                                                                                                      |

Ejemplo:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

This call restores the backup file.

### Lista de Reproducción

#### Activar servicio

Edit UMS.conf and configure a managed playlist folder by setting 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

for enabling this service. By default this service is disabled. The playlist folder path should be located beneath a configured shared `<span class="s1">folders</span>` path for playlist changed made by this API to be visible by UMS.

#### list all playlists

Read available playlists. These playlist names have to be used for subsequent calls to add or remove songs.

| Encabezado de tabla   | Delivers all supported (`m3u`, `m3u8` and `pls`) and available playlists from configured folder. Besides playlist name, the playlists `playlistId` is                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE          | GET                                                                                                                                                                             |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                                                    |
| RESPONSE BODY example | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Available since       | 11.0                                                                                                                                                                            |

Ejemplo:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

This call will list all available playlists.

#### list server accessible playlists

These are all playlist known to UMS (database/cache enabled). These playlist names have to be used for subsequent calls to add or remove songs. The playlist ID can be used to navigate directly to the playlist by browsing the `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Encabezado de tabla   | Ofrece todas las listas de reproducción compatibles y disponibles (`m3u`, `m3u8` y `pls`) desde la carpeta configurada.                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                   | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE          | GET                                                                                                                                                      |
| RESPONSE BODY         | JSON array of playlist names                                                                                                                             |
| RESPONSE BODY example | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Gráficos","playlistId":343}]`                                                                  |
| Available since       | dev branch                                                                                                                                               |

Ejemplo:

```shell

```

Esta llamada listará todas las listas de reproducción disponibles accesibles por UMS.

#### adding songs to playlists

The required `audiotrackid` is delivered during UPnP browse requests and can be extracted from the DIDL response attribute `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
    <ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
</ums-tags>
```

| Encabezado de tabla             | Añadir canción a la lista de reproducción                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                 | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
|                                 | POST                                                                                                                                                                              |
|                                 | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY ejemplo / descripción |                                                                                                                                                                                   |
|                                 | NADA                                                                                                                                                                              |
| Disponible desde                | 11.0                                                                                                                                                                              |

Ejemplo:

```shell

```

Esto añade la canción con el ID `123` a la lista de reproducción `Pop`.

#### Quitando canciones de las listas de reproducción

El `audiotrackid` requerido se entrega durante las solicitudes de navegación UPnP y se puede extraer del atributo de respuesta DIDL `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
    <ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
</ums-tags>
```

``

| Encabezado de tabla             | Eliminar canción de la lista de reproducción                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                 | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
|                                 | POST                                                                                                                                                                                   |
|                                 | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY ejemplo / descripción |                                                                                                                                                                                        |
|                                 | NADA                                                                                                                                                                                   |
| Disponible desde                | 11.0                                                                                                                                                                                   |

Ejemplo:

```shell

```

Esto elimina la canción con el ID `123` de la lista de reproducción `Pop`.

#### Crear una nueva lista de reproducción

El nombre de la lista de reproducción debe proporcionarse sin ninguna ruta y sin extensiones de archivo. 

| Encabezado de tabla             | Creando nuevas listas de reproducción en la carpeta de listas de reproducción gestionada                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                 | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
|                                 | POST                                                                                                                                                                           |
|                                 | ``                                                                                                                                                                             |
| POST BODY ejemplo / descripción | Contemporáneo                                                                                                                                                                  |
|                                 | NADA                                                                                                                                                                           |
| Disponible desde                | 11.0                                                                                                                                                                           |

Ejemplo:

```shell

```

Esta llamada crea un nuevo archivo de lista de reproducción llamado `Contemporary.m3u8` en la carpeta de lista de reproducción administrada.

## Ejemplo de código Java

Este fragmento de código muestra cómo usar la API con la biblioteca okhttp3.

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
        Request request = new Request.

    Builder().url(requestUrl).addHeader("api-key", apiKey).post(body).build();
        Call call = okClient.newCall(request);
        Response response = call.execute();
        return response.body().string();
    }
```

## Códigos de retorno HTTP

| 200 | OK | | 204 | éxito si no hay contenido que debe ser devuelto | | 401 | clave API inválida | | 404 | objeto solicitado no se puede encontrar | | 417 | solicitud API fallida | | 503 | API externo no está habilitado. Establece un `api_key` en UMS.conf con una longitud de 12 o más caracteres |
