# Zoekopdracht

Wanneer een besturingselement een zoekvak biedt, filtert dit niet de lijst waarover het al beschikt. Het verstuurt de
zoekopdracht naar UMS als een UPnP-criterium, zoals `dc:titel bevat "beatles"`, en UMS reageert met de
overeenkomende items. De instellingen op deze pagina bepalen hoe dat criterium wordt omgezet in een query.

## De twee zoekmachines

UMS kan een zoekopdracht beantwoorden op twee manieren:

- **Volledige-tekstindex (standaard).** UMS houdt een Lucene-index bij naast de database en doorzoekt deze.
  Het is snel, zelfs bij grote bibliotheken, en juist daardoor zijn gedeeltelijke woorden en tolerantie voor typefouten mogelijk.
- **Eenvoudige databasezoekopdracht.** Een rechttoe rechtaan SQL-query. Het is trager bij grote bibliotheken en zoekt alleen naar wat er letterlijk aanwezig is, maar er is geen index die verouderd kan raken.

De volledige tekstindex omvat de bestandsnaam van elk mediabestand, en voor audiobestanden bovendien de titel van het nummer, het album, de artiest, de albumartiest, de componist, de dirigent en het genre.

UMS schakelt automatisch over naar een databasezoekopdracht wanneer een controlepunt een criterium doorgeeft dat niet via de index kan worden beantwoord; het uitschakelen van de index is daarom zelden nodig.

```
# Gebruik de full-text-index. Bij ONWAAR wordt teruggevallen op een standaard databasezoekopdracht.
search_lucene_use_engine = WAAR
```

## Zoeken naar een deel van een woord

De meeste zoekvelden versturen een `bevat`-criterium terwijl je nog aan het typen bent. UMS zet elk woord van
je invoer direct om in twee alternatieven:

- een **prefix-overeenkomst** (voorvoegsel-overeenkomst); zo vindt `beat` bijvoorbeeld al _Beatles_ nog voordat je het woord volledig hebt getypt
- een **wazige** overeenkomst; zo wordt _Beatles_ bijvoorbeeld toch gevonden bij de zoekopdracht `beatlse`, ondanks de typefout

```
# Sta typefouten toe, naast het matchen van voorvoegsels.
zoekopdracht_lucene_bevat_wazige = WAAR
```

Beide instellingen komen overeen met voorvoegsels. Ze verschillen in wat ze verder nog overeenkomen:

|                                            | `WAAR` (standaard) | 'ONWAAR' |
| ------------------------------------------ | ------------------ | -------- |
| `beat` vind _Beatles_                      | ja                 | ja       |
| `beatlse` vind _Beatles_                   | ja                 | nee      |
| ongerelateerde resultaten bij korte invoer | mogelijk           | nee      |

De laatste rij is de reden dat de instelling bestaat. Dankzij de tolerantie voor typefouten zijn maximaal twee verkeerde, ontbrekende of extra letters toegestaan. Bij een kort woord heeft dit een verrassend verstrekkend effect: een zoekopdracht naar `ranz` levert bijvoorbeeld ook resultaten op voor _Jazz_, aangezien je met twee vervangingen van het ene woord bij het andere uitkomt. Als dat geluid je meer stoort dan de tolerantie voor typefouten helpt, zet het dan op `ONWAAR`.

Twee details die het vermelden waard zijn:

- Een voorvoegsel wordt pas vanaf **drie tekens** gebruikt. Eén of twee letters zouden overeenkomen met een groot deel van de bibliotheek, zonder dat dit informatie oplevert die niet al door de tolerantie voor typefouten wordt gevonden.
- Door je zoekterm tussen aanhalingstekens te plaatsen, wordt er gezocht naar de **woorden die direct naast elkaar staan**; dit is handig wanneer de afzonderlijke woorden veel voorkomen, maar de combinatie ervan niet.

## Zoeken naar een exacte waarde

Sommige criteria vereisen een exacte waarde in plaats van een deel daarvan; een 'besturingselement' dat bijvoorbeeld op genre zoekt, verstuurt `upnp:genre = "Jazz"`. Standaard wordt dat letterlijk genomen.

```
# Sta ook typefouten toe bij exacte overeenkomsten. Standaard uitgeschakeld.
zoekopdracht_lucene_gelijkwaardig_wazige = ONWAAR
```

Door dit in te schakelen, worden bij exacte vergelijkingen ook typefouten toegestaan. Dat is zelden wat je wilt, omdat
deze criteria doorgaans voortkomen uit het besturingselement zelf in plaats van uit iets wat je zelf hebt ingevoerd, en
een waarde die er 'bijna' goed uitziet, wordt vervolgens stilletjes als correct beschouwd.

## Opmerkingen

Zoekopdrachten negeert hoofdletters. `chapitre`, `Chapitre` en `CHAPITRE` geven dezelfde resultaten.

Als een zoekopdracht niet het verwachte resultaat oplevert, toont het debug-logboek de query die UMS op basis van jouw invoer heeft opgebouwd; deze staat op een regel die begint met `lucene zoekopdracht string is`. Het vergelijken met wat je hebt getypt,
verklaart meestal direct het resultaat.
