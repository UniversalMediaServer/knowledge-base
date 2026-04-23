---
sidebar_position: 2
---

# Cosa c'è di nuovo in v15

## Panoramica

I 2 obiettivi principali per la versione V15 sono stati semplificare la nostra interfaccia, basato su feedback e recensioni degli utenti, e rendere i nostri account utente più facili da usare.

Una rapida panoramica dei cambiamenti in questa versione è:

- Un **switch utente** con il supporto per **utenti registrati multipli**
-
- **Pin code** logins
- Dynamic **TV season metadata**
- A file **media info** button
- Also rewrites of our notification and realtime code, improved memory management, and a lot of other changes to improve usability and reduce the number of actions needed to do what you want.

## Nuove funzioni

### Cambio utente

È ora possibile effettuare l'accesso con più utenti in un browser allo stesso tempo, e passare da uno all'altro.

This setting is opt-in for security reasons, because you might not want everyone to see all user accounts. There is also an in-between setting where user accounts are saved in the browser after that browser logs in, on a per-account basis.

![Example of the user switcher](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Mode switcher

The web interface has been split into two areas: Player and Settings.

This should make the web interface more intuitive and easier navigate by reducing the number of clicks needed.

![Example of the mode switcher](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Pin code logins

You can now enable pin code logins in the server settings.

![Example of the pin code view](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamic season metadata

Seasons of TV shows sometimes have their own data like titles and cover images, so now we display that on the season pages.

![Example of season view](@site/docs/img/whats-new-in-v15-season-metadata.png)

### More

For a full list of all changes in v15, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
