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
  Procházejte adresář, kde jste naklonovali váš repositář a stiskněte tlačítko
  "Search". Vyberte svůj repozitář a stiskněte "OK".
  Repozitář by se měl zobrazit v zobrazení repozitářů.

- Stiskněte pravé tlačítko myši v repozitáři a vyberte z nabídky "Importovat Maven
  Projekty". Vyberte projekt "/pom.xml" a stiskněte "Finish".

  Poznámka: pokud projekt se stejným názvem již existuje, klikněte na "Advanced" a
  nastavte "Name template" na `[artifactId]-YOURNAME` (relplace YOURNAME
  ). Poté stiskněte "Finish".

Nyní vidíte zdroje v Eclipse, ale projektu stále chybí "Git"
. Jinými slovy, ještě není vázán na místní úložiště. To znamená, že
zatím nemůžete provést žádnou Git akci z Eclipse. Přidejte chybějící spojení
sdílením projektu:

- Stiskněte pravé tlačítko myši v nově vytvořeném projektu a vyberte nabídku
  "Team > Share project...". Zvolte "Git" a stiskněte "Next >".
  Zaškrtněte políčko "Use or create repository in parent folder of project" a ujistěte se, že je vybrán projekt. Poté stiskněte "Finish".

Ověřte, že váš projekt je nyní pod kontrolou Gitu. Stiskněte pravé tlačítko myši
na projektu a pod "Team" nyní vidíte všechny možnosti pracovat s
Git.

UMS můžete vytvořit z Eclipse:

- Vytvořte novou konfiguraci běhu pod "Run > Run Configurations...", pravé
  tlačítko myši na "Maven Build", vyberte "New", Name: `Build UMS`, Goals:
  `package`. Vyberte kartu "JRE" a přidejte následující VM argumenty
  `-Xmx1500m -XX:MaxPermSize=256m`. Nakonec stisněte tlačítko "Apply"

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