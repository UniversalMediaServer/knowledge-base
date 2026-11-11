# Audio Addict-nettiradiot

**Audio Addict** on kokoelma maksullisia nettiradiokanavia, joihin kuuluu:

Classical Radio.com, RadioTunes, RockRadio.com, JazzRadio.com, Zen Radio, ja DI.fm.

**Maksullinen tili** vaaditaan näitä radiokanavia varten Sinun tarvitsee vain rekisteröityä johonkin sivustoista, koska sama käyttäjätunnus ja salasana antavat pääsyn kaikkiin niihin.

UMS lukee automaattisesti kaikki saatavilla olevat Audio Addict radiosivustot, niiden kanavat, ja suodattimet. **Suosikkikanavat** ovat myös tuettu.

## Asetukset

Ota käyttöön AudioAddict-tuki, lisäämällä seuraavat rivit `UMS.conf`-tiedostoon:

```
# TRUE = käytä ensisijaisesti eurooppalaisia palvelimia
audio_addict_europe = TRUE or FALSE

# Käyttäjänimi
audio_addict_user = USERNAME

# Salasana
audio_addict_pass = PASSWORD
```

## Sijainti

Kansio **Audio Addict Radio Network** sijaitsee mediakirjastossa. Sieltä voit selata ja käyttää kaikkia käytettävissä olevia asemia suoraan.

## Sarjat ja jaksot

Live-asemien lisäksi DI.fm verkostossa on **Tapahtumat** -kansio. Se näyttää tulevat ohjelmat, ja mahdollistaa jo esitettyjen ohjelmien nauhoitteet, jotta voit kuunnella ne jälkikäteen.

Ohjelmille, joilla on vanhoja jaksoja saavat jaksoille oman kansion. Joitakin ohjelmia on esitetty jo satoja jaksoja, joten kansio on jaettu pienempiin ryhmiin, jotka ovat merkitty jaksojen numeroilla ja päivämäärillä.

```
# Kuinka monta jaksoa yksi ryhmä sisältää, ennen kuin se jaetaan useampaan kansioon. Oletus 20, vähintään 1.
audio_addict_episodes_per_container = 20
```

Luettelon laatiminen tarkoittaa sitä, että pyydetään palvelulta tapahtumat ja jaksot, joka saataa kestää hetken.
n. UMS muistaa vastauksen, jotta selailu ja soiton aloittamisessa ei ole viivettä:

```
# Kuinka kauan ohjelmien ja jaksojen listaa käytetään uudestaan.
# Oletus 60. Aseta arvoksi 0 niin lista päivitetään joka kerta.
audio_addict_tree_cache_ttl_minutes = 60
```

Pidempi aika tekee selaamisesta nopeampaa, lyhyempi löytää äskettäin julkaistut jaksot aikaisemmin. UMS:n saamat osoitteet pysyvät aktiivisena pidempään kuin oletuksena oleva tunti, joten ei ole tarkoituksenmukaista pitää tätä arvoa pienenä.

## Live-otsikot

Audio Addictin asemat eivät ilmoita nykyistä kappaletta äänen mukana. Sen sijaan, UMS kysyy palvelulta ja näyttää tuloksen soittimessa, joten näet mitä soitetaan. Tämä on kuvattu [Internet radio ja live-otsikot](./internet-radio).

```
# Lähetä live-otsikot Audio Addict-asemille. Vakiona Päällä.
audio_addict_icy_metadata = TRUE
```

## Huolella kootut soittolistat

Huolella kootut soittolistat soittavat kappaleen toisensa jälkeen. Kun soittolista saavuttaa lopun, UMS voi aloittaa alusta pysäyttämisen sijaan:

```
# Aloita soittolista uudelleen, kun se päättyy. Oletuksena pois päältä.
audio_addict_playlist_loop = FALSE
```

## Kaikki asetukset yhdellä silmäyksellä

| Asetus                                | Oletus  | Tarkoitus                                                  |
| ------------------------------------- | ------- | ---------------------------------------------------------- |
| `audio_addict_user`                   | —       | Tilisi nimi                                                |
| `audio_addict_pass`                   | —       | Salasanasi                                                 |
| `audio_addict_europe`                 | `TRUE`  | Suosi Euroopan suoratoistopalvelinta                       |
| `audio_addict_icy_metadata`           | `TRUE`  | Lähetä live-otsikot soittimelle                            |
| `audio_addict_episodes_per_container` | `20`    | Jaksoja per ryhmä ennen ennen jakamista useampaan kansioon |
| `audio_addict_tree_cache_ttl_minutes` | `60`    | Kuinka kauan ohjelma- ja jaksolistaa käytetään uudelleen   |
| `audio_addict_playlist_loop`          | `FALSE` | Toista soittolista uudestaan kun se päättyy                |
