# Vývoj

Tento dokument vysvětluje, jak provádět vlastní změny a spouštět upravený program.

## Vytvoření vlastní kopie repozitáře a stažení kódu

GitHub vývojářům usnadňuje vytvoření vlastní kopie (forku) oficiálních zdrojových kódů UMS, do které mohou přidávat vlastní úpravy a funkce. GitHub usnadňuje odeslání těchto funkcí jako "Pull Requests" oficiálnímu vývojovému týmu UMS.

- [Připravte svůj počítač pro vývoj pomocí GitHubu](https://support.github.com/)

- Přejděte na [GitHub UMS repo](https://github.com/universalmediaserver/universalmediaserver) a stiskněte tlačítko `Fork` vpravo nahoře.

- Klonujte nový GitHub repozitář do vašeho lokálního počítače. URL pro klonování najdete na hlavní stránce svého repozitáře. Měla by vypadat přibližně takto (YOURNAME nahraďte svým uživatelským jménem na GitHubu):

        git clone git@github.com:YOURNAME/universalmediaserver.git YOURNAME

Nyní máte nový repozitář na vašem lokálním počítači.

## Vývoj s IDE

### [VS Code](https://code.visualstudio.com/)

To je náš doporučený editor, protože je skvělý jak pro Javu, tak pro TypeScript, naše dva hlavní jazyky.

#### Java server

Když otevřete kód, pravděpodobně uvidíte některá doporučení k instalaci rozšíření, například `Extension Pack for Java`. Nainstalujte doporučená rozšíření.
Po instalaci a nastavení můžete spustit server v Javě volbou `Run -> Start Debugging` v horní nabídce a znovu jej načíst volbou `Run -> Restart Debugging`. Tyto příkazy by se měly dokončit do jedné sekundy, aby byl vývoj rychlý.

#### Webová uživatelská rozhraní

Pokud chcete upravovat naše webová rozhraní, musíte spustit také server Reactu, který zajišťuje kompilaci a poskytování kódu v TypeScriptu.

Ve VS Code otevřete `Command Palette`, vyhledejte `Debug: Select and Start Debugging` a vyberte `Launch web interface`. Změny v souborech Reactu se budou automaticky znovu načítat.

Při ručním postupu přejděte do složky `react-client` a spusťte `yarn`, čímž stáhnete potřebné závislosti. Pak stačí spustit `yarn dev`, který by měl otevřít webový přehrávač v prohlížeči a automaticky zkompilovat všechny provedené změny kódu.

Pro webové nastavení můžete otevřít `react-client/package.json` a změnit proxy port z `9002` na `9001`. Příkaz `yarn dev` by nyní měl zpřístupnit webové nastavení místo webového přehrávače.

### [Eclipse](http://www.eclipse.org/downloads/)

- Nainstalujte plugin m2e Eclipse (http://eclipse.org/m2e/)

- Nainstalujte plugin EGit Eclipse (http://eclipse.org/egit/)

- V Eclipse vyberte nabídku "Window > Show View > Git Repositories". Poté zvolte „Window > Navigation > Show View Menu“ a vyberte „Add a Repository“.
  Vyhledejte adresář, do kterého jste naklonovali repozitář, a stiskněte tlačítko „Search“. Vyberte svůj repozitář a stiskněte "OK".
  Repozitář by se měl objevit v panelu Git Repositories.

- Klikněte pravým tlačítkem na repozitář a z nabídky zvolte „Import Maven Projects“. Vyberte projekt "/pom.xml" a stiskněte "Finish".

  Poznámka: pokud již existuje projekt stejného názvu, klikněte na „Advanced“ a nastavte „Name template“ na `[artifactId]-YOURNAME`. YOURNAME nahraďte svým uživatelským jménem na GitHubu. Poté stiskněte "Finish".

V Eclipse nyní vidíte zdrojové kódy, ale projekt ještě nemá přiřazený typ „Git“. Jinými slovy, zatím není propojený s místním repozitářem. Z Eclipse proto zatím nemůžete provádět operace Gitu. Chybějící propojení doplňte sdílením projektu:

- Klikněte pravým tlačítkem na nově vytvořený projekt a zvolte „Team > Share Project...“. Zvolte "Git" a stiskněte "Next >".
  Zaškrtněte políčko "Use or create repository in parent folder of project" a ujistěte se, že je vybrán projekt. Poté stiskněte "Finish".

Ověřte, že váš projekt je nyní pod kontrolou Gitu. Klikněte pravým tlačítkem na projekt. V nabídce „Team“ by nyní měly být dostupné všechny možnosti pro práci s Gitem.

UMS můžete sestavit přímo z Eclipse:

- V nabídce „Run > Run Configurations...“ vytvořte novou konfiguraci: klikněte pravým tlačítkem na „Maven Build“, zvolte „New“, do pole „Name“ zadejte `Build UMS` a do pole „Goals“ zadejte `package`. Vyberte kartu "JRE" a přidejte následující VM argumenty
  `-Xmx1500m -XX:MaxPermSize=256m`. Nakonec stiskněte tlačítko „Apply“.

Při vývoji budete chtít spustit UMS z Eclipse. Postupujte takto:

- V nabídce „Run > Run Configurations...“ vytvořte novou konfiguraci: klikněte pravým tlačítkem na „Maven Build“ a zvolte „New“. Nastavte „Name“ na `Run UMS`, „Base directory“ na `${project_loc}`, „Goals“ na „test“ a „Profiles“ na `run-from-eclipse`.
  Vyberte kartu "JRE" a přidejte VM argumenty `-Xmx1500m -XX:MaxPermSize=256m`.
  Nakonec stiskněte tlačítko „Apply“.

Nyní můžete začít vyvíjet!

Až budete se změnami spokojeni, můžete je z Eclipse zaznamenat jako commit do místního repozitáře: klikněte pravým tlačítkem a zvolte „Team > Commit...“.

Až budete chtít své commity zveřejnit v repozitáři na GitHubu, klikněte pravým tlačítkem na projekt a zvolte „Team > Push to Upstream“.

## Jak nám přispět svými změnami

Pokud chcete přispět k projektu UMS, můžete poslat vývojářskému týmu "Pull Request". Podrobnosti najdete v návodu [Vytvoření pull requestu](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).