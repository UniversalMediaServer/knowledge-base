---
sidebar_position: 2
---

# Nouveautés de la v16

## Résumé

Les principaux objectifs de la v16 étaient de faciliter la surveillance des séries télévisées et d'améliorer le support de la radio sur Internet.

Un aperçu rapide des changements dans cette version est :
- Ajout d'un dossier **Continuer à regarder** à la médiathèque.
- Ajout du support de **[DI.fm (AudioAddict)](https://www.di.fm/) Événements et Playlists**
- Ajout du support de **[RadioBrowser](https://www.radio-browser.info/)** pour la recherche et l'ajout de stations radio aux listes de lecture côté serveur.
- Support de **configuration 3-box** ajouté
- Ajout du support de **J'aime/évaluation** et de **mise à jour de la pochette d'album** pour tous les types de média (comme les vidéos, les listes de lecture, les dossiers, etc.) via les lecteurs multimédias et les lecteurs multimédia (avant, il n'était disponible que pour l'audio)
- Ajout du support de **mise à jour des renderers** à propos des fichiers et conteneurs spécifiques qui ont changé
- Augmentation des performances de démarrage de **~95%**, ainsi que de la réactivité du serveur lors de l'analyse des fichiers
- Amélioration de la **réactivité du serveur** lors de l'analyse des fichiers
- Modernisation de la base de code en mettant à jour **8 versions majeures de dépendance**

## Nouvelles fonctionnalités

### Continuer à regarder le dossier

Il montre toutes les vidéos en cours, ainsi que les prochains épisodes de la série télévisée en cours commandée par la dernière lecture.

Le contenu du dossier - et le contenu des dossiers de la série TV à l'intérieur - sont dynamiques.

Donc, si vous êtes à jour sur votre série télévisée, son dossier disparaîtra, et quand un nouvel épisode est ajouté, il réapparaîtra.

Le premier épisode de chaque dossier de série télévisée est celui que vous êtes à la hauteur; Si vous êtes à mi-chemin de l'épisode S01E02 vous verrez cela, et quand il est entièrement joué, vous verrez S01E03 s'il existe.

![une vidéo montrant le dossier Continuer à regarder](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Ajout du support de **[DI.fm (AudioAddict)](https://www.di.fm/) Événements et Playlists**

Voir notre documentation pour [Audio Addict](./configuration/audio-addict), [Radio Internet] (./configuration/internet-radio) et la vidéo en utilisant [NextCP/2](https://sf666.github.io/nextcp2/) ci-dessous pour plus de détails :

[![a video thumbnail for DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### Navigateur radio

Ajout du support de **[RadioBrowser](https://www.radio-browser.info/)** pour la recherche et l'ajout de stations radio aux listes de lecture côté serveur. Recherche de supports:
- Nom de la station
- Pays
- Langue
- Genres

Voir notre documentation [RadioBrowser](./configuration/radiobrowser) et la vidéo en utilisant [NextCP/2](https://sf666.github.io/nextcp2/) ci-dessous pour plus de détails :

[![a video thumbnail for RadioBrowser support](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### Configuration 3-box

Ajout du support pour l'exécution en mode 3-box, qui est quand il y a 3 périphériques (boxes) impliqués dans la lecture :
1. Le serveur (UMS)
2. Un point de contrôle (souvent un téléphone ou une interface de navigateur)
3. Un lecteur multimédia

Voir [Deux boîtes et trois configurations de boîtes] (./configuration/control-point-setups) pour en savoir plus.

### J'aime/note via les moteurs de rendu

Ajout du support de **J'aime/évaluation** et de **mise à jour de la pochette d'album** pour tous les types de média (comme les vidéos, les listes de lecture, les dossiers, etc.) via les lecteurs multimédias et les lecteurs multimédia (avant, il n'était disponible que pour l'audio)

Voir la vidéo en utilisant [NextCP/2](https://sf666.github.io/nextcp2/) ci-dessous pour plus de détails :

[![a video thumbnail for liking and rating support](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Mise à jour de la pochette d'album via les moteurs de rendu

Ajout du support de la mise à jour des pochettes d'album pour tous les types de média (comme les vidéos, les listes de lecture, les dossiers, etc.) via les lecteurs multimédias et les lecteurs multimédia (avant, il n'était disponible que pour l'audio)

Voir la vidéo en utilisant [NextCP/2](https://sf666.github.io/nextcp2/) ci-dessous pour plus de détails :

[![a video thumbnail for updating album art](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Changements en cours

Nous ne supportons plus les architectures x86 ou i586 (32-bits). Cela signifie que nous ne faisons pas les 4 versions suivantes : Linux ARMel, Linux ARMhf, Linux x86, et Windows x86.

Les sauvegardes effectuées avant la v16 ne fonctionneront pas après la v16, donc si vous avez l'habitude de maintenir des sauvegardes, assurez-vous de stocker votre v15 séparément dans la v16 jusqu'à ce que vous soyez sûr que la migration automatique a fonctionné.

## Migration

Il n'y a aucune étape de migration spécifique à connaître.

Comme pour toute mise à jour majeure, si vous voulez avoir la possibilité de revenir à votre version actuelle avant de mettre à jour, vous pouvez faire une sauvegarde du répertoire de votre profil, qui contient votre configuration et la base de données locale. Vous pouvez trouver l'emplacement de ce répertoire en haut des journaux de votre programme. Recherchez le `Répertoire Profil: [une page]/UMS`.
