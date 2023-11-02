# Docker

Some of these steps may not apply to your installation.  그들이 하는 일을 이해하고 필요에 따라 무시하거나 사용자 지정합니다.

## 준비

For operating system support and service packages.

### Debian Linux

도커 설치 (엔진): https://docs.docker.com/engine/install/debian/

### Fedora Linux

도커 설치 (엔진): https://docs.docker.com/engine/install/fedora/

#### 기타 지시사항

```
sudo usermod -a -G docker <username>;
```

Re-login or restart the machine.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

저장소를 호스트에 마운트하고 해당 디렉터리 (아마도 읽기 전용)에 링크합니다. `마운트 <Videos-Share> '/srv/UMS/비디오'`

테스트 예: 도커 컨테이너의 장착된 볼륨 경로 외부에는 호스트 시스템의 다른 경로에 대한 접근이 없기 때문에 호스트 시스템의 다른 경로에 대한 단순한 동기화는 작동하지 않을 수 있다.  대신 이 위치에 있는 파일을 복사해 보십시오.

## Container Setup

다음 볼륨을 마운트합니다:
- 미디어 폴더 `/media`
- UMS.conf가 있는 프로필 폴더 `/profile`

Expose/forward these ports from the host: 1044, 5001, 9001.

다음 스크립트는 (피쉬 셸을 사용하여) 다음 작업을 수행합니다:
```
sudo su -;
set rootDir "$HOME/.config/UMS";
mkdir -p "$rootDir/data";
​
docker pull universalmediaserver/ums;
​
docker create --name UMS \
  -p 1044:1044 -p 5001:5001 -p 9001:9001 \
  -v /srv/UMS:/root/media \
  -v "$HOME/.config/UMS":/root/.config/UMS \
  universalmediaserver/ums \
;
```

## Investigating Problems/Issues

### General

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Still unintentionally stops container when done inspecting..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

For detailed logs in the terminal: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Mount trouble

Using Fedora CoreOS, I had access/permission denied problems trying to use bind mounts.

대신 도커가 관리하는 명명된 볼륨 기능을 사용하는 것이 좋습니다. 하지만 이러한 복잡성을 피하기 위해 bind mount의 descriptor 옵션 값에 접미사로 `:Z`을 추가하면 호스트 파일에 대한 컨테이너 쓰기 액세스가 가능합니다. `:z`을(를) 대신 사용할 수도 있지만, 보안 조언을 통해 공유가 아닌 애플리케이션/서비스 환경 간에 리소스를 더 격리할 것을 권장할 수도 있습니다.

Matching error messages can be seen using journalctl, so it is an SELinux problem. 이를 위한 솔루션은 `chcon -Rt svirt_sandbox_file_t` host_dir를 실행하는 것이지만 이 또한 권장되지 않는 것으로 보입니다.

Strangely this is not an issue on Fedora Workstation, but I guess installing it manually added a package to deal with this. Seems to be container-selinux.

## References

- https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label
- https://drive.google.com/file/d/1ORNc113a8is1K1ZZtp1r3iz44uzJDeRp/view
- https://fedora.pkgs.org/36/docker-ce-x86_64/docker-ce-20.10.16-3.fc36.x86_64.rpm.html#Install_HowTo
- https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/docker/Dockerfile
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841#issuecomment-672849793
- https://github.com/UniversalMediaServer/UniversalMediaServer/pull/1599
- https://github.com/UniversalMediaServer/UniversalMediaServer/tree/master/src/main/external-resources
- https://hub.docker.com/r/universalmediaserver/ums
- https://hub.docker.com/r/atamariya/ums/
- https://pkgs.org/download/docker-ce
- https://support.universalmediaserver.com/
- https://www.universalmediaserver.com/download/#docker
- https://www.universalmediaserver.com/forum/viewtopic.php?t=12922
- https://www.universalmediaserver.com/forum/viewtopic.php?t=14580
- https://www.universalmediaserver.com/forum/viewtopic.php?p=47952
