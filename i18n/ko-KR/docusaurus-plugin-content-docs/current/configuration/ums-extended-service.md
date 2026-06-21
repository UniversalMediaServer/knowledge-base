# UMS UPnP 서비스

UMS는 외부 제어 지점이 추가 시스템 기능과 상호 작용할 수 있도록 하는 확장된 UPnP 서비스를 제공합니다.

## 사용법

서비스 유형이 'UmsExtended Services'인 네임스페이스 'schemas-upnp-org'로 노출됩니다.

JUPnP를 사용하는 Java 제어 지점의 경우, UMS 'RemoteDevice'에서 'findService'를 호출합니다:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

이 서비스 인터페이스를 통해 다음 작업을 사용할 수 있습니다.

## 마이뮤직 상호작용

좋아요 앨범은 객체 ID 'MYMUSIC$'를 딥 링크로 사용하거나 루트 폴더의 'My Albums'로 이동하여 탐색할 수 있습니다.

즐겨찾기를 유지하는 것은 특히 대규모 앨범 컬렉션에서 유용하며, 전체 라이브러리를 수동으로 탐색하는 데 시간이 많이 소요될 수 있습니다. 좋아요 앨범 목록은 사용자가 반복적인 광범위한 검색이나 딥 폴더 탐색 없이 관련 콘텐츠로 빠르게 돌아갈 수 있도록 도와줍니다.

실제로 즐겨찾기는 다음과 같은 이점을 제공합니다:

- 매우 큰 라이브러리에서도 자주 재생되는 앨범에 더 빠르게 접근할 수 있습니다.
- 전체 카탈로그에서 선호하는 콘텐츠를 분리하여 일상적인 내비게이션을 개선합니다.
- 안정적인 앨범 선택에 의존하는 클라이언트 및 자동화 기능을 위해 더욱 일관된 재생 워크플로우를 제공합니다.

### 입력 매개변수

이 섹션의 모든 작업에는 입력 매개변수가 필요합니다. 앨범은 MusicBrainz ID 또는 Discogs 릴리스 ID로 식별해야 합니다. 최소한 하나의 ID가 필요하며, 그렇지 않으면 아무런 조치도 수행되지 않습니다.

마돈나의 'Like a Virgin' 발매 예시:

| 속성            |            유형            |                 예제 값                 |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |            문자열           | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
앨범을 좋아할 때 두 매개변수('MusicBrainzId'와 'DiscogsId')를 모두 제공했다면, 그 앨범을 싫어할 때도 두 매개변수를 모두 제공해야 합니다.
:::

### LikeAlbum

음악 앨범을 좋아요로 표시합니다.

### DislikeAlbum

음악 앨범에서 좋아요 상태를 제거합니다.

### IsAlbumLikedInput

앨범이 현재 좋아요로 표시되어 있는지 확인합니다. MusicBrainz와 Discogs ID가 모두 제공되는 경우, 적어도 하나의 ID가 좋아요로 표시되면 메서드는 'true'를 반환합니다.

## 백업 작업

이 서비스는 백업 및 복원 작업을 제공합니다.

:::info
복원을 수행하기 전에 백업을 생성해야 합니다.
:::

### BackupAudioLikes

MusicBrainz 또는 Discogs ID로 식별된 '좋아요' 오디오 앨범 테이블의 백업을 생성합니다.

### RestoreAudioLikes

좋아요 앨범 테이블을 복원합니다. 작업을 실행하기 전에 'BackupAudioLikes'를 호출합니다.

### BackupRatings

파일 해시와 평점 값이 포함된 백업 파일에 오디오 평점 데이터를 씁니다.

### RestoreRatings

'BackupRatings'으로 생성된 백업에서 평점 정보를 복원합니다.

## 라이브러리 상호작용

### RescanMediaStore

전체 음악 라이브러리를 다시 스캔합니다.

### RescanMediaStoreFolder

특정 폴더를 재귀 없이 다시 스캔합니다. 입력 매개변수는 폴더의 'ObjectID'여야 합니다.

