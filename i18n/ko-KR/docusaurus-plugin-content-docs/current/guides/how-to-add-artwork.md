# 아트워크 추가 방법

폴더와 재생 목록을 위해 자신만의 아트워크를 추가하여 프론트엔드에 일반적인 기본 이미지 대신 사용자 지정 썸네일을 표시할 수 있습니다.

이 가이드는 다음을 설명합니다:

- 지원되는 이미지 형식
- 아트워크 파일 이름 지정 방법
- 파일을 저장할 위치
- 재생 목록 이미지가 누락된 경우 발생하는 일

## 지원되는 이미지 형식

다음 파일 유형은 이 순서대로 지원되고 확인됩니다. 첫 번째 일치하는 이미지 파일이 사용됩니다:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

폴더 아트워크와 재생 목록 아트워크 모두에 이러한 형식 중 하나를 사용할 수 있습니다.

## 폴더

폴더의 아트워크를 설정하려면 해당 폴더 안에 'folder.ext'라는 이름의 이미지 파일을 넣습니다.

'.ext'를 지원되는 확장자 중 하나로 교체합니다.

예시

- `folder.webp`
- `folder.jpg`
- `folder.png`

## 재생 목록

재생 목록의 아트워크를 설정하려면 재생 목록 파일과 동일한 기본 파일 이름을 사용합니다.

예시:

- 재생 목록 파일: 'Jazz.m3u8'
- 아트워크 파일: 'Jazz.jpg' (또는 'Jazz.webp', 'Jazz.png' 등)

일치하는 재생 목록 아트워크 파일을 찾지 못하면 폴더 아트워크가 폴백으로 사용됩니다.

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
