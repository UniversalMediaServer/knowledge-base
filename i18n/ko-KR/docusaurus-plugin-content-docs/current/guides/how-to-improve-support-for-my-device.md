# 내 장치에 대한 지원을 개선하는 방법

장치에서 폴더를 검색하거나 파일을 재생하는 등의 작업을 수행하지 못하는 경우 렌더러 구성 파일의 설정을 변경하여 수정할 수 있습니다. 서로 다른 장치/렌더/클라이언트는 UMS와 같은 서버와 서로 다른 방식으로 통신하므로 구성 파일은 UMS에 장치와 동일한 언어를 사용하는 방법을 알려줍니다.

모든 렌더러 설정에 대한 문서가 포함된 기본 렌더러 구성 파일이 있습니다. https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf 에서 최신 버전을 참조하십시오

일반적으로 볼 수 있는 설정은 `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize`, and `ChunkedTransfer`입니다.

뿐만 아니라 설치 디렉토리에 있는 "렌더" 폴더 내의 다른 렌더 구성을 보고 렌더가 수행하는 작업을 확인할 수 있습니다. 때로는 도움이 필요할 수 있으며, 포럼에서 드릴 수 있으며, 장치를 사용하는 다른 사용자가 수정을 통해 혜택을 받을 수 있도록 개선 사항에 대해 말씀해 주시는 것을 기억하시기 바랍니다. 출시 발표 및 변경 로그에 귀하의 공을 돌리겠습니다

프로젝트에 기여할 새로운 렌더러 구성이 있는 경우 GitHub 저장소 https://github.com/UniversalMediaServer/UniversalMediaServer 에서 **Pull Request**을 생성하십시오
