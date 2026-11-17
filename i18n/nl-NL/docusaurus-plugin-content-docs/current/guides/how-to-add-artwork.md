# Hoe je illustratiemateriaal toevoegt

Je kunt je eigen illustratiemateriaal toevoegen voor mappen en afspeellijsten, zodat je frontend aangepaste miniaturen laat zien in plaats van algemene standaardafbeeldingen.

Deze handleiding legt uit:

- welke afbeeldingsformaten worden ondersteund
- hoe je illustratiemateriaal bestanden een naam geeft
- waar je deze bestanden moet plaatsen
- wat er gebeurt als een afspeellijst afbeelding ontbreekt

## Ondersteunde afbeeldingsformaten

UMS ondersteunt deze afbeeldingsformaten voor illustratiemateriaal van mappen en afspeellijsten:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

## Map

Om illustratiemateriaal in te stellen voor een map, plaats je een afbeeldingsbestand genaamd `map.ext` in die map.

Vervang `.ext` met een van de ondersteunde extensies.

Voorbeelden:

- `map.webp`
- `map.jpg`
- `map.png`

### Gebruik bestaande bestandsnamen zoals 'omslag.jpg'

Je kunt alternatieve namen opgeven voor illustratiemateriaal voor mapafbeeldingen. Om te zoeken naar `omslag.jpg` of `voorkant.png`, voegt u deze regel toe aan `UMS.conf` in uw UMS-profielmap; start daarna UMS opnieuw op.

```ini
map_miniatuur_namen = omslag, voorkant
```

Voer de namen in zonder bestandsextensies en scheid ze met komma's. Matchen maakt geen onderscheid tussen hoofdletters en kleine letters; `omslag` komt dus ook overeen met `Omslag.JPG`.

Met deze instelling zoekt UMS eerst naar `map.*`, vervolgens naar `omslag.*`, dan naar `voorkant.*` en tot slot naar ondersteunde afbeeldingen die `illustratiemateriaal` in de bestandsnaam hebben staan. Laat de instelling leeg om gebruik te maken van de standaardmethode voor het opzoeken van illustratiemateriaal voor mapafbeeldingen.

De geselecteerde afbeelding kan ook dienen als reserveafbeelding voor nummers in de map en voor lokale afspeellijsten in dezelfde map.

## Afspeellijsten

Om illustratiemateriaal voor een afspeellijst in te stellen, gebruik je dezelfde basisbestandsnaam als het afspeellijstbestand.

Voorbeeld:

- Afspeellijst bestand: `Jazz.m3u8`
- Illustratiemateriaal bestand: `Jazz.jpg` (of `Jazz.webp`, `Jazz.png`, enzovoort)

Voor een lokale afspeellijst controleert UMS deze bronnen in de aangegeven volgorde.

1. Een afbeelding met exact dezelfde basisbestandsnaam als de afspeellijst, zoals `Jazz.jpg` bij `Jazz.m3u8`.
2. Illustratiemateriaal die via een compatibel besturingselement aan die afspeellijst is toegewezen.
3. Het illustratiemateriaal van de map, die afkomstig kan zijn van `map.*`, een naam in
   `map_miniatuur_namen` of een `album illustratiemateriaal`-afbeelding.

## Voorbeeld mappenstructuur

Gebruik dit als referentie:

```text
Muziek/
|-- map.jpg
|-- Jazz/
|   |-- map.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- map.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

In dit voorbeeld:

- `Muziek/map.jpg` is het artwork voor de hoofdmap `Muziek`.
- `Muziek/Jazz/map.png` is het artwork voor de `Jazz` map.
- `Muziek/Jazz/Jazz.jpg` is gebruikt voor de `Jazz.m3u8` afspeellijst.
- `Muziek/Jazz/Smooth.m3u8` heeft geen overeenkomende `Smooth.*` afbeelding, dus de `Jazz` map artwork wordt gebruikt.

## Web streams binnen een afspeellijst

De bovenstaande naamgevingsregels werken omdat er een bestand is om de afbeelding naast te plaatsen. Een internetradiozender of elk ander webadres dat in een afspeellijst staat, beschikt niet over een dergelijk bestand; daarom is er een andere manier nodig om de bijbehorende afbeelding aan te duiden: een `#EXTIMG:`-regel die naar de afbeelding verwijst.

Plaats de regel direct **boven** het invoer waar deze bij hoort, op dezelfde manier als `#EXTINF:` werkt. Dit is uitsluitend van toepassing op
het volgende invoer, waardoor elke stream een ​​eigen regel krijgt:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://voorbeeld.com/zenders/jazz-radio.png
http://stream.voorbeeld.com/jazz.mp3

#EXTINF:-1,Rock Radio
#EXTIMG:https://voorbeeld.com/zenders/rock-radio.jpg
http://stream.voorbeeld.com/rock.mp3
```

UMS downloadt de afbeelding één keer, slaat deze op en gebruikt haar vanaf dat moment voor die stream. Het wordt niet bij elke start opnieuw opgehaald.

Wat de regel accepteert:

- Een **absoluut** adres. `https://voorbeeld.com/cover.png` werkt, maar `cover.png` en `../art/cover.png`
  niet — een relatief pad wordt genegeerd en de stream behoudt de standaardafbeelding.
- Een `data:`-URI, voor het geval je de afbeelding liever in het afspeellijstbestand zelf bewaart in plaats van deze ergens anders te hosten.
- Alleen `.m3u`- en `.m3u8`-afspeellijsten. Andere afspeellijstformaten hebben geen plaats om de regel toe te voegen.

Het gebruik van hoofdletters of kleine letters in de richtlijn zelf maakt niet uit: `#EXTIMG:` en `#extimg:` werken beide.

### Laat UMS de regel voor je schrijven

Als je besturingselement het illustratiemateriaal van een invoer kan instellen, hoef je de afspeellijst niet handmatig te bewerken.
UMS schrijft de `#EXTIMG:`-regel in het afspeellijstbestand zelf, en wel pas nadat de afbeelding succesvol is geladen; een ongeldig adres zorgt er dus voor dat het bestand ongewijzigd blijft, in plaats van dat er een niet-werkende koppeling wordt opgeslagen.

Omdat het illustratiemateriaal in dat geval in het afspeellijstbestand zelf is opgeslagen – en niet enkel in de database – blijft het behouden wanneer de database opnieuw wordt opgebouwd; bovendien verhuist het illustratiemateriaal mee met het bestand als je de afspeellijst naar een andere locatie kopieert.
