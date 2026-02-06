---
sidebar_position: 2
---

# What's New in v15

## Overview

The 2 main goals for V15 have been to simplify our interface, based on user feedback and reviews, and to make our user accounts easier to use.

Hier eine kurze Übersicht der Änderungen in dieser Version:

- A **user switcher** with support for **multiple logged-in users**
- A **mode switcher** to change between the two major areas: **Player** and **Settings**
- **Pin code** logins
- Dynamic **TV season metadata**
- A file **media info** button
- Also rewrites of our notification and realtime code, improved memory management, and a lot of other changes to improve usability and reduce the number of actions needed to do what you want.

## New features

### User switcher

You can now be logged in with multiple users in a browser at the same time, and switch between them.

You can also enable a setting to display the available users on the login screen. This setting is opt-in for security reasons, because you might not want everyone to see all user accounts. There is also an in-between setting where user accounts are saved in the browser after that browser logs in, on a per-account basis.

![Example of the user switcher](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Modus-Wechsler

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

Für eine vollständige Liste aller Änderungen in v15, siehe [vollständiger Changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
