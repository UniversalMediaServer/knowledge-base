# Prestatie

De standaardwaarden worden gekozen om veilig te zijn op bescheiden hardware. Op een machine met een omvangrijke bibliotheek en rekenkernen
in overvloed is het de moeite waard om een ​​aantal instellingen opnieuw te bekijken — en één daarvan is belangrijker dan de rest.

Verander één ding per keer en kijk naar het resultaat. Elke instelling hier ruilt de ene hulpbron in voor de andere;
een waarde die bij de ene installatie helpt, kan bij de volgende dus schadelijk zijn.

## Parallel lezen van de bibliotheek

Voordat UMS een bestand kan presenteren, moet het vaststellen wat het is: de metadata lezen, het artwork opzoeken en bepalen wat het verzoekende apparaat nodig heeft. Dit is de allerbelangrijkste factor voor de duur van een scan en de snelheid waarmee een grote map wordt geopend; dit proces wordt uitgevoerd door een groep werkthreads.

```
# Het aantal bestanden dat UMS tegelijkertijd verwerkt. Standaard 4, toegestaan ​​is 1 tot 64.
media_resolve_threads = 4
```

Het werk wordt gedomineerd door wachten — op de schijf, op de database, soms op het netwerk — waardoor het inzetten van meer threads nuttig is, zelfs ver boven het aantal beschikbare kernen (cores). Op een server met een grote bibliotheek is een waarde in de buurt van het aantal kernen, of daarboven, redelijk. Laat het ongemoeid op een kleine machine, of op een machine waar UMS de schijf deelt met iets anders.

Deze instelling bepaalt ook de omvang van de pool met databaseverbindingen; deze wordt op tweemaal het aantal threads gehouden en nooit op minder dan tien. Dat is een bewuste keuze: worker-threads hebben verbindingen nodig, en het opstarten van de threads zonder de bijbehorende verbindingen zou ertoe leiden dat ze op elkaar moeten wachten in een wachtrij. Omdat
de twee samen bewegen, valt er niets afzonderlijks af te stellen.

## Database geheugen

De database houdt onlangs gebruikte pagina's in het geheugen. Hoeveel er gebruikt mag worden, wordt automatisch bepaald, en
dat is doorgaans de juiste oplossing:

```
# Database-cache in KB. Standaard -1; hiermee bepaalt UMS zelf de grootte.
database_media_cache_size = -1
```

Twee verder schakelaars ruilen geheugen in voor snelheid. Beide staan ​​standaard uitgeschakeld en bij beide is het de moeite waard om ze te meten in plaats van te gissen:

```
# Houd database indexen in het geheugen.
database_media_use_memory_indexes = ONWAAR

# Laat de cache geheugen teruggeven onder druk in plaats van deze vast te houden.
database_media_use_cache_soft = ONWAAR
```

Geheugenindexen maken zoeken sneller ten koste van geheugen dat vervolgens niet beschikbaar is voor iets anders.
De 'soft cache' werkt precies andersom: deze geeft geheugen vrij wanneer het systeem daar behoefte aan heeft. Hierdoor komt UMS niet in de problemen op een machine met een tekort aan geheugen, al is de keerzijde dat die pagina's later opnieuw moeten worden ingelezen.

## Loggen

Standaard schrijft UMS elke log-regel uit wanneer het gebeurt. Buffering maakt logging efficiënter:

```
# Collect log lines before writing them out. Off by default.
logging_buffered = ONWAAR
```

Het addertje onder het gras duikt precies op het moment dat je het logboek het hardst nodig hebt. Als UMS wordt beëindigd of crasht, gaat alles wat zich nog in de buffer bevindt verloren. Hierdoor kan het logbestand voortijdig eindigen, nog vóór de gebeurtenis die je onderzoekt; een logbestand dat abrupt stopt, kan zo de indruk wekken dat er sprake was van een vastloper, terwijl dat in werkelijkheid helemaal niet is gebeurd. Laat buffering uitgeschakeld terwijl je een probleem onderzoekt.

## Wat te meten

Twee nummers vertellen je of een wijziging heeft geholpen:

- Hoe lang een volledige scan van uw bibliotheek duurt. Het staat in het logbestand, in een regel die meldt dat de mediascan is voltooid en aangeeft hoeveel seconden daarvoor nodig waren.
- Hoe lang het duurt om de grootste map in een controlepunt te openen: één keer direct na een herstart, en nogmaals meteen daarna. De eerste keer omvat ook het aanmaken van de map, de tweede keer niet;
  het is op dit verschil dat deze instellingen betrekking hebben.
