# UMS UPnP Service

UMS fournit un service UPnP étendu qui permet aux points de contrôle externes d'interagir avec des fonctionnalités supplémentaires du système.

## Utilisation :

Le service est exposé dans l'espace de noms `schemas-upnp-org` avec le type de service `UmsExtendedServices`.

Pour les points de contrôle Java en utilisant JUPnP, appelez `findService` sur l'UMS `RemoteDevice`:

```java
Service à distance umsServicesService = remoteDevice.findService(
    nouveau type de service("schemas-upnp-org", "UmsExtendedServices"));
```

Les actions suivantes sont disponibles via cette interface de service.

## Interactions avec ma musique

Les albums aimés peuvent être parcourus en utilisant l'objet ID `MYMUSIC$` en tant que lien profond ou en naviguant vers `My Albums` dans le dossier racine.

Le maintien des favoris est particulièrement utile dans les grandes collections d'albums, où la navigation manuelle dans la bibliothèque complète peut prendre du temps. Une liste d'albums préférés organisée permet aux utilisateurs de revenir rapidement au contenu pertinent sans avoir à répéter des recherches étendues ou une navigation profonde dans les dossiers.

Dans la pratique, les favoris offrent les avantages suivants :

- Accès plus rapide aux albums fréquemment joués, même dans de très grandes bibliothèques.
- Meilleure navigation quotidienne en séparant le contenu préféré du catalogue complet.
- Des flux de travail de lecture plus cohérents pour les clients et les automations qui dépendent des sélections d'albums stables.

### Paramètres d'entrée

Toutes les actions de cette section nécessitent un paramètre d'entrée. L'album doit être identifié par un ID MusicBrainz ou un ID de sortie Discogs. Au moins un ID est requis ; sinon, aucune action n'est effectuée.

Exemple pour la version de Madonna `Like a Virgin`:

| Attributs                            |           Type           |  Exemple de valeur : |
| :----------------------------------- | :----------------------: | :----------------------------------: |
| Identifiant du cerveau de la musique |           Texte          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId                            | UnsignedIntegerFourBytes |                1069538               |

:::caution
Si les deux paramètres (`MusicBrainzId` et `DiscogsId`) ont été fournis lors de l'ajout d'un album à vos favoris, ils doivent également être fournis lorsque vous le retirez de vos favoris.
:::

### J'aime l'album

Marque un album de musique comme aimé.

### Je n'aime pas cet album

Supprime le statut aimé d'un album de musique.

### L'album est-il apprécié ?

Vérifie si un album est actuellement marqué comme aimé. Si les identifiants MusicBrainz et Discogs sont tous deux fournis, la méthode renvoie « true » si au moins l'un des identifiants est marqué comme « aimé ».

## Sauvegarde des actions

Le service fournit des actions de sauvegarde et de restauration.

:::info
Une sauvegarde doit être créée avant de pouvoir effectuer une restauration.
:::

### Sauvegarde audio

Crée une sauvegarde de la table des albums audio « appréciés », identifiés par leurs identifiants MusicBrainz ou Discogs.

### Restaurer les mentions « J'aime » audio

Restaure la table des albums favoris. Appelez `Sauvegarder les mentions « J'aime » audio` avant d'exécuter cette action.

### Notes de sauvegarde

Écrit les données de notation audio dans un fichier de sauvegarde contenant le hachage du fichier et la valeur de notation.

### Rétablir les évaluations

Restaure les informations d'évaluation à partir d'une sauvegarde créée avec `Notes de sauvegarde`.

## Interactions de la bibliothèque

### Réanalyser la boutique Rescan Media

Reporte toute la bibliothèque musicale.

### Réanalyser le dossier de stockage multimédia

Réanalyse un dossier spécifique sans récursivité. Le paramètre d'entrée doit être `Identifiant d'objet` du dossier.

