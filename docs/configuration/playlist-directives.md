# Playlist Directives

A playlist entry is just an address. That is enough for a file on disk, where UMS can read the tags
and find the cover next to it, but not for an internet radio station: there is no file to read, so
artwork, rating and other details have nowhere to live.

Directives fill that gap. They are comment lines that carry the missing information along with the
entry, inside the playlist file itself.

## How a directive is written

Put the directive **directly above** the entry it belongs to, the same way `#EXTINF:` works:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/stations/jazz.png
#EXTRATING:4
http://stream.example.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://example.com/stations/rock.png
http://stream.example.com/rock.mp3
```

The rules are the same for all of them:

- A directive applies to the **next entry only**. Several directives can precede the same entry, as
  above, and each entry needs its own lines.
- Only `.m3u` and `.m3u8` playlists. Other playlist formats have no place for them.
- Capitalisation of the directive name does not matter: `#EXTIMG:` and `#extimg:` both work.
- Any other comment line is left alone, so your own notes in the file are safe.

## The directives

| Directive | Applies to | Purpose |
|---|---|---|
| `#EXTIMG:` | the next entry | Artwork for an entry that has no file to take it from |
| `#EXTRATING:` | the next entry | Star rating of that entry |
| `#EXTICYORDER:` | the next entry | How to read the live title of a radio station |
| `#RADIOBROWSERUUID:` | the next entry | Identifies a station in the RadioBrowser directory |
| `#EXTPLAYLISTRATING:` | the whole playlist | Star rating of the playlist itself |

### Artwork

`#EXTIMG:` takes an absolute address of a picture, which UMS downloads once and then uses for that
entry. See [How to add artwork](../guides/how-to-add-artwork.md) for the details and the accepted
forms.

### Ratings

`#EXTRATING:` and `#EXTPLAYLISTRATING:` take a whole number from **0 to 5**. The first rates the
entry that follows it, the second rates the playlist as a whole and can stand anywhere in the file.

```text
#EXTPLAYLISTRATING:5
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTRATING:4
http://stream.example.com/jazz.mp3
```

A rating in the file is the **starting value**, not a running record: UMS applies it when the entry
is not rated yet and leaves an existing rating alone. So editing the file changes nothing for
something you have already rated in your control point — rate it there instead, and UMS updates the
line for you.

For a file on disk this is a convenience, because the rating is stored in the database and can also
be written into the file's tags. For a radio station it is the only durable home the rating has: it
is what lets the rating survive a rebuilt database and travel with the playlist when you copy it.

### Radio station identity

`#RADIOBROWSERUUID:` holds the identifier a station has in the RadioBrowser directory. With it, UMS
can look up additional details about the station instead of showing only what the stream itself
reveals. Control points that offer a station picker write this line themselves when you pick a
station, so there is rarely a reason to type it by hand.

### Title order

`#EXTICYORDER:` controls whether a station's announcement is read as *Artist - Title* or as
*Title - Station*. See [Internet radio and live titles](internet-radio.md).

## Directives UMS writes itself

You do not have to edit playlists by hand. When your control point sets artwork, a rating or the
title order, UMS writes the corresponding line into the playlist file. Each directive is replaced
individually, so setting a cover never disturbs a rating and the other way round, and removing a
value removes just its line.

Artwork is only written after the picture has actually been loaded, so a broken address leaves the
file untouched instead of storing a dead link.
