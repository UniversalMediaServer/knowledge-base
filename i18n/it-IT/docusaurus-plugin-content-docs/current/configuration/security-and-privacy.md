# Sicurezza e Privacy

## Introduzione

UMS gestisce i media in due modalità - via DLNA/UPnP per essere riprodotti con applicazioni media player e via HTTP(S) per essere riprodotti tramite browser web

I browser web consentono di gestire facilmente la sicurezza e la privacy grazie agli account utente con credenziali di accesso.

Le app di riproduzione multimediale in genere non supportano il concetto di “utente”, quindi solitamente ogni dispositivo riceve gli stessi contenuti. Questo potrebbe non essere quello che vuoi. Ad esempio, se hai due cartelle, kids_safe e kids_unsafe, potresti voler limitare l'accesso dei dispositivi nella stanza dei bambini alla sola cartella kids_safe. Un'altra situazione comune è quella in cui ci si trova sulla stessa rete di persone a cui non si vuole consentire l'accesso ai propri file multimediali, come i coinquilini, e quindi si desidera bloccare completamente determinati renderer.

UMS fornisce una serie di metodi per controllare l'accesso in tali situazioni.

## Consenti o blocca renderer o dispositivi di default
È possibile scegliere la strategia predefinita per i renderer e i dispositivi di rete. È possibile consentire o negare per impostazione predefinita, con denylists e permessi, per il controllo completo.

Ciò è utile per situazioni di vita condivise o reti locali larghe/low-trust. È utile anche per chi utilizza adattatori powerline per la propria rete, poiché ciò può comportare accessi indesiderati da parte dei vicini.

![Esempio di come settare la preferenza di autorizzazione di rete](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Esempio di come settare la preferenza di autorizzazione del renderer](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Bloccare/consentire i renderer e i dispositivi di rete

Dopo aver deciso se consentire o bloccare di default i renderer non riconosciuti, puoi creare la tua lista di esclusione o la tua lista di autorizzazioni dalla schermata Home, nell'area delle impostazioni.

![Un esempio di come bloccare un renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Collegare un utente a un renderer

È possibile associare gli account utente ai dispositivi di riproduzione, consentendo così di monitorare separatamente l'accesso ai contenuti e la riproduzione.

Ad esempio, se hai un televisore in salotto e un altro in camera da letto, quello in salotto non deve essere influenzato da ciò che guardi in camera da letto.

![Esempio di come assegnare un account a un renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Limitare i contenuti condivisi a determinati gruppi

Ora puoi scegliere di condividere cartelle o contenuti online con determinati gruppi. Ad esempio, se hai una persona (o un dispositivo assegnato a una persona) che è un bambino, puoi assegnarla al gruppo “Bambini” e consentire a quel gruppo l'accesso alla cartella “Famiglia”, ma non ai contenuti ‘Horror’ o “Solo per adulti”. Oppure concedi loro l'accesso al feed web di Kurzgesagt, ma non ai podcast storici.

![Esempio di gruppi di contenuti condivisi](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Nascondi cartelle

Gestisci la visibilità delle cartelle virtuali. Queste impostazioni si trovano nel file UMS.conf. Per nascondere alcune cartelle durante la navigazione, è sufficiente impostare il relativo valore su "true" oppure selezionarle nella scheda Impostazioni di navigazione/condivisione dalla modalità GUI avanzata.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Per nascondere la cartella Web, è necessario deselezionare l'opzione "Abilita rete esterna" nella scheda "Configurazione generale" della modalità GUI avanzata oppure modificare il valore di `external_network =` in `false` nel file UMS.conf. Ciò avrà come effetto collaterale che l'aggiornamento automatico non funzionerà. Le modifiche apportate tramite l'interfaccia grafica saranno effettive dopo il riavvio.

## Codice PIN

Tutti i metodi sopra descritti limitano l'accesso da parte di vari renderer. Ma se hai accesso a un renderer autorizzato a visualizzare una cartella, questi metodi non ti saranno d'aiuto (se i bambini hanno accesso alla TV del soggiorno che ha accesso a tutti i contenuti multimediali, allora hanno accesso a quei contenuti multimediali). Il codice PIN risolve il problema. Consente di nascondere cartelle/file multimediali dietro un codice PIN che è necessario inserire DALLA schermata di rendering. Di default, l'input è una sequenza di cifre (0-9), proprio come il codice di un bancomat. Ti consiglio vivamente di utilizzare codici composti da cifre, poiché risulta difficile digitarli dal visualizzatore. Ma se sei particolarmente sospettoso, puoi aggiungere delle lettere. Aggiungi un file chiamato UMS.code nella stessa directory del tuo UMS.conf e a questo file aggiungi regexp,code dove regexp è un'espressione regolare proprio come nel file "UMS.deny" e code è il codice che concederà l'accesso alla cartella/al supporto. Il codice non prevede alcuna limitazione di lunghezza. Ad esempio:
```
.*privato.*,1234
```

Ti chiederà di inserire un codice se la cartella o il file multimediale contiene la parola “private” e il codice corretto è 1234. Il codice rimane quindi valido per 4 ore (a meno che non si modifichi tale durata).

## Configurazione personalizzata del dispositivo

È inoltre possibile impostare qualsiasi proprietà di configurazione a livello di singolo dispositivo creando una configurazione personalizzata del dispositivo per sovrascrivere le impostazioni predefinite di UMS (per ulteriori dettagli, consultare la sezione Creazione di una configurazione personalizzata del dispositivo).

Ad esempio, per personalizzare il televisore dei bambini:
- Fai clic sul pulsante "Personalizza questo dispositivo" in alto a destra nel pannello a comparsa dell'interfaccia grafica del renderer e specifica un nome per la configurazione.
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
