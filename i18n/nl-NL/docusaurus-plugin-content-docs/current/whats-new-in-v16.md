---
sidebar_position: 2
---

# Wat is er nieuw in v16

## Overzicht

De belangrijkste doelstellingen voor v16 waren het voor mensen eenvoudiger te maken om tv-series te blijven kijken en de ondersteuning van internetradio te verbeteren.

Een kort overzicht van de wijzigingen in deze versie is:
- Een map **Doorgaan met kijken** toegevoegd aan de Media Bibliotheek
- Ondersteuning toegevoegd voor **[DI.fm (AudioAddict)](https://www.di.fm/) Gebeurtenissen en afspeellijsten**
- Toegevoegd **[RadioBrowser](https://www.radio-browser.info/)** ondersteuning voor het vinden en toevoegen van radiostations aan afspeellijsten aan server zijde.
- Ondersteuning toegevoegd voor **3 apparaten configuraties**
- Ondersteuning toegevoegd voor **vind-ik-leuk/beoordelen** en **bijwerken van albumhoezen** voor alle mediatypes (zoals video's, afspeellijsten, mappen, etc.) via spelers en mediaspelers (eerder was het alleen beschikbaar voor audio)
- Ondersteuning toegevoegd voor **het bijwerken van spelers** over specifieke bestanden en containers die zijn veranderd
- Toegenomen opstartprestaties met **~95%**, evenals server responsiviteit tijdens het scannen van bestanden
- Verbeterde **server responsiviteit** tijdens het scannen van bestanden
- De codebase gemoderniseerd door **8 belangrijke afhankelijkheidsversies** bij te werken

## Nieuwe functies

### Doorgaan met kijken map

Het toont alle video's die momenteel worden bekeken, evenals de volgende afleveringen van series die inmiddels zijn gestart, gesorteerd op basis van wanneer ze voor het laatst zijn afgespeeld.

De inhoud van de map - en de inhoud van de tv-series mappen daarin - zijn dynamisch.

Als je dus helemaal bij bent met je tv-series, zal de bijbehorende map verdwijnen; zodra er een nieuwe aflevering wordt toegevoegd, verschijnt de map weer.

De eerste aflevering in de map van een tv-serie is de aflevering waar je op dat moment bent; als je halverwege aflevering S01E02 bent, wordt deze getoond, en zodra deze volledig is afgespeeld, zie je S01E03 (mits die bestaat).

![een video die de map 'Doorgaan met kijken' laat zien](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Ondersteuning toegevoegd voor [DI.fm (AudioAddict)](https://www.di.fm/) Gebeurtenissen en afspeellijsten\*\*

Raadpleeg onze documentatie voor [Audio Addict](./configuration/audio-addict), [Internet Radio](./configuration/internet-radio), en bekijk de onderstaande video over het gebruik van [NextCP/2](https://sf666.github.io/nextcp2/) voor meer informatie:

[![een videominiatuur voor DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### RadioBrowser

Toegevoegd [RadioBrowser](https://www.radio-browser.info/) ondersteuning voor het vinden en toevoegen van radiostations aan afspeellijsten aan server zijde. Zoeken ondersteund:
- Zendernaam
- Land
- Taal
- Genre

Bekijk onze [RadioBrowser](./configuration/radiobrowser)-documentatie en de video over het gebruik van [NextCP/2](https://sf666.github.io/nextcp2/) hieronder voor meer informatie:

[![een videominiatuur voor RadioBrowser-ondersteuning](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### 3 Apparaten configuraties

Ondersteuning toegevoegd voor gebruik in 3 apparaten modus, waarbij 3 apparaten betrokken zijn bij het afspelen:
1. De server (UMS)
2. Een besturingselement (vaak een telefoon of browser interface)
3. Een speler/mediaspeler

Zie [Twee- en Drie-Apparaten Setups](./configuration/control-point-setups) voor meer.

### Vind-ik-leuk/beoordelen via spelers

Ondersteuning toegevoegd voor vind-ik-leuk/beoordelen van alle mediatypen (zoals video's, afspeellijsten, mappen, enz.) via spelers en mediaspelers (eerder was het alleen beschikbaar voor audio)

Bekijk de video met behulp van [NextCP/2](https://sf666.github.io/nextcp2/) hieronder voor meer:

[![een videominiatuur over ondersteuning voor vind-ik-leuk en beoordelen ondersteuning](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Albumhoezen bijwerken via spelers

Ondersteuning toegevoegd voor het bijwerken van albumhoezen voor alle mediatypes (zoals video's, afspeellijsten, mappen, etc.) via spelers en mediaspelers (eerder was het alleen beschikbaar voor audio)

Bekijk de video met behulp van [NextCP/2](https://sf666.github.io/nextcp2/) hieronder voor meer:

[![een videominiatuur over het bijwerken van albumhoezen](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Ingrijpende wijzigingen

Wij ondersteunen geen x86- of i586-architecturen (32-bit) meer. Dit betekent dat we de volgende 4 releases niet uitbrengen: Linux ARMel, Linux ARMhf, Linux x86 en Windows x86.

Back-ups die vóór versie 16 zijn gemaakt, werken niet meer vanaf versie 16. Als je de gewoonte hebt om back-ups bij te houden, zorg er dan voor dat je de back-up van versie 15 apart bewaart van die van versie 16, totdat je er zeker van bent dat de automatische migratie is geslaagd.

## Migratie

Er zijn geen specifieke migratiestappen waar u rekening mee hoeft te houden.

Net als bij elke belangrijke update, als u de mogelijkheid wilt hebben om terug te gaan naar uw huidige versie, kunt u voordat u de update uitvoert een back-up maken van uw profielmap. Deze bevat uw configuratie en lokale database. De locatie van die map is te vinden nabij het begin van je programmalogs. Zoek naar `Profiel map: [some page]/UMS`.
