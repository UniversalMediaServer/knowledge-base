# Afspeellijsten bewerken vanaf een besturingselement

Afspeellijsten zijn gewone `.m3u8`-bestanden en je kunt ze altijd bewerken in een teksteditor. UMS kan ook
je besturingselement het werk laten doen: maak een afspeellijst, voeg het nummer toe waar je op dat moment naar luistert, verwijder een nummer dat je niet langer wilt horen, hernoem de lijst of verwijder deze in zijn geheel — zonder dat je handmatig bestanden hoeft aan te passen.

Dit staat standaard **uitgeschakeld**. Schrijven naar een afspeellijst betekent schrijven naar je schijf; het moet dus iets zijn waar je bewust toestemming voor geeft, in plaats van iets wat simpelweg altijd aanstaat.

```
# Sta toe dat besturingselementen objecten aanmaken, wijzigen en verwijderen. Standaard uitgeschakeld.
upnp_cds_write = WAAR
```

## Wat wordt mogelijk

Wanneer deze instelling is ingeschakeld, kan een besturingselement dat dit ondersteunt

- maak een nieuwe afspeellijst
- Een item toevoegen aan een afspeellijst, inclusief een item dat momenteel wordt afgespeeld.
- verwijder een item uit een afspeellijst
- een afspeellijst hernoemen of verwijderen.

Of je voor dit alles knoppen ziet, hangt af van je besturingselement. UMS stelt enkel de operaties beschikbaar; er gebeurt niets, tenzij erom wordt gevraagd.

Wat UMS aanmaakt, zijn gewone afspeellijstbestanden in je gedeelde mappen — geen vermeldingen in een database die alleen door UMS worden begrepen. Je kunt ze achteraf in elk gewenst programma openen, naar een andere speler kopiëren of
in een back-up bewaren. Aanvullende details die een afspeellijstitem niet op zichzelf kan uitdrukken – zoals artwork voor een radiozender – worden opgeslagen als [richtlijnen](./playlist-directives) in hetzelfde bestand.

Er zijn wijzigingen doorgevoerd voor gekoppelde bedieningselementen: een afspeellijst die op het ene apparaat wordt bewerkt, toont de nieuwe inhoud direct op de andere apparaten, zonder dat een handmatige verversing nodig is.

## Bestanden uploaden

Een tweede instelling regelt iets anders en aanzienlijk ingrijpender: of een apparaat **bestandsinhoud** naar UMS mag sturen en naar de schijf mag laten schrijven.

```
# Sta toe dat niet-geïdentificeerde apparaten bestanden naar de schijf schrijven. Standaard uitgeschakeld.
anonymous_devices_write = WAAR
```

Laat dit achterwege, tenzij je een concrete reden hebt. Hiermee kan een apparaat in uw netwerk, dat door UMS niet aan een bekende gebruiker kan worden toegewezen, mediabestanden in uw gedeelde mappen aanmaken, vervangen en verwijderen.
Dat is een grote mate van vertrouwen om te schenken aan alles wat zich op het netwerk bevindt; daarom bestaat deze instelling los van het bewerken van afspeellijsten, in plaats van erin te zijn opgenomen.

## Beide instellingen kunnen op afstand worden gewijzigd

Een besturingselement kan beide schakelaars zelf uitlezen en instellen, op dezelfde manier waarop het elke andere UMS-instelling uitleest. Dat is handig — je kunt het bewerken van afspeellijsten inschakelen vanuit de app die je toch al in je handen hebt — maar het betekent ook dat de waarde in je configuratiebestand niet het laatste woord heeft: alles wat de UPnP-service op je netwerk kan bereiken, kan die waarde wijzigen.

Als dat voor jou van belang is, beperk dan welke apparaten überhaupt toegang kunnen krijgen tot UMS. Zie
[Beveiliging en privacy](/configuration/security-and-privacy).
