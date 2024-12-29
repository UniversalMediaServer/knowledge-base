# Cách cải thiện khả năng hỗ trợ cho thiết bị của mình

Nếu thiết bị của bạn không thực hiện được bất kỳ thao tác nào, chẳng hạn như duyệt thư mục hoặc phát tệp, bạn có thể khắc phục bằng cách thay đổi cài đặt trong tệp cấu hình trình kết xuất. Các thiết bị/trình kết xuất/máy khách khác nhau giao tiếp với các máy chủ như UMS theo những cách khác nhau, do đó, tệp cấu hình sẽ cho UMS biết cách giao tiếp cùng ngôn ngữ với thiết bị của bạn.

Every configuration profile serves two purposes:
- Allow UMS to recognize a specific renderer when it tries to connect
- Define the possibilities of that renderer

Chúng tôi có tệp cấu hình trình kết xuất mặc định chứa tài liệu về tất cả cài đặt trình kết xuất của chúng tôi. Xem phiên bản mới nhất tại https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

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

1. Ngoài ra, bạn có thể xem các cấu hình trình kết xuất khác trong thư mục "renderers" trong thư mục cài đặt của mình để xem chúng đang làm gì. Đôi khi bạn sẽ cần trợ giúp mà chúng tôi có thể cung cấp cho bạn trên diễn đàn của chúng tôi và hãy nhớ cho chúng tôi biết về cải tiến khi bạn thực hiện để những người dùng khác sử dụng thiết bị của bạn có thể hưởng lợi từ bản sửa lỗi. Chúng tôi sẽ ghi công bạn trong thông báo phát hành và nhật ký thay đổi của chúng tôi.
