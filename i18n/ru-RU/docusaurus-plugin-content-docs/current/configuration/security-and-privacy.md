# Безопасность и конфиденциальность

UMS is a DLNA server. Now DLNA is a protocol that doesn't have any real notion of a "user". You don't have to "logon" to your TV for example. This leads to that all renderers get access to the same data. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want restrict the renderers in the kids room to only have access to the kids_safe folder. UMS provides a number of methods to control the access. 

## IP filter

IP filtering is the most restrictive method that UMS provides. To use you supply a comma-separated list of IP-addresses that are allowed to connect. A render whose address does not match the entries in the list will simply get its traffic discarded (very early by UMS). It will not be able to access ANY folders (it will not even see a root folder). Use this method to block out the kids altogether. See description of ip_filter in UMS.conf for more details.

Example to allow only 2 addresses

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## Разрешенный список

Разрешить перечисление - это метод, который позволяет вам настраивать корневую папку для каждого рендера. This makes it possible to share different folder sets to different renderers. Он работает следующим образом: для вашего UMS.conf (в настоящее время нет графических настроек) вы добавляете строки тегов формата. ption = значение, в котором тег является IP адресом или именем рендера. Имя рендеринга должно быть с пробелами изменено на _ (подчеркивание). Этот вариант является одним из

- папки
- vfolders
- Web
- скрыть

Значение зависит от опции. Последние 4 - логические значения. for folders and virtualfolders it is a list of folders.

Пример

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\\child_safe
192.168.1.1.hide_set = true
```

Это будет для IP-адреса 192.168.1.1:

- Share the folder c:\child_safe
- Скрывать папку "Настройки сервера"
- Скрыть список недавно воспроизведенных

All other renderers will use the "global" settings i.e. see all folders, and the Server Settings.

If an option is not present it will fallback to the "global" config or if that isn't present to the default value.

## UMS.deny

The whitelist can only modify the rootfolder appearance. But if you have mixed things (you have 10 folders but only one should be restricted to the kids). To control access to individual folders (or media) you can use the UMS.deny. It works as follows: Add a file called UMS.deny into the same directory as your UMS.conf file and inside that file add tag.[name|file|sys]=regex For each folder/file that should be added, UMS will apply the regular expression to the folder name or filename and if the regular expression matches the folder/file will NOT be added. Например:
```
192.168.1.1.name=.*private.*
```

will remove all folders/files which has the word private in it.
```
192.168.1.1.file=c:\\tst.*
```

will remove all files that have c:\tst in their path etc.

If no rule are set in the "UMS.deny" file, the files/folders will be added.

Скрытые папки

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

Чтобы скрыть веб-папку, вам нужно снять галочку Включение внешней сети во вкладке Общие настройки с расширенного GUI режима или изменить значение `external_network =' на false в вашем UMS. onf файл. Это даст побочный эффект и автоматическое обновление не будет работать. Изменения, сделанные из интерфейса, будут действовать после перезапуска.

## PIN-код

Все вышеперечисленные методы ограничивают доступ к различным устройствам. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). PIN-код решает эту проблему. Он позволяет скрыть папки/медиа за PIN-кодом, который необходимо ввести с помощью рендера. По умолчанию ввод представляет собой последовательность цифр (0-9) точно так же, как код банкомата. Я настоятельно предлагаю, чтобы вы использовали цифровые коды, по мере того как становится трудно напечатать из рендерера. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. Например:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
