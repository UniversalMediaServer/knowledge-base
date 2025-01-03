# Comment améliorer la prise en charge de mon appareil

Si votre appareil ne fait rien, comme naviguer dans des dossiers ou lire un fichier, vous pouvez peut-être le corriger en modifiant les paramètres dans le fichier de configuration du moteur de rendu. Différents appareils/renders/clients communiquent avec des serveurs comme UMS de différentes manières, de sorte que le fichier de configuration indique à UMS comment parler la même langue que votre appareil.

Chaque profil de configuration a deux objectifs :
- Autoriser UMS à reconnaître un moteur de rendu spécifique lorsqu'il tente de se connecter
- Définir les possibilités de ce moteur de rendu

Nous avons un fichier de configuration de rendu par défaut qui contient de la documentation sur tous nos paramètres de rendu . Voir la dernière version sur https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Ajout de la prise en charge d'un appareil non reconnu

Lorsque UMS ne reconnaît pas votre appareil, cela signifie qu'aucun des profils de configuration du moteur de rendu ne correspond à votre appareil. Le résultat est que UMS affiche un `Moteur de rendu inconnu`, et comme il ne connaît pas les possibilités de votre moteur de rendu, il ne peut pas fournir de sortie optimisée pour votre appareil.

La solution consiste à essayer de créer votre propre fichier de configuration du moteur de rendu.
1. Faites une copie du fichier .conf le plus proche de votre appareil. Par exemple, si votre téléviseur Samsung n'est pas reconnu, l'une des configurations Samsung TV peut être un bon point de départ.

1. Allez à l'onglet `Logs` dans UMS et recherchez le texte `Le moteur de rendu n'a pas été reconnu. Identification possible des en-têtes HTTP :`. Cette information est nécessaire pour que UMS reconnaisse votre appareil.

1. Dans votre nouveau fichier .conf, recherchez la ligne qui définit `UserAgentSearch` et/ou `UpnpDetailsSearch` et remplacez les valeurs par ces informations d'identification.

1. Parcourir et lire des médias sur votre appareil. Prenez note des médias qui ont eu des problème de lecture. Vous pouvez maintenant passer à la section suivante pour améliorer la prise en charge de votre appareil.

## Amélioration de la prise en charge d'un appareil

1. Si un de vos médias a un problème de lecture, la configuration du moteur de rendu doit être modifiée jusqu'à ce qu'il fonctionne. Reportez-vous à [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) pour la liste complète des options. Les changements les plus courants sont :
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Assurez-vous de ne pas avoir `MediaInfo = false` dans votre nouvelle configuration, car cela empêchera les lignes `Supported` de fonctionner.

1. Pour vous assurer que le transcodage fonctionne sur votre appareil, lisez un fichier depuis le dossier `#--TRANSCODE--#`. Dans ce dossier, jouer une des entrées `FFmpeg`. S'il joue, alors le transcodage fonctionne.

1. Les lignes `Supported` doivent être remplies pour indiquer à UMS les fichiers que votre appareil prend en charge nativement. Il peut être utile de trouver le manuel de votre appareil en ligne et de l'utiliser pour remplir ces lignes.

1. En plus de cela, vous pouvez consulter d'autres configurations de rendu dans le dossier "renderers" de votre dossier d'installation, pour voir ce qu'ils font. Parfois, vous aurez besoin d'aide, que nous pouvons vous donner sur notre forum, et s'il vous plaît n'oubliez pas de nous parler de l'amélioration lorsque vous le faites, afin que les autres utilisateurs de votre appareil puissent bénéficier de la correction. Nous vous créditerons dans l'annonce de la version et dans le journal des modifications.
