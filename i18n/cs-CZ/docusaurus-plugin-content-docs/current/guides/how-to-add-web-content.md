# Jak přidat webový obsah

Tento článek vysvětlí, jak přidat webový obsah.

## Video kanály

Můžete se přihlásit k odběru video kanálů/kanálů přidáním RSS feedových odkazů, nebo v případě YouTube, jen vložte odkaz na kanál.

### 1: Přejděte do sekce Sdílený obsah

In the UMS settings in your web browser, open the menu and select Shared Content\
![Settings menu](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Otevřete "Přidat nový sdílený obsah"

Když vyberete tlačítko "Přidat nový sdílený obsah", otevře se modál, který vám umožní přidat libovolný typ média. The first step is to choose the "Video feed" type\
![New shared content options modal](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Přidejte svůj feed

Zde můžete přidat svůj feed

#### Název

Pole "Název" je pro video kanály zakázáno, protože kanály definují jejich vlastní jméno.

#### Cesta

Pole "Cesta" definuje strukturu adresáře, která bude zobrazena UMS. Například, pokud zadáte `Web/YouTube kanály`, váš kanál bude uvnitř adresáře `YouTube kanály`, vnořené do adresáře `Web`. To umožňuje organizovat váš obsah, jakkoli chcete, a je zvláště užitečný v případě, že máte různé poskytovatele obsahu, a používáte UMS, že je máte všechny na jednom místě.

#### Zdroj/URL:

Toto je odkaz na video kanál. Obvykle skončí na `.xml`, ale pracujeme s YouTube odlišně, abychom přijali URL kanálu přímo, což vám umožní zadat např. `https://www.youtube.com/@kurzgesagt`

#### Autorizované skupiny

Pole "Autorizované skupiny" umožňuje zpřístupnit tento kanál pouze určitým skupinám definovaným v UMS, které jsou spojeny s různými uživateli a/nebo zařízeními. Více informací viz [Bezpečnost a soukromí](../configuration/security-and-privacy.md#link-person-to-renderer) .

Když jste spokojeni s možnostmi, které jste zadali, vyberte tlačítko "Přidat".

### Pořadí kanálu

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order\
![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Uložit změny

Můžete opakovat předchozí kroky pro přidání/upravení více obsahu, a pokud jste spokojeni s vašimi změnami, vyberte tlačítko "Uložit" v dolní části stránky. Now you can see your content on your devices:\
![Example of a video feed on the web player](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)
