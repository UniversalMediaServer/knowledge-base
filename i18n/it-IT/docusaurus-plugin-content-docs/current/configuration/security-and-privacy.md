# Sicurezza e Privacy

## Introduzione

UMS gestisce i media in due modalità - via DLNA/UPnP per essere riprodotti con applicazioni media player e via HTTP(S) per essere riprodotti tramite browser web

I browser web consentono di gestire facilmente la sicurezza e la privacy grazie agli account utente con credenziali di accesso.

Le app di riproduzione multimediale in genere non supportano il concetto di “utente”, quindi solitamente ogni dispositivo riceve gli stessi contenuti. Questo potrebbe non essere quello che vuoi. Ad esempio, se hai due cartelle, kids_safe e kids_unsafe, potresti voler limitare l'accesso dei dispositivi nella stanza dei bambini alla sola cartella kids_safe. Un'altra situazione comune è quella in cui ci si trova sulla stessa rete di persone a cui non si vuole consentire l'accesso ai propri file multimediali, come i coinquilini, e quindi si desidera bloccare completamente determinati renderer.

UMS fornisce una serie di metodi per controllare l'accesso in tali situazioni.

## Consenti o blocca renderer o dispositivi di default
È possibile scegliere la strategia predefinita per i renderer e i dispositivi di rete. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. È utile anche per chi utilizza adattatori powerline per la propria rete, poiché ciò può comportare accessi indesiderati da parte dei vicini.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Collegare un utente a un renderer

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Esempio di come assegnare un account a un renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Hiding folders

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

Per nascondere la cartella Web, è necessario deselezionare l'opzione "Abilita rete esterna" nella scheda "Configurazione generale" della modalità GUI avanzata oppure modificare il valore di `external_network =` in `false` nel file UMS.conf. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). Il codice PIN risolve il problema. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*privato.*,1234
```

Ti chiederà di inserire un codice se la cartella o il file multimediale contiene la parola “private” e il codice corretto è 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

Ad esempio, per personalizzare il televisore dei bambini:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- Nel nuovo file di configurazione che si aprirà, aggiungi tutte le impostazioni che desideri sovrascrivere per la TV, ad esempio per cambiare il nome del server e specificare cartelle diverse:
```
#----------------------------------------------------------------------------
# Profilo del dispositivo personalizzato
# Consultare DefaultRenderer.conf per le descrizioni di tutte le possibili opzioni di rendering
# e UMS.conf per le opzioni del programma.

# Le opzioni contenute in questo file sovrascrivono le impostazioni predefinite per i dispositivi Sony Bravia EX specifici elencati di seguito.
# Specificare i dispositivi tramite UUID (o indirizzo se non è presente un UUID), separandoli con virgole se ce n'è più di uno.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
