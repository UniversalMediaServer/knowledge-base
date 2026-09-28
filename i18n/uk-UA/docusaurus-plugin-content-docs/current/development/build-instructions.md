# Інструкція зі збірки

Цей документ містить опис того, як зібрати Universal Media Server із вихідних файлів.

_Важлива примітка:_ попередньо скомпільовані версії Universal Media Server можна завантажити за посиланням: http://www.universalmediaserver.com/, тому вам НЕ потрібно виконувати ці кроки як звичайному користувачеві.

Необхідні наступні програмні пакети:

- Java JDK 17 (JRE буде недостатньо)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

# Коротка інструкція

Якщо всі необхідні програмні пакети встановлено, за допомогою наведених нижче команд можна завантажити найновіші вихідні коди та зібрати UMS:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Де `PACKAGENAME` – це назва цільової операційної системи: `windows`, `macos`, `macos-arm`, `macos-pre1015` або `linux-*`, а `*` – одна з таких архітектур: `x86`, `x86_64`, `arm64`, `armel` або `armhf`

Результат буде зібрано в каталозі «target»:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- MacOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Детальні інструкції

Спершу необхідно встановити все потрібне ПЗ:

## 1. Завантажте та встановіть Java JDK 17

Зверніться до → https://bell-sw.com/pages/downloads/#/java-17-lts

## 2. Завантажте та встановіть Git

Зверніться до → https://git-scm.com/

## 3. Завантажте та розпакуйте Maven

Зверніться до → http://maven.apache.org/

## 4. Задайте змінні середовища

### Для ОС Windows

Створіть нові змінні або додайте значення, якщо змінна вже існує:

- Рівень: System, змінна: `JAVA_HOME`, значення: JDK install location
- Рівень: User, змінна `M2_HOME`, значення: Maven extract location
- Рівень: User, змінна `M2`, значення: `%M2_HOME%\bin`
- Рівень: User, змінна `PATH`, значення: `%M2%`

### Для ОС Linux

Нічого не потрібно робити.

### Для MacOS

Нічого не потрібно робити.

## 5. Завантажте вихідний код UMS

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. За бажанням оновіть вихідний код до останньої версії

```bash
git pull
```

## 7. Скомпілюйте останню версію UMS

```bash
mvn package -P PACKAGENAME
```

Де `PACKAGENAME` – це назва цільової операційної системи: `windows`, `macos`, `macos-arm`, `macos-pre1015` або `linux-*`, а `*` – одна з таких архітектур: `x86`, `x86_64`, `arm64`, `armel` або `armhf`

Ви також можете вказати додатковий прапорець, якщо бажаєте пропустити завантаження бінарних файлів, що може прискорити час складання, особливо в системах Windows та Linux:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Отримані бінарні файли будуть зібрані в каталозі «target»:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- MacOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Автоматичні збірки

Ці дві останні команди можна легко автоматизувати за допомогою скрипта, зокрема:

### Для ОС Windows

```bash
rem build-UMS.bat
start /D universalmediaserver /wait /b git pull
start /D universalmediaserver /wait /b mvn package
```

### Для ОС Linus, MacOS тощо

```bash
#!/bin/sh
# build-UMS.sh
cd universalmediaserver
git pull
mvn package
```

# Складання та кроскомпіляція

У цьому розділі описано, як можна здійснювати компіляцію та складання для однієї системи, перебуваючи в середовищі іншої.

## Створення бінарних файлів для Windows

Установники для ОС Windows (`UMS-setup.exe`) та виконуваний файл для Windows (`UMS.exe`) можна скомпілювати на платформах, відмінних від ОС Windows.

Перш за все, вам потрібно встановити бінарний файл `makensis`. У «Debian»/«Ubuntu» це можна зробити за допомогою:

```bash
sudo apt-get install nsis
```

Потім у системному середовищі `NSISDIR` потрібно вказати **абсолютний шлях** до каталогу `nsis`. Це можна налаштувати окремо для кожної команди:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Інакше:

- Тимчасово в поточній оболонці:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Або постійно:
    ```bash
    # Ці дві команди потрібно виконати лише один раз
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

Для стислості в наведених нижче прикладах передбачається, що він уже налаштований.

Тепер встановлювач для ОС Windows можна зібрати за допомогою однієї з таких команд:

### На ОС Linux та MacOS

```bash
mvn package -P system-makensis,windows
```

## Створення архіву у форматі .tar для Linux

### На ОС Windows і MacOS

```bash
mvn package -P linux-*
```

Де `*` є однією із наступних архітектур: x86, x86_64, arm64, armel, або armhf

## Створення образу диска MacOS

### На ОС Windows і Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Створення майстра встановлення MacOS

1. Зберіть UMS
2. Встановіть → http://s.sudre.free.fr/Software/Packages/about.html
3. Задайте змінну, яка зберігатиме шлях до каталогу з файлом дистрибутива збірки, як-от:

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Замініть відповідний шлях у файлі .pkgproj:

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Створіть інсталятор у форматі .pkg. Його буде збережено у теку `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Швидкі збірки

У нас є скрипти швидкої збірки, які рекомендується використовувати під час розробки для прискорення робочого циклу. Ці скрипти скомпілюють Java-код, помістять його у стандартний каталог встановлення та запустять програму, яка закриє всі наявні екземпляри UMS.

Це повинно спрацювати для 64-бітних версій ОС Windows та MacOS. За бажанням це можна легко розширити й для інших.

```bash
mvn verify -P quickrun-* -DskipTests
```

Де `*` це `macos` або `windows`
