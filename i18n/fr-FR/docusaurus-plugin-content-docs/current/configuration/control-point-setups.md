# Réglages 2 et 3 boîtes

UPnP connaît deux façons d'organiser les parties d'un système médiatique et UMS se comporte différemment dans chacun d'eux.

Dans une configuration **bi-box**, la console qui navigue dans votre bibliothèque est aussi la console qui joue : un téléviseur, une boîte de streaming
, une application de téléphone qui affiche les dossiers et joue ensuite la piste elle-même. Le périphérique qui demande à
la liste et le périphérique qui demande l'audio sont les mêmes.

Dans une configuration de **trois boxs**, elles sont séparées. Un _point de contrôle_ — une application sur votre téléphone ou une interface web
— affiche la bibliothèque et dit à un _rendu_ de jouer. L'application ne touche jamais au fichier audio ; elle se contente d'orienter le moteur de rendu vers celui-ci. Il s'agit de l'arrangement typique des streamers hi-fi, où un appareil
dédié fait le jeu et vous le dirigez depuis un autre endroit.

## Pourquoi UMS doit connaître la différence

UMS décide comment livrer une piste en fonction de ce que le périphérique récepteur peut gérer : un joueur que
ne peut pas décoder FLAC reçoit un flux converti, celui qui peut garder le fichier intact.

Dans une configuration à deux boîtes, cette décision est facile, car celui qui a demandé la liste est celui qui jouera.
Dans une configuration de trois boîtes, ce n'est pas : la demande de liste provient de votre téléphone, la demande de l'audio
du streamer. Décider sur la base du téléphone serait tout à fait erroné — cela enverrait
le streamer qui convient à un téléphone.

## Comment UMS les dit à part

```
# Exiger des comptes et se connecter. Activé par défaut.
authentication_enabled = TRUE
```

Avec l'authentification **activée**, UMS lie la lecture à l'identité de l'utilisateur qui a effectué la navigation, de sorte que ce qu'un utilisateur est
autorisé à voir est également ce qu'il peut lire. C'est le comportement attendu pour un foyer disposant de
plusieurs comptes et d'un accès par utilisateur, et cela suppose une configuration à deux appareils.

Avec l'authentification **off**, UMS s'arrête en supposant que les deux sont les mêmes. Il détermine le périphérique de lecture
au moment où l'audio est demandé, de cette requête elle-même — son adresse et ce qu'elle dit
sur elle-même — et prend la décision de conversion pour _que_ périphérique. L'identité dans la requête de navigation
est alors comprise comme le point de contrôle qu'elle est.

Deux appareils partageant une adresse, ce qui se produit lorsque le point de contrôle et le moteur de rendu s'exécutent sur la même machine
sont encore racontés séparément, parce qu'ils se distinguent par ce qu'ils rapportent sur
eux-mêmes plutôt que par l'adresse seule.

## Choix en cours

Aucune des deux options n'est plus correcte que les autres; pour une compatibilité maximale l'authentification **désactivée**. Le prix est que UMS n'a alors aucun compte : il n'y a pas de contrôle d'accès par utilisateur et tout ce qu'il partage est visible à tout sur le réseau qui peut
l'atteindre. Si c'est un problème, restreignez quels appareils peuvent atteindre UMS — voir
[Sécurité et confidentialité](/configuration/security-and-privacy).

Laissez ce **on** si vos joueurs naviguent et jouent pour eux-mêmes, ou si vous avez besoin de la séparation
par utilisateur. C'est la valeur par défaut.
