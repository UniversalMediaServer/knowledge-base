# 외부 API

외부 API를 사용하면 프로그램이 HTTP 호출로 UMS 기능에 액세스하거나 트리거할 수 있습니다.

## 외부 API를 활성화하는 방법

UMS.conf를 편집하고 다음과 같이 api_key를 구성합니다

`api_key = secret_password`

_`secret_password`_은 최소 12자여야 합니다.

## API 사용법

외부 API가 활성화된 경우 /api/COMMAND에 대한 POST 호출을 통해 API에 액세스할 수 있습니다

### 폴더 검색

#### 다시 검색

| 의도         | 전체 라이브러리를 다시 검색합니다          |
| ---------- | --------------------------- |
| URI        | `/api/folderscanner/rescan` |
| 본문         | 없음                          |
| 본문 예시 / 설명 | 이 명령에는 본문 내용이 필요하지 않습니다     |
| 다음부터 사용 가능 | 10.4.2                      |

:::정보
대형 라이브러리의 경우 속도가 느릴 수 있습니다
:::

예제:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### 파일 또는 폴더 다시 검색

| 의도         | 파일 시스템의 일부 하위 트리를 다시 검색합니다.                             |
| ---------- | ------------------------------------------------------- |
| URI        | `/api/folderscanner/rescanFileOrFolder`                 |
| 본문         | PATH_TO_SCAN                                          |
| 본문 예시 / 설명 | 예제: "/music/pop/Madonna". 경로는 공유 경로의 루트 또는 하위 폴더여야 합니다. |
| 다음부터 사용 가능 | 10.4.2                                                  |

예제:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### 좋아하는 음악 (앨범 및 노래)

#### 좋아하는 노래

노래는 좋아요로 표시됩니다.

| 의도                | 음악 Brainz trackId에 의해 식별된 노래처럼                           |
| ----------------- | -------------------------------------------------------- |
| URI               | `<span class="s1">/api/like/likesong</span>` |
| POST BODY         | `musicBrainz_trackID`                                    |
| POST BODY 예제 / 설명 | b8695995-45e9-405d-b4aa-e50e8760fe25                     |
| 이후 사용 가능          | 10.20                                                    |

예제:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### 싫어하는 노래

노래는 싫어하지 않습니다

| 의도                | musicBrainz trackId에 의해 식별된 노래를 싫어합니다                       |
| ----------------- | ----------------------------------------------------------- |
| URI               | `<span class="s1">/api/like/</span>dislikesong` |
| POST BODY         | `musicBrainz_trackID`                                       |
| POST BODY 예제 / 설명 | b8695995-45e9-405d-b4aa-e50e8760fe25                        |
| 이후 사용 가능          | 10.20                                                       |

예제:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### 노래가 좋아요

노래가 마음에 드는지 확인합니다.

| 의도                | musicBrainz trackId로 '좋아요'를 누른 노래가 있는지 확인                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| POST BODY         | `musicBrainz_trackID`                                                                           |
| POST BODY 예제 / 설명 | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| RESPONSE BODY     | `TRUE` 또는 `FALSE`                                                                               |
| 이후 사용 가능          | 10.20                                                                                           |

예제:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

이 호출은 musicbrainz release-id  `1e0eee38-a9f6-49bf-84d0-45d0647799af`에 의해 식별된 앨범의 좋아요 속성을 추가합니다.

#### 앨범 좋아요

상태와 같은 앨범을 true로 설정합니다.

| 의도                | musicBrainz releaseID로 식별된 앨범에 좋아요 누르기                    |
| ----------------- | --------------------------------------------------------- |
| URI               | `<span class="s1">/api/like/</span>likealbum` |
| POST BODY         | `musicBrainz_releaseID`                                   |
| POST BODY 예제 / 설명 | 1e0eee38-a9f6-49bf-84d0-45d0647799af                      |
| 이후 사용 가능          | 10.20                                                     |

예제:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### 앨범 싫어요

상태처럼 앨범을 제거합니다.

| 의도         | musicBrainz releaseID로 식별된 노래 싫어요 표시하기                       |
| ---------- | ------------------------------------------------------------ |
| URI        | `<span class="s1">/api/like/</span>dislikealbum` |
| POST BODY  | `musicBrainz_releaseID`                                      |
| 본문 예시 / 설명 | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| 이후 사용 가능   | 10.20                                                        |

예제:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

이 호출은 musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`에 의해 식별된 앨범의 좋아요 속성을 제거했습니다.

#### 앨범이 좋아요

앨범 좋아요 상태를 확인합니다.

| 의도                | musicBrainz releaseID로 앨범이 좋아요를 받았는지 확인하기                    |
| ----------------- | ------------------------------------------------------------ |
| URI               | `<span class="s1">/api/like/</span>isalbumliked` |
| POST BODY         | `musicBrainz_releaseID`                                      |
| POST BODY 예제 / 설명 | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| RESPONSE BODY     | "TRUE" 또는 "FALSE"                                            |
| 이후 사용 가능          | 10.20                                                        |

예제:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

이 호출은 musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`로 식별된 앨범이 마음에 드는지 확인합니다.

### 등급

평점 API는 노래를 평점하는 역할을 합니다. 등급 정보는 내부 데이터베이스 (캐시 활성화)에 저장되며 선택적으로 파일 자체에 저장됩니다. UMS.conf에서 `audio_update_rating_tag = true` 가 설정되어 있는 경우 IDv3 등급 필드도 노래 파일에서 업데이트됩니다 (노래 파일 형식이 지원되는 경우).

콘텐츠 디렉토리 서버를 탐색하는 동안 MusicBrainzTrackID (사용 가능한 경우) 및 audiotrackID는 DIDL 요소 내에서 `desc` 메타데이터로 전달됩니다.

#### 등급 설정

| 의도                | musicBrainz trackId에 의해 식별된 노래에 별점 (0 - 5)으로 등급 설정                                              |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| POST BODY         | `musicbrainzTrackId` /`stars`                                                                   |
| POST BODY 예제 / 설명 | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| 이후 사용 가능          | 10.20                                                                                           |

예제:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

이 호출은 musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` 로 식별되는 모든 곡의 사용자 등급을 `3`으로 설정합니다.

#### 등급 받기

데이터베이스에서 노래 등급 읽기

| 의도                | musicBrainz trackID로 별(0 - 5) 단위의 노래 등급을 얻습니다. 응답 본문에는 등급 정보가 포함되어 있습니다.                         |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>` |
| POST BODY         | `musicbrainzTrackId`                                                                             |
| POST BODY 예제 / 설명 | b8695995-45e9-405d-b4aa-e50e8760fe25                                                             |
| RESPONSE BODY 예제  | 3                                                                                                |
| 이후 사용 가능          | 10.20                                                                                            |

예제:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

이 호출은 musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.에 의해 식별된 노래의 사용자 등급을 읽습니다.

#### 오디오 트랙 ID별 등급 설정

| 의도                | UMS 내부 오디오 트랙 ID에 의해 식별된 곡에 별 (0 - 5)로 등급 설정                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| POST BODY         | `trackID` /`stars`                                                                                             |
| POST BODY 예제 / 설명 | 32                                                                                                             |
| 이후 사용 가능          | 11.0                                                                                                           |

예제:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

이 호출은 오디오 트랙 ID `32`로 식별되는 사용자 등급을 `3`으로 설정합니다.

#### 오디오 트랙 id별 등급 받기

데이터베이스에서 노래 등급 읽기

| 의도                | UMS 내부 오디오 트랙 ID로 별 (0 - 5) 단위의 노래 등급을 얻습니다. 응답 본문에는 등급 정보가 포함되어 있습니다.                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>` |
| POST BODY         | trackId                                                                                                       |
| POST BODY 예제 / 설명 | 32                                                                                                            |
| RESPONSE BODY 예제  | 3                                                                                                             |
| 이후 사용 가능          | 11.0                                                                                                          |

예제:

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

이 호출은 UMS audiotrack-id `32`로 식별된 곡의 사용자 등급을 읽습니다.

### 백업 / 복원

사용자가 관리하는 "좋아용 앨범" 항목은 ` database_backup`이라는 이름의 프로필-디렉터리 하위 폴더에 백업할 수 있습니다. 파일 이름은 `MUSIC_BRAINZ_RELEASE_LIKE`입니다. UMS 데이터베이스가 삭제될 경우를 대비하여 복구를 호출합니다.

#### 좋아요 앨범 백업

파일 시스템에 백업 테이블 `MUSIC_BRAINZ_RELEASE_LIKE`

| 의도            | 좋아하는 노래를 파일 시스템에 백업                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| URI           | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                   |
| RESPONSE BODY | `확인` 또는 오류 메시지                                                                                        |
| 이후 사용 가능      | 10.20                                                                                                 |

예제:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

이 통화는 마음에 드는 앨범이 들어 있는 백업 파일을 만듭니다.

#### 좋아요 앨범 복원

파일 시스템에서 테이블 `MUSIC_BRAINZ_RELEASE_LIKE` 을 복원합니다

| 의도            | 백업 파일에서 좋아하는 노래 복원                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI           | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE  | GET                                                                                                                                        |
| RESPONSE BODY | `확인` 또는 오류 메시지                                                                                                                             |
| 이후 사용 가능      | 10.20                                                                                                                                      |

예제:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

이 호출은 백업 파일을 복원합니다.

### 재생 목록

#### 서비스 사용

UMS.conf 편집 및 설정별 관리되는 재생 목록 폴더 구성 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

이 서비스를 활성화하기 위해. 기본적으로 이 서비스는 비활성화됩니다. 재생 목록 폴더 경로는 이 API에 의해 변경된 재생 목록에 대해 구성된 공유 `<span class="s1">폴더</span>`  경로 아래에 있어야 합니다.

#### 모든 재생 목록 나열

사용 가능한 재생 목록을 읽습니다. 이러한 재생 목록 이름은 노래를 추가하거나 제거하기 위해 후속 호출에 사용해야 합니다.

| 의도               | 구성된 폴더에서 지원되는 모든 재생 목록 (`m3u`, `m3u8` and `pls`)과 사용 가능한 재생 목록을 제공합니다. 재생 목록 이름 외에 재생 목록 `playlistId`는                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI              | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>` |
| REQUEST TYPE     | GET                                                                                                                                                                             |
| RESPONSE BODY    | 재생 목록 이름의 JSON 배열                                                                                                                                                               |
| RESPONSE BODY 예제 | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                  |
| 이후 사용 가능         | 11.0                                                                                                                                                                            |

예제:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

이 호출은 사용 가능한 모든 재생 목록을 나열합니다.

#### 목록서버 액세스 가능 재생 목록

이는 모두 UMS (데이터베이스/캐시 사용)에 알려진 재생 목록입니다. 이러한 재생 목록 이름은 노래를 추가하거나 제거하기 위해 후속 호출에 사용해야 합니다. 재생 목록 ID는  `objectId` `$DBID$PLAYLIST$` concat databaseId를 검색하여 재생 목록으로 직접 이동하는 데 사용할 수 있습니다.

| 의도               | 구성된 폴더에서 지원되는 모든 재생 목록 (`m3u`, `m3u8` and `pls`) 및 사용 가능한 재생 목록 제공                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI              | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| REQUEST TYPE     | GET                                                                                                                                                      |
| RESPONSE BODY    | 재생 목록 이름의 JSON 배열                                                                                                                                        |
| RESPONSE BODY 예제 | `[{"playlistName":"재즈","playlistId":5},{"playlistName":"차트","playlistId":343}]`                                                                          |
| 이후 사용 가능         | dev 분기                                                                                                                                                   |

예제:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

이 통화는 UMS에서 액세스할 수 있는 모든 사용 가능한 재생 목록을 나열합니다.

#### 재생목록에 노래 추가

필요한`audiotrackid`는 UPnP 찾아보기 요청 시 전달되며 DIDL 응답 속성 `descMetadata`에서 추출할 수 있습니다

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| 의도                | 재생 목록에 노래 추가                                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| REQUEST TYPE      | POST                                                                                                                                                                              |
| POST BODY         | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| POST BODY 예제 / 설명 | 123/Pop                                                                                                                                                                           |
| RESPONSE BODY     | 없음                                                                                                                                                                                |
| 이후 사용 가능          | 11.0                                                                                                                                                                              |

예제:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

그러면 ID가 `123`인 곡이 재생 목록 `Pop`에 추가됩니다.

#### 재생 목록에서 노래 제거

필요한 `audiotrackid`는 UPnP 찾아보기 요청 시 전달되며 DIDL 응답 속성 `descMetadata`에서 추출할 수 있습니다

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| 의도                | 재생 목록에서 노래 제거                                                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| REQUEST TYPE      | POST                                                                                                                                                                                   |
| POST BODY         | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| POST BODY 예제 / 설명 | 123/Pop                                                                                                                                                                                |
| RESPONSE BODY     | 없음                                                                                                                                                                                     |
| 이후 사용 가능          | 11.0                                                                                                                                                                                   |

예제:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

그러면 재생 목록 ` Pop`에서 ID `123`인 곡이 제거됩니다.

#### 새 재생 목록 만들기

재생 목록 이름은 경로 없이 파일 확장자 없이 제공되어야 합니다. 

| 의도                | 관리되는 재생 목록 폴더에서 새 재생 목록 만들기                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| REQUEST TYPE      | POST                                                                                                                                                                           |
| POST BODY         | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| POST BODY 예제 / 설명 | 현대                                                                                                                                                                             |
| RESPONSE BODY     | 없음                                                                                                                                                                             |
| 이후 사용 가능          | 11.0                                                                                                                                                                           |

예제:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

이 호출은 관리되는 재생 목록 폴더에 `Contemporary.m3u8`이라는 이름의 새 재생 목록 파일을 만듭니다.

## Java 코드 예제

이 코드 스니펫은 okhttp3 라이브러리와 함께 API를 사용하는 방법을 보여줍니다.

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

## HTTP 반환 코드

| 200 | 확인 | | 204 | 콘텐츠가 반환되지 않으면 성공 | | 401 | 잘못된 api 키 | | 404 | 요청된 개체를 찾을 수 없습니다 | | 417 | API 요청 실패 | | 503 | 외부 api가 활성화되어 있지 않습니다. UMS.conf에서 길이가 12자 이상인 `api_key`설정 |
