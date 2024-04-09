# Hoe verbetert u de ondersteuning op uw apparaat

Als je apparaat niets kan doen, zoals browsen in mappen of het spelen van een bestand, dan is het mogelijk op te lossen door de instellingen te wijzigen in het speler-configuratiebestand. Verschillende apparaten/renderers/clients communiceren met servers zoals UMS op verschillende manieren, dus het configuratiebestand vertelt UMS hoe die dezelfde taal spreekt als uw apparaat.

We hebben een standaard configuratiebestand dat documentatie bevat over al onze speler instellingen. Bekijk de nieuwste versie op https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/external-resources/renderers/DefaultRenderer.conf

Gemeenschappelijke instellingen om te kijken zijn `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, en `ChunkedTransfer`.

Daarnaast kunt u een kijkje nemen in andere speler configuraties in de "renderers" map in uw installatiefolder, om te zien wat ze doen. Soms zult u hulp nodig hebben, die wij kunnen aanbieden op ons forum. Vergeet ons niet te vertellen over de verbetering die je maakt. Zo kunnen andere gebruikers met hetzelfde apparaat profiteren van jouw reparatie. We zullen u noemen in onze release aankondiging en changelog.

Als je een nieuwe speler configuratie hebt om bij te dragen aan het project, maak dan een verzoek aan met **Pull Request** op onze GitHub: https://github.com/UniversalMediaServer/UniversalMediaServer
