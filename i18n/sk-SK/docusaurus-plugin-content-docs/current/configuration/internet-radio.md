# Internetové rádio a názvy práve prehrávaných skladieb

Internetová rozhlasová stanica neposiela iba zvuk, ale aj informáciu o skladbe, ktorú práve prehráva. UMS túto informáciu prijme a odovzdá ďalej, takže ovládací bod môže namiesto samotného názvu stanice zobraziť, čo sa práve vysiela.

Funguje to pri rozhlasových prúdoch pridaných do zoznamu skladieb aj pri staniciach siete [Audio Addict Network](./audio-addict).

## Ako sa názov dostane do prehrávača

Názov možno preniesť dvoma spôsobmi a UMS použije ten vhodný:

- Prehrávače, ktoré si vyžiadajú metadáta vložené do prúdu, dostanú názov priamo vo zvukovom prúde, ako je pri internetovom rádiu bežné.
- Ak si ich prehrávač nevyžiada, UMS prečíta oznámenie sám a samostatne ho odošle ovládaciemu bodu. Názov aktuálnej skladby sa tak zobrazí aj pri prehrávačoch, ktoré metadáta internetového rádia nepodporujú.

Jeden prípad názvy v prúde nepodporuje: ak UMS musí prúd pre váš prehrávač **prekódovať**, názov doň nemožno vložiť. Zvuk totiž vytvára nástroj na prekódovanie, ktorý o oznámeniach stanice nevie. Prúdov prehrávaných priamo, čo je bežné pri staniciach vo formátoch MP3 a AAC, sa to netýka.

## Vyhodnotenie oznámenia

Stanice posielajú jeden riadok textu a neexistuje pravidlo, ktoré by určovalo, ktorá časť označuje interpreta.
Bežne sa používa zápis:

```text
Miles Davis - So What
```

Niektoré stanice však namiesto toho uvádzajú na konci svoj názov:

```text
So What - Jazz Radio on example.com
```

Pri predpoklade „interpret ako prvý“ by sa v druhom príklade za interpreta považovalo _So What_. UMS preto preskúma časť za poslednou pomlčkou. Považuje ju za názov stanice, nie interpreta, ak platí niektorá z týchto podmienok:

- obsahuje text pripomínajúci webovú adresu, napríklad `example.com`
- podobá sa názvu stanice, ktorý UMS už pozná zo zoznamu skladieb
- podobá sa názvu hostiteľa v adrese prúdu, pričom sa ignorujú všeobecné časti ako `stream`, `listen` alebo `radio`

Ak neplatí žiadna z týchto podmienok, prvá časť sa podľa bežného zvyku považuje za interpreta.

## Ručná oprava pre konkrétnu stanicu

Tieto pravidlá fungujú pri väčšine staníc, no stanica môže používať iný formát: názov relácie na konci, nezvyčajný oddeľovač alebo interpreta, ktorého meno náhodou obsahuje doménu. V takých prípadoch určite poradie výslovne pomocou riadka `#EXTICYORDER:` v zozname skladieb, priamo nad adresou prúdu:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTICYORDER:title-first
http://stream.example.com/jazz.mp3
```

| Hodnota        | Význam                                                                              |
| -------------- | ----------------------------------------------------------------------------------- |
| `auto`         | Rozhodnúť automaticky podľa pravidiel uvedených vyššie. Toto je predvolená hodnota. |
| `artist-first` | Oznámenie vždy čítať ako _Interpret - Názov skladby_.                               |
| `title-first`  | Vždy ho čítať ako _Názov skladby - Stanica_.                                        |

Neznáma hodnota sa vyhodnotí ako `auto`. Nastavenie platí iba pre danú stanicu. Všeobecné fungovanie týchto riadkov opisuje časť [Direktívy zoznamov skladieb](./playlist-directives).

Ak váš ovládací bod umožňuje počas počúvania zmeniť poradie, môže túto hodnotu nastaviť prostredníctvom UMS. UMS ju zapíše do súboru zoznamu skladieb, takže sa zachová aj po reštarte.

## Stanice Audio Addict

Stanice siete Audio Addict Network neposielajú názvy skladieb v samotnom prúde. UMS si namiesto toho vyžiada aktuálnu skladbu od služby a odovzdá ju rovnakým spôsobom, takže navonok je správanie rovnaké.

```
# Posielať názvy práve prehrávaných skladieb staníc Audio Addict. Predvolene zapnuté.
audio_addict_icy_metadata = TRUE
```

Ak niektorý váš prehrávač nefunguje správne s metadátami vloženými do prúdu, vypnite toto nastavenie. Názvy odosielané samostatne ovládaciemu bodu to neovplyvní.
