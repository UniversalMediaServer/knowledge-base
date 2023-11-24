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

La liste blanche ne peut modifier que l'apparence du dossier racine. But if you have mixed things (you have 10 folders but only one should be restricted to the kids). To control access to individual folders (or media) you can use the UMS.deny. It works as follows: Add a file called UMS.deny into the same directory as your UMS.conf file and inside that file add tag.[name|file|sys]=regex For each folder/file that should be added, UMS will apply the regular expression to the folder name or filename and if the regular expression matches the folder/file will NOT be added. For example:
```
192.168.1.1.name=.*private.*
```

will remove all folders/files which has the word private in it.
```
192.168.1.1.file=c:\\tst.*
```

will remove all files that have c:\tst in their path etc.

If no rule are set in the "UMS.deny" file, the files/folders will be added.

Hiding folders

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
