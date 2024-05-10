# 보안 및 개인 정보 보호

## 소개

UMS는 2가지 주요한 방법으로 미디어를 제공합니다. 미디어 플래이어 앱을 이용해 DLNA/UPnP로 접근할 수 있으며, 웹브라우저를 통해 http로 연결이 가능합니다.

Web browsers have easy security and privacy control by having user accounts with logins.

Media player apps do not generally support the concept of a "user", so usually every device gets the same content. This might not be what you want. For example if you have two folders kids_safe and kids_unsafe you might want to restrict the renderers in the kids' room to only have access to the kids_safe folder. Another common situation is you are on the same network as people you do not want to have access to your media, like flatmates, so you want to block certain renderers completely.

UMS provides a number of methods to control access in those situations.

## Allow or block renderers or network devices by default
You can choose the default strategy for renderers and network devices. You can allow or deny by default, with denylists and allowlists, for complete control.

This is useful for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Block/allow renderers and network devices

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## 폴더 숨기기

가상 폴더의 가시성을 제어합니다. 이러한 설정은 UMS.conf 파일에서 확인할 수 있습니다. 탐색하는 동안 일부 폴더를 숨기려면 값을 true로 설정하거나 고급 GUI 모드의 탐색/공유 설정 탭에서 폴더를 선택합니다. 

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

웹 폴더를 숨기려면 고급 GUI 모드에서 일반 구성 탭에서 외부 네트워크 사용을 해제하거나 UMS.conf 파일에서 'external_network=' 값을 false로 변경해야 합니다. 이렇게 하면 자동 업데이트기가 작동하지 않는 부작용이 발생합니다. GUI에서 변경한 내용은 재시작 후 유효합니다.

## PIN 코드

위의 모든 방법은 다양한 렌더러의 접근을 제한합니다. 그러나 폴더를 볼 수 있는 렌더에 액세스할 수 있는 경우 이러한 방법은 도움이 되지 않습니다(아이들이 모든 미디어에 액세스할 수 있는 거실 TV에 액세스할 수 있는 경우 해당 미디어에 액세스할 수 있습니다). PIN 코드가 이 문제를 해결합니다. 렌더링에서 입력해야 하는 PIN 코드 뒤에 폴더/미디어를 숨길 수 있습니다. 기본적으로 입력은 ATM 코드와 마찬가지로 숫자 (0-9)의 시퀀스입니다. 렌더러에서 입력하기가 어려워지기 때문에 디지털 기반 코드를 사용하는 것이 좋습니다. 그러나 추가 편집증이 있는 경우 문자를 추가할 수 있습니다. 다음과 같이 작동합니다: UMS.code라는 파일을 UMS.conf와 같은 디렉터리에 추가하고, regexp는 "UMS.deny" 파일과 같이 정규 표현식이고 코드는 폴더/미디어에 대한 액세스 권한을 부여하는 코드입니다. 코드에 길이 규정이 없습니다. 예를 들면:
```
.*private.*,1234
```

폴더/미디어에 "개인"이라는 단어가 포함되어 있고 올바른 코드가 1234인 경우 코드를 입력하도록 강제합니다. 그런 다음 코드는 4시간 동안 유효합니다 (그 시간을 변경하지 않는 경우).

## 사용자 지정 장치 구성

기본 UMS 설정을 재정의하는 사용자 지정 장치 구성을 생성하여 장치별로 모든 구성 속성을 설정할 수도 있습니다 (자세한 내용은 사용자 지정 장치 구성 생성 참조).

예를 들어, 어린이용 TV를 사용자 지정하려면:
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
