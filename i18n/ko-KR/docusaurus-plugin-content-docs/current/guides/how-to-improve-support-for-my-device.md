# 내 장치에 대한 지원을 개선하는 방법

장치에서 폴더를 검색하거나 파일을 재생하는 등의 작업을 수행하지 못하는 경우 렌더러 구성 파일의 설정을 변경하여 수정할 수 있습니다. 서로 다른 장치/렌더/클라이언트는 UMS와 같은 서버와 서로 다른 방식으로 통신하므로 구성 파일은 UMS에 장치와 동일한 언어를 사용하는 방법을 알려줍니다.

Every configuration profile serves two purposes:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

모든 렌더러 설정에 대한 문서가 포함된 기본 렌더러 구성 파일이 있습니다. https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf 에서 최신 버전을 참조하십시오

## Adding support for an unrecognized device

When UMS does not recognize your device, it means none of the renderer configuration profiles match your device. The result is that UMS displays an `Unknown Renderer`, and since it does not know the possibilities of your renderer, it cannot provide optimized output for your device.

The solution is to try creating your own renderer configuration file.
1. Make a copy of the .conf file that is closest to your device. For example, if your Samsung TV is not recognized, one of the Samsung TV configs might be a good place to start from.

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

1. 뿐만 아니라 설치 디렉토리에 있는 "렌더" 폴더 내의 다른 렌더 구성을 보고 렌더가 수행하는 작업을 확인할 수 있습니다. 때로는 도움이 필요할 수 있으며, 포럼에서 드릴 수 있으며, 장치를 사용하는 다른 사용자가 수정을 통해 혜택을 받을 수 있도록 개선 사항에 대해 말씀해 주시는 것을 기억하시기 바랍니다. 출시 발표 및 변경 로그에 귀하의 공을 돌리겠습니다
