# Wijzigingsmeldingen

Wanneer er iets in je bibliotheek verandert, zouden gekoppelde apps dat moeten opmerken zonder dat jij op 'verversen' hoeft te klikken —
en zonder dat ze elke paar seconden aan UMS hoeven te vragen of er iets is gebeurd. UPnP lost dit op met
abonnementen: een app geeft eenmalig aan ergens in geïnteresseerd te zijn, en UMS laat de app vervolgens weten wanneer er nieuws is.

Dit werkt in beide richtingen en de twee worden afzonderlijk aangestuurd.

## Wat UMS aankondigt over uw bibliotheek

UMS publiceert twee stukken informatie telkens wanneer de bibliotheek wijzigt:

- een **teller** die bij elke wijziging oploopt en een abonnee laat weten dat er iets is gebeurd
- een **lijst van de containers die zijn gewijzigd**, die aangeeft wat

De tweede zorgt ervoor dat de boel snel blijft. Een app die alleen registreert dat "er iets is veranderd", moet opnieuw laden; een app die registreert dat "deze map is veranderd", laadt alleen die specifieke map opnieuw en laat de rest ongemoeid.

Beide worden hooguit een paar keer per seconde aangekondigd. Een scan waarbij duizend bestanden worden geïmporteerd, levert daarom geen duizend meldingen op; de wijzigingen worden verzameld en gerapporteerd als een handvol berichten.

Typische momenten wanneer dit gebeurt:

- een bestand verschijnt of verdwijnt uit een gedeelde map
- je [bewerk een afspeellijst](./playlist-editing) vanaf een besturingselement
- je geeft iets een beoordeling, omdat dat verandert wat de beoordelingsmappen bevatten
- artwork is toegevoegd voor een station of map

Of uw app op het nieuws reageert, is aan de app. De meeste verversen de weergave die je op dat moment bekijkt; sommige
gebruiken de informatie pas opnieuw wanneer je een map opnieuw opent. Als een wijziging niet zichtbaar is, is het de moeite waard
om de map opnieuw te openen voordat je ervan uitgaat dat deze niet is geleverd.

## Waar UMS naar luistert op uw afspeelapparaten

De andere richting is dat UMS zich abonneert op jouw **spelers**, zodat het kan weergeven wat ze aan het doen zijn — wat er wordt afgespeeld, of ze op pauze staan, wat het volumeniveau is — en bedieningsmogelijkheden voor die spelers kan bieden.

```
# Volg de spelers op het netwerk. Standaard ingeschakeld.
upnp_subscribe_services = WAAR
```

Laat dit ingeschakeld als UMS de plek is van waaruit je het afspelen aanstuurt.

Schakel het uit wanneer het afspelen wordt aangestuurd door een apart bedieningspunt. In die opstelling heeft UMS geen enkele reden om de spelers te volgen en de controle erover op te eisen: het controlepunt doet dat al, en wanneer twee partijen hetzelfde apparaat aansturen, leidt dat al snel tot verwarrende resultaten. Door dit uit te schakelen,
blijft UMS ervan af en worden de mediabestanden simpelweg aangeboden.

Zie [Opstellingen met twee of drie apparaten](./control-point-setups) voor hoe zo'n opstelling eruitziet.
