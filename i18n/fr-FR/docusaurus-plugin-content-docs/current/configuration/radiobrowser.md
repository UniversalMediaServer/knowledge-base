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
[`#RADIOBROWSERUUID:` directive](./playlist-directives), which means the entry remains connected to
the directory entry it came from. UMS utilise cette connexion pour compléter les informations que le flux lui-même
ne fournit pas, telles que le genre et le débit binaire.

Le résultat est un fichier de liste de lecture qui continue de lire comme une liste de lecture simple et fonctionne dans n'importe quel autre lecteur:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUUID:962cf2e0-0601-11e8-ae97-52543be04c81
http://stream.example.com/jazz.mp3
```

Vous pouvez aussi écrire une telle entrée à la main si vous connaissez l'identifiant de la station. Laisser la directive
vous coûte seulement les détails supplémentaires ; la station elle-même joue dans les deux sens.

## Par la suite

La station se comporte comme toute autre entrée de la playlist à partir de ce moment-là. Vous pouvez l'évaluer, remplacer son image
et corriger la façon dont ses titres en direct sont lus ; voir
[radio Internet et titres en direct](./internet-radio).
