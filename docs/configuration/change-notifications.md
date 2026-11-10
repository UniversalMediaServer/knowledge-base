# Change Notifications

When something in your library changes, connected apps should notice without you pressing refresh —
and without asking UMS every few seconds whether anything happened. UPnP solves this with
subscriptions: an app registers its interest once, and UMS tells it when there is news.

This works in both directions, and the two are controlled separately.

## What UMS announces about your library

UMS publishes two pieces of information whenever the library changes:

- a **counter** that goes up on any change, which tells a subscriber that something happened
- a **list of the containers that changed**, which tells it what

The second one is what keeps things quick. An app that learns only "something changed" has to
reload; one that learns "this folder changed" reloads that folder and leaves the rest alone.

Both are announced at most a few times per second. A scan that imports a thousand files therefore
does not produce a thousand notifications — the changes are collected and reported as a handful of
messages.

Typical moments when this happens:

- a file appears in, or disappears from, a shared folder
- you [edit a playlist](/configuration/playlist-editing) from a control point
- you rate something, because that changes what the ratings folders contain
- artwork is added for a station or a folder

Whether your app acts on the news is up to the app. Most refresh the view you are looking at; some
only use the information when you open a folder again. If a change does not appear, it is worth
opening the folder anew before assuming it was not delivered.

## What UMS listens to on your players

The other direction is UMS subscribing to your **players**, so it can show what they are doing —
what is playing, whether they are paused, how loud they are — and offer controls for them.

```
# Follow the players on the network. On by default.
upnp_subscribe_services = TRUE
```

Leave this on when UMS is the place you control playback from.

Turn it off when playback is driven by a separate control point. In that arrangement UMS has no
business following and claiming control of the players: the control point is doing that, and two
parties steering the same device is a good way to get confusing results. Switching this off makes
UMS keep its hands off and simply serve the media.

See [Two-box and three-box setups](/configuration/control-point-setups) for what that arrangement looks like.
