# RadioBrowser

Adding an internet radio station to a playlist normally means hunting down its stream address
somewhere on the web and pasting it into a file. UMS can take that step off your hands: it is
connected to **RadioBrowser**, a community-maintained directory of internet radio stations, and can
search it and add a station for you.

There is nothing to configure. The directory is used on demand, and only when you ask for it.

## Finding a station

If your control point offers a station search, it is asking UMS, and UMS is asking RadioBrowser.
Stations can be narrowed down by

- name
- country
- language
- tag, such as a genre or a theme

Which of these your control point lets you use, and how it presents them, is up to the control
point. UMS also supplies the possible values for the country, language and tag filters, so such a
search box can offer them as a list instead of making you type them.

Long result lists are fetched in portions, so a broad search does not have to be transferred in one
go.

## Adding a station

When you pick a station, UMS writes a complete entry into the playlist you chose — not just the
address:

- the **stream address**
- the **station name**, or a title of your own if your control point lets you enter one
- the **station logo**, so the entry has a picture instead of a default icon
- the **station identifier** from the directory

The last one is the interesting part. It stays in the playlist file as a
[`#RADIOBROWSERUUID:` directive](/configuration/playlist-directives), which means the entry remains connected to
the directory entry it came from. UMS uses that connection to fill in details the stream itself does
not reveal, such as the genre and the bitrate.

The result is a playlist file that still reads like a plain playlist and works in any other player:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUUID:962cf2e0-0601-11e8-ae97-52543be04c81
http://stream.example.com/jazz.mp3
```

You can write such an entry by hand as well, if you know the station's identifier. Leaving the
directive out costs you only the extra details; the station itself plays either way.

## Afterwards

The station behaves like any other entry in the playlist from then on. You can rate it, replace its
picture, and correct how its live titles are read; see
[Internet radio and live titles](/configuration/internet-radio).
