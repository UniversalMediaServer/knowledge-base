# Opstellingen met twee of drie apparaten

UPnP kent twee manieren om de delen van een mediasysteem te rangschikken en UMS gedraagt zich elk op een andere manier.

In een opstelling met **twee apparaten** is het apparaat waarmee je door je bibliotheek bladert, bovendien het apparaat dat de muziek afspeelt: bijvoorbeeld een tv, een streamingkastje of een app op je telefoon die de mappen toont en vervolgens zelf het nummer afspeelt. Het apparaat dat
vraagt om de lijst en het apparaat dat om audio vraagt zijn dezelfde apparaat.

In een opstelling met **drie apparaten** zijn ze apart. Een _controle punt_ - een app op uw telefoon of een web
interface - toont de bibliotheek en vertelt een _renderer_ om te spelen. De app komt nooit aan de audio; hij
wijst de renderer er enkel naar. Dit is de opzet die kenmerkend is voor hifi-streamers, waarbij een specifiek apparaat voor het afspelen zorgt en jij het vanaf een andere plek aanstuurt.

## Waarom UMS het verschil moet weten

UMS beslist hoe een track geleverd moet worden op basis van wat het ontvangende apparaat kan behandelen: een speler die
geen FLAC kan decoderen, krijgt een geconverteerde stream, een waarmee het bestand ongemoeid kan worden gelaten.

In een opstelling met twee apparaten is dat eenvoudig omdat degene die om de lijst heeft gevraagd degene is die zal spelen.
In een opstelling met drie apparaten is dat niet het geval: het verzoek om de lijst is afkomstig van je telefoon, het verzoek om de audio van de streamer. Beslissingen baseren op de telefoon zou volkomen onjuist zijn — dat zou betekenen dat de streamer precies datgene krijgt aangeleverd wat geschikt is voor een telefoon.

## Hoe UMS hun uit elkaar houdt

```
# Vereist accounts en inloggen. Standaard ingeschakeld.
authentication_enabled = WAAR
```

Wanneer authenticatie is **ingeschakeld**, koppelt UMS het afspelen aan de identiteit van de gebruiker die door de inhoud heeft gebladerd; wat een gebruiker mag zien, is dus ook wat deze gebruiker kan afspelen. Dit is het juiste gedrag voor een huishouden met
meerdere accounts en toegang per gebruiker, waarbij wordt uitgegaan van een opstelling met twee apparaten.

Wanneer authenticatie is **uitgeschakeld**, gaat UMS er niet langer van uit dat de twee hetzelfde zijn. Het bepaalt het afspeelapparaat op het moment dat de audio wordt opgevraagd, op basis van het verzoek zelf — het adres ervan en de informatie die het over zichzelf verstrekt — en neemt vervolgens een beslissing over de conversie voor _dat_ specifieke apparaat. De identiteit in het browseverzoek wordt vervolgens begrepen als het controlepunt dat het in werkelijkheid is.

Wanneer twee apparaten hetzelfde adres delen – wat bijvoorbeeld gebeurt als het controlepunt en de renderer op dezelfde machine draaien – kunnen ze toch van elkaar worden onderscheiden; dit komt doordat ze niet enkel op basis van hun adres worden geïdentificeerd, maar aan de hand van de informatie die zij over zichzelf verstrekken.

## Kiezen

Geen van beide instellingen is correcter dan de andere; schakel voor maximale compatibiliteit authenticatie **uit**. De prijs hiervoor is dat UMS vervolgens geen gebruikersaccounts kent: er is geen toegangscontrole per gebruiker, en alles wat wordt gedeeld, is zichtbaar voor elk apparaat op het netwerk dat er verbinding mee kan maken. Als dat een punt van zorg is, beperk dan welke apparaten überhaupt toegang kunnen krijgen tot UMS — zie
[Beveiliging en privacy](/configuration/security-and-privacy).

Laat dit **ingeschakeld** als je spelers zelf door het aanbod bladeren en content afspelen, of als je een scheiding per gebruiker nodig hebt. Dit is de standaardinstelling.
