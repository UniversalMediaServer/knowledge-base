# Come aggiungere contenuti web

Questo articolo spiegherà come aggiungere contenuti web.

## Feed video

È possibile iscriversi ai feed/canali video aggiungendo i collegamenti di feed RSS, o, nel caso di YouTube, basta inserire il link al canale.

### 1: Vai alla sezione Contenuti condivisi

Nelle impostazioni UMS nel tuo browser web, apri il menu e seleziona Contenuti condivisi  
![Menu impostazioni](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: Aprire il modal "Aggiungi nuovo contenuto condiviso"

Quando si seleziona il pulsante "Aggiungi nuovo contenuto condiviso", si aprirà un modal che consente di aggiungere qualsiasi tipo di supporto. Il primo passo è scegliere il tipo "feed video"  
![Nuova modalità opzioni contenuti condivisi](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Aggiungi il tuo feed

Qui puoi aggiungere il tuo feed

#### Nome

Il campo "Nome" è disabilitato per i feed video, perché i feed definiscono i propri nomi.

#### Percorso

Il campo "Percorso" definisce la struttura della directory che verrà visualizzata da UMS. Ad esempio, se inserisci `Canali Web/YouTube`, il tuo feed sarà all'interno della directory `Canali YouTube`, all'interno della directory `Web`. Questo ti permette di organizzare i tuoi contenuti come vuoi, ed è particolarmente utile quando hai diversi fornitori di feed e si sta utilizzando UMS avendoli tutti nello stesso posto.

#### Fonte/URL:

Questo è il link al feed video. Di solito finirà in `.xml`, ma gestiamo YouTube in modo diverso per accettare direttamente un URL del canale, permettendoti di inserire ad esempio `https://www.youtube.com/@kurzgesagt`

#### Gruppi autorizzati

Il campo "Gruppi autorizzati" consente di rendere questo feed disponibile solo per determinati gruppi definiti in UMS che sono associati a diversi utenti e/o dispositivi. Vedi [Sicurezza e Privacy](../configuration/security-and-privacy.md#link-person-to-renderer) per maggiori dettagli.

Quando sei soddisfatto delle opzioni inserite, seleziona il pulsante "Aggiungi".

### Ordine dei feed

Se il link del feed è valido, ora dovresti vedere il campo "Nome" popolato, e ora puoi trascinare il feed su o giù per controllare l'ordine  
! Elenco di contenuti condivisi e capacità di ordinare](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Salva modifiche

È possibile ripetere i passaggi precedenti per aggiungere/modificare più contenuti, e quando sei soddisfatto delle tue modifiche, seleziona il pulsante "Salva" in fondo alla pagina. Ora puoi vedere il tuo contenuto sui tuoi dispositivi:  
![Esempio di feed video sul lettore web](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)