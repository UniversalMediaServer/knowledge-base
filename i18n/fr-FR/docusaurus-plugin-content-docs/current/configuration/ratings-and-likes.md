# Évaluations et J'aime

UMS peut mémoriser vos notes attribuées à vos morceaux, de zéro à cinq étoiles, et les points de contrôle dotés de
boutons de notation permettent de définir et de modifier ces valeurs pendant que vous écoutez.

Les J'aime ne sont pas un mécanisme séparé. Un **« j'aime » correspond à une note de cinq étoiles**, un **« je n'aime pas » correspond à zéro**. Si
votre point de contrôle affiche un cœur au lieu des étoiles, il écrit la même valeur dans le même endroit,
ce qui explique pourquoi les deux ne se contredisent jamais.

## Là où une note est conservée

La notation réside dans la base de données UMS, attachée à l'élément plutôt qu'au fichier. Cela a deux conséquences
qui valent la peine d'être connues :

- Cela fonctionne pour des choses qui n'ont nulle part où stocker leur propre évaluation — une station de radio Internet,
  par exemple, ou un format audio dont les tags n'ont pas de champ de notation.
- Il est indépendant du fichier, donc le re-marquage de votre collection avec un autre outil n'écrase pas
  ce que vous avez noté en UMS.

Si vous préférez avoir la notation dans les fichiers, afin que d'autres programmes puissent la voir, UMS peut
l'écrire dans le tag lorsque vous notez quelque chose :

```
# Écrire également l'évaluation dans la balise du fichier. Désactivé par défaut.
audio_update_rating_tag = TRUE
```

Cela ne s'applique qu'aux fichiers pouvant faire l'objet d'une note, et uniquement à partir du moment où vous activez cette fonctionnalité — elle
ne remonte pas dans le temps pour enregistrer les notes que vous aviez attribuées auparavant.

Une note qui doit être conservée lors de la reconstruction d'une base de données ou qui doit être transférée avec une liste de lecture que vous copiez ailleurs
doit plutôt figurer dans le fichier de la liste de lecture. Voir [les directives de la liste de lecture](./playlist-directives).

## Le dossier Mes albums

Les albums que vous avez aimé sont collectés dans un dossier appelé **Mes Albums**. Il est rempli automatiquement :
comme un album et il apparaît, enlevez le même et il est à nouveau parti.

Par défaut, le dossier se trouve à l'intérieur de la Médiathèque avec les autres dossiers audio. Si vous atteignez
souvent, vous pouvez le faire afficher au niveau supérieur à la place:

```
# Afficher mes albums dans le dossier racine. Désactivé par défaut.
audio_likes_visible_root = TRUE
```

## Recherche par évaluation

UMS annonce que l'évaluation est l'une des propriétés sur lesquelles elle peut être recherchée, afin qu'un point de contrôle puisse demander à
de la même manière qu'il demande un titre ou un artiste. Une requête portant sur tous les éléments notés cinq étoiles
renvoie le contenu du dossier « Mes albums » ; toute autre valeur fonctionne également.

La recherche correspond à une valeur **exacte** Il n'est pas possible de demander « quatre étoiles ou plus » en une seule
requête : un point de contrôle proposant un tel filtre doit demander chaque valeur séparément et regrouper lui-même les
réponses.

Les notes sont lues à partir de la base de données, donc la recherche trouve également des éléments qui ne portent aucune note dans leur fichier
, comme les stations de radio.

## Les sauvegarder

Comme les notes et les « j'aime » sont stockés dans la base de données, il est judicieux d'en conserver une copie avant qu'un
incident grave ne vienne l'affecter. UMS peut les distribuer et les récupérer, ce qui permet également de
les transférer vers un autre site. Le
[service UMS UPnP](./ums-extended-service) liste les actions qu'un point de contrôle utilise pour
cela.
