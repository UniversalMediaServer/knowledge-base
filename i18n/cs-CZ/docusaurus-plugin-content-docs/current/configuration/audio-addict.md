# Internetová rádia sítě Audio Addict

**Audio Addict Network** je síť prémiových internetových rozhlasových stanic, která zahrnuje:

Classical Radio, Radio Tunes, Rock Radio, Jazz Radio, Zen Radio a DI.fm.

Pro přístup k těmto rozhlasovým stanicím je nutný placený **prémiový účet**. Stačí se zaregistrovat na jednom z těchto webů. Stejné uživatelské jméno a heslo pak umožní přístup ke všem ostatním.

UMS automaticky načítá všechny dostupné rozhlasové weby sítě AudioAddict, jejich kanály a filtry. Podporován je také kanál **Oblíbené**.

## Nastavení

Chcete-li zapnout podporu AudioAddict, přidejte do souboru `UMS.conf` následující řádky:

```
# TRUE = upřednostnit evropský streamovací server
audio_addict_europe = TRUE or FALSE

# Vaše uživatelské jméno
audio_addict_user = USERNAME

# Vaše heslo
audio_addict_pass = PASSWORD
```

## Umístění

Složku **Audio Addict Radio Network** najdete ve své knihovně médií. Můžete v ní procházet všechny dostupné stanice a přímo je přehrávat.

## Pořady a epizody

Kromě živého vysílání nabízí síť DI.fm také složku **Události**. Obsahuje přehled nadcházejících pořadů. U již odvysílaných pořadů nabízí také záznam, který si můžete poslechnout později.

Pořady s archivem mají vlastní složku se staršími epizodami. Některé pořady mají stovky epizod, proto je složka rozdělena do menších skupin označených čísly a daty epizod, které obsahují.

```
# Počet epizod v jedné skupině, po jehož překročení se skupina rozdělí. Výchozí hodnota 20, minimum 1.
audio_addict_episodes_per_container = 20
```

Sestavení seznamu vyžaduje načtení událostí a epizod jednotlivých pořadů ze služby, což chvíli trvá. UMS si odpověď uchovává, aby ji nemusel znovu načítat při každém procházení nebo spuštění přehrávání:

```
# Jak dlouho se seznamy pořadů a epizod znovu používají, v minutách.
# Výchozí hodnota 60. Hodnota 0 znamená dotaz na službu při každém použití.
audio_addict_tree_cache_ttl_minutes = 60
```

Delší doba zrychluje procházení, kratší umožňuje dříve zobrazit nově zveřejněné epizody. Adresy, které UMS získává, zůstávají platné mnohem déle než výchozí jednu hodinu, takže není nutné nastavovat nízkou hodnotu.

## Názvy právě přehrávaných skladeb

Stanice Audio Addict neposílají název aktuální skladby přímo v audio streamu. UMS se proto dotazuje služby a výsledek předává přehrávači, takže stále vidíte, co právě hraje. Podrobnosti najdete v části [Internetová rádia a názvy právě přehrávaných skladeb](./internet-radio).

```
# Předávat názvy právě přehrávaných skladeb ze stanic Audio Addict. Ve výchozím nastavení zapnuto.
audio_addict_icy_metadata = TRUE
```

## Výběrové seznamy skladeb

Výběrové seznamy skladeb přehrávají jednu skladbu za druhou z vašeho účtu. Když seznam dohraje do konce, UMS jej může místo zastavení spustit znovu:

```
# Po dohrání výběrového seznamu skladeb jej spustit znovu. Ve výchozím nastavení vypnuto.
audio_addict_playlist_loop = FALSE
```

## Přehled všech nastavení

| Nastavení                             | Výchozí hodnota | Účel                                                 |
| ------------------------------------- | --------------- | ---------------------------------------------------- |
| `audio_addict_user`                   | —               | Uživatelské jméno vašeho účtu                        |
| `audio_addict_pass`                   | —               | Vaše heslo                                           |
| `audio_addict_europe`                 | `TRUE`          | Upřednostnit evropský streamovací server             |
| `audio_addict_icy_metadata`           | `TRUE`          | Předávat přehrávači názvy právě přehrávaných skladeb |
| `audio_addict_episodes_per_container` | `20`            | Počet epizod ve skupině před jejím rozdělením        |
| `audio_addict_tree_cache_ttl_minutes` | `60`            | Doba opětovného používání seznamů pořadů a epizod    |
| `audio_addict_playlist_loop`          | `FALSE`         | Po dohrání opakovat výběrový seznam skladeb          |
