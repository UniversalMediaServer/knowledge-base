---
sidebar_position: 2
---

# What's New in v15

## Overview

The 2 main goals for V15 have been to simplify our interface, based on user feedback and reviews, and to make our user accounts easier to use.

Uma visão geral das mudanças nesta versão é:

- A **user switcher** with support for **multiple logged-in users**
- A **mode switcher** to change between the two major areas: **Player** and **Settings**
- **Código pin** logins
- Dynamic **TV season metadata**
- A file **media info** button
- Also rewrites of our notification and realtime code, improved memory management, and a lot of other changes to improve usability and reduce the number of actions needed to do what you want.

## New features

### User switcher

You can now be logged in with multiple users in a browser at the same time, and switch between them.

Você também pode habilitar uma configuração para exibir os usuários disponíveis na tela de login. This setting is opt-in for security reasons, because you might not want everyone to see all user accounts. There is also an in-between setting where user accounts are saved in the browser after that browser logs in, on a per-account basis.

![Exemplo de como editar configurações do usuário](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Alternador de modo

A interface web foi dividida em duas áreas: Jogador e Configurações.

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
