# Wie man Medien abspielt

Dieser Artikel erklärt die 4 wichtigsten Möglichkeiten zum Abspielen von Video, Audio und Bildern über UMS.

## 1: Wiedergabe von einer Renderer-Schnittstelle

Wenn Ihr Renderer mit UMS über DLNA/UPnP verbunden ist, wird es oft in einem Menü mit dem Namen "Media Servers" oder etwas ähnliches angezeigt, je nach Renderer. Von hier aus kannst Du Dich mit UMS verbinden und die Medien anzeigen, auf die Du zugreifen möchtest.

Die Implementierung variiert je nach Renderer, aber die Kernfunktionalität ist dieselbe; navigieren Sie zu den ausgewählten Medien und wählen Sie sie zum Abspielen aus.

## 2: Von der UMS Schnittstelle zu einem Renderer senden

Die UMS Schnittstelle selbst hat die Möglichkeit, Medien an die Renderer zu senden, wenn sie diese UPnP Funktion unterstützen. Es ist ein ähnliches Konzept wie eine Sendung.

1. Öffnen Sie die UMS Oberfläche und identifizieren Sie den Renderer an den Sie die Medien senden möchten. In diesem Fall ist es die Panasonic VIERA VT60 Serie TV.  
   ![Die GUI öffnen](@site/docs/guides/img/how-to-play-media-1.png)
2. Klicken Sie auf das Renderer-Bild, um das Bedienfeld zu öffnen  
   ![Renderer Steuerung](@site/docs/guides/img/how-to-play-media-2.png)
3. Wählen Sie die gewünschte Datei aus, indem Sie auf das Ordnersymbol unten rechts klicken und es wird links unten ausgefüllt. Wenn Sie die Spieler-Steuerelemente in diesem Fenster nicht sehen, unterstützt Ihr Renderer diese Funktion nicht. Stellen Sie sicher, dass Sie Firmware/Software-Aktualisierungen für Ihren Renderer prüfen,da diese Unterstützung möglicherweise hinzugefügt wurde  
   ![Ausgewählte Datei](@site/docs/guides/img/how-to-play-media-3.png)
4. Jetzt kannst du entweder eine Wiedergabeliste erstellen, indem du auf das Plus-Symbol rechts neben dem Eingabefeld klickst oder Du kannst die Datei zu Deinem Renderer senden, indem Du auf das Play-Icon direkt über der Mitte des Eingabefeldes klickst , damit die Wiedergabe Deinem Renderer beginnt.

## 3: Wiedergabe über die Weboberfläche

Die Web-Schnittstelle kann überall in Ihrem lokalen Netzwerk aufgerufen werden, auch auf Computern und Renderern. In vielerlei Hinsicht bietet es unsere fortschrittlichste Benutzeroberfläche und Funktionen.

1. Öffnen Sie die Web-Schnittstelle. Wenn du die Adresse kennst, die du erreichen kannst, ansonsten ist es eine einfache Möglichkeit, auf die Schaltfläche "Web-Schnittstelle" auf unserer Benutzeroberfläche zu klicken  
   ![Das Webinterface öffnen](@site/docs/guides/img/how-to-play-media-4.png)
2. Klicken öffnet das Webinterface in Ihrem Standard-Browser. Von dort aus kannst du zu deiner Datei navigieren und klicken, um sie abzuspielen  
   ![Video auf dem Webinterface](@site/docs/guides/img/how-to-play-media-5.png)

## 2: Von der UMS Schnittstelle zu einem Renderer senden

Ähnlich wie oben in Option 2 können Sie Ihre Medien über unsere Web-Schnittstelle an einen Renderer senden.

1. Klicken Sie auf das kleine Cast-Symbol für eine Datei beim Durchsuchen eines Verzeichnisses. Es befindet sich rechts unten neben dem Vorschaubild.  
   ![Senden Symbol](@site/docs/guides/img/how-to-play-media-6.png)
2. Dadurch wird ein schwebendes Mini-Bedienfeld angezeigt, das Sie verwenden können, um die Wiedergabe der Datei zu steuern und dynamische Wiedergabelisten zu verwalten, wenn Sie es auswählen.  
   ![Schwebendes Bedienfeld](@site/docs/guides/img/how-to-play-media-7.png)
