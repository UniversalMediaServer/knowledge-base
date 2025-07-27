# Biztonság és Adatvédelem

## Bevezetés

Az UMS két fő módon szolgáltat médiát: DLNA/UPnP-n keresztül, amelyet média lejátszó alkalmazások fogyaszthatnak, és HTTP(S) segítségével, amelyet web böngészők használnak.

A web böngészők könnyen kezelhetik a biztonságot és az adatvédelmet felhasználói fiókokkal és bejelentkezéssel.

A médialejátszó alkalmazások általában nem támogatják a "felhasználó" fogalmát, ezért általában minden eszköz ugyanazt a tartalmat kapja. Ez nem mindig ideális. Például, ha van két mappa: kids_safe és kids_unsafe, lehet, hogy csak a gyerekszobai eszközökre szeretnéd korlátozni a kids_safe mappa elérését. Egy másik gyakori helyzet, hogy ugyanazon a hálózaton vagy emberekkel, akikkel nem szeretnél megosztani médiát, például lakótársakkal, és szeretnéd blokkolni bizonyos eszközöket.

Az UMS számos módszert kínál az ilyen helyzetek kezelésére.

## Engedélyezés vagy blokkolás alapértelmezés szerint megjelenítők vagy hálózati eszközök számára
Kiválaszthatod az alapértelmezett stratégiát a megjelenítők és hálózati eszközök számára. Az alapértelmezett engedélyezés vagy blokkolás, valamint a tiltólisták és engedélyezési listák segítségével teljes körű irányítást biztosíthatsz.

Ez hasznos lehet közösségi lakásokban vagy nagyobb/kevésbé megbízható helyi hálózatokon. Hasznos lehet azok számára is, akik powerline adaptereket használnak, mivel azok szomszédok általi nem kívánt hozzáférést eredményezhetnek.

![Példa arra, hogyan állítható be a hálózati engedélyezési preferencia](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Példa arra, hogyan állítható be a megjelenítő engedélyezési preferencia](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Megjelenítők és hálózati eszközök blokkolása/engedélyezése

Miután kiválasztottad, hogy alapértelmezés szerint engedélyezed vagy blokkolod-e az ismeretlen megjelenítőket, a kezdőképernyőről a beállítási területen építheted fel a tiltólistát vagy engedélyezési listát.

![Példa arra, hogyan lehet egy megjelenítőt blokkolni](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Felhasználó összekapcsolása megjelenítővel

Összekapcsolhatod a felhasználói fiókokat a megjelenítőkkel/eszkozökkel, lehetővé téve, hogy független hozzáférést és lejátszáskövetést biztosíts.

Például, ha van egy TV a nappaliban és egy a hálószobádban, a nappali TV-t nem kell, hogy befolyásolja az, amit a hálószobádban nézel.

![Példa arra, hogyan rendelhető fiók egy megjelenítőhöz](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Korlátozott megosztott tartalom bizonyos csoportok számára

Most már lehetőséged van kiválasztani, hogy milyen könyvtárakat vagy online tartalmakat szeretnél megosztani bizonyos csoportokkal. Például, ha van egy személy (vagy egy eszköz, amely egy személyhez van rendelve), aki gyermek, hozzárendelheted őt a "Kids" csoporthoz, és megadhatod ennek a csoportnak a "Family" könyvtár elérését, de nem az "Horror" vagy "Adult Only" tartalmakat. Vagy engedélyezheted számukra a Kurzgesagt web feed elérését, de nem a történelem podcastokat.

![Példa a megosztott tartalom csoportokra](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Mappák elrejtése

Szabályozhatod a virtuális mappák láthatóságát. Ezeket a beállításokat az UMS.conf fájlban találod. Ha el szeretnéd rejteni egyes mappákat böngészés közben, egyszerűen állítsd az értéküket true-ra, vagy pipáld ki őket a Navigáció/Megosztás Beállítás fülön az Speciális GUI mode-ban.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

A Web mappa elrejtéséhez ki kell venni a pipát az Külső hálózat engedélyezése opciónál az Általános Beállítások fülön a Speciális GUI mode-ban, vagy módosítani kell az external_network = értékét false-ra az UMS.conf fájlban. Ez azt is eredményezi, hogy az automatikus frissítő nem fog működni. A GUI-ból végrehajtott módosítások újraindítás után lépnek érvénybe.

## PIN kód

Az összes fent említett módszer korlátozza a hozzáférést különböző megjelenítőktől. Azonban, ha hozzáférsz egy megjelenítőhöz, amelyen engedélyezett egy mappa megtekintése, akkor ezek a módszerek nem segítenek (ha a gyerekek hozzáférnek a nappali TV-hez, amely hozzáfér az összes médiához, akkor hozzáférnek azokhoz a tartalmakhoz). A PIN kód megoldja ezt a problémát. Lehetővé teszi, hogy mappákat/mediákat rejts el egy PIN kód mögé, amit a megjelenítőről kell megadnod. Alapértelmezés szerint a bemenet egy számjegysorozat (0-9), mint egy ATM kód. Erősen javaslom, hogy számjegyekből álló kódokat használj, mivel a karakterek gépelése nehezebb a megjelenítőből. Azonban, ha extra paranoiás vagy, hozzáadhatsz betűket is. Így működik: Hozz létre egy fájlt UMS.code néven ugyanabba a könyvtárba, ahol az UMS.conf található, és ebbe a fájlba írd be a következőt: regexp,code, ahol a regexp egy reguláris kifejezés, mint a "UMS.deny" fájlban, a code pedig az a kód, amely hozzáférést biztosít a mappához/mediához. A kód hosszára nincs korlátozás. Például:
```
.*titkos.*,1234
```

Ez arra kényszerít, hogy PIN kódot adj meg, ha a mappa/media tartalmazza a "titkos" szót, és a helyes kód a 1234. A kód 4 órán keresztül érvényes (ha nem változtatod meg ezt az időt).

## Egyedi Eszköz Konfiguráció

Bármely konfigurációs tulajdonságot eszközönként is beállíthatsz egy egyedi eszközkénti konfiguráció létrehozásával, amely felülírja az alapértelmezett UMS beállításokat (további részletekért lásd: Egyedi Eszköz Konfiguráció Létrehozása).

Például, ha testre szeretnéd szabni a gyerekek TV-jét:
- Kattints a 'Customize this device' gombra a megjelenítő GUI felugró paneljén, és adj nevet a konfigurációnak.
- Az új konfigurációs fájlban add hozzá azokat a beállításokat, amelyeket felül szeretnél írni a TV-nél, például a szerver nevének megváltoztatása és más mappák megadása:
```
#----------------------------------------------------------------------------
# Egyedi eszközprofil
# A lehetséges megjelenítő opciók leírását a DefaultRenderer.conf fájlban találod,
# és a program opciókat az UMS.conf fájlban.

# Az ebben a fájlban szereplő beállítások felülírják az alapértelmezett beállításokat
# az alább felsorolt specifikus Sony Bravia EX eszközök számára.
# Az eszközöket uuid (vagy cím, ha nincs uuid) alapján kell megadni,
# több eszközt pedig vesszővel elválasztva.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Gyerekeknek
folders = c:\gyerekek\mese, c:\gyerekek\mas_mappa
```
