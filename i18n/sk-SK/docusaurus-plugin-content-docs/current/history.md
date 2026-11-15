---
sidebar_position: 4
---

# História

## Prehľad

Projekt sme začali v roku 2012 ako fork PS3 Media Server, jedného z najobľúbenejších a najlepšie hodnotených mediálnych serverov tej doby. Náš zakladateľ SubJunk bol aj vývojárom tohto projektu. Vtedy išlo iba o mediálny server DLNA s oveľa jednoduchším grafickým rozhraním a menším počtom funkcií.

Svoju jednoduchú úlohu plnil dobre, no UMS sme odvtedy posunuli novými smermi a výrazne rozšírili.

For an overview of the changes in the latest version, see [What's New in V16](./whats-new-in-v16)

## Predchádzajúce verzie

### v15 (2025-08-23)

The 2 main goals for V15 were to simplify our interface, based on user feedback and reviews, and to make our user accounts easier to use.

A quick overview of the changes in this version is:

- A **user switcher** with support for **multiple logged-in users**
- A **mode switcher** to change between the two major areas: **Player** and **Settings**
- **Pin code** logins
- Dynamic **TV season metadata**
- A file **media info** button
- Also rewrites of our notification and realtime code, improved memory management, and a lot of other changes to improve usability and reduce the number of actions needed to do what you want.

#### User switcher

You can now be logged in with multiple users in a browser at the same time, and switch between them.

You can also enable a setting to display the available users on the login screen. This setting is opt-in for security reasons, because you might not want everyone to see all user accounts. There is also an in-between setting where user accounts are saved in the browser after that browser logs in, on a per-account basis.

![Example of the user switcher](@site/docs/img/whats-new-in-v15-user-switcher.png)

#### Mode switcher

The web interface has been split into two areas: Player and Settings.

This should make the web interface more intuitive and easier navigate by reducing the number of clicks needed.

![Example of the mode switcher](@site/docs/img/whats-new-in-v15-mode-switcher.png)

#### Pin code logins

You can now enable pin code logins in the server settings.

![Example of the pin code view](@site/docs/img/whats-new-in-v15-pin-code.png)

#### Dynamic season metadata

Seasons of TV shows sometimes have their own data like titles and cover images, so now we display that on the season pages.

![Example of season view](@site/docs/img/whats-new-in-v15-season-metadata.png)

### v14 (2022-12-13)

Najväčšie zmeny sa týkali možností riadenia prístupu k obsahu. Zahŕňali vylepšenia používateľských účtov, napríklad avatary a samostatný stav prehrania pre každého používateľa, aj možnosť zobrazovať rôzny obsah jednotlivým zariadeniam a prehrávačom médií.

![Príklad zablokovania prehrávača](@site/docs/img/whats-new-in-v14-block-renderer.png)

Pridali sme tiež možnosť zadať kľúč API služby TMDB na ručné pridávanie a úpravu metadát seriálov a videí a možnosť označiť seriály a filmy ako úplne prehrané.

![Príklad úpravy metadát](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

[Podrobnosti nájdete na stránke s novinkami](https://support.universalmediaserver.com/14.x/whats-new-in-v14)

### v13 (2022-12-13)

Toto vydanie sa sústredilo na 3D a virtuálnu realitu pod vedením prispievateľa threedguru.

![Zdieľaný obsah](@site/docs/img/history-v13.png)

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v12 (2022-11-29)

Táto verzia priniesla úplne prepracované grafické rozhranie využívajúce moderné webové technológie. Veľkú zásluhu na ňom mali SurfaceS a js-kyle.

Zároveň zaviedla overovanie totožnosti, používateľov a skupiny.

![Overovanie totožnosti](@site/docs/img/history-v12-1.png)

Zjednotila sa aj časť Zdieľaný obsah. Miestny a webový obsah, ktoré boli predtým oddelené, sú teraz v jednom zozname.

![Zdieľaný obsah](@site/docs/img/history-v12-2.png)

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=15459)

### v11 (2022-05-27)

Webové rozhranie sme vylepšili v mnohých smeroch: pribudli bohatšie údaje, napríklad logá a pozadia seriálov, filmov a epizód; zlepšilo sa rozpoznávanie zariadení, zisťovanie a obnovovanie stavu siete, prehrávanie a posúvanie videa aj priraďovanie metadát z API. Pribudlo tiež prekódovanie HLS pre všetky zariadenia a ďalšie funkcie.

![Prehľad webového rozhrania](@site/docs/img/history-v11.gif)

Bola to prvá verzia s naším novým významným vývojárom SurfaceS, ktorý do tohto vydania vložil veľa práce.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=15141)

### v10 (2021-01-12)

V tejto verzii sme sa sústredili na užitočnejšie využitie bohatých metadát.

Do knižnice médií sme pridali nové priečinky vrátane „Filtrovať podľa informácií“, ktorý umožňuje prehliadať videá podľa herca, žánru, krajiny, režiséra, hodnotenia IMDb a dátumu vydania.

Webové rozhranie získalo ďalšie funkcie: kliknutím napríklad na herca alebo žáner videa možno nájsť ďalší obsah zodpovedajúci tejto osobe, žánru alebo iným metadátam. Na úvodnú stránku webového rozhrania sme pridali rýchle odkazy, napríklad Nedávno pridané, Rozpozerané a Najviac prehrávané.

Ak sú všetky epizódy seriálu úplne prehrané, jeho miniatúra teraz zobrazuje príslušnú ikonu:

![Úplne prehraný seriál](@site/docs/img/history-v10.png)

Do vývojového tímu sme privítali aj ik666, ktorý pridal nové API na integrácie a výrazne zlepšil podporu UPnP.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=14535)

### v9 (2019-09-06)

Javu už netreba inštalovať samostatne!

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=13765)

### v8 (2019-03-29)

Táto verzia zjednodušila prehrávanie streamovaného webového obsahu, napríklad videopodcastov, podcastov, internetového rádia a kanálov YouTube, pridaním karty Zdieľaný obsah.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=13523)

### v7 (2018-03-27)

Táto verzia sa zamerala na dynamické prehliadanie médií prostredníctvom priečinka Knižnica médií.

Pridali sme rozpoznávanie filmov a seriálov aj sledovanie priečinkov, aby sa nové súbory v zdieľaných priečinkoch zisťovali automaticky.

Približne v tom čase sa k nám pridal aj moderátor fóra mik_s, ktorý tu odvádza skvelú prácu!

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=12407)

### v6 (2016-01-30)

Pridali sme dlho očakávanú funkciu „Akcia po úplnom prehraní“ s ikonami na miniatúrach a správou súborov.

Do tímu prišiel aj Nadahar, ktorý zlepšil stabilitu, protokolovanie a jazykovú podporu.

Vďaka jeho integrácii služby Crowdin prispelo k našim 40 jazykovým verziám už 523 ľudí!

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=6037)

### v5 (2015-01-25)

V tomto vydaní sme pridali podporu pripojenia a prehrávania cez UPnP, takže používatelia mohli pripojiť oveľa viac zariadení. Veľkú zásluhu na tom mal skeptical.

Pridali sme aj prvú podporu metadát IMDb, hoci sme ešte nemali vlastné API. Za túto možnosť ďakujeme OpenSubtitles a ospravedlňujeme sa za množstvo požiadaviek, ktoré sme vtedy odosielali!

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=2901)

### v4 (2014-07-25)

Pridali sme prvé webové rozhranie a komunita UMS tak konečne získala prístup k obsahu cez webové prehliadače.

Pridali sme aj podporu odosielania médií do iných zariadení (casting) a prekódovania do AAC.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=2032)

### v3 (2013-11-01)

Verzia 3 bola veľkým vydaním. Množstvom vlastných funkcií sme sa začali výrazne odlišovať od PS3MS.

Pridali sme priečinky Nové médiá a Nedávno prehrané, pokračovanie v prehrávaní, úpravu zobrazovaných názvov súborov a úvodného sprievodcu nastavením.

K tímu sa pridal aj valib, ktorý prispieva dodnes!

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=1295)

### v2 (2012-10-31)

Vo verzii 2 pribudla karta Správa doplnkov prepojená s našou centrálnou databázou doplnkov. Opäť sme ako prví predstavili novú funkciu: živé titulky, ktoré možno priebežne streamovať priamo z prehrávača.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=325)

### v1 (2012-05-31)

Tieto rané verzie sa zameriavali na „univerzálnosť“ nového programu a pridávali podporu desiatok nových zariadení.

Boli sme aj prvým mediálnym serverom s podporou vyhladzovania pohybu pomocou interpolácie snímok. Táto funkcia je dnes bežnou súčasťou televízorov, no vtedy ju mali iba nové špičkové modely.

Už počas prvých dní sa k nám pridal aj náš druhý vývojár SharkHunter.

[Podrobnosti nájdete v oznámení o vydaní](https://www.universalmediaserver.com/forum/viewtopic.php?t=3)

### PS3 Media Server (2008)

Projekt, ktorým sa to všetko začalo! Sme forkom projektu, ktorý v roku 2008 založil shagrath. Krátko nato sa k nemu pridal SubJunk, zakladateľ Universal Media Server.

PS3 bola výborným zariadením na prehrávanie médií, no nepodporovala veľa videoformátov. PS3 Media Server preto používal množstvo postupov, aby na nej bolo možné prehrať prakticky akékoľvek video. Rovnaký prístup sme uplatnili pri všetkých zariadeniach a prehrávačoch.

![PS3 Media Server](@site/docs/img/history-pms.png)
