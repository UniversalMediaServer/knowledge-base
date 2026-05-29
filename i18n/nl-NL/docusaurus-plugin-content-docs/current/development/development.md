# Ontwikkeling

Dit document legt uit hoe u uw eigen wijzigingen kan maken en uitvoeren.

## Forking de code naar je machine

GitHub maakt het heel eenvoudig voor ontwikkelaars om hun eigen versie van de officiële UMS-bronnen te forken om hun eigen aanpassingen of functies toe te voegen. GitHub vergemakkelijkt het indienen van deze functies als "Pull Requests" aan het officiële UMS ontwikkelteam.

- [Uw machine instellen voor GitHub ontwikkeling](https://support.github.com/)

- Ga naar [de GitHub UMS repo](https://github.com/universalmediaserver/universalmediaserver) en druk op de `Fork` knop rechtsboven.

- Kloon de nieuwe GitHub repo naar je lokale machine. De URL van de kloon kan gezien worden
  op de hoofdpagina van uw opslagplaats. Het zou zoiets moeten zijn als dit
  (vervang YOURNAME met je echte GitHub naam):

        git clone git@github.com:YOURNAME/universalmediaserver.git YOURNAME

Je hebt nu de nieuwe repository op je lokale machine.

## Ontwikkeling met IDEs

### [VS Code](https://code.visualstudio.com/)

Dit is onze aanbevolen editor omdat het geweldig is in het verwerken van zowel Java als TypeScript, onze twee hoofdtalen.

#### Java server

Wanneer je de code hebt geopend, zie je waarschijnlijk enkele aanbevelingen voor Extensies om te installeren, zoals het `Extensie Pack voor Java`. Installeer deze/ze.
Wanneer dat is geïnstalleerd en geconfigureerd, kunt u de Java server uitvoeren door op de top `Run -> Start Debugging` te klikken, en herlaad het met `Run -> Herstart Debugging`. Deze commando's moeten binnen 1 seconde voltooid zijn, voor een snelle ontwikkeling workflow.

#### Webbrowser interfaces

Als u wijzigingen wilt aanbrengen in onze webbrowserinterfaces, moet u ook de React server runnen. welke zal zorgen voor het compileren en bedienen van de TypeScript code.

In VS Code kun je naar de `Command Palette` gaan en filteren op `Debug: Selecteer en Start Debugging` en selecteer `Start web interface`. Het zal alle wijzigingen die u aanbrengt in de React bestanden automatisch herladen.

Voor een handmatige workflow, kunt u naar de `react-client` map gaan en `yarn` starten om de benodigde afhankelijkheden te downloaden. Voer dan `yarn dev` uit die de webspeler in de browser moet openen en automatisch codewijzigingen moet compileren.

Voor de webinstellingen interface kunt u `react-client/package.json` openen en de proxypoort veranderen van `9002` naar `9001`. Nu `yarn dev` moet de webinstellingen gebruiken in plaats van de webspeler.

### [Eclipse](http://www.eclipse.org/downloads/)

- Installeer de m2e Eclipse plugin (http://eclipse.org/m2e/)

- Installeer de EGit Eclipse plugin (http://eclipse.org/egit/)

- Selecteer in het Eclipse menu "Venster > Weergeven > Git Repositories". Selecteer dan
  "Venster > Navigatie > Toon Menu" en kies "Voeg een Repository toe".
  Blader naar de map waar u uw repository heeft gekloond en druk op de
  "Zoeken". Selecteer uw geforkte repository en druk op "OK".
  De repository moet in het overzicht van de Git Repositories verschijnen.

- Druk op de rechtermuisknop in de repository en selecteer "Importeer Maven
  Projecten" in het menu. Selecteer het project "/pom.xml" en druk op "Voltooien".

  Opmerking: als een project met dezelfde naam al bestaat Klik op "Geavanceerd" en
  zet het "Naam sjabloon" op "[artifactId]- JOUW NAAM" (vervang JOUW met
  je GitHub naam). Druk vervolgens op "Voltooien".

Je ziet nu de bronnen in Eclipse, maar het project mist nog steeds de aard "Git"
. Met andere woorden, het is nog niet gekoppeld aan de lokale repository. Dit betekent
dat u nog geen Git acties van Eclipse kunt uitvoeren. Voeg de ontbrekende verbinding
toe door het project te delen:

- Druk op de rechtermuisknop op het nieuw aangemaakte project en selecteer het
  menu "Team > Deel Project...". Selecteer "Git" en druk op "Next >".
  Vink het selectievakje "Gebruik of maak repository aan in de bovenliggende map van project"
  en zorg ervoor dat het project is geselecteerd. Druk vervolgens op "Voltooien".

Controleer of uw project nu onder Git controle is. Druk op de rechtermuisknop
op het project en onder "Team" zie je nu alle opties om te werken met
Git.

U kunt UMS bouwen vanuit Eclipse:

- Maak een nieuwe run configuratie onder "Run > Configuraties uitvoeren...", rechter
  muisknop op "Maven Build", selecteer "Nieuw", Naam: `Build UMS`, Goals:
  `package`. Selecteer het tabblad "JRE" en voeg de volgende VM argumenten toe
  `-Xmx1500m -XX:MaxPermSize=256m`. Druk tenslotte op de knop "Toepassen".

Je wilt UMS uitvoeren vanaf Eclipse tijdens de ontwikkeling. Zo doe je het:

- Maak een nieuwe run configuratie onder "Run > Configuratie Uitvoeren... , rechter
  muisknop op "Maven Build", selecteer "Nieuw", Naam: `Run UMS`, Basis
  directory: `${project_loc}`, Bestemming: "test", Profiles: `run-from-eclipse`.
  Selecteer het tabblad "JRE" en voeg VM-argumenten "-Xmx1500m -XX:MaxPermSize=256m" toe.
  Druk tenslotte op de knop "Toepassen".

Je bent nu klaar om te beginnen met ontwikkelen!

Wanneer je tevreden bent met je wijzigingen, kun je deze toewijzen aan je lokale
repository van Eclipse met behulp van de rechtermuisknop, "Team > Commit...".

Wanneer je tevreden bent met je verwijzingen en deze wilt publiceren naar je
repository op GitHub, dan kan je op de rechter muisknop drukken op het project en
selecteer "Team > Push naar Upstream".

## Geef uw wijziging terug door aan ons

Als je wilt bijdragen aan het UMS-project, kun je een "Pull request" naar het ontwikkelingsteam sturen. Zie [Een pull-aanvraag maken](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) voor meer details.