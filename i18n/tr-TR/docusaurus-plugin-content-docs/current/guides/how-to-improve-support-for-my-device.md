# Cihazım için desteği nasıl iyileştirebilirim

Eğer cihazınız, klasörlere göz atmak veya bir dosyayı oynatmak gibi herhangi bir şey yapamıyorsa, işleyici yapılandırma dosyasındaki ayarları değiştirerek düzeltmeniz mümkün olabilir. Farklı cihazlar/işleyiciler/istemciler, UMS gibi sunucularla farklı şekillerde iletişim kurar, bu yüzden yapılandırma dosyası, UMS’ye cihazınızla aynı dili nasıl konuşacağını söyler.

Tüm işleyici ayarlarımızla ilgili belgeleri içeren varsayılan bir işleyici yapılandırma dosyamız var. En son sürüme https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/src/main/external-resources/renderers/DefaultRenderer.conf adresinden bakın.

Bakılması gereken yaygın ayarlar `SeekByTime`, `TranscodeVideo`, `TranscodedVideoFileSize` ve `ChunkedTransfer` bölümleridir.

Bunun yanı sıra, ne yaptıklarını görmek için kurulum dizininizde "renderers" klasörü içindeki diğer işleyici yapılandırmalarına göz atabilirsiniz. Bazen yardıma ihtiyacınız olabilir, bunu size forumumuzda verebiliriz ve lütfen yaptığınız iyileştirmeden bize bahsetmeyi unutmayın, böylece cihazınızdaki diğer kullanıcılar da düzeltmeden faydalanabilir. Yayım duyurumuzda ve değişiklik günlüğümüzde size atıfta bulunacağız.

Eğer projeye katkıda bulunacak yeni bir işleyici yapılandırmanız varsa, lütfen GitHub depomuzda https://github.com/UniversalMediaServer/UniversalMediaServer adresinde bir **Pull Request (Çekme İsteği)** oluşturun
