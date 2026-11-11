# Audio Addict Netwerk Radio

Het **Audio-Addict Netwerk** is een verzameling van premium internetradiostations, waaronder:

Klassieke Radio, Radio Tunes, Rots Radio, Jazz Radio, Zen Radio, en DI.fm.

Voor toegang tot deze radiostations is een betaald **premium account** vereist. U hoeft zich slechts te registreren op een van de websites, omdat dezelfde gebruikersnaam en wachtwoord toegang tot alle sites zullen verlenen.

UMS leest automatisch alle beschikbare AudioAddict radiowebsites, hun kanalen en filters. Het **Favorieten** kanaal wordt ook ondersteund.

## Configuratie

Om AudioAddict ondersteuning in te schakelen, voeg je de volgende regels toe aan je `UMS.conf` bestand:

```
# TRUE = verkies Europese streaming server
audio_addict_europe = TRUE or FALSE

# Uw gebruikersnaam
audio_addict_user = USERNAME

# Uw wachtwoord
audio_addict_pass = PASSWORD
```

## Locatie

De map **Audio-Addict Radio Netwerk** bevindt zich in uw mediabibliotheek. Vanaf daar kunt u direct bladeren en heeft u toegang tot alle beschikbare stations.

## Series en afleveringen

Naast de live stations biedt DI.fm netwerk een map **Gebeurtenissen**. Het geeft een lijst van de aanstaande shows, en
voor een show die al uitgezonden is, biedt het ook de opname, zodat je er daarna
naar kunt luisteren.

Shows met eerder uitgebrachte afleveringen krijgen een map van hun eigen met daarin de oudere afleveringen. Sommige series hebben er
honderden van, dus de map is verdeeld in kleinere groepen, elk gelabeld met de aflevering nummers
en datums.

```
# Hoeveel afleveringen in één groep zitten voordat ze worden gesplitst. Standaard 20, minimaal 1.
audio_addict_episodes_per_container = 20
```

Het samenstellen van deze lijst houdt in dat de dienst wordt aangevraagd voor de gebeurtenissen en de afleveringen van elke serie; dit neemt enige tijd in beslag. UMS onthoudt het antwoord zodat het browsen en starten van het afspelen niet elke keer opnieuw betaald wordt:

```
# Hoe lang de lijsten voor series en afleveringen worden hergebruikt in minuten.
# standaard 60. Zet op 0 om de service elke keer aan te vragen.
audio_addict_tree_cache_ttl_minutes = 60
```

Een langere tijdsduur zorgt voor vlotter bladeren, een kortere tijdsduur zorgt ervoor dat nieuw gepubliceerde afleveringen sneller worden opgepikt. De
adressen die UMS ontvangt blijven veel langer geldig dan het standaarduur, dus er is geen noodzaak om deze
waarde klein te houden.

## Live titels

Audio Addict stations kondigen het huidige nummer in de audiostream niet aan. UMS vraagt in plaats daarvan de
service aan en levert het resultaat aan je speler, zodat je nog steeds ziet wat er speelt. This is
described in [Internet radio and live titles](./internet-radio).

```
# Stuur live titels voor Audio Addict stations. Standaard aan.
audio_addict_icy_metadata = TRUE
```

## Samengestelde afspeellijsten

Samengestelde afspeellijsten spelen één nummer na een ander vanaf uw account. Wanneer de afspeellijst zijn einde bereikt, kan
UMS het opnieuw starten in plaats van het te stoppen:

```
# Start een samengestelde afspeellijst opnieuw wanneer het eindigt. Standaard uit.
audio_addict_playlist_loop = FALSE
```

## Alle instellingen in één oogopslag

| Instelling                            | Standaard | Doel                                                           |
| ------------------------------------- | --------- | -------------------------------------------------------------- |
| `audio_addict_user`                   | —         | Uw accountnaam                                                 |
| `audio_addict_pass`                   | —         | Uw wachtwoord                                                  |
| `audio_addict_europe`                 | `WAAR`    | Voorkeur voor de Europese streaming server                     |
| `audio_addict_icy_metadata`           | `WAAR`    | Stuur live titels naar de speler                               |
| `audio_addict_episodes_per_container` | `20`      | Afleveringen per groep voor splitsing                          |
| `audio_addict_tree_cache_ttl_minutes` | `60`      | Hoe lang lijsten van series en afleveringen worden hergebruikt |
| `audio_addict_playlist_loop`          | `ONWAAR`  | Herhaal een samengestelde afspeellijst wanneer deze eindigt    |
