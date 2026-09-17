# Servizio UMS UPnP

UMS offre un servizio UPnP esteso che consente ai punti di controllo esterni di interagire con funzionalità aggiuntive del sistema.

## Utilizzo

Il servizio è esposto nel namespace `schemas-upnp-org` con il tipo di servizio `UmsExtendedServices`.

Per i punti di controllo Java che utilizzano JUPnP, chiamare `findService` sull'oggetto `RemoteDevice` dell'UMS:

```java
RemoteService umsServicesService = remoteDevice.findService(
new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Tramite questa interfaccia di servizio sono disponibili le seguenti operazioni.

## Interazioni con MyMusic

È possibile sfogliare gli album preferiti utilizzando l'ID oggetto `MYMUSIC$` come collegamento diretto oppure navigando nella cartella `I miei album` nella directory principale.

La possibilità di salvare i brani preferiti è particolarmente utile nelle grandi collezioni di album, dove sfogliare manualmente l'intera libreria può richiedere molto tempo. Un elenco selezionato degli album preferiti consente agli utenti di tornare rapidamente ai contenuti di loro interesse senza dover ripetere ricerche generiche o navigare in profondità nelle cartelle.

In pratica, i preferiti offrono i seguenti vantaggi:

- Accesso più rapido agli album riprodotti più frequentemente, anche in librerie molto grandi.
- Navigazione quotidiana migliorata grazie alla separazione dei contenuti preferiti dall'intero catalogo.
- Flussi di riproduzione più coerenti per i clienti e automazioni che dipendono da selezioni di album stabili.

### Parametri di input

Tutte le azioni in questa sezione richiedono un parametro di input. L'album deve essere identificato tramite un ID MusicBrainz o un ID di pubblicazione Discogs. È necessario almeno un ID; in caso contrario, non viene eseguita alcuna operazione.

Esempio per il singolo di Madonna "Like a Virgin":

| Attributo     |           Tipo           |           Esempio di valore          |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          String          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Se entrambi i parametri (`MusicBrainzId` e `DiscogsId`) sono stati forniti quando si è espresso un apprezzamento per un album, entrambi devono essere forniti anche quando si esprime un disinteresse per lo stesso album.
:::

### LikeAlbum

Contrassegna un album musicale come “Mi piace”.

### Non mi piace l'album

Rimuove lo stato "Mi piace" da un album musicale.

### IsAlbumLikedInput

Verifica se un album è attualmente contrassegnato come "Mi piace". Se vengono forniti sia l'ID di MusicBrainz che quello di Discogs, il metodo restituisce `true` se almeno uno degli ID è contrassegnato come "mi piace".

## Azioni di backup

Il servizio offre funzioni di backup e ripristino.

:::info
Prima di poter eseguire un ripristino, è necessario creare un backup.
:::

### BackupAudioLikes

Crea un backup della tabella degli album audio “preferiti” identificati dagli ID di MusicBrainz o Discogs.

### Ripristina i “Mi piace” di Audio

Ripristina la tabella degli album preferiti. Chiama `BackupAudioLikes` prima di eseguire questa azione.

### Valutazioni dei backup

Salva i dati relativi alla valutazione audio in un file di backup contenente l'hash del file e il valore della valutazione.

### Ripristina valutazioni

Ripristina le informazioni di valutazione da un backup creato con `BackupRatings`.

## Interazioni con la biblioteca

### Riscansiona MediaStore

Esegue una nuova scansione dell'intera libreria musicale.

### Riscansiona la cartella MediaStore

Esegue una nuova scansione di una cartella specifica senza ricorrenza. The input parameter must be the folder's `ObjectID`.

