# Hoe verbetert u de ondersteuning op uw apparaat

Als je apparaat niets kan doen, zoals browsen in mappen of het spelen van een bestand, dan is het mogelijk op te lossen door de instellingen te wijzigen in het speler-configuratiebestand. Verschillende apparaten/renderers/clients communiceren met servers zoals UMS op verschillende manieren, dus het configuratiebestand vertelt UMS hoe die dezelfde taal spreekt als uw apparaat.

Elk configuratieprofiel dient twee doelen:
- UMS toestaan een specifieke speler te herkennen wanneer het probeert verbinding te maken
- Bepaal de mogelijkheden van die speler

We hebben een standaard configuratiebestand dat documentatie bevat over al onze speler instellingen. Bekijk de nieuwste versie op https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/external-resources/renderers/DefaultRenderer.conf

## Ondersteuning voor een niet-herkend apparaat toevoegen

Wanneer UMS uw apparaat niet herkent, betekent dit dat geen van de spelerconfiguratieprofielen overeenkomen met uw apparaat. Het resultaat is dat UMS een `Onbekende Renderer`weergeeft, en omdat het de mogelijkheden van je speler niet kent, kan het geen geoptimaliseerde uitvoer voor je apparaat bieden.

De oplossing is het proberen te maken van je eigen spelerconfiguratiebestand.
1. Maak een kopie van het .conf bestand dat het dichtst bij is bij uw apparaat. Als uw Samsung TV bijvoorbeeld niet wordt herkend, is een van de Samsung TV-configuraties wellicht een goede plek om mee te beginnen.

1. Ga naar het tabblad `Logs` in UMS en zoek de tekst `Media renderer niet herkend. Mogelijk te identificeren HTTP headers:`. Die informatie is nodig om UMS je apparaat te laten herkennen.

1. In je nieuwe .conf bestand, zoek naar de regel die `UserAgentSearch` en/of `UpnpDetailsSearch` definieert en vervang de waarden door die identificatie-informatie.

1. Blader en speel wat media op je apparaat. Noteer welke media die een probleem hadden. Nu kunt u doorgaan naar de volgende sectie om ondersteuning voor uw apparaat te verbeteren.

## Ondersteuning voor een apparaat verbeteren

1. Als een van je media een probleem heeft, moet de spelerconfiguratie worden gewijzigd totdat het werkt. Verwijs naar [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) voor de volledige lijst met opties. De meest voorkomende om te wijzigen zijn:
    ```
    Video
    Audio
    Afbeelding
    TranscodeerVideo
    TranscodeerAudio
    ZoekBijTijd
    Ondersteund
    ```
    Zorg ervoor dat je geen `MediaInfo = false` hebt in je nieuwe config, omdat de `Ondersteunde` lijnen hierdoor niet meer werken.

1. Om ervoor te zorgen dat transcoderen werkt op uw apparaat, speel een bestand uit de `#--TRANSCODEREN--#` map. Binnen die map speel een van de `FFmpeg` vermeldingen. Als het speelt, werkt transcodering.

1. De `Ondersteunde` regels moeten worden ingevuld om UMS te laten weten welke bestanden uw apparaat standaard ondersteunt. Het kan een goed idee zijn om de handleiding voor jouw apparaat online te vinden en te gebruiken om deze regels te helpen invullen.

1. Daarnaast kunt u een kijkje nemen in andere speler configuraties in de "renderers" map in uw installatiefolder, om te zien wat ze doen. Soms zult u hulp nodig hebben, die wij kunnen aanbieden op ons forum. Vergeet ons niet te vertellen over de verbetering die je maakt. Zo kunnen andere gebruikers met hetzelfde apparaat profiteren van jouw reparatie. We zullen u noemen in onze release aankondiging en changelog.
