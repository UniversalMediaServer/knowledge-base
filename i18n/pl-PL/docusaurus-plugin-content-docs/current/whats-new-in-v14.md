---
sidebar_position: 2
---

# Co nowego w wersji v14

## Przegląd

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

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatars

People can have avatars to make them easier to see at a glance. You can set them on the user settings page along with the user groups

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Direct TMDB integration

You can now link your TMDB account with UMS in the General Settings area.

Doing this allows you to edit metadata based on search results from TMDB:

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Mark TV series and videos as fully played

Now you can mark TV series and videos as fully played, in addition to the existing ability to do it by folder

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### More

For a full list of all changes in v14, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

Przy pierwszym uruchomieniu V14, przeskanowane zostaną twoje udostępnione foldery, co może zająć trochę czasu. Nadal możesz użyć serwera przed zakończeniem skanowania, ale może on odpowiadać wolniej i zwracać niekompletne wyniki.

Po aktualizacji może być konieczne ponowne uruchomienie urządzenia lub aplikacji odtwarzacza multimedialnego, aby wyczyścić jego pamięć podręczną i poprawnie rozpoznać nowe dane, które wysyłamy.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
