# Cách cải thiện khả năng hỗ trợ cho thiết bị của mình

Nếu thiết bị của bạn không thực hiện được bất kỳ thao tác nào, chẳng hạn như duyệt thư mục hoặc phát tệp, bạn có thể khắc phục bằng cách thay đổi cài đặt trong tệp cấu hình trình kết xuất. Các thiết bị/trình kết xuất/máy khách khác nhau giao tiếp với các máy chủ như UMS theo những cách khác nhau, do đó, tệp cấu hình sẽ cho UMS biết cách giao tiếp cùng ngôn ngữ với thiết bị của bạn.

Chúng tôi có tệp cấu hình trình kết xuất mặc định chứa tài liệu về tất cả cài đặt trình kết xuất của chúng tôi. Xem phiên bản mới nhất tại https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf

Các cài đặt phổ biến cần xem xét là `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize` và `ChunkedTransfer`.

Ngoài ra, bạn có thể xem các cấu hình trình kết xuất khác trong thư mục "renderers" trong thư mục cài đặt của mình để xem chúng đang làm gì. Đôi khi bạn sẽ cần trợ giúp mà chúng tôi có thể cung cấp cho bạn trên diễn đàn của chúng tôi và hãy nhớ cho chúng tôi biết về cải tiến khi bạn thực hiện để những người dùng khác sử dụng thiết bị của bạn có thể hưởng lợi từ bản sửa lỗi. Chúng tôi sẽ ghi công bạn trong thông báo phát hành và nhật ký thay đổi của chúng tôi.

Nếu bạn có cấu hình trình kết xuất mới để đóng góp cho dự án, vui lòng tạo **Pull Request** trên kho lưu trữ GitHub của chúng tôi https://github.com/UniversalMediaServer/UniversalMediaServer
