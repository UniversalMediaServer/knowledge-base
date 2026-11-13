# Výkon

Výchozí hodnoty jsou zvoleny tak, aby byly bezpečné i na méně výkonném hardwaru. Na počítači s rozsáhlou knihovnou a volnými procesorovými jádry stojí za to několik nastavení upravit — jedno z nich má přitom větší vliv než ostatní.

Měňte vždy jen jednu věc a sledujte výsledek. Každé zde uvedené nastavení představuje kompromis ve využití prostředků, takže hodnota, která jedné instalaci pomůže, může jiné uškodit.

## Souběžné načítání knihovny

Než UMS může soubor zobrazit, musí zjistit, o co jde: načíst metadata, vyhledat obrázek a určit, co potřebuje zařízení, které o soubor požádalo. Tato činnost má největší vliv na délku skenování a rychlost otevření velké složky. Zajišťuje ji skupina pracovních vláken.

```
# Kolik souborů UMS zpracovává současně. Výchozí hodnota 4, povolený rozsah 1 až 64.
media_resolve_threads = 4
```

Většinu času zabírá čekání — na disk, databázi a občas i síť — takže zvýšení počtu vláken pomáhá i tehdy, když výrazně překročí počet procesorových jader. Na serveru s rozsáhlou knihovnou je rozumná hodnota přibližně odpovídající počtu jader nebo vyšší. Na méně výkonném počítači nebo tam, kde UMS sdílí disk s dalšími aplikacemi, ponechte výchozí hodnotu.

Toto nastavení určuje také velikost fondu databázových připojení: ten má dvojnásobek počtu vláken, nejméně však deset připojení. Je to záměrné: pracovní vlákna potřebují připojení a zvýšení jejich počtu bez odpovídajícího navýšení připojení by způsobilo, že by na sebe navzájem čekala. Protože se obě hodnoty mění společně, není třeba nic dalšího nastavovat.

## Paměť databáze

Databáze uchovává nedávno použité stránky dat v paměti. Velikost paměti, kterou smí použít, se určuje automaticky, což je obvykle vhodné:

```
# Mezipaměť databáze v KB. Výchozí hodnota -1 ponechává rozhodnutí na UMS.
database_media_cache_size = -1
```

Další dva přepínače ovlivňují kompromis mezi spotřebou paměti a rychlostí. Oba jsou ve výchozím nastavení vypnuté a u obou je lepší dopad změřit než odhadovat:

```
# Uchovávat databázové indexy v paměti.
database_media_use_memory_indexes = FALSE

# Umožnit mezipaměti při nedostatku paměť uvolnit, místo aby si ji ponechávala.
database_media_use_cache_soft = FALSE
```

Indexy v paměti urychlují vyhledávání, ale zabírají paměť, kterou pak nelze využít k jiným účelům.
Uvolnitelná mezipaměť představuje opačný kompromis: když systém potřebuje paměť, uvolní ji. To pomáhá UMS na počítači s nedostatkem paměti, ale později je nutné uvolněné stránky znovu načíst.

## Protokolování

Ve výchozím nastavení UMS zapisuje každý řádek protokolu ihned, jakmile vznikne. Použití vyrovnávací paměti snižuje nároky protokolování:

```
# Shromažďovat řádky protokolu před jejich zápisem. Ve výchozím nastavení vypnuto.
logging_buffered = FALSE
```

Nevýhoda se projeví právě tehdy, když protokol nejvíce potřebujete. Pokud je UMS násilně ukončen nebo havaruje, vše, co zbývá ve vyrovnávací paměti, se ztratí. Protokol tak může končit ještě před událostí, kterou zkoumáte, a jeho náhlý konec pak může vypadat jako zamrznutí, ke kterému ve skutečnosti nedošlo. Při hledání příčiny problému ponechte vyrovnávací paměť protokolu vypnutou.

## Co měřit

Zda změna pomohla, zjistíte ze dvou údajů:

- Jak dlouho trvá úplné skenování knihovny. Tento údaj najdete v protokolu na řádku oznamujícím dokončení skenování médií a počet sekund, které zabralo.
- Jak dlouho trvá otevření největší složky v řídicím bodu — poprvé po restartu a podruhé hned poté. První otevření zahrnuje sestavení obsahu složky, druhé už ne. Právě tento rozdíl uvedená nastavení ovlivňují.
