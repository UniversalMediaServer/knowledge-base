# API bên ngoài

API bên ngoài cho phép các chương trình truy cập hoặc kích hoạt các chức năng của UMS thông qua các lệnh gọi HTTP.

## Cách bật API bên ngoài

Chỉnh sửa file UMS.conf và cấu hình api_key như sau:

`api_key = secret_password`

Mật khẩu bí mật phải có tối thiểu 12 ký tự.

## Cách sử dụng API

Khi API bên ngoài được bật, bạn có thể truy cập API bằng lệnh POST tới đường dẫn /api/COMMAND

### Quét thư mục

#### rescan

| Mục đích                    | Quét lại toàn bộ thư viện.        |
| --------------------------- | --------------------------------- |
| URI                         | `/api/folderscanner/rescan`       |
| Nội dung POST               | KHÔNG CÓ                          |
| Ví dụ / mô tả nội dung POST | Lệnh này không cần nội dung POST. |
| Có từ phiên bản             | 10.4.2                            |

::info  
Thao tác này có thể chậm đối với các thư viện lớn.
:::

Ví dụ:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" http://localhost:5001/api/folderscanner/rescan
```

#### Quét lại tệp hoặc thư mục

| Mục đích                    | Quét lại một phần cây thư mục của hệ thống tập tin.                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                         | `/api/folderscanner/rescanFileOrFolder`                                                                        |
| Nội dung POST               | PATH_TO_SCAN                                                                                                 |
| Ví dụ / mô tả nội dung POST | ví dụ: "/music/pop/Madonna". Đường dẫn phải là thư mục gốc hoặc thư mục con của một đường dẫn đã được chia sẻ. |
| Có từ phiên bản             | 10.4.2                                                                                                         |

Ví dụ:

```shell
curl -d "PATH_TO_SCAN" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/folderscanner/rescanFileOrFolder
```

### Thích nhạc (album và bài hát)

#### Thích bài hát

Bài hát sẽ được đánh dấu là đã thích.

| Mục đích                    | Thích một bài hát được xác định bằng trackId của MusicBrainz |
| --------------------------- | ------------------------------------------------------------ |
| URI                         | `<span class="s1">/api/like/likesong</span>`     |
| Nội dung POST               | `musicBrainz_trackID`                                        |
| Ví dụ / mô tả nội dung POST | b8695995-45e9-405d-b4aa-e50e8760fe25                         |
| Có từ phiên bản             | 10.20                                                        |

Ví dụ:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likesong
```

#### Bỏ thích bài hát

Bài hát sẽ không bị bỏ thích.

| Mục đích                    | Bỏ thích một bài hát được xác định bằng trackId của MusicBrainz |
| --------------------------- | --------------------------------------------------------------- |
| URI                         | `<span class="s1">/api/like/</span>dislikesong`     |
| Nội dung POST               | `musicBrainz_trackID`                                           |
| Ví dụ / mô tả nội dung POST | b8695995-45e9-405d-b4aa-e50e8760fe25                            |
| Có từ phiên bản             | 10.20                                                           |

Ví dụ

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikesong
```

#### Bài hát có đang được thích không

Kiểm tra xem bài hát có được thích hay không.

| Mục đích                    | Kiểm tra trạng thái thích của bài hát được xác định bằng trackId của MusicBrainz                |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| URI                         | `<span class="s1">/api/like/</span><span class="s1">issongliked</span>` |
| Nội dung POST               | `musicBrainz_trackID`                                                                           |
| Ví dụ / mô tả nội dung POST | b8695995-45e9-405d-b4aa-e50e8760fe25                                                            |
| Nội dung phản hồi           | `TRUE` or `FALSE`                                                                               |
| Có từ phiên bản             | 10.20                                                                                           |

Ví dụ:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/issongliked
```

Lệnh gọi này thêm trạng thái “đã thích” cho album được xác định bởi musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`

#### Thích album

Đặt trạng thái thích của album thành true.

| Mục đích                    | Thích một album được xác định bởi releaseID của MusicBrainz. |
| --------------------------- | ------------------------------------------------------------ |
| URI                         | `<span class="s1">/api/like/</span>likealbum`    |
| Nội dung POST               | `musicBrainz_releaseID`                                      |
| Ví dụ / mô tả nội dung POST | 1e0eee38-a9f6-49bf-84d0-45d0647799af                         |
| Có từ phiên bản             | 10.20                                                        |

Ví dụ:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/likealbum
```

#### Bỏ thích album

Xoá trạng thái thích của album.

| Mục đích                    | Bỏ thích một album được xác định bởi releaseID của MusicBrainz. |
| --------------------------- | --------------------------------------------------------------- |
| URI                         | `<span class="s1">/api/like/</span>dislikealbum`    |
| Nội dung POST               | `musicBrainz_releaseID`                                         |
| Ví dụ / mô tả nội dung POST | 1e0eee38-a9f6-49bf-84d0-45d0647799af                            |
| Có từ phiên bản             | 10.20                                                           |

Ví dụ:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/dislikealbum
```

Lệnh gọi này xoá trạng thái “đã thích” của album được xác định bởi musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af`

#### Album có được thích không

Kiểm tra trạng thái thích của album.

| Mục đích                    | Kiểm tra xem album được xác định bởi releaseID của MusicBrainz có được thích hay không. |
| --------------------------- | --------------------------------------------------------------------------------------- |
| URI                         | `<span class="s1">/api/like/</span>isalbumliked`                            |
| Nội dung POST               | `musicBrainz_releaseID`                                                                 |
| Ví dụ / mô tả nội dung POST | 1e0eee38-a9f6-49bf-84d0-45d0647799af                                                    |
| Nội dung phản hồi           | "TRUE" or "FALSE"                                                                       |
| Có từ phiên bản             | 10.20                                                                                   |

Ví dụ:

```shell
curl -d "1e0eee38-a9f6-49bf-84d0-45d0647799af" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/like/isalbumliked
```

Lệnh gọi này kiểm tra xem album được xác định bởi musicbrainz release-id `1e0eee38-a9f6-49bf-84d0-45d0647799af` có được thích hay không.

### Đánh giá

API đánh giá chịu trách nhiệm đánh giá các bài hát. Thông tin đánh giá được lưu trong cơ sở dữ liệu nội bộ (có bật bộ nhớ đệm) và tuỳ chọn lưu trực tiếp trong chính tệp tin. Nếu `audio_update_rating_tag = true` được thiết lập trong UMS.conf thì trường đánh giá IDv3 cũng sẽ được cập nhật trong tệp bài hát (nếu định dạng tệp được hỗ trợ).

Khi duyệt thư mục nội dung trên máy chủ, MusicBrainzTrackID (nếu có) và audiotrackID sẽ được cung cấp dưới dạng `desc` metadata mô tả trong phần tử DIDL.

#### Thiết lập đánh giá

| Mục đích            | Đặt đánh giá theo sao (0–5) cho bài hát được xác định bằng musicBrainz trackId                  |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">rating/setrating</span>` |
| Nội dung POST       | `musicbrainzTrackId` /`stars`                                                                   |
| Ví dụ / mô tả POST  | b8695995-45e9-405d-b4aa-e50e8760fe25/3                                                          |
| Có sẵn từ phiên bản | 10.20                                                                                           |

Ví dụ:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Lệnh gọi này thiết lập đánh giá người dùng cho tất cả bài hát được xác định bởi musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25` là `3`.

#### Lấy đánh giá

Đọc đánh giá bài hát từ cơ sở dữ liệu

| Mục đích            | Lấy đánh giá bài hát theo sao (0–5) dựa trên musicBrainz trackID. Nội dung phản hồi chứa thông tin đánh giá. Đọc đánh giá bài hát từ cơ sở dữ liệu |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">rating/getrating </span>`                                                   |
| Nội dung POST       | `musicbrainzTrackId`                                                                                                                               |
| Ví dụ / mô tả POST  | b8695995-45e9-405d-b4aa-e50e8760fe25                                                                                                               |
| Ví dụ RESPONSE BODY | 3                                                                                                                                                  |
| Có sẵn từ phiên bản | 10.20                                                                                                                                              |

Ví dụ:

```shell
curl -d "b8695995-45e9-405d-b4aa-e50e8760fe25" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getrating
```

Lệnh gọi này đọc đánh giá người dùng của bài hát được xác định bởi musicbrainz track-id `b8695995-45e9-405d-b4aa-e50e8760fe25`.

#### Đặt đánh giá theo audiotrack id

| Mục đích            | Đặt đánh giá theo sao (0–5) cho bài hát được xác định bằng audiotrackID nội bộ của UMS                         |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">rating/setRatingByAudiotrackId </span>` |
| Nội dung POST       | `trackID` /`stars`                                                                                             |
| Ví dụ / mô tả POST  | 32                                                                                                             |
| Có sẵn từ phiên bản | 11.0                                                                                                           |

Ví dụ:

```shell
curl -d "32/3" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/setrating
```

Lệnh gọi này thiết lập đánh giá người dùng của bài hát được xác định bởi audiotrack`id 32` là `3`.

#### Lấy đánh giá theo audiotrack id

Đọc đánh giá bài hát từ cơ sở dữ liệu

| Mục đích            | Lấy đánh giá bài hát theo sao (0–5) dựa trên audiotrackID nội bộ của UMS. Nội dung phản hồi chứa thông tin đánh giá. Đọc đánh giá bài hát từ cơ sở dữ liệu |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | `<span class="s1">/api/</span><span class="s1">rating/getRatingByAudiotrackId</span>`                                              |
| Nội dung POST       | trackId                                                                                                                                                    |
| Ví dụ / mô tả POST  | 32                                                                                                                                                         |
| Ví dụ RESPONSE BODY | 3                                                                                                                                                          |
| Có sẵn từ phiên bản | 11.0                                                                                                                                                       |

Ví dụ

```shell
curl -d "32" -w "%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/rating/getRatingByAudiotrackId
```

Lệnh gọi này đọc đánh giá người dùng của bài hát được xác định bởi UMS audiotrack-id `32`.

### Sao lưu / Khôi phục

Các mục “album đã thích” do người dùng quản lý có thể được sao lưu vào thư mục con `database_backup` trong thư mục hồ sơ. Tên tệp là `MUSIC_BRAINZ_RELEASE_LIKE`. Trong trường hợp cơ sở dữ liệu UMS bị xóa, chỉ cần gọi thao tác khôi phục. Trong trường hợp cơ sở dữ liệu UMS bị xóa, chỉ cần gọi thao tác khôi phục.

#### Sao lưu album đã thích

Sao lưu bảng `MUSIC_BRAINZ_RELEASE_LIKE` ra hệ thống tệp

| Mục đích          | Sao lưu các bài hát đã thích ra hệ thống tệp                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| URI               | `<span class="s1"><span class="s1">/api/like/</span></span>backupLikedAlbums` |
| Loại yêu cầu      | GET                                                                                                   |
| Nội dung phản hồi | `OK` hoặc thông báo lỗi                                                                               |
| Có từ phiên bản   | 10.20                                                                                                 |

Ví dụ:

```shell
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/backupLikedAlbums
```

Lệnh gọi này sẽ tạo một tệp sao lưu chứa các album đã được thích.

#### Khôi phục album đã thích

Khôi phục bảng `MUSIC_BRAINZ_RELEASE_LIKE` từ hệ thống tệp.

| Mục đích          | Khôi phục các bài hát đã thích từ tệp sao lưu.                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| URI               | `<span class="s1"><span class="s1"><span class="s1">/api/like/</span></span></span>restoreLikedAlbums` |
| REQUEST TYPE      | GET                                                                                                                                        |
| Nội dung phản hồi | `OK` hoặc thông báo lỗi                                                                                                                    |
| Có từ phiên bản   | 10.20                                                                                                                                      |

Ví dụ:

```
curl -w "%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/like/restoreLikedAlbums
```

Lệnh gọi này khôi phục tệp sao lưu.

### Danh sách phát

#### Bật dịch vụ

Chỉnh sửa UMS.conf và cấu hình thư mục danh sách phát được quản lý bằng cách thiết lập 

`<span class="s1">managed_playlist_folder</span> = PATH_TO_PLAYLIST_FOLDER`

để bật dịch vụ này. Theo mặc định, dịch vụ này bị tắt. Đường dẫn thư mục danh sách phát phải nằm bên dưới một đường dẫn `<span class="s1">thư mục</span>` chia sẻ đã được cấu hình để các thay đổi danh sách phát do API này thực hiện có thể được UMS nhận diện.

#### Liệt kê tất cả danh sách phát

Đọc các danh sách phát hiện có. Các tên danh sách phát này sẽ được dùng cho các lệnh tiếp theo để thêm hoặc xoá bài hát.

| Mục đích                | Cung cấp tất cả các danh sách phát được hỗ trợ (`m3u`, `m3u8` và `pls`) và hiện có từ thư mục đã cấu hình. Ngoài tên danh sách phát, `playlistId` của danh sách phát cũng được cung cấp. |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">getAllPlaylists</span>`          |
| Loại yêu cầu            | GET                                                                                                                                                                                      |
| Nội dung phản hồi       | Mảng JSON chứa tên các danh sách phát                                                                                                                                                    |
| Ví dụ nội dung phản hồi | `<span class="s1">["Pop","Jazz","Classic"]</span>`                                                                                                                           |
| Có từ phiên bản         | 11.0                                                                                                                                                                                     |

Ví dụ:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getAllPlaylists
```

Lệnh gọi này sẽ liệt kê tất cả các danh sách phát hiện có.

#### Liệt kê các danh sách phát mà máy chủ có thể truy cập

Đây là tất cả các danh sách phát mà UMS biết đến (có bật cơ sở dữ liệu/bộ nhớ đệm). Các tên danh sách phát này sẽ được dùng cho các lệnh tiếp theo để thêm hoặc xoá bài hát. Playlist ID có thể được dùng để truy cập trực tiếp vào danh sách phát bằng cách duyệt `objectId` `$DBID$PLAYLIST$` nối với databaseId.

| Mục đích            | Cung cấp tất cả các danh sách phát được hỗ trợ (`m3u`, `m3u8` và `pls`) và hiện có từ thư mục đã cấu hình.                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                 | ``<span class="s1">`/api/</span><span class="s1">playlist</span><span class="s1">/</span>``getserverplaylists` `` |
| Loại yêu cầu        | GET                                                                                                                                                      |
| Nội dung phản hồi   | Mảng JSON chứa tên playlist                                                                                                                              |
| Ví dụ RESPONSE BODY | `[{"playlistName":"Jazz","playlistId":5},{"playlistName":"Charts","playlistId":343}]`                                                                    |
| Có sẵn từ phiên bản | dev branch                                                                                                                                               |

Ví dụ:

```shell
curl -d "" -w "\n%{http_code}\n" -H "api-key: secret_password" -X GET http://localhost:5001/api/playlist/getserverplaylists
```

Lệnh gọi này sẽ liệt kê tất cả playlist hiện có mà UMS có thể truy cập.

#### Thêm bài hát vào playlist

`audiotrackid` cần thiết được cung cấp trong quá trình duyệt UPnP và có thể trích xuất từ thuộc tính `descMetadata` trong phản hồi DIDL

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

| Mục đích               | Thêm bài hát vào playlist                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                    | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">addSongToPlaylist</span>` |
| Loại yêu cầu           | POST                                                                                                                                                                              |
| Nội dung POST          | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                    |
| Ví dụ / mô tả POST     | 123/Pop                                                                                                                                                                           |
| Nội dung RESPONSE BODY | NONE                                                                                                                                                                              |
| Có sẵn từ phiên bản    | 11.0                                                                                                                                                                              |

Ví dụ:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/addSongToPlaylist
```

Thao tác này thêm bài hát có ID `123` vào playlist `Pop`.

#### Xóa bài hát khỏi playlist

`audiotrackid` cần thiết được cung cấp trong quá trình duyệt UPnP và có thể trích xuất từ thuộc tính `descMetadata` trong phản hồi DIDL

```XML
<ums-tags>
[...]
    <audiotrackid>ID</audiotrackid>
[...]
</ums-tags>
```

``

| Mục đích                | Xóa bài hát khỏi playlist                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URI                     | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">removeSongFromPlaylist</span>` |
| Loại yêu cầu            | POST                                                                                                                                                                                   |
| Nội dụng BODY           | `audiotrackid<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">/PLAYLIST</span>`                                                         |
| Ví dụ / mô tả POST BODY | 123/Pop                                                                                                                                                                                |
| Nội dung RESPONSE BODY  | NONE                                                                                                                                                                                   |
| Có sẵn từ phiên bản     | 11.0                                                                                                                                                                                   |

Ví dụ:

```shell
curl -d "123/Pop" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/removeSongFromPlaylist
```

Thao tác này xóa bài hát có ID `123` khỏi playlist `Pop`.

#### Tạo playlist mới

Tên playlist phải được cung cấp không kèm đường dẫn và không có phần mở rộng tệp. 

| Mục đích               | Tạo playlist mới trong thư mục playlist được quản lý                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URI                    | `<span class="s1">/api/</span><span class="s1">playlist</span><span class="s1">/</span><span class="s1">createPlaylist</span>` |
| Loại yêu cầu           | POST                                                                                                                                                                           |
| Nội dung POST          | `<span style="background-color: #bfe6ff; font-size: 11.76px; white-space: pre-wrap;">PLAYLIST_NAME</span>`                                                         |
| Ví dụ / mô tả POST     | Contemporary                                                                                                                                                                   |
| Nội dung RESPONSE BODY | NONE                                                                                                                                                                           |
| Có từ phiên bản        | 11.0                                                                                                                                                                           |

Ví dụ:

```shell
curl -d "Contemporary" -w "\n%{http_code}\n" -H "api-key: secret_password" -X POST http://localhost:5001/api/playlist/createPlaylist
```

Lệnh gọi này tạo một tệp danh sách phát mới có tên `Contemporary.m3u8` trong thư mục danh sách phát được quản lý.

## Ví dụ mã Java

Đoạn mã này minh họa cách sử dụng API với thư viện okhttp3.

```Java
import nextcp.dto.Config;
import nextcp.dto.UmsServerApiKey;
import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

[...]

    public String executeCall() throws IOException
    {
        String postBody = "1e0eee38-a9f6-49bf-84d0-45d0647799af";
        String apiKey = "secret_password";
        RequestBody body = RequestBody.create(postBody, MediaType.parse("application/text"));
        String requestUrl = "http://127.0.0.1:5001/api/like/likealbum";
        Request request = new Request.Builder().url(requestUrl).addHeader("api-key", apiKey).post(body).build();
        Call call = okClient.newCall(request);
        Response response = call.execute();
        return response.body().string();
    }
```

## Mã phản hồi HTTP

| 200 | OK | | 204 | success if no content is supposed to be returned | | 401 | invalid api key | | 404 | requested object cannot be found | | 417 | API request failed | | 503 | external api is not enabled. Thiết lập `api_key` trong UMS.conf với độ dài từ 12 ký tự trở lên |
