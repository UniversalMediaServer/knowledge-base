# Hogyan javíthatom a készülékem támogatását

Ha a készülék nem tud semmit sem csinálni, például nem tud mappákat böngészni vagy nem tud lejátszani egy fájlt, akkor a renderelő konfigurációs fájl beállításainak módosításával lehet, hogy orvosolni tudja a problémát. A különböző eszközök/megjelenítők/kliensek különböző módon kommunikálnak az UMS-hez hasonló szerverekkel, ezért a konfigurációs fájl megmondja az UMS-nek, hogyan beszéljen ugyanazon a nyelven, mint az Ön eszköze.

Every configuration profile serves two purposes:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

Van egy alapértelmezett renderelő konfigurációs fájlunk, amely tartalmazza az összes renderelő beállítás dokumentációját. A legfrissebb verzió a https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf oldalon található.

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

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. Jó megoldás lehet, ha az interneten megkeresi a készülék kézikönyvét, és azt használja fel a sorok kitöltéséhez.

1. Ezen kívül megnézheted a többi megjelenítő konfigurációját is a telepítési könyvtárad "renderers" mappájában, hogy lásd, mit csinálnak. Néha segítségre lesz szüksége, amit a fórumunkon tudunk megadni, és kérjük, ne felejtsen el szólni nekünk a javításról, ha elvégezte, hogy más felhasználók is részesülhessenek a javításból. A kiadási közleményünkben és a changelogban meg fogjuk említeni.
