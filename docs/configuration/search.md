# Search

When a control point offers a search box, it does not filter the list it already has. It sends the
search to UMS as a UPnP criterion such as `dc:title contains "beatles"`, and UMS answers with the
matching items. How that criterion is turned into a query is what the settings on this page control.

## The two search engines

UMS can answer a search in two ways:

- **Full-text index (default).** UMS keeps a Lucene index next to the database and searches that.
  It is fast even on large libraries and it is what makes partial words and typo tolerance possible.
- **Plain database search.** A straight SQL query. Slower on large libraries and it only matches
  what is literally there, but it has no index to go out of date.

The full-text index covers the file name of every media file, and for audio also the song title,
album, artist, album artist, composer, conductor and genre.

UMS switches to the database search on its own when a control point sends a criterion the index
cannot answer, so turning the index off is rarely necessary.

```
# Use the full-text index. FALSE falls back to a plain database search.
search_lucene_use_engine = TRUE
```

## Searching for part of a word

Most search boxes send a `contains` criterion while you are still typing. UMS turns each word of
your input into two alternatives at once:

- a **prefix** match, so `beat` already finds *Beatles* before you finish the word
- a **fuzzy** match, so `beatlse` still finds *Beatles* despite the typo

```
# Tolerate typos in addition to matching prefixes.
search_lucene_contains_fuzzy = TRUE
```

Both settings match prefixes. They differ in what else they match:

| | `TRUE` (default) | `FALSE` |
|---|---|---|
| `beat` finds *Beatles* | yes | yes |
| `beatlse` finds *Beatles* | yes | no |
| unrelated results on short input | possible | no |

The last row is the reason the setting exists. Typo tolerance allows up to two wrong, missing or
extra letters, and on a short word that reaches surprisingly far: searching for `ranz` also returns
everything called *Jazz*, because two substitutions get you from one to the other. If that noise
bothers you more than the typo tolerance helps, set it to `FALSE`.

Two details worth knowing:

- A prefix is only used from **three characters** on. One or two letters would match a large part of
  the library without telling you anything the typo tolerance does not already find.
- Putting your input in quotation marks searches for the **words next to each other** instead, which
  is useful when the individual words are common but the combination is not.

## Searching for an exact value

Some criteria ask for an exact value rather than a part of one — a control point browsing by genre
sends `upnp:genre = "Jazz"`, for instance. By default that is taken literally.

```
# Tolerate typos in exact matches as well. Off by default.
search_lucene_equal_fuzzy = FALSE
```

Turning this on makes exact comparisons tolerate typos too. That is rarely what you want, because
these criteria usually come from the control point itself rather than from something you typed, and
a value that is nearly right is then quietly treated as right.

## Notes

Search ignores capitalisation. `chapitre`, `Chapitre` and `CHAPITRE` return the same results.

If a search does not return what you expect, the debug log shows the query UMS built from your
input, on a line beginning with `lucene search string is`. Comparing it with what you typed usually
explains the result on the spot.
