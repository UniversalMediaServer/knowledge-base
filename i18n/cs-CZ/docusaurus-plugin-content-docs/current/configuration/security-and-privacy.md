# Bezpečnost a soukromí

UMS je DLNA server. Nyní je DLNA protokol, který nemá žádnou skutečnou představu o "uživateli". Například se nemusíte přihlásit do televizoru. To vede k tomu, že všechny přehrávače získají přístup ke stejným údajům. To nemusí být to, co chcete. Například pokud máte dvě složky kids_safe a kids_unsafe můžete chtít, aby přehrávače v místnosti pro děti měly přístup pouze do složky kids_safe . UMS poskytuje řadu metod pro kontrolu přístupu. 

## IP filtr

Filtrování IP je nejrestriktivnější metodou, kterou UMS poskytuje. Chcete-li použít, zadejte čárkou oddělený seznam IP adres, které mají povoleno připojit se.  Přehravač jehož adresa neodpovídá záznamům v seznamu, jednoduše zruší provoz (velmi brzy v UMS). Nebude mít přístup k žádným složkám (ani neuvidí kořenovou složku). Použij tuto metodu k úplnému vyloučení dětí. Více informací naleznete v popisu ip_filtru v UMS.conf.

Příklad pro povolení pouze 2 adres

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## Seznam povolení

Povolený seznam je metoda, která vám umožňuje přizpůsobit kořenovou složku podle jednotlivých přehrávačů.  Toto umožňuje sdílet různé sady složek s různými přehrávači. Funguje následovně: Do vašeho UMS.conf (momentálně nejsou žádné možnosti GUI) přidáváte řádky tag.možnost = hodnota, kde je tag buď IP adresa, nebo název přehrávače.  Název přehrávače by měl být namísto toho s mezerami změněn na _ (podtržítko). Možnost je jedna z

- folders
- vfolders
- web
- hide_set

Hodnota je závislá na volbě. Poslední 4 jsou logické hodnoty. pro složky a virtualní složky je to seznam složek.

Příklad

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\\child_safe
192.168.1.1.hide_set = true
```

Toto bude pro IP adresu 192.168.1.1:

- Sdílet složku c:\child_safe
- Skrýt složku nastavení serveru
- Skrýt seznam naposledy přehrávaných

Všechny ostatní přehrávače budou používat "globální" nastavení, např. viz všechny složky a nastavení serveru.

Pokud není tato možnost k dispozici, bude použita k nastavení "globální", nebo pokud není tato volba zobrazena na výchozí hodnotu.

## UMS.deny

Seznam povolených může měnit pouze vzhled kořenové složky. Ale pokud máte smíšené věci (máte 10 složek, ale pouze jedna by měla být omezena na děti). Pro kontrolu přístupu k jednotlivým složkám (nebo médiím) můžete použít UMS.deny. Funguje následovně: Přidejte soubor s názvem UMS.deny do stejného adresáře jako soubor UMS.conf a uvnitř tohoto souboru přidejte tag.[name|file|sys]=regex. Pro každou složku/soubor, který by měl být přidán, UMS použije regulární výraz na název složky nebo název souboru a pokud regulární výraz odpovídá složce/souboru NEBUDE přidán. Například:
```
192.168.1.1.name=.*private.*
```

odstraní všechny složky/soubory, které obsahují slovo "private"
```
192.168.1.1.file=c:\\tst.*
```

odstraní všechny soubory, které mají "c:\tst" ve svém názvu své atd.

Pokud nejsou v souboru "UMS.deny" nastavena žádná pravidlo, budou přidány soubory/složky.

Skrytí složek

Ovládá viditelnost virtuálních složek. Tato nastavení naleznete v souboru UMS.conf. Pro skrytí některých složek při prohlížení stačí nastavit jejich hodnotu na hodnotu true, nebo je zaškrtněte v záložce Navigace/Nastavení sdílení v pokročilém režimu GUI.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Pro možnost skrýt webovou složku budete muset zrušit zaškrtnutí Povolit externí síť v záložce Obecná konfigurace v pokročilém režimu GUI nebo změnit hodnotu `external_network =' na false ve vašem UMS. conf soubor. Toto bude mít vedlejší efekt, že automatická aktualizace nebude fungovat. Změny provedené z GUI budou účinné po restartu.

## Pin kód

Všechny výše uvedené metody omezují přístup z různých přehrávačů. Ale pokud můžete získat přístup k přehrávači, kterému je povoleno vidět složku, tyto metody vám nepomůžou (pokud děti mají přístup k TV v obývacímu pokoji, který má přístup ke všem médiím, pak mají přístup k těmto médiím). PIN kód řeší tento problém. Umožňuje skryt složky/média za PIN kódem, který musíte zadat Z přehrávače. Ve výchozím nastavení je vstup posloupností číslic (0-9) stejně jako kód bankomatu. Důrazně navrhuji, abyste použili číselné kódy, které se z přehrávače obtížně napíší. Ale pokud jste extra paranoidní, můžete přidat písmena. Funguje to následovně: Přidejte soubor s názvem UMS.code do stejného adresáře jako váš UMS. conf a do tohoto souboru přidejte regexp,kód, kde regexp je regulerní výraz stejně jako v "UMS.deny" souboru a kód je kód, který umožní přístup ke složce/médiím. Neexistuje žádná regulace délky kódu. Například:
```
.*private.*,1234
```

Vynutíte zadání kódu, pokud složka/média obsahuje slovo "private" a správný kód je 1234. Kód pak zůstane v platnosti 4 hodiny (pokud tento čas nezměníte).

## Vlastní konfigurace

Jakákoliv konfigurace může být také nastavena na základě jednotlivých zařízení vytvořením vlastní konfigurace zařízení pro přepsání výchozích nastavení UMS (pro úplné podrobnosti viz vytvoření vlastní konfigurace zařízení).

Například, přizpůsobit dětskou televizi:
- Klikněte na tlačítko 'Přizpůsobit toto zařízení' v pravém horním rohu vyskakovacího okna přehrávače a zadejte název konfigurace.
- V novém konfiguračním souboru, který otevře, přidejte všechna nastavení, která si přejete přepsat televizi, např. změnit název serveru a specifikovat různé složky:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
