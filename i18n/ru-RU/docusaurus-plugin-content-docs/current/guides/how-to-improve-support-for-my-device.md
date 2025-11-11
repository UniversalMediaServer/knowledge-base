# Как улучшить поддержку устройства

Если ваше устройство не функционирует, например, не может просматривать папки или воспроизводить файлы, можно попробовать это исправить, изменив настройки в конфигурационном файле рендерера. Различные устройства/рендереры/клиенты взаимодействуют с серверами типа UMS по-разному, так что конфигурационный файл сообщает UMS о том, как говорить на том же языке, что и ваше устройство.

Каждый профиль конфигурации служит двум целям:
- Разрешить UMS распознавать конкретный рендерер при попытке подключения
- Определить возможности этого рендерера

У нас есть стандартный конфигурационный файл, содержащий документацию по всем настройкам рендерера. Его новейшая версия доступна тут: https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Добавление поддержки для неопознанного устройства

Если UMS не распознает ваше устройство, это значит, что ни один из конфигурационных профилей рендерера не соответствует вашему устройству. Результатом является то, что UMS отображает `Неизвестный рендерер`, и так как он не знает возможности вашего рендерера, он не может обеспечить оптимизированный вывод для вашего устройства.

The solution is to try creating your own renderer configuration file.
1. Make a copy of the .conf file that is closest to your device. For example, if your Samsung TV is not recognized, one of the Samsung TV configs might be a good place to start from.

1. Go to the `Logs` tab in UMS and look for the text `Media renderer was not recognized. Possible identifying HTTP headers:`. That information is what is needed to make UMS recognize your device.

1. In your new .conf file, look for the line that defines `UserAgentSearch` and/or `UpnpDetailsSearch` and replace the values with that identifying information.

1. Browse and play some media on your device. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Улучшение поддержки устройства

1. If any of your media has a problem playing, the renderer config should be modified until it works. Refer to [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) for the full list of options. The most common ones to change are:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Make sure you do not have `MediaInfo = false` in your new config, because that will stop the `Supported` lines from working.

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Кроме того, вы можете ознакомиться с другими настройками рендерера в папке "renderers" в каталоге установки. Иногда вам нужна помощь, которую мы можем оказать на нашем форуме, только не забудьте сообщать нам об улучшениях, чтобы исправление было полезно другим пользователи с таким же устройством, как у вас. Мы упомянем вас в объявлении о выходе новой версии и списке изменений.
