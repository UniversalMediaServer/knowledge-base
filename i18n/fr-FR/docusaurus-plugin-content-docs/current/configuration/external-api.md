# API externe

L'API externe permet aux programmes tiers d'accéder ou de déclencher des fonctionnalités UMS avec un appel HTTP.

## Comment activer l'API externe

Modifiez UMS.conf et configurez une api_key comme ceci

`api_key = secret_password`

Le _`secret_password`_ doit avoir un minimum de 12 caractères.

## Utilisation de l'API

Si l'API externe est activée, elle sera accessible via un appel POST sur /api/COMMAND

### Analyse des dossiers

#### rescan

| Intention                       | Ré-analyse complète de la bibliothèque                               |
| ------------------------------- | -------------------------------------------------------------------- |
| URI                             | `/api/folderscanner/rescan`                                          |
| POST BODY                       |                                                                      |
| POST BODY example / description | Cette commande ne requiert aucun contenu dans le corps de la requête |
| Disponible depuis               | 10.4.2                                                               |

:::info
Cela peut être lent pour les grandes bibliothèques
:::

Exemple :

```shell

```

#### réanalyser le fichier ou le dossier

|                   | Ré-analyse partielle du système de fichiers                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
|                   | ``                                                                                                   |
|                   |                                                                                                      |
|                   | exemple: "/music/pop/Madonna". Le chemin doit être la racine ou un sous-dossier d'un chemin partagé. |
| Disponible depuis | 10.4.2                                                                                               |

Exemple :

```shell

```

### J'aime la musique (albums et chansons)

#### Aimer la chanson

La chanson sera marquée comme aimée.

| Intention                            | Comme une chanson identifiée par musicBrainz trackId     |
| ------------------------------------ | -------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/likesong</span>` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                    |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| Disponible depuis                    | 10.20                                                    |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Je n'aime pas la chanson

La chanson sera appréciée

| Intention                            | Ne pas aimer une chanson identifiée par musicBrainz trackId |
| ------------------------------------ | ----------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>dislikesong` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                       |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| Disponible depuis                    | 10.20                                                       |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### est une chanson aimée

Vérifier si la chanson est aimée.

| Intention                            | Vérifier si la chanson est aimée identifier par musicBrainz trackId                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POSTER LE CODE                       | `musicBrainz_trackID`                                                                           |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| CORPS DE RÉPONSE                     | `Vrai` ou `Faux`                                                                                |
| Disponible depuis                    | 10.20                                                                                           |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Cet appel ajoute l'attribut aimé de l'album identifié par musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Aimez cet album

Définissez l’état de l’album sur Vrai.

| Intention                            | Aime un album identifié par musicBrainz releaseID         |
| ------------------------------------ | --------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>likealbum` |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                   |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| Disponible depuis                    | 10.20                                                     |

Exemple :

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Je n'aime pas l'album

Supprimer l'état de l'album.

| Intention                            | Je n'aime pas une chanson identifiée par musicBrainz releaseID |
| ------------------------------------ | -------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>dislikealbum`   |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                        |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                           |
| Disponible depuis                    | 10.20                                                          |

Exemple :

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Cet appel a supprimé l'attribut aimé de l'album identifié par musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### est un album aimé

Vérifier l'état de l'album.

| Intention                            | Vérifier si l'album est aimé identifié par musicBrainz releaseID |
| ------------------------------------ | ---------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/like/</span>isalbumliked`     |
| POSTER LE CODE                       | `musicBrainz_releaseID`                                          |
| POSTER LE CODE exemple / description | 1e0eee38-a9f6-49bf-84d0-45d0647799af                             |
| CORPS DE RÉPONSE                     | "Vrai" ou "Faux"                                                 |
| Disponible depuis                    | 10.20                                                            |

Exemple :

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Cet appel vérifie si l'album identifié par musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` est souhaité.

### Note

L'API d'évaluation est responsable de l'évaluation des chansons. Les informations de notation sont enregistrées dans la base de données interne (cache activé) et éventuellement dans le fichier lui-même. Si `audio_update_rating_tag = true` est défini dans UMS.conf, le champ de notation IDv3 est également mis à jour dans le fichier de chanson (si le format de fichier de chansons est pris en charge).

#### définir l'évaluation

| Intention                            | Définir la note en étoiles (0 - 5) sur une chanson identifiée par musicBrainz trackId           |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POSTER LE CODE                       | `musicbrainzTrackId` /`stars`                                                                   |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Disponible depuis                    | 10.20                                                                                           |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Cet appel définit l'évaluation utilisateur de toutes les chansons identifiées par le track-id musicbrainz `b8695995-45e9-405d-b4aa-e50e8760fe25` à `3`.

#### définir l'évaluation

Lit l'évaluation de la chanson depuis la base de données

| Intention                            | Obtenez la note de la chanson en étoiles (0 - 5) par musicBrainz trackID. Le corps de la réponse contient les informations de classement. |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                          |
| POSTER LE CODE                       | `musicbrainzTrackId`                                                                                                                      |
| POSTER LE CODE exemple / description | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                      |
| Exemple du corps de la réponse       | 3                                                                                                                                         |
| Disponible depuis                    | 10.20                                                                                                                                     |

Exemple :

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Cet appel lit la note utilisateur d'une chanson identifiée par le track-id musicbrainz `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### définir l'évaluation par l'id de la piste audio

| Intention                            | Définir la note en étoiles (0 - 5) sur une chanson identifiée par musicBrainz trackId                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POSTER LE CODE                       | `trackID` /`stars`                                                                                             |
| POSTER LE CODE exemple / description | 32                                                                                                             |
| Disponible depuis                    | 11.0                                                                                                           |

Exemple :

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Cet appel définit l'évaluation des chansons identifiées par l'id de la piste audio`32` à `3`.

#### définir l'évaluation par l'id de la piste audio

Lit l'évaluation de la chanson depuis la base de données

| Intention                            | Obtenez la note de la chanson en étoiles (0 - 5) par musicBrainz trackID. Le corps de la réponse contient les informations de classement. |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                             |
| POSTER LE CODE                       | trackId                                                                                                                                   |
| POSTER LE CODE exemple / description | 32                                                                                                                                        |
| Exemple du corps de la réponse       | 3                                                                                                                                         |
| Disponible depuis                    | 11.0                                                                                                                                      |

Exemple :

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

### Sauvegarde et restauration

Les entrées "album aimé" gérées par l'utilisateur peuvent être sauvegardées dans un sous-répertoire de profil nommé `database_backup`. Le nom du fichier est `MUSIC_BRAINZ_RELEASE_LIKE`. Dans le cas où la base de données UMS serait supprimée, il suffit de la restaurer.

#### sauvegarder les albums aimés

Sauvegarde de la table `MUSIC_BRAINZ_RELEASE_LIKE` vers le système de fichiers

| Intention         | sauvegarder les chansons favorites vers le système de fichiers                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| TYPE DE DEMANDE   | GET                                                                                                   |
| CORPS DE RÉPONSE  | `OK` ou message d'erreur                                                                              |
| Disponible depuis | 10.20                                                                                                 |

Exemple :

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Cet appel va créer un fichier de sauvegarde contenant les albums aimés.

#### Restaurer les albums favoris

Sauvegarde de la table `MUSIC_BRAINZ_RELEASE_LIKE` vers le système de fichiers

| Intention         | restaurer les chansons favorites à partir du fichier de sauvegarde                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| TYPE DE DEMANDE   | GET                                                                                                                                        |
| CORPS DE RÉPONSE  | `OK` ou message d'erreur                                                                                                                   |
| Disponible depuis | 10.20                                                                                                                                      |

Exemple :

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Cet appel restaure le fichier de sauvegarde.

### Liste de lecture

#### Activez le service

Editer UMS.conf et configurer un dossier de playlist géré par paramètre 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

pour activer ce service. Par défaut, ce service est désactivé. Le chemin du dossier de la liste de lecture doit être situé sous un dossier `<span class="s1">configuré <span class="s1"> dossier</span>` pour la liste de lecture modifiée par cette API pour être visible par UMS.

#### lister toutes les playlists

Lire les playlists disponibles. Ces noms de playlist doivent être utilisés pour les appels suivants pour ajouter ou supprimer des morceaux.

| Intention                      | Fournit toutes les listes de lecture prises en charge (`m3u`, `m3u8` et `pls`) et disponibles à partir du dossier configuré. Outre le nom de la playlist, les playlists `playlistId` sont |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                            | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>`           |
| TYPE DE DEMANDE                | GET                                                                                                                                                                                       |
| CORPS DE RÉPONSE               | Tableau JSON des noms de playlist                                                                                                                                                         |
| Exemple du corps de la réponse | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                            |
| Disponible depuis              | 11.0                                                                                                                                                                                      |

Exemple :

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Cet appel listera toutes les playlists disponibles.

#### listes de lecture accessibles par le serveur

Il s'agit de toutes les listes de lecture connues de UMS (base de données/cache activé). Ces noms de playlist doivent être utilisés pour les appels suivants pour ajouter ou supprimer des morceaux. L'ID de la playlist peut être utilisé pour naviguer directement vers la playlist en naviguant sur `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Intention                      | Fournit toutes les listes de lecture prises en charge (`m3u`, `m3u8` et `pls`) et disponibles à partir du dossier configuré.                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                            | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| TYPE DE DEMANDE                | GET                                                                                                                                                      |
| CORPS DE RÉPONSE               | Tableau JSON des noms de playlist                                                                                                                        |
| Exemple du corps de la réponse | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Disponible depuis              | branche de développement                                                                                                                                 |

Exemple :

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Cet appel liste toutes les playlists disponibles accessibles par UMS.

#### ajouter des chansons aux listes de lecture

L'information requise  `audiotrackid`  est délivré lors des demandes de navigation UPnP et peut être extrait de l'attribut de la réponse DIDL `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Intention                            | Ajouter un morceau à la liste de lecture                                                                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| TYPE DE DEMANDE                      | POST                                                                                                                                                                              |
| POSTER LE CODE                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POSTER LE CODE exemple / description | 123/Pop                                                                                                                                                                           |
| CORPS DE LA RÉPONSE                  | AUCUN                                                                                                                                                                             |
| Disponible depuis                    | 11.0                                                                                                                                                                              |

Exemple :

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Cela ajoute la chanson portant l'ID `123` à la playlist `Pop`.

#### Retirer les titres de la liste de lecture

L'information requise  `audiotrackid`  est délivré lors des demandes de navigation UPnP et peut être extrait de l'attribut de la réponse DIDL `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Intention                            | Retirer le titre de la liste de lecture                                                                                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| TYPE DE DEMANDE                      | POST                                                                                                                                                                                   |
| POSTER LE CODE                       | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POSTER LE CODE exemple / description | 123/Pop                                                                                                                                                                                |
| CORPS DE LA RÉPONSE                  | AUCUN                                                                                                                                                                                  |
| Disponible depuis                    | 11.0                                                                                                                                                                                   |

Exemple :

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Cela supprime la chanson avec l'ID `123` de la playlist `Pop`.

#### Créer une nouvelle liste de lecture

Le nom de la playlist doit être fourni sans chemin et sans extension de fichier. 

| Intention                            | Création de nouvelles playlists dans le dossier de playlist gérée                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| TYPE DE DEMANDE                      | POST                                                                                                                                                                           |
| POSTER LE CODE                       | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POSTER LE CODE exemple / description | Contemporain                                                                                                                                                                   |
| CORPS DE RÉPONSE                     | AUCUN                                                                                                                                                                          |
| Disponible depuis                    | 11.0                                                                                                                                                                           |

Exemple :

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Cet appel crée un nouveau fichier de playlist nommé `Contemporary.m3u8` dans le dossier de playlist géré.

## Exemple de code Java

Cet extrait de code montre comment utiliser l'API avec la bibliothèque okhttp3.

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

## Code retour HTTP

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Définir une `clé_api` dans UMS.conf avec une longueur de 12 caractères ou plus |
