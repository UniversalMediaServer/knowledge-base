# Vývoj

Tento dokument vysvetľuje, ako vytvárať a spúšťať vlastné úpravy.

## Vytvorenie forku a získanie kódu do počítača

GitHub vývojárom uľahčuje vytvorenie vlastného forku oficiálnych zdrojových kódov UMS, do ktorého môžu pridávať úpravy a funkcie. Tieto zmeny potom možno prostredníctvom GitHubu predložiť oficiálnemu vývojovému tímu UMS ako návrhy na začlenenie zmien, označované „Pull Request“.

- [Pripravte počítač na vývoj s GitHubom](https://support.github.com/)

- Otvorte [repozitár UMS na GitHube](https://github.com/universalmediaserver/universalmediaserver) a vpravo hore kliknite na tlačidlo `Fork`.

- Naklonujte nový repozitár z GitHubu do svojho počítača. Adresu na klonovanie nájdete na hlavnej stránke svojho repozitára. Príkaz by mal vyzerať približne takto. YOURNAME nahraďte svojím používateľským menom na GitHube:

        git clone git@github.com:YOURNAME/universalmediaserver.git YOURNAME

Nový repozitár teraz máte v svojom počítači.

## Vývoj v integrovaných vývojových prostrediach

### [VS Code](https://code.visualstudio.com/)

Tento editor odporúčame, pretože veľmi dobre podporuje Javu aj TypeScript, naše dva hlavné programovacie jazyky.

#### Server v Jave

Po otvorení kódu sa pravdepodobne zobrazia odporúčania na inštaláciu rozšírení, napríklad `Extension Pack for Java`. Nainštalujte odporúčané rozšírenia.
Po ich inštalácii a nastavení môžete server v Jave spustiť pomocou ponuky `Run -> Start Debugging` a znova načítať pomocou `Run -> Restart Debugging`. Tieto príkazy by sa mali vykonať do jednej sekundy, čo umožňuje rýchly vývoj.

#### Rozhrania pre webový prehliadač

Ak chcete upravovať webové rozhrania, musíte spustiť aj server React, ktorý sa postará o kompiláciu a poskytovanie kódu TypeScript.

Vo VS Code otvorte `Command Palette`, vyhľadajte `Debug: Select and Start Debugging` a vyberte `Launch web interface`. Zmeny v súboroch React sa budú automaticky načítavať.

Pri ručnom postupe prejdite do priečinka `react-client` a spustením `yarn` stiahnite potrebné závislosti. Potom spustite `yarn dev`. Mal by otvoriť webový prehrávač v prehliadači a automaticky kompilovať zmeny kódu.

Pre webové rozhranie nastavení otvorte `react-client/package.json` a zmeňte port proxy z `9002` na `9001`. Príkaz `yarn dev` by teraz mal poskytovať webové nastavenia namiesto webového prehrávača.

### [Eclipse](http://www.eclipse.org/downloads/)

- Nainštalujte doplnok m2e pre Eclipse (http://eclipse.org/m2e/).

- Nainštalujte doplnok EGit pre Eclipse (http://eclipse.org/egit/).

- V Eclipse vyberte ponuku „Window > Show View > Git Repositories“. Potom vyberte „Window > Navigation > Show View Menu“ a zvoľte „Add a Repository“.
  Vyhľadajte priečinok, do ktorého ste repozitár naklonovali, a kliknite na „Search“. Vyberte svoj fork repozitára a kliknite na „OK“.
  Repozitár by sa mal zobraziť v pohľade Git Repositories.

- Kliknite na repozitár pravým tlačidlom a z ponuky vyberte „Import Maven Projects“. Vyberte projekt „/pom.xml“ a kliknite na „Finish“.

  Poznámka: ak už projekt s rovnakým názvom existuje, kliknite na „Advanced“ a nastavte „Name template“ na `[artifactId]-YOURNAME`. YOURNAME nahraďte svojím používateľským menom na GitHube. Potom kliknite na „Finish“.

Zdrojové kódy už vidíte v Eclipse, ale projektu ešte chýba podpora Gitu. Inými slovami, ešte nie je prepojený s miestnym repozitárom. Preto zatiaľ nemožno z Eclipse vykonávať operácie Gitu. Chýbajúce prepojenie pridajte zdieľaním projektu:

- Kliknite pravým tlačidlom na novovytvorený projekt a vyberte „Team > Share Project...“. Vyberte „Git“ a kliknite na „Next >“.
  Začiarknite „Use or create repository in parent folder of project“ a skontrolujte, že je projekt vybraný. Potom kliknite na „Finish“.

Overte, že projekt je teraz spravovaný Gitom. Po kliknutí pravým tlačidlom na projekt by sa v ponuke „Team“ mali zobrazovať všetky možnosti práce s Gitom.

UMS môžete zostaviť priamo z Eclipse:

- V ponuke „Run > Run Configurations...“ vytvorte novú konfiguráciu: pravým tlačidlom kliknite na „Maven Build“ a vyberte „New“. Ako Name zadajte `Build UMS` a ako Goals `package`. Vyberte kartu „JRE“ a pridajte nasledujúce argumenty virtuálneho stroja: `-Xmx1500m -XX:MaxPermSize=256m`. Nakoniec kliknite na tlačidlo „Apply“.

Počas vývoja budete chcieť spúšťať UMS priamo z Eclipse. Postup je nasledujúci:

- V ponuke „Run > Run Configurations...“ vytvorte novú konfiguráciu: pravým tlačidlom kliknite na „Maven Build“ a vyberte „New“. Nastavte Name na `Run UMS`, Base directory na `${project_loc}`, Goals na „test“ a Profiles na `run-from-eclipse`.
  Vyberte kartu „JRE“ a pridajte argumenty virtuálneho stroja `-Xmx1500m -XX:MaxPermSize=256m`.
  Nakoniec kliknite na tlačidlo „Apply“.

Teraz môžete začať vyvíjať!

Keď ste s úpravami spokojní, môžete ich v Eclipse zaznamenať do miestneho repozitára kliknutím pravým tlačidlom a výberom „Team > Commit...“.

Keď chcete svoje commity zverejniť v repozitári na GitHube, kliknite pravým tlačidlom na projekt a vyberte „Team > Push to Upstream“.

## Prispenie svojou zmenou do projektu

Ak chcete prispieť do projektu UMS, môžete vývojovému tímu poslať návrh na začlenenie zmien („Pull Request“). Podrobnosti nájdete v návode [Vytvorenie pull requestu](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).