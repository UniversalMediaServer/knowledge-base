# Externe API

Die externe API macht es möglich, auf UMS Funktionen mit einem HTTP-Aufruf zu Zugreifen.

## Wie die externe API aktiviert wird

Bearbeite die UMS.conf und erstelle einen api_key wie hier

`api_key = geheimes_Passwort`

Das _`Geheime_Passwort`_ muss mindestens 12 Zeichen haben.

## API-Nutzung

Wenn die externe API aktiviert ist, ist sie mit einem POST-Aufruf von /api/BEFEHL erreichbar

### Das Scannen von Ordnern

#### Neu durchsuchen

| Absicht                         | Liest die komplette Bibliothek neu ein.      |
| ------------------------------- | -------------------------------------------- |
| URI/URL                         | `/api/folderscanner/rescan`                  |
| POST BODY                       | KEINE                                        |
| POST BODY Beispiel/Beschreibung | Dieses Kommando erfordert keinen body Inhalt |
| Verfügbar seit                  | 10.4.2                                       |

:::info
Kann bei einer großen Bibliothek länger dauern
:::

Beispiel:

```shell
curl -w "%{http_code}\n" -H "api-key: geheimes_Passwort" http://localhost:5001/api/folderscanner/rescan
```

#### rescan file or folder

| Ziel                            | Liest einen Teilpfad des Dateisystems neu ein                                                                                                  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                         | ` 	/api/folderscanner/rescanFileOrFolder`                                                                                                      |
| POST BODY                       | PATH_TO_SCAN                                                                                                                                 |
| POST BODY Beispiel/Beschreibung | Beispiel/Beschreibung Beispiel: "/music/pop/Madonna" Der Pfad muss das Wurzelverzeichnis oder ein Unterordner eines freigegebenen Pfades sein. |
| Verfügbar seit Version:         | 10.4.2                                                                                                                                         |

Beispiel

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: geheimes_Passwort" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Musik gut finden

#### ein Lied gut finden

Das Lied wird als gemocht markiert

| Absicht                         | Kennzeichne ein Lied, dass Du magst, das durch eine musicBrainz Kennnummer identifiziert wird |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| URI/URL                         | `<span class="s1">/api/like/likesong</span>`                                      |
| POST BODY                       | `musicBrainz_trackID`                                                                         |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                          |
| Verfügbar seit Version:         | 10.20                                                                                         |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Lied nicht mögen

Das Lied wird nicht als unerwünscht gekennzeichnet

| Absicht                         | Kennzeichne ein Lied, dass Du NICHT magst, das durch eine musicBrainz Kennnummer identifiziert wird |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| URI/URL                         | `<span class="s1">/api/like/</span>dislikesong`                                         |
| POST BODY                       | `musicBrainz_trackID`                                                                               |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                |
| Verfügbar seit Version:         | 10.20                                                                                               |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### Magst Du das Lied

Prüfe, ob Du das Lied magst

| Absicht                         | Prüfe, ob das Lied  als ein Lied gekennzeichnet ist, dass Du magst, das durch eine musicBrainz Kennnummer identifiziert wird |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                         | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>`                              |
| POST BODY                       | `musicBrainz_trackID`                                                                                                        |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                         |
| RESPONSE BODY                   | TRUE oder FALSE                                                                                                              |
| Verfügbar seit Version:         | 10.20                                                                                                                        |

Besipiel

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Dieser Aufruf fügt das liked Attribut des Albums, welches durch eine musicbrainz release-id 1e0eee38-a9f6-49bf-84d0-45d0647799af identifiziert wird.

#### Album "Gefällt mir"

Setze Album auf "gefällt mir"

| Absicht                         | Kennzeichnet ein Album, das durch eine musicBrainz Kennnummer identifiziert wird, als ein Albu, das Du magst |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| URI/URL                         | `<span class="s1">/api/like/</span>likealbum`                                                    |
| POST BODY                       | `musicBrainz_releaseID`                                                                                      |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                                         |
| Verfügbar seit Version:         | 10.20                                                                                                        |

Beispiel

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Album gefällt mir nicht

Den "mögen" Status des Albums löschen

| Absicht                         | Kennzeichne ein Lied, dass Du NICHT magst, das durch eine musicBrainz Kennnummer identifiziert wird |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| URI/URL                         | `<span class="s1">/api/like/</span>dislikealbum`                                        |
| POST BODY                       | `musicBrainz_releaseID`                                                                             |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                                |
| Verfügbar seit Version:         | 10.20                                                                                               |

Beispiel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Dieser Aufruf hat das liked Attribut des Albums entfernt, welches durch eine musicbrainz release-id 1e0eee38-a9f6-49bf-84d0-45d0647799af identifiziert wird.

#### gefällt Dir das Album

Prüfe den like Status des Albums

| Absicht                         | Prüfe, ob das Album, das durch eine musicBrainz Kennnummer identifiziert wird  als ein Album gekennzeichnet ist, dass Du magst |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| URI/URL                         | `<span class="s1">/api/like/</span>isalbumliked`                                                                   |
| POST BODY                       | `musicBrainz_releaseID`                                                                                                        |
| POST BODY Beispiel/Beschreibung | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                                                           |
| RESPONSE BODY                   | TRUE" oder "FALSE"                                                                                                             |
| Verfügbar seit Version:         | 10.20                                                                                                                          |

Beispiel:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Dieser Aufruf prüft, ob für das Album, das mit der musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` identifiziert ist, das like Attribut gesetzt ist.

### Bewertung

Das Bewertungs-API sorgt für die Bewertung von Liedern. Bewertungsinformation wird in der internen Datenbank gespeichert (Zwischenspeicher aktiviert) und optional in der Datei selbst. Wenn `audio_update_rating_tag = true` in UMS.conf gesetzt ist, wird das IDv3-Bewertungsfeld auch in der Song-Datei aktualisiert (wenn das Song-Dateiformat unterstützt wird).

Beim Durchsuchen des Content-Verzeichnis-Servers werden MusicBrainzTrackID (falls verfügbar) und audiotrackID als `desc` Metadaten innerhalb des DIDL-Elements ausgegeben.

#### setze Bewertung

| Absicht                         | Setze Bewertung in Sternen (0 - 5) für ein Lied, das von musicBrainz trackId identifiziert wurde |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| URI/URL                         | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>`  |
| POST BODY                       | `musicbrainzTrackId` /`stars`                                                                    |
| POST BODY Beispiel/Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                           |
| Verfügbar seit Version:         | 10.20                                                                                            |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Dieser Aufruf legt die Benutzerbewertung aller Lieder fest, die mit der Musikbrainz-Track-ID ` b8695995-45e9-405d-b4aa-e50e8760fe25`identifiziert wurden, auf `3`.

#### lies die Bewertung

Liedbewertung aus Datenbank lesen

| Absicht                           | Die Liedbewertung in Sternen (0-5) nach musicBrainz trackID auslesen. Der Inhalt der Antwort enthält die Bewertungsinformationen. |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                           | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                  |
| POST BODY                         | `musicbrainzTrackId`                                                                                                              |
| POST BODY Beispiel / Beschreibung | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                              |
| RESPONSE BODY [ Inhalt] Beispiel  | 3                                                                                                                                 |
| Verfügbar seit Version:           | 10.20                                                                                                                             |

Beispiel:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Dieser Aufruf liest die Benutzer-Bewertung eines Liedes, das von der musicbrainz Track-ID `b8695995-45e9-405d-b4aa-e50e8760fe25` identifiziert wurde.

#### Setze Bewertung nach audiotrack id

| Absicht                           | Setze Bewertung in Sternen (0 - 5) für ein Lied, das durch eine UMS interne AudiotrackID identifiziert wurde   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI/URL                           | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                         | `trackID` /`stars`                                                                                             |
| POST BODY Beispiel / Beschreibung | 32                                                                                                             |
| Verfügbar seit Version:           | 11.0                                                                                                           |

Beispiel:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Dieser Aufruf legt die Benutzerbewertung eines Liedes fest, das mit der Audiospur-ID`32` bis `3` identifiziert wurde.

#### erhalte Bewertung nach Audiospur id

Liedbewertung aus Datenbank lesen

| Absicht                                  | Lies die Bewertung des Lieds in Sternen (0 - 5) gemäß UMS interner AudiotrackID. Der Inhalt der Antwort enthält die Bewertungsinformation. |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI/URL                                  | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                              |
| POST BODY [Sende den Inhalt der Anfrage] | trackId                                                                                                                                    |
| POST BODY Beispiel / Beschreibung        | 32                                                                                                                                         |
| RESPONSE BODY Beispiel                   | 3                                                                                                                                          |
| Verfügbar seit Version:                  | 11.0                                                                                                                                       |

Beispiel:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Dieser Aufruf liest die Benutzerbewertung eines Liedes, das durch die UMS Audiotrack-ID `32` identifiziert wurde.

### Backup / Wiederherstellung

Benutzerverwaltete "liked album"-Einträge können in einem Profilverzeichnis mit dem Namen `database_backup` gesichert werden. Der Dateiname ist `MUSIC_BRAINZ_RELEASE_LIKE`. Falls die UMS Datenbank gelöscht wird, rufen Sie einfach die Wiederherstellung auf.

#### favorisierte Alben sichern

Tabelle `MUSIC_BRAINZ_RELEASE_LIKE`  im Dateisystem sichern

| Absicht                        | Sichere favorisierte Lieder im Dateisystem                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| URI/URL                        | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE [Typ der Anfrage] | GET                                                                                                   |
| RESPONSE BODY                  | `OK` oder Fehlermeldung                                                                               |
| Verfügbar seit Version:        | 10.20                                                                                                 |

Beispiel:

```shell
curl -w "%{http_code}\n" -H "api-key: geheimes_Passwort"  -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Dieser Aufruf erzeugt eine Sicherungsdatei mit favorisierten Alben erstellen.

#### Favorisierte Alben wiederherstellen.

Stellt die Tabelle `MUSIC_BRAINZ_RELEASE_LIKE` aus dem Dateisystem wieder her.

| Absicht                        | favorisierte Lieder aus Backup-Datei wiederherstellen                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI/URL                        | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE [Typ der Anfrage] | GET                                                                                                                                        |
| RESPONSE BODY                  | `OK` oder Fehlermeldung                                                                                                                    |
| Verfügbar seit Version:        | 10.20                                                                                                                                      |

Beispiel:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Dieser Aufruf stellt die Sicherungsdatei wieder her.

### Wiedergabeliste

#### Dienst aktivieren

Bearbeiten Sie UMS.conf und konfigurieren Sie einen verwalteten Wiedergabelistenordner in den Einstellungen 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

um den Dienst zu aktivieren. Standardmäßig ist dieser Dienst deaktiviert. Der Pfad zum Wiedergabelistenordner sollte unter einem konfigurierten gemeinsamen `<span class="s1">Ordner</span>` Pfad für die durch diese API geänderte Wiedergabeliste für UMS sichtbar gemacht werden.

#### alle Playlisten auflisten

Verfügbare Wiedergabelisten lesen. Diese Playlist-Namen müssen für nachfolgende Anrufe verwendet werden, um Lieder hinzuzufügen oder zu entfernen.

| Absicht                        | Liefert alle unterstützten (`m3u`, `m3u8` und `pls`) und verfügbaren Wiedergabelisten aus dem konfiguriertem Ordner. Neben dem Playlist-Namen ist die Playlist `PlaylistId`     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                        | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE [Typ der Anfrage] | GET                                                                                                                                                                             |
| RESPONSE BODY                  | JSON-Array der Playlist-Namen                                                                                                                                                   |
| RESPONSE BODY Beispiel         | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Verfügbar seit Version:        | 11.0                                                                                                                                                                            |

Beispiel:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Dieser Anruf listet alle verfügbaren Wiedergabelisten auf.

#### zugängliche Wiedergabelisten des Servers auflisten

Dies sind alle UMS bekannten Wiedergabelisten (Datenbank/Cache aktiviert). Diese Playlist-Namen müssen für nachfolgende Anrufe verwendet werden, um Lieder hinzuzufügen oder zu entfernen. Die Playlist-ID kann benutzt werden, um direkt zur Wiedergabeliste zu navigieren, indem Sie die `objectId` `$DBID$PLAYLIST$` verkettet mit der databaseId durchsuchen.

| Absicht                          | Liefert alle unterstützten (`m3u`, `m3u8` und `pls`) und verfügbaren Wiedergabelisten aus dem konfigurierten Ordner                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                          | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE [Typ der Anfrage]   | GET                                                                                                                                                      |
| RESPONSE BODY                    | JSON-Array der Playlist-Namen                                                                                                                            |
| RESPONSE BODY [ Inhalt] Beispiel | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Verfügbar seit Version:          | Entwicklungszweig                                                                                                                                        |

Beispiel:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Dieser Anruf listet alle verfügbaren Wiedergabelisten auf, die für UMS zugänglich sind.

#### Lieder zur Wiedergabeliste hinzufügen

Die benötigte `audiotrackid` wird während UPnP Browse Requests ausgeliefert und kann aus dem DIDL Response-Attribut `descMetadata` extrahiert werden

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

| Absicht                                  | Titel zur Playlist hinzufügen                                                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE [Typ der Anfrage]           | POST                                                                                                                                                                              |
| POST BODY [Sende den Inhalt der Anfrage] | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY Beispiel / Beschreibung        | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                            | KEINE                                                                                                                                                                             |
| Verfügbar seit Version:                  | 11.0                                                                                                                                                                              |

Beispiel:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Dies fügt den Song mit der ID `123` zur Playlist `Pop` hinzu.

#### Titel von Wiedergabeliste entfernen

Die benötigte `audiotrackid` wird während UPnP Browse Requests ausgeliefert und kann aus dem DIDL Response-Attribut `descMetadata` extrahiert werden

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

| Absicht                                  | Titel von Wiedergabeliste entfernen                                                                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI/URL                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE [Typ der Anfrage]           | POST                                                                                                                                                                                   |
| POST BODY [Sende den Inhalt der Anfrage] | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY Beispiel / Beschreibung        | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                            | KEINE                                                                                                                                                                                  |
| Verfügbar seit Version:                  | 11.0                                                                                                                                                                                   |

Beispiel:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Dies entfernt den Song mit der ID `123` aus der Playlist `Pop`.

#### neue Wiedergabelisten erstellen

Der Name der Wiedergabeliste sollte ohne Pfad und ohne Dateiendungen angegeben werden. 

| Absicht                                  | Neue Wiedergabelisten im verwalteten Wiedergabelistenordner erstellen                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI/URL                                  | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE [Typ der Anfrage]           | POST                                                                                                                                                                           |
| POST BODY [Sende den Inhalt der Anfrage] | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY Beispiel / Beschreibung        | Zeitgenössisch                                                                                                                                                                 |
| RESPONSE BODY                            | KEINE                                                                                                                                                                          |
| Verfügbar seit Version:                  | 11.0                                                                                                                                                                           |

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

| 200 | OK | | 204 | Erfolg, wenn kein Inhalt zurückgegeben werden soll | | 401 | ungültiger api key | | 404 | angefordertes Objekt kann nicht gefunden werden | | 417 | API Anfrage fehlgeschlagen | | 503 | Externe api ist nicht aktiviert. Lege eine `api_key` in UMS.conf mit einer Länge von 12 oder mehr Zeichen fest |
