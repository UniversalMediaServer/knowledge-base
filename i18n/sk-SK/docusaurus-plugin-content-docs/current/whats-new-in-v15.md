---
sidebar_position: 2
---

# Novinky vo verzii 15

## Prehľad

Dva hlavné ciele verzie 15 boli zjednodušiť používateľské rozhranie na základe spätnej väzby a recenzií a uľahčiť používanie používateľských účtov.

Stručný prehľad zmien v tejto verzii:

- **Prepínač používateľov** s podporou **viacerých súčasne prihlásených používateľov**
- **Prepínač režimov** medzi dvoma hlavnými časťami: **Prehrávač** a **Nastavenia**
- Prihlasovanie pomocou **kódu PIN**
- Dynamické **metadáta sérií televíznych seriálov**
- Tlačidlo **informácií o médiu** pri súbore
- Okrem toho sme prepracovali kód oznámení a aktualizácií v reálnom čase, zlepšili správu pamäte a vykonali množstvo ďalších zmien, ktoré zjednodušujú používanie a znižujú počet krokov potrebných na vykonanie požadovanej činnosti.

## Nové funkcie

### Prepínač používateľov

V jednom prehliadači teraz môžete byť súčasne prihlásení do viacerých používateľských účtov a prepínať medzi nimi.

Môžete tiež zapnúť zobrazenie dostupných používateľov na prihlasovacej obrazovke. Z bezpečnostných dôvodov sa toto nastavenie musí výslovne zapnúť, pretože nemusíte chcieť, aby každý videl všetky používateľské účty. K dispozícii je aj medzistupeň: každý účet sa v prehliadači zapamätá až po tom, čo sa doň v danom prehliadači prihlásite.

![Príklad prepínača používateľov](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Prepínač režimov

Webové rozhranie je rozdelené na dve časti: Prehrávač a Nastavenia.

Vďaka menšiemu počtu potrebných kliknutí by malo byť intuitívnejšie a jednoduchšie na používanie.

![Príklad prepínača režimov](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Prihlasovanie pomocou kódu PIN

V nastaveniach servera teraz môžete povoliť prihlasovanie pomocou kódu PIN.

![Príklad obrazovky na zadanie kódu PIN](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamické metadáta sérií

Jednotlivé série televíznych seriálov niekedy majú vlastné údaje, napríklad názvy a obaly. Teraz ich zobrazujeme na stránkach príslušných sérií.

![Príklad zobrazenia série](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Ďalšie zmeny

Úplný zoznam zmien vo verzii 15 nájdete v [úplnom zozname zmien](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Prechod na novú verziu

Pri prechode netreba vykonať žiadne osobitné kroky.

Rovnako ako pri každej veľkej aktualizácii si môžete pred aktualizovaním zálohovať priečinok profilu, ktorý obsahuje konfiguráciu a miestnu databázu. Vďaka tomu sa budete môcť vrátiť k súčasnej verzii. Umiestnenie tohto priečinka nájdete na začiatku protokolu programu. Vyhľadajte riadok `Profile directory: [some page]/UMS`.
