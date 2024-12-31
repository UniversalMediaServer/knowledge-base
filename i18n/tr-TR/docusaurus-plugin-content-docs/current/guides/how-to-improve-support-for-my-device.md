# Cihazım için desteği nasıl iyileştirebilirim

Eğer cihazınız, klasörlere göz atmak veya bir dosyayı oynatmak gibi herhangi bir şey yapamıyorsa, işleyici yapılandırma dosyasındaki ayarları değiştirerek düzeltmeniz mümkün olabilir. Farklı cihazlar/işleyiciler/istemciler, UMS gibi sunucularla farklı şekillerde iletişim kurar, bu yüzden yapılandırma dosyası, UMS’ye cihazınızla aynı dili nasıl konuşacağını söyler.

Her yapılandırma profili iki amaca hizmet eder:
- UMS’ye belirli bir işleyiciye bağlanmaya çalıştığında tanımasına izin vermesine
- Bu işleyicinin olanaklarını tanımlamasına

Tüm işleyici ayarlarımızla ilgili belgeleri içeren varsayılan bir işleyici yapılandırma dosyamız var. En son sürüme https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf adresinden bakın.

## Tanınmayan bir cihaz için destek ekleme

UMS cihazınızı tanımadığında bu, işleyici yapılandırma profillerinden hiçbirinin cihazınızla eşleşmediği anlamına gelir. Sonuç olarak UMS, `Bilinmeyen İşleyici` olarak görüntüler ve işleyicinizin olanaklarını bilmediğinden cihazınız için iyileştirilmiş çıktı sağlayamaz.

Çözüm, kendi işleyici yapılandırma dosyanızı oluşturmaya çalışmaktır.
1. Cihazınıza en yakın olan .conf dosyasının bir kopyasını oluşturun. Örneğin, eğer Samsung TV’niz tanınmıyorsa, Samsung TV yapılandırmalarından biri başlamak için iyi bir yer olabilir.

1. UMS’de `Günlükler` sekmesine gidin ve `Ortam işleyici tanınmadı metnini arayın. Olası HTTP başlıklarını tanımlama:`. That information is what is needed to make UMS recognize your device.

1. In your new .conf file, look for the line that defines `UserAgentSearch` and/or `UpnpDetailsSearch` and replace the values with that identifying information.

1. Browse and play some media on your device. Take note of which media had a problem playing. Now you can move on to the next section to improve support for your device.

## Improving support for a device

1. If any of your media has a problem playing, the renderer config should be modified until it works. Refer to [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf) for the full list of options. The most common ones to change are:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Make sure you do not have `MediaInfo = false` in your new config, because that will stop the `Supported` lines from working.

1. To make sure transcoding is working on your device, play a file from the `#--TRANSCODE--#` folder. Within that folder, play one of the `FFmpeg` entries. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Bunun yanı sıra, ne yaptıklarını görmek için kurulum dizininizde "renderers" klasörü içindeki diğer işleyici yapılandırmalarına göz atabilirsiniz. Bazen yardıma ihtiyacınız olabilir, bunu size forumumuzda verebiliriz ve lütfen yaptığınız iyileştirmeden bize bahsetmeyi unutmayın, böylece cihazınızdaki diğer kullanıcılar da düzeltmeden faydalanabilir. Yayım duyurumuzda ve değişiklik günlüğümüzde size atıfta bulunacağız.
