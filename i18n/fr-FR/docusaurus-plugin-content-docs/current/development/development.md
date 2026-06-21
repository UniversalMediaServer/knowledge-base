# Développement



## Copiez le code sur votre machine.

GitHub permet très facilement aux développeurs de créer leur propre version des sources officielles d'UMS afin d'y ajouter leurs propres modifications ou fonctionnalités. GitHub facilite la soumission de ces fonctionnalités sous forme de « Pull Requests » à l'équipe de développement officielle d'UMS.

-

- Rendez-vous sur [le dépôt GitHub UMS](https://github.com/universalmediaserver/universalmediaserver) et appuyez sur le bouton `Fork` en haut à droite.

- Clonez le nouveau dépôt GitHub sur votre machine locale.  Cela devrait ressembler à ceci :(remplacez VOTRE_NOM par votre nom d'utilisateur GitHub) :

      git clone git@github.com:VOTRENOM/universalmediaserver.git VOTRENOM



## Développement avec IDEs

### [Code VS](https://code.visualstudio.com/)

C'est notre éditeur recommandé car il est excellent pour gérer à la fois Java et TypeScript, nos deux langues principales.

#### Serveur Java

Lorsque vous aurez ouvert le code, vous verrez probablement quelques recommandations pour des extensions à installer, comme le `Pack d'extension pour Java`. Installez le/les.
Une fois installé et configuré, vous pouvez lancer le serveur Java en cliquant sur `Exécuter -> Démarrer le débogage` en haut, et le recharger avec `Exécuter -> Redémarrer le débogage`. Ces commandes devraient être terminées en 1 seconde, pour un flux de travail de développement rapide.

#### Interfaces du navigateur web

Si vous souhaitez apporter des modifications aux interfaces de notre navigateur Web, vous devrez également exécuter le serveur React, qui s'occupera de compiler et de servir le code TypeScript.

Dans VS Code, vous pouvez accéder à la `Palette de commandes`, filtrer sur `Débogage : Sélectionner et démarrer le débogage` et sélectionner `Lancer l'interface Web`. Il rechargera automatiquement toutes les modifications que vous apportez aux fichiers React.

Pour un flux de travail manuel, vous pouvez aller dans le dossier `react-client` et exécuter `yarn` pour télécharger les dépendances nécessaires. Ensuite, il suffit d'exécuter `yarn dev` qui devrait ouvrir le lecteur web dans le navigateur et compiler automatiquement tous les changements de code que vous effectuez.

Pour l'interface des paramètres web, vous pouvez ouvrir `react-client/package.json` et changer le port proxy de `9002` à `9001`. Maintenant, `yarn dev` devrait servir les paramètres web au lieu du lecteur web.

### [Eclipse](http://www.eclipse.org/downloads/)

- Installez le plugin m2e Eclipse (http://eclipse.org/m2e/)

- Installer le plugin EGit Eclipse (http://eclipse.org/egit/)

- Dans Eclipse, sélectionnez le menu "Fenêtre > Afficher la vue > Dépôts Git ". Puis
  sélectionnez "Fenêtre > Navigation > Afficher le Menu", choisissez "Ajouter un dépôt".
  Naviguez dans le répertoire où vous avez cloné votre dépôt et appuyez sur le bouton
  "Rechercher". Sélectionnez votre dépôt dérivé, puis cliquez sur « OK ».
  Le dépôt devrait apparaître dans la vue des dépôts Git.

- Appuyez sur le bouton droit de la souris sur le référentiel et sélectionnez "Importer Maven
  Projects" dans le menu. Sélectionnez le projet "/pom.xml" et appuyez sur "Terminer".

  Remarque : si un projet portant le même nom existe déjà, cliquez sur "Advanced" et
  définissez le "Name template" à `[artifactId]-YOURNAME` (remplacez VOTRE NOM par
  votre nom GitHub). Puis appuyez sur "Terminer".

Vous voyez maintenant les sources dans Eclipse, mais le projet manque toujours la nature "Git"
. En d'autres termes, il n'est pas encore lié au dépôt local. Cela signifie que
vous ne pouvez pas encore effectuer d’actions Git depuis Eclipse. Ajoutez le lien manquant
en partageant le projet :

- Appuyez sur le bouton droit de la souris sur le projet nouvellement créé et sélectionnez le menu
  "Équipe > Partager le projet...". Sélectionnez "Git" et appuyez sur "Next >".
  Cochez la case "Utiliser ou créer un dépôt dans le dossier parent du projet"
  et assurez-vous que le projet est sélectionné. Puis appuyez sur "Terminer".

Vérifiez que votre projet est maintenant sous le contrôle de Git. Appuyez sur le bouton droit de la souris
sur le projet et sous « Équipe » vous voyez maintenant toutes les options pour travailler avec
Git.

Vous pouvez construire des UMS depuis Eclipse:

- Créez une nouvelle configuration d'exécution dans « Exécuter > Configurations d'exécution... », cliquez avec le bouton droit
  de la souris sur « Maven Build », sélectionnez « Nouveau », Nom : `Build UMS`, Objectifs :
  `package`. Sélectionnez l'onglet "JRE" et ajoutez les arguments VM suivants
  `-Xmx1500m -XX:MaxPermSize=256m`. Enfin, appuyez sur le bouton « Appliquer ».

Vous voudrez exécuter UMS depuis Eclipse en cours de développement. Voici comment vous le faîtes :

- Créez une nouvelle configuration sous "Exécuter > Exécuter les Configurations... , bouton droit
  de la souris sur "Maven Build", sélectionnez "New", Nom: `Run UMS`, Répertoire de base
  : `${project_loc}`, Goals: "test", Profiles: `run-from-eclipse`.
  Sélectionnez l'onglet "JRE" et ajoutez les arguments VM `-Xmx1500m -XX:MaxPermSize=256m`.
  Enfin, appuyez sur le bouton « Appliquer ».

Vous êtes maintenant prêt à commencer à développer !

Lorsque vous êtes satisfait de vos modifications, vous pouvez les soumettre à votre dépôt local
depuis Eclipse en utilisant le bouton droit de la souris, "Équipe > Commit...".

Lorsque vous êtes satisfait de vos modifications et que vous souhaitez les publier sur votre
dépôt GitHub, vous pouvez cliquer avec le bouton droit de la souris sur le projet et
sélectionner « Équipe > Envoyer vers le dépôt principal ».

## Contribuer à votre changement

Si vous souhaitez contribuer au projet UMS, vous pouvez envoyer une "Demande de modification" à l'équipe de développement. Voir [Créer une demande de tirage](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) pour plus de détails.