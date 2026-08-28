# UPnP-служба медиасервера UMS

UMS предоставляет расширенную UPnP-службу, через которую внешние точки управления могут взаимодействовать с дополнительными возможностями системы.

## Использование

Служба доступна в пространстве имён `schemas-upnp-org` с типом службы `UmsExtendedServices`.

Для Java-точек управления, использующих JUPnP, вызовите `findService` на `RemoteDevice` UMS:

```java
RemoteService umsServicesService = remoteDevice.findService(
    new ServiceType("schemas-upnp-org", "UmsExtendedServices"));
```

Через этот интерфейс службы доступны следующие действия

## Взаимодействие с MyMusic

К понравившимся альбомам можно перейти, используя идентификатор объекта `MYMUSIC$` как глубокую ссылку, или через раздел `My Albums` в корневой папке.

Поддержание избранного особенно полезно в больших коллекциях альбомов, где ручной просмотр всей библиотеки может занимать много времени. Список понравившихся альбомов помогает пользователям быстро возвращаться к нужному контенту без повторных широких поисков или глубокой навигации по папкам.

На практике избранное даёт следующие преимущества:

- Более быстрый доступ к часто проигрываемым альбомам, даже в очень больших библиотеках.
- Улучшение повседневной навигации за счёт отделения предпочитаемого контента от полного каталога.
- Более согласованные сценарии воспроизведения для клиентов и автоматизаций, зависящих от стабильного выбора альбомов.

### Входные параметры

Все действия в этом разделе требуют входной параметр. Альбом должен быть идентифицирован с помощью MusicBrainz ID или Discogs release ID. Необходимо указать как минимум один ID; в противном случае действие не будет выполнено.

Пример для альбома Мадонны `Like a Virgin`:

| Атрибут       |            Тип           |            Пример значения           |
| :------------ | :----------------------: | :----------------------------------: |
| MusicBrainzId |          String          | b69580b9-7050-3994-b544-4407a22c097a |
| DiscogsId     | UnsignedIntegerFourBytes |                1069538               |

:::caution
Если при добавлении альбома в понравившиеся были указаны оба параметра (`MusicBrainzId` и `DiscogsId`), то при удалении из понравившихся также необходимо указать оба.
:::

### LikeAlbum

Отмечает музыкальный альбом как понравившийся.

### DislikeAlbum

Удаляет отметку «понравившийся» у музыкального альбома.

### IsAlbumLikedInput

Checks whether an album is currently marked as liked. If both MusicBrainz and Discogs IDs are provided, the method returns `true` if at least one of the IDs is marked as liked.

## Backup Actions

The service provides backup and restore actions.

:::info
A backup must be created before a restore can be performed.
:::

### BackupAudioLikes

Creates a backup of the `liked` audio albums table identified by MusicBrainz or Discogs IDs.

### RestoreAudioLikes

Restores the liked albums table. Call `BackupAudioLikes` before running this action.

### BackupRatings

Writes audio rating data to a backup file containing the file hash and rating value.

### RestoreRatings

Restores rating information from a backup created with `BackupRatings`.

## Library Interactions

### RescanMediaStore

Rescans the entire music library.

### RescanMediaStoreFolder

Rescans a specific folder without recursion. The input parameter must be the folder's `ObjectID`.

