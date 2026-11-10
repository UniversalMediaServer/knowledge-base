# Afspeellijst richtlijnen

Een afspeellijst item is slechts een adres. Dat volstaat voor een bestand op schijf, waarbij UMS de tags kan uitlezen en de bijbehorende hoesafbeelding kan vinden, maar niet voor een internetradiozender: er is immers geen bestand om uit te lezen, waardoor er geen plek is voor hoesafbeeldingen, beoordelingen en andere details.

Richtlijnen vullen dat gat op. Het zijn commentaarregels die de ontbrekende informatie  bevatten samen met de
invoer, in het afspeellijstbestand zelf.

## Hoe een richtlijn geschreven is

Zet de richtlijn **direct boven** de invoer waartoe hij behoort, op dezelfde manier als `#EXTINF:` werkt:

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

De regels zijn voor hen allemaal hetzelfde:

- Een richtlijn is alleen van toepassing op de **volgende invoer**. Meerdere richtlijnen kunnen aan hetzelfde item voorafgaan, zoals
  hierboven, en elk item vereist eigen regels.
- Alleen `.m3u` en `.m3u8` afspeellijsten. Andere afspeellijst formaten hebben geen plaats voor hen.
- Het gebruik van hoofdletters of kleine letters in de naam van de richtlijn maakt niet uit: `#EXTIMG:` en `#extimg:` werken beide.
- Elke andere commentaarregel blijft ongewijzigd, dus je eigen aantekeningen in het bestand blijven behouden.

## De richtlijnen

| Richtlijn             | Van toepassing op    | Doel                                                                        |
| --------------------- | -------------------- | --------------------------------------------------------------------------- |
| `#EXTIMG:`            | de volgende invoer   | Illustratiemateriaal voor een item waarvoor geen bronbestand beschikbaar is |
| `#EXTRATING:`         | de volgende invoer   | Sterrenbeoordeling van dat invoer                                           |
| `#EXTICYORDER:`       | de volgende invoer   | Hoe je de actuele titel van een radiozender kunt aflezen                    |
| `#RADIOBROWSERUID:`   | de volgende invoer   | Identificeert een station in de RadioBrowser map                            |
| `#EXTPLAYLISTRATING:` | de hele afspeellijst | Ster beoordeling van de afspeellijst zelf                                   |

### Artwork

`#EXTIMG:` takes an absolute address of a picture, which UMS downloads once and then uses for that
entry. See [How to add artwork](/guides/how-to-add-artwork) for the details and the accepted
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

`#EXTICYORDER:` controls whether a station's announcement is read as _Artist - Title_ or as
_Title - Station_. See [Internet radio and live titles](/configuration/internet-radio).

## Directives UMS writes itself

You do not have to edit playlists by hand. When your control point sets artwork, a rating or the
title order, UMS writes the corresponding line into the playlist file. Each directive is replaced
individually, so setting a cover never disturbs a rating and the other way round, and removing a
value removes just its line.

Artwork is only written after the picture has actually been loaded, so a broken address leaves the
file untouched instead of storing a dead link.
