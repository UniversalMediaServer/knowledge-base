# Two-Box and Three-Box Setups

UPnP knows two ways of arranging the parts of a media system, and UMS behaves differently in each.

In a **two-box** setup, the device that browses your library is also the device that plays: a TV, a
streaming box, a phone app that shows the folders and then plays the track itself. The device asking
for the list and the device asking for the audio are one and the same.

In a **three-box** setup they are separate. A *control point* — an app on your phone or a web
interface — shows the library and tells a *renderer* to play. The app never touches the audio; it
only points the renderer at it. This is the arrangement typical of hi-fi streamers, where a
dedicated device does the playing and you steer it from somewhere else.

## Why UMS has to know the difference

UMS decides how to deliver a track based on what the receiving device can handle: a player that
cannot decode FLAC gets a converted stream, one that can gets the file untouched.

In a two-box setup that decision is easy, because whoever asked for the list is whoever will play.
In a three-box setup it is not: the request for the list comes from your phone, the request for the
audio from the streamer. Deciding on the basis of the phone would be exactly wrong — it would send
the streamer whatever suits a phone.

## How UMS tells them apart

```
# Require accounts and sign-in. On by default.
authentication_enabled = TRUE
```

With authentication **on**, UMS ties playback to the identity that browsed, so that what a user is
allowed to see is also what that user gets to play. This is the right behaviour for a household with
several accounts and per-user access, and it assumes a two-box arrangement.

With authentication **off**, UMS stops assuming the two are the same. It determines the playing
device at the moment the audio is requested, from that request itself — its address and what it says
about itself — and makes the conversion decision for *that* device. The identity in the browse
request is then understood as the control point it actually is.

Two devices sharing one address, which happens when the control point and the renderer run on the
same machine, are still told apart, because they are distinguished by what they report about
themselves rather than by the address alone.

## Choosing

Neither setting is more correct than the other; for maximum compatibility turn authentication **off**. The price is that UMS then has no accounts: there is no per-user access control, and everything it shares is visible to everything on the network that can
reach it. If that is a concern, restrict which devices may reach UMS at all — see
[Security and privacy](security-and-privacy.md).

Leave it **on** if your players browse and play for themselves, or if you need the per-user
separation. This is the default.
