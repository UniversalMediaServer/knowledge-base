# Bezpieczeństwo i prywatność

## Wstęp

UMS udostępnia media na dwa główne sposoby - poprzez DLNA/UPnP do odtwarzania przez aplikacje dedykowane oraz przez HTTP(S) do odtwarzania przez przeglądarki internetowe.

Przeglądarki internetowe mają łatwą kontrolę bezpieczeństwa i prywatności, posiadając konta użytkowników z loginami.

Aplikacje odtwarzaczy multimediów na ogół nie obsługują pojęcia "użytkownika", więc zwykle każde urządzenie otrzymuje tę samą zawartość. Możliwe, że takie rozwiązanie nie będzie dla ciebie pożądane. Na przykład, jeśli masz dwa foldery kids_safe i kids_unsafe możesz chcieć ograniczyć dostęp dla odtwarzaczy w pomieszczeniu dzieci tylko do folderu kids_safe. Inną powszechnym przypadkiem bycie w tej samej sieci z ludźmi, jak np. lokatorzy, z którymi nie chcesz dzielić się swoimi mediami, więc chciałbyś całkowicie blokować dostęp dla niektórych odtwarzaczy.

UMS zapewnia szereg metod kontroli dostępu w tych sytuacjach.

## Zezwalaj lub blokuj odtwarzacze lub urządzenia sieciowe domyślnie.
Możesz wybrać domyślną strategię dla odtwarzaczy i urządzeń sieciowych. Możesz udzielać lub blokować dostęp z wykorzystaniem list urządzeń blokowanych/dozwolonych.

Jest to użyteczne w sytuacji współdzielenia życia lub w przypadku publicznych sieci lokalnych z niezaufanymi użytkownikami. Jest to również przydatne dla tych, którzy używają adapterów PowerLine, ponieważ może to skutkować niepożądanym dostępem sąsiadów.

![Przykład jak ustawić dostęp na poziomie sieci](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Przykład jak ustawić dostęp na poziomie odtwarzacza](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Blokowanie/przydzielanie dostępu odtwarzaczom i urządzeniom sieciowym

Po wybraniu czy chcesz domyślnie zezwolić bądź blokować dostęp dla nierozpoznanych odtwarzaczy, możesz stworzyć własną listę blokowanych lub dozwolonych na ekranie głównym w zakładce ustawień.

![Przykład jak blokować odtwarzacz](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Przypisanie osoby do odtwarzacza

Możesz połączyć konta użytkowników z odtwarzaczami/ urządzeniami, dzięki czemu masz niezależny dostęp do treści i śledzenie odtwarzania.

Na przykład, jeśli masz telewizor w pokoju i inny w sypialni, telewizor w pokoju nie musi być powiązany z tym, co oglądasz w sypialni.

![Przykład jak przypisać konto do odtwarzacza](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Ogranicz udostępnioną zawartość do określonych grup

Możesz teraz wybrać którym grupom będą udostępniane katalogi lub treści online. Na przykład, jeśli masz osobę (lub urządzenie, które jest przypisane do osoby), która jest dzieckiem, możesz przypisać je do grupy "Dzieci", i dać tej grupie dostęp do katalogu "Rodzina", ale nie do treści "Horror" lub "Tylko dla dorosłych". Możesz także dać im dostęp do kanału Kurzgesagt, ale nie do podcastów historii.

![](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Ukrywanie folderów

Możesz kontrolować widoczność wirtualnych folderów. Te ustawienia można znaleźć w pliku UMS.conf. Aby ukryć niektóre foldery podczas przeglądania, po prostu ustaw ich wartość jako true lub zaznacz je w zakładce Ustawienia Nawigacji/Udostępniania z poziomu GUI.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Aby ukryć folder sieciowy, musisz odznaczyć Włącz zewnętrzną sieć w zakładce Ustawienia ogólne z trybu zaawansowanego GUI lub zmienić wartość `external_network =' na false w twoim pliku UMS.conf. Będzie to miało taki efekt uboczny, że automatyczna aktualizacja nie zadziała. Zmiany wprowadzone z interfejsu użytkownika zostaną zastosowane po ponownym uruchomieniu.

## Kod PIN

Powyższe metody ograniczają dostęp do mediów z poszczególnych odtwarzaczy. Jeśli jednak ktoś zdoła uzyskać dostęp do odtwarzacza, który ma dostęp do innych folderów, powyższe metody nie zapewnią ci pełnej kontroli (jeśli dzieci dostaną się do telewizora w salonie, który ma dostęp do wszystkich mediów, wtedy one też uzyskują dostęp do tych mediów). Kod PIN rozwiązuje ten problem. Pozwala na ukrycie folderów/mediów za barierą z kodem PIN, który musisz wprowadzić z poziomu odtwarzacza. Domyślnie wprowadza się sekwencję cyfr (0-9) podobną do kodu PIN w bankomacie. Sugerujemy stosowanie kodów złożonych z cyfr, ponieważ z poziomu odtwarzacza trudno będzie wpisywać inaczej. Jednakże, jeśli masz obawy, możesz stosować litery. Działa to w następujący sposób: Dodaj plik o nazwie UMS.code do tego samego katalogu co UMS.conf i w tym pliku dodaj regexp,code gdzie regexp jest wyrażeniem regularnym, tak jak w pliku "UMS.deny"  a code to kod, który zapewni dostęp do folderu/mediów. Nie ma wymaganej długości kodu Na przykład:
```
.*private.*,1234
```

Będzie wymagało wprowadzenia kodu jeśli folder/media zawierają wyrażenie "private" a prawidłowy kod to 1234. Kod zachowuje ważność przez 4 godziny (jeśli nie zmienisz tego czasu).

## Niestandardowa konfiguracja urządzenia

Każda właściwość konfiguracji może być osobno ustawiona dla każdego urządzenia poprzez tworzenie niestandardowej konfiguracji urządzenia, aby zastąpić domyślne ustawienia UMS (szczegóły patrz: Twoirzenie Niestandardowej Konfiguracji Urządzenia).

Na przykład, aby skonfigurować telewizor dzieci:
- Kliknij przycisk 'Skonfiguruj to urządzenie' w prawym górnym rogu panelu pop-up danego odtwarzacza i podaj nazwę dla tej konfiguracji.
- W nowym pliku conf, który się otworzy, dodaj dowolne ustawienia, które chcesz nadpisać dla danego telewizora, np. aby zmienić nazwę serwera i określić różne foldery:
```
#----------------------------------------------------------------------------
# Niestandardowy profil urządzenia
# Opisy wszystkich możliwych opcji dla odtwarzacza można znaleźć w pliku DefaultRenderer.conf
# a opcje programu w UMS.conf

# Opcje w tym pliku zastępują domyślne ustawienia dla konkretnych urządzeń Sony Bravia EX wymienionych poniżej.
# Określ urządzenia przez uuuid (lub adres, jeśli nie ma uuuid), oddzielone przecinkami, jeśli jest więcej niż jeden.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
