# Externe API

Met de externe API kunnen programma's toegang krijgen tot UMS-functies met een HTTP-oproep.

## Hoe de externe API in te schakelen

Bewerk UMS.conf en configureer een api_key zoals deze

`api_key = secret_password`

De _`secret_password`_ moet tenminste 12 tekens hebben.

## API gebruik

Als de externe API is ingeschakeld, is de API toegankelijk met een POST oproep naar /api/COMMAND

### Map scannen

#### herscannen

| Bedoeling                          | Herscan de volledige bibliotheek      |
| ---------------------------------- | ------------------------------------- |
| URI                                | `/api/folderscanner/rescan`           |
| POST BODY                          | GEEN                                  |
| POST BODY voorbeeld / beschrijving | Deze opdracht heeft geen inhoud nodig |
| Beschikbaar sinds                  | 10.4.2                                |

:::info
Dit kan traag zijn voor grote bibliotheken
:::

Voorbeeld:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### Bestand of map opnieuw scannen

| Bedoeling                          | Herscant een gedeeltelijke subgedeelte van het bestandssysteem.                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------- |
| URI                                | `/api/folderscanner/rescanFileOrFolder`                                                     |
| POST BODY                          | PAD-OMTE-SCANNEN                                                                            |
| POST BODY voorbeeld / beschrijving | Voorbeeld: "/music/pop/Madonna". Pad moet een hoofdmap of submap van een gedeelde pad zijn. |
| Beschikbaar sinds                  | 10.4.2                                                                                      |

Voorbeeld:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: geheim_wachtwoord" -X POST http://localhost:5001/api/mapscanner/herscanbestandof map
```

### Muziek leuk vinden (albums en liedjes)

#### Nummer leuk vinden

Nummer wordt gemarkeerd als vind-ik-leuk.

| Bedoeling                          | Lied leuk vinden geïdentificeerd door musicBrainz trackId |
| ---------------------------------- | --------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/likesong</span>`  |
| POST BODY                          | `musicBrainz_trackID`                                     |
| POST BODY voorbeeld / beschrijving | b8695995-45e9-405d-b4aa-e50e8760fe25                      |
| Beschikbaar sinds                  | 10.20                                                     |

Voorbeeld:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Nummer niet-leuk-vinden

Nummer wordt niet, niet-leuk bevonden

| Bedoeling                          | Nummer niet-leuk-vinden geïdentificeerd door musicBrainz trackId |
| ---------------------------------- | ---------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/</span>dislikesong`      |
| POST BODY                          | `musicBrainz_trackID`                                            |
| POST BODY voorbeeld / beschrijving | b8695995-45e9-405d-b4aa-e50e8760fe25                             |
| Beschikbaar sinds                  | 10.20                                                            |

Voorbeeld:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### Is nummer leuk bevonden

Controleer of nummer leuk bevonden is

| Bedoeling                          | Controleer of nummer leuk bevonden is geïdentificeerd door musicBrainz trackId                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY                          | `musicBrainz_trackID`                                                                           |
| POST BODY voorbeeld / beschrijving | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY                      | `TRUE` or `FALSE`                                                                               |
| Beschikbaar sinds                  | 10.20                                                                                           |

Voorbeeld:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Deze oproep voegt het vind-ik-leuk attribuut toe van het album dat geïdentificeerd is door musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`

#### Album leuk vinden

Zet album vind-ik-leuk status op waar

| Bedoeling                          | Album leuk vinden dat wordt geïdentificeerd door musicBrainz releaseID |
| ---------------------------------- | ---------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/</span>likealbum`              |
| POST BODY                          | `musicBrainz_releaseID`                                                |
| POST BODY voorbeeld / beschrijving | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                   |
| Beschikbaar sinds                  | 10.20                                                                  |

Voorbeeld:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Album niet-leuk-vinden

Album vind-ik-leuk status verwijderen

| Bedoeling                          | Nummer niet-leuk-vinden geïdentificeerd door musicBrainz trackId |
| ---------------------------------- | ---------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/</span>dislikealbum`     |
| POST BODY                          | `musicBrainz_releaseID`                                          |
| POST BODY voorbeeld / beschrijving | 1e0eee38-a9f6-49bf-84d0-45d0647799af                             |
| Beschikbaar sinds                  | 10.20                                                            |

Voorbeeld:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Deze oproep heeft het vind-ik-leuk attribuut van het album verwijderd geïdentificeerd door musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`.

#### Is album leuk bevonden

Controleer album vind-ik-leuk status

| Bedoeling                          | Controleer of album is leuk bevonden is geïdentificeerd door musicBrainz releaseID |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/like/</span>isalbumliked`                       |
| POST BODY                          | `musicBrainz_releaseID`                                                            |
| POST BODY voorbeeld / beschrijving | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                               |
| RESPONSE BODY                      | "TRUE" or "FALSE"                                                                  |
| Beschikbaar sinds                  | 10.20                                                                              |

Voorbeeld:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Deze oproep controleert of het door musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` leuk bevonden is.

### Waardering

De API voor waardering is verantwoordelijk voor het beoordelen van nummers. Waarderingsinformatie wordt opgeslagen in de interne database (cache ingeschakeld) en optioneel in het bestand zelf. Als`audio_update_rating_tag = true` is ingesteld in UMS. onf het IDv3 beoordelingsveld wordt ook bijgewerkt in het nummer bestand (als de bestandsindeling van het nummer wordt ondersteund).

Tijdens het browsen op de contentmap server, MusicBrainzTrackID (indien beschikbaar) en audiotrackID worden geleverd als `desc` metadata binnen het DIDL-element.

#### Kies waardering

| Bedoeling                          | Stel de waardering in met sterren (0 - 5) op een nummer geïdentificeerd door musicBrainz trackId |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| URI                                | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>`  |
| POST BODY                          | `musicbrainzTrackId` /`stars`                                                                    |
| POST BODY voorbeeld / beschrijving | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                           |
| Beschikbaar sinds                  | 10.20                                                                                            |

Voorbeeld:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Deze oproep bepaalt de gebruikersbeoordeling van alle nummers geïdentificeerd door de musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` naar `3`.

#### Krijg waardering

Leest nummerwaardering uit de database

| Bedoeling                          | Krijg nummerwaardering in sterren (0 - 5) door musicBrainz trackID. Response body bevat het waarderingsinformatie |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                  |
| POST BODY                          | `musicbrainzTrackId`                                                                                              |
| POST BODY voorbeeld / beschrijving | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                              |
| RESPONSE BODY voorbeeld            | 3                                                                                                                 |
| Beschikbaar sinds                  | 10.20                                                                                                             |

Voorbeeld:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Deze oproep leest de gebruikerswaardering van een nummer geïdentificeerd door de musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### Kies waardering door audiotrack id

| Bedoeling                          | Stel de waardering in met sterren (0 - 5) op een nummer geïdentificeerd door UMS interne audiotrackID          |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY                          | `trackID` /`stars`                                                                                             |
| POST BODY voorbeeld / beschrijving | 32                                                                                                             |
| Beschikbaar sinds                  | 11.0                                                                                                           |

Voorbeeld:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Deze oproep waardeert de nummergebruikerswaardering geïdentificeerd door audiotrack id `32` to `3`.

#### Kies waardering door audiotrack id

Leest nummerwaardering uit de database

| Bedoeling                          | Krijg het nummerwaardering in sterren (0 - 5) door UMS internal audiotrackID. Response body bevat het waarderingsinformatie |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`               |
| POST BODY                          | track-ID                                                                                                                    |
| POST BODY voorbeeld / beschrijving | 32                                                                                                                          |
| RESPONSE BODY voorbeeld            | 3                                                                                                                           |
| Beschikbaar sinds                  | 11.0                                                                                                                        |

Voorbeeld:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Deze oproep leest de gebruikerswaardering van een liedje dat geïdentificeerd is door UMS audiotrack-id `32`.

### Back-up / Herstel

Gebruiker beheerde "vind-ik-leuk album" items kunnen worden gebackupt in een profiel-map submap genaamd `database_backup`. De bestandsnaam is `MUSIC_BRAINZ_RELEASE_LIKE`. In het geval dat de UMS-database wordt verwijderd, herstel de oproep.

#### Back-up vind-ik-leuk albums

Back-up tabel `MUSIC_BRAINZ_RELEASE_LIKE` naar bestandssysteem

| Bedoeling         | Back-up leuk gevonden liedjes naar het bestandssysteem                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| Verzoek type      | GET                                                                                                   |
| RESPONSE BODY     | `OK` of foutbericht                                                                                   |
| Beschikbaar sinds | 10.20                                                                                                 |

Voorbeeld:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Deze oproep maakt een reservekopiebestand met vind-ik-leuk albums.

#### Herstellen vind-ik-leuk albums

Herstelt tabel `MUSIC_BRAINZ_RELEASE_LIKE` van het bestandssysteem

| Bedoeling         | Herstellen vind-ik-leuk nummers uit back-upbestand                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| Verzoek type      | GET                                                                                                                                        |
| RESPONSE BODY     | `OK` of foutbericht                                                                                                                        |
| Beschikbaar sinds | 10.20                                                                                                                                      |

Voorbeeld:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Deze oproep herstelt het back-upbestand.

### Afspeellijst

#### Service inschakelen

Bewerk UMS.conf en configureer een beheerde afspeellijstmap door de instelling 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

Voor het inschakelen van deze service. Deze service is standaard uitgeschakeld. Het mappad van de afspeellijst moet zich bevinden onder een geconfigureerde gedeelde `<span class="s1">mappen</span>` pad voor de afspeellijst veranderd door deze API om zichtbaar te zijn voor UMS.

#### Lijst van alle afspeellijsten

Beschikbare afspeellijsten lezen. Deze namen van de afspeellijst moeten worden gebruikt voor latere oproepen om nummers toe te voegen of te verwijderen.

| Bedoeling               | Bezorg alle ondersteunde (`m3u`, `m3u8` en `pls`) en beschikbare afspeellijsten uit de geconfigureerde map. Naast de playlist naam, de afspeellijsten `playlistId` is           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| Verzoek type            | GET                                                                                                                                                                             |
| RESPONSE BODY           | JSON reeks van playlist namen                                                                                                                                                   |
| RESPONSE BODY voorbeeld | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| Beschikbaar sinds       | 11.0                                                                                                                                                                            |

Voorbeeld:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Deze oproep bevat alle beschikbare afspeellijsten.

#### Lijst server toegankelijke afspeellijsten

Dit zijn alle afspeellijsten die bekend zijn bij UMS (database/cache ingeschakeld). Deze namen van de afspeellijst moeten worden gebruikt voor latere oproepen om nummers toe te voegen of te verwijderen. Het afspeellijst id kan gebruikt worden om direct naar het afspeellijst te navigeren door te bladeren door de `objectId` `$DBID$PLAYLIST$` concat databaseId.

| Bedoeling               | Bezorgd alle ondersteunde (`m3u`, `m3u8` en `pls`) en beschikbare afspeellijsten uit geconfigureerde map                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| Verzoek type            | GET                                                                                                                                                      |
| RESPONSE BODY           | JSON reeks van playlist namen                                                                                                                            |
| RESPONSE BODY voorbeeld | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Beschikbaar sinds       | dev branch                                                                                                                                               |

Voorbeeld:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Deze oproep zal een overzicht geven van alle beschikbare afspeellijst die toegankelijk is voor UMS.

#### nummers toevoegen aan afspeellijsten

De vereiste `audiotrackid` wordt geleverd tijdens zoekverzoeken van UPnP en kan worden geëxtraheerd uit de DIDL response attribute `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Bedoeling                          | Voeg nummer toe aan afspeellijst                                                                                                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| Verzoek type                       | POST                                                                                                                                                                              |
| POST BODY                          | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY voorbeeld / beschrijving | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY                      | GEEN                                                                                                                                                                              |
| Beschikbaar sinds                  | 11.0                                                                                                                                                                              |

Voorbeeld:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Dit voegt het nummer met het ID `123` toe aan de afspeellijst `Pop`.

#### nummers uit afspeellijsten verwijderen

De vereiste `audiotrackid` wordt geleverd tijdens zoekverzoeken van UPnP en kan worden geëxtraheerd uit de DIDL response attribute `descMetadata`

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Bedoeling                          | Verwijder nummer uit afspeellijst                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                                | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| Verzoek type                       | POST                                                                                                                                                                                   |
| POST BODY                          | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY voorbeeld / beschrijving | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY                      | GEEN                                                                                                                                                                                   |
| Beschikbaar sinds                  | 11.0                                                                                                                                                                                   |

Voorbeeld:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Dit verwijdert het nummer met het ID `123` uit de afspeellijst `Pop`.

#### Nieuwe afspeellijsten maken

Afspeellijstnaam moet worden opgegeven zonder pad en zonder bestandsextensies. 

| Bedoeling                          | Het maken van nieuwe afspeellijsten in beheerde afspeellijst map                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                                | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| Verzoek type                       | POST                                                                                                                                                                           |
| POST BODY                          | `</span>PLAYLIST_NAME</0>`                                                                                                                                            |
| POST BODY voorbeeld / beschrijving | Gelijktijdig                                                                                                                                                                   |
| RESPONSE BODY                      | GEEN                                                                                                                                                                           |
| Beschikbaar sinds                  | 11.0                                                                                                                                                                           |

Voorbeeld:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Deze oproep maakt een nieuw playlist bestand genaamd `Contemporary.m3u8` in de beheerde playlist map.

## Voorbeeld van Java-code

Deze code snippet toont hoe de API met de bibliotheek okhttp3 moet worden gebruikt.

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

## HTTP retourcodes

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Stel een `api_key` in in UMS.conf met een lengte van 12 of meer tekens
