# Bezpečnost a soukromí

## Introduction

UMS serves media in two main ways - via DLNA/UPnP to be consumed via media player apps, and via HTTP(S) to be consumed via web browsers.

Web browsers have easy security and privacy control by having user accounts with logins.

Media player apps do not generally support the concept of a "user", so usually every device gets the same content. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want to restrict the renderers in the kids' room to only have access to the kids_safe folder. Another common situation is you are on the same network as people you do not want to have access to your media, like flatmates, so you want to block certain renderers completely.

UMS provides a number of methods to control access in those situations.

## Allow or block renderers or network devices by default
You can choose the default strategy for renderers and network devices. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

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
