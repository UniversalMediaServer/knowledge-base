# Güvenlik ve Gizlilik

## Giriş

UMS, ortamı iki ana yolla sunar: ortam oynatıcı uygulamaları aracılığıyla tüketilecek DLNA/UPnP yoluyla ve web tarayıcıları aracılığıyla tüketilecek HTTP(S) yoluyla.

Web tarayıcıları, oturum açma bilgilerine sahip kullanıcı hesapları ile kolay güvenlik ve gizlilik denetimine sahiptir.

Ortam oynatıcı uygulamaları genellikle "kullanıcı" kavramını desteklemez, bu nedenle genellikle her cihaz aynı içeriği alır. İstediğiniz bu olmayabilir. Örneğin, eğer çocuklara_güvenli ve çocuklara_güvenli_değil olmak üzere iki klasörünüz varsa, çocukların odasındaki işleyicileri sadece çocuklara_güvenli klasörüne erişim sağlayacak şekilde kısıtlamak isteyebilirsiniz. Diğer bir yaygın durum da, ortamınıza erişmesini istemediğiniz ev arkadaşlarınız gibi kişilerle aynı ağda olmanız ve dolayısıyla belirli işleyicileri tamamen engellemek istemenizdir.

UMS, bu durumlarda erişimi denetlemek için bir dizi yöntem sağlar.

## İşleyicilere veya ağ cihazlarına varsayılan olarak izin verin veya engelleyin
İşleyiciler ve ağ cihazları için varsayılan stratejiyi seçebilirsiniz. Tam denetim için reddetme listeleri ve izinli listeleriyle varsayılan olarak izin verebilir veya reddedebilirsiniz.

Bu, paylaşılan canlı durumlar veya geniş/düşük güvene sahip yerel ağlar için kullanışlıdır. Ayrıca bu, komşularınızın istenmeyen erişimine neden olabileceğinden ağınız için elektrik hattı adaptörleri kullananlarınız için de faydalıdır.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## İşleyicileri ve ağ cihazlarını engelleyin/izin verin

When you have chosen whether to allow or block unrecognized renderers by default, you can build your denylist or allowlist from the Home screen in the settings area.

![Example of how to block a renderer](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Link person to renderer

You can link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

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
