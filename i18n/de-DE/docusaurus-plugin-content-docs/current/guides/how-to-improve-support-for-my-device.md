# Wie kann ich den Support für mein Gerät verbessern

Wenn Ihr Gerät nichts tut, wie zum Beispiel Ordner durchsuchen oder eine Datei abspielen kann es sein, dass Sie es durch Ändern der Einstellungen in der Renderer Konfigurationsdatei beheben. Verschiedene Geräte/Renderers/Clients kommunizieren mit Servern wie UMS auf unterschiedliche Weise. Die Konfigurationsdatei teilt UMS mit, wie man die gleiche Sprache spricht wie Ihr Gerät.

Jedes Konfigurations-Profil verfolgt zwei Zwecke:
- UMS erlauben, beim Verbindungsversuch einen speziellen Renderer zu erkennen
- Die Möglichkeiten dieses Renderers definieren

Wir haben eine Standard-Renderer-Konfigurationsdatei, die Dokumentation über alle Renderer-Einstellungen enthält. Sieh Dir die neueste Version unter https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf an

## Unterstützung für ein nicht erkanntes Gerät hinzufügen

Wenn UMS Ihr Gerät nicht erkennt, bedeutet dies, dass keines der Konfigurations-Profile für den Renderer mit Ihrem Gerät übereinstimmt. Das Ergebnis ist, dass UMS `Unbekannter Renderer` anzeigt. Da es die Fähigkeiten Ihres Renderers nicht kennt, kann es keine optimale Ausgabe für Ihr Gerät liefern.

Die Lösung ist es zu versuchen eine eigene Renderer-Konfiguarationsdatei zu erstellen.
1. Machen Sie eine Kopie der Konfigurationsdatei, die Ihrem Gerät am nächsten kommt. Wenn z.B. Ihr Samsung TV nicht erkannt wird, ist eine von den Samsung TV-Konfigurationen ein guter Ausgangspunkt.

1. Gehen Sie zum `Logs` - Tab in UMS suchen Sie nach dem Text `Media - Renderer wurde nicht erkannt. Es ist möglich, HTTP - Header zu identifizieren:`. Diese Information ist notwendig, damit UMS Ihr Gerät erkennen kann.

1. Suchen Sie in Ihrer neuen Konfigurationsdatei nach der Zeile, welche `UserAgentSearch` und/oder `UpnpDetailsSearch` und ersetzen Sie die Werte durch diese Identifikationsinformationen.

1. Durchsuchen und spielen Sie einige Medien auf Ihrem Gerät ab. Merken Sie sich, bei welchem Medium es ein Abspiel - Problem gab. Jetzt können Sie zum nächsten Abschnitt weitergehen, um die Unterstützung für Ihr Gerät zu verbessern.

## Die Unterstützung für ein Gerät verbessern

1. Wenn es ein Problem beim Abspielen eines Ihrer Medien gibt, sollte die Konfiguration des Renderers so lange geändert werden, bis er funktioniert. Für die vollständige Liste der Optionen konsultieren Sie die [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) Die am häufigsten zu ändernden sind:
    ```
    Video
Audio
Bild
Video transkodieren
Audio transkodieren
Suche nach Abspieldauer
Unterstützt
    ```
    Vergewissern Sie sich, dass Sie nicht `MediaInfo = false` in Ihrer neuen Konfiguration haben. Damit würden die Zeilen `Supported` nicht mehr funktionieren.

1. Um sicherzustellen, dass die Transkodierung auf Ihrem Gerät funktioniert, spielen Sie eine Datei aus dem Ordner </code>#--UMWANDLUNG--#</0> ab. Spielen Sie in diesem Ordner einen der `FFmpeg`  - Einträge ab. Wenn es abgespielt wird, funktioniert die Transkodierung / Umwandlung.

1. Die Zeilen unter <0>Supported</0> müssen Einträge enthalten, um UMS mitzuteilen, welche Dateien durch Ihr Gerät von Haus aus unterstützt werden. Es kann eine gute Idee sein, das Handbuch für Ihr Gerät online zu finden und es für Einträge in diesen Zeilen zu verwenden.

1. Zusätzlich kannst Du Dir andere Renderer Konfigurationen anschauen, die sich im "renderers" Ordner des Installationsverzeichnisses befinden, um zu sehen, was sie bewirken. Manchmal brauchst Du Hilfe, die wir Dir in unserem Forum geben können und denk bitte daran, uns die erreichten Verbesserungen mitteilen, damit andere Benutzer von der Lösung profitieren könnnen.  Wir werden Dich in unserer Release Ankündigung und der Änderungshistorie lobend erwähnen.
