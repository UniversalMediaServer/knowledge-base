# Rozvoj

Tento dokument vysvětluje, jak provést a spustit vlastní změny.

## Stáhněte kód na svůj počítač

GitHub velmi zjednodušuje vývojářům oddělit svou vlastní verzi oficiálních zdrojů UMS a přidávat vlastní vylepšení nebo funkce. GitHub usnadňuje odeslání těchto funkcí jako "Pull Requests" oficiálnímu vývojovému týmu UMS.

- [Nastavte svůj stroj pro vývoj GitHubu] (https://support.github.com/)

- Přejděte na [GitHub UMS repo](https://github.com/universalmediaserver/universalmediaserver) a stiskněte tlačítko `Fork` vpravo nahoře.

- Klonujte nový GitHub repozitář do vašeho lokálního počítače. URL klonu lze vidět
  na hlavní stránce vašeho repozitáře. It should be something like this
  (replace YOURNAME with your actual GitHub name):

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

In VS Code, you can go into the `Command Palette` and filter on `Debug: Select and Start Debugging` and select `Launch web interface`. It will automatically reload any changes you make to the React files.

For a manual workflow, you can go into the `react-client` folder and run `yarn` to download the necessary dependencies. Then just run `yarn dev` which should open the web player in the browser and automatically compile any code changes you make.

For the web settings interface, you can open `react-client/package.json` and change the proxy port from `9002` to `9001`. Now `yarn dev` should serve the web settings instead of web player.

### [Eclipse](http://www.eclipse.org/downloads/)

- Install the m2e Eclipse plugin (http://eclipse.org/m2e/)

- Install the EGit Eclipse plugin (http://eclipse.org/egit/)

- In Eclipse, select the menu "Window > Show View > Git Repositories". Then
  select "Window > Navigation > Show View Menu", choose "Add a Repository".
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

You can build UMS from Eclipse:

- Create a new run configuration under "Run > Run Configurations...", right
  mouse button on "Maven Build", select "New", Name: `Build UMS`, Goals:
  `package`. Select the tab "JRE" and add the following VM arguments
  `-Xmx1500m -XX:MaxPermSize=256m`. Finally, press the "Apply" button.

You will want to run UMS from Eclipse while developing. This is how you do it:

- Create a new run configuration under "Run > Run Configurations...", right
  mouse button on "Maven Build", select "New", Name: `Run UMS`, Base
  directory: `${project_loc}`, Goals: "test", Profiles: `run-from-eclipse`.
  Select the tab "JRE" and add VM arguments `-Xmx1500m -XX:MaxPermSize=256m`.
  Finally, press the "Apply" button.

You are now ready to start developing!

When you are happy with your changes, you can commit them to your local
repository from Eclipse using right mouse button, "Team > Commit...".

When you are satisfied with your commits and want to publish them to your
repository at GitHub, you can press the right mouse button on the project and
select "Team > Push to Upstream".

## Contributing your change back to us

If you would like to contribute to the UMS project, you can send a "Pull Request" to the development team. See [Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) for more details.