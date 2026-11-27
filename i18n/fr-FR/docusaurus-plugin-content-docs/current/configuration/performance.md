# Performance

Les valeurs par défaut sont choisies pour être sûres sur un matériel modeste. Sur une machine avec une grande bibliothèque et des cœurs
à donner, quelques réglages valent la peine d’être revus — et l’un d’eux importe plus que le reste.

Changez une chose à la fois et regardez le résultat. Chaque réglage ici trade une ressource pour une autre,
donc une valeur qui aide à une installation peut nuire à l'autre.

## Lecture de la bibliothèque en parallèle

Avant que UMS puisse présenter un fichier, il doit comprendre ce qu'il est : lire les métadonnées, trouver l'œuvre d'art,
déterminer ce dont l'appareil demandeur a besoin. Ceci est le facteur le plus important de la durée d'une analyse
et de la vitesse à laquelle un grand dossier s'ouvre, et il est fait par un ensemble de fils de travail.

```
# Combien de fichiers UMS fonctionne à la fois. Défaut 4, autorisé 1 à 64.
media_resolve_threads = 4
```

L'œuvre est dominée par l'attente — pour le disque, pour la base de données, occasionnellement pour le réseau — donc
plus de fils de discussion aident bien au-delà du nombre de cœurs que vous avez. Sur un serveur avec une grande bibliothèque, une valeur
dans la région du nombre de noyaux ou au-dessus est raisonnable. Sur une petite machine, ou sur une machine où UMS
partage le disque avec autre chose, laissez-le seul.

Ce paramètre taille également le pool de connexions de base de données, qui est conservé à deux fois le nombre de threads
et jamais en dessous de dix. C'est délibéré: les fils de travail ont besoin de connexions, et augmenter les fils de discussion
sans les connexions à les suivre, les laisserait se mettre en file d'attente. Parce qu'
les deux se déplacent ensemble, il n'y a rien de séparé à ajuster.

## Mémoire de la base de données

La base de données garde les pages récemment utilisées en mémoire. Combien il peut utiliser est décidé automatiquement, et
qui est normalement la bonne réponse :

```
# Cache de base de données en KB. Par défaut -1, qui permet à UMS de décider.
database_media_cache_size = -1
```

Deux autres commutateurs échangent de la mémoire contre la vitesse. Les deux sont désactivés par défaut et les deux valent une mesure
plutôt qu'une supposition :

```
# Conserver les index de la base de données dans la mémoire.
database_media_use_memory_indexes = FALSE

# Laisser le cache restituer la mémoire sous pression au lieu de la maintenir.
database_media_use_cache_soft = FALSE
```

Les index de mémoire rendent les recherches plus rapides au prix de la mémoire qui est alors indisponible pour tout autre chose.
Le cache logiciel est le commerce inverse : il libère de la mémoire quand le système en a besoin, qui garde UMS
de problèmes sur une machine qui manque de mémoire, au prix d'avoir à lire ces pages
à nouveau par la suite.

## Journalisation

Par défaut, UMS écrit chaque ligne de log telle qu'elle se produit. La mise en mémoire tampon rend la journalisation moins chère:

```
# Collecter les lignes de log avant de les écrire. Désactivé par défaut.
logging_buffered = FALSE
```

Le catch apparaît exactement quand vous avez le plus besoin de la bûche. Si l'UMS est tué ou crash, tout ce qui est
encore dans le tampon est perdu, pour que le journal puisse s'arrêter à court de l'événement que vous étudiez — et un journal
se terminant brusquement ressemble à un gel qui ne s'est jamais produit. Laissez la mise en mémoire tampon éteinte en poursuivant
un problème.

## Que mesurer

Deux chiffres vous indiquent si un changement vous a aidé:

- Combien de temps prend une analyse complète de votre bibliothèque. Il est dans le journal, comme une ligne signalant le scan de média
  terminé et le nombre de secondes nécessaires.
- Combien de temps faut-il pour ouvrir votre plus grand dossier dans un point de contrôle, une fois après un redémarrage et une fois de plus
  tout de suite. La première fois inclut le travail de construction du dossier, la seconde
  ne le fait pas, et la différence est sur laquelle ces paramètres agissent.
