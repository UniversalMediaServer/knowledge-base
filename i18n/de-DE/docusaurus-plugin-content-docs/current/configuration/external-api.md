# Externe API

Die externe API ermöglicht es Programmen, mit einem HTTP-Aufruf auf UMS-Funktionen zuzugreifen oder sie zu starten.

## Wie die externe API aktiviert wird

Bearbeite die UMS.conf und erstelle einen api_key wie hier

`api_key = geheimes_Passwort`

Das _`Geheime_Passwort`_ muss mindestens 12 Zeichen haben.

## API-Nutzung

Wenn die externe API aktiviert ist, ist sie mit einem POST-Aufruf an /api/BEFEHL erreichbar

### Das Scannen von Ordnern

#### Neu durchsuchen

| Absicht                         | Liest die komplette Bibliothek neu ein.      |
| ------------------------------- | -------------------------------------------- |
| URI                             | `/api/folderscanner/rescan`                  |
| POST BODY                       | KEINER/KEINE/KEINS/NICHTS                    |
| POST BODY Beispiel/Beschreibung | Dieses Kommando erfordert keinen body-Inhalt |
| Verfügbar seit                  | 10.4.2                                       |

:::info
Kann bei einer großen Bibliothek länger dauern
:::

Beispiel:

```shell
curl -w "%{http_code}\n" -H "api-key: geheimes_Passwort" http://localhost:5001/api/folderscanner/rescan
```

#### Datei oder Ordner neu einlesen

| Zweck/Absicht                   | Liest einen Teilpfad des Dateisystems neu ein                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| URI                             | ` 	/api/folderscanner/rescanFileOrFolder`                                                                                |
| POST BODY                       | PATH_TO_SCAN                                                                                                           |
| POST BODY Beispiel/Beschreibung | Beispiel: "/music/pop/Madonna" Der Pfad muss das Wurzelverzeichnis oder ein Unterordner eines freigegebenen Pfades sein. |
| Verfügbar seit                  | 10.4.2                                                                                                                   |

Beispiel:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: geheimes_Passwort" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Musik positiv bewerten (Albums und Lieder/Stücke)

#### Ein Lied gut finden

Das Lied wird als positiv bewertet markiert

| Absicht/Zweck                   | Ein Lied mit einer musicBrainz Track-ID gekennzeichnet ist, positiv bewerten |
| ------------------------------- | ---------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/likesong</span>`                     |
| POST BODY                       | `musicBrainz_trackID`                                                        |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                         |
| Verfügbar seit                  | 10.20                                                                        |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Lied negativ bewerten

Das Lied wird nicht negativ bewertet

| Absicht/Zweck                   | Ein Lied, das mit einer musicBrainz Track-ID gekennzeichnet ist, negativ bewerten |
| ------------------------------- | --------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikesong`                       |
| POST BODY                       | `musicBrainz_trackID`                                                             |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                              |
| Verfügbar seit                  | 10.20                                                                             |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### Ist das Lied positiv bewertet

Prüfe, ob das Lied positiv bewertet ist

| Absicht/Zweck                   | Prüfe, ob das Lied mit der musicBrainz Track-ID positiv bewertet ist                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                       | `musicBrainz_trackID`                                                                           |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                   | TRUE oder FALSE                                                                                 |
| Verfügbar seit                  | 10.20                                                                                           |

Besipiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Dieser Aufruf fügt das "Liked"-Attribut des Albums mit der musicbrainz release-id 1e0eee38-a9f6-49bf-84d0-45d0647799af hinzu.

#### Album positiv bewerten

Setze Album-Bewertungsstatus auf "gefällt mir".

| Absicht/Zweck                   | Bewertet ein Album mit einer musicBrainz-releaseID positiv. |
| ------------------------------- | ----------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>likealbum`   |
| POST BODY                       | `musicBrainz_releaseID`                                     |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                        |
| Verfügbar seit                  | 10.20                                                       |

Beispiel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Album negativ bewerten

Den "Gefällt mir"-Status des Albums löschen.

| Absicht/Zweck                   | Ein Lied mit einer bestimmten musicBrainz releaseID negativ bewerten |
| ------------------------------- | -------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>dislikealbum`         |
| POST BODY                       | `musicBrainz_releaseID`                                              |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                 |
| Verfügbar seit                  | 10.20                                                                |

Beispiel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Dieser Aufruf hat das liked-Attribut des Albums mit der musicBrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af ` entfernt.

#### Ist das Album positiv bewertet

Prüfe den like-Status des Albums

| Absicht/Zweck                   | Prüfe, ob das Album mit einer bestimmten musicBrainz releaseID positiv bewertet ist |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/like/</span>isalbumliked`                        |
| POST BODY                       | `musicBrainz_releaseID`                                                             |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                |
| RESPONSE BODY                   | TRUE" oder "FALSE"                                                                  |
| Verfügbar seit Version:         | 10.20                                                                               |

Beispiel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Dieser Aufruf prüft, ob für das Album mit der musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` das "like"-Attribut gesetzt ist.

### Bewertung

Das Bewertungs-API ist für die Bewertung von Liedern verantwortlich. Die Bewertungsinformation wird in der internen Datenbank gespeichert (Zwischenspeicher aktiviert) und wahlweise in der Datei selbst. Wenn `audio_update_rating_tag = true` in UMS.conf gesetzt ist, wird das IDv3-Bewertungsfeld auch in der Lied-Datei aktualisiert (wenn das Dateiformat des Liedes unterstützt wird).

Beim Durchsuchen des Content-Verzeichnis-Servers werden MusicBrainzTrackID (falls verfügbar) und audiotrackID als `desc`-Metadaten innerhalb des DIDL-Elements ausgegeben.

#### Setze Bewertung

| Absicht/Zweck                   | Setze Bewertung in Sternen (0 - 5) für ein Lied mit einer bestimmten musicBrainz trackId        |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                             | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Verfügbar seit                  | 10.20                                                                                           |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Dieser Aufruf setzt die Nutzerbewertung aller Lieder mit der Musikbrainz-Track-ID ` b8695995-45e9-405d-b4aa-e50e8760fe25` auf `3`.

#### Hole die Bewertung

Liest die Liedbewertung aus der Datenbank

| Absicht/Zweck                     | Die Liedbewertung in Sternen (0-5) nach musicBrainz trackID auslesen. Der Antworttext enthält die Bewertungsinformationen. |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| URI                               | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                           |
| POST BODY                         | `musicbrainzTrackId`                                                                                                       |
| POST BODY Beispiel / Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                       |
| RESPONSE BODY Beispiel            | 3                                                                                                                          |
| Verfügbar seit                    | 10.20                                                                                                                      |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Dieser Aufruf liest die Nutzer-Bewertung eines Liedes mit der musicbrainz Track-ID `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### Setze Bewertung nach audiotrack id

| Absicht/Zweck                     | Setze Bewertung in Sternen (0 - 5) für ein Lied mit einer UMS-internen AudiotrackID                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                               | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                         | `trackID` /`stars`                                                                                             |
| POST BODY Beispiel / Beschreibung | 32                                                                                                             |
| Verfügbar seit                    | 11.0                                                                                                           |

Beispiel:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Dieser Aufruf legt die Nutzerbewertung eines Liedes mit der Audiospur-ID`32` bis `3` fest.

#### Hole Bewertung nach Audiospur id

Lies die Liedbewertung aus der Datenbank

| Absicht/Zweck                     | Hole die Liedbewertung in Sternen (0 - 5) nach UMS-interner AudiotrackID. Der Text der Antwort enthält die Bewertungsinformation. |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| URI                               | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                     |
| POST BODY                         | trackId                                                                                                                           |
| POST BODY Beispiel / Beschreibung | 32                                                                                                                                |
| RESPONSE BODY Beispiel            | 3                                                                                                                                 |
| Verfügbar seit                    | 11.0                                                                                                                              |

Beispiel:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Dieser Aufruf liest die Nutzerbewertung eines Liedes mit der UMS-Audiotrack-ID `32` aus.

### Backup / Wiederherstellung

Benutzerverwaltete "liked album"-Einträge können in einem Unterordner des Profilverzeichnisses mit dem Namen `database_backup` gespeichert werden. Der Dateiname ist `MUSIC_BRAINZ_RELEASE_LIKE`. Falls die UMS-Datenbank gelöscht wird, rufen Sie einfach die Wiederherstellung auf.

#### Positiv bewertete Alben sichern

Tabelle `MUSIC_BRAINZ_RELEASE_LIKE`  im Dateisystem sichern

| Absicht/Zweck  | Sichere positiv bewertete Lieder ins Dateisystem                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| URI            | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE   | GET                                                                                                   |
| RESPONSE BODY  | `OK` oder Fehlermeldung                                                                               |
| Verfügbar seit | 10.20                                                                                                 |

Beispiel:

```shell
curl -w "%{http_code}\n" -H "api-key: geheimes_Passwort"  -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Dieser Aufruf erzeugt eine Sicherungsdatei mit positiv bewerteten Alben.

#### Positiv bewertete Alben wiederherstellen

Stellt die Tabelle `MUSIC_BRAINZ_RELEASE_LIKE` aus dem Dateisystem wieder her.

| Absicht/Zweck  | Positiv bewertete Lieder aus Backup-Datei wiederherstellen                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI            | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE   | GET                                                                                                                                        |
| RESPONSE BODY  | `OK` oder Fehlermeldung                                                                                                                    |
| Verfügbar seit | 10.20                                                                                                                                      |

Beispiel:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Dieser Aufruf stellt die Sicherungsdatei wieder her.

### Wiedergabeliste

#### Dienst aktivieren

Bearbeiten Sie UMS.conf und konfigurieren Sie einen verwalteten Wiedergabelistenordner, indem Sie setzen 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

um diesen Dienst zu aktivieren. Standardmäßig ist dieser Dienst deaktiviert. Der Pfad zum Wiedergabelistenordner sollte unterhalb eines konfigurierten freigegebenen `<span class="s1">Ordner</span>`-Pfades sein, damit durch dieses API vorgenommene Änderungen für UMS sichtbar sind.

#### Alle Playlisten auflisten

Verfügbare Wiedergabelisten auslesen. Diese Playlist-Namen müssen für nachfolgende Anrufe verwendet werden, um Lieder hinzuzufügen oder zu entfernen.

| Absicht/Zweck          | Liefert alle unterstützten (`m3u`, `m3u8` und `pls`) und verfügbaren Wiedergabelisten aus dem konfigurierten Ordner. Ausser dem Playlist-Namen lautet die Playlist `PlaylistId` |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                    | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE           | GET                                                                                                                                                                             |
| RESPONSE BODY          | JSON-Array der Playlist-Namen                                                                                                                                                   |
| RESPONSE BODY Beispiel | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Verfügbar seit         | 11.0                                                                                                                                                                            |

Beispiel:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Dieser Anruf listet alle verfügbaren Wiedergabelisten auf.

#### Für den Server zugängliche Wiedergabelisten auflisten

Dies sind alle UMS bekannten Wiedergabelisten (Datenbank/Cache aktiviert). Diese Wiedergabelisten-Namen müssen für nachfolgende Anrufe verwendet werden, um Lieder hinzuzufügen oder zu entfernen. Die Playlist-ID kann benutzt werden, um direkt zur Wiedergabeliste zu navigieren, indem Sie die `objectId` `$DBID$PLAYLIST$` in Verbindung mit der databaseId durchsuchen.

| Absicht/Zweck                  | Liefert alle unterstützten (`m3u`, `m3u8` und `pls`) und verfügbaren Wiedergabelisten aus dem konfigurierten Ordner                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                            | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE [Typ der Anfrage] | GET                                                                                                                                                      |
| RESPONSE BODY                  | JSON-Array der Wiedergabelisten-Namen                                                                                                                    |
| RESPONSE BODY [Beispiel        | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Verfügbar seit Version:        | Entwicklungszweig                                                                                                                                        |

Beispiel:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Dieser Aufruf listet alle verfügbaren Wiedergabelisten auf, die für UMS zugänglich sind.

#### Lieder werden zur Wiedergabeliste hinzugefügt

Die benötigte `audiotrackid` wird während der UPnP Browse Requests ausgeliefert und kann aus dem DIDL Response-Attribut `descMetadata` extrahiert werden

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

| Absicht/Zweck                     | Titel zur Wiedergabeliste hinzufügen                                                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE                      | POST                                                                                                                                                                              |
| POST BODY                         | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY Beispiel / Beschreibung | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                     | KEINER/KEINE/KEINS/NICHTS                                                                                                                                                         |
| Verfügbar seit                    | 11.0                                                                                                                                                                              |

Beispiel:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Dies fügt den Song mit der ID `123` zur Wiedergabeliste `Pop` hinzu.

#### Titel werden von Wiedergabeliste entfernt

Die benötigte `audiotrackid` wird während der UPnP Browse Requests ausgeliefert und kann aus dem DIDL Response-Attribut `descMetadata` extrahiert werden

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

| Absicht/Zweck                     | Titel von Wiedergabeliste entfernen                                                                                                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE                      | POST                                                                                                                                                                                   |
| POST BODY                         | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY Beispiel / Beschreibung | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                     | KEINER/KEINE/KEINS/NICHTS                                                                                                                                                              |
| Verfügbar seit                    | 11.0                                                                                                                                                                                   |

Beispiel:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Dies entfernt den Song mit der ID `123` aus der Wiedergabeliste `Pop`.

#### Neue Wiedergabelisten erstellen

Der Name der Wiedergabeliste sollte ohne Pfad und ohne Dateiendungen angegeben werden. 

| Absicht/Zweck                     | Neue Wiedergabelisten werden im verwalteten Wiedergabelistenordner erstellt                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE                      | POST                                                                                                                                                                           |
| POST BODY                         | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY Beispiel / Beschreibung | Zeitgenössisch                                                                                                                                                                 |
| RESPONSE BODY                     | KEINER/KEINE/KEINS/NICHTS                                                                                                                                                      |
| Verfügbar seit                    | 11.0                                                                                                                                                                           |

Beispiel:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Dieser Aufruf erzeugt eine neue Wiedergabeliste mit dem Namen `Contemporary.m3u8` im verwalteten Wiedergabelistenordner.

## Java-Code-Beispiel

Dieser Code-Ausschnitt zeigt, wie man die API mit der okhttp3-Bibliothek benutzt.

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

## HTTP Statuscodes

| 200 | OK | | 204 | Erfolg, wenn kein Inhalt zurückgegeben werden soll | | 401 | ungültiger api key | | 404 | angefordertes Objekt kann nicht gefunden werden | | 417 | API Anfrage fehlgeschlagen | | 503 | Externe api ist nicht aktiviert. Lege einen `api_key` in UMS.conf mit einer Länge von 12 oder mehr Zeichen fest |
