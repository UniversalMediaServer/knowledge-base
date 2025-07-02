# How to add web content

This article will explain how to add web content.

## Video feeds

You can subscribe to video feeds/channels by adding the RSS feed links, or in the case of YouTube, just input the link to the channel.

### 1: Go to the Shared Content section

In the UMS settings in your web browser, open the menu and select Shared Content\
![Settings menu](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Open the "Add new shared content" modal

When you select the "Add new shared content" button, it will open a modal that allows you to add any type of media. The first step is to choose the "Video feed" type\
![New shared content options modal](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Add your feed

Here you can add your feed

#### Name

The "Name" field is disabled for video feeds, because the feeds define their own names.

#### Path

The "Path" field defines the directory structure that will be displayed by UMS. For example, if you enter `Web/YouTube Channels`, your feed will be inside the `YouTube Channels` directory, nested within the `Web` directory. This lets you organize your content however you want, and is especially useful when you have different feed providers, and you are using UMS have them all in the same place.

#### Source/URL

This is the link to the video feed. It will usually end in `.xml`, but we handle YouTube differently to accept a channel URL directly, allowing you to enter e.g. `https://www.youtube.com/@kurzgesagt`

#### Authorized groups

“已授权组” 一栏让你能够使该订阅源只对特定的群组访问。群组在 UMS 中创建，其可与不同的用户和/或设备关联。 见 [安全与隐私](../configuration/security-and-privacy.md#link-person-to-renderer) 了解更多细节。

When you are happy with the options you entered, select the "Add" button.

### Feed order

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order\
![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Save changes

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. 现在你可以在你的设备上看到你的内容了:  [在网页播放器中的视频订阅源的例子](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)