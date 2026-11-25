# Titres de Radio Internet et Live

Une station de radio internet n'envoie pas seulement de l'audio, elle annonce également la piste qu'elle joue actuellement en
. UMS récupère cette annonce et la transmet, afin que votre point de contrôle puisse afficher ce qui est
actuellement en l'air au lieu du nom de la station.

Cela fonctionne pour les flux radio que vous avez ajoutés à une playlist et pour les stations de la
[Audio Addict Network](./audio-addict).

## Comment le titre atteint votre joueur

Il y a deux façons de voyager d'un titre, et UMS utilise la méthode la plus appropriée :

- Les joueurs qui demandent des métadonnées en bande obtiennent le titre tissé dans le flux audio, la façon dont la radio Internet
  l'a toujours fait.
- Joueurs qui ne demandent pas : Parce que UMS lit l'annonce elle-même et la pousse au point de contrôle séparément, le titre en direct
  apparaît même avec les joueurs qui ne savent rien des métadonnées radio.

Il y a un cas sans titres en direct: si UMS doit **transcoder** le flux pour votre joueur, le titre
ne peut pas être tissé, parce que le transcodeur produit l'audio et ne sait rien des annonces de la station
. Les flux qui jouent directement - ce qui est le cas normal pour les stations MP3 et AAC
\- ne sont pas affectés.

## Interprétation de l'annonce

Les stations annoncent une seule ligne de texte, et il n'y a pas de règle qui dit quelle partie est l'artiste.
La convention commune est :

```text
Miles Davis - Alors quoi
```

mais certaines stations ont mis le nom de la station à la fin à la place:

```text
Alors quoi - Jazz Radio sur example.com
```

Pris comme "artiste en premier", la deuxième ligne liste _So What_ comme l'artiste. UMS regarde donc
la partie après le dernier tiret et la traite comme un nom de station. pas un artiste, lorsque l'un de ces
s'applique :

- il contient quelque chose qui ressemble à une adresse web, comme `example.com`
- cela ressemble au nom de la station UMS déjà connu de votre playlist
- cela ressemble au nom d'hôte de l'adresse de flux, ignorant les parties génériques comme `stream`, `listen`
  ou `radio`

Si aucun d'entre eux ne s'applique, la première partie est considérée comme l'artiste, ce qui est la convention habituelle.

## Correction d'une station à la main

Les règles ci-dessus sont correctes pour la plupart des stations, mais une station peut toujours les enfreindre — un nom de série
à la fin, un séparateur inhabituel, ou un artiste dont le nom contient un domaine. Pour ceux-ci,
dire explicitement à UMS avec une ligne `#EXTICYORDER:` dans la playlist, directement au-dessus du stream:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTICYORDER:title-first
http://stream.example.com/jazz.mp3
```

| Valeur         | Signification                                                                |
| -------------- | ---------------------------------------------------------------------------- |
| `auto`         | Décidez automatiquement, comme décrit ci-dessus. C'est la valeur par défaut. |
| `artist-first` | Toujours lire l'annonce comme _Artiste - Titre_.                             |
| `title-first`  | Toujours le lire comme _Titre - Station_.                                    |

Une valeur inconnue est traitée comme `auto`. Le réglage s'applique à cette seule station ; voir
[directives de la liste de lecture](./playlist-directives) pour savoir comment fonctionnent ces lignes en général.

Si votre point de contrôle offre un moyen de changer l'ordre lors de l'écoute, il peut définir la même valeur
via UMS, et UMS l'écrit dans le fichier de la playlist afin que le choix survit à un redémarrage.

## Stations audio Addict

Les stations du réseau Audio Addict n'annoncent pas leurs titres dans le stream. UMS demande au service
de la piste actuelle et la délivre de la même manière, donc le comportement est identique
de l'extérieur.

```
# Envoyer des titres en direct pour les stations Audio Addict. Activé par défaut.
audio_addict_icy_metadata = TRUE
```

Désactivez cette option si un joueur de votre groupe réagit mal aux métadonnées en bande ; les titres poussés vers le point de contrôle
ne sont pas affectés par elle.
