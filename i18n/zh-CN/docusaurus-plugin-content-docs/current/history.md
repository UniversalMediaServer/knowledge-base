---
sidebar_position: 4
---

# 版本历史

## 概述

我们于2012年作为PS3 Media Server的一个分支项目启动，而PS3 Media Server当时是市场上最受欢迎、评价最高的媒体服务器之一。我们的创始人 SubJunk 也是该项目的开发者之一。在那个时候，它仅仅是一个DLNA媒体服务器，图形用户界面和功能都简单得多。

它原本就出色地完成了这项简单的工作，但我们已将UMS引向了新的方向，并推向了新的高度。

有关最新版本变更的概述，请参阅 [V16 的新功能](./whats-new-in-v16)

## 旧版本

### v15 (2025-08-23)

V15 的两个主要目标是：根据用户反馈和评价，简化界面；以及让用户账户更易于使用。

本版本的更新内容简要概述如下：

- 支持在**多用户登录**基础上进行**用户切换**
- 支持在**播放器**和**设置**界面间进行**模式切换**
- **密码**登录
- 动态**电视剧元数据**
- 新增文件**媒体信息**按钮
- 此外，我们还重写了通知和实时处理代码，优化了内存管理，并进行了许多其他改动，以提升易用性，并减少实现预期功能所需的操作步骤。

#### 用户切换器

现在，您可以在同一浏览器中同时登录多个用户账户，并在它们之间切换。

您还可以启用一项设置，在登录界面上显示可用的用户。出于安全考虑，此设置采用“主动启用”模式，因为您可能不希望所有人都能看到所有用户账户。此外还有一个中间设置选项：该浏览器登录后，会按账户逐个将用户账户保存到浏览器中。

![用户切换器的示例](@site/docs/img/whats-new-in-v15-user-switcher.png)

#### 模式切换器

Web 界面已分为“播放器”和“设置”两个区域。

这应该能减少所需的点击次数，从而使网页界面更加直观，导航也更方便。

![模式切换器的示例](@site/docs/img/whats-new-in-v15-mode-switcher.png)

#### 密码登录

现在，您可以在服务器设置中启用密码登录功能。

![密码登录示例](@site/docs/img/whats-new-in-v15-pin-code.png)

#### 动态电视剧元数据

电视剧的各季有时会有自己的信息（如标题和封面图），因此我们现在会在季页面上显示这些信息。

![剧集预览示例](@site/docs/img/whats-new-in-v15-season-metadata.png)

### v14 (2022-12-13)

此版本最大的变化在于可以控制对您内容的访问权限。这包括对用户账户功能的改进，例如头像和每位用户的播放状态，以及根据不同设备和媒体播放器/渲染器显示不同内容的能力。

![组织渲染器的示例](@site/docs/img/whats-new-in-v14-block-renderer.png)

我们还新增了添加 TMDB API 密钥的功能，用于手动添加和编辑电视剧及视频的元数据，以及将电视剧和电影标记为“已全部观看”。

![编辑元数据的示例](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

[请参阅“最新动态”页面了解详情](https://support.universalmediaserver.com/14.x/whats-new-in-v14)

### v13 (2022-12-13)

本版更新的重点是3D和虚拟现实，由贡献者threedguru主导。

![共享内容](@site/docs/img/history-v13.png)

[更多详情请参见发布公告](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v12 (2022-11-29)

这是利用网页浏览器中的现代开发工具对我们的图形用户界面（GUI）进行的彻底重写，其中SurfaceS和js-kyle付出了巨大努力。

这同时也加入了身份验证、用户和组的概念。

![身份验证](@site/docs/img/history-v12-1.png)

另一项变化是，“共享内容”区域已实现统一：此前该区域将本地内容和网络内容分列两处，现在则合并到了同一列表中。

![共享内容](@site/docs/img/history-v12-2.png)

[更多详情请参见发布公告](https://www.universalmediaserver.com/forum/viewtopic.php?t=15459)

### v11 (2022-05-27)

我们在多个方面对网页界面进行了优化，包括为电视剧、电影和剧集添加了更丰富的数据（如徽标和背景图），改进了设备检测功能，优化了网络状态检测与恢复机制、视频播放和快进/快退功能，提升了API元数据匹配能力，为所有设备提供了HLS转码功能，以及更多改进！

![Web 界面概述](@site/docs/img/history-v11.gif)

这是我们与新晋明星开发者 SurfaceS 合作推出的首个版本，他为此次发布倾注了大量心血。

[更多详情请参见发布公告](https://www.universalmediaserver.com/forum/viewtopic.php?t=15141)

### v10 (2021-01-12)

我们着力于让丰富的元数据发挥更大的作用。

我们在媒体库中新增了几个文件夹，其中包括“按信息筛选”文件夹，您可以通过该文件夹按演员、类型、国家、导演、IMDb评分和上映日期浏览视频。

通过允许您点击视频中的演员或类型等项目，查看该演员或类型（或其他元数据）的其他相关内容，网页界面的功能得到了大幅扩展。我们在网页界面的首页添加了一些快捷链接，例如“最近添加”、“进行中”、“播放次数最多”等。

如果电视剧的所有剧集均已全部观看完毕，其缩略图现在会显示“已全部观看”图标：

![已全部看完的剧集](@site/docs/img/history-v10.png)

我们还欢迎 ik666 加入开发团队，他为系统新增了一个用于集成的 API，并大幅改进了 UPnP 支持。

[更多详情请参见发布公告](https://www.universalmediaserver.com/forum/viewtopic.php?t=14535)

### v9 (2019-09-06)

No need to install Java anymore!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=13765)

### v8 (2019-03-29)

This version focused on making it easier to enjoy streaming web content like vodcasts, podcasts, internet radio, YouTube channels, and other streaming web content by adding the Shared Content tab.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=13523)

### v7 (2018-03-27)

This was the version to focus on our dynamic media browsing features with the Media Library folder.

We added detection of Movies and TV series and also added folder-watching so files could be automatically detected in shared folders

We were also lucky to have mik_s, our forum moderator, join us around this time, who does an amazing job around this place!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=12407)

### v6 (2016-01-30)

Here we added the "Fully played action" with overlay icons and file management, which was highly-anticipated.

We also welcomed Nadahar to the team, who improved stability, logging and language support.

Thanks to his Crowdin integration, we have had 523 contributors to our 40 languages!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=6037)

### v5 (2015-01-25)

In this release, we added support for UPnP connections and playback, which meant that the community were able to connect to many more devices! Thanks largely to skeptical for that.

We also added our first pass at IMDb metadata, but we didn't yet have our own API. We have OpenSubtitles to thank for this, and sorry for all the request spam in those days!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=2901)

### v4 (2014-07-25)

The first web interface was added, finally we gave the UMS community the ability to access content via their web browsers!

We also added support for casting, and the ability to transcode to AAC.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=2032)

### v3 (2013-11-01)

V3 was a huge release, and is when we started to really pull away from PS3MS with tons of our own features.

We added the New Media and Recently Played folders, playback resuming, filename prettifying, and a startup configuration wizard.

We also welcomed valib to the team, who is still contributing today!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=1295)

### v2 (2012-10-31)

With v2 came the addition of the Plugin Management tab that connected to our centralized plugin database, and we again were the first to introduce a feature; Live Subtitles, where you can stream subtitles on-the-fly from your renderer.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=325)

### v1 (2012-05-31)

These early versions focused on the "universal" aspect of the new program, by adding support for dozens of new devices.

We were also the first media server to support smooth motion, a frame-interpolation feature that now comes with every TV, but back then was only in new, high-end TVs.

Our second developer, SharkHunter, also joined us within the first few days.

[更多详情请参阅发布公告](https://www.universalmediaserver.com/forum/viewtopic.php?t=3)

### PS3 Media Server (2008)

一切的起点——这个项目！我们是该项目的分支，该项目由 shagrath 于 2008 年发起，不久后 Universal Media Server 的创始人 SubJunk 也加入了进来。

PS3 是一款出色的多媒体播放设备，但它不支持许多视频格式，因此 PS3 Media Server 运用了诸多技巧，使其能够播放任何你给它的视频。对于所有设备和玩家，我们都采用了相同的策略。

![PS3 Media Server](@site/docs/img/history-pms.png)
