# RadioBrowser

Om een ​​internetradiozender aan een afspeellijst toe te voegen, moet je doorgaans ergens op het internet het streamadres opsporen en dit vervolgens in een bestand plakken. UMS kan die stap voor je uit handen nemen: het is
gekoppeld aan **RadioBrowser**, een door de gemeenschap onderhouden overzicht van internetradiozenders;
UMS kan hierin zoeken en een zender voor je toevoegen.

Er is niets om te configureren. De directory wordt op verzoek gebruikt, en alleen wanneer u erom vraagt.

## Een zender vinden

Als uw besturingselement een zenderzoekfunctie biedt, dan verzoekt dit UMS om informatie, en UMS richt op zijn beurt een verzoek aan RadioBrowser.
Het aantal zenders kan worden beperkt door

- naam
- land
- taal
- tag, zoals een genre of een thema

Welke hiervan je besturingselement je laat gebruiken, en hoe het deze presenteert, hangt af van het besturingselement zelf. UMS levert ook de mogelijke waarden voor de filters op land, taal en tag, zodat een dergelijk zoekveld deze als een lijst kan aanbieden in plaats van dat je ze zelf hoeft in te typen.

Lange resultatenlijsten worden in gedeelten opgehaald, waardoor een brede zoekopdracht niet in één keer hoeft te worden overgedragen.

## Zender toevoegen

Wanneer je een zender kiest, voegt UMS een volledig item toe aan de afspeellijst van je keuze — niet alleen het
adres:

- de **stream adres**
- de **zendernaam**, of een eigen titel als je bij het besturingselement een dergelijke titel kunt invoeren
- het **zender logo**, zodat het invoer een ​​afbeelding bevat in plaats van een standaardpictogram
- de **zender-identificatie** uit de map

Het laatste punt is het interessante gedeelte. It stays in the playlist file as a
[`#RADIOBROWSERUUID:` directive](./playlist-directives), which means the entry remains connected to
the directory entry it came from. UMS gebruikt die verbinding om details aan te vullen die de stream zelf niet prijsgeeft, zoals het genre en de bitrate.

Het resultaat is een afspeellijstbestand dat nog steeds leesbaar is als een gewone afspeellijst en in elke andere speler werkt:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUID:962cf2e0-0601-11e97-52543be04c81
http://stream.example.com/jazz.mp3
```

Je kunt zo'n invoer ook handmatig invoeren, als je de identificatiecode van de zender kent. Als je de instructie weglaat, verlies je alleen de aanvullende details; de zender zelf werkt in beide gevallen.

## Daarna

Vanaf dat moment gedraagt ​​de zender zich als elk ander item in de afspeellijst. You can rate it, replace its
picture, and correct how its live titles are read; see
[Internet radio and live titles](./internet-radio).
