# Ratings and Likes

UMS can remember how you rate your music, from zero to five stars, and control points that offer
rating buttons can set and change those values while you listen.

Likes are not a separate mechanism. A **like is a rating of five stars**, a **dislike is zero**. If
your control point shows a heart instead of stars, it is writing the same value into the same place,
which is why the two never contradict each other.

## Where a rating is kept

The rating lives in the UMS database, attached to the item rather than to the file. That has two
consequences worth knowing:

- It works for things that have nowhere to store a rating of their own — an internet radio station,
  for instance, or an audio format whose tags have no rating field.
- It is independent of the file, so re-tagging your collection with another tool does not overwrite
  what you rated in UMS.

If you would rather have the rating in the files as well, so that other programs can see it, UMS can
write it into the tag when you rate something:

```
# Also write the rating into the file's tag. Off by default.
audio_update_rating_tag = TRUE
```

This only applies to files that can hold a rating, and only from the moment you turn it on — it does
not go back and write out ratings you set earlier.

A rating that has to survive a rebuilt database, or travel with a playlist you copy elsewhere,
belongs in the playlist file instead. See [Playlist directives](/configuration/playlist-directives).

## The My Albums folder

Albums you have liked are collected in a folder called **My Albums**. It is filled automatically:
like an album and it appears, remove the like and it is gone again.

By default the folder sits inside the media library with the other audio folders. If you reach for
it often, you can have it shown at the top level instead:

```
# Show My Albums in the root folder. Off by default.
audio_likes_visible_root = TRUE
```

## Searching by rating

UMS announces the rating as one of the properties it can be searched on, so a control point can ask
for it the same way it asks for a title or an artist. A request for everything rated five stars
finds what the My Albums folder shows; any other value works as well.

The search matches an **exact** value. There is no way to ask for "four stars or better" in one
request — a control point that offers such a filter has to ask for each value separately and put the
answers together itself.

The ratings are read from the database, so the search also finds items that carry no rating in their
file, such as radio stations.

## Backing them up

Because ratings and likes live in the database, they are worth keeping a copy of before anything
drastic happens to it. UMS can hand them out and take them back in, which also makes it possible to
move them to another installation. The
[UMS UPnP service](/configuration/ums-extended-service) lists the actions a control point uses for
that.
