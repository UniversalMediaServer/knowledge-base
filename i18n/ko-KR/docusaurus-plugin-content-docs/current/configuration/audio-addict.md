# 오디오 애청자 네트워크 라디오

**오디오 애청자 네트워크**는 다음을 포함한 프리미엄 인터넷 라디오 방송국 모음입니다:

클래식 라디오, 라디오 튠즈, 록 라디오, 재즈 라디오, 젠 라디오, 그리고 DI.fm .

이 라디오 방송국에 접속하려면 유료 **프리미엄 계정**이 필요합니다. 동일한 사용자 이름과 비밀번호로 모든 사이트에 액세스할 수 있으므로 사이트 중 하나에만 등록하면 됩니다.

UMS는 사용 가능한 모든 오디오애딕트 라디오 사이트, 채널 및 필터를 자동으로 읽어줍니다. **즐겨찾기** 채널도 지원됩니다.

## 구성

오디오애청자 지원을 활성화하려면 'UMS.conf' 파일에 다음 줄을 추가하세요:

```
# TRUE = prefer European streaming server
audio_addict_europe = TRUE or FALSE

# Your username
audio_addict_user = 사용자 이름

# Your password
audio_addict_pass = 비밀번호
```

## 위치

**오디오 애청자 라디오 네트워크** 폴더는 미디어 라이브러리 내에 있습니다. 거기에서 모든 이용 가능한 방송국을 직접 둘러보고 접근할 수 있습니다.

## Shows and episodes

Besides the live stations, DI.fm network offers an **Events** folder. It lists the upcoming shows, and
for a show that has already been broadcast it also offers the recording, so you can listen to it
afterwards.

Shows with a back catalogue get a folder of their own holding the older episodes. Some shows have
hundreds of them, so the folder is split into smaller groups, each labelled with the episode numbers
and dates it contains.

```
# How many episodes one group holds before it is split. Default 20, minimum 1.
audio_addict_episodes_per_container = 20
```

Building this list means asking the service for the events and for each show's episodes, which takes
a moment. UMS remembers the answer so that browsing and starting playback do not each pay for it
again:

```
# How long the show and episode lists are reused, in minutes.
# Default 60. Set to 0 to ask the service every time.
audio_addict_tree_cache_ttl_minutes = 60
```

A longer time makes browsing snappier, a shorter one picks up newly published episodes sooner. The
addresses UMS receives stay valid far longer than the default hour, so there is no need to keep this
value small.

## Live titles

Audio Addict stations do not announce the current track inside the audio stream. UMS asks the
service instead and delivers the result to your player, so you still see what is playing. This is
described in [Internet radio and live titles](./internet-radio).

```
# Send live titles for Audio Addict stations. On by default.
audio_addict_icy_metadata = TRUE
```

## Curated playlists

Curated playlists play one track after another from your account. When the playlist reaches its end,
UMS can start over instead of stopping:

```
# Start a curated playlist again when it ends. Off by default.
audio_addict_playlist_loop = FALSE
```

## All settings at a glance

| Setting                               | Default | Purpose                                    |
| ------------------------------------- | ------- | ------------------------------------------ |
| `audio_addict_user`                   | —       | Your account name                          |
| `audio_addict_pass`                   | —       | Your password                              |
| `audio_addict_europe`                 | `TRUE`  | Prefer the European streaming server       |
| `audio_addict_icy_metadata`           | `TRUE`  | Send live titles to the player             |
| `audio_addict_episodes_per_container` | `20`    | Episodes per group before splitting        |
| `audio_addict_tree_cache_ttl_minutes` | `60`    | How long show and episode lists are reused |
| `audio_addict_playlist_loop`          | `FALSE` | Repeat a curated playlist when it ends     |
