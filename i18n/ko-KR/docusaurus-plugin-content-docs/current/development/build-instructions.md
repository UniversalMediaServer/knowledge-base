# 빌드 지침

이 문서는 소스 파일에서 Universal Media Server를 구축하는 방법을 설명합니다.

_중요한 참고 사항:_:
사전 구축된 Universal Media Server 릴리스는 다음에서 다운로드할 수 있습니다: http://www.universalmediaserver.com/ . 따라서 일반 사용자로서 이러한 단계를 실행할 필요가 없습니다.

다음 소프트웨어 패키지가 필요합니다:

- Java JDK 17 (JRE로는 충분하지 않습니다)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

필요한 모든 소프트웨어를 설치하는 방법과 각 운영 체제에 맞는 UMS를 구축하는 방법에 대한 자세한 설명은 [전체 지침](#전체 지침) 섹션을 읽어보세요.

# 짧은 지침

모든 필수 소프트웨어 패키지가 설치되면 다음 명령어가 최신 소스를 다운로드하고 UMS를 구축합니다:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

여기서 'PACKAGENAME'는 대상 운영 체제의 이름입니다: 'window', 'macos', 'macos-arm', 'macos-pre1015' 또는 'linux-_', 여기서 '_'는 아키텍처입니다. 'x86', 'x86_64', 'arm64', 'armel' 또는 'armhf' 중 하나입니다

결과는 "대상" 디렉터리에 구축됩니다:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# 전체 지침

먼저 필요한 모든 소프트웨어를 설치해야 합니다:

## 1. Java JDK 17 다운로드 및 설치

https://bell-sw.com/pages/downloads/ #/java-17-lts 참조

## 2. Git 다운로드 및 설치

https://git-scm.com/ 을 참조하세요

## 3. Maven 다운로드 및 추출

http://maven.apache.org/ 을 참조하세요

## 4. 환경 변수 설정

### Windows

변수가 이미 존재하는 경우 새 변수를 만들거나 값을 추가합니다:

- 레벨: 시스템, 변수: 'JAVA_HOME', 값: JDK 설치 위치
- 레벨: 사용자, 변수 'M2_HOME', 값: 메이븐 추출 위치
- 레벨: 사용자, 변수 'M2', 값: '%M2_HOME %\\bin'
- 레벨: 사용자, 변수 'PATH', 값 '%M2%'

### Linux

할 것이 없습니다.

### macOS

할 것이 없습니다.

## 5. UMS 소스 코드 다운로드

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. 최신 소스 업데이트 (선택 사항)

```bash
git pull
```

## 7. 최신 버전의 UMS 컴파일

```bash
mvn package -P PACKAGENAME
```

여기서 'PACKAGENAME'는 대상 운영 체제의 이름입니다: 'window', 'macos', 'macos-arm', 'macos-pre1015' 또는 'linux-_', 여기서 '_'는 아키텍처입니다. 'x86', 'x86_64', 'arm64', 'armel' 또는 'armhf' 중 하나입니다

바이너리 다운로드를 건너뛰고 싶다면 선택적 플래그를 지정할 수도 있으며, 이 플래그는 특히 Windows와 Linux에서 빌드 시간을 단축하는 데 유용할 수 있습니다:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

결과적으로 생성된 바이너리는 "대상" 디렉터리에 구축됩니다:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## 자동 빌드

이 마지막 두 명령어는 예를 들어 스크립트를 사용하여 쉽게 자동화할 수 있습니다:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### 리눅스, macOS 및 c.

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# 패키징 및 교차 편집

이 섹션에서는 다른 시스템에 있는 동안 한 시스템을 컴파일하고 패키징하는 방법을 설명합니다.

## Windows 바이너리 구축

Windows 설치 프로그램 ('UMS-setup.exe')과 Windows 실행 파일 ('UMS.exe')은 비Windows 플랫폼에서 구축할 수 있습니다.

우선, 'makensis' 바이너리를 설치해야 합니다. 데비안/우분투에서,
이 작업은 다음과 같이 수행할 수 있습니다:

```bash
sudo apt-get install nsis
```

그런 다음 'NSISDIR' 환경을 'NSIS' 디렉터리의 **절대 경로**로 설정해야 합니다. 이것은 명령마다 설정할 수 있습니다:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

어느 한쪽의

- 현재 셸에서 일시적으로:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- 또는 영구적으로:
    ```bash
    # 이 두 명령어는 한 번만 실행하면 됩니다
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    ```

간결함을 위해 다음 예시들은 이미 설정되었다고 가정합니다.

이제 다음 명령 중 하나로 Windows 설치 프로그램을 빌드할 수 있습니다:

### Linux 및 macOS에서

```bash
mvn package -P system-makensis,windows
```

## Linux tarball 만들기

### Windows 및 macOS에서

```bash
mvn package -P linux-*
```

여기서 '\*'는 다음 중 하나입니다: x86, x86_64, arm64, armel 또는 armhf

## macOS 디스크 이미지 구축하기

### Windows 및 Linux에서

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## macOS 마법사 설치 프로그램 구축

1. UMS 구축
2. http://s.sudre.free.fr/Software/Packages/about.html 설치
3. 빌드 배포 파일의 디렉토리 경로를 저장하는 변수를 설정합니다 (예.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. .pkgproj 파일 내에서 원하는 경로 바꾸기

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. .pkg 설치 프로그램을 만듭니다. 이렇게 하면 '/target/Universal Media Server.pkg'으로 출력됩니다

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# 빠른 빌드

개발 중에 빠른 반복을 위해 추천하는 빠른 빌드 스크립트가 있습니다. 스크립트는 Java 코드를 컴파일하여 기본 설치 디렉터리에 넣고 프로그램을 실행하여 기존 UMS 인스턴스를 종료합니다.

64비트 Windows 및 macOS에서 작동해야 합니다. 원한다면 다른 사람들을 위해 쉽게 확장할 수 있습니다.

```bash
mvn verify -P quickrun-* -DskipTests
```

여기서 '\*'는 'macos' 또는 'windows'입니다
