# Come aggiungere contenuti web

Questo articolo spiegherà come aggiungere contenuti web.

## Feed video

È possibile iscriversi ai feed/canali video aggiungendo i collegamenti di feed RSS, o, nel caso di YouTube, basta inserire il link al canale.

### 1: Vai alla sezione Contenuti condivisi

Nelle impostazioni UMS nel tuo browser web, apri il menu e seleziona Contenuti condivisi  
![Menu impostazioni](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Aprire il modal "Aggiungi nuovo contenuto condiviso"

Quando si seleziona il pulsante "Aggiungi nuovo contenuto condiviso", si aprirà un modal che consente di aggiungere qualsiasi tipo di supporto. Il primo passo è scegliere il tipo "feed video"  
![Nuova modalità opzioni contenuti condivisi](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Aggiungi il tuo feed

Qui puoi aggiungere il tuo feed

#### Nome

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

### Save changes

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. Now you can see your content on your devices:  
![Example of a video feed on the web player](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)