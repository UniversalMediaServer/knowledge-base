---
sidebar_position: 2
---

# Co je nového ve v14

## Přehled

V14 obsahuje nové významné funkce na základě toho, o co naši uživatelé požádali.

Největší změny zahrnují schopnost kontrolovat přístup k vašemu obsahu. To zahrnuje vylepšení uživatelských účtů, jako jsou avatary a stav přehrávání podle uživatele, stejně jako možnost zobrazit jiný obsah na různých zařízeních.

Došlo také k mnoha aktualizacím webového nastavení a rozhraní přehrávače, včetně přidání možnosti označovat sady souborů (např. . TV série) jako plně přehrávaná a automatická detekce nastavení režimu tmavý/světlý režim.

Využili jsme také příležitosti k upgradu hlavních verzí některých našich závislostí, včetně [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis. ourceforge.io/Download), [Yarn v4](https://yarnpkg.com/) a generátor této znalostní základny, [Docusaurus v3](https://docusaurus.io/).

A konečně, vyhodili jsme stovky opravných položek a zlepšení výkonnosti, a změnili spoustu kódu, na kterém bude snazší pracovat, stejně jako vylepšili naše testovací rámce, aby se zabránilo budoucím chybám.

## Nové funkce

### Blokovat/povolit přehrávače a síťová zařízení

Nyní můžete blokovat a povolit přístup na základě přehrávače nebo síťového zařízení z domovské obrazovky v oblasti nastavení.

![Příklad jak zablokovat přehrávač](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Ve výchozím nastavení povolit nebo blokovat přehrávače nebo síťová zařízení:

Nyní si můžete vybrat výchozí strategii pro přehrávače a síťová zařízení. Dříve byla možná pouze jedna strategie - buď všechno dovolit, nebo vše popírat podle seznamu povolených. Nyní můžete ve výchozím nastavení povolit nebo odepřít, s denylisty a povolenými seznamy pro úplné ovládání.

Díky tomu je UMS mnohem pružnější pro sdílené životní situace nebo široké/malé místní sítě. Je také užitečný pro ty z vás, které používáte adaptéry powerline pro vaši síť, protože to může mít za následek nežádoucí přístup od sousedů.

![Příklad nastavení sítě povolit preferenci](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Příklad nastavení renderer povolit preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Propojit osobu s přehrávačem

Nyní můžete propojit uživatelské účty s přehrávačem/zařízeními, což vám umožní nezávislé sledování přehrávání. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatary

Lidé mohou mít avatary, aby je na pohled mohli snadněji vidět. Můžete je nastavit na stránce nastavení uživatelů spolu se skupinami uživatelů

![Příklad jak upravit nastavení uživatele](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Přímá integrace TMDB

You can now link your TMDB account with UMS in the General Settings area.

Doing this allows you to edit metadata based on search results from TMDB:

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Mark TV series and videos as fully played

Now you can mark TV series and videos as fully played, in addition to the existing ability to do it by folder

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### Více

Úplný seznam všech změn ve v14 naleznete v [kompletním seznamu změn](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migrace

Při prvním spuštění V14 se znovu naskenují vaše sdílené složky, což může chvíli trvat. Můžete stále používat server ještě před jeho dokončením, ale může reagovat pomaleji a vrátit neúplné výsledky.

Po aktualizaci, možná budete muset restartovat aplikaci přehrávače zařízení nebo médií, abyste vymazali mezipaměť a správně rozpoznali nová data, která ji odesíláme.

Stejně jako v případě jakékoliv větší aktualizace, pokud chcete mít možnost se před aktualizací vrátit k aktuální verzi, můžete vytvořit zálohu adresáře vašeho profilu, který obsahuje konfiguraci a místní databázi. Umístění tohoto adresáře můžete najít v horní části logů programu. Vyhledat `Adresář profilu: [nějaká stránka]/UMS`.
