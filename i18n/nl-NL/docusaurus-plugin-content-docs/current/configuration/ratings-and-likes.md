# Beoordelingen en vind-ik-leuk

UMS kan onthouden hoe je je muziek beoordeelt – op een schaal van nul tot vijf sterren – en via besturingselementen met beoordelingsknoppen kun je die waarden instellen en wijzigen terwijl je naar de muziek luistert.

Vind-ik-leuk zijn geen apart mechanisme. Een **'vind-ik-leuk' staat gelijk aan een beoordeling van vijf sterren**, een **'vind-ik-niet-leuk' aan nul**. Als je besturingselement een hartje in plaats van sterren toont, wordt dezelfde waarde op dezelfde plek geschreven;
daarom spreken de twee elkaar nooit tegen.

## Waar een beoordeling wordt bewaard

De beoordeling bevindt zich in de UMS-database en is gekoppeld aan het item, niet aan het bestand. Dat heeft twee
gevolgen die het weten waard zijn:

- Het werkt voor zaken die zelf geen ruimte hebben om een ​​beoordeling op te slaan — bijvoorbeeld een internetradiozender, of een audioformaat waarvan de metadata geen veld voor een beoordeling bevat.
- Dit staat los van het bestand; het opnieuw voorzien van tags in je verzameling met een andere tool overschrijft dus niet de beoordelingen die je in UMS hebt gegeven.

Als je de beoordeling ook in de bestanden zelf wilt opslaan, zodat andere programma's deze kunnen zien, dan kan UMS de beoordeling in de tag schrijven zodra je een item beoordeelt:

```
# Schrijf de beoordeling ook naar de tag van het bestand. Standaard uitgeschakeld.
audio_update_rating_tag = WAAR
```

Dit geldt alleen voor bestanden waaraan een beoordeling kan worden toegekend, en uitsluitend vanaf het moment dat je deze functie inschakelt; eerder toegekende beoordelingen worden niet met terugwerkende kracht vastgelegd.

Een beoordeling die behouden moet blijven bij het opnieuw opbouwen van een database, of die mee moet gaan met een afspeellijst die je naar een andere locatie kopieert, hoort in het bestand van de afspeellijst zelf thuis. Zie [Afspeellijst-richtlijnen](/configuration/playlist-directives).

## De map Mijn Albums

Albums die je leuk bevonden hebt, worden verzameld in een map genaamd **Mijn albums**. Het wordt automatisch gevuld:
zoals bij een album – als je een 'vind-ik-leuk' plaatst, verschijnt het; verwijder je die 'vind-ik-leuk', dan is het weer verdwenen.

Standaard bevindt de map zich in de mediabibliotheek, bij de andere audiomappen. Als je het vaak nodig hebt, kun je ervoor zorgen dat het op het hoogste niveau wordt weergegeven:

```
# Toon 'Mijn albums' in de hoofdmap. Standaard uitgeschakeld.
audio_likes_visible_root = WAAR
```

## Zoeken op beoordeling

UMS geeft aan dat de beoordeling één van de kenmerken is waarop gezocht kan worden; een 'besturingselement' kan hier dus op dezelfde manier naar vragen als naar een titel of een artiest. Een verzoek om alles met een beoordeling van vijf sterren
levert op wat de map 'Mijn albums' laat zien; elke andere waarde werkt eveneens.

De zoekopdracht komt overeen met een **exacte** waarde. Er is geen mogelijkheid om in één verzoek om "vier sterren of meer" te vragen; een besturingselement dat een dergelijk filter aanbiedt, moet voor elke waarde afzonderlijk een verzoek indienen en de antwoorden vervolgens zelf samenvoegen.

De beoordelingen worden uit de database gelezen, waardoor de zoekopdracht ook items vindt die in hun bestand geen beoordeling hebben, zoals radiozenders.

## Back-up ervan maken

Omdat beoordelingen en 'vind-ik-leuk' in de database staan, is het verstandig om er een kopie van te bewaren, voor het geval er iets ingrijpends met de database gebeurt. UMS kan ze uitreiken en weer innemen, wat het bovendien mogelijk maakt om ze naar een andere installatie te verplaatsen. De
[UMS UPnP-service](/configuration/ums-extended-service) somt de acties op die een 'besturingselement' daarvoor gebruikt.
