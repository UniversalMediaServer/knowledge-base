---
sidebar_position: 2
---

# Co je nového ve verzi 16

## Přehled

Hlavními cíli v16 bylo usnadnit lidem další sledování televizních seriálů a zlepšit podporu internetového rozhlasu.

Rychlý přehled změn v této verzi:
- Přidána složka **Pokračovat ve sledování** do knihovny médií.
- Přidána podpora **[DI.fm (AudioAddict)](https://www.di.fm/) Události a playlisty**
- Přidána **[RadioBrowser](https://www.radio-browser.info/)** podpora pro hledání a přidávání rozhlasových stanic na server seznamu skladeb.
- Přidána podpora pro **3-boxovou konfiguraci**
- Přidána podpora pro **líbí/hodnocení** a **aktualizaci obrázku** pro všechny typy médií (jako videa, playlisty, složky atd.) pomocí přehrávačů a přehrávačů médií (předtím to bylo pouze pro audio)
- Přidána podpora **aktualizace přehrávačů** o konkrétních souborech a kontejnerech, které se změnily
- Zvýšený výkon spouštění o **~95%**, stejně jako odezva serveru při skenování souborů
- Vylepšená **odezva serveru** při skenování souborů
- Aktualizována kódová databáze aktualizací **8 verzí hlavních závislostí**

## Nové funkce

### Pokračovat ve sledované složce

Zobrazuje všechna probíhající videa, stejně jako další epizody pro probíhající televizní seriály, seřazené podle naposledy přehrávané.

Obsah složky - a obsah televizních sériových složek v ní - jsou dynamické.

Takže pokud jste aktuální na televizních seriálech, jeho složka zmizí, a když je přidána nová epizoda se znovu objeví.

První epizoda v každé složce TV série je ta, na kterou jste připraveni. Pokud jste v polovině epizody S01E02 uvidíte to a když je plně přehrána uvidíte S01E03, pokud existuje.

![video zobrazující složku pro sledování pokračování](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Přidána podpora pro [DI.fm (AudioAddict)](https://www.di.fm/) Události a seznamy skladeb

Podívejte se na naši dokumentaci pro [Audio Addict](./configuration/audio-addict), [Internet Radio](./configuration/internet-radio) a video pomocí [NextCP/2](https://sf666.github.io/nextcp2/) níže.

[![a náhled videa pro DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### Radioprohlížeč

Přidána [RadioBrowser](https://www.radio-browser.info/) podpora pro hledání a přidávání rádiových stanic na straně serveru. Hledat podpory:
- Název stanice
- Země
- Jazyk
- Žánr

Více informací naleznete v dokumentaci [RadioBrowser](./configuration/radiobrowser) a video pomocí [NextCP/2](https://sf666.github.io/nextcp2/):

[![a video náhled pro podporu RadioBrowser](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### Konfigurace 3-boxu

Přidána podpora pro běh v režimu 3-box, což je případ, kdy jsou do přehrávání zapojena 3 zařízení (boxy):
1. Server (UMS)
2. Kontrolní bod (často telefon nebo prohlížeč rozhraní)
3. Přehrávač / media player

Více informací naleznete v [Dvou-boxové a troj-boxové nastavení](./configuration/control-point-setups).

### Líbí se / hodnocení prostřednictvím přehrávačů

Přidána podpora pro **líbí/hodnocení** pro všechny typy médií (jako videa, playlisty, složky atd.) pomocí přehrávačů a přehrávačů médií (předtím to bylo pouze pro audio)

Podívejte se více na video: [NextCP/2](https://sf666.github.io/nextcp2/):

[![ náhled videa pro oblíbené a hodnocené podpory](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Aktualizace obalu alba pomocí přehrávačů

Přidána podpora pro aktualizaci obalu alba pro všechny typy médií (jako videa, playlisty, složky atd.) pomocí přehrávačů a přehrávačů médií (předtím to bylo pouze pro audio)

Podívejte se více na video: [NextCP/2](https://sf666.github.io/nextcp2/):

[![video náhled pro aktualizaci zobrazení alba](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Zrušení změn

Již nepodporujeme x86 nebo i586 (32-bit) architektury. To znamená, že neděláme 4 verze: Linux ARMel, Linux ARMhf, Linux x86 a Windows x86.

Zálohy vytvořené před v16 nebudou pracovat po v16, takže pokud jste měli ve zvyku udržovat zálohy, ujistěte se, že ukládáte vaše v15 samostatně od v16 zvlášť, dokud si nejste jistí, že automatická migrace funguje.

## Migrace

Přechod nevyžaduje žádné zvláštní migrační kroky.

Stejně jako před každou významnou aktualizací si můžete zálohovat adresář profilu, který obsahuje konfiguraci a místní databázi. Budete se tak moci vrátit k dosavadní verzi. Umístění tohoto adresáře najdete poblíž začátku protokolu programu. Hledejte `Profile directory: [some page]/UMS`.
