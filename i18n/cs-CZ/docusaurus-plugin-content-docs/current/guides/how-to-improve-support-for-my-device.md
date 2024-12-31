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

1. Procházet a přehrávat některá média na vašem přehrávači. Udělejte si poznámku, která média měla problém při přehrávání. Nyní můžete přejít do další sekce pro zlepšení podpory pro váš přehrávač.

## Zlepšení podpory pro přehrávač

1. Pokud má některé z vašich médií problém s přehráváním, konfigurace přehrávače by měla být upravena, dokud to nefunguje. Úplný seznam možností naleznete v [DefaultRender.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf). Nejběžnější ke změně jsou:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Ujistěte se, že v nové konfiguraci nemáte `MediaInfo = false` , protože to zabrání tomu, aby řádky `Supported` fungovaly.

1. Abyste se ujistili, že transkódování funguje na vašem zařízení, přehrajte si soubor ze složky `#--TRANSCODE--#`. V této složce přehrajte jednu z `FFmpeg` položek. Překódování funguje, pokud hraje.

1. `Supported` řádky musí být vyplněny, aby bylo jasné, které soubory váš přehrávač běžně podporuje. Může být dobrý nápad najít příručku pro váš přehrávač online a použít ji k naplnění těchto řádků.

1. Kromě toho se můžete podívat na další konfigurace přehrávačů ve složce "renderers" ve vaší instalační složce, aby jste zjistili co dělají. Někdy budete potřebovat pomoc, kterou Vám můžeme dát na našem fóru, a prosím nezapomeňte nám říci o zlepšení, když jej provedete, aby ostatní uživatelé s vaším zařízením mohli mít z opravy prospěch. Zmíníme Vás v našem oznámení o vydání a v seznamu změn.
