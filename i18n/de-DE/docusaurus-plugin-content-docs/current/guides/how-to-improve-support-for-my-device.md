# Wie kann ich den Support für mein Gerät verbessern

Wenn Ihr Gerät nichts tut, wie zum Beispiel Ordner durchsuchen oder eine Datei abspielen kann es sein, dass Sie es durch Ändern der Einstellungen in der Renderer Konfigurationsdatei beheben. Verschiedene Geräte/Renderers/Clients kommunizieren mit Servern wie UMS auf unterschiedliche Weise. Die Konfigurationsdatei teilt UMS mit, wie man die gleiche Sprache spricht wie Ihr Gerät.

Jedes Konfigurations-Profil verfolgt zwei Zwecke:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

Wir haben eine Standard-Renderer-Konfigurationsdatei, die Dokumentation über alle Renderer-Einstellungen enthält. Sieh Dir die neueste Version unter https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf an

## Adding support for an unrecognized device

When UMS does not recognize your device, it means none of the renderer configuration profiles match your device. The result is that UMS displays an `Unknown Renderer`, and since it does not know the possibilities of your renderer, it cannot provide optimized output for your device.

Die Lösung ist es zu versuchen eine eigene Renderer-Konfiguarationsdatei zu erstellen.
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

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. Wenn es abgespielt wird, funktioniert die Transkodierung / Umwandlung.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Zusätzlich kannst Du Dir andere Renderer Konfigurationen anschauen, die sich im "renderers" Ordner des Installationsverzeichnisses befinden, um zu sehen, was sie bewirken. Manchmal brauchst Du Hilfe, die wir Dir in unserem Forum geben können und denk bitte daran, uns die erreichten Verbesserungen mitteilen, damit andere Benutzer von der Lösung profitieren könnnen.  Wir werden Dich in unserer Release Ankündigung und der Änderungshistorie lobend erwähnen.
