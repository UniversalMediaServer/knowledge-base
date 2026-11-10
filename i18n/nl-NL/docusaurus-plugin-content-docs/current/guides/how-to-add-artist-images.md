# Hoe je afbeeldingen van artiesten toevoegt

Wanneer je door je bibliotheek bladert op artiest, kan UMS voor elke artiest een afbeelding weergeven in plaats van een algemeen mapicoon. De afbeelding is niet afkomstig uit de audiobestanden; deze komt uit de map met de naam van de artiest.

## Hoe UMS de afbeelding vindt

Je geeft UMS **één** map op: de map waarvan de submappen zijn vernoemd naar je artiesten. Voor een artiest
zoekt UMS vervolgens naar een submap met precies die naam en gebruikt het illustratiemateriaal uit die map.

```
# De map waarvan de submappen zijn vernoemd naar de artiesten.
audio_artiest_dir = /muziek/Albums
```

Dus met een bibliotheek zoals deze:

```text
/muziek/Albums/
|-- Frank Sinatra/
|   |-- map.jpg          <- de foto die wordt weergegeven voor "Frank Sinatra"
|   `-- Come Fly with Me/
|-- Miles Davis/
|   |-- map.jpg
|   `-- Kind of Blue/
`-- Zaz/
    `-- Paris/              <- geen map.jpg, dus Zaz krijgt het standaardpictogram
```

_Frank Sinatra_ en _Miles Davis_ krijgen hun foto's, _Zaz_ niet.

Het illustratiemateriaal in de artiestenmap volgt de gebruikelijke regels; het bestand heet dus `map.jpg`, `map.png`, `map.webp`, enzovoort. Zie [Hoe voeg je illustratiemateriaal toe](/guides/how-to-add-artwork) voor de volledige
lijst met ondersteunde formaten.

## Twee voorwaarden

Een artiestenafbeelding verschijnt alleen wanneer aan beide voorwaarden is voldaan:

1. Een submap van de artiestenmap heeft **exact** dezelfde naam als de artiest, waarbij geen onderscheid wordt gemaakt tussen hoofdletters en kleine letters.
   _Frank Sinatra_ vindt de map `Frank Sinatra` en ook `frank sinatra`, maar niet
   `Sinatra, Frank`. De naam moet overeenkomen met de volledige mapnaam, niet met een deel ervan.
2. Die map bevat eigen illustratiemateriaal.

Als een van beide ontbreekt, valt UMS terug op het standaardpictogram. Er is niets kapot — er is simpelweg geen
afbeelding om te tonen.

## Uitzoeken welke artiesten er geen hebben

De snelste controle vindt plaats in het bestandssysteem: bekijk de submappen in je artiestenmap en zoek naar mappen waarin geen afbeeldingsbestand aanwezig is. Op Linux of macOS

```bash
cd /muziek/Albums
for d in */; do
  find "$d" -maxdepth 1 -iname 'folder.*' | grep -q . || echo "no image: $d"
done
```

Bij alles wat wordt afgedrukt, wordt het standaardpictogram getoond.

Twee oorzaken komen vaak voor. Of de map bevat daadwerkelijk nog geen afbeelding, of de mapnaam en de artiestennaam in de tags komen niet meer met elkaar overeen — denk aan een gastartiest, een andere schrijfwijze, of een naam die op de schijf als _Achternaam, Voornaam_ staat genoteerd, terwijl deze in de tags in de omgekeerde volgorde is weergegeven. Het is de moeite waard om het tweede geval te controleren voordat je op zoek gaat naar een afbeelding die er al is.

## De map instellen vanaf uw besturingselement

Als je besturingselement dit ondersteunt, kun je UMS naar de artiestenmap laten verwijzen door naar deze map te bladeren en deze te selecteren; je hoeft dan niet het configuratiebestand te bewerken. UMS slaat het pad zelf op, waardoor de
instelling in beide gevallen een herstart overleeft.
