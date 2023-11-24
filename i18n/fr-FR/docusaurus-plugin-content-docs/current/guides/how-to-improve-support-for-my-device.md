# How to improve support for my device

If your device is failing to do anything, like browsing folders or playing a file, it may be possible for you to fix it by changing settings in the renderer config file. Different devices/renderers/clients communicate with servers like UMS in different ways, so the config file tells UMS how to speak the same language as your device.

We have a default renderer config file that contains documentation on all of our renderer settings. See the latest version at https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Common settings to look at are `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, and `ChunkedTransfer`.

En plus de cela, vous pouvez consulter d'autres configurations de rendu dans le dossier "renderers" de votre dossier d'installation, pour voir ce qu'ils font. Parfois, vous aurez besoin d'aide, que nous pouvons vous donner sur notre forum, et s'il vous plaît n'oubliez pas de nous parler de l'amélioration lorsque vous le faites, afin que les autres utilisateurs de votre appareil puissent bénéficier de la correction. Nous vous créditerons dans l'annonce de la version et dans le journal des modifications.

Si vous avez une nouvelle configuration de rendu à apporter au projet, veuillez créer une **Pull Request** sur notre dépôt GitHub https://github.com/UniversalMediaServer/UniversalMediaServer
