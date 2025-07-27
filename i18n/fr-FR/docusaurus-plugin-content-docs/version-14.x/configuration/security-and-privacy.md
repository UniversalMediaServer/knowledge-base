# Sécurité et confidentialité

## Introduction

L'UMS sert les médias de deux manières principales : via DLNA/UPnP pour être consommés par des applications de lecture de médias, et via HTTP(S) pour être consommés par des navigateurs web.

Les navigateurs web permettent un contrôle facile de la sécurité et de la confidentialité grâce à des comptes d'utilisateurs avec des identifiants.

Les applications du lecteur multimédia ne prennent généralement pas en charge le concept d'un « utilisateur », donc généralement chaque appareil reçoit le même contenu. Ce n'est peut-être pas ce que vous souhaitez. Par exemple, si vous avez deux dossiers enfants sécurisée et enfants non sécurisée vous pourriez vouloir restreindre l'accès au dossier enfants sécurisée aux moteurs de rendu de la chambre des enfants. Une autre situation courante est celle où vous êtes sur le même réseau que des personnes dont vous ne voulez pas qu'elles aient accès à vos médias, comme des colocataires, et vous souhaitez donc bloquer complètement certains moteurs de rendu.

L'UMS propose un certain nombre de méthodes pour contrôler l'accès dans ces situations.

## Autoriser ou bloquer les moteurs de rendu ou les périphériques réseau par défaut
Vous pouvez choisir la stratégie par défaut pour les moteurs de rendu et les périphériques réseau. Vous pouvez autoriser ou refuser par défaut, avec des listes de refus et des listes d'autorisation, pour un contrôle complet.

Cette fonction est utile dans les situations de cohabitation ou dans les réseaux locaux à faible confiance ou à confiance étendue. Il est également utile pour ceux d'entre vous qui utilisent des adaptateurs de courant porteur pour leur réseau, car cela peut entraîner un accès non désiré de la part des voisins.

![Exemple de définition des préférences d'autorisation du réseau](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Exemple de définition de la préférence d'autorisation du moteur de rendu](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Bloquer/autoriser les moteurs de rendu et les périphériques réseau

Lorsque vous avez choisi d'autoriser ou de bloquer par défaut les moteurs de rendu non reconnus, vous pouvez créer votre liste de refus ou votre liste d'autorisation à partir de l'écran d'accueil, dans la zone des paramètres.

![Exemple de blocage d'un moteur de rendu](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Lier la personne au moteur de rendu

Vous pouvez lier des comptes utilisateurs à des moteurs de rendu/appareils, ce qui vous permet d'avoir un accès indépendant au contenu et au suivi de la lecture.

Par exemple, si vous avez une télévision dans le salon et une autre dans votre chambre, la télévision du salon n'a pas besoin d'être affectée par ce que vous regardez dans votre chambre.

![Exemple d'affectation d'un compte à un moteur de rendu](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restreindre le contenu partagé à certains groupes

Vous pouvez maintenant choisir de partager des répertoires ou du contenu en ligne avec certains groupes. Par exemple, si une personne (ou un appareil attribué à une personne) est un enfant, vous pouvez l'affecter au groupe "Enfants" et lui donner accès au répertoire "Famille", mais pas au contenu "Horreur" ou "Adulte uniquement". Ou leur donner accès au flux web Kurzgesagt, mais pas aux podcasts sur l'histoire.

![Exemple de groupes de contenu partagé](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Cacher les dossiers

Contrôler la visibilité des dossiers virtuels. Ces paramètres se trouvent dans le fichier UMS.conf. Pour masquer certains dossiers lors de la navigation, il suffit de définir leur valeur à true ou de les cocher dans l'onglet Paramètres de navigation / Partage depuis le mode GUI avancé.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Pour cacher le dossier Web, vous devrez décocher l'option Activer le réseau externe dans l'onglet Configuration générale du mode GUI avancé ou changer la valeur `external_network =' à false dans votre fichier UMS.conf Cela aura l'effet secondaire que la mise à jour automatique ne fonctionnera pas. Les modifications apportées à partir de l'interface graphique seront effectives après un redémarrage.

## Code PIN

Toutes les méthodes ci-dessus restreignent l'accès à partir de différents moteurs de rendu. Mais si vous pouvez avoir accès à un rendu qui est autorisé à voir un dossier, ces méthodes ne vous aideront pas (si les enfants ont accès à la télévision du salon qui ont accès à tous les médias, alors ils ont accès à ces médias). Le code PIN résout ce problème. Il vous permet de masquer les dossiers/médias derrière un code PIN que vous devez saisir à partir du rendu. Par défaut, l'entrée est une séquence de chiffres (0-9) comme un code ATM. Je vous conseille vivement d'utiliser des codes à base de chiffres, car il est difficile de les saisir à partir du moteur de rendu. Mais si vous êtes très paranoïaque, vous pouvez ajouter des lettres. Il fonctionne comme suit : Ajouter un fichier appelé UMS.code dans le même répertoire que votre UMS. conf et à ce fichier ajouter regexp,code où regexp est une expression régulière comme dans "UMS. deny" fichier et code est le code qui donne accès au dossier/média. Il n'y a pas de réglementation sur la longueur du code. Par exemple :
```
.*private.*,1234
```

Vous oblige à saisir un code si le dossier/média contient le mot "privé" et que le code correct est 1234. Le code reste alors valide pendant 4 heures (si vous ne le modifiez pas).

## Configuration personnalisée de l'appareil

Toute propriété de configuration peut également être définie par périphérique en créant une configuration de périphérique personnalisée pour remplacer les paramètres UMS par défaut (pour plus de détails, voir Création d'une configuration de périphérique personnalisée).

Par exemple, pour personnaliser la TV des enfants :
- Cliquez sur le bouton 'Personnaliser ce périphérique' en haut à droite du panneau contextuel du moteur de rendu et spécifiez un nom pour la configuration.
- Dans le nouveau fichier de configuration qui s'ouvre, ajoutez tous les paramètres que vous souhaitez remplacer pour la TV, par exemple pour changer le nom du serveur et spécifier différents dossiers :
```
#----------------------------------------------------------------------------
# Profil d'appareil personnalisé
# Voir DefaultRenderer.conf pour la description de toutes les options de rendu possibles
# et UMS.conf pour les options du programme.

# Les options de ce fichier remplacent les paramètres par défaut pour le(s) périphérique(s) Sony Bravia EX spécifique(s) répertorié(s) ci-dessous.
# Spécifier les périphériques par uuid (ou adresse si aucun uuid), séparés par des virgules si plus d'un.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
