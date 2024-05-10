# Sécurité et confidentialité

## Introduction

UMS serves media in two main ways - via DLNA/UPnP to be consumed via media player apps, and via HTTP(S) to be consumed via web browsers.

Web browsers have easy security and privacy control by having user accounts with logins.

Media player apps do not generally support the concept of a "user", so usually every device gets the same content. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want to restrict the renderers in the kids' room to only have access to the kids_safe folder. Another common situation is you are on the same network as people you do not want to have access to your media, like flatmates, so you want to block certain renderers completely.

UMS provides a number of methods to control access in those situations.

## Allow or block renderers or network devices by default
You can choose the default strategy for renderers and network devices. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

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

Toutes les méthodes ci-dessus restreignent l'accès à partir de différents moteurs de rendu. Mais si vous pouvez avoir accès à un rendu qui est autorisé à voir un dossier, ces méthodes ne vous aideront pas (si les enfants ont accès à la télévision du salon qui ont accès à tous les médias, alors ils ont accès à ces médias). Le code PIN résout ce problème. Il vous permet de masquer les dossiers/médias derrière un code PIN que vous devez saisir à partir du rendu. Par défaut, l'entrée est une séquence de chiffres (0-9) comme un code ATM. Je vous conseille vivement d'utiliser des codes à base de chiffres, car il est difficile de les saisir à partir du moteur de rendu. Mais si vous êtes très paranoïaque, vous pouvez ajouter des lettres. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. Il n'y a pas de réglementation sur la longueur du code. Par exemple :
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
