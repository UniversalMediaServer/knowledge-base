# デバイスのサポートを改善する方法

デバイスがフォルダの閲覧やファイルの再生などを実行できない場合、レンダラーの設定ファイルの設定を変更することで修正できるかもしれません。 デバイス/レンダラー/クライアントによってUMSのようなサーバーとのやり取りの方法はさまざまです。そのため、設定ファイルは、UMSがあなたのデバイスと同じ「言語」でやり取りできるように指示します。

すべての構成ファイルには以下の二つの目的があります。
- 接続を試行するレンダラーをUMSが特定できるようにする
- そのレンダラーの機能を定義する

すべてのレンダラー設定項目について解説を含む、デフォルトのレンダラー設定ファイルがあります。 最新バージョンはhttps://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.confをご覧ください。

## 認識されないデバイスへの対応

UMSがデバイスを認識しない場合、いずれのレンダラー構成プロファイルもそのデバイスに一致していません。 その結果、UMSは`不明なレンダラー（=Unknown Renderer）`として表示し、レンダラーの機能が分からないため、そのデバイス向けに最適化した出力を提供できません。

解決策は、独自のレンダラー構成ファイルを作成してみることです。
1. お使いのデバイスに最も近い.confファイルをコピーします。 たとえば、Samsungのテレビが認識されない場合は、Samsung TVの構成のいずれかを出発点として選ぶとよいでしょう。

1. Go to the `Logs` tab in UMS and look for the text `Media renderer was not recognized. Possible identifying HTTP headers:`. That information is what is needed to make UMS recognize your device.

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
