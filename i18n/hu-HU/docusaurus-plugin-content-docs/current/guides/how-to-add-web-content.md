# Hogyan adjunk hozzá webtartalmat

Ez a cikk elmagyarázza, hogyan adhatunk hozzá webtartalmat.

## Videó feedek

Feliratkozhatsz videó feedekre/csatornákra az RSS feed linkek hozzáadásával, vagy YouTube esetén egyszerűen beírhatod a csatorna linkjét.

### 1: Menj a Megosztott Tartalom szekcióba

Az UMS beállításaiban, a web böngészőben nyisd meg a menüt, és válaszd a Megosztott Tartalom lehetőséget.

### 2: Nyisd meg az "Új megosztott tartalom hozzáadása" modális ablakot

Amikor kiválasztod az "Új megosztott tartalom hozzáadása" gombot, megnyílik egy modális ablak, amely lehetővé teszi bármilyen típusú média hozzáadását. Az első lépés az, hogy válaszd a "Videó feed" típust\
![New shared content options modal](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Add hozzá a feedet

Itt hozzáadhatod a feededet

#### Név

A "Név" mező videó feedeknél le van tiltva, mivel a feedek maguk határozzák meg a nevüket.

#### Útvonal

Az "Útvonal" mező határozza meg a könyvtárstruktúrát, amelyet az UMS megjelenít. Például, ha beírod, hogy `Web/YouTube Csatornák`, a feeded a `YouTube Csatornák` könyvtárban lesz, a `Web` könyvtáron belül. Ez lehetővé teszi, hogy tetszőlegesen rendezd a tartalmadat, és különösen hasznos, ha különböző feed szolgáltatóid vannak, és szeretnéd őket egy helyen használni az UMS-ben.

#### Forrás/URL

Ez a videó feed linkje. Általában `.xml` végződésű, de a YouTube-ot másképp kezeljük, és közvetlenül a csatorna URL-jét fogadjuk el, így például beírhatod a következőt: `https://www.youtube.com/@kurzgesagt`

#### Engedélyezett csoportok

Az "Engedélyezett csoportok" mező lehetővé teszi, hogy ezt a feedet csak bizonyos csoportok számára tedd elérhetővé, amelyek az UMS-ben vannak meghatározva, és amelyek különböző felhasználókhoz és/vagy eszközökhöz vannak hozzárendelve. További részletekért lásd a [Biztonság és Adatvédelem](../configuration/security-and-privacy.md#link-person-to-renderer) szakaszt.

Miután elégedett vagy a megadott beállításokkal, válaszd az "Hozzáadás" gombot.

### Feed sorrend

Ha a feed link érvényes volt, most már látni fogod, hogy a "Név" mező kitöltődött, és most már húzhatod a feedet fel vagy le, hogy meghatározd a sorrendet\
![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Változtatások mentése

Ismételheted az előző lépéseket, hogy további tartalmat adj hozzá vagy szerkessz, és amikor elégedett vagy a módosításokkal, válaszd a "Mentés" gombot az oldal alján. Most már láthatod a tartalmadat az eszközeiden:\
![Example of a video feed on the web player](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)
