# Zabezpečení a soukromí

## Úvod

UMS poskytuje média dvěma hlavními způsoby: přes DLNA/UPnP aplikacím pro přehrávání médií a přes HTTP(S) webovým prohlížečům.

Při přístupu přes webový prohlížeč lze zabezpečení a soukromí snadno řídit pomocí uživatelských účtů s přihlášením.

Aplikace pro přehrávání médií obvykle nepodporují pojem „uživatel“, takže všechna zařízení zpravidla získají stejný obsah. To nemusí být to, co chcete. Například pokud máte dvě složky kids_safe a kids_unsafe, můžete chtít omezit přehrávače v dětském pokoji tak, aby měly přístup pouze do složky kids_safe. Další běžná situace nastává, když sdílíte síť s lidmi, kterým nechcete zpřístupnit svá média, například se spolubydlícími, a proto chcete některé přehrávače úplně zablokovat.

UMS nabízí několik způsobů, jak v těchto situacích řídit přístup.

## Povolit nebo blokovat přehrávače nebo síťová zařízení ve výchozím nastavení
Můžete si vybrat výchozí strategii pro přehrávače a síťová zařízení. Jako výchozí chování můžete zvolit povolení nebo blokování přístupu a doplnit je seznamem zakázaných nebo povolených zařízení, abyste měli přístup plně pod kontrolou.

To se hodí ve sdílených domácnostech nebo v rozsáhlých místních sítích či sítích s nízkou mírou důvěry. Je to užitečné také při použití síťových adaptérů powerline, protože přes elektrické rozvody mohou někdy získat nežádoucí přístup i sousedé.

![Příklad nastavení výchozího povolení síťových zařízení](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Příklad nastavení výchozího povolení přehrávačů](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Blokovat/povolit přehrávače a síťová zařízení

Jakmile zvolíte, zda se mají neznámé přehrávače ve výchozím nastavení povolit, nebo blokovat, můžete na domovské obrazovce v části nastavení sestavit seznam zakázaných či povolených zařízení.

![Příklad blokování přehrávače](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Propojit osobu s přehrávačem {#link-person-to-renderer}

Uživatelské účty můžete propojit s přehrávači či zařízeními, a tím pro ně oddělit přístup k obsahu i sledování přehrávání.

Pokud máte například televizor v obývacím pokoji a další v ložnici, nemusí obsah sledovaný v ložnici ovlivňovat televizor v obývacím pokoji.

![Příklad přiřazení účtu k přehrávači](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Omezení sdíleného obsahu na určité skupiny

Můžete zvolit, že se adresáře nebo online obsah budou sdílet pouze s určitými skupinami. Například účet dítěte (nebo zařízení přiřazené tomuto účtu) můžete zařadit do skupiny „Děti“ a této skupině povolit přístup do adresáře „Rodina“, ale ne k obsahu „Horor“ nebo „Pouze pro dospělé“. Nebo jí zpřístupněte webový kanál Kurzgesagt, ale ne historické podcasty.

![Příklad skupin pro sdílení obsahu](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Skrytí složek

Viditelnost virtuálních složek lze nastavit. Tato nastavení naleznete v souboru UMS.conf. Chcete-li některé složky při procházení skrýt, nastavte příslušné hodnoty na true nebo je zaškrtněte na kartě Navigace/Nastavení sdílení v pokročilém režimu grafického rozhraní.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Chcete-li skrýt složku Web, zrušte zaškrtnutí možnosti Povolit externí síť na kartě Obecná konfigurace v pokročilém režimu grafického rozhraní nebo v souboru UMS.conf nastavte `external_network = false`. Vedlejším účinkem bude nefunkční automatická aktualizace. Změny provedené v grafickém rozhraní se projeví po restartu.

## Kód PIN

Všechny výše uvedené metody omezují přístup z různých přehrávačů. Pokud ale někdo získá přístup k přehrávači, který smí danou složku zobrazit, tyto metody nepomohou. Například děti s přístupem k televizoru v obývacím pokoji, který má přístup ke všem médiím, získají přístup také k těmto médiím. PIN kód řeší tento problém. Umožňuje chránit složky a média kódem PIN, který je nutné zadat přímo z přehrávače. Ve výchozím nastavení je vstup posloupností číslic (0-9) stejně jako kód bankomatu. Důrazně doporučujeme používat číselné kódy, protože jiné znaky se z přehrávače zadávají obtížně. Pokud chcete být obzvlášť opatrní, můžete přidat i písmena. Funguje to následovně: Do stejného adresáře jako UMS.conf přidejte soubor UMS.code. Do něj zapisujte dvojice regexp,code, kde regexp je regulární výraz jako v souboru UMS.deny a code je kód umožňující přístup ke složce nebo médiu. Délka kódu není omezena. Například:
```
.*private.*,1234
```

Tento zápis vyžádá kód u složky nebo média, jejichž název obsahuje slovo „private“. Správný kód je 1234. Kód pak zůstane v platnosti 4 hodiny (pokud tento čas nezměníte).

## Vlastní konfigurace zařízení

Libovolnou konfigurační vlastnost lze nastavit také pro jednotlivá zařízení: vytvořte vlastní konfiguraci zařízení, která přepíše výchozí nastavení UMS. Podrobnosti najdete v části Vytvoření vlastní konfigurace zařízení.

Například pro přizpůsobení dětského televizoru:
- Klikněte na tlačítko 'Přizpůsobit toto zařízení' v pravém horním rohu vyskakovacího okna přehrávače a zadejte název konfigurace.
- Do nově otevřeného konfiguračního souboru přidejte nastavení, která chcete pro tento televizor změnit, například název serveru a sdílené složky:
```
#----------------------------------------------------------------------------
# Vlastní profil zařízení
# Popisy všech možností přehrávačů najdete v DefaultRenderer.conf
# a možnosti programu v UMS.conf.

# Možnosti v tomto souboru přepisují výchozí nastavení níže uvedených zařízení Sony Bravia EX.
# Zařízení určete pomocí uuid (nebo adresy, pokud uuid nemají). Více zařízení oddělte čárkami.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
