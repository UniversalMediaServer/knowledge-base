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

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
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
