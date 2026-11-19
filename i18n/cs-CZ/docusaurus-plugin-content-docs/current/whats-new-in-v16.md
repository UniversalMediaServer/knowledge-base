---
sidebar_position: 2
---

# Co je nového ve verzi 16

## Přehled

Hlavními cíli verze 16 bylo usnadnit pokračování ve sledování televizních seriálů a zlepšit podporu internetových rádií.

Rychlý přehled změn v této verzi:
- Přidána složka **Pokračovat ve sledování** do knihovny médií.
- Přidána podpora **událostí a seznamů skladeb [DI.fm (AudioAddict)](https://www.di.fm/)**
- Přidána podpora **[RadioBrowseru](https://www.radio-browser.info/)** pro vyhledávání rozhlasových stanic a jejich přidávání do seznamů skladeb na serveru.
- Přidána podpora **uspořádání se třemi zařízeními**
- Přidána podpora **označování oblíbených položek a hodnocení** a **změny obrázků obalů** u všech typů médií (například videí, seznamů skladeb a složek) prostřednictvím přehrávacích zařízení a aplikací pro přehrávání médií (dříve to bylo možné pouze u zvukových souborů)
- Přidána podpora **informování přehrávačů** o změnách konkrétních souborů a kontejnerů
- Zrychleno spouštění přibližně o **95 %** a zlepšena odezva serveru během skenování souborů
- Zlepšena **odezva serveru** během skenování souborů
- Modernizován zdrojový kód přechodem na nové hlavní verze **8 závislostí**

## Nové funkce

### Složka Pokračovat ve sledování

Zobrazuje všechna rozkoukaná videa i následující epizody rozkoukaných seriálů, seřazené od naposledy přehrávaných.

Obsah této složky i vnořených složek jednotlivých seriálů se průběžně mění.

Pokud jste již zhlédli všechny dostupné epizody seriálu, jeho složka zmizí. Jakmile přibude nová epizoda, složka se znovu objeví.

První položkou ve složce každého seriálu je epizoda, u které jste se sledováním skončili. Pokud máte rozkoukanou epizodu S01E02, zobrazí se tato epizoda. Po jejím úplném přehrání se zobrazí S01E03, pokud je k dispozici.

![Video ukazující složku Pokračovat ve sledování](@site/docs/img/whats-new-in-v16-continue-watching.gif)

### DI.fm (AudioAddict)

Přidána podpora událostí a seznamů skladeb [DI.fm (AudioAddict)](https://www.di.fm/)

Podrobnosti najdete v dokumentaci k [Audio Addict](./configuration/audio-addict) a [internetovým rádiím](./configuration/internet-radio) a v následujícím videu s ukázkou použití [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhled videa o DI.fm](@site/docs/img/whats-new-in-v16-difm.png)](https://github.com/user-attachments/assets/61d680d0-911b-4cd6-a564-cffc51b05e83)

### RadioBrowser

Přidána podpora [RadioBrowseru](https://www.radio-browser.info/) pro vyhledávání rozhlasových stanic a jejich přidávání do seznamů skladeb na serveru. Vyhledávat lze podle těchto údajů:
- Název stanice
- Země
- Jazyk
- Žánr

Podrobnosti najdete v dokumentaci k [RadioBrowseru](./configuration/radiobrowser) a v následujícím videu s ukázkou použití [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhled videa o podpoře RadioBrowseru](@site/docs/img/whats-new-in-v16-radiobrowser.png)](https://github.com/user-attachments/assets/38193429-f478-4284-aa67-de2fd5a3da6e)

### Uspořádání se třemi zařízeními

Přidána podpora režimu se třemi zařízeními (3-box), ve kterém se na přehrávání podílejí:
1. Server (UMS)
2. Řídicí bod (často telefon nebo webové rozhraní)
3. Přehrávací zařízení nebo aplikace pro přehrávání médií

Podrobnosti najdete v části [Uspořádání se dvěma a třemi zařízeními](./configuration/control-point-setups).

### Označování oblíbených položek a hodnocení prostřednictvím přehrávačů

Přidána podpora označování oblíbených položek a hodnocení u všech typů médií (například videí, seznamů skladeb a složek) prostřednictvím přehrávacích zařízení a aplikací pro přehrávání médií (dříve to bylo možné pouze u zvukových souborů)

Další informace najdete v následujícím videu s ukázkou použití [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhled videa o označování oblíbených položek a hodnocení](@site/docs/img/whats-new-in-v16-like.png)](https://github.com/user-attachments/assets/f6c6085c-dbf0-491b-afd3-ef7bc490caaa)

### Změna obrázků obalů prostřednictvím přehrávačů

Přidána podpora změny obrázků obalů u všech typů médií (například videí, seznamů skladeb a složek) prostřednictvím přehrávacích zařízení a aplikací pro přehrávání médií (dříve to bylo možné pouze u zvukových souborů)

Další informace najdete v následujícím videu s ukázkou použití [NextCP/2](https://sf666.github.io/nextcp2/):

[![Náhled videa o změně obrázků obalů](@site/docs/img/whats-new-in-v16-album-art.png)](https://github.com/user-attachments/assets/5f5739b2-77da-43d3-b7e8-a53cd938cdb8)

## Změny narušující zpětnou kompatibilitu

Již nepodporujeme 32bitové architektury x86 a i586. Proto již nevydáváme tyto čtyři varianty: Linux ARMel, Linux ARMhf, Linux x86 a Windows x86.

Zálohy vytvořené před verzí 16 nejsou kompatibilní s verzí 16 a novějšími. Pokud si pravidelně vytváříte zálohy, uchovejte zálohu z verze 15 odděleně od záloh verze 16, dokud si neověříte, že automatická migrace proběhla správně.

## Migrace

Přechod nevyžaduje žádné zvláštní migrační kroky.

Stejně jako před každou významnou aktualizací si můžete zálohovat adresář profilu, který obsahuje konfiguraci a místní databázi. Budete se tak moci vrátit k dosavadní verzi. Umístění tohoto adresáře najdete poblíž začátku protokolu programu. Hledejte `Profile directory: [some page]/UMS`.
