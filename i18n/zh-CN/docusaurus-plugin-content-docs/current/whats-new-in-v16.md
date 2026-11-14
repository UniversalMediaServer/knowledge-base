---
sidebar_position: 2
---

# v16 中的新功能

## 简介

v16 版本的主要目标是让用户更方便连续观看电视剧，同时优化网络电台支持。

本版本更新简要概览如下：
- 添加了一个 **继续观看** 文件夹到媒体库。
- 新增支持\*\*[DI.fm (AudioAddict)](https://www.di.fm/)活动与播放列表\*\*
- 新增支持\*\*[RadioBrowser](https://www.radio-browser.info/)\*\*，可用来查找电台并添加至服务器播放列表。
- 新增支持**3-box 配置**
- 新增支持对所有媒体类型（视频、播放列表、文件夹等）进行**点赞/评分**以及**更新封面**。可通过渲染器和媒体播放器操作（此前仅音频支持该功能）
- 新增支持**向渲染器推送**变更的指定文件和容器更新信息
- 启动性能提升约**95%**，同时改善文件扫描期间服务器的响应速度
- 优化文件扫描时的**服务器响应能力**
- 通过升级**8个主要依赖库版本**，完成代码库现代化改造

## 新功能

### 继续播放文件夹

这里展示所有正在观看中的视频，以及正在追更剧集的下一集，按最近播放排序。

该文件夹以及其内剧集文件夹的内容是动态更新的。

如果你已经追完某部剧集，对应的文件夹会消失；当新增单集后，文件夹会重新出现。

每个剧集文件夹的首项是你待看的单集；如果你看到S01E02还没看完，这里就显示它，等完整播放完毕后，如果有下一集，就会自动切换为S01E03。

![展示继续观看文件夹的演示视频](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

新增支持[DI.fm (AudioAddict)](https://www.di.fm/)活动与播放列表

更多详情请查阅文档：[Audio Addict](./configuration/audio-addict)、[Internet Radio](./configuration/internet-radio)，以及下方基于[NextCP/2](https://sf666.github.io/nextcp2/)的演示视频：

[![DI.fm 的视频缩略图](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### RadioBrowser（全球电台检索库）

新增支持 [RadioBrowser](https://www.radio-browser.info/)，可搜索电台并将电台添加到服务器播放列表。搜索支持：
- 站点名称
- 国家/地区
- 语言
- 流派​​

查看我们的 [RadioBrowser](./configuration/radiobrowser)文档和视频，使用下面的 [NextCP/2] (https://sf666.github.io/nextcp2/) 获取更多信息：

[![RadioBrowser 功能演示视频缩略图](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### 3-box 配置

新增支持 3-box 模式播放，该模式下播放链路一共涉及三台设备：
1. 服务器（UMS）
2. 控制端（通常是手机或者网页界面）
3. 渲染器/媒体播放器

详见 [2-Box 和 3-Box 设置](./configuration/control-point-setups)了解更多。

### Liking/rating via renderers

Added support for liking/rating for all media types (like videos, playlists, folders, etc.) via renderers and media players (before, it was only available for audio)

See the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for liking and rating support](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Updating album art via renderers

Added support for updating album art for all media types (like videos, playlists, folders, etc.) via renderers and media players (before, it was only available for audio)

See the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for updating album art](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Breaking Changes

We no longer support x86 or i586 (32-bit) architectures. This means we are not doing the following 4 releases: Linux ARMel, Linux ARMhf, Linux x86, and Windows x86.

Backups made prior to v16 will not work after v16, so if you are in the habit of maintaining backups, make sure you store your v15 one separately to the v16 one until you are confident the automatic migration worked.

## Migration

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
