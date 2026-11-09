# Audio Addict Network Radio

A Audio Addict Network é uma coleção de estações de rádio premium na Internet, incluindo:

Rádio Clássica, Rádio Tunes, Rádio Rock, Rádio Jazz, Rádio Zen e DI.fm.

É necessário uma **conta premium**  para acessar essas estações de rádio. Você só precisa se registrar em um dos sites, pois o mesmo nome de usuário e senha concederão acesso a todos eles.

O MS lê automaticamente todos os sites de rádio AudioAddict disponíveis, seus canais e filtros O canal **Favoritos** também é suportado.

## Configuração

Para habilitar o suporte ao AudioAddict, adicione as seguintes linhas ao seu arquivo "UMS.conf":

```
# TRUE = preferir servidor de streaming
audio_addict_europe = TRUE ou FALSE

# Seu nome de usuário
audio_addict_user = USERNAME

# Sua senha
audio_addict_pass = PASSWORD
```

## Localização

A pasta **Audio Addict Radio Network** está localizada em sua biblioteca de mídia. A partir daí, você pode procurar e acessar diretamente todas as estações disponíveis.

## Shows and episodes

Besides the live stations, DI.fm network offers an **Events** folder. It lists the upcoming shows, and
for a show that has already been broadcast it also offers the recording, so you can listen to it
afterwards.

Shows with a back catalogue get a folder of their own holding the older episodes. Some shows have
hundreds of them, so the folder is split into smaller groups, each labelled with the episode numbers
and dates it contains.

```
# How many episodes one group holds before it is split. Default 20, minimum 1.
audio_addict_episodes_per_container = 20
```

Building this list means asking the service for the events and for each show's episodes, which takes
a moment. UMS remembers the answer so that browsing and starting playback do not each pay for it
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
