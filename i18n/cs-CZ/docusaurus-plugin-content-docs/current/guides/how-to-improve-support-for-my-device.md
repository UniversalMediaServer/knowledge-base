# Jak zlepšit podporu pro mé zařízení

Pokud vaše zařízení nic neudělá, jako je prohlížení složek nebo přehrávání souboru, může být možné to opravili změnou nastavení v konfiguračním souboru přehrávače. Různá zařízení/přehrávače/klienti různými způsoby komunikují se servery, jako je UMS, takže konfigurační soubor říká UMS jak mluvit stejným jazykem jako vaše zařízení.

Máme výchozí soubor s konfigurací přehrávače, který obsahuje dokumentaci všech našich nastavení.  Viz nejnovější verze na https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRender.conf

Běžná nastavení jsou `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, a `ChunkedTransfer`.

Kromě toho se můžete podívat na další konfigurace přehrávačů ve složce "renderers" ve vaší instalační složce, aby jste zjistili co dělají. Někdy budete potřebovat pomoc, kterou Vám můžeme dát na našem fóru, a prosím nezapomeňte nám říci o zlepšení, když jej provedete, aby ostatní uživatelé s vaším zařízením mohli mít z opravy prospěch. Zmíníme Vás v našem oznámení o vydání a v seznamu změn.

Pokud máte novou konfiguraci přehrávače pro přispění k projektu, vytvořte prosím **Pull Request** na našem GitHub repozitáři https://github.com/UniversalMediaServer/UniversalMediaServer
