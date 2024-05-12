# Bezpečnost a soukromí

## Úvod

UMS slouží pro média dvěma hlavními způsoby - přes DLNA/UPnP  prostřednictvím aplikací přehrávače médií, a přes HTTP(S) prostřednictvím webových prohlížečů.

Webové prohlížeče mají snadnou kontrolu zabezpečení a soukromí tím, že mají uživatelské účty s přihlašovacími údaji.

Aplikace přehrávače médií obecně nepodporují koncepci "uživatele", takže obvykle každé zařízení získává stejný obsah. To nemusí být to, co chcete. Například pokud máte dvě složky kids_safe a kids_unsafe můžete chtít, aby přehrávače v místnosti pro děti měly přístup pouze do složky kids_safe . Další společnou situací je, že jste ve stejné síti jako lidé, který nechcete dát přístup ke svým médiím, takže chcete zcela zablokovat některé přehrávače.

UMS poskytuje řadu metod kontroly přístupu v těchto situacích.

## Povolit nebo blokovat přehrávače nebo síťová zařízení ve výchozím nastavení
Můžete si vybrat výchozí strategii pro přehrávače a síťová zařízení. Ve výchozím nastavení můžete povolit nebo zamítnout denylisty a povolené seznamy pro úplné ovládání.

To je užitečné pro sdílené životní situace nebo místní sítě s nízkou důvěrou. Je také užitečný pro ty z vás, kteří používáte adaptéry powerline pro vaši síť, protože to může mít za následek nežádoucí přístup od sousedů.

![Příklad povolených předvoleb sítě](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Skrytí složek

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
