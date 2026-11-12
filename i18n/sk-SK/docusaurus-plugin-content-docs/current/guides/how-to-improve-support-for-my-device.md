# Ako zlepšiť podporu môjho zariadenia

Ak na vašom zariadení nefunguje niektorá činnosť, napríklad prehliadanie priečinkov alebo prehrávanie súboru, možno ju opraviť zmenou nastavení v konfiguračnom súbore prehrávača. Rôzne zariadenia, prehrávače a klienti komunikujú so servermi, ako je UMS, rôznymi spôsobmi. Konfiguračný súbor preto určuje, ako má UMS komunikovať s vaším zariadením.

Každý konfiguračný profil má dva účely:
- Umožniť UMS rozpoznať konkrétny prehrávač pri pokuse o pripojenie
- Určiť možnosti daného prehrávača

Predvolený konfiguračný súbor prehrávača obsahuje dokumentáciu všetkých dostupných nastavení prehrávačov. Najnovšiu verziu nájdete na https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Pridanie podpory nerozpoznaného zariadenia

Ak UMS vaše zariadenie nerozpozná, znamená to, že mu nezodpovedá žiadny konfiguračný profil prehrávača. UMS preto zobrazí `Unknown Renderer`. Keďže nepozná možnosti prehrávača, nemôže pre vaše zariadenie pripraviť optimalizovaný výstup.

Riešením je skúsiť vytvoriť vlastný konfiguračný súbor prehrávača.
1. Vytvorte kópiu súboru .conf, ktorý najviac zodpovedá vášmu zariadeniu. Ak napríklad UMS nerozpozná váš televízor Samsung, vhodným základom môže byť niektorá z konfigurácií televízorov Samsung.

1. V UMS otvorte kartu Protokoly (`Logs`) a vyhľadajte text `Media renderer was not recognized. Possible identifying HTTP headers:`. Tieto informácie sú potrebné na to, aby UMS rozpoznal vaše zariadenie.

1. V novom súbore .conf nájdite riadok s nastavením `UserAgentSearch` alebo `UpnpDetailsSearch`, prípadne oba, a nahraďte ich hodnoty týmito identifikačnými údajmi.

1. Na zariadení prehliadajte a prehrajte niekoľko médií. Poznačte si, pri ktorých médiách sa vyskytol problém s prehrávaním. Potom pokračujte ďalšou časťou a zlepšite podporu svojho zariadenia.

## Zlepšenie podpory zariadenia

1. Ak sa niektoré médiá neprehrávajú správne, konfiguráciu prehrávača treba upravovať, kým prehrávanie nezačne fungovať. Úplný zoznam možností nájdete v súbore [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf). Najčastejšie sa menia tieto nastavenia:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Skontrolujte, že nová konfigurácia neobsahuje `MediaInfo = false`, pretože toto nastavenie vyradí riadky `Supported` z činnosti.

1. Ak chcete overiť, že na zariadení funguje prekódovanie, prehrajte súbor z priečinka `#--TRANSCODE--#`. V tomto priečinku spustite niektorú z položiek `FFmpeg`. Ak sa prehráva, prekódovanie funguje.

1. Riadky `Supported` treba vyplniť tak, aby UMS vedel, ktoré súbory vaše zariadenie podporuje priamo. Pri vypĺňaní týchto riadkov môže pomôcť návod k zariadeniu, ktorý nájdete na internete.

1. Môžete si tiež pozrieť konfigurácie iných prehrávačov v priečinku „renderers“ v inštalačnom adresári a zistiť, ako sú nastavené. Ak budete potrebovať pomoc, poradíme vám na našom fóre. Keď podporu zlepšíte, nezabudnite nám dať vedieť, aby opravu mohli využiť aj ostatní používatelia rovnakého zariadenia. Vaše meno uvedieme v oznámení o vydaní aj v zozname zmien.
