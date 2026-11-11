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

### Illustratiemateriaal

`#EXTIMG:` vereist een absoluut adres van een afbeelding; UMS downloadt deze eenmalig en gebruikt haar vervolgens voor dat item. Zie [Hoe voeg je illustratiemateriaal toe](/guides/how-to-add-artwork) voor de details en de geaccepteerde
vormen.

### Beoordelingen

`#EXTRATING:` and `#EXTPLAYLISTRATING:` neemt een heel getal over van **0 tot 5**. De eerste beoordeelt de invoer dat erop volgt; de tweede beoordeelt de afspeellijst als geheel en kan op een willekeurige plek in het bestand staan.

```text
#EXTPLAYLISTRATING:5
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTRATING:4
http://stream.example.com/jazz.mp3
```

Een beoordeling in het bestand is de **beginwaarde**, geen actueel overzicht: UMS past deze toe wanneer het item nog niet is beoordeeld, en laat een al bestaande beoordeling ongemoeid. Het bewerken van het bestand heeft dus geen effect op
items die je al in je controlepunt hebt beoordeeld; beoordeel ze daar in plaats daarvan, dan werkt UMS de regel voor je bij.

Voor een bestand op de schijf is dit handig, omdat de beoordeling in de database wordt opgeslagen en ook naar de tags van het bestand kan worden geschreven. Voor een radiozender is dit de enige duurzame plek waar de waardering behouden blijft: het zorgt ervoor dat de waardering een vernieuwing van de database overleeft en met de afspeellijst meegaat wanneer je deze kopieert.

### Identiteit van radiostation

`#RADIOBROWSERUID:` bevat de identifier die een station heeft in de RadioBrowser map. Hiermee kan UMS aanvullende details over het station opzoeken, in plaats van alleen te tonen wat de stream zelf prijsgeeft. Besturingselementen die een stationselectieoptie bieden, voegen deze regel zelf toe zodra je een station kiest; er is dus zelden een reden om deze handmatig in te typen.

### Titel volgorde

`#EXTICYORDER:` bepaalt of een bericht van het station wordt gelezen als _Artiest - Titel_ of als
_Titel - Station_. Zie [Internet radio en live titels](./internet-radio).

## UMS-richtlijnen schrijven zichzelf

Je hoeft de afspeellijsten niet handmatig te bewerken. Wanneer uw bedieningselement illustratiemateriaal, een beoordeling of de volgorde van titels instelt, schrijft UMS de bijbehorende regel naar het afspeellijstbestand. Elke richtlijn wordt afzonderlijk vervangen; het instellen van een dekking heeft dus geen invloed op een beoordeling (en vice versa), en het verwijderen van een waarde verwijdert uitsluitend de bijbehorende regel.

Het illustratiemateriaal wordt pas weggeschreven nadat de afbeelding daadwerkelijk is geladen; bij een ongeldig adres blijft het bestand dus ongewijzigd, in plaats van dat er een dode link wordt opgeslagen.
