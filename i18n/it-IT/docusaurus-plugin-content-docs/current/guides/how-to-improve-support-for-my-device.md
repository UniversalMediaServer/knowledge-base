# Come inserire il supporto per il mio dispositivo

Se il dispositivo non riesce a fare nulla, come la navigazione delle cartelle o la riproduzione di un file, potrebbe essere possibile per te correggerlo modificando le impostazioni nel file di configurazione del renderer Diversi dispositivi/renderer/client comunicano con i server come UMS in diversi modi, perciò il file di configurazione dice a UMS come parlare la stesso linguaggio del dispositivo.

Ogni profilo di configurazione serve a due propositi:
- Permetti a UMS di riconoscere un renderer
- Definisci le possibilità di quel renderer

Abbiamo un file di configurazione renderer predefinito che contiene la documentazione su tutte le nostre impostazioni di renderer. Vedi l'ultima versione su https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Aggiunger il supporto per un dispositivo non riconosciuto

Quando UMS non riconosce il dispositivo, significa che nessuno dei profili di configurazione del renderer corrisponde al dispositivo. Il risultato è che UMS visualizza un ` Renderer Sconosciuto`, e poiché non conosce le possibilità del tuo renderer, non può fornire un output ottimizzato per il tuo dispositivo.

La soluzione è provare a creare il proprio file di configurazione del renderer.
1. Fare una copia del file .conf che più somiglia al tuo dispositivo. Ad esempio, se il vostro Samsung TV non è riconosciuto, una delle configurazioni TV Samsung potrebbe essere un buon punto da cui cominciare.

1. Vai alla scheda `Log` in UMS e cerca il testo `Media renderer che non è stato riconosciuto. Possibile identificare intestazioni HTTP:`. Quelle informazioni sono ciò che è necessario a rendere UMS capace di riconoscere il dispositivo.

1. Nel vostro nuovo file .conf, cerca la riga che definisce `UserAgentSearch` e/o `UpnpDetailsSearch` e sostituisci i valori con quelle informazioni identificative.

1. Sfoglia e riproduci alcuni file multimediali sul tuo dispositivo. Prendi nota di quali media hanno avuto un problema di riproduzione. Ora puoi passare alla prossima sezione per migliorare il supporto per il tuo dispositivo.

## Migliorare il supporto per un dispositivo

1. Se uno qualsiasi dei tuoi media ha un problema di riproduzione, la configurazione del renderer dovrebbe essere modificata fino a che funziona. Fare riferimento a [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) per l'elenco completo delle opzioni. I più comuni da modificare sono:
    ```
    Video
    Audio
    Immagine
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supportato
    ```
    Assicurati di non avere `MediaInfo = false` nella tua nuova configurazione, perché questo impedirà alle linee `supportate` di funzionare.

1. Per assicurarsi che la transcodifica funzioni sul tuo dispositivo, riproduci un file dalla cartella `#--TRANSCODE--#`. All'interno di quella cartella, riproduci una delle voci `FFmpeg`. Se riproduce, la transcodifica funziona.

1. Le linee `supportate` devono essere popolate per dire a UMS quali file il dispositivo supporta nativamente. Può essere una buona idea trovare online il manuale per il tuo dispositivo e usarlo per aiutare a popolare quelle linee.

1. Oltre a questo, è possibile dare un'occhiata ad altre configurazioni di renderer all'interno della cartella "renderers" nella directory di installazione, per vedere cosa stanno facendo. A volte avrete bisogno di aiuto, che possiamo darvi sul nostro forum, e ricordati per favore di comunicarci i miglioramenti quando li fai, in modo che altri utenti possano beneficiare della correzione con dispositivi come il tuo. Ti accrediteremo nel nostro annuncio di rilascio e changelog.
