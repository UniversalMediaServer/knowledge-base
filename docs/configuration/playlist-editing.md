# Editing Playlists from a Control Point

Playlists are ordinary `.m3u8` files, and you can always edit them in a text editor. UMS can also
let your control point do it for you: create a playlist, add the track you are listening to, drop
one you no longer want, rename or delete the whole thing — without touching a file by hand.

This is switched **off** by default. Writing to a playlist means writing to your disk, so it has to
be something you allow deliberately rather than something that is simply on.

```
# Allow control points to create, change and delete objects. Off by default.
upnp_cds_write = TRUE
```

## What becomes possible

With the setting on, a control point that supports it can

- create a new playlist,
- add an item to a playlist, including one it is playing right now,
- remove an item from a playlist,
- rename or delete a playlist.

Whether you see buttons for all of this depends on your control point. UMS only makes the operations
available; nothing happens unless something asks for it.

What UMS writes are plain playlist files in your shared folders — not entries in a database that
only UMS understands. You can open them in any editor afterwards, copy them to another player, or
keep them in a backup. Additional details that a playlist entry cannot express on its own, such as
artwork for a radio station, are stored as [directives](/configuration/playlist-directives) in the same file.

Changes are announced to connected control points, so a playlist edited on one device shows its new
contents on the others without a manual refresh.

## Uploading files

A second setting governs something different and considerably more far-reaching: whether a device
may send **file content** to UMS and have it written to disk.

```
# Allow unidentified devices to write files to disk. Off by default.
anonymous_devices_write = TRUE
```

Leave this off unless you have a concrete reason. It permits a device on your network that UMS
cannot attribute to a known user to create, replace and delete media files in your shared folders.
That is a large amount of trust to extend to anything that happens to be on the network, and it is
why the setting exists separately from playlist editing instead of being included in it.

## Both settings can be changed remotely

A control point can read and set both switches itself, in the same way it reads any other UMS
setting. That is convenient — you can turn playlist editing on from the app you are already holding
— but it also means the value in your configuration file is not the last word: anything that can
reach the UPnP service on your network can change it.

If that matters to you, restrict which devices may reach UMS at all. See
[Security and privacy](/configuration/security-and-privacy).
