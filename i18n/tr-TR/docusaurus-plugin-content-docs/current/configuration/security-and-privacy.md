# Güvenlik ve Gizlilik

## Giriş

UMS, ortamı iki ana yolla sunar: ortam oynatıcı uygulamaları aracılığıyla tüketilecek DLNA/UPnP yoluyla ve web tarayıcıları aracılığıyla tüketilecek HTTP(S) yoluyla.

Web tarayıcıları, oturum açma bilgilerine sahip kullanıcı hesapları ile kolay güvenlik ve gizlilik denetimine sahiptir.

Ortam oynatıcı uygulamaları genellikle "kullanıcı" kavramını desteklemez, bu nedenle genellikle her cihaz aynı içeriği alır. İstediğiniz bu olmayabilir. Örneğin, eğer çocuklara_güvenli ve çocuklara_güvenli_değil olmak üzere iki klasörünüz varsa, çocukların odasındaki işleyicileri sadece çocuklara_güvenli klasörüne erişim sağlayacak şekilde kısıtlamak isteyebilirsiniz. Diğer bir yaygın durum da, ortamınıza erişmesini istemediğiniz ev arkadaşlarınız gibi kişilerle aynı ağda olmanız ve dolayısıyla belirli işleyicileri tamamen engellemek istemenizdir.

UMS, bu durumlarda erişimi denetlemek için bir dizi yöntem sağlar.

## İşleyicilere veya ağ cihazlarına varsayılan olarak izin verin veya engelleyin
İşleyiciler ve ağ cihazları için varsayılan stratejiyi seçebilirsiniz. Tam denetim için reddetme listeleri ve izin verme listeleriyle varsayılan olarak izin verebilir veya reddedebilirsiniz.

Bu, paylaşılan canlı durumlar veya geniş/düşük güvene sahip yerel ağlar için kullanışlıdır. Ayrıca bu, komşularınızın istenmeyen erişimine neden olabileceğinden ağınız için elektrik hattı adaptörleri kullananlarınız için de faydalıdır.

![Ağ izin verme tercihinin nasıl ayarlanacağı örneği](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![İşleyici izin verme tercihinin nasıl ayarlanacağı örneği](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## İşleyicileri ve ağ cihazlarını engelleyin/izin verin

Tanınmayan işleyiciler için varsayılan olarak izin vermeyi veya engellemeyi seçtiğinizde, ayarlar alanındaki Giriş ekranından reddetme listenizi veya izin verme listenizi oluşturabilirsiniz.

![Bir işleyicinin nasıl engelleneceği örneği](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Kişiyi işleyiciye bağlantılayın

Bağımsız oynatma takibine sahip olmanızı sağlayarak kullanıcı hesaplarını işleyicilere/cihazlara bağlantılayabilirsiniz. Örneğin, oturma odanızda ve yatak odanızda birer TV varsa, oturma odası TV’sinin yatak odanızda izlediklerinizden etkilenmesine gerek yoktur.

![Bir işleyiciye nasıl hesap atanacağı örneği](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Paylaşılan içeriği belirli gruplarla sınırlandırın

Artık dizinleri veya çevrimiçi içeriği belirli gruplarla paylaşmayı seçebilirsiniz. Örneğin, çocuğunuz (veya çocuğunuza atanmış bir cihazınız) varsa, onu "Çocuklar" grubuna atayabilir ve bu grubun "Aile" dizinine erişmesini sağlayabilirsiniz, ancak "Korku" veya "Sadece Yetişkin" içeriğe değil. Veya onlara Kurzgesagt web bildirimine erişim verin, ancak tarih podcast’lerine erişim vermeyin.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Klasörleri gizleme

Sanal klasörlerin görünürlüğünü denetleyin. Bu ayarlar, UMS.conf dosyasında bulunabilir. Göz atarken bazı klasörleri gizlemek için değerlerini true olarak ayarlayın veya gelişmiş GKA kipinden Gezinti/Paylaşım Ayarları sekmesinde bunları işaretleyin.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

Web klasörünü gizlemek için gelişmiş GKA kipinde Genel Yapılandırma sekmesinde Harici ağı etkinleştir seçeneğinin işaretini kaldırmanız veya UMS.conf dosyanızda "external_network =" değerini false olarak değiştirmeniz gerekecek. Bunun, otomatik güncelleyicinin çalışmaması gibi bir yan etkisi olacaktır. GKA’den yapılan değişiklik(ler) yeniden başlatmanın ardından etkin olacaktır.

## PIN kodu

Yukarıdaki yöntemlerin tümü, çeşitli işleyicilerden erişimi kısıtlar. Ancak, bir klasörü görmesine izin verilen bir işlemeye erişiminiz varsa, bu yöntemler size yardımcı olmayacaktır (eğer çocukların oturma odasındaki tüm ortama erişimi olan televizyona erişimi varsa, o zaman bu ortama erişimleri vardır). PIN kodu bu sorunu çözer. Klasörleri/ortamı, işlemeden girmek zorunda olduğunuz bir PIN kodunun arkasına gizlemenizi sağlar. Varsayılan olarak giriş, tıpkı bir ATM kodu gibi bir rakam (0-9) dizisidir. İşleyiciden yazmak zorlaştığı için rakam tabanlı kodlar kullanmanızı şiddetle tavsiye ederim. Ama biraz fazla paranoyaksanız, harf ekleyebilirsiniz. Şu şekilde çalışır: UMS.code adlı bir dosyayı UMS.conf dosyanızla aynı dizine ekleyin ve regexp "UMS.deny" dosyasındaki gibi düzenli bir ifade olacağından ve code ise klasöre/ortama erişim vereceği kod olacağından bu dosyaya regexp,code parametrelerini ekleyin. Kodda uzunluk düzenlemesi yoktur. Örneğin:
```
.*private.*,1234
```

Klasör/ortam "private" kelimesini içeriyorsa ve doğru kod 1234 ise sizi bir kod girmeye zorlayacak. Kod daha sonra 4 saat boyunca geçerli kalır (eğer bu süreyi değiştirmezseniz).

## Özel Cihaz Yapılandırması

Herhangi bir yapılandırma özelliği, varsayılan UMS ayarlarını geçersiz kılmak için özel bir cihaz yapılandırması oluşturularak cihaz bazında da ayarlanabilir (tam ayrıntı için Özel Cihaz Yapılandırması Oluşturma bölümüne bakın).

Örneğin, çocukların TV’sini özelleştirmek için:
- İşleyicinin GKA açılır panelinin sağ üst kısmındaki 'Bu cihazı özelleştir' düğmesine tıklayın ve yapılandırma için bir ad belirtin.
- Açılan yeni conf dosyasında, TV için geçersiz kılmak istediğiniz herhangi bir ayarı ekleyin, örn. sunucu adını değiştirmek ve farklı klasörler belirtmek için:
```
#----------------------------------------------------------------------------
# Özel Cihaz profili
# Tüm olası işleyici seçeneklerinin açıklamaları için DefaultRenderer.conf dosyasına
#  ve program seçenekleri için UMS.conf dosyasına bakın.

# Bu dosyadaki seçenekler, aşağıda listelenen belirli Sony Bravia EX cihaz(ları)ı için varsayılan ayarları geçersiz kılar.
# Cihazları, birden fazlaysa virgülle ayırarak uuid’ye (veya uuid yoksa adrese) göre belirtin.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Çocuk Şeyleri
folders = c:\cocuklar\seyler, c:\cocuklar\digerseyler
```
