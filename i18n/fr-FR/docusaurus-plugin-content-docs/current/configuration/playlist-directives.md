# Directives de la playlist

Une entrée de playlist n'est qu'une adresse. C'est suffisant pour un fichier sur disque, où UMS peut lire les tags
et trouver la couverture à côté, mais pas pour une station de radio internet : il n'y a pas de fichier à lire, donc
artwork, la notation et d'autres détails n'ont nulle part où vivre.

Les directives comblent cette lacune. Ce sont des lignes de commentaires qui portent les informations manquantes avec l'entrée
, dans le fichier de playlist lui-même.

## Comment une directive est écrite

Mettez la ligne directement **au-dessus** de l'entrée à laquelle elle appartient, de la même manière que `#EXTINF:` fonctionne.

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz-radio.png
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock-radio.jpg
http://stream.example.com/rock.mp3
```

Les règles sont les mêmes pour toutes :

- Une directive s'applique à **l'entrée suivante uniquement**. Plusieurs directives peuvent précéder la même entrée, comme
  ci-dessus, et chaque entrée nécessite ses propres lignes.
- Seulement les listes de lecture `.m3u` et `.m3u8`. D'autres formats de playlist n'ont pas de place pour mettre la ligne.
- La capitalisation du nom de la directive n'a pas d'importance : `#EXTIMG:` et `#extimg:` tous les deux fonctionnent.
- Toute autre ligne de commentaire est laissée seul, donc vos propres notes dans le fichier sont sûres.

## Les directives

| Directive             | Applicable à      | Raison                                                 |
| --------------------- | ----------------- | ------------------------------------------------------ |
| `#EXTIMG:`            | l'entrée suivante | Œuvre pour une entrée qui n'a pas de fichier à prendre |
| `#EXTRATING:`         | l'entrée suivante | Évaluation en étoile de cette entrée                   |
| `#EXTICYORDER:`       | l'entrée suivante | Comment lire le titre en direct d'une station de radio |
| `#RADIOBROWSERUID:`   | l'entrée suivante | Identifie une station dans le répertoire RadioBrowser  |
| `#EXTPLAYLISTRATING:` | toute la playlist | Notation en étoiles de la playlist elle-même           |

### Art

`#EXTIMG:` prend l'adresse absolue d'une image, que l'UMS télécharge une seule fois, puis utilise pour cette
entrée. Voir [Comment ajouter un artwork](/guides/how-to-add-artwork) pour la liste complète
des formats pris en charge.

### Notations

`#EXTRATING:` et `#EXTPLAYLISTRATING:` prennent un nombre entier de **0 à 5**. La première note l'entrée
qui la suit, la seconde note la playlist dans son ensemble et peut rester n'importe où dans le fichier.

```text
#EXTPLAYLISTRATING:5
#EXTM3U
#EXTINF:-1, Radio Jazz
#EXTRATING:4
http://stream.example.com/jazz.mp3
```

Une note dans le fichier est la **valeur de début**, pas un enregistrement en cours : UMS l'applique lorsque l'entrée
n'est pas encore évaluée et laisse une note existante seule. Donc modifier le fichier ne change rien pour
quelque chose que vous avez déjà noté dans votre point de contrôle - évaluez-le là à la place, et UMS met à jour la ligne
pour vous.

Pour un fichier sur disque, c'est une commodité, parce que l'évaluation est stockée dans la base de données et peut aussi
être écrite dans les balises du fichier. Pour une station de radio, c'est la seule maison durable que la cote a : c'est
qui permet à la cote de survivre à une base de données reconstruite et de voyager avec la playlist quand vous la copiez.

### Identité de la station radio

`#RADIOBROWSERUID:` contient l'identifiant qu'une station a dans le répertoire RadioBrowser. Avec elle, l'UMS
peut rechercher des détails supplémentaires sur la station au lieu de ne montrer que ce que le flux lui-même
révèle. Les points de contrôle qui offrent un sélecteur de station écrivent cette ligne eux-mêmes lorsque vous choisissez une station
, donc il y a rarement une raison de le taper à la main.

### Ordre des titres

`#EXTICYORDER:` contrôle si l'annonce d'une station est lue comme _Artiste - Titre_ ou comme
_Titre - Station_. Voir [la radio Internet et les titres en direct](./internet-radio).

## Les directives UMS s'écrivent lui-même

Vous n'avez pas à modifier les listes de lecture à la main. Lorsque votre point de contrôle définit un graphisme, une évaluation ou l'ordre de titre
, UMS écrit la ligne correspondante dans le fichier de la playlist. Chaque directive est remplacée
individuellement, donc définir une couverture ne dérange jamais une évaluation et inversement, et la suppression d'une valeur
supprime juste sa ligne.

L'œuvre n'est écrite qu'après avoir été chargée, donc une adresse cassée laisse le fichier
intact au lieu de stocker un lien mort.
