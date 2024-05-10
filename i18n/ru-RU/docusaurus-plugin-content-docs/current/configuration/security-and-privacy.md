# Безопасность и конфиденциальность

## Introduction

UMS serves media in two main ways - via DLNA/UPnP to be consumed via media player apps, and via HTTP(S) to be consumed via web browsers.

Web browsers have easy security and privacy control by having user accounts with logins.

Media player apps do not generally support the concept of a "user", so usually every device gets the same content. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want to restrict the renderers in the kids' room to only have access to the kids_safe folder. Another common situation is you are on the same network as people you do not want to have access to your media, like flatmates, so you want to block certain renderers completely.

UMS provides a number of methods to control access in those situations.

## Allow or block renderers or network devices by default
You can choose the default strategy for renderers and network devices. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Скрытые папки

Управление видимостью виртуальных папок. Эти настройки можно найти в файле UMS.conf. Чтобы скрыть некоторые папки во время просмотра, просто установите значение "true" или установите галочку на вкладке "Навигация/общий доступ " в расширенном режиме GUI.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Чтобы скрыть веб-папку, вам нужно снять галочку Включение внешней сети во вкладке Общие настройки с расширенного GUI режима или изменить значение `external_network =' на false в вашем UMS. Это даст побочный эффект и автоматическое обновление не будет работать. Изменения, сделанные из интерфейса, будут действовать после перезапуска.

## PIN-код

Все вышеперечисленные методы ограничивают доступ к различным устройствам. Но если вы можете получить доступ к рендеру, которому разрешено просматривать папку, эти методы вам не помогут (если у детей есть доступ к телевизору в гостиной, у которого есть доступ ко всем носителям, то у них есть доступ к этому носителю). PIN-код решает эту проблему. Он позволяет скрыть папки/медиа за PIN-кодом, который необходимо ввести с помощью рендера. По умолчанию ввод представляет собой последовательность цифр (0-9) точно так же, как код банкомата. Я настоятельно предлагаю, чтобы вы использовали цифровые коды, по мере того как становится трудно напечатать из рендерера. Но если вы слишком параноидальны, вы можете добавить буквы. Это работает следующим образом: Добавьте файл с именем UMS.code в тот же каталог, что и ваш UMS.conf, и к этому файлу добавьте regexp, код, где regexp - это регулярное выражение, как в файле "UMS.deny", а code - это код, который предоставит доступ к папке / носителю. В коде нет никаких ограничений по длине. Например:
```
.*частный.*,1234
```

Заставит вас ввести код, если папка/носитель содержит слово "приватный", а правильный код - 1234. Затем код остается действительным в течение 4 часов (если вы не измените это время).

## Пользовательская конфигурация устройства

Любое свойство конфигурации также можно задать для каждого устройства, создав пользовательскую конфигурацию устройства, чтобы переопределить настройки UMS по умолчанию (более подробную информацию смотрите в разделе Создание пользовательской конфигурации устройства).

Например, чтобы настроить детский телевизор:
- Нажмите кнопку "Настроить это устройство" в правом верхнем углу всплывающей панели графического интерфейса средства визуализации и укажите имя для конфигурации.
- В открывшемся новом файле conf добавьте любые настройки, которые вы хотите переопределить для телевизора, например, изменить имя сервера и указать разные папки:
```
#----------------------------------------------------------------------------
# Пользовательский профиль устройства
# Смотрите DefaultRenderer.conf для описания всех возможных параметров средства визуализации
# и UMS.conf для параметров программы.

# Параметры в этом файле переопределяют настройки по умолчанию для конкретных устройств Sony Bravia EX, перечисленных ниже.
# Укажите устройства по uuid (или адресу, если uuid отсутствует), разделяя их запятыми, если их больше одного.

устройство = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
имя_сервера = Kid Stuff
Папки с настройками для детей = c:\kids\stuff , c:\kids\otherstuff
```
