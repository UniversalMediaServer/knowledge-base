---
sidebar_position: 2
---

# Nouveautés de la v15

## Résumé

Les 2 principaux objectifs de V15 ont été de simplifier notre interface, basé sur les commentaires et les avis des utilisateurs, et pour faciliter l'utilisation de nos comptes utilisateurs.

Un aperçu rapide des changements dans cette version est :

- Un **changement d'utilisateur** avec le support de **plusieurs utilisateurs connectés**
- Un \*\*sélecteur de mode \*\* à changer entre les deux zones principales : **Joueur** et **Paramètres**
- Identifiants **Code Pin**
- Métadonnées de la saison TV dynamiques
- Un bouton **infos sur le média**
- Réécritures également de notre notification et de notre code en temps réel, meilleure gestion de la mémoire et beaucoup d'autres changements pour améliorer la facilité d'utilisation et réduire le nombre d'actions nécessaires pour faire ce que vous voulez.

## Nouvelles fonctionnalités

### Sélecteur d'utilisateur

Vous pouvez maintenant être connecté avec plusieurs utilisateurs dans un navigateur en même temps, et basculer entre eux.

Ce paramètre est opt-in pour des raisons de sécurité, parce que vous ne voulez pas que tout le monde puisse voir tous les comptes d'utilisateur. Il y a également un paramètre entre les deux où les comptes des utilisateurs sont enregistrés dans le navigateur après que ce navigateur se connecte, sur une base de compte.

![Exemple du sélecteur d'utilisateur](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Sélecteur de mode

L'interface web a été divisée en deux domaines : le lecteur et les paramètres.

Cela devrait rendre l'interface web plus intuitive et plus facile à naviguer en réduisant le nombre de clics nécessaires.

![Exemple de changement de mode](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Identifiants **Code Pin**

Vous pouvez maintenant activer les identifiants de code PIN dans les paramètres du serveur.

![Exemple de la vue du code PIN](@site/docs/img/whats-new-in-v15-pin-code.png)

### Métadonnées de la saison TV dynamiques

Les saisons des émissions télévisées ont parfois leurs propres données comme les titres et les images de couverture, donc maintenant nous l'affichons sur les pages de la saison.

![Exemple de vue de la saison](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Plus d'informations

Pour une liste complète de tous les changements dans la v15, voir [le changelog] (https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

Il n'y a aucune étape de migration spécifique à connaître.

Comme pour toute mise à jour majeure, si vous voulez avoir la possibilité de revenir à votre version actuelle avant de mettre à jour, vous pouvez faire une sauvegarde du répertoire de votre profil, qui contient votre configuration et la base de données locale. Vous pouvez trouver l'emplacement de ce répertoire en haut des journaux de votre programme. Recherchez le `Répertoire Profil: [une page]/UMS`.
