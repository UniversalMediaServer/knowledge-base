# Sicherheit & Datenschutz

UMS ist ein DLNA-Server. Nun ist DLNA ein Protokoll, das keine wirkliche Vorstellung von einem "Benutzer" hat. Sie müssen sich beispielsweise nicht auf Ihren Fernseher einloggen. Dies führt dazu, dass alle renderer Zugang zu den gleichen Daten erhalten. Das ist vielleicht nicht das, was Sie wollen. Wenn Sie zum Beispiel zwei Ordner kids_safe und kids_unsafe haben, können Sie wollen, dass die Renderer im Kinderzimmer nur Zugriff auf den kids_safe Ordner haben. UMS bietet eine Reihe von Methoden zur Kontrolle des Zugriffs. 

## IP-Filter

IP-Filterung ist die restriktivste Methode, die UMS bietet. Um Sie zu verwenden, geben Sie eine kommaseparierte Liste von IP-Adressen an, die sich verbinden dürfen. Der Netzwerkverkehr eines Renderers, dessen Adresse nicht mit den Einträgen in der Liste übereinstimmt, wird einfach verworfen (sehr früh durch UMS). Er ist nicht in der Lage, auf IRGENDEINEN Ordner zuzugreifen (er wird nicht einmal einen Wurzelordner sehen). Benutzen Sie diese Methode, um die Kinder komplett auszuschließen. Weitere Details finden Sie in der Beschreibung von ip_filter in UMS.conf .

Beispiel um nur 2 Adressen zu erlauben

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## Zulassungsliste

Auflistung zuzulassen ist eine Methode, mit der Sie den Root-Ordner auf der Basis des Renderers anpassen können. Dies ermöglicht es, verschiedene Ordnersätze an verschiedene Renderer weiterzugeben. Es funktioniert wie folgt: Zu Ihrer UMS.conf (derzeit keine GUI Optionen) fügen Sie Zeilen mit tag.option = Wert hinzu, bei dem es sich entweder um eine IP-Adresse oder einen Renderernamen handelt. In einem Renderernamen solltenLeerzeichen durch  _ (Unterstrich) ersetzt werden. Die Option ist eine von

- folders
- vfolders
- web
- hide_set

Der Wert ist abhängig von der Option. Die letzten 4 sind boolesche Werte. für Ordner und virtuelle Ordner ist es eine Liste von Ordnern.

Beispiel

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\child_safe
192.168.1.1.hide_set = true
```

Dies wird für die IP-Adresse 192.168.1.1:

- Teile den Ordner c:\child_safe
- Den Ordner "Servereinstellungen" ausblenden
- Kürzlich gespielte Liste ausblenden

Alle anderen Renderer verwenden die "globalen" Einstellungen, d.h. e alle Ordner und die Server-Einstellungen sehen.

Wenn eine Option nicht vorhanden ist, wird sie auf die "globale"Konfiguration gesetzt, oder wenn diese nicht vorhanden ist, auf den Standardwert.

## UMS.deny

Die Whitelist kann nur das Aussehen des Root-Ordners ändern. Aber wenn Sie die Dinge gemischt haben (Sie haben 10 Ordner, aber nur einer sollte auf die Kinder beschränkt sein). Um den Zugriff auf einzelne Ordner (oder Medien) zu kontrollieren, können Sie UMS.deny verwenden. Es funktioniert wie folgt: Fügen Sie eine Datei namens UMS.deny in das gleiche Verzeichnis wie Ihre UMS.conf-Datei hinzu und fügen Sie dieser Datei Tags hinzu: tag.[name|file|sys]=regex Für jeden hinzuzufügenden Ordner/Datei wird UMS den regulären Ausdruck auf den Ordnernamen oder Dateinamen anwenden und wenn der reguläre Ausdruck mit dem Ordner/Datei übereinstimmt, wird er/sie NICHT hinzugefügt. Zum Beispiel:
```
192.168.1.1.name=.*private.*
```

entfernt alle Verzeichnisse/Dateien, die das Wort privat enthalten.
```
192.168.1.1.file=c:\\tst.*
```

entfernt alle Dateien, die c:\tst im Pfad enthalten, usw.

Wenn in der Datei "UMS.deny" keine Regeln gesetzt sind, werden die Dateien/Ordner hinzugefügt.

Ordner verstecken

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

Alle oben genannten Methoden beschränken den Zugriff durch verschiedene Renderer. Aber wenn Sie Zugang zu einem Renderer erhalten, dem es erlaubt ist, einen Ordner zu sehen, werden Ihnen diese Methoden nicht helfen (wenn die Kinder Zugang zum Wohnzimmer TV haben, der Zugang zu allen Medien hat, dann haben sie Zugang zu diesen Medien). Der PIN-Code löst dieses Problem. Sie können Ordner/Medien hinter einem PIN-Code verstecken, den Sie VOM Renderer aus eingeben müssen. Standardmäßig ist die Eingabe eine Abfolge von Ziffern (0-9) genau wie ein Geldautomaten-Code. Ich empfehle Ihnen dringend, Ziffern-basierte Codes zu verwenden, da es ansonsten schwierig ist, diese im Renderer einzugeben. Aber wenn Sie extra paranoid sind, können Sie Buchstaben hinzufügen. Es funktioniert folgendermassen: Fügen Sie eine Datei UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
