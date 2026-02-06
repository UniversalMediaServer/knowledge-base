---
sidebar_position: 2
---

# Was ist neu in v15

## Übersicht

Die 2 Hauptziele für V15 waren die Vereinfachung unserer Bedienungsoberfläche, basierend auf Rückmeldungen von Benutzern und Veröffentlichungen. Außerdem sollen unsere Nutzer-Konten einfacher zu benutzen sein.

Hier eine kurze Übersicht der Änderungen in dieser Version:

- Ein **Benutzer-Umschalter** mit Unterstützung für **mehrere angemeldete Benutzer**
- Ein **Modus-Wechsler** um zwischen den beiden Hauptbereichen zu wechseln: **Abspielgerät** und **Einstellungen**
- Einloggen mit  **Pin-Code**
- Dynamische **TV-Serien Metadaten**
- Ein Datei-Button **Media-Info**
- Der Benachrichtigungs- und Echtzeit-Code wurden neu geschrieben, eine verbesserte Speicherverwaltung und eine Menge anderer Änderungen, um die Benutzerfreundlichkeit zu verbessern sowie die Anzahl der Aktionen zu reduzieren, die erforderlich sind zu tun, was Sie wollen.

## Neue Funktionen

### Benutzer-Wechsler

Sie können jetzt gleichzeitig mit mehreren Nutzern in einem Browser eingeloggt sein und zwischen ihnen umschalten.

Sie können auch eine Einstellung aktivieren, um die diversen Benutzer auf dem Anmeldebildschirm anzuzeigen. Diese Einstellung muss aus Sicherheitsgründen extra eingeschaltet werden, da Sie vielleicht nicht wollen, dass jeder alle Nutzer-Konten sehen kann. Es gibt auch eine Zwischeneinstellung, bei der Benutzerkonten im Browser gespeichert werden, nachdem sich der Browser in der aktuellen Sitzung eingeloggt hat.

![Beispiel für den Benutzer-Wechsler](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Modus-Wechsler

Die Web-Oberfläche ist in zwei Flächen geteilt: Abspielgerät und Einstellungen

Das soll bewirken, dass man sich auf der Web-Oberfläche leichter und intuitiver zurechtfindet, indem die Zahl der Klicks reduziert wird.

![Beispiel für den Modus Wechsler](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Login mit PIN-Code

Sie können jetzt in den Server-Einstellungen Logins mit PIN-Code aktivieren

![Beispiel für die Pin-Code-Ansicht](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamische Serien-Metadaten

Fernsehshow-Serien haben manchmal ihre eigenen Daten wie Titel und Coverbilder. Darum zeigen wir dies jetzt auf den Seiten der Serie an.

![Beispiel für eine Serienansicht](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Mehr

Für eine vollständige Liste aller Änderungen in v15, siehe [vollständiger Changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

Es gibt keine konkreten Migrationsschritte, die zu beachten sind.

Wenn Sie wie bei jedem wichtigen Update später auf Ihre aktuelle Version zurückgehen wollen,  können Sie ein Backup Ihres Profil-Verzeichnisses erstellen, das Ihre Konfiguration und lokale Datenbank enthält. Sie finden den Pfad des Verzeichnisses oben in den Programm-Protokollen. Suchen Sie nach `Profil-Verzeichnis: [beliebige Seite]/UMS`.
