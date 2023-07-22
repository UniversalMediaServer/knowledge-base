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

Beyaz liste sadece kök klasör görünümünü değiştirebilir. Ancak, karışık bir şeyiniz varsa (10 klasörünüz var, ancak sadece biri çocuklar için sınırlandırılmalıdır). Tek tek klasörlere (veya ortama) erişimi denetlemek için UMS.deny dosyasını kullanabilirsiniz. Aşağıdaki gibi çalışır: UMS.conf dosyanızla aynı dizine UMS.deny adlı bir dosya ekleyin ve bu dosyanın içine etiket ekleyin.[name|file|sys]=regex Eklenmesi gereken her klasör/dosya için UMS, düzenli ifadeyi klasör adına veya dosya adına uygulayacak ve eğer düzenli ifade eşleşirse klasör/dosya EKLENMEYECEKTİR. Örneğin:
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

Yukarıdaki yöntemlerin tümü, çeşitli işleyicilerden erişimi kısıtlar. Ancak, bir klasörü görmesine izin verilen bir işlemeye erişiminiz varsa, bu yöntemler size yardımcı olmayacaktır (eğer çocukların oturma odasındaki tüm ortama erişimi olan televizyona erişimi varsa, o zaman bu ortama erişimleri vardır). PIN kodu bu sorunu çözer. Klasörleri/ortamı, işlemeden girmek zorunda olduğunuz bir PIN kodunun arkasına gizlemenizi sağlar. Varsayılan olarak giriş, tıpkı bir ATM kodu gibi bir rakam (0-9) dizisidir. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
