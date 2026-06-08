# Vývoj

Tento dokument vysvětluje, jak provést a spustit vlastní změny.

## Stáhněte kód na svůj počítač

GitHub velmi zjednodušuje vývojářům oddělit svou vlastní verzi oficiálních zdrojů UMS a přidávat vlastní vylepšení nebo funkce. GitHub usnadňuje odeslání těchto funkcí jako "Pull Requests" oficiálnímu vývojovému týmu UMS.

- [Nastavte svůj stroj pro vývoj GitHubu] (https://support.github.com/)

- Přejděte na [GitHub UMS repo](https://github.com/universalmediaserver/universalmediaserver) a stiskněte tlačítko `Fork` vpravo nahoře.

- Klonujte nový GitHub repozitář do vašeho lokálního počítače. URL klonu lze vidět
  na hlavní stránce vašeho repozitáře. mělo by to být něco jako (replace YOURNAME with your actual GitHub name):

        git clone git@github.com:YOURNAME/universalmediaserver.git YOURNAME

Nyní máte nový repozitář na vašem lokálním počítači.

## Vývoj s IDE

### [VS kód](https://code.visualstudio.com/)

To je náš doporučený editor, protože je skvělý jak pro Javu, tak pro TypeScript, naše dva hlavní jazyky.

#### Java server

Když otevřete kód, pravděpodobně uvidíte některá doporučení k instalaci rozšíření, například `Extension Pack for Java`. Nainstalujte jej.
Když je toto nainstalováno a nakonfigurováno, můžete spustit Java server kliknutím na horní tlačítko `Run -> Start Debugging`, a znovu načíst pomocí `Run -> Restart Debugging`. Tyto příkazy by měly být dokončeny do 1 sekundy pro rychlý vývojový pracovní postup.

#### Webová rozhraní prohlížeče

Pokud chcete provést změny v našem webovém prohlížeči, budete muset spustit React server, který se bude starat o kompilaci a obsluhu kódu TypeScript.

Ve VS kódu můžete přejít do `Příkazové palety` a filtrovat na `Ladění: Vyberte a spusťte ladění` a vyberte `Spustit webové rozhraní`. Automaticky obnoví změny provedené v souborech Reakt.

Pro manuální pracovní postup můžete přejít do složky `React-client` a spusťte `yarn` ke stažení potřebných závislostí. Pak stačí spustit `yarn dev`, který by měl otevřít webový přehrávač v prohlížeči a automaticky zkompilovat všechny provedené změny kódu.

Pro webové nastavení můžete otevřít `react-client/package.json` a změnit proxy port z `9002` na `9001`. Nyní by `yarn dev` měl sloužit webovému nastavení namísto webového přehrávače.

### [Eclipse](http://www.eclipse.org/downloads/)

- Nainstalujte plugin m2e Eclipse (http://eclipse.org/m2e/)

- Nainstalujte plugin EGit Eclipse (http://eclipse.org/egit/)

- V Eclipse vyberte nabídku "Window > Show View > Git Repositories". Pak
  Vyberte "8Window > Navigation > Show View Menu", choose "Add a Repository".
  Browse for the directory where you cloned your repository and press the
  "Search" button. Select your forked repository and press "OK".
  The repository should appear in the Git Repositories view.

- Press the right mouse button on the repository and select "Import Maven
  Projects" from the menu. Select the project "/pom.xml" and press "Finish".

  Note: if a project with the same name already exists, click "Advanced" and
  set the "Name template" to `[artifactId]-YOURNAME` (replace YOURNAME with
  your GitHub name). Then press "Finish".

You now see the sources in Eclipse, but the project is still missing the "Git"
nature. In other words, it is not tied to the local repository yet. This means
you cannot perform any Git actions from Eclipse yet. Add the missing connection
by sharing the project:

- Press the right mouse button on the newly created project and select the
  menu "Team > Share Project...". Select "Git" and press "Next >".
  Check the checkbox "Use or create repository in parent folder of project"
  and make sure the project is selected. Then press "Finish".

Verify that your project is now under Git control. Press the right mouse
button on the project and under "Team" you now see all options to work with
Git.

UMS můžete vytvořit z Eclipse:

- Create a new run configuration under "Run > Run Configurations...", right
  mouse button on "Maven Build", select "New", Name: `Build UMS`, Goals:
  `package`. Select the tab "JRE" and add the following VM arguments
  `-Xmx1500m -XX:MaxPermSize=256m`. Finally, press the "Apply" button.

Při vývoji budete chtít spustit UMS z Eclipse. Jak na to: →

- Vytvořit novou konfiguraci běhu pod  "Run > Run Configurations...", pravé tlačítko myši "Maven Build", vybrat "New", Name: `Run UMS`, Base
  directory: `${project_loc}`, Goals: "test", Profiles: `run-from-eclipse`.
  Vyberte kartu "JRE" a přidejte VM argumenty `-Xmx1500m -XX:MaxPermSize=256m`.
  Nakonec stisněte tlačítko "Apply"

Nyní jste připraveni začít vývoj!

Když jste spokojeni s vašimi změnami, můžete je odeslat do svého místního
repozitáře z Eclipse pomocí pravého tlačítka myši, "Team > Commit...".

Když jste spokojení se svými příspěvky a chcete je publikovat do vašeho
repozitáře na GitHubu, můžete stisknout pravé tlačítko myši v projektu a
vyberte "Team > Push to Upstream".

## Poslat nám Vaši úpravu

Pokud chcete přispět k projektu UMS, můžete poslat vývojářskému týmu "Pull Request". Viz [Vytvoření požadavku na natažení](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) pro více informací.