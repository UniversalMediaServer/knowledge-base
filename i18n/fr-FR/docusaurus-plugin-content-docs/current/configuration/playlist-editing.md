# Édition des listes de lecture à partir d'un point de contrôle

Les listes de lecture sont des fichiers ordinaires `.m3u8`, et vous pouvez toujours les modifier dans un éditeur de texte. UMS peut aussi
laisser votre point de contrôle le faire pour vous: créer une playlist, ajouter la piste que vous écoutez, Déposez
un que vous ne voulez plus, renommez ou supprimez tout le contenu — sans toucher un fichier à la main.

Ceci est désactivé **par défaut** L'écriture dans une liste de lecture implique une écriture sur votre disque ; il s'agit donc d'une
opération que vous devez autoriser délibérément, et non d'une fonction activée par défaut.

```
# Autoriser les points de contrôle à créer, modifier et supprimer des objets. Désactivé par défaut.
upnp_cds_write = TRUE
```

## Ce qui devient possible

Avec le paramètre, un point de contrôle qui le supporte peut

- Créer une nouvelle liste de lecture
- ajouter un élément à une playlist, y compris celui qu'il joue en ce moment,
- supprimer un élément d'une playlist
- renommer ou supprimer une playlist.

Si vous voyez des boutons pour tout cela dépend de votre point de contrôle. UMS rend seulement les opérations
disponibles; rien ne se passe à moins que quelque chose ne le demande.

Ce qu'UMS enregistre, ce sont de simples fichiers de listes de lecture dans vos dossiers partagés — et non des entrées dans une base de données que
seul UMS est capable d'interpréter. Vous pouvez les ouvrir dans n'importe quel éditeur par la suite, les copier dans un autre lecteur, ou
les garder dans une sauvegarde. Plus de détails qu'une entrée de playlist ne peut pas exprimer seule, tels que les illustrations
pour une station radio, sont stockées comme [directives](./playlist-directives) dans le même fichier.

Les changements sont annoncés sur les points de contrôle connectés, donc une playlist modifiée sur un appareil montre son nouveau contenu
sur les autres sans rafraichissement manuel.

## Mise en ligne des fichiers

Un deuxième réglage régit quelque chose de différent et de bien plus grande portée : si un périphérique
peut envoyer **le contenu du fichier** à UMS et le faire écrire sur le disque.

```
# Autoriser les périphériques non identifiés à écrire des fichiers sur le disque. Désactivé par défaut.
anonymous_devices_write = TRUE
```

Laissez cela à moins que vous ayez une raison concrète. Il permet un appareil sur votre réseau que UMS
ne peut pas attribuer à un utilisateur connu à créer, remplacez et supprimez les fichiers multimédias dans vos dossiers partagés.
C'est une grande confiance à étendre à tout ce qui se trouve sur le réseau, et c'est
pourquoi le paramètre existe séparément de l'édition de la liste de lecture au lieu d'être inclus dans celle-ci.

## Les deux paramètres peuvent être modifiés à distance

Un point de contrôle peut lire et définir les deux commutateurs, de la même manière qu'il lit tous les autres paramètres UMS
. C'est pratique — vous pouvez activer l'édition de la playlist depuis l'application que vous détenez déjà
— mais cela signifie aussi que la valeur de votre fichier de configuration n'est pas le dernier mot : tout ce qui peut
atteindre le service UPnP sur votre réseau peut le modifier.

Si cela vous importe, restreignez les périphériques qui peuvent atteindre UMS du tout. Voir
[Sécurité et confidentialité] (/configuration/security-and-privacy).
