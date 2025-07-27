---
sidebar_position: 2
---

# Co je nového v v15

## Přehled

2 hlavními cíli pro V15 bylo zjednodušení našeho rozhraní, na základě zpětné vazby a recenzí uživatelů a usnadnění používání našich uživatelských účtů.

Rychlý přehled změn v této verzi:

- **Uživatelský přepínač** s podporou **více přihlášených uživatelů**
- **Přepínač režimu** pro změnu mezi dvěma hlavními oblastmi: **Přehrávač** a **Nastavení**
- Přhlášení **PIN kódem**
- Dynamická **metadata TV sezóna**
- Tlačítko **informace o médiu**
- Také přepisuje naše oznámení a kód v reálném čase, lepší správa paměti, a mnoho dalších změn ke zlepšení využitelnosti a snížení počtu opatření potřebných k provedení toho, co chcete.

## Nové funkce

### Přepnutí uživatele

Nyní můžete být přihlášen společně s více uživateli v prohlížeči a přepínat mezi nimi.

Toto nastavení se z bezpečnostních důvodů přihlásí, protože možná nechcete, aby všichni viděli všechny uživatelské účty. Také existuje mezi nastavení, kde jsou uživatelské účty uloženy v prohlížeči po přihlášení prohlížeče na základě účtu.

![Příklad jak upravit nastavení uživatele](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Přepínač režimu

Webové rozhraní bylo rozděleno do dvou oblastí: Přehrávač a nastavení.

To by mělo zvýšit intuitivitu a snazší navigaci snížením počtu kliknutí.

![Příklad změny nastavení modu](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Přhlášení **PIN kódem**

Nyní můžete povolit přihlášení PIN kódu v nastavení serveru.

![Příklad zobrazení PIN kódu](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamická **metadata sezóna**

Sezóny televizních pořadů někdy mají vlastní data jako titulky a titulky obrázků, takže je nyní vidíme na sezonních stránkách.

![Příklad zobrazení sezóny](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Více

Úplný seznam všech změn ve v15 naleznete v [kompletním seznamu změn](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migrace

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
