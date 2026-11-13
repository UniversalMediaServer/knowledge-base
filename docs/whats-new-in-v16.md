---
sidebar_position: 2
---

# What's New in v16

## Overview

The main goals for v16 were to make it easier for people to continue watching TV series, and to improve support for Internet radio.

A quick overview of the changes in this version is:
- Added a **Continue Watching** folder to the Media Library.
- Added support for **[DI.fm (AudioAddict)](https://www.di.fm/) Events and Playlists**
- Added **[RadioBrowser](https://www.radio-browser.info/)** support for finding and adding radio stations to server side playlists.
- Added support for **3-box configuration**
- Added support for **liking/rating** and **updating album art** for all media types (like videos, playlists, folders, etc.) via renderers and media players (before, it was only available for audio)
- Added support for **updating renderers** about specific files and containers that have changed
- Increased startup performance by **~95%**, as well as server responsiveness while scanning files
- Improved **server responsiveness** while scanning files
- Modernized the codebase by updating **8 major dependency versions**

## New features

### Continue Watching folder

It shows all videos that are in progress, as well as the next episodes for in-progress TV series, ordered by most recently played.

The contents of the folder - and the contents of the TV series folders within it - are dynamic.

So if you are up-to-date on your TV series, its folder will disappear, and then when a new episode is added it will reappear.

The first episode in each TV series folder is the one you are up to; if you're half way through episode S01E02 you will see that, and when it is fully played you'll see S01E03 if it exists.

![a video showing the Continue Watching folder](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Added support for [DI.fm (AudioAddict)](https://www.di.fm/) Events and Playlists

See our documentation for [Audio Addict](./configuration/audio-addict), [Internet Radio](./configuration/internet-radio), and the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### RadioBrowser

Added [RadioBrowser](https://www.radio-browser.info/) support for finding and adding radio stations to server side playlists. Search supports:
- Station name
- Country 
- Language
- Genre

See our [RadioBrowser](./configuration/radiobrowser) documentation and the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for RadioBrowser support](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### 3-box Configuration

Added support for running in 3-box mode, which is when there are 3 devices (boxes) involved in playback:
1. The server (UMS)
2. A control point (often a phone or browser interface)
3. A renderer / media player

See [Two-Box and Three-Box Setups](./configuration/control-point-setups) for more.

### Liking/rating via renderers

Added support for liking/rating for all media types (like videos, playlists, folders, etc.) via renderers and media players (before, it was only available for audio)

See the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for liking and rating support](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Updating album art via renderers

Added support for updating album art for all media types (like videos, playlists, folders, etc.) via renderers and media players (before, it was only available for audio)

See the video using [NextCP/2](https://sf666.github.io/nextcp2/) below for more:

[![a video thumbnail for updating album art](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Breaking Changes

We no longer support x86 or i586 (32-bit) architectures. This means we are not doing the following 4 releases: Linux ARMel, Linux ARMhf, Linux x86, and Windows x86.

Backups made prior to v16 will not work after v16, so if you are in the habit of maintaining backups, make sure you store your v15 one separately to the v16 one until you are confident the automatic migration worked.

## Migration

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
