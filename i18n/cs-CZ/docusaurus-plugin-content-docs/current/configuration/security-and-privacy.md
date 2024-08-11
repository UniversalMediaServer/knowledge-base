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

![Příklad povolených předvoleb sítě](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Blokovat/povolit přehrávače a síťová zařízení

Když jste se rozhodli, zda ve výchozím nastavení povolit nebo blokovat neznámé přehrávače, můžete sestavit seznam zakázaných nebo je povolit z domovské obrazovky v nastavení.

![Příklad blokování přehrávače](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Propojit osobu s přehrávačem

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Omezit sdílený obsah pro určité skupiny

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Skrytí složek

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

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

## Pin kód

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Vlastní konfigurace

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
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
