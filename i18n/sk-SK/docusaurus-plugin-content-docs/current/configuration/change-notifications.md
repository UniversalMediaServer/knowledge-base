# Oznámenia o zmenách

Keď sa vo vašej knižnici niečo zmení, pripojené aplikácie by sa o tom mali dozvedieť bez ručného obnovenia a bez toho, aby sa každých pár sekúnd pýtali UMS, či nastala zmena. UPnP to rieši odberom udalostí: aplikácia sa raz prihlási na odber a UMS jej oznámi novinky.

Funguje to v oboch smeroch, pričom každý smer sa ovláda samostatne.

## Čo UMS oznamuje o vašej knižnici

Pri každej zmene knižnice UMS zverejní dve informácie:

- **počítadlo**, ktoré sa pri každej zmene zvýši a odberateľovi oznámi, že sa niečo stalo
- **zoznam zmenených kontajnerov**, ktorý oznámi, čo sa zmenilo

Druhá informácia zabezpečuje rýchlu odozvu. Aplikácia, ktorá sa dozvie iba „niečo sa zmenilo“, musí obsah načítať znova. Ak sa dozvie „zmenil sa tento priečinok“, načíta znova iba tento priečinok a zvyšok ponechá bez zmeny.

Obe informácie sa oznamujú najviac niekoľkokrát za sekundu. Skenovanie, ktoré naimportuje tisíc súborov, preto nevytvorí tisíc oznámení. Zmeny sa zhromaždia a oznámia v niekoľkých správach.

Typické situácie, keď sa to deje:

- v zdieľanom priečinku sa objaví súbor alebo z neho zmizne
- z ovládacieho bodu [upravíte zoznam skladieb](./playlist-editing)
- niečo ohodnotíte, čím sa zmení obsah priečinkov s hodnoteniami
- k stanici alebo priečinku sa pridá obrázok

To, či aplikácia na oznámenie zareaguje, závisí od nej. Väčšina aplikácií obnoví práve zobrazený obsah. Niektoré túto informáciu využijú až pri opätovnom otvorení priečinka. Ak sa zmena nezobrazí, skúste najprv priečinok znova otvoriť, až potom predpokladajte, že oznámenie nebolo doručené.

## Aké udalosti UMS odoberá z prehrávačov

V opačnom smere UMS odoberá udalosti z vašich **prehrávačov**, aby mohol zobrazovať ich stav: čo prehrávajú, či sú pozastavené a akú majú hlasitosť. Zároveň ich môže ovládať.

```
# Sledovať prehrávače v sieti. Predvolene zapnuté.
upnp_subscribe_services = TRUE
```

Ak prehrávanie ovládate z UMS, ponechajte toto nastavenie zapnuté.

Ak prehrávanie riadi samostatný ovládací bod, vypnite ho. V takomto zapojení UMS nemá prehrávače sledovať ani sa pokúšať o ich ovládanie. Túto úlohu má ovládací bod a dva súčasné zdroje ovládania toho istého zariadenia môžu viesť k nepredvídateľnému správaniu. Po vypnutí tohto nastavenia UMS ponechá ovládanie prehrávačov na ostatných a bude iba poskytovať médiá.

Takéto zapojenie opisuje časť [Zapojenia s dvoma a troma zariadeniami](./control-point-setups).
