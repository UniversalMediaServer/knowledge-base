---
sidebar_position: 2
---

# Was ist neu in v14

## Übersicht

V14 enthält wichtige neue Features, basierend auf dem, was unsere Benutzer gefordert haben.

Die größten Änderungen betreffen die Möglichkeit, den Zugriff auf Ihre Inhalte zu kontrollieren. Dies beinhaltet Verbesserungen an Benutzerkonten wie Avatare und Wiedergabestatus pro Benutzer, sowie die Möglichkeit, verschiedene Inhalte auf verschiedenen Geräten anzuzeigen.

Es gab auch viele Aktualisierungen der Webeinstellungen und der Player-Schnittstellen, einschließlich der Möglichkeit, mehrere Dateien als vollständig abgespielt zu markieren (z.B. TV-Serie) und die automatische Erkennung der Einstellungen für den Dunkel-/Hellmodus.

Wir haben auch die Gelegenheit genutzt, die Hauptversionen einiger unserer Abhängigkeiten zu bumpen(?), einschließlich [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis. ourceforge.io/Download), [Yarn v4](https://yarnpkg.com/), und der Generator dieser Wissensdatenbank, [Docusaurus v3](https://docusaurus.io/).

Schließlich haben wir hunderte von Bugfixes und Performance-Verbesserungen eingeführt und viel Code verändert, damit man mit ihm einfacher arbeiten kann, sowie unsere Test-Frameworks verbessert, um zukünftige Fehler zu verhindern.

## Neue Funktionen

### Renderer und Netzwerkgeräte blockieren/zulassen

Sie können nun den Zugriff auf den Renderer oder das Netzwerkgerät vom Startbildschirm aus im Einstellungsbereich blockieren und erlauben.

![Beispiel, wie man einen Renderer blockiert](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Erlaube oder blockiere Renderer oder Netzwerkgeräte standardmäßig:

Sie können nun die Standardstrategie für Renderer und Netzwerkgeräte auswählen. Früher war nur eine Strategie möglich - entweder alles zulassen oder alles mit einer Erlaubnis-Liste abzulehnen. Nun können Sie standardmäßig mit Verbots- und Erlaubnis-Listen die vollständige Kontrolle erlauben oder verweigern.

Dies ist nützlich für gemeinsam genutzte Lebenssituationen oder ausgedehnte/wenig vertrauenswürdige lokale Netzwerke. Es ist auch für diejenigen von Ihnen nützlich, die Powerline-Adapter für Ihr Netzwerk verwenden, da dies zu unerwünschten Zugriff von Nachbarn führen kann.

![Beispiel, wie man Netzwerk-Erlaubnis-Präferenzen festlegen](@site/docs/img/whats-new-in-v14-network-allowblock preference.png)

![Beispiel, wie man Netzwerk-Erlaubnis-Präferenzen festlegen kann](@site/docs/img/whats-new-in-v14-network-allowblock preference.png)

### Person zum Renderer verknüpfen

Sie können nun Benutzerkonten mit Renderern/Geräten verknüpfen, so dass Sie unabhängiges Wiedergabe-Tracking nutzen können. Wenn Sie z.B. einen Fernseher im Wohnzimmer und einen anderen in Ihrem Schlafzimmer haben, möchten Sie vielleicht nicht, dass der Fernseher im Wohnzimmer das abspielt, was Sie gerade in Ihrem Schlafzimmer schauen.

![Beispiel, wie man einem Renderer ein Konto zuweisen kann](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Freigegebene Inhalte auf bestimmte Gruppen beschränken

Sie können nun wählen, ob Sie Verzeichnisse oder Online-Inhalte mit bestimmten Gruppen teilen möchten. Wenn Sie zum Beispiel eine Person (oder ein Gerät, das einer Person zugewiesen ist) haben, die ein Kind ist, kann man sie der "Kids" Gruppe zuordnen. Dann geben Sie dieser Gruppe Zugriff auf das Verzeichnis "Familie", aber nicht den Inhalt "Horror" oder "Nur Erwachsene". Oder ihnen Zugriff auf den Kurzgesagt Web-Feed, aber nicht auf die Historie Podcasts.

![Beispiel für gemeinsame Inhaltsgruppen](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatare

Menschen können Avatare haben, um sie auf einen Blick leichter zu sehen. Sie können diese auf der Benutzer-Einstellungsseite zusammen mit den Benutzergruppen festlegen

![Beispiel zum Bearbeiten von Benutzereinstellungen](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Direkte TMDB-Integration

Sie können nun Ihr TMDB-Konto mit UMS in den Allgemeinen Einstellungen verknüpfen.

Dies ermöglicht das Bearbeiten von Metadaten basierend auf den Suchergebnissen von TMDB:

![Beispiel, wie man einem Renderer ein Konto zuweisen kann](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### TV-Serie und Videos als vollständig abgespielt markieren

Jetzt können Sie Fernsehserien und Videos als vollständig wiedergegeben markieren, zusätzlich zu der bestehenden Möglichkeit dies per Ordner zu tun

![Beispiel zum Bearbeiten von Benutzereinstellungen](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### Mehr

Eine vollständige Liste aller Änderungen in v14 findest du [das vollständige Changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

Das erste Mal, wenn V14 läuft, wird es Ihre freigegebenen Ordner erneut durchsuchen, was einige Zeit dauern kann. Sie können den Server noch vor dem Ende verwenden, aber er kann langsamer reagieren und unvollständige Ergebnisse zurückgeben.

Nach dem Aktualisieren, möglicherweise müssen Sie Ihr Gerät oder Ihre Media-Player-App neu starten, um den Cache zu löschen und die neuen Daten, die wir versenden, richtig zu erkennen.

Wie bei jedem wichtigen Update können Sie vor dem Update auf Ihre aktuelle Version zurückgehen Sie können ein Backup Ihres Profil-Verzeichnisses erstellen, das Ihre Konfiguration und lokale Datenbank enthält. Sie finden den Ort des Verzeichnisses in der Nähe des oberen Teils Ihrer Programmprotokolle. Suchen Sie nach `Profil Verzeichnis: [beliebige Seite]/UMS`.
