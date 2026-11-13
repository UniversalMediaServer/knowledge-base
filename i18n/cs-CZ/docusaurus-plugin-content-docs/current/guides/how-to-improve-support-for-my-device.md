# Jak zlepšit podporu pro mé zařízení

Pokud na vašem zařízení něco nefunguje, například procházení složek nebo přehrávání souboru, může pomoci změna nastavení v konfiguračním souboru přehrávače. Různá zařízení, přehrávače a klienti komunikují se servery, jako je UMS, různými způsoby. Konfigurační soubor proto říká UMS, jak komunikovat s vaším zařízením.

Každý konfigurační profil slouží ke dvěma účelům:
- Umožnit UMS rozpoznat konkrétní přehrávač, když se pokusí připojit
- Popsat schopnosti tohoto přehrávače

Výchozí konfigurační soubor přehrávače obsahuje dokumentaci všech dostupných nastavení přehrávačů. Nejnovější verzi najdete na https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Přidávání podpory pro nerozpoznané zařízení

Pokud UMS nerozpozná vaše zařízení, znamená to, že žádné konfigurační profily neodpovídají vašemu zařízení. Výsledkem je, že UMS zobrazuje `Neznámý přehrávač`, a protože nezná možnosti vašeho přehrávače, nemůže pro něj poskytnout optimalizovaný výstup.

Řešením je zkusit vytvořit vlastní konfigurační soubor pro přehrávač.
1. Vytvořte kopii souboru .conf pro zařízení, které se nejvíce podobá tomu vašemu. Pokud například UMS nerozpozná váš televizor Samsung, můžete vyjít z některé existující konfigurace televizoru Samsung.

1. Přejděte v UMS na kartu `Protokoly` a vyhledejte text `Media renderer was not recognized. Possible identifying HTTP headers:`. Tyto informace jsou potřebné k tomu, aby UMS rozpoznal váš přehrávač.

1. Ve vašem novém .conf souboru hledejte řádek, který definuje `UserAgentSearch` a/nebo `UpnpDetailsSearch` a nahraďte hodnoty těmito identifikačními informacemi.

1. Na svém zařízení projděte nabídku médií a zkuste některá přehrát. Poznamenejte si, u kterých médií nastal problém s přehráváním. Nyní můžete přejít do další sekce pro zlepšení podpory pro váš přehrávač.

## Zlepšení podpory pro přehrávač

1. Pokud se některá média nepřehrávají správně, upravujte konfiguraci přehrávače, dokud přehrávání nezačne fungovat. Úplný seznam možností najdete v souboru [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf). Nejčastěji se mění tyto možnosti:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Ujistěte se, že v nové konfiguraci nemáte `MediaInfo = false`, protože tím by řádky `Supported` přestaly fungovat.

1. Funkčnost překódování na svém zařízení ověříte přehráním souboru ze složky `#--TRANSCODE--#`. V této složce přehrajte jednu z položek `FFmpeg`. Pokud se přehrává, překódování funguje.

1. Řádky `Supported` je potřeba vyplnit tak, aby UMS věděl, které soubory vaše zařízení podporuje přímo, bez překódování. S vyplněním těchto řádků může pomoci návod k zařízení dostupný na internetu.

1. Můžete se také podívat do ostatních konfigurací přehrávačů ve složce „renderers“ v instalačním adresáři a zjistit, jak jsou nastavené. Pokud potřebujete pomoc, obraťte se na naše fórum. O provedeném vylepšení nám prosím dejte vědět, aby z něj mohli mít prospěch i ostatní uživatelé stejného zařízení. Uvedeme vaše jméno v oznámení o vydání a v seznamu změn.
