# Jak přidat webový obsah

Tento článek vysvětlí, jak přidat webový obsah.

## Video kanály

Můžete se přihlásit k odběru video kanálů/kanálů přidáním RSS feedových odkazů, nebo v případě YouTube, jen vložte odkaz na kanál.

### 1: Přejděte do sekce Sdílený obsah

V nastavení UMS ve vašem webovém prohlížeči otevřete menu a zvolte nabídku Sdílený obsah\
![Settings menu](./img/how-to-add-web-content-1-shared-content.png)

### 2: Otevřete "Přidat nový sdílený obsah"

Když vyberete tlačítko "Přidat nový sdílený obsah", otevře se modál, který vám umožní přidat libovolný typ média. Prvním krokem je zvolit "Video feed" typ\
![New shared content options modal](./img/how-to-add-web-content-2-add-modal.png)

### 3: Přidejte svůj feed

Zde můžete přidat svůj feed

#### Název

Pole "Název" je pro video kanály zakázáno, protože kanály definují jejich vlastní jméno.

#### Cesta

Pole "Cesta" definuje strukturu adresáře, která bude zobrazena UMS. Například, pokud zadáte `Web/YouTube kanály`, váš kanál bude uvnitř adresáře `YouTube kanály`, vnořené do adresáře `Web`. This lets you organize your content however you want, and is especially useful when you have different feed providers, and you are using UMS have them all in the same place.

#### Source/URL

This is the link to the video feed. It will usually end in `.xml`, but we handle YouTube differently to accept a channel URL directly, allowing you to enter e.g. `https://www.youtube.com/@kurzgesagt`

#### Authorized groups

The "Authorized groups" field lets you make this feed only available to certain groups defined in UMS that are associated with different users and/or devices. See [Security and Privacy](../configuration/security-and-privacy.md#link-person-to-renderer) for more details.

When you are happy with the options you entered, select the "Add" button.

### Feed order

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order\
![Shared content list and ordering ability](./img/how-to-add-web-content-3-see-name-and-sort.png)

### Save changes

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. Now you can see your content on your devices:\
![Example of a video feed on the web player](./img/how-to-add-web-content-4-feed-player.png)
