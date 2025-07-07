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

Nyní si můžete vybrat výchozí strategii pro přehrávače a síťová zařízení. Dříve byla možná pouze jedna strategie - buď všechno povolit, nebo vše odepřít podle seznamu povolených. Nyní můžete ve výchozím nastavení jednotlivá zařízení povolit nebo odepřít v seznamu zakázaných a v seznamu  povolených.

To je užitečné pro sdílené životní situace nebo místní sítě s nízkou důvěrou. Je také užitečný pro ty z vás, které používáte adaptéry powerline pro vaši síť, protože to může mít za následek nežádoucí přístup od sousedů.

![Příklad nastavení sítě povolit preferenci](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Příklad nastavení renderer povolit preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Propojit osobu s přehrávačem

Nyní můžete propojit uživatelské účty s přehrávačem/zařízeními, což vám umožní nezávislé sledování přehrávání. Například pokud máte TV v obývacím pokoji a další ve své ložnici, TV v obývacím pokoji nepotřebuje být ovlivněna tím co sledujete v ložnici.

![Příklad jak přiřadit účet k přehrávači](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Omezit sdílený obsah pro určité skupiny

Nyní si můžete vybrat sdílení adresářů nebo online obsahu s určitými skupinami. Například pokud máte osobu (nebo zařízení přidělené osobě), která je dítětem, můžete je přiřadit ke skupině "Děti", a povolte skupině přístup do adresáře "Rodina", ale ne "Horor" nebo "Pouze pro dospělé". Nebo jim umožněte přístup k webovému kanálu Kurzgesagt, ale ne k historii podcastů.

![Příklad sdílených skupin obsahu](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatary

Lidé mohou mít avatary, aby je na pohled mohli snadněji vidět. Můžete je nastavit na stránce nastavení uživatelů spolu se skupinami uživatelů

![Příklad jak upravit nastavení uživatele](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Přímá integrace TMDB

Nyní můžete propojit svůj TMDB účet s UMS v Obecném nastavení.

To umožňuje upravit metadata založená na výsledcích vyhledávání z TMDB:

![Příklad jak přiřadit účet k přehrávači](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Označit TV série a videa za plně přehraná

Nyní můžete označit TV seriály a videa za plně přehraná, kromě existující schopnosti to udělat s celou složkou

![Příklad jak upravit nastavení uživatele](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### Více

Úplný seznam všech změn ve v14 naleznete v [kompletním seznamu změn](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migrace

Při prvním spuštění V14 se znovu naskenují vaše sdílené složky, což může chvíli trvat. Můžete stále používat server ještě před jeho dokončením, ale může reagovat pomaleji a vrátit neúplné výsledky.

Po aktualizaci, možná budete muset restartovat aplikaci přehrávače zařízení nebo médií, abyste vymazali mezipaměť a správně rozpoznali nová data, která ji odesíláme.

Stejně jako v případě jakékoliv větší aktualizace, pokud chcete mít možnost se před aktualizací vrátit k aktuální verzi, můžete vytvořit zálohu adresáře vašeho profilu, který obsahuje konfiguraci a místní databázi. Umístění tohoto adresáře můžete najít v horní části logů programu. Vyhledat `Adresář profilu: [nějaká stránka]/UMS`.
