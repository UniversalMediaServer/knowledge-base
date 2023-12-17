# Wie kann ich den Support für mein Gerät verbessern

Wenn Ihr Gerät nichts tut, wie zum Beispiel Ordner durchsuchen oder eine Datei abspielen kann es sein, dass Sie es durch Ändern der Einstellungen in der Renderer Konfigurationsdatei beheben. Verschiedene Geräte/Renderers/Clients kommunizieren mit Servern wie UMS auf unterschiedliche Weise. Die Konfigurationsdatei teilt UMS mit, wie man die gleiche Sprache spricht wie Ihr Gerät.

Wir haben eine Standard-Renderer-Konfigurationsdatei, die Dokumentation über alle Renderer-Einstellungen enthält. Sieh Dir die neueste Version unter https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf an

Gängige Einstellungen, die überprüft werden sollten sind: `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileGröße`und `ChunkedTransfer`.

Zusätzlich kannst Du Dir andere Renderer Konfigurationen anschauen, die sich im "renderers" Ordner des Installationsverzeichnisses befinden, um zu sehen, was sie bewirken. Manchmal brauchst Du Hilfe, die wir Dir in unserem Forum geben können und denk bitte daran, uns die erreichten Verbesserungen mitteilen, damit andere Benutzer von der Lösung profitieren könnnen.  Wir werden Dich in unserer Release Ankündigung und der Änderungshistorie lobend erwähnen.

Wenn Sie eine neue Renderer Konfiguration haben, um zum Projekt beizutragen, erstellen Sie bitte einen **Pull Request** auf unserem GitHub Repository https://github.com/UniversalMediaServer/UniversalMediaServer
