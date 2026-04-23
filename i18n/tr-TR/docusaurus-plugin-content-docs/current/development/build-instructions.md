# Oluşturma talimatları

Bu belge Universal Media Server’ın kaynak dosyalardan nasıl oluşturulacağını açıklar.

_Önemli not:_
Önceden oluşturulmuş Universal Media Server yayımları şu adresten indirilebilir: http://www.universalmediaserver.com/ dolayısıyla bu adımları genel bir kullanıcı olarak uygulamanıza gerek YOKTUR.

Aşağıdaki yazılım paketleri gerekir:

- Java JDK 17 (JRE yeterli değildir)
- Git
- Maven
- [MediaInfo](https://mediaarea.net/en/MediaInfo/Download)

Gerekli tüm yazılımların nasıl yükleneceğini ve her işletim sistemi için UMS’nin nasıl oluşturulacağına ilişkin tam bir açıklama için [Tam talimatlar](#full-instructions) bölümünü okuyun.

# Kısa talimatlar

Eğer gerekli tüm yazılım paketleri yüklüyse aşağıdaki komutlar en son kaynakları indirecek ve UMS’yi oluşturacaktır:

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
mvn package -P PACKAGENAME
```

Burada `PACKAGENAME` hedef işletim sisteminin adıdır: `windows`, `macos`, `macos-arm`, `macos-pre1015` veya `linux-*`, burada `*` mimaridir; şunlardan biri: `x86`, `x86_64`, `arm64`, `armel` veya `armhf`

Sonuç "hedef" dizinde oluşturulacaktır:

- Windows: `UMS-setup.exe`
- Linux: `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `UMS-setup-macosx-x.xx.x.tar.gz`

# Tam talimatlar

Öncelikle gerekli tüm yazılımların yüklenmesi gerekir:

## 1. Java JDK 17’yi indirin ve yükleyin

https://bell-sw.com/pages/downloads/#/java-17-lts adresine bakın

## 2. Git’i indirin ve yükleyin

https://git-scm.com/ adresine bakın

## 3. Maven’i indirin ve çıkarın

http://maven.apache.org/ adresine bakın

## 4. Ortam değişkenlerini ayarlayın

### Windows

Yeni değişkenler oluşturun veya değişken zaten mevcutsa değeri ekleyin:

- Seviye: Sistem, değişken: `JAVA_HOME`, değer: JDK kurulum konumu
- Seviye: Kullanıcı, değişken `M2_HOME`, değer: Maven çıkarma konumu
- Seviye: Kullanıcı, değişken `M2`, değer: `%M2_HOME%\bin`
- Seviye: Kullanıcı, değişken `PATH`, değer `%M2%`

### Linux

Yapacak bir şey yok.

### macOS

Yapacak bir şey yok.

## 5. UMS kaynak kodunu indirin

```bash
git clone https://github.com/UniversalMediaServer/UniversalMediaServer.git
cd universalmediaserver
```

## 6. En son kaynağa güncelleyin (isteğe bağlı)

```bash
git pull
```

## 7. UMS’nin en son sürümünü derleyin

```bash
mvn package -P PACKAGENAME
```

Burada `PACKAGENAME` hedef işletim sisteminin adıdır: `windows`, `macos`, `macos-arm`, `macos-pre1015` veya `linux-*`, burada `*` mimaridir; şunlardan biri: `x86`, `x86_64`, `arm64`, `armel` veya `armhf`

İkili dosyaları indirmeyi atlamak istiyorsanız isteğe bağlı bir işaret te belirtebilirsiniz; bu, özellikle Windows ve Linux’ta derleme süresini hızlandırmak için yararlı olabilir:

```bash
mvn package -P PACKAGENAME -Doffline=true
```

Ortaya çıkan ikili dosyalar "hedef" dizinde oluşturulacaktır:

- Windows: `UMS-setup.exe`
- Linux:   `UMS-linux-generic-x.xx.x.tar.gz`
- macOS: `ums-x.xx.x-SNAPSHOT-distribution/Universal Media Server.app`

## Otomatik yapılar

Bu son iki komut bir komut kodu kullanılarak kolayca otomatikleştirilebilir, örn.:

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

# Paketleme ve çapraz derleme

Bu bölümde başka bir sistem üzerindeyken bir sistem için derleme ve paketlemenin nasıl mümkün olduğu açıklanmaktadır.

## Windows ikili dosyalarını oluşturma

Windows yükleyicileri (`UMS-setup.exe`) ve Windows çalıştırılabilir dosyası (`UMS.exe`), Windows dışındaki platformlarda oluşturulabilir.

Öncelikle, `makensis` ikili dosyasının yüklü olması gerekir. Debian/Ubuntu üzerinde, bu şununla yapılabilir:

```bash
sudo apt-get install nsis
```

Ardından `NSISDIR` ortamının `nsis` dizinine giden **tam yola** ayarlanması gerekir. Bu, komut başına ya şöyle ayarlanabilir:

```bash
NSISDIR=$PWD/src/main/external-resources/third-party/nsis mvn ...
```

Ya da:

- Şu anki kabukta geçici olarak:
    ```bash
    export NSISDIR=$PWD/src/main/external-resources/third-party/nsis
    mvn ...
    ```
- Veya kalıcı olarak:
    ```bash
    # bu iki komutun yalnızca bir kez çalıştırılması gerekir
    echo "export NSISDIR=$PWD/src/main/external-resources/third-party/nsis" >> ~/.bashrc
    source ~/.bashrc
    
    mvn...
    ```

For the sake of brevity, the following examples assume it has already been set.

The Windows installer can now be built with one of the following commands:

### On Linux and macOS

```bash
mvn package -P system-makensis,windows
```

## Building a Linux tarball

### On Windows and macOS

```bash
mvn package -P linux-*
```

where `*` is one of: x86, x86_64, arm64, armel, or armhf

## Building the macOS disk image

### On Windows and Linux

```bash
mvn package -P macos
hdiutil create -volname "Universal Media Server" -srcfolder target/ums-*-distribution UMS.dmg
```

## Building the macOS wizard installer

1. Build UMS
2. Install http://s.sudre.free.fr/Software/Packages/about.html
3. Set a variable storing the directory path of the build distribution file, e.g.

```bash
export UMS_DIST_FOLDER="/Users/dev/ums/target/ums-7.3.1-SNAPSHOT-distribution/Universal Media Server.app"
export UMS_LOGO_FILE="/Users/dev/ums/src/main/external-resources/third-party/nsis/Contrib/Graphics/Wizard/win.png"
```

4. Replace desired path inside the .pkgproj file

```bash
sed -i '' "s#UMS_DIST_FOLDER#$UMS_DIST_FOLDER#g" src/main/assembly/osx-installer.pkgproj
sed -i '' "s#UMS_LOGO_FILE#$UMS_LOGO_FILE#g" src/main/assembly/osx-installer.pkgproj
```

5. Build .pkg installer. This will output to `/target/Universal Media Server.pkg`

```bash
/usr/local/bin/packagesbuild src/main/assembly/osx-installer.pkgproj
```

# Quick builds

We have quick build scripts that are recommended during development for fast
iteration. The scripts will compile the Java code, put it in the default install
directory, and run the program, which will close any existing instance of UMS.

It should work for 64-bit Windows and macOS. Can be extended for others easily if desired.

```bash
mvn verify -P quickrun-* -DskipTests
```

Where `*` is `macos` or `windows`
