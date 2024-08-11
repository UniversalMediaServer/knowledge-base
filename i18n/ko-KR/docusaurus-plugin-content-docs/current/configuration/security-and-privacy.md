# 보안 및 개인 정보 보호

## 소개

UMS는 2가지 주요한 방법으로 미디어를 제공합니다. 미디어 플래이어 앱을 이용해 DLNA/UPnP로 접근할 수 있으며, 웹브라우저를 통해 http로 연결이 가능합니다.

웹 브라우저는 로그인한 사용자 계정을 사용하여 쉽게 보안 및 개인 정보를 제어할 수 있습니다.

미디어 플레이어 앱은 일반적으로 "사용자"의 개념을 지원하지 않으므로 일반적으로 모든 장치가 동일한 콘텐츠를 받습니다. 이것은 당신이 원하는 것이 아닐 수도 있습니다. 예를 들어 kids_safe 및 kids_unsafe 폴더가 두 개 있는 경우 어린이 방에 있는 렌더러가 kids_safe 폴더에만 액세스하도록 제한할 수 있습니다. 또 다른 일반적인 상황은 플랫메이트와 같이 미디어에 액세스하지 않으려는 사람들과 동일한 네트워크에 있기 때문에 특정 렌더러를 완전히 차단하려는 것입니다.

UMS는 이러한 상황에서 액세스를 제어하는 여러 가지 방법을 제공합니다.

## 기본적으로 렌더러 또는 네트워크 장치 허용 또는 차단
렌더러 및 네트워크 장치에 대한 기본 전략을 선택할 수 있습니다. 거부 목록 및 허용 목록을 사용하여 전체 제어를 기본적으로 허용하거나 거부할 수 있습니다.

이는 공유 생활 상황이나 넓은/낮은 신뢰 지역 네트워크에 유용합니다. 또한 네트워크에 전원선 어댑터를 사용하는 분들에게도 유용합니다. 그러면 이웃에서 원치 않는 액세스가 발생할 수 있기 때문입니다.

![네트워크 허용 기본 설정을 설정하는 방법의 예](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![렌더러 허용 기본 설정을 설정하는 방법의 예](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## 렌더러 및 네트워크 장치 차단/허용

기본적으로 인식되지 않는 렌더러를 허용할지 차단할지를 선택한 경우 설정 영역의 홈 화면에서 거부 목록 또는 허용 목록을 작성할 수 있습니다.

![렌더를 차단하는 방법의 예](@site/docs/img/whats-new-in-v14-block-renderer.png)

## 개인 렌더러 링크

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## 공유 컨텐츠를 특정 그룹으로 제한

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## 폴더 숨기기

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

## PIN 코드

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## 사용자 지정 장치 구성

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- 렌더러의 GUI 팝업 패널 우측 상단에 있는 '이 장치 사용자 지정' 버튼을 클릭하고 구성의 이름을 지정합니다.
- 여는 새 conf 파일에서 서버 이름을 변경하고 다른 폴더를 지정하는 등 TV에 대해 재정의하려는 모든 설정을 추가합니다:
```
#----------------------------------------------------------------------------
# 사용자 지정 장치 프로필
# 가능한 모든 렌더러 옵션에 대한 설명은 DefaultRender.conf를 참조
# 프로그램 옵션에 대한 UMS.conf.

# 이 파일의 옵션은 아래 나열된 특정 Sony Bravia EX 장치의 기본 설정을 재정의합니다.
# 장치를 uuid (또는 uuid가 없는 경우 주소)로 지정하고 둘 이상일 경우 쉼표로 구분합니다.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
