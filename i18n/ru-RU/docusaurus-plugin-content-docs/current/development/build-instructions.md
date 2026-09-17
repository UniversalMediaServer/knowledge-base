# Инструкции по сборке

В этом документе описано, как собрать Universal Media Server из исходных файлов.

_Важное примечание:_
Готовые сборки Universal Media Server можно загрузить с: http://www.universalmediaserver.com/ — обычным пользователям НЕ нужно выполнять эти шаги.

Для сборки необходимы следующие пакеты ПО:

- Java JDK 17 (JRE недостаточно)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

# Краткая инструкция

Если все необходимые пакеты установлены, следующие команды загрузят последние версии исходных файлов и соберут UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Где `PACKAGENAME` — это название целевой ОС: `windows`, `macos`, `macos-arm`, `macos-pre1015` или `linux-*`, где `*` — это архитектура; одна из: `x86`, `x86_64`, `arm64`, `armel` или `armhf`

Результат сборки будет находиться в каталоге `target`:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Полная инструкция

Сначала необходимо установить всё необходимое ПО:

## 1. Скачайте и установите Java JDK 17

См. https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Скачать и установить Git

См. https://git-scm.com/

## 3. Скачать и распаковать Maven

См. http://maven.apache.org/

## 4. Настройте переменные среды

### Windows

Создайте новые переменные или добавьте значение, если переменная уже существует:

- Уровень: Системный, переменная: `JAVA_HOME`, значение: путь к установке JDK
- Уровень: Пользователь, переменная: `M2_HOME`, значение: путь к распакованной папке Maven
- Уровень: Пользователь, переменная: `M2`, значение: `%M2_HOME%\bin`
- Уровень: Пользователь, переменная: `PATH`, значение: `%M2%`

### Linux

Ничего делать не нужно.

### macOS

Ничего делать не нужно.

## 5. Скачать исходный код UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. Обновите до последней версии исходного кода (необязательно)

```bash
git pull
```

## 7. Скомпилировать последнюю версию UMS

```bash
mvn package -P PACKAGENAME
```

Где `PACKAGENAME` — это имя целевой ОС: `windows`, `macos`, `macos-arm`, `macos-pre1015` или `linux-*`, где `*` — архитектура; одна из: `x86`, `x86_64`, `arm64`, `armel` или `armhf`.

Вы также можете указать необязательный флаг, если хотите пропустить загрузку бинарных файлов — это может ускорить сборку, особенно на Windows и Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Собранные бинарные файлы будут находиться в каталоге `target`:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Автоматические сборки

Эти последние две команды легко автоматизировать с помощью скрипта, например:

### Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### Linux, macOS &c.

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# Упаковка и кросскомпиляция

В этом разделе объясняется, как можно выполнить компиляцию и упаковку для одной системы, находясь в другой.

## Сборка бинарных файлов для Windows

Установщики Windows (`UMS-setup.exe`) и исполняемый файл Windows (`UMS.exe`) могут быть собраны на платформах, отличных от Windows.

Прежде всего, вам необходимо установить бинарный файл `makensis`. В Debian/Ubuntu это можно сделать с помощью:

```bash
sudo apt-get install nsis
```

Затем необходимо задать переменную окружения `NSISDIR`, указав в качестве значения **абсолютный путь** к каталогу `nsis`. Это можно задать как для отдельной команды:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Или:

- Временно в текущей оболочке:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Или навсегда:
    ```bash
    # these two commands only need to be run once
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Для краткости в следующих примерах предполагается, что она уже задана.

Теперь установщик Windows можно собрать с помощью одной из следующих команд:

### На Linux и macOS

```bash
mvn package -P system-makensis,windows
```

## Создание архива Linux

### На Windows и macOS

```bash
mvn package -P linux-*
```

где `*` — одно из значений: `x86`, `x86_64`, `arm64`, `armel` или `armhf`.

## Сборка образа диска для macOS

### На Windows и Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Сборка установщика-мастера для macOS

1. Сборка UMS
2. Установить http://s.sudre.free.fr/Software/Packages/about.html
3. Задайте переменную, хранящую путь к каталогу с файлом дистрибутива сборки, например:

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Замените нужный путь внутри файла .pkgproj

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Соберите .pkg установщик. Результат будет помещён в `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Быстрые сборки

У нас есть скрипты для быстрой сборки, которые рекомендуются для быстрого цикла разработки. Скрипты скомпилируют Java-код, поместят его в каталог установки по умолчанию и запустят программу, предварительно закрыв все запущенные экземпляры UMS.

Должно работать для 64-разрядных версий Windows и macOS. При желании можно легко расширить для других систем.

```bash
mvn verify -P quickrun-* -DskipTests
```

Где `*` — это `macos` или `windows`
