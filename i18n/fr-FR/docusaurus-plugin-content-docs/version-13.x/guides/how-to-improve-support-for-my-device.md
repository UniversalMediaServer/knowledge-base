# Comment améliorer la prise en charge de mon appareil

Si votre appareil ne fait rien, comme naviguer dans des dossiers ou lire un fichier, vous pouvez peut-être le corriger en modifiant les paramètres dans le fichier de configuration du moteur de rendu. Différents appareils/renders/clients communiquent avec des serveurs comme UMS de différentes manières, de sorte que le fichier de configuration indique à UMS comment parler la même langue que votre appareil.

Nous avons un fichier de configuration de rendu par défaut qui contient de la documentation sur tous nos paramètres de rendu . Voir la dernière version sur https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Les paramètres les plus courants sont `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize` et `ChunkedTransfer`.

En plus de cela, vous pouvez consulter d'autres configurations de rendu dans le dossier "renderers" de votre dossier d'installation, pour voir ce qu'ils font. Parfois, vous aurez besoin d'aide, que nous pouvons vous donner sur notre forum, et s'il vous plaît n'oubliez pas de nous parler de l'amélioration lorsque vous le faites, afin que les autres utilisateurs de votre appareil puissent bénéficier de la correction. Nous vous créditerons dans l'annonce de la version et dans le journal des modifications.

Si vous avez une nouvelle configuration de rendu à apporter au projet, veuillez créer une **Pull Request** sur notre dépôt GitHub https://github.com/UniversalMediaServer/UniversalMediaServer
