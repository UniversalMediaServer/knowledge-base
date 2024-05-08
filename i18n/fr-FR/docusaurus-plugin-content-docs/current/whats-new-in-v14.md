---
sidebar_position: 2
---

# Nouveautés de la v14

## Résumé

V14 contient de nouvelles fonctionnalités majeures basées sur ce que nos utilisateurs ont demandé.

Les changements les plus importants impliquent la possibilité de contrôler l'accès à votre contenu. Cela inclut des améliorations aux comptes utilisateurs comme les avatars et le suivi de lecture par utilisateur, ainsi que la possibilité d'afficher du contenu différent selon l'appareil.

Il y a également eu de nombreuses mises à jour des paramètres Web et des interfaces de lecteur, y compris l'ajout de la possibilité de marquer des ensembles de fichiers (e. La série télévisée) comme étant entièrement lue, et la détection automatique des préférences de votre système en mode sombre/lumière.

Nous avons également profité de l'occasion pour remonter les versions majeures de certaines de nos dépendances, y compris [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis. ourceforge.io/Download), [Yarn v4](https://yarnpkg.com/), et le générateur de cette base de connaissances, [Docusaurus v3](https://docusaurus.io/).

Enfin, nous avons apporté des centaines de corrections de bugs et d'améliorations des performances, et nous avons remanié une grande partie du code pour le rendre plus facile à travailler, tout en améliorant nos cadres de test pour prévenir les bugs futurs.

## Nouvelles fonctionnalités

### Bloquer/autoriser les lecteurs multimédias et les périphériques réseau

Vous pouvez maintenant bloquer et autoriser l'accès en fonction du moteur de rendu ou du périphérique réseau, à partir de l'écran d'accueil dans la zone des paramètres.

![Exemple de comment bloquer un moteur de rendu](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Autoriser ou bloquer les lecteurs multimédias ou les périphériques réseau par défaut :

Vous pouvez maintenant choisir la stratégie par défaut pour les moteurs de rendu et les périphériques réseau. Auparavant, il n'y avait qu'une seule stratégie possible - soit autoriser tout, soit refuser tout avec une liste d'autorisations. Vous pouvez maintenant autoriser ou refuser par défaut, avec des listes de refus et des listes d'autorisations, pour un contrôle complet.

Cela rend UMS beaucoup plus flexible pour les situations de cohabitation ou les réseaux locaux à large ou faible niveau de confiance. C'est également utile pour ceux d'entre vous qui utilisent des adaptateurs CPL pour votre réseau, car cela peut entraîner un accès indésirable de la part des voisins.

![Exemple de configuration des préférences d'autorisation réseau] (@site/docs/img/what's-new-in-v14-network-allow block-preference.png)

![Exemple de configuration des préférences d'autorisation réseau] (@site/docs/img/what's-new-in-v14-network-allow block-preference.png)

### Lier la personne au moteur de rendu

Vous pouvez désormais lier des comptes d'utilisateurs à des moteurs de rendu/appareils, ce qui vous permet d'avoir un suivi indépendant de la lecture. Par exemple, si vous avez une télévision dans le salon et une autre dans votre chambre, la télévision du salon n'a pas besoin d'être affectée par ce que vous regardez dans votre chambre.

![Exemple d'attribution d'un compte à un moteur de rendu](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restreindre le contenu partagé à certains groupes

Vous pouvez maintenant choisir de partager des répertoires ou du contenu en ligne avec certains groupes. Par exemple, si vous avez une personne (ou un appareil qui est affecté à une personne) qui est un enfant, vous pouvez les assigner au groupe "Enfants" et donner à ce groupe l'accès au répertoire "Famille", mais pas les répertoires "Horreur" ou "Adulte uniquement". Ou leur donner accès au flux web de Kurzgesagt, mais pas les podcasts d'histoire.

![Exemple de groupes de contenu partagé](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatars

Les personnes peuvent avoir des avatars afin d'être plus facilement repérables au premier coup d'œil. Vous pouvez les définir sur la page des paramètres de l'utilisateur avec les groupes d'utilisateurs.

![Exemple de comment modifier les paramètres utilisateur](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Intégration directe de la TMDB

Vous pouvez maintenant lier votre compte TMDB à UMS dans la zone Réglages Généraux.

Cela vous permet de modifier les métadonnées en fonction des résultats de recherche du TMDB :

![Exemple d'attribution d'un compte à un moteur de rendu](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Mark TV series and videos as fully played

Now you can mark TV series and videos as fully played, in addition to the existing ability to do it by folder

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### Plus d'informations

Pour une liste complète de tous les changements dans la version 14, voir [le changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

Lors de la première exécution de la V14, elle analysera à nouveau vos dossiers partagés, ce qui peut prendre un certain temps. Vous pouvez toujours utiliser le serveur avant la fin de cette opération, mais il risque de répondre plus lentement et de renvoyer des résultats incomplets.

Après la mise à jour, il se peut que vous deviez redémarrer votre appareil ou votre application de lecteur multimédia pour vider son cache et lui permettre de reconnaître correctement les nouvelles données que nous lui envoyons.

Comme pour toute mise à jour majeure, si vous voulez avoir la possibilité de revenir à votre version actuelle avant de mettre à jour, vous pouvez faire une sauvegarde du répertoire de votre profil, qui contient votre configuration et la base de données locale. Vous pouvez trouver l'emplacement de ce répertoire en haut des journaux de votre programme. Recherchez le `Répertoire Profil: [some page]/UMS`.
