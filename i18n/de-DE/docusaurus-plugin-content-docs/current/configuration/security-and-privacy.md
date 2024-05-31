# Sicherheit & Datenschutz

## Einleitung

UMS stellt Medien auf zwei Arten zur Verfügung: über DLNA/UPnP für den Konsum über Media-Player-Anwendungen und über HTTP(S) für den Konsum über Webbrowser.

Web browsers have easy security and privacy control by having user accounts with logins.

Media player apps do not generally support the concept of a "user", so usually every device gets the same content. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want to restrict the renderers in the kids' room to only have access to the kids_safe folder. Another common situation is you are on the same network as people you do not want to have access to your media, like flatmates, so you want to block certain renderers completely.

UMS provides a number of methods to control access in those situations.

## Allow or block renderers or network devices by default
You can choose the default strategy for renderers and network devices. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

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
