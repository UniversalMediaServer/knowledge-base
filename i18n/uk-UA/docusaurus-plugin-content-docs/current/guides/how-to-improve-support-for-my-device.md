# Як покращити підтримку мого пристрою

Якщо ваш пристрій не функціонує належним чином – наприклад, не вдається переглядати теки або відтворювати файли – можливо, ви зможете розв'язати цю проблему шляхом зміни налаштувань у файлі конфігурації програвача. Різні пристрої/програвачі/клієнти по-різному взаємодіють із серверами, подібними до UMS, тому файл конфігурації вказує UMS, як саме налагодити взаємодію з вашим пристроєм.

Кожен профіль конфігурації слугує двом цілям:
- Дозволяє UMS розпізнавати конкретний програвач під час спроби підключення
- Визначає можливості такого програвача

Ми маємо файл конфігурації типового програвача, котрий містить документацію щодо всіх наших налаштувань. Ознайомтеся з останньою версією за посиланням → https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

## Додавання підтримки для невідомого пристрою

Якщо UMS не розпізнає ваш пристрій, це означає, що жоден із профілів конфігурації програвача не відповідає вашому пристрою. В результаті UMS показує повідомлення `Невідомий програвач`, і, оскільки він не знає можливостей вашого програвача, то й не може забезпечити оптимізований вивід для вашого пристрою.

Відповідь полягає в тому, щоб спробувати створити власний файл конфігурації програвача.
1. Створіть копію файлу .conf, який є найближчим до вашого пристрою. Приміром, якщо ваш телевізор Samsung не розпізнається, для початку варто спробувати одну з конфігурацій для телевізорів Samsung іншої моделі.

1. Перейдіть на вкладку `Журнали` в UMS і знайдіть текст `Медіапрогравач не було розпізнано. Можливе розпізнання заголовків HTTP:`. Саме ця інформація необхідна для того, щоб система UMS розпізнала ваш пристрій.

1. In your new .conf file, look for the line that defines `UserAgentSearch` and/or `UpnpDetailsSearch` and replace the values with that identifying information.

1. Browse and play some media on your device. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Improving support for a device

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

1. As well as that, you can have a look at other renderer configs inside the "renderers" folder in your installation directory, to see what they are doing. Sometimes you will need help, which we can give you on our forum, and please remember to tell us about the improvement when you make it, so that other users with your device can benefit from the fix. We will credit you in our release announcement and changelog.
