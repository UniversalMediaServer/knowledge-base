# Zapojenia s dvoma a troma zariadeniami

UPnP rozlišuje dva spôsoby usporiadania častí mediálneho systému a UMS sa v každom z nich správa inak.

V zapojení s **dvoma zariadeniami** knižnicu prehliada aj obsah prehráva rovnaké zariadenie: televízor, multimediálny prehrávač alebo aplikácia v telefóne, ktorá zobrazí priečinky a potom sama prehrá skladbu. Zariadenie, ktoré žiada zoznam, je totožné so zariadením, ktoré žiada zvukové dáta.

V zapojení s **troma zariadeniami** sú tieto úlohy oddelené. _Ovládací bod_, napríklad aplikácia v telefóne alebo webové rozhranie, zobrazuje knižnicu a dáva _prehrávaču_ pokyn na prehrávanie. Samotná aplikácia zvukové dáta nespracúva. Iba odkáže prehrávač na ich umiestnenie. Takéto usporiadanie je typické pre hi-fi sieťové prehrávače: vyhradené zariadenie prehráva obsah a vy ho ovládate odinakiaľ.

## Prečo musí UMS tieto zapojenia rozlišovať

UMS rozhoduje, ako doručí skladbu, podľa možností prijímajúceho zariadenia. Prehrávaču, ktorý nedokáže dekódovať FLAC, poskytne prevedený prúd; prehrávaču, ktorý ho podporuje, odošle súbor bez úprav.

V zapojení s dvoma zariadeniami je rozhodovanie jednoduché, pretože zariadenie, ktoré požiadalo o zoznam, bude aj prehrávať.
V zapojení s troma zariadeniami to tak nie je: o zoznam žiada telefón, ale o zvukové dáta žiada sieťový prehrávač. Rozhodovať sa podľa telefónu by bolo nesprávne. Sieťový prehrávač by dostal formát vhodný pre telefón.

## Ako ich UMS rozlišuje

```
# Vyžadovať účty a prihlásenie. Predvolene zapnuté.
authentication_enabled = TRUE
```

Pri **zapnutom** overovaní totožnosti UMS priradí prehrávanie k identite, ktorá prehliadala knižnicu. Používateľ tak môže prehrávať práve ten obsah, ktorý má povolené vidieť. To je správne správanie v domácnosti s viacerými účtami a prístupom riadeným podľa používateľov. Predpokladá však zapojenie s dvoma zariadeniami.

Pri **vypnutom** overovaní totožnosti UMS prestane predpokladať, že obe úlohy plní rovnaké zariadenie. Prehrávajúce zariadenie určí až pri žiadosti o zvukové dáta, a to zo samotnej žiadosti: z jeho adresy a údajov, ktoré o sebe uvádza. O prevode potom rozhodne podľa možností _tohto_ zariadenia. Identitu zo žiadosti o prehliadanie potom správne považuje za identitu ovládacieho bodu.

Aj dve zariadenia s rovnakou adresou dokáže rozlíšiť. Táto situácia nastáva, keď ovládací bod aj prehrávač bežia na tom istom počítači. UMS ich rozlišuje podľa údajov, ktoré o sebe uvádzajú, nie iba podľa adresy.

## Voľba nastavenia

Ani jedna možnosť nie je všeobecne správnejšia. Pre čo najširšiu kompatibilitu overovanie totožnosti **vypnite**. Nevýhodou je, že UMS potom nepoužíva účty: prístup nemožno riadiť podľa používateľov a všetok zdieľaný obsah je viditeľný pre každé zariadenie v sieti, ktoré sa k UMS dokáže pripojiť. Ak vám to nevyhovuje, obmedzte, ktoré zariadenia sa vôbec môžu pripojiť k UMS. Pozrite si časť [Bezpečnosť a súkromie](/configuration/security-and-privacy).

Overovanie ponechajte **zapnuté**, ak vaše prehrávače samy prehliadajú aj prehrávajú obsah alebo ak potrebujete oddeliť prístup jednotlivých používateľov. Toto je predvolené nastavenie.
