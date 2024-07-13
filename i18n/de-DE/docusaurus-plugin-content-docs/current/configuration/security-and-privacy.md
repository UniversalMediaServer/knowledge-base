# Sicherheit & Datenschutz

## Einleitung

UMS stellt Medien auf zwei Arten zur Verfügung: über DLNA/UPnP für den Konsum über Media-Player-Anwendungen und über HTTP(S) für den Konsum über Webbrowser.

Web-Browser haben eine einfache Sicherheits- und Datenschutzkontrolle, indem sie Benutzerkonten mit Logins haben.

Media-Player-Apps unterstützen im Allgemeinen nicht das Konzept eines "Benutzers", so dass normalerweise jedes Gerät den gleichen Inhalt erhält. Das ist vielleicht nicht das, was Sie wollen. Wenn Sie zum Beispiel zwei Ordner kids_sicher und kids_unsicher haben, möchten Sie eventuell, dass die Renderer im Kinderzimmer nur Zugriff auf den kids_sicher Ordner haben. Eine andere häufiger vorkommende Situation ist, dass Sie im selben Netzwerk sind wie Leute, die üblicherweise keinen Zugriff auf Ihre Medien haben sollen, wie Mitbewohner. Daher möchten man bestimmte Renderer komplett blockieren.

UMS bietet eine Reihe von Methoden zur Kontrolle des Zugriffs.

## Renderer oder Netzwerkgeräte standardmäßig erlauben oder blockieren
Sie können die Standardstrategie für Renderer und Netzwerkgeräte auswählen. Sie können standardmäßig mit Verbots- und Erlaubnis-Listen die vollständige Kontrolle erlauben oder verweigern.

Dies ist nützlich für gemeinsam genutzte Lebenssituationen oder ausgedehnte/wenig vertrauenswürdige lokale Netzwerke. Es ist auch für diejenigen von Ihnen nützlich, die Powerline-Adapter für Ihr Netzwerk verwenden, da dies zu unerwünschten Zugriff von Nachbarn führen kann.

![Beispiel wie man die Netzwerk-Erlaubnis-Einstellung einstellt](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Beispiele wie man die Netzwerk-Erlaubnis-Einstellung einstellt](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Renderer und Netzwerkgeräte blockieren/zulassen

Wenn Sie ausgewählt haben, dass Sie unbekannte Renderer erlauben oder blockieren möchten, können Sie Ihre Verbots- oder Erlaubnis-Liste vom Startbildschirm aus im Einstellungsbereich erstellen.

![Beispiel wie man einen Renderer blockiert](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Person mit Renderer verknüpfen

Sie können Benutzerkonten mit Renderers/Geräten verknüpfen, so dass Sie unabhängige Wiedergabe-Tracking haben können. Wenn Sie z.B. einen Fernseher im Wohnzimmer und einen anderen in Ihrem Schlafzimmer haben, möchten Sie vielleicht nicht, dass der Fernseher im Wohnzimmer das abspielt, was Sie gerade in Ihrem Schlafzimmer schauen.

![Beispiel wie ein Konto einem Renderer zugewiesen werden soll](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Freigegebene Inhalte auf bestimmte Gruppen beschränken

Sie können nun wählen, ob Sie Verzeichnisse oder Online-Inhalte mit bestimmten Gruppen teilen möchten. Wenn Sie zum Beispiel eine Person (oder ein Gerät, das einer Person zugewiesen ist) haben, die ein Kind ist, kann man sie der "Kids" Gruppe zuordnen. Dann geben Sie dieser Gruppe Zugriff auf das Verzeichnis "Familie", aber nicht den Inhalt "Horror" oder "Nur Erwachsene". Oder ihnen Zugriff auf den Kurzgesagt Web-Feed geben, aber nicht auf die Historie Podcasts.

![Beispiel für gemeinsame Inhaltsgruppen](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Ordner verstecken

Steuern Sie die Sichtbarkeit der virtuellen Ordner. Diese Einstellungen finden Sie in der UMS.conf-Datei. Um einige Ordner während des Surfens auszublenden, setzen Sie einfach ihren Wert auf true oder markieren Sie sie im Reiter Navigation/Freigabe Einstellungen aus dem erweiterten GUI-Modus.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Um den Webordner auszublenden, müssen Sie das externe Netzwerk in der Registerkarte Allgemein der Konfiguration im erweiterten GUI-Modus deaktivieren oder den Wert „external_network = false“ in Ihrer UMS.conf Datei setzen. Dies hat den Nebeneffekt, dass der automatische Updater nicht funktioniert. Die Änderungen an der GUI werden nach einem Neustart wirksam.

## PIN Code

Alle oben genannten Methoden beschränken den Zugriff durch verschiedene Renderer. Aber wenn Sie Zugang zu einem Renderer erhalten, dem es erlaubt ist, einen Ordner zu sehen, werden Ihnen diese Methoden nicht helfen (wenn die Kinder Zugang zum Wohnzimmer TV haben, der Zugang zu allen Medien hat, dann haben sie Zugang zu diesen Medien). Der PIN-Code löst dieses Problem. Sie können Ordner/Medien hinter einem PIN-Code verstecken, den Sie VOM Renderer aus eingeben müssen. Standardmäßig ist die Eingabe eine Abfolge von Ziffern (0-9) genau wie ein Geldautomaten-Code. Ich empfehle Ihnen dringend, Ziffern-basierte Codes zu verwenden, da es ansonsten schwierig ist, diese im Renderer einzugeben. Aber wenn Sie extra paranoid sind, können Sie Buchstaben hinzufügen. Es funktioniert folgendermassen: Fügen Sie eine Datei UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. Es gibt keine Längenbeschränkung für den Code. Zum Beispiel:
```
.*privat.*,1234
```

Es zwingt Sie, einen Code einzugeben, wenn der Ordner/Medien das Wort "privat" enthalten -der korrekte Code ist 1234. Der Code bleibt dann für 4 Stunden gültig (wenn Sie diese Zeit nicht ändern).

## Benutzerdefinierte Gerätekonfiguration

Jede Konfigurationseigenschaft kann auch auf einer Geräte-Basis festgelegt werden, indem eine benutzerdefinierte Gerätekonfiguration erstellt wird, um die Standardeinstellungen für UMS zu überschreiben (vollständige Informationen hierzu finden Sie unter Erstellen einer benutzerdefinierten Gerätekonfiguration).

Zum Beispiel, um das Kinder-TV anzupassen:
- Klicken Sie auf die Schaltfläche 'Dieses Gerät anpassen' oben rechts im GUI-Popup des Renderers und geben Sie einen Namen für die Konfiguration an.
- In der neuen conf-Datei, die sich öffnet, fügen Sie alle Einstellungen hinzu, die Sie für den TV überschreiben möchten., z.B. um den Servernamen zu ändern und verschiedene Ordner anzugeben:
```
#--------------------------------------------------------------------------------------------
# Benutzerdefiniertes Geräteprofil
# Siehe DefaultRenderer.conf für Beschreibungen aller möglichen Renderer-Optionen
# und UMS.conf für Programmoptionen.

# Die Einstellungen in dieser Datei überschreiben die Standardeinstellungen für das/die unten aufgeführte(n) spezielle(n) Sony Bravia EX-Gerät(e) .
# Geben Sie Geräte durch uuid an  (oder Adresse, wenn keine uuid), durch Kommas getrennt, wenn es mehrere Geräte sind.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
