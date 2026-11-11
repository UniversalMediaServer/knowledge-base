# Jak přidat webový obsah

Tento článek vysvětlí, jak přidat webový obsah.

## Video kanály

K odběru video kanálů se můžete přihlásit přidáním odkazu na jejich RSS kanál. U YouTube stačí zadat odkaz na samotný kanál.

### 1: Přejděte do sekce Sdílený obsah

V nastavení UMS ve webovém prohlížeči otevřete nabídku a zvolte Sdílený obsah.  
![Nabídka nastavení](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Otevřete dialog „Přidat nový sdílený obsah“

Kliknutím na tlačítko „Přidat nový sdílený obsah“ otevřete dialog, ve kterém lze přidat libovolný typ média. Nejprve zvolte typ „Video kanál“.  
![Dialog pro přidání sdíleného obsahu](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Přidejte kanál

Zde můžete přidat svůj kanál.

#### Název

Pole „Název“ je u video kanálů neaktivní, protože kanály poskytují vlastní názvy.

#### Cesta

Pole „Cesta“ určuje strukturu adresářů, kterou UMS zobrazí. Pokud například zadáte `Web/YouTube Channels`, bude kanál umístěn v adresáři `YouTube Channels` uvnitř adresáře `Web`. Obsah si tak můžete uspořádat podle potřeby. To je zvlášť užitečné, pokud odebíráte kanály od různých poskytovatelů a chcete je mít v UMS na jednom místě.

#### Zdroj/URL:

Toto je odkaz na video kanál. Odkaz obvykle končí příponou `.xml`. U YouTube ale můžete přímo zadat URL kanálu, například `https://www.youtube.com/@kurzgesagt`.

#### Autorizované skupiny

Pole "Autorizované skupiny" umožňuje zpřístupnit tento kanál pouze určitým skupinám definovaným v UMS, které jsou spojeny s různými uživateli a/nebo zařízeními. Podrobnosti najdete v části [Zabezpečení a soukromí](../configuration/security-and-privacy.md#link-person-to-renderer).

Po vyplnění požadovaných údajů klikněte na tlačítko „Přidat“.

### Pořadí kanálů

Pokud byl odkaz na kanál platný, pole „Název“ se nyní vyplní. Přetažením kanálu nahoru nebo dolů můžete změnit jeho pořadí.  
![Seznam sdíleného obsahu a změna pořadí](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Uložit změny

Opakováním předchozích kroků můžete přidat nebo upravit další obsah. Až budete se změnami hotovi, klikněte na tlačítko „Uložit“ v dolní části stránky. Nyní je obsah dostupný na vašich zařízeních:  
![Příklad video kanálu ve webovém přehrávači](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)