# Audio Addict网络电台

Audio Addict Network汇聚了一系列优质的互联网广播电台，包括：

古典电台、Radio Tunes、摇滚电台、爵士电台、禅意电台以及 DI.fm。

需要付费**高级账号**才能访问这些电台。你只需在其中任意一个网站注册，同一组用户名和密码即可登录全部站点。

UMS 会自动读取所有可用的 AudioAddict 电台站点、频道以及筛选条件。**收藏**频道也支持。

## 配置

如需开启 AudioAddict 支持，请在你的 UMS.conf 文件中添加以下内容：

```
# TRUE = 优先使用欧洲流媒体服务器
audio_addict_europe = TRUE or FALSE

# 你的用户名
audio_addict_user = USERNAME

# 你的密码
audio_addict_pass = PASSWORD
```

## 位置

**Audio Addict 网络电台** 文件夹位于您的媒体库。完成设置后，你就可以直接浏览并访问所有可用电台。

## 节目和剧集

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
