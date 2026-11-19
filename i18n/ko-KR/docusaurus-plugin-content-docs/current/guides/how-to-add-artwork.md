# 아트워크 추가 방법

폴더와 재생 목록을 위해 자신만의 아트워크를 추가하여 프론트엔드에 일반적인 기본 이미지 대신 사용자 지정 썸네일을 표시할 수 있습니다.

이 가이드는 다음을 설명합니다:

- 지원되는 이미지 형식
- 아트워크 파일 이름 지정 방법
- 파일을 저장할 위치
- 재생 목록 이미지가 누락된 경우 발생하는 일

## 지원되는 이미지 형식

UMS는 폴더 및 재생목록 아트워크에 대해 다음 이미지 형식을 지원합니다:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## 폴더

폴더의 아트워크를 설정하려면 해당 폴더 안에 'folder.ext'라는 이름의 이미지 파일을 넣습니다.

'.ext'를 지원되는 확장자 중 하나로 교체합니다.

예시

- `folder.webp`
- `folder.jpg`
- `folder.png`

### `cover.jpg`와 같은 기존 파일 이름 사용

폴더 아트워크의 대체 이름을 정의할 수 있습니다. `cover.jpg` 또는 `front.png`를 찾으려면 UMS 프로필 폴더의 `UMS.conf`에 다음 줄을 추가한 다음 UMS를 다시 시작하세요.

```ini
folder_thumbnail_names = cover, front
```

파일 확장자 없이 이름을 입력하고 쉼표로 구분합니다. 일치 여부를 확인할 때 대소문자는 구분하지 않으므로, `cover`는 `Cover.JPG`와도 일치합니다.

이 설정에서 UMS는 `folder.*`, `cover.*`, `front.*` 순으로 파일을 찾고, 마지막으로 파일명에 `albumart`가 포함된 지원 가능한 이미지 파일을 찾습니다. 표준 폴더 아트워크 조회를 사용하려면 설정을 비워 두세요.

선택한 이미지는 해당 폴더의 트랙과 같은 디렉터리의 로컬 재생목록에 사용할 대체 아트워크로도 활용할 수 있습니다.

## 재생 목록

재생 목록의 아트워크를 설정하려면 재생 목록 파일과 동일한 기본 파일 이름을 사용합니다.

예시:

- 재생 목록 파일: 'Jazz.m3u8'
- 아트워크 파일: 'Jazz.jpg' (또는 'Jazz.webp', 'Jazz.png' 등)

로컬 재생목록의 경우 UMS가 이 소스들을 순서대로 확인합니다.

1. 재생 목록과 기본 파일 이름이 완전히 동일한 이미지 (예: `Jazz.m3u8`에 대한 `Jazz.jpg`).
2. 호환 가능한 제어점을 통해 해당 재생목록에 할당된 아트워크입니다.
3. 디렉터리의 아트워크는 `folder.*` 파일, `folder_thumbnail_names`에 지정된 이름의 파일, 또는 `albumart` 이미지에서 가져올 수 있습니다.

## 폴더 구조 예시

이것을 참고 자료로 사용하세요:

```text
Music/
|-- folder.jpg
|-- Jazz/
|   |-- folder.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- folder.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

이 예시에서는:

- 'Music/folder.jpg'는 최상위 'Music' 폴더의 아트워크입니다.
- 'Music/Jazz/folder.png.png'는 '재즈' 폴더의 아트워크입니다.
- 'Music/Jazz/Jazz.jpg'는 'Jazz.m3u8' 재생 목록에 사용됩니다.
- 'Music/Jazz/Smooth.m3u8'에는 일치하는 'Smooth.\*' 이미지가 없으므로 'Jazz' 폴더 아트워크가 사용됩니다.

## Web streams inside a playlist

The naming rules above work because there is a file to put the image next to. An internet radio
station or any other web address listed in a playlist has no such file, so it needs a different way
to carry its artwork: a `#EXTIMG:` line that points at the picture.

Put the line directly **above** the entry it belongs to, the same way `#EXTINF:` works. It applies to
the next entry only, so each stream gets its own line:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

UMS downloads the image once, stores it, and uses it for that stream from then on. It does not fetch
it again on every start.

What the line accepts:

- An **absolute** address. `https://example.com/cover.png` works, `cover.png` and `../art/cover.png`
  do not — a relative path is ignored and the stream keeps the default image.
- A `data:` URI, if you would rather keep the picture inside the playlist file than host it somewhere.
- Only `.m3u` and `.m3u8` playlists. Other playlist formats have no place to put the line.

Capitalization of the directive itself does not matter, `#EXTIMG:` and `#extimg:` both work.

### Letting UMS write the line for you

If your control point can set the artwork of an entry, you do not have to edit the playlist by hand.
UMS writes the `#EXTIMG:` line into the playlist file itself, and only after it has successfully
loaded the picture — so a broken address leaves the file untouched instead of storing a dead link.

Because the artwork then lives in the playlist file rather than only in the database, it survives a
rebuilt database and travels with the file when you copy the playlist elsewhere.
