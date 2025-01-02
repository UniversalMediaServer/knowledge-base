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

1. UMS’de `Günlükler` sekmesine gidin ve `Ortam işleyici tanınmadı metnini arayın. Olası HTTP başlıklarını tanımlama:`. Bu bilgiler, UMS’nin cihazınızı tanıması için gerekli olan bilgilerdir.

1. Yeni .conf dosyanızda `UserAgentSearch` ve/veya `UpnpDetailsSearch` parametrelerini tanımlayan satırı arayın ve değerleri bu tanımlayıcı bilgilerle değiştirin.

1. Cihazınızda bazı ortamlara göz atın ve bunları oynatın. Hangi ortamın oynatılmasında sorun yaşandığını not edin. Artık cihazınıza yönelik desteği geliştirmek için bir sonraki bölüme geçebilirsiniz.

## Bir cihaz için desteğin geliştirilmesi

1. Eğer ortamlarınızdan herhangi birinin oynatılmasında sorun varsa, işleyici yapılandırması çalışana kadar değiştirilmelidir. Seçeneklerin tam listesi için [DefaultRenderer.conf](https://raw.github.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/renderers/DefaultRenderer.conf)’a bakın. En yaygın olarak değiştirilenler şunlardır:
    ```
    Video
    Audio
    Image
    TranscodeVideo
    TranscodeAudio
    SeekByTime
    Supported
    ```
    Yeni yapılandırmanızda `MediaInfo = false` ifadesinin bulunmadığından emin olun, çünkü bu, `Supported` satırlarının çalışmasını durduracaktır.

1. Cihazınızda dönüştürmenin çalıştığından emin olmak için `#--DÖNÜŞTÜRME--#` klasöründeki bir dosyayı oynatın. Bu klasörde `FFmpeg` girişlerinden birini oynatın. If it plays, then transcoding is working.

1. The `Supported` lines need to be populated to tell UMS which files your device supports natively. It can be a good idea to find the manual for your device online and use that to help populate those lines.

1. Bunun yanı sıra, ne yaptıklarını görmek için kurulum dizininizde "renderers" klasörü içindeki diğer işleyici yapılandırmalarına göz atabilirsiniz. Bazen yardıma ihtiyacınız olabilir, bunu size forumumuzda verebiliriz ve lütfen yaptığınız iyileştirmeden bize bahsetmeyi unutmayın, böylece cihazınızdaki diğer kullanıcılar da düzeltmeden faydalanabilir. Yayım duyurumuzda ve değişiklik günlüğümüzde size atıfta bulunacağız.
