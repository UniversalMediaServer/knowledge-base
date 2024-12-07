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

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Freigegebene Inhalte auf bestimmte Gruppen beschränken

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Ordner verstecken

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN Code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*privat.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Benutzerdefinierte Gerätekonfiguration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
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
