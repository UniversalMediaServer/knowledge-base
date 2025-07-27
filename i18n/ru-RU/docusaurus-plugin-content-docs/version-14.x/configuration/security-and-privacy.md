# Безопасность и конфиденциальность

## Вступление

UMS предоставляет медиафайлы двумя основными способами - через DLNA/UPnP для использования в приложениях медиаплеера и через HTTP (ы) для использования в веб-браузерах.

Веб-браузеры обеспечивают легкий контроль безопасности и конфиденциальности благодаря наличию учетных записей пользователей с логинами для входа в систему.

Приложения для медиаплееров обычно не поддерживают концепцию "пользователь", поэтому каждое устройство получает один и тот же контент. Возможно, это не то, чего вы хотите. Например, если у вас есть две папки kids_safe и kids_unsafe, вы можете захотеть ограничить доступ средств визуализации в детской комнате, чтобы они имели доступ только к папке kids_safe. Другая распространенная ситуация заключается в том, что вы находитесь в одной сети с людьми, которым вы не хотите предоставлять доступ к своим МЕДИА, например, с соседями по квартире, поэтому вы хотите полностью заблокировать определенные средства визуализации.

UMS предоставляет ряд методов для контроля доступа в таких ситуациях.

## Разрешить или блокировать средства визуализации или сетевые устройства по умолчанию:
Вы можете выбрать стратегию по умолчанию для средств визуализации и сетевых устройств. Теперь вы можете разрешать или запрещать по умолчанию, используя списки запрещений и списки разрешений, для полного контроля.

Это делает UMS гораздо более гибкими в ситуациях совместного использования или в локальных сетях с высоким/низким уровнем доверия. Это также полезно для тех, кто использует сетевые адаптеры для своей сети, поскольку это может привести к нежелательному доступу со стороны соседей.

![Пример того, как настроить параметры доступа к сети](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Пример того, как задать параметр "Разрешить визуализацию"](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Блокировать/разрешать средства визуализации и сетевые устройства

После того как вы выбрали, разрешать или блокировать нераспознанные средства визуализации по умолчанию, вы можете создать свой список запрещенных или разрешенных средств отображения на главном экране в области настроек.

![Пример того, как заблокировать средство визуализации](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Привязать пользователя к устройству визуализации

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Ограничить доступ к общему контенту для определенных групп

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Скрытые папки

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN-код

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*частный.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Пользовательская конфигурация устройства

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
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
