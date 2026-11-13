---
sidebar_position: 2
---

# Co je nového ve verzi 15

## Přehled

Dvěma hlavními cíli verze 15 bylo zjednodušit rozhraní na základě zpětné vazby a recenzí uživatelů a usnadnit používání uživatelských účtů.

Rychlý přehled změn v této verzi:

- **Přepínač uživatelů** s podporou **více současně přihlášených účtů**
- **Přepínač režimu** pro změnu mezi dvěma hlavními oblastmi: **Přehrávač** a **Nastavení**
- Přihlašování pomocí **kódu PIN**
- Dynamická **metadata řad seriálů**
- Tlačítko **informace o médiu**
- Dále jsme přepracovali kód oznámení a aktualizací v reálném čase, zlepšili správu paměti a provedli mnoho dalších změn, které usnadňují používání a snižují počet potřebných kroků.

## Nové funkce

### Přepínač uživatelů

V jednom prohlížeči nyní můžete být současně přihlášeni k více uživatelským účtům a přepínat mezi nimi.

Můžete také zapnout zobrazení dostupných uživatelů na přihlašovací obrazovce. Tuto možnost musíte z bezpečnostních důvodů výslovně zapnout, protože možná nechcete, aby každý viděl všechny uživatelské účty. K dispozici je také kompromisní nastavení: prohlížeč si zapamatuje jednotlivé uživatelské účty až poté, co se v něm k nim přihlásíte.

![Příklad přepínače uživatelů](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Přepínač režimu

Webové rozhraní bylo rozděleno do dvou částí: Přehrávač a Nastavení.

Díky menšímu počtu potřebných kliknutí by mělo být ovládání webového rozhraní intuitivnější a přehlednější.

![Příklad přepínače režimů](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Přihlašování pomocí kódu PIN

V nastavení serveru nyní můžete povolit přihlašování pomocí kódu PIN.

![Příklad zobrazení PIN kódu](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamická metadata řad seriálů

Jednotlivé řady seriálů někdy mají vlastní údaje, například názvy a obrázky obalů. Tyto údaje nyní zobrazujeme na stránkách příslušných řad.

![Příklad zobrazení řady seriálu](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Více

Úplný seznam všech změn ve v15 naleznete v [kompletním seznamu změn](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migrace

Přechod nevyžaduje žádné zvláštní migrační kroky.

Stejně jako před každou významnou aktualizací si můžete zálohovat adresář profilu, který obsahuje konfiguraci a místní databázi. Budete se tak moci vrátit k dosavadní verzi. Umístění tohoto adresáře najdete poblíž začátku protokolu programu. Hledejte `Profile directory: [some page]/UMS`.
