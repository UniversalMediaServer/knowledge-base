# Sicherheit & Datenschutz

## Einleitung

UMS stellt Medien auf zwei Arten zur Verfügung: über DLNA/UPnP für den Konsum über Media-Player-Anwendungen und über HTTP(S) für den Konsum über Webbrowser.

Web-Browser haben eine einfache Sicherheits- und Datenschutzkontrolle, dadurch dass sie Benutzerkonten mit Logins besitzen.

Media-Player-Apps unterstützen im Allgemeinen nicht das Konzept eines "Benutzers", so dass normalerweise jedes Gerät den gleichen Inhalt erhält. Das ist vielleicht nicht das, was Sie wollen. Wenn Sie zum Beispiel zwei Ordner kinder_sicher und kinder_unsicher haben, möchten Sie vermutlich, dass die Renderer im Kinderzimmer nur Zugriff auf den kinder_sicher Ordner haben. Eine andere häufiger vorkommende Situation ist, dass Sie im selben Netzwerk sind wie Leute, von denen Sie nicht wollen, dass sie Zugriff auf Ihre Medien haben, wie etwa Mitbewohner. Daher möchten Sie bestimmte Renderer komplett blockieren.

UMS bietet eine Reihe von Methoden für die Zugriffskontrolle in solchen Situationen.

## Renderer oder Netzwerkgeräte standardmäßig erlauben oder blockieren
Sie können die Standardstrategie für Renderer und Netzwerkgeräte auswählen. Sie können standardmäßig über Verbots- und Erlaubnis-Listen gestatten oder verbieten. So haben Sie die vollständige Kontrolle.

Dies ist nützlich für gemeinschaftliche Wohnsituationen oder für sehr oder wenig vertrauenswürdige lokale Netzwerke. Es ist auch für diejenigen von Ihnen nützlich, die Powerline-Adapter für Ihr Netzwerk verwenden, da dies zu unerwünschtenm Zugriff durch Nachbarn führen kann.

![Beispiel für das Anlegen einer Netzwerk-Erlaubnis-Einstellung](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Beispiel für das Anlegen einer Netzwerk-Erlaubnis-Einstellung](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Renderer und Netzwerkgeräte blockieren/zulassen

Wenn Sie gewählt haben, ob Sie unbekannte Renderer erlauben oder blockieren möchten, können Sie Ihre Verbots- oder Erlaubnis-Liste vom Startbildschirm aus im Einstellungsbereich erstellen.

![Beispiel für das Blockieren eines Renderers](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Person mit Renderer verknüpfen

Sie können die Benutzerkonten mit Renderern/Wiedergabegeräten verknüpfen. Dies erlaubt Ihnen einen eigenen/unabhängigen Zugang und die Verfolgung der Inhalte, die abgespielt wurden.

Wenn Sie z.B. einen Fernseher im Wohnzimmer haben und einen in ihrem Schlafzimmer, muss der Wohnzimmer-Fernseher nicht das Gleiche abspielen müssen wie der im Schlafzimmer.

![Beispiel für die Verknüpfung eines Kontos mit einem Renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Freigegebene Inhalte auf bestimmte Gruppen beschränken

Sie können jetzt wählen, welche Verzeichnisse oder welcher Online-Inhalt für gewisse Gruppen freigegeben werden soll. Wenn Sie z. B. eine Person haben (oder ein Gerät, das einer Person zugeordnet ist), die ein Kind ist, können Sie das Kind der Gruppe "Kinder" zuordnen und dieser Gruppe Zugriff auf das Verzeichnis "Familie" geben, aber nicht auf die Inhalte "Horror" oder "Nur für Erwachsene" geben. Oder geben Sie ihnen Zugriff auf den "Kurz gesagt" - Web-Feed, aber nicht auf die Geschichts-Podcasts.

![Beispiel für Gruppen mit freigegebenen Inhalten](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Ordner verstecken

Die Sichtbarkeit von virtuellen Verzeichnissen kontrollieren. Diese Einstellungen befinden sich in der Datei UMS.conf. Um bestimmte Verzeichnisse für die Suche auszublenden,  setzen Sie einfach ihren Wert auf "true" oder markieren Sie diese auf der Registerkarte Navigation/Freigabeeinstellungen im erweiterten GUI-Modus.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Um den Web-Ordner auszublenden, müssen Sie auf der Registerkarte "Allgemeine Konfiguration" im erweiterten GUI-Modus die Option "Externes Netzwerk aktivieren" deaktivieren oder den Wert von "external_network =" in der Datei UMS.conf auf "false" ändern. Dies hat den Nebeneffekt, dass der automatische Updater nicht mehr funktioniert. Die über die grafische Benutzeroberfläche vorgenommene(n) Änderung(en) werden erst nach einem Neustart wirksam.

## PIN-Code

Alle oben genannten Methoden schränken den Zugriff von verschiedenen Wiedergabegeräten/Renderern ein. Wenn Sie jedoch Zugriff auf ein Wiedergabegerät/Renderer bekommen können, der einen Ordner sehen darf, helfen Ihnen diese Methoden nicht weiter (wenn die Kinder Zugriff auf den Fernseher im Wohnzimmer haben, der Zugriff auf alle Medien hat, haben sie auch Zugriff auf diese Medien). Der PIN-Code löst dieses Problem. Er ermöglicht es Ihnen, Ordner/Medien hinter einem PIN-Code zu verstecken, den Sie VOR der Wiedergabe eingeben müssen. Standardmäßig ist die Eingabe eine Ziffernfolge (0-9), genau wie bei einem Geldautomaten.  Ich empfehle Ihnen dringend, auf Ziffern basierende Codes zu verwenden, da es sonst schwierig wird, sie vom Renderer aus einzugeben. Sollten Sie besonders sicherheitsbewusst sein, können Sie auch Buchstaben hinzufügen. Fügen Sie eine Datei namens UMS.code in dasselbe Verzeichnis wie Ihre UMS.conf ein und fügen Sie in diese Datei "regexp,code" ein, wobei "regexp" ein regulärer Ausdruck wie in der Datei "UMS.deny" ist und "code" der Code ist, welcher den Zugriff auf den Ordner/das Medium gewährt. Für den Code ist keine bestimmte Länge vorgeschrieben. Zum Beispiel:
```
.*privat.*,1234
```

Zwingt Sie zur Eingabe eines Codes, wenn der Ordner/das Medium das Wort "privat" enthält. Der richtige Code ist 1234. Der Code bleibt dann 4 Stunden lang gültig (wenn Sie ihn in dieser Zeit nicht ändern).

## Benutzerdefinierte Gerätekonfiguration

Jede Konfiguration kann auch auf Gerätebasis festgelegt werden, indem eine benutzerdefinierte Gerätekonfiguration erstellt wird, die die Standard-UMS-Einstellungen außer Kraft setzt (weitere Informationen finden Sie unter "Erstellen einer benutzerdefinierten Gerätekonfiguration").

Zum Beispiel eine benutzerdefinierte Einstellung für den Fernseher der Kinder:
- Klicken Sie auf die Schaltfläche 'Dieses Gerät anpassen' oben rechts im GUI-Popup des Renderers und geben Sie einen Namen für die Konfiguration an.
- In der neuen conf-Datei, die sich öffnet, fügen Sie alle Einstellungen hinzu, die Sie für den Fernseher überschreiben möchten., z.B. den Servernamen zu ändern und verschiedene Ordner anzugeben:
```
#--------------------------------------------------------------------------------------------
# Benutzerdefiniertes Geräteprofil
# Siehe DefaultRenderer.conf für Beschreibungen aller möglichen Renderer-Optionen
# und UMS.conf für Programmoptionen.

# Einstellungen in dieser Datei überschreiben die Standardeinstellungen für das/die unten aufgeführte(n) standardmässige(n) Sony Bravia EX-Gerät(e) .
# Geben Sie Geräte nach uuid an  (oder Adresse, wenn keine uuid gibt), durch Kommata getrennt, wenn es mehrere Geräte sind.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
