# Jak přidat webový obsah

Tento článek vysvětlí, jak přidat webový obsah.

## Video kanály

Můžete se přihlásit k odběru video kanálů/kanálů přidáním RSS feedových odkazů, nebo v případě YouTube, jen vložte odkaz na kanál.

### 1: Přejděte do sekce Sdílený obsah

V nastavení UMS ve vašem webovém prohlížeči otevřete menu a zvolte nabídku Sdílený obsah  
![Settings menu](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Otevřete "Přidat nový sdílený obsah"

Když vyberete tlačítko "Přidat nový sdílený obsah", otevře se modál, který vám umožní přidat libovolný typ média. Prvním krokem je zvolit "Video feed" typ  
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

Pokud byl odkaz kanálu platný, měli byste nyní vidět vyplněné pole "Název", a nyní můžete přetažením kanálu nahoru nebo dolů ovládat objednávku  
![Sdílený seznam obsahu a schopnost objednání obsahu](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Uložit změny

Můžete opakovat předchozí kroky pro přidání/upravení více obsahu, a pokud jste spokojeni s vašimi změnami, vyberte tlačítko "Uložit" v dolní části stránky. Teď můžeš vidět svůj obsah na svých zařízeních:  
![Příklad video kanálu na webovém přehrávači](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)