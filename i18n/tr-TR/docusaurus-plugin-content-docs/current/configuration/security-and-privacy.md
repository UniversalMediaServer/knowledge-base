# Güvenlik ve Gizlilik

UMS bir DLNA sunucusudur. Artık DLNA, gerçek bir "kullanıcı" kavramına sahip olmayan bir protokoldür. Örneğin, TV’nizde "oturum açmak" zorunda değilsiniz. Bu, tüm işleyicilerin aynı verilere erişmesine yol açar. İstediğiniz bu olmayabilir. Örneğin, eğer çocuklara_güvenli ve çocuklara_güvenli_değil olmak üzere iki klasörünüz varsa, çocuk odasındaki işleyicileri sadece çocuklara_güvenli klasörüne erişim sağlayacak şekilde kısıtlamak isteyebilirsiniz. UMS, erişimi denetlemek için bir dizi yöntem sağlar. 

## IP süzgeci

IP süzme, UMS’nin sağladığı en kısıtlayıcı yöntemdir. Kullanmak için bağlanmasına izin verilen IP adreslerinin virgülle ayrılmış bir listesini sağlarsınız. Adresi listedeki girişlerle eşleşmeyen bir işleme, basitçe trafiğinin yoksayılmasını sağlayacak (UMS ile çok erkenden). HİÇBİR klasöre erişemeyecektir (bir kök klasöri bile görmeyecek). Çocukları tamamen engellemek için bu yöntemi kullanın. Daha fazla ayrıntı için UMS.conf dosyasında ip_filter açıklamasına bakın.

Sadece 2 adrese izin verme örneği

```
ip_filter = 192.168.1.4, 192.168.1.32
```

## İzinli listesi

İzinli listesi oluşturma, temelde kök klasörü işleme başına özelleştirmenize izin veren bir yöntemdir. Bu, farklı klasör kümelerini farklı işleyicilerle paylaşılmasını mümkün kılar. Şu şekilde çalışır: UMS.conf dosyanız (şu anda GKA seçeneği yoktur) için etiketin ya bir IP adresi ya da bir işleme adı olduğu tag.option = value biçimi satırlarını ekleyin. İşleme adındaki boşluklar bunun yerine _ (alt çizgi) olarak değiştirilmelidir. Seçenek şunlardan biridir:

- folders
- vfolders
- web
- hide_set

Değer, seçeneğe bağlıdır. Son 4, boolean değeridir. Klasörler ve sanal klasörler için bir klasör listesidir.

Örnek

```
folders = 
hide_video_settings = false
192.168.1.1.folders = c:\\çocuk_güvenliği
192.168.1.1.hide_set = true
```

Bu, 192.168.1.1 IP adresi için olacak:

- c:\çocuk_güvenliği klasörünü paylaşın
- Sunucu Ayarları klasörünü gizleyin
- Son çalınanlar listesini gizleyin

Diğer tüm işleyiciler "genel" ayarları, yani tüm klasörleri görecek ve Sunucu Ayarlarını kullanacaktır.

Eğer bir seçenek mevcut değilse, "genel" yapılandırmaya geri dönecek veya bu varsayılan değerde mevcut değilse.

## UMS.deny

Beyaz liste sadece kök klasör görünümünü değiştirebilir. Ancak, karışık bir şeyiniz varsa (10 klasörünüz var, ancak sadece biri çocuklar için sınırlandırılmalıdır). Tek tek klasörlere (veya ortama) erişimi denetlemek için UMS.deny dosyasını kullanabilirsiniz. Şu şekilde çalışır: UMS.conf dosyanızla aynı dizine UMS.deny adlı bir dosya ekleyin ve bu dosyanın içine etiket ekleyin.[name|file|sys]=regex Eklenmesi gereken her klasör/dosya için UMS, düzenli ifadeyi klasör adına veya dosya adına uygulayacak ve eğer düzenli ifade eşleşirse klasör/dosya EKLENMEYECEKTİR. Örneğin:
```
192.168.1.1.name=.*private.*
```

içinde private kelimesi bulunan tüm klasörleri/dosyaları kaldıracak.
```
192.168.1.1.file=c:\\tst.*
```

dosya yolunda vb. içinde c:\tst bulunan tüm dosyaları kaldıracak.

Eğer "UMS.deny" dosyasında herhangi bir kural ayarlanmamışsa, dosyalar/klasörler eklenecektir.

Klasörleri gizleme

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
