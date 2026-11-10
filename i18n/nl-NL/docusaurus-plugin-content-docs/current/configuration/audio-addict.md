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

Het samenstellen van deze lijst houdt in dat de dienst wordt aangevraagd voor de gebeurtenissen en de afleveringen van elke serie; dit neemt enige tijd in beslag. UMS remembers the answer so that browsing and starting playback do not each pay for it
again:

```
# How long the show and episode lists are reused, in minutes.
# Default 60. Set to 0 to ask the service every time.
audio_addict_tree_cache_ttl_minutes = 60
```

A longer time makes browsing snappier, a shorter one picks up newly published episodes sooner. The
addresses UMS receives stay valid far longer than the default hour, so there is no need to keep this
value small.

## Live titles

Audio Addict stations do not announce the current track inside the audio stream. UMS asks the
service instead and delivers the result to your player, so you still see what is playing. This is
described in [Internet radio and live titles](/configuration/internet-radio).

```
# Send live titles for Audio Addict stations. On by default.
audio_addict_icy_metadata = TRUE
```

## Curated playlists

Curated playlists play one track after another from your account. When the playlist reaches its end,
UMS can start over instead of stopping:

```
# Start a curated playlist again when it ends. Off by default.
audio_addict_playlist_loop = FALSE
```

## All settings at a glance

| Setting                               | Default | Purpose                                    |
| ------------------------------------- | ------- | ------------------------------------------ |
| `audio_addict_user`                   | —       | Your account name                          |
| `audio_addict_pass`                   | —       | Your password                              |
| `audio_addict_europe`                 | `TRUE`  | Prefer the European streaming server       |
| `audio_addict_icy_metadata`           | `TRUE`  | Send live titles to the player             |
| `audio_addict_episodes_per_container` | `20`    | Episodes per group before splitting        |
| `audio_addict_tree_cache_ttl_minutes` | `60`    | How long show and episode lists are reused |
| `audio_addict_playlist_loop`          | `FALSE` | Repeat a curated playlist when it ends     |
