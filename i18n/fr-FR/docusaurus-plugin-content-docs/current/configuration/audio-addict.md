# Radio réseau Audio Addict

Le **Audio Addict Network** est une collection de stations de radio Internet premium, y compris :

Radio Classique, Radio Tunes, Radio Rock, Radio Jazz, Radio Zen et DI.fm.

Un **compte premium** payant est nécessaire pour accéder à ces stations de radio. Il vous suffit de vous inscrire sur l'un des sites car le même nom d'utilisateur et mot de passe vous donneront accès à tous ces sites.

UMS lit automatiquement tous les sites radio AudioAddict disponibles, leurs canaux et leurs filtres. Le canal **Favoris** est également pris en charge.

## Paramètres

Pour activer le support d'AudioAddict, ajoutez les lignes suivantes à votre fichier `UMS.conf` :

```
# TRUE = préfère le serveur de streaming européen
audio_addict_europe = TRUE ou FALSE

# Votre nom d'utilisateur
audio_addict_user = USERNAME

# Votre mot de passe
audio_addict_pass = PASSWORD
```

## Localisation

Le dossier **Audio Addict Radio Network** se trouve dans votre médiathèque. A partir de là, vous pouvez naviguer et accéder directement à toutes les stations disponibles.

## Montre et épisodes

Outre les stations en direct, le réseau DI.fm offre un dossier **Événements**. Il liste les émissions à venir, et
pour une série qui a déjà été diffusée, il offre également l'enregistrement, pour que vous puissiez l'écouter
par la suite.

Montre avec un catalogue arrière obtenir un dossier de leur propre tenant les épisodes plus anciens. Certaines séries en comptentdes centaines, le dossier est donc divisé en groupes plus petits, chacun étiqueté avec les numéros d'épisodeset les dates qu'il contient.

```
# Combien d'épisodes un groupe contient avant d'être divisé. Défaut 20, minimum 1.
audio_addict_episodes_per_container = 20
```

Construire cette liste signifie demander au service pour les événements et pour les épisodes de chaque série, ce qui prend
un instant. UMS se souvient de la réponse afin que la navigation et le démarrage de la lecture ne payent pas chacun pour
à nouveau:

```
# Combien de temps les listes de séries et d'épisodes sont réutilisées, en minutes.
# Par défaut 60. Mettre à 0 pour demander au service à chaque fois.
audio_addict_tree_cache_ttl_minutes = 60
```

Un temps plus long rend la navigation plus rapide, un plus court ramasse plus tôt les épisodes nouvellement publiés. Les adresses
que l'UMS reçoit restent valides bien plus longtemps que l'heure par défaut, donc il n'est pas nécessaire de garder cette valeur
petite.

## Titre en direct

Les stations Audio Addict n'annoncent pas la piste en cours dans le flux audio. UMS interroge le
service à sa place et transmet le résultat à votre lecteur, vous permettant ainsi de toujours voir ce qui est en cours de lecture. Ceci estdécrit dans [Internet radio and live titles](./internet-radio).

```
# Envoyer des titres en direct pour les stations Audio Addict. Activé par défaut.
audio_addict_icy_metadata = TRUE
```

## Playlists enregistrées

Les listes de lecture conservées jouent une piste après une autre depuis votre compte. Lorsque la playlist atteint sa fin,
UMS peut recommencer au lieu de s'arrêter:

```
# Redémarre une playlist organisée quand elle se termine. Désactivé par défaut.
audio_addict_playlist_loop = FALSE
```

## Tous les paramètres en un coup d'œil

| Réglages                              | Par défaut | Raison                                                              |
| ------------------------------------- | ---------- | ------------------------------------------------------------------- |
| `audio_addict_user`                   | —          | Votre nom de compte                                                 |
| `audio_addict_pass`                   | —          | Votre mot de passe                                                  |
| `audio_addict_europe`                 | `TRUE`     | Préférer le serveur de streaming européen                           |
| `audio_addict_icy_metadata`           | `TRUE`     | Envoyer des titres en direct au lecteur                             |
| `audio_addict_episodes_per_container` | `20`       | Épisodes par groupe avant de séparer                                |
| `audio_addict_tree_cache_ttl_minutes` | `60`       | Combien de temps les listes de séries et d'épisodes sont réutilisés |
| `audio_addict_playlist_loop`          | `FALSE`    | Répéter une playlist organisée à la fin                             |
