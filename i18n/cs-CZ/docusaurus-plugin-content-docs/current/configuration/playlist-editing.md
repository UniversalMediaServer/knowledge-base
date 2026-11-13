# Úpravy seznamů skladeb z řídicího bodu

Seznamy skladeb jsou běžné soubory `.m3u8`, které můžete kdykoli upravit v textovém editoru. UMS také umožňuje, aby je za vás upravoval řídicí bod: můžete vytvořit seznam skladeb, přidat právě poslouchanou skladbu, odebrat nechtěnou položku nebo celý seznam přejmenovat či smazat — bez ručních úprav souboru.

Tato funkce je ve výchozím nastavení **vypnutá**. Zápis do seznamu skladeb znamená zápis na váš disk, a proto jej musíte výslovně povolit.

```
# Povolit řídicím bodům vytvářet, měnit a mazat objekty. Ve výchozím nastavení vypnuto.
upnp_cds_write = TRUE
```

## Jaké možnosti se zpřístupní

Po zapnutí nastavení může řídicí bod, který tuto funkci podporuje,

- vytvořit nový seznam skladeb,
- přidat do seznamu položku, včetně té, kterou právě přehrává,
- odebrat položku ze seznamu skladeb,
- přejmenovat nebo smazat seznam skladeb.

Zda uvidíte tlačítka pro všechny tyto operace, záleží na řídicím bodu. UMS tyto operace pouze zpřístupňuje; nic se neprovede, dokud o to někdo nepožádá.

UMS zapisuje obyčejné soubory seznamů skladeb do sdílených složek, nikoli záznamy v databázi, kterým rozumí jen UMS. Poté je můžete otevřít v libovolném editoru, zkopírovat do jiného přehrávače nebo zálohovat. Další údaje, které samotná položka seznamu skladeb nedokáže vyjádřit, například obrázek rozhlasové stanice, se ukládají jako [direktivy](./playlist-directives) do stejného souboru.

Změny se oznamují připojeným řídicím bodům, takže seznam upravený na jednom zařízení zobrazí nový obsah i na ostatních bez ručního obnovení.

## Nahrávání souborů

Druhé nastavení řídí odlišnou možnost s podstatně větším dopadem: zda zařízení smí poslat UMS **obsah souboru** a nechat jej zapsat na disk.

```
# Povolit neidentifikovaným zařízením zapisovat soubory na disk. Ve výchozím nastavení vypnuto.
anonymous_devices_write = TRUE
```

Pokud pro zapnutí nemáte konkrétní důvod, ponechte toto nastavení vypnuté. Umožňuje zařízení ve vaší síti, které UMS nedokáže přiřadit ke známému uživateli, vytvářet, nahrazovat a mazat mediální soubory ve sdílených složkách.
Tím poskytujete značnou důvěru jakémukoli zařízení, které se právě nachází v síti. Proto je toto nastavení oddělené od úprav seznamů skladeb.

## Obě nastavení lze měnit na dálku

Řídicí bod může oba přepínače sám číst i nastavovat, stejně jako čte ostatní nastavení UMS. Je to pohodlné — úpravy seznamů skladeb můžete zapnout přímo z aplikace, kterou právě používáte. Hodnota v konfiguračním souboru ale není konečná: může ji změnit cokoli, co má ve vaší síti přístup ke službě UPnP.

Pokud je to pro vás důležité, omezte, která zařízení se smějí k UMS vůbec připojit. Viz [Zabezpečení a soukromí](/configuration/security-and-privacy).
