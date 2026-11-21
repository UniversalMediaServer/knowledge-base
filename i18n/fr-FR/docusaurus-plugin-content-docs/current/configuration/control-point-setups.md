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
autorisé à voir est également ce qu'il peut lire. This is the right behaviour for a household with
several accounts and per-user access, and it assumes a two-box arrangement.

With authentication **off**, UMS stops assuming the two are the same. It determines the playing
device at the moment the audio is requested, from that request itself — its address and what it says
about itself — and makes the conversion decision for _that_ device. The identity in the browse
request is then understood as the control point it actually is.

Two devices sharing one address, which happens when the control point and the renderer run on the
same machine, are still told apart, because they are distinguished by what they report about
themselves rather than by the address alone.

## Choosing

Neither setting is more correct than the other; for maximum compatibility turn authentication **off**. The price is that UMS then has no accounts: there is no per-user access control, and everything it shares is visible to everything on the network that can
reach it. If that is a concern, restrict which devices may reach UMS at all — see
[Security and privacy](/configuration/security-and-privacy).

Leave it **on** if your players browse and play for themselves, or if you need the per-user
separation. This is the default.
