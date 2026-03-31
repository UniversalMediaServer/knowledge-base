# Veiligheid en Privacy

## Introductie

UMS behandelt media op twee manieren - via DLNA/UPnP dat moet worden benaderd via mediaspeler apps, en via HTTP(S) om te worden benaderd via internetbrowsers.

Internetbrowsers hebben eenvoudige beveiliging en privacy controle door ingelogde gebruikersaccounts.

Mediaspeler apps ondersteunen over het algemeen het concept van een "gebruiker" niet, dus meestal krijgt elk apparaat dezelfde inhoud. Dit is misschien niet wat je wilt. Als je bijvoorbeeld twee mappen hebt, 'kindveilig' en 'kindonveilig', dan wil je waarschijnlijk dat afspeelapparaten in de kinderkamer alleen toegang hebben tot de map 'kindveilig'. Een andere algemene situatie is dat je op hetzelfde netwerk zit als mensen die je geen toegang wilt geven tot je media, bijvoorbeeld huisgenoten, dan kan je bepaalde spelers volledig blokkeren.

UMS biedt een aantal methoden om de toegang in die situaties te beheren.

## Renderers of netwerkapparaten standaard toestaan ​​of blokkeren
U kunt de standaardstrategie kiezen voor spelers en netwerkapparaten. Standaard kan je toestaan of weigeren met weigerings- en toelatingslijsten voor volledige controle

Dit is handig voor situaties waarin mensen samenwonen of bij grote lokale netwerken waar weinig vertrouwen heerst. Het is ook handig voor diegenen die powerline-adapters voor uw netwerk gebruiken, omdat dat kan leiden tot ongewenste toegang van buren.

![Voorbeeld van netwerk toestaan permissie toestaan instellen](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Voorbeeld van hoe je de renderer toestaan permissie kunt instellen](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Renderers en netwerkapparaten blokkeren/toestaan

Wanneer je hebt gekozen om niet-herkende spelers standaard toe te staan of te blokkeren, dan kan je de weigerings- of toelatingslijst maken vanaf het startscherm in de instellingen gedeelte.

![Voorbeeld van hoe je een speler moet blokkeren](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link naar renderer

Je kunt gebruikersaccounts koppelen aan renderers/apparaten, zodat je onafhankelijke inhoudstoegang en afspeeltracking hebt.

Als je bijvoorbeeld een tv in de woonkamer hebt en een andere in je slaapkamer, de woonkamer TV hoeft niet beïnvloed te worden door wat je in je slaapkamer bekijkt.

![Voorbeeld van hoe een account aan een speler toegewezen moet worden](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Gedeelde inhoud beperken tot bepaalde groepen

Je kunt nu kiezen om mappen of online-inhoud te delen met bepaalde groepen. Bijvoorbeeld, als u een persoon (of een apparaat dat is toegewezen aan een persoon) hebt die een kind is, dan kan je deze toewijzen aan de "Kinderen" groep, en geef die groep toegang tot de map "Familie", maar niet tot de inhoud "Horror" of "Alleen voor volwassenen". Of geef hun toegang tot de Kurzgesagt webfeed, maar niet tot de podcasts.

![Voorbeeld van gedeelde inhoud groepen](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Mappen verbergen

Beheer de zichtbaarheid van de virtuele mappen. Deze instellingen zijn te vinden in UMS.conf bestand. Om sommige mappen tijdens het browsen te verbergen, stel je de waarde in op true of vink je deze aan in het Navigatie/Deel-tabblad vanuit de geavanceerde GUI-modus.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Om de webmap te verbergen moet je het externe netwerk in het tabblad Algemene Configuratie uitvinken uit de geavanceerde GUI-modus of de waarde 'external_network =' veranderen naar false in je UMS.conf bestand. Dit zal het zijeffect hebben dat de automatische update niet zal werken. De wijzigingen die gemaakt zijn van de GUI zijn van toepassing na een herstart.

## Pincode

Alle bovenstaande methoden beperken de toegang van verschillende spelers. Maar als je toegang hebt tot een render die toestemming heeft om een map te zien, helpen die methodes je niet (als de kinderen toegang hebben tot de tv van de woonkamer die toegang hebben tot alle media dan hebben ze toegang tot die media). De pincode lost dit probleem op. Het stelt je in staat mappen/media achter een pincode te verbergen die je moet invoeren vanaf de speler. Standaard is de invoer een reeks cijfers (0-9) net als een pincode van een bankpas. Ik stel sterk voor dat u cijfers gebaseerde codes gebruikt, omdat het moeilijk wordt om in te typen vanaf speler. Maar als je extra paranoïde bent, kun je letters gebruiken. Het werkt als volgt: Voeg een bestand met de naam UMS.code toe aan dezelfde map als uw UMS.conf, en aan dat bestand voeg regexp,code toe, waarbij regexp een gebruikelijke expressie is, net als in "UMS. deny" bestand en code is de code die toegang geeft tot de map/media. Er is geen lengte beperking op de code. Bijvoorbeeld:
```
.*privé*,1234
```

Zul je dwingen om een code in te voeren als de map/media het woord "privé" bevat en de juiste code is 1234. De code blijft dan 4 uur geldig (als je die tijd niet verandert).

## Aangepaste apparaatconfiguratie

Elke configuratie eigenschap kan ook per apparaat worden ingesteld door het maken van een aangepaste apparaat configuratie om de standaard UMS instellingen te overschrijven (voor alle details zie het maken van een aangepast apparaat configuratie).

Bijvoorbeeld, om de kinderen tv aan te passen:
- Klik op de knop 'Dit apparaat aanpassen' in de rechterbovenkant van het speler's GUI pop-up paneel en geef een naam op voor de configuratie.
- In het nieuwe conf bestand dat opent voeg je alle instellingen toe die je wilt overschrijven voor de TV, om de servernaam te wijzigen en verschillende mappen op te geven:
```
#--------------------------------------------------------------------------
# Aangepast apparaat profiel
# Zie DefaultRenderer.conf voor beschrijvingen van alle mogelijke renderer opties
# en UMS.conf voor programma opties.

# Opties in dit bestand overschrijven de standaardinstellingen voor specifieke Sony Bravia EX apparaten hieronder vermeld.
# Apparaten opgeven door uid (of adres als niet uuid), gescheiden door komma's als meer dan één.

apparaat = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
mappen = c:\kids\stuff, c:\kids\otherff spullen
```
