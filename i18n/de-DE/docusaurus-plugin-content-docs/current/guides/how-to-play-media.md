# Wie man Medien abspielt

Dieser Artikel erklärt die 4 wichtigsten Möglichkeiten zum Abspielen von Video, Audio und Bildern über UMS.

## 1: Wiedergabe von einer Renderer-Schnittstelle

Wenn Ihr Renderer mit UMS über DLNA/UPnP verbunden ist, wird esr oft in einem Menü mit dem Namen "Media Servers" oder etwas Ähnlichem angezeigt, je nach Renderer. Von hier aus können Sie sich mit UMS verbinden und sich die Medien anzeigen lassen, auf die Sie zugreifen möchten.

Die Implementierung variiert stark je nach Renderer, aber die Kernfunktionalität ist dieselbe; navigieren Sie zu den ausgewählten Medien und wählen Sie sie zum Abspielen aus.

## 2: Vom UMS-Interface zu einem Renderer senden

Die UMS-Interface selbst hat die Möglichkeit, Medien an die Renderer zu senden, wenn sie diese UPnP-Funktion unterstützen. Es ist ein ähnliches Konzept wie eine Sendung.

1. Öffnen Sie die UMS-Oberfläche und identifizieren Sie den Renderer, an den Sie die Medien senden möchten. In diesem Fall ist es der Fernseher Panasonic VIERA VT60 Serie.  
   ![Die GUI öffnen](@site/docs/guides/img/how-to-play-media-1.png)
2. Klicken Sie auf das Renderer-Bild, um das Bedienfeld zu öffnen  
   ![Renderer-Steuerung](@site/docs/guides/img/how-to-play-media-2.png)
3. Wählen Sie die Datei aus, die Sie senden möchten, indem Sie auf das Ordnersymbol unten rechts klicken, und es wird links unten eingetragen. Wenn Sie die Abspieler-Steuerelemente in diesem Fenster nicht sehen, unterstützt Ihr Renderer diese Funktion nicht. Vergewissern Sie sich, dass Sie auf verfügbare Firmware-/Software-Aktualisierungen für Ihren Renderer geprüft haben,da diese Unterstützung möglicherweise hinzugefügt wurde  
   ![Ausgewählte Datei](@site/docs/guides/img/how-to-play-media-3.png)
4. Sie können jetzt entweder eine Wiedergabeliste erstellen, indem Sie auf das Plus-Symbol direkt rechts neben dem Eingabefeld klicken oder Sie könnnen die Datei an Ihren Renderer senden, indem Sie auf das Play-Icon direkt über der Mitte des Eingabefeldes klicken. Dies startet die Wiedergabe über Ihren Renderer.

## 3: Wiedergabe über die Weboberfläche

Die Web-Schnittstelle ist überall in Ihrem lokalen Netzwerk zugänglich, auch auf Computern und Renderern/Abspielgeräten. In vielerlei Hinsicht bietet es unsere fortschrittlichste Benutzeroberfläche und mitsamt deren Funktionen.

1. Öffnen Sie die Web-Schnittstelle. Wenn Sie die Adresse kennen, können Sie diese eintragen. Ansonsten gibt es die einfache Möglichkeit, auf die Schaltfläche "Web-Schnittstelle" auf unserer Benutzeroberfläche zu klicken  
   ![Das Webinterface öffnen](@site/docs/guides/img/how-to-play-media-4.png)
2. Wenn man darauf klickt, öffnet sich das Web-Interface in Ihrem Standard-Browser. Von dort aus können Sie zu Ihrer Datei navigieren und sie anklicken, um sie abzuspielen  
   ![Video auf dem Web-Interface](@site/docs/guides/img/how-to-play-media-5.png)

## 2: Vom Web-Interface an einen Renderer senden

Ähnlich wie oben in Option 2 können Sie Ihre Medien über unser Web-Interface an einen Renderer senden.

1. Klicken Sie auf das kleine Sende-Symbol für eine Datei, wenn Sie ein Verzeichnis durchsuchen. Es befindet sich rechts unten neben dem Vorschaubild.  
   ![Sende-Symbol](@site/docs/guides/img/how-to-play-media-6.png)
2. Dadurch erscheint ein schwebendes Mini-Bedienfeld, das Sie verwenden können, um die Wiedergabe der Datei zu steuern und dynamische Wiedergabelisten zu verwalten, wenn Sie das wählen.  
   ![Schwebendes Bedienfeld](@site/docs/guides/img/how-to-play-media-7.png)
