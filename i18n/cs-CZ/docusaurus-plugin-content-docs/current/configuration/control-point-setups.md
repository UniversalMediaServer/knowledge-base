# Uspořádání se dvěma a třemi zařízeními

UPnP rozlišuje dvě uspořádání součástí mediálního systému a UMS se v každém z nich chová jinak.

V uspořádání se **dvěma zařízeními** prochází knihovnu a přehrává média totéž zařízení: televizor, streamovací přehrávač nebo aplikace v telefonu, která zobrazí složky a pak sama přehraje skladbu. Zařízení, které žádá o seznam, je tedy stejné jako zařízení, které žádá o zvuková data.

V uspořádání se **třemi zařízeními** jsou tyto role oddělené. _Řídicí bod_ — aplikace v telefonu nebo webové rozhraní — zobrazuje knihovnu a dává _přehrávacímu zařízení_ pokyny k přehrávání. Zvuková data přes aplikaci vůbec neprocházejí; aplikace pouze sdělí přehrávači, odkud je má načíst. Toto uspořádání je běžné u hi-fi síťových přehrávačů: samostatné zařízení přehrává a vy je ovládáte odjinud.

## Proč musí UMS tyto případy rozlišovat

UMS volí způsob předání skladby podle schopností přijímajícího zařízení: přehrávač, který neumí dekódovat FLAC, dostane převedený stream; přehrávač, který to umí, dostane soubor beze změny.

V uspořádání se dvěma zařízeními je toto rozhodnutí snadné, protože o seznam požádalo právě zařízení, které bude přehrávat.
V uspořádání se třemi zařízeními to tak není: o seznam žádá telefon, zatímco o zvuková data žádá síťový přehrávač. Rozhodovat podle telefonu by bylo chybné — síťový přehrávač by dostal data ve formátu vhodném pro telefon.

## Jak je UMS rozlišuje

```
# Vyžadovat účty a přihlášení. Ve výchozím nastavení zapnuto.
authentication_enabled = TRUE
```

Při **zapnutém** ověřování UMS váže přehrávání na identitu použitou při procházení, aby uživatel mohl přehrávat právě to, k čemu má při procházení přístup. Toto chování je vhodné pro domácnost s více účty a přístupem nastaveným pro jednotlivé uživatele. Předpokládá uspořádání se dvěma zařízeními.

Při **vypnutém** ověřování UMS přestane předpokládat, že jde o stejné zařízení. Přehrávací zařízení určí až v okamžiku požadavku na zvuková data, a to z požadavku samotného — z adresy a údajů, kterými se zařízení identifikuje. O převodu pak rozhodne podle potřeb _tohoto_ zařízení. Identitu uvedenou v požadavku na procházení pak chápe jako řídicí bod, kterým skutečně je.

I dvě zařízení se stejnou adresou lze rozlišit. K tomu dochází, když řídicí bod a přehrávač běží na stejném počítači. UMS je rozpozná podle údajů, kterými se identifikují, nikoli jen podle adresy.

## Volba nastavení

Obě nastavení mají své využití; pro maximální kompatibilitu ověřování **vypněte**. Za cenu toho však UMS nebude používat účty: nebude možné řídit přístup jednotlivých uživatelů a vše, co UMS sdílí, bude viditelné pro všechna zařízení v síti, která se k němu mohou připojit. Pokud je to problém, omezte, která zařízení se smějí k UMS vůbec připojit — viz [Zabezpečení a soukromí](/configuration/security-and-privacy).

Ověřování ponechte **zapnuté**, pokud přehrávače samy procházejí knihovnu i přehrávají nebo pokud potřebujete oddělit přístup jednotlivých uživatelů. Toto je výchozí nastavení.
