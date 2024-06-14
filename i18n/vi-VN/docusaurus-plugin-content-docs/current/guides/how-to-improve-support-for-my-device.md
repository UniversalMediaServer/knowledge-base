# How to improve support for my device

Nếu thiết bị của bạn không thực hiện được bất kỳ thao tác nào, chẳng hạn như duyệt thư mục hoặc phát tệp, bạn có thể khắc phục bằng cách thay đổi cài đặt trong tệp cấu hình trình kết xuất. Các thiết bị/trình kết xuất/máy khách khác nhau giao tiếp với các máy chủ như UMS theo những cách khác nhau, do đó, tệp cấu hình sẽ cho UMS biết cách giao tiếp cùng ngôn ngữ với thiết bị của bạn.

We have a default renderer config file that contains documentation on all of our renderer settings. See the latest version at https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Common settings to look at are `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, and `ChunkedTransfer`.

As well as that, you can have a look at other renderer configs inside the "renderers" folder in your installation directory, to see what they are doing. Sometimes you will need help, which we can give you on our forum, and please remember to tell us about the improvement when you make it, so that other users with your device can benefit from the fix. We will credit you in our release announcement and changelog.

If you have a new renderer config to contribute to the project, please create a **Pull Request** on our GitHub repository https://github.com/UniversalMediaServer/UniversalMediaServer
