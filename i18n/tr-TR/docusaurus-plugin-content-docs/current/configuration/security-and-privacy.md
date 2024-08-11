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

You can link user accounts to renderers/devices, allowing you to have independent content access and playback tracking.

For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Paylaşılan içeriği belirli gruplarla sınırlandırın

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" content. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Klasörleri gizleme

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN kodu

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Özel Cihaz Yapılandırması

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
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
