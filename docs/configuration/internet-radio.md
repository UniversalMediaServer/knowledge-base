# Internet Radio and Live Titles

An internet radio station does not only send audio, it also announces the track it is playing right
now. UMS picks that announcement up and passes it on, so your control point can show what is
currently on air instead of just the station name.

This works for radio streams you have added to a playlist and for the stations of the
[Audio Addict Network](audio-addict.md).

## How the title reaches your player

There are two ways a title can travel, and UMS uses whichever fits:

- Players that ask for in-band metadata get the title woven into the audio stream, the way internet
  radio has always done it.
- Players that do not ask : Because UMS reads the announcement itself and pushes it to the control point separately, the live title
  appears even with players that know nothing about radio metadata.

There is one case without live titles: if UMS has to **transcode** the stream for your player, the
title cannot be woven in, because the transcoder produces the audio and knows nothing about the
station's announcements. Streams that play directly — which is the normal case for MP3 and AAC
stations — are unaffected.

## Interpreting the announcement

Stations announce a single line of text, and there is no rule that says which part is the artist.
The common convention is:

```text
Miles Davis - So What
```

but some stations put the station name at the end instead:

```text
So What - Jazz Radio on example.com
```

Taken as "artist first", the second line would list *So What* as the artist. UMS therefore looks at
the part after the last dash and treats it as a station name, not an artist, when any of these
applies:

- it contains something that looks like a web address, such as `example.com`
- it resembles the station name UMS already knows from your playlist
- it resembles the host name of the stream address, ignoring generic parts like `stream`, `listen`
  or `radio`

If none of them applies, the first part is taken as the artist, which is the usual convention.

## Correcting a station by hand

The rules above get it right for most stations, but a station can always break them — a show name
at the end, an unusual separator, or an artist whose name happens to contain a domain. For those,
tell UMS explicitly with an `#EXTICYORDER:` line in the playlist, directly above the stream:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTICYORDER:title-first
http://stream.example.com/jazz.mp3
```

| Value | Meaning |
|---|---|
| `auto` | Decide automatically, as described above. This is the default. |
| `artist-first` | Always read the announcement as *Artist - Title*. |
| `title-first` | Always read it as *Title - Station*. |

An unknown value is treated as `auto`. The setting applies to that one station; see
[Playlist directives](playlist-directives.md) for how such lines work in general.

If your control point offers a way to switch the order while listening, it can set the same value
through UMS, and UMS writes it into the playlist file so the choice survives a restart.

## Audio Addict stations

Stations of the Audio Addict Network do not announce their titles in the stream. UMS asks the
service for the current track instead and delivers it the same way, so the behaviour is identical
from the outside.

```
# Send live titles for Audio Addict stations. On by default.
audio_addict_icy_metadata = TRUE
```

Turn this off if a player of yours reacts badly to in-band metadata; the titles pushed to the
control point are unaffected by it.
