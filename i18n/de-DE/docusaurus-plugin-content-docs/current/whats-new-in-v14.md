---
sidebar_position: 2
---

# What's New in v14

## Overview

V14 contains major new features based on what our users have asked for.

The biggest changes involve the ability to control access to your content. This includes improvements to user accounts like avatars and playback status per user, as well as the ability to display different content to different devices.

There have also been many updates to the web settings and player interfaces, including adding the ability to mark sets of files (e.g. TV series) as fully played, and automatic detection of your system dark/light mode preference.

We also took the opportunity to bump major versions of some of our dependencies, including [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis.sourceforge.io/Download), [Yarn v4](https://yarnpkg.com/), and the generator of this Knowledge Base, [Docusaurus v3](https://docusaurus.io/).

Lastly, we have thrown in hundreds of bugfixes and performance improvements, and refactored a lot of code to be easier to work on, as well as improved our testing frameworks to prevent future bugs.

## New features

### Block/allow renderers and network devices

You can now block and allow access based on the renderer or the network device, from the Home screen on the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Allow or block renderers or network devices by default:

You can now choose the default strategy for renderers and network devices. Previously, there was only one strategy possible - either allow everything, or deny everything with an allowlist. Now you can allow or deny by default, with denylists and allowlists, for complete control.

This makes UMS much more flexible for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Link person to renderer

You can now link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Oder ihnen Zugriff auf den Kurzgesagt Web-Feed, aber nicht auf die Historie Podcasts.

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
