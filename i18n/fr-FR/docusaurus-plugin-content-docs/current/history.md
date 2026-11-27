---
sidebar_position: 4
---

# Historique

## Résumé

Nous avons commencé en 2012 en tant que fork de PS3 Media Server, qui était l'un des serveurs de médias les plus populaires et les plus notés autour de nous. Notre fondateur, SubJunk, était également un développeur de ce projet. À l'époque, il s'agissait simplement d'un serveur multimédia DLNA, avec une interface graphique beaucoup plus simple et un ensemble de fonctionnalités.

Il a bien fait son travail simple, mais nous avons pris UMS dans de nouvelles directions, et à de nouveaux sommets.

Pour une vue d'ensemble des changements dans la dernière version, voir [Quoi de neuf dans V16](./whats-new-in-v16)

## Versions précédentes

### v15 (2025-08-23)

Les 2 principaux objectifs de V15 ont été de simplifier notre interface, basé sur les commentaires et les avis des utilisateurs, et pour faciliter l'utilisation de nos comptes utilisateurs.

Un aperçu rapide des changements dans cette version est :

- Un **changement d'utilisateur** avec le support de **plusieurs utilisateurs connectés**
- Un \*\*sélecteur de mode \*\* à changer entre les deux zones principales : **Joueur** et **Paramètres**
- Identifiants **Code Pin**
- Métadonnées de la saison TV dynamiques
- Un bouton **infos sur le média**
- Réécritures également de notre notification et de notre code en temps réel, meilleure gestion de la mémoire et beaucoup d'autres changements pour améliorer la facilité d'utilisation et réduire le nombre d'actions nécessaires pour faire ce que vous voulez.

#### Sélecteur d'utilisateur

Vous pouvez maintenant être connecté avec plusieurs utilisateurs dans un navigateur en même temps, et basculer entre eux.

Vous pouvez également activer un paramètre pour afficher les utilisateurs disponibles sur l'écran de connexion. Ce paramètre est opt-in pour des raisons de sécurité, parce que vous ne voulez pas que tout le monde puisse voir tous les comptes d'utilisateur. Il y a également un paramètre entre les deux où les comptes des utilisateurs sont enregistrés dans le navigateur après que ce navigateur se connecte, sur une base de compte.

![Exemple du sélecteur d'utilisateur](@site/docs/img/whats-new-in-v15-user-switcher.png)

#### Sélecteur de mode

L'interface web a été divisée en deux domaines : le lecteur et les paramètres.

Cela devrait rendre l'interface web plus intuitive et plus facile à naviguer en réduisant le nombre de clics nécessaires.

![Exemple de changement de mode](@site/docs/img/whats-new-in-v15-mode-switcher.png)

#### Identifiants **Code Pin**

Vous pouvez maintenant activer les identifiants de code PIN dans les paramètres du serveur.

![Exemple de la vue du code PIN](@site/docs/img/whats-new-in-v15-pin-code.png)

#### Métadonnées de la saison TV dynamiques

Les saisons des émissions télévisées ont parfois leurs propres données comme les titres et les images de couverture, donc maintenant nous l'affichons sur les pages de la saison.

![Exemple de vue de la saison](@site/docs/img/whats-new-in-v15-season-metadata.png)

### v14 (2022-12-13)

Les changements les plus importants impliquent la possibilité de contrôler l'accès à votre contenu. Cela inclut des améliorations aux comptes utilisateurs comme les avatars et le suivi de lecture par utilisateur, ainsi que la possibilité d'afficher du contenu différent selon l'appareil.

![Exemple de blocage d'un moteur de rendu](@site/docs/img/whats-new-in-v14-block-renderer.png)

Nous avons également ajouté la possibilité d'ajouter une clé API TMDB pour ajouter et éditer manuellement des métadonnées pour les séries TV et les vidéos, et de marquer les séries TV et les films comme pleinement joués.

![Exemple d'attribution d'un compte à un moteur de rendu](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

[Voir plus de détails sur la page Quoi de neuf](https://support.universalmediaserver.com/14.x/whats-new-in-v14)

### v13 (2022-12-13)

Cette version était entièrement consacrée à la 3D et à la réalité virtuelle, sous la direction du contributeur threedguru.

![Contenu partagé](@site/docs/img/history-v13.png)

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v12 (2022-11-29)

Ce fut une réécriture complète de notre interface graphique en utilisant des outils modernes dans le navigateur web, avec un effort énorme de SurfaceS et js-kyle.

Cela a également introduit le concept d'authentification, d'utilisateurs et de groupes.

![Authentication](@site/docs/img/history-v12-1.png)

Un autre changement est que la zone de contenu partagé a été unifiée, où auparavant il était divisé entre le contenu local et le contenu web, maintenant ils sont dans la même liste.

![Contenu partagé](@site/docs/img/history-v13.png)

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v11 (2022-05-27)

Nous avons amélioré l'interface web de plusieurs façons, y compris des données plus riches telles que les logos et les arrière-plans des séries télévisées, des films et des épisodes, une meilleure détection de l'appareil, amélioration de la détection et de la récupération d'état réseau, de la lecture et de la recherche de vidéos, de la correspondance des métadonnées de l'API, du transcodage HLS pour tous les appareils, et plus encore !

![Vue d'ensemble de l'interface Web](@site/docs/img/history-v11.gif)

Ce fut notre première version avec notre nouveau développeur Superstar, SurfaceS, qui a mis beaucoup de choses dans cette version.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v10 (2021-01-12)

Ici, nous nous sommes efforcés de rendre nos riches métadonnées plus utiles.

Nous avons ajouté de nouveaux dossiers à la médiathèque, y compris "Filtrer par information", qui vous permet de parcourir les vidéos par acteur, genre, pays, réalisateur, note IMDb, et date de sortie.

L'interface web a eu beaucoup plus de fonctionnalités en vous permettant de cliquer sur un élément comme un acteur ou un genre de vidéo pour voir d'autres correspondances pour cette personne ou ce genre (ou d'autres métadonnées). Nous avons ajouté quelques liens rapides à la page d'accueil de l'interface web, comme récemment ajouté, en cours, les plus joués, etc.

Les miniatures de la série TV ont maintenant l'icône entièrement jouée si tous les épisodes ont été entièrement joués:

![Séries télévisées visionnées dans leur intégralité](@site/docs/img/history-v10.png)

Nous avons également accueilli ik666 dans l'équipe de développement, qui a ajouté une nouvelle API pour les intégrations, et grandement amélioré le support UPnP.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v9 (2019-09-06)

Plus besoin d'installer Java !

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v8 (2019-03-29)

Cette version a pour but de faciliter la diffusion de contenu web comme les vodcasts, les podcasts, radio Internet, chaînes YouTube, et autres contenus Web en streaming en ajoutant l'onglet Contenu Partagé.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v7 (2018-03-27)

C'est la version à laquelle nous nous concentrons sur nos fonctionnalités de navigation dynamique avec le dossier Médiathèque.

Nous avons ajouté la détection de Films et de séries TV et ajouté la surveillance de dossiers afin que les fichiers puissent être automatiquement détectés dans les dossiers partagés

Nous avons également eu la chance d'avoir mik_s, notre modérateur de forum, rejoignez-nous autour de cette fois-ci, qui fait un travail incroyable autour de cet endroit!

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v6 (2016-01-30)

Ici, nous avons ajouté l'action "Complètement joué" avec les icônes de superposition et la gestion des fichiers, qui était très attendue.

Nous avons également accueilli Nadahar dans son équipe, qui a amélioré la stabilité, la journalisation et le support linguistique.

Grâce à son intégration de Crowdin, nous avons eu 523 contributeurs à nos 40 langues !

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v5 (2015-01-25)

Dans cette version, nous avons ajouté la prise en charge des connexions UPnP et de la lecture, ce qui a permis à la communauté de se connecter à beaucoup plus de périphériques ! Merci en grande partie à ceux qui sont sceptiques pour cela.

Nous avons également ajouté notre premier mot de passe aux métadonnées IMDb, mais nous n'avons pas encore eu notre propre API. Nous avons OpenSubtitles pour le remercier, et désolé pour tous les spams de requête de ces jours-là !

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v4 (2014-07-25)

La première interface web a été ajoutée, enfin nous avons donné à la communauté UMS la possibilité d'accéder au contenu via leurs navigateurs Web!

Nous avons également ajouté le support du casting, et la possibilité de transcoder en AAC.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v3 (2013-11-01)

V3 a été une énorme sortie, et c'est quand nous avons commencé à nous éloigner de la PS3MS avec des tonnes de nos propres fonctionnalités.

Nous avons ajouté les nouveaux médias et les dossiers récemment joués, la reprise de la lecture, le prettifing du nom de fichier et un assistant de configuration de démarrage.

Nous avons également salué le valib dans l'équipe, qui contribue encore aujourd'hui!

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v2 (2012-10-31)

Avec v2 est venu l'ajout de l'onglet de gestion des plugins qui se connecte à notre base de données centralisée, et nous avons de nouveau été les premiers à introduire une fonctionnalité; Sous-titres en direct, où vous pouvez diffuser des sous-titres à la volée depuis votre moteur de rendu.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v1 (2012-05-31)

Ces premières versions ont porté sur l'aspect "universel" du nouveau programme, en ajoutant le support de dizaines de nouveaux appareils.

Nous avons également été le premier serveur média à supporter un mouvement fluide, une fonction d'interpolation de cadre qui vient maintenant avec chaque téléviseur, mais à l'époque était seulement dans de nouveaux téléviseurs haut de gamme.

Notre deuxième développeur, SharkHunter, nous a aussi rejoint dans les premiers jours.

[Voir plus de détails dans l'annonce de publication](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### Serveur de média PS3 (2008)

Le projet qui a tout commencé ! Nous sommes un fork de ce projet qui a été lancé en 2008 par Shagrath, qui a été rejoint par SubJunk, le fondateur de Universal Media Server.

La PS3 était une excellente machine pour lire des médias, mais elle ne supportait pas beaucoup de formats vidéo, PS3 Media Server a donc utilisé beaucoup de trucs pour le faire lire n'importe quelle vidéo que vous pourriez lui donner. Nous avons appliqué la même stratégie, pour tous les appareils et tous les acteurs.

![Serveur de média PS3](@site/docs/img/history-pms.png)
