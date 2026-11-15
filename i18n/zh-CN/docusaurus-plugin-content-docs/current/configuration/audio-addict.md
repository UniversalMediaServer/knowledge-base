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

除直播电台外，DI.fm 网络还提供**活动**文件夹。这里会列出即将播出的节目，对于已经播出的节目还提供录制，方便你之后收听。

具有往期节目的节目会拥有独立文件夹，用于存放历史剧集。部分节目拥有数百集，因此文件夹会拆分成多个小组，每组标注内含剧集的编号和日期。

```
# 每组包含多少集后进行拆分。默认 20，最小值 1。
audio_addict_episodes_per_container = 20
```

生成该列表需要向服务器请求相关信息以及每个节目的单集信息，这个过程需要一点时间。 UMS 会缓存获取到的数据，这样浏览和播放时就不用重复加载：

```
# 节目和剧集列表的复用时长，单位 分钟。
# 默认 60。设为 0 则每次都向服务器请求数据。
audio_addict_tree_cache_ttl_minutes = 60
```

更长的缓存时间会让浏览更流畅，更短的缓存时间可以更快获取新发布的剧集。 UMS 获取到的地址有效期远长于默认的一小时，所以无需将该数值设置得很小。

## 直播标题

Audio Addict 电台不会在音频流中推送当前曲目信息。 UMS 向服务器查询信息并发送给播放器，因此你仍然可以看到正在播放的内容。相关说明见 [网络电台与直播标题](./internet-radio)。

```
# 为 Audio Addict 电台发送直播标题。默认开启。
audio_addict_icy_metadata = TRUE
```

## 已保存播放列表

已保存播放列表会按顺序播放你账号内的曲目。播放列表播放完毕后，UMS 可以循环播放而不是停止：

```
已保存播放列表播放结束后自动重新播放。默认关闭。
audio_addict_playlist_loop = FALSE
```

## 查看所有设置

| 设置                                    | 默认​​​​​ | 意义               |
| ------------------------------------- | ------- | ---------------- |
| `audio_addict_user`                   | —       | 您的帐户名称           |
| `audio_addict_pass`                   | —       | 您的密码             |
| `audio_addict_europe`                 | `TRUE`  | 优先使用欧洲流媒体服务器     |
| `audio_addict_icy_metadata`           | `TRUE`  | 向播放器发送直播标题       |
| `audio_addict_episodes_per_container` | `20`    | 每组剧集数量上限         |
| `audio_addict_tree_cache_ttl_minutes` | `60`    | 节目和剧集列表的缓存复用时长   |
| `audio_addict_playlist_loop`          | `FALSE` | 已保存播放列表播放结束后循环播放 |
