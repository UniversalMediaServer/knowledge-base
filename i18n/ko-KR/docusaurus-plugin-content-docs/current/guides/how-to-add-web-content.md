# 웹 콘텐츠를 추가하는 방법

이 기사에서는 웹 콘텐츠를 추가하는 방법에 대해 설명합니다.

## 비디오 피드

RSS 피드 링크를 추가하여 비디오 피드/채널을 구독하거나 유튜브의 경우 링크를 채널에 입력하기만 하면 됩니다.

### 1: 공유 콘텐츠 섹션으로 이동합니다

웹 브라우저의 UMS 설정에서 메뉴를 열고 공유 컨텐츠를 선택합니다
![설정 메뉴](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: "새로운 공유 콘텐츠 추가" 모달 열기

"새 공유 컨텐츠 추가" 버튼을 선택하면 모든 유형의 미디어를 추가할 수 있는 모드가 열립니다. 첫 번째 단계는 "비디오 피드" 유형을 선택하는 것입니다\
![새로운 공유 컨텐츠 옵션 modal](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: 피드 추가

여기에 피드를 추가할 수 있습니다

#### 이름

피드가 자신의 이름을 정의하기 때문에 비디오 피드에 대해 "이름" 필드를 사용할 수 없습니다.

#### 경로

"경로" 필드는 UMS에 의해 표시될 디렉터리 구조를 정의합니다. 예를 들어 Web/YouTube 채널을 입력하면 피드가 YouTube 채널 디렉터리 내에 있고 Web 디렉터리 내에 중첩됩니다. 이를 통해 원하는 대로 콘텐츠를 구성할 수 있으며, 특히 다양한 피드 공급자가 있고 UMS를 사용할 때 모든 피드 공급자가 동일한 장소에 있을 때 유용합니다.

#### 소스/URL:

이것은 비디오 피드에 대한 링크입니다. 보통 '.xml'로 끝나지만, 채널 URL을 직접 받아볼 수 있도록 YouTube를 다르게 취급하고 있어 'https://www.youtube.com/ @kurzgesagt' 등을 입력할 수 있습니다

#### 공인 그룹

"공인 그룹" 필드를 사용하면 이 피드를 다양한 사용자 및/또는 장치와 관련된 UMS에 정의된 특정 그룹에서만 사용할 수 있습니다. 자세한 내용은 [보안 및 개인 정보 보호](.../configuration/security-and-privacy.md#link-person-to-renderer)를 참조하세요.

입력한 옵션이 마음에 들면 "추가" 버튼을 선택합니다.

### 피드 순서

피드 링크가 유효한 경우 이제 "이름" 필드가 채워지고 이제 피드를 위로 또는 아래로 드래그하여 순서를 제어할 수 있습니다\
![공유 콘텐츠 목록 및 주문 능력]![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Save changes

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. 이제 장치에서 콘텐츠를 볼 수 있습니다:
![웹 플레이어에 대한 동영상 피드 예시](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)
