# Kuinka parantaa laitteeni tukea

Jos laitteesi ei tee mitään, kuten hakemistojen selaamista tai tiedoston toistamista, on mahdollista, että voit korjata sen muuttamalla asetuksia renderoijan asetustiedostossa. Different devices/renderers/clients communicate with servers like UMS in different ways, so the config file tells UMS how to speak the same language as your device.

Jokaisella asetusprofiililla on kaksi toimintoa:
- UMS tunnistaa tietyn renderoijan kun se ottaa yhteyttä
- Määritää mihin renderoija kykenee

We have a default renderer config file that contains documentation on all of our renderer settings. See the latest version at https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

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

1. As well as that, you can have a look at other renderer configs inside the "renderers" folder in your installation directory, to see what they are doing. Sometimes you will need help, which we can give you on our forum, and please remember to tell us about the improvement when you make it, so that other users with your device can benefit from the fix. We will credit you in our release announcement and changelog.
