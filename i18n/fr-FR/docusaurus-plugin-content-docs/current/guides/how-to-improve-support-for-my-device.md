# Comment améliorer la prise en charge de mon appareil

Si votre appareil ne fait rien, comme naviguer dans des dossiers ou lire un fichier, vous pouvez peut-être le corriger en modifiant les paramètres dans le fichier de configuration du moteur de rendu. Différents appareils/renders/clients communiquent avec des serveurs comme UMS de différentes manières, de sorte que le fichier de configuration indique à UMS comment parler la même langue que votre appareil.

Every configuration profile serves two purposes:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

Nous avons un fichier de configuration de rendu par défaut qui contient de la documentation sur tous nos paramètres de rendu . Voir la dernière version sur https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Adding support for an unrecognized device

When UMS does not recognize your device, it means none of the renderer configuration profiles match your device. The result is that UMS displays an `Unknown Renderer`, and since it does not know the possibilities of your renderer, it cannot provide optimized output for your device.

The solution is to try creating your own renderer configuration file.
1. Make a copy of the .conf file that is closest to your device. For example, if your Samsung TV is not recognized, one of the Samsung TV configs might be a good place to start from.

1. Go to the `Logs` tab in UMS and look for the text `Media renderer was not recognized. Possible identifying HTTP headers:`. That information is what is needed to make UMS recognize your device.

1. In your new .conf file, look for the line that defines `UserAgentSearch` and/or `UpnpDetailsSearch` and replace the values with that identifying information.

1. Browse and play some media on your device. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Improving support for a device

1. If any of your media has a problem playing, the renderer config should be modified until it works. Refer to [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) for the full list of options. The most common ones to change are:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Make sure you do not have `MediaInfo = false` in your new config, because that will stop the `Supported` lines from working.

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. En plus de cela, vous pouvez consulter d'autres configurations de rendu dans le dossier "renderers" de votre dossier d'installation, pour voir ce qu'ils font. Parfois, vous aurez besoin d'aide, que nous pouvons vous donner sur notre forum, et s'il vous plaît n'oubliez pas de nous parler de l'amélioration lorsque vous le faites, afin que les autres utilisateurs de votre appareil puissent bénéficier de la correction. Nous vous créditerons dans l'annonce de la version et dans le journal des modifications.
