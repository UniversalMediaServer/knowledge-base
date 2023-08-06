# Hogyan javíthatom a készülékem támogatását

Ha a készülék nem tud semmit sem csinálni, például nem tud mappákat böngészni vagy nem tud lejátszani egy fájlt, akkor a renderelő konfigurációs fájl beállításainak módosításával lehet, hogy orvosolni tudja a problémát. A különböző eszközök/megjelenítők/kliensek különböző módon kommunikálnak az UMS-hez hasonló szerverekkel, ezért a konfigurációs fájl megmondja az UMS-nek, hogyan beszéljen ugyanazon a nyelven, mint az Ön eszköze.

Van egy alapértelmezett renderelő konfigurációs fájlunk, amely tartalmazza az összes renderelő beállítás dokumentációját. A legfrissebb verzió a https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf oldalon található.

A következő általános beállításokat érdemes megnézni: `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize` és `ChunkedTransfer`.

Ezen kívül megnézheted a többi megjelenítő konfigurációját is a telepítési könyvtárad "renderers" mappájában, hogy lásd, mit csinálnak. Néha segítségre lesz szüksége, amit a fórumunkon tudunk megadni, és kérjük, ne felejtsen el szólni nekünk a javításról, ha elvégezte, hogy más felhasználók is részesülhessenek a javításból. A kiadási közleményünkben és a changelogban meg fogjuk említeni.

Ha van egy új megjelenítőlő konfigurációd, amivel hozzá szeretnél járulni a projekthez, kérjük, hozz létre egy **Pull Request**-et a GitHub tárolónkban https://github.com/UniversalMediaServer/UniversalMediaServer
