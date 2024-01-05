---
sidebar_position: 2
---

# S14’te Neler Yeni

## Genel bakış

S14, kullanıcılarımızın isteklerine dayalı olarak önemli yeni özellikler içermektedir.

En büyük değişiklikler içeriğinize erişimi denetleme yeteneğini içerir. This includes improvements to user accounts like avatars and playback status per user, as well as the ability to display different content to different devices.

Ayrıca web ayarlarında ve oynatıcı arayüzlerinde, dosya gruplarını (örn. TV dizileri) tamamen oynatılmış olarak işaretleme yeteneğinin eklenmesi ve sisteminizin koyu/açık kipi tercihinin otomatik olarak algılanması da dahil olmak üzere birçok güncelleme yapılmıştır.

Ayrıca [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis.sourceforge.io/Download), [Yarn v4](https://yarnpkg.com/) ve bu Bilgi Bankasının oluşturucusu, [Docusaurus v3](https://docusaurus.io/) dahil olmak üzere bazı bağımlılıklarımızın ana sürümlerini öne çıkarma fırsatını da değerlendirdik.

Son olarak, gelecekteki hataları önlemek için deneme çerçevelerimizi geliştirmenin yanı sıra, yüzlerce hata düzeltmesi ve performans iyileştirmesi ekledik, üzerinde çalışmayı daha kolay hale getirmek için birçok kodu yeniden düzenledik.

## Yeni özellikler

### İşleyicileri ve ağ cihazlarını engelleyin/izin verin

Artık ayarlar alanındaki Giriş ekranından işleyiciye veya ağ cihazına dayanarak erişimi engelleyebilir ve izin verebilirsiniz.

![Bir işleyicinin nasıl engelleneceğine ilişkin örnek](@site/docs/img/whats-new-in-v14-block-renderer.png)

### İşleyicilere veya ağ cihazlarına varsayılan olarak izin verin veya engelleyin:

Artık işleyiciler ve ağ cihazları için varsayılan stratejiyi seçebilirsiniz. Önceden sadece tek bir strateji mümkündü: Ya her şeye izin verin ya da izinli listesiyle her şeyi reddedin. Artık tam denetim için reddetme listeleri ve izinli listeleriyle varsayılan olarak izin verebilir veya reddedebilirsiniz.

Bu, UMS’yi paylaşılan canlı durumları veya geniş/düşük güvene sahip yerel ağlar için çok daha esnek hale getirir. Ayrıca bu, komşularınızın istenmeyen erişimine neden olabileceğinden ağınız için elektrik hattı adaptörleri kullananlarınız için de faydalıdır.

![Ağ izin verme tercihinin nasıl ayarlanacağına ilişkin örnek](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![İşleyici izin verme tercihinin nasıl ayarlanacağına ilişkin örnek](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Kişiyi işleyiciye bağlantılayın

Bağımsız oynatma takibine sahip olmanızı sağlayarak artık kullanıcı hesaplarını işleyicilere/cihazlara bağlantılayabilirsiniz. Örneğin, oturma odanızda ve yatak odanızda birer TV varsa, oturma odası TV’sinin yatak odanızda izlediklerinizden etkilenmesine gerek yoktur.

![Bir hesabın işleyiciye nasıl atanacağına ilişkin örnek](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Paylaşılan içeriği belirli gruplarla sınırlandırın

Artık dizinleri veya çevrimiçi içeriği belirli gruplarla paylaşmayı seçebilirsiniz. Örneğin, çocuğunuz (veya çocuğunuza atanmış bir cihazınız) varsa, onu "Çocuklar" grubuna atayabilir ve bu grubun "Aile" dizinine erişmesini sağlayabilirsiniz, ancak "Korku" veya "Sadece Yetişkin" olanlara değil. Veya onlara Kurzgesagt web bildirimine erişim verin, ancak tarih podcast’lerine erişim vermeyin.

![Paylaşılan içerik gruplarına örnek](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatarlar

İnsanların bir bakışta görülmelerini kolaylaştırmak için avatarları olabilir. Bunları kullanıcı gruplarıyla birlikte kullanıcı ayarları sayfasında ayarlayabilirsiniz.

![Kullanıcı ayarlarının nasıl düzenleneceğine ilişkin örnek](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Doğrudan TMDB bütünleştirmesi

Artık Genel Ayarlar alanında TMDB hesabınızı UMS’ye bağlantılayabilirsiniz.

Bunu yapmak, TMDB’deki arama sonuçlarına dayanarak üstverileri düzenlemenizi sağlar:

![Bir hesabın işleyiciye nasıl atanacağına ilişkin örnek](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Daha fazla

S14’teki tüm değişikliklerin tam listesi için [tam değişiklik günlüğü](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md)’ne bakın.

## Geçiş

S13’ten S14’e geçmek için özel bir geçiş talimatı yoktur.

Tüm büyük güncellemelerde olduğu gibi, güncellemeden önce şu anki sürümünüze geri dönme olanağına sahip olmak istiyorsanız, yapılandırmanızı ve yerel veritabanınızı içeren profil dizininizin yedeğini alabilirsiniz. Bu dizinin konumunu program günlüklerinizin üst kısmına yakın bir yerde bulabilirsiniz. `Profil dizini: [bazı sayfalar]/UMS`yi arayın.
