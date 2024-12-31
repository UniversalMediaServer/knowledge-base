# Jak zlepšit podporu pro mé zařízení

Pokud vaše zařízení nic neudělá, jako je prohlížení složek nebo přehrávání souboru, může být možné to opravili změnou nastavení v konfiguračním souboru přehrávače. Různá zařízení/přehrávače/klienti různými způsoby komunikují se servery, jako je UMS, takže konfigurační soubor říká UMS jak mluvit stejným jazykem jako vaše zařízení.

Každý konfigurační profil slouží ke dvěma účelům:
- Povolit UMS rozpoznat konkrétní přehrávače, když se pokouší připojit
- Definujte možnosti tohoto přehrávače

Máme výchozí soubor s konfigurací přehrávače, který obsahuje dokumentaci všech našich nastavení.  Viz nejnovější verze na https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRender.conf

## Přidávání podpory pro nerozpoznané zařízení

Pokud UMS nerozpozná vaše zařízení, znamená to, že žádné konfigurační profily neodpovídají vašemu zařízení. Výsledkem je, že UMS zobrazuje `Neznámý přehrávač`, a protože nezná možnosti vašeho přehrávače, nemůže pro něj poskytnout optimalizovaný výstup.

Řešením je zkusit vytvořit vlastní konfigurační soubor pro přehrávač.
1. Vytvořte kopii .conf souboru, který je nejblíže vašemu přehrávači. Například, pokud vaše Samsung TV není rozpoznána, jedna z konfigurací Samsung TV může být dobrým místem pro začátek.

1. Přejděte na záložku `Logs` v UMS a vyhledávejte text `Media renderer was not recognized. Možná identifikace HTTP hlaviček:`. Tyto informace jsou potřebné k tomu, aby UMS rozpoznal váš přehrávač.

1. Ve vašem novém .conf souboru hledejte řádek, který definuje `UserAgentSearch` a/nebo `UpnpDetailsSearch` a nahraďte hodnoty těmito identifikačními informacemi.

1. Procházet a přehrávat některá média na vašem přehrávači. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Improving support for a device

1. If any of your media has a problem playing, the renderer config should be modified until it works. Refer to [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) for the full list of options. The most common ones to change are:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Make sure you do not have `MediaInfo = false` in your new config, because that will stop the `Supported` lines from working.

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Kromě toho se můžete podívat na další konfigurace přehrávačů ve složce "renderers" ve vaší instalační složce, aby jste zjistili co dělají. Někdy budete potřebovat pomoc, kterou Vám můžeme dát na našem fóru, a prosím nezapomeňte nám říci o zlepšení, když jej provedete, aby ostatní uživatelé s vaším zařízením mohli mít z opravy prospěch. Zmíníme Vás v našem oznámení o vydání a v seznamu změn.
