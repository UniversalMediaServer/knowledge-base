# Internet Radio en Live Titels

Een internetradiostation stuurt niet alleen audio, maar meldt ook het nummer dat nu wordt afgespeeld. UMS pikt die aankondiging op en geeft deze door, zodat uw controlepunt kan weergeven wat er op dat moment wordt uitgezonden, in plaats van alleen de zendernaam.

Dit werkt voor radiostreams die u hebt toegevoegd aan een afspeellijst en voor de zenders van de
[Audio-Addict Network](./audio-addict).

## Hoe de titel je speler bereikt

Er zijn twee manieren waarop een titel kan worden overgedragen, en UMS hanteert de methode die op dat moment passend is:

- Spelers die om 'in-band'-metadata vragen, krijgen de titel verweven in de audiostream aangeleverd – precies zoals dat bij internetradio altijd al gebeurt.
- Spelers die geen verzoek indienen: Omdat UMS de aankondiging zelf uitleest en deze afzonderlijk naar het afspeelpunt (control point) doorstuurt, verschijnt de actuele titel zelfs bij spelers die geen ondersteuning bieden voor radiometadata.

Er is één geval waarin geen live-titels worden weergegeven: als UMS de stream voor uw afspeelapparaat moet **transcoderen**, kan de titel niet worden toegevoegd; de transcoder genereert namelijk de audio en is niet op de hoogte van de aankondigingen van het station. Streams die direct worden afgespeeld — wat bij MP3- en AAC-zenders de normale situatie is — blijven ongewijzigd.

## De aankondiging interpreteren

Zenders kondigen een enkele regel tekst aan, en er is geen regel die bepaalt welk deel daarvan de artiest is.
De gemeenschappelijke conventie is:

```text
Miles Davis - So What
```

maar sommige stations plaatsen de stationsnaam juist aan het einde:

```text
So What - Jazz Radio on example.com
```

Uitgaande van een indeling waarbij de artiest voorop staat, zou op de tweede regel _So What_ als artiest worden vermeld. UMS kijkt daarom naar
het gedeelte na het laatste streepje en beschouwt dit als een stationsnaam, niet als een artiest, wanneer een van de volgende situaties van toepassing is:

- het bevat iets wat lijkt op een webadres, zoals `example.com`
- het lijkt op de stationsnaam die UMS al kent uit je afspeellijst
- het lijkt op de hostnaam van het streamadres, waarbij algemene onderdelen zoals `stream`, `listen` of `radio` worden genegeerd

Als geen van deze opties van toepassing is, wordt het eerste deel beschouwd als de artiest; dit is de gebruikelijke conventie.

## Corrigeer een station handmatig

De bovenstaande regels werken voor de meeste zenders goed, maar een zender kan er altijd van afwijken — denk aan de naam van een programma aan het einde, een ongebruikelijk scheidingsteken, of een artiest wiens naam toevallig een domeinnaam bevat. Geef dit voor die gevallen expliciet door aan UMS met een `#EXTICYORDER:`-regel in de afspeellijst, direct boven de stream:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTICYORDER:title-first
http://stream.example.com/jazz.mp3
```

| Waarde          | Betekenis                                                                         |
| --------------- | --------------------------------------------------------------------------------- |
| `auto`          | Automatisch beslissen, zoals hierboven beschreven. Dit is de standaardinstelling. |
| `artiest-eerst` | Lees altijd de aankondiging als _Artiest - Titel_.                                |
| `titel-eerst`   | Altijd lezen als _Titel - Station_.                                               |

Een onbekende waarde wordt behandeld als `auto`. De instelling is van toepassing op dat ene station; zie
[Playlist Directives](./playlist-directives) voor hoe zulke lijnen in het algemeen werken.

Als je bedieningspunt de mogelijkheid biedt om tijdens het luisteren de volgorde te wijzigen, kan dit via UMS dezelfde waarde instellen; UMS schrijft deze vervolgens naar het afspeellijstbestand, zodat de keuze ook na een herstart behouden blijft.

## Audio Addict stations

Stations van het Audio-Addict Netwerk kondigen hun titels niet aan in de stream. UMS vraagt de
service voor het huidige nummer en levert het op dezelfde manier, dus het gedrag is identiek
van buiten.

```
# Verstuur live titels voor Audio Addict-zenders. Standaard ingeschakeld.
audio_addict_icy_metadata = WAAR
```

Schakel dit uit als een van je afspeelapparaten slecht reageert op 'in-band'-metadata; de titels die naar het bedieningspunt worden gestuurd, blijven hierdoor ongewijzigd.
