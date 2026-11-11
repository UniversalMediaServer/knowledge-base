# Ako pridať obrázky interpretov

Pri prehliadaní knižnice podľa interpreta môže UMS namiesto všeobecnej ikony priečinka zobrazovať obrázok každého interpreta. Obrázok sa nenačítava zo zvukových súborov, ale z priečinka pomenovaného podľa interpreta.

## Ako UMS nájde obrázok

UMS určíte **jeden** priečinok, ktorého podpriečinky sú pomenované podľa interpretov. Pri danom interpretovi potom UMS vyhľadá podpriečinok s presne rovnakým názvom a použije jeho obrázok.

```
# Priečinok, ktorého podpriečinky sú pomenované podľa interpretov.
audio_artist_dir = /music/Albums
```

Pri knižnici s touto štruktúrou:

```text
/music/Albums/
|-- Frank Sinatra/
|   |-- folder.jpg          <- obrázok zobrazený pre interpreta "Frank Sinatra"
|   `-- Come Fly with Me/
|-- Miles Davis/
|   |-- folder.jpg
|   `-- Kind of Blue/
`-- Zaz/
    `-- Paris/              <- bez folder.jpg, takže Zaz dostane predvolenú ikonu
```

_Frank Sinatra_ a _Miles Davis_ budú mať vlastné obrázky, _Zaz_ nie.

Pre obrázok v priečinku interpreta platia bežné pravidlá, takže súbor sa volá `folder.jpg`, `folder.png`, `folder.webp` a podobne. Úplný zoznam podporovaných formátov nájdete v časti [Ako pridať obrázky](/guides/how-to-add-artwork).

## Dve podmienky

Obrázok interpreta sa zobrazí iba vtedy, keď platia obe podmienky:

1. Podpriečinok v priečinku interpretov sa volá **presne** ako interpret, bez ohľadu na veľkosť písmen.
   _Frank Sinatra_ nájde priečinok `Frank Sinatra` aj `frank sinatra`, ale nie `Sinatra, Frank`. Zhodovať sa musí celý názov priečinka, nie iba jeho časť.
2. Tento priečinok obsahuje vlastný obrázok.

Ak niektorá podmienka nie je splnená, UMS použije predvolenú ikonu. Nejde o chybu. Jednoducho nie je k dispozícii obrázok na zobrazenie.

## Ako zistiť, ktorí interpreti nemajú obrázok

Najrýchlejšia kontrola je priamo v súborovom systéme: vypíšte podpriečinky priečinka interpretov a nájdite tie, ktoré neobsahujú obrázok. V systéme Linux alebo macOS:

```bash
cd /music/Albums
for d in */; do
  find "$d" -maxdepth 1 -iname 'folder.*' | grep -q . || echo "no image: $d"
done
```

Každý vypísaný priečinok patrí interpretovi, pri ktorom sa zobrazí predvolená ikona.

Bežné sú dve príčiny. Buď priečinok ešte nemá obrázok, alebo sa jeho názov nezhoduje s menom interpreta v značkách. Dôvodom môže byť hosťujúci interpret, odlišný pravopis či zápis _Priezvisko, Meno_ na disku, ale opačné poradie v značkách. Druhý prípad sa oplatí skontrolovať skôr, než začnete hľadať obrázok, ktorý už máte.

## Nastavenie priečinka z ovládacieho bodu

Ak to ovládací bod podporuje, môžete v ňom prejsť do priečinka interpretov a vybrať ho pre UMS namiesto úpravy konfiguračného súboru. UMS si cestu uloží, takže sa nastavenie v oboch prípadoch zachová aj po reštarte.
