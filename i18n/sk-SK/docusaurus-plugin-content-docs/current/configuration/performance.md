# Výkon

Predvolené hodnoty sú zvolené tak, aby bezpečne fungovali aj na menej výkonnom hardvéri. Na počítači s veľkou knižnicou a dostatkom voľných jadier sa oplatí prehodnotiť niekoľko nastavení. Jedno z nich má väčší vplyv než ostatné.

Meňte vždy iba jednu vec a sledujte výsledok. Každé z týchto nastavení mení využívanie jedného zdroja na úkor druhého. Hodnota, ktorá jednej inštalácii pomôže, môže inej uškodiť.

## Súbežné načítavanie knižnice

Skôr než UMS súbor sprístupní, musí zistiť, o aký súbor ide: načítať metadáta, nájsť obrázky a určiť požiadavky zariadenia, ktoré oň žiada. Táto práca má najväčší vplyv na dĺžku skenovania a rýchlosť otvárania veľkých priečinkov. Vykonáva ju skupina pracovných vlákien.

```
# Koľko súborov UMS spracúva naraz. Predvolene 4, povolený rozsah 1 až 64.
media_resolve_threads = 4
```

Väčšinu času sa čaká na disk, databázu a niekedy na sieť. Preto môže pomôcť aj počet vlákien výrazne vyšší než počet jadier. Na serveri s veľkou knižnicou je rozumná hodnota približne zodpovedajúca počtu jadier alebo vyššia. Na malom počítači alebo tam, kde UMS zdieľa disk s inými aplikáciami, ponechajte predvolenú hodnotu.

Toto nastavenie určuje aj počet databázových pripojení. Ten sa udržiava na dvojnásobku počtu vlákien, najmenej však na desiatich. Je to zámerné: pracovné vlákna potrebujú pripojenia. Ak by sa zvýšil iba počet vlákien bez zodpovedajúceho počtu pripojení, museli by na seba čakať. Keďže sa obe hodnoty menia spoločne, pripojenia netreba nastavovať samostatne.

## Pamäť databázy

Databáza uchováva nedávno použité dátové stránky v pamäti. Dostupné množstvo pamäte sa určuje automaticky, čo je zvyčajne najvhodnejšie:

```
# Vyrovnávacia pamäť databázy v KB. Predvolene -1, pri čom rozhodne UMS.
database_media_cache_size = -1
```

Dve ďalšie nastavenia umožňujú upraviť pomer medzi spotrebou pamäte a rýchlosťou. Obe sú predvolene vypnuté. Ich prínos je vhodné overiť meraním, nie odhadom:

```
# Uchovávať databázové indexy v pamäti.
database_media_use_memory_indexes = FALSE

# Pri nedostatku pamäte ju uvoľniť z vyrovnávacej pamäte namiesto jej zadržiavania.
database_media_use_cache_soft = FALSE
```

Indexy v pamäti zrýchľujú vyhľadávanie, ale zaberajú pamäť, ktorá potom nie je dostupná na iné účely.
Uvoľniteľná vyrovnávacia pamäť predstavuje opačný kompromis: keď systém potrebuje pamäť, uvoľní ju. To pomáha UMS na počítači s nedostatkom pamäte, no neskôr musí príslušné dátové stránky načítať znova.

## Zapisovanie protokolov

UMS predvolene zapisuje každý riadok protokolu ihneď po jeho vzniku. Ukladanie do vyrovnávacej pamäte znižuje náročnosť zápisu:

```
# Pred zápisom zhromažďovať riadky protokolu vo vyrovnávacej pamäti. Predvolene vypnuté.
logging_buffered = FALSE
```

Nevýhoda sa prejaví práve vtedy, keď protokol najviac potrebujete. Ak je UMS násilne ukončený alebo zlyhá, obsah zostávajúci vo vyrovnávacej pamäti sa stratí. Protokol tak môže končiť ešte pred udalosťou, ktorú skúmate, a jeho náhly koniec môže vyzerať ako zamrznutie, ku ktorému nedošlo. Pri hľadaní príčiny problému ponechajte ukladanie protokolu do vyrovnávacej pamäte vypnuté.

## Čo merať

Či zmena pomohla, zistíte z dvoch údajov:

- Ako dlho trvá úplné skenovanie knižnice. Tento údaj nájdete v protokole na riadku, ktorý oznamuje dokončenie skenovania médií a počet potrebných sekúnd.
- Ako dlho trvá otvorenie najväčšieho priečinka v ovládacom bode: raz po reštarte a druhýkrát hneď po prvom otvorení. Prvý čas zahŕňa aj zostavenie obsahu priečinka, druhý už nie. Práve tento rozdiel uvedené nastavenia ovplyvňujú.
