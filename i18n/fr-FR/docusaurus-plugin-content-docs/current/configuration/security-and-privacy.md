# Sécurité et confidentialité

UMS est un serveur DLNA. Maintenant DLNA est un protocole qui n'a aucune notion réelle de "utilisateur". Vous n'avez pas à vous "connecter" à votre téléviseur par exemple. Cela signifie que tous les moteurs de rendu ont accès aux mêmes données. Ce n'est peut-être pas ce que vous souhaitez. Par exemple, si vous avez deux dossiers kids_safe et kids_unsafe vous pourriez vouloir restreindre l'accès au dossier kids_safe aux moteurs de rendu de la chambre des enfants. L'UMS propose un certain nombre de méthodes pour contrôler l'accès. 

## Filtre IP

Le filtrage IP est la méthode la plus restrictive proposée par l'UMS. Pour l'utiliser, vous devez fournir une liste d'adresses IP séparées par des virgules et qui sont autorisées à se connecter. Un rendu dont l'adresse ne correspond pas aux entrées de la liste verra simplement son trafic rejeté (très tôt par l'UMS). Il ne pourra accéder à AUCUN dossier (il ne verra même pas de dossier racine). Utilisez cette méthode pour bloquer complètement les enfants. Voir la description de ip_filter dans UMS.conf pour plus de détails.

Exemple pour autoriser seulement 2 adresses

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## Liste des autorisations

La liste autorisée est une méthode qui vous permet de personnaliser le dossier racine pour chaque rendu. Cela permet de partager différents ensembles de dossiers avec des moteurs de rendu différents. Le fonctionnement est le suivant : Dans votre UMS.conf (actuellement pas d'options GUI) vous ajoutez des lignes au format tag.option = value où tag est soit une adresse IP soit un nom de rendu. Le nom du rendu doit être remplacé par _ (underscore). L'option est l'une des suivantes

- folders
- vfolders
- web
- hide_set

La valeur dépend de l'option. Les 4 dernières sont des valeurs booléennes. pour les dossiers et les dossiers virtuels, il s'agit d'une liste de dossiers.

Exemple

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\\child_safe
192.168.1.1.hide_set = true
```

Il s'agit de l'adresse IP 192.168.1.1 :

- Partager le dossier c:\child_safe
- Masquer le dossier "Paramètres du serveur"
- Masquer la liste "Joués récemment"

Tous les autres moteurs de rendu utiliseront les paramètres "globaux", c'est-à-dire qu'ils verront tous les dossiers, et les paramètres du serveur.

Si une option n'est pas présente, la configuration "globale" sera utilisée ou, si elle n'est pas présente, la valeur par défaut sera utilisée.

## UMS.deny

La liste blanche ne peut modifier que l'apparence du dossier racine. Mais si vous avez des choses mixtes (vous avez 10 dossiers mais un seul doit être limité aux enfants). Pour contrôler l'accès à des dossiers individuels (ou à des médias), vous pouvez utiliser le UMS.deny. It works as follows: Add a file called UMS.deny into the same directory as your UMS.conf file and inside that file add tag.[name|file|sys]=regex For each folder/file that should be added, UMS will apply the regular expression to the folder name or filename and if the regular expression matches the folder/file will NOT be added. Par exemple :
```
192.168.1.1.name=.*private.*
```

supprimera tous les dossiers/fichiers qui contiennent le mot privé.
```
192.168.1.1.file=c:\\tst.*
```

supprimera tous les fichiers qui ont c:\tst dans leur chemin, etc.

Si aucune règle n'est définie dans le fichier "UMS.deny", les fichiers/dossiers seront ajoutés.

Cacher les dossiers

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
