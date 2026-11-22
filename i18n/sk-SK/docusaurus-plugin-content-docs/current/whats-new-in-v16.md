---
sidebar_position: 2
---

# Čo je nové vo verzii 16

## Prehľad

Hlavné ciele verzie 16 boli uľahčiť pokračovanie v sledovaní televíznych seriálov a zlepšiť podporu internetového rádia.

Stručný prehľad zmien v tejto verzii:
- Do knižnice médií bol pridaný priečinok **Pokračovať v sledovaní**.
- Pridaná podpora **udalostí a zoznamov skladieb [DI.fm (AudioAddict)](https://www.di.fm/)**
- Pridaná podpora služby **[RadioBrowser](https://www.radio-browser.info/)** na vyhľadávanie rozhlasových staníc a ich pridávanie do zoznamov skladieb na serveri.
- Pridaná podpora **zapojenia s troma zariadeniami**
- Pridaná podpora **označovania obľúbených položiek a hodnotenia** a **zmeny obrázkov obalov** pri všetkých typoch médií (napríklad videách, zoznamoch skladieb a priečinkoch) prostredníctvom prehrávacích zariadení a aplikácií na prehrávanie médií (predtým to bolo možné iba pri zvukových súboroch)
- Pridaná podpora **informovania prehrávačov** o zmenách konkrétnych súborov a kontajnerov
- Spúšťanie zrýchlené približne o **95 %** a zlepšená odozva servera počas skenovania súborov
- Zlepšená **odozva servera** počas skenovania súborov
- Modernizovaný zdrojový kód prechodom na nové hlavné verzie **8 závislostí**

## Nové funkcie

### Priečinok Pokračovať v sledovaní

Zobrazuje všetky rozpozerané videá aj nasledujúce epizódy rozpozeraných seriálov, zoradené od naposledy prehrávaných.

Obsah tohto priečinka aj vnorených priečinkov jednotlivých seriálov sa priebežne mení.

Ak ste už pozreli všetky dostupné epizódy seriálu, jeho priečinok zmizne. Keď pribudne nová epizóda, priečinok sa znova objaví.

Prvou položkou v priečinku každého seriálu je epizóda, pri ktorej ste so sledovaním skončili. Ak máte rozpozeranú epizódu S01E02, zobrazí sa táto epizóda. Po jej úplnom prehraní sa zobrazí S01E03, ak je k dispozícii.

![Video zobrazujúce priečinok Pokračovať v sledovaní](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Pridaná podpora udalostí a zoznamov skladieb [DI.fm (AudioAddict)](https://www.di.fm/)

Podrobnosti nájdete v dokumentácii k službe [Audio Addict](./configuration/audio-addict) a [internetovému rádiu](./configuration/internet-radio) a v nasledujúcom videu s ukážkou použitia [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhľad videa o DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### RadioBrowser

Pridaná podpora služby [RadioBrowser](https://www.radio-browser.info/) na vyhľadávanie rozhlasových staníc a ich pridávanie do zoznamov skladieb na serveri. Vyhľadávať možno podľa týchto údajov:
- Názov stanice
- Krajina
- Jazyk
- Žáner

Podrobnosti nájdete v dokumentácii k službe [RadioBrowser](./configuration/radiobrowser) a v nasledujúcom videu s ukážkou použitia [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhľad videa o podpore služby RadioBrowser](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### Zapojenie s troma zariadeniami

Pridaná podpora režimu s troma zariadeniami (3-box), v ktorom sa na prehrávaní podieľajú:
1. Server (UMS)
2. Ovládací bod (často telefón alebo webové rozhranie)
3. Prehrávacie zariadenie alebo aplikácia na prehrávanie médií

Podrobnosti nájdete v časti [Zapojenia s dvoma a troma zariadeniami](./configuration/control-point-setups).

### Označovanie obľúbených položiek a hodnotenie prostredníctvom prehrávačov

Pridaná podpora označovania obľúbených položiek a hodnotenia pri všetkých typoch médií (napríklad videách, zoznamoch skladieb a priečinkoch) prostredníctvom prehrávacích zariadení a aplikácií na prehrávanie médií (predtým to bolo možné iba pri zvukových súboroch)

Ďalšie informácie nájdete v nasledujúcom videu s ukážkou použitia [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhľad videa o označovaní obľúbených položiek a hodnotení](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Zmena obrázkov obalov prostredníctvom prehrávačov

Pridaná podpora zmeny obrázkov obalov pri všetkých typoch médií (napríklad videách, zoznamoch skladieb a priečinkoch) prostredníctvom prehrávacích zariadení a aplikácií na prehrávanie médií (predtým to bolo možné iba pri zvukových súboroch)

Ďalšie informácie nájdete v nasledujúcom videu s ukážkou použitia [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhľad videa o zmene obrázkov obalov](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Zmeny narúšajúce spätnú kompatibilitu

Už nepodporujeme 32-bitové architektúry x86 a i586. Preto už nevydávame tieto štyri varianty: Linux ARMel, Linux ARMhf, Linux x86 a Windows x86.

Zálohy vytvorené pred verziou 16 nie sú kompatibilné s verziou 16 a novšími. Ak si pravidelne vytvárate zálohy, uchovajte zálohu z verzie 15 oddelene od záloh verzie 16, kým si neoveríte, že automatická migrácia prebehla správne.

## Migrácia

Prechod nevyžaduje žiadne osobitné migračné kroky.

Rovnako ako pred každou významnou aktualizáciou si môžete zálohovať priečinok profilu, ktorý obsahuje konfiguráciu a miestnu databázu. Budete sa tak môcť vrátiť k doterajšej verzii. Umiestnenie tohto priečinka nájdete blízko začiatku protokolu programu. Hľadajte `Profile directory: [some page]/UMS`.
