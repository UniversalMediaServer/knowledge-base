# How to add web content

This article will explain how to add web content.

## Video feeds

You can subscribe to video feeds/channels by adding the RSS feed links, or in the case of YouTube, just input the link to the channel.

### 1: Gehen Sie zum Abschnitt "Geteilte Inhalte"



### 2: Öffnen Sie den Modal "Neuen freigegebenen Inhalt hinzufügen"

Wenn Sie den Button "Neuen geteilten Inhalt hinzufügen" auswählen, erscheint ein modaler Dialog, in dem Sie jeden Medientyp hinzufügen können. The first step is to choose the "Video feed" type  
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

The "Authorized groups" field lets you make this feed only available to certain groups defined in UMS that are associated with different users and/or devices. See [Security and Privacy](../configuration/security-and-privacy.md#link-person-to-renderer) for more details.

When you are happy with the options you entered, select the "Add" button.

### Feed order

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order  
![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Änderungen speichern

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. Now you can see your content on your devices:  
![Example of a video feed on the web player](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)