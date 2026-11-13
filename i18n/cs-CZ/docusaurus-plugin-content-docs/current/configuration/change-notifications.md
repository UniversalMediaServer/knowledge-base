# Oznámení změn

Když se v knihovně něco změní, připojené aplikace by se o tom měly dozvědět bez ručního obnovení a bez toho, aby se UMS každých několik sekund dotazovaly, zda se něco stalo. UPnP to řeší odběrem oznámení: aplikace se jednou přihlásí k odběru a UMS jí pak oznamuje změny.

Tento mechanismus funguje v obou směrech a každý z nich se ovládá samostatně.

## Co UMS oznamuje o vaší knihovně

Při každé změně knihovny UMS zveřejňuje dvě informace:

- **čítač**, jehož hodnota se při každé změně zvýší a odběrateli sdělí, že se něco stalo
- **seznam změněných kontejnerů**, který sdělí, co se změnilo

Právě druhá informace umožňuje rychlou aktualizaci. Aplikace, která se dozví pouze „něco se změnilo“, musí obsah znovu načíst. Pokud se dozví „změnila se tato složka“, znovu načte jen tuto složku a ostatní ponechá beze změny.

Obě informace se odesílají nejvýše několikrát za sekundu. Skenování, které importuje tisíc souborů, proto nevytvoří tisíc oznámení. Změny se shromažďují a odesílají společně v několika zprávách.

Typické situace, kdy k tomu dochází:

- ve sdílené složce se objeví soubor nebo z ní zmizí
- z řídicího bodu [upravíte seznam skladeb](./playlist-editing)
- některou položku ohodnotíte, čímž se změní obsah složek s hodnocením
- ke stanici nebo složce přidáte obrázek

Zda aplikace na oznámení zareaguje, záleží na ní. Většina aplikací obnoví právě zobrazený obsah; některé informaci využijí až při opětovném otevření složky. Pokud se změna neprojeví, zkuste složku otevřít znovu, než usoudíte, že oznámení nebylo doručeno.

## Jaké informace UMS odebírá z přehrávačů

V opačném směru se UMS přihlašuje k odběru oznámení z vašich **přehrávačů**, aby mohl zobrazovat jejich stav — co právě hrají, zda je přehrávání pozastavené a jaká je hlasitost — a nabídnout jejich ovládání.

```
# Sledovat stav přehrávačů v síti. Ve výchozím nastavení zapnuto.
upnp_subscribe_services = TRUE
```

Pokud přehrávání ovládáte z UMS, ponechte toto nastavení zapnuté.

Pokud přehrávání ovládá samostatný řídicí bod, vypněte je. V takovém uspořádání UMS nemá důvod přehrávače sledovat a přebírat jejich ovládání: to už zajišťuje řídicí bod. Pokud stejné zařízení ovládají dva různé programy, může být výsledné chování matoucí. Po vypnutí tohoto nastavení UMS přehrávače neovládá a pouze poskytuje média.

Podobu tohoto uspořádání popisuje část [Uspořádání se dvěma a třemi zařízeními](./control-point-setups).
