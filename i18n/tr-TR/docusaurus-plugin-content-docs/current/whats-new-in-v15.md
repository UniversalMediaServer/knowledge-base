---
sidebar_position: 2
---

# S15’te Neler Yeni

## Genel bakış

V15 için 2 ana hedef, kullanıcı geri bildirimlerine ve incelemelerine dayanarak arayüzümüzü basitleştirmek ve kullanıcı hesaplarımızı kullanmayı kolaylaştırmaktı.

Bu sürümdeki değişikliklere hızlı bir bakış:

- **Çoklu oturum açmış kullanıcılar** için desteğe sahip bir **kullanıcı değiştirici**
- İki ana alan arasında değiştirmek için **kip değiştirici**: **Oynatıcı** ve **Ayarlar**
- **Pin kodu** oturum açmaları
- Değişken **TV sezonu üstverileri**
- Bir dosya **ortam bilgisi** düğmesi
- Ayrıca bildirim ve gerçek zamanlı kodumuzun yeniden yazılması, gelişmiş bellek yönetimi ve kullanılabilirliği artırmak ve istediğinizi yapmak için gereken eylem sayısını azaltmak için diğer birçok değişiklik.

## Yeni özellikler

### Kullanıcı değiştirici

Artık aynı anda bir tarayıcıda birden çok kullanıcıyla birlikte oturum açabilir ve aralarında geçiş yapabilirsiniz.

Ayrıca, mevcut kullanıcıları oturum açma ekranında görüntülemek için bir ayarı da etkinleştirebilirsiniz. Bu ayar güvenlik nedenlerinden dolayı isteğe bağlıdır, çünkü herkesin tüm kullanıcı hesaplarını görmesini istemeyebilirsiniz. Ayrıca, bu tarayıcıda oturum açtıktan sonra her hesap başına, kullanıcı hesaplarının tarayıcıya kaydedildiği bir ayar da vardır.

![Kullanıcı değiştirici örneği](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Kip değiştirici

Web arayüzü iki alana bölünmüştür: Oynatıcı ve Ayarlar.

Bu, gerekli tıklama sayısını azaltarak web arayüzünü daha sezgisel ve daha kolay gezinir hale getirmelidir.

![Kip değiştirici örneği](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Pin kodu oturum açmaları

Artık sunucu ayarlarında pin kodu oturum açmalarını etkinleştirebilirsiniz.

![Pin kodu görünümü örneği](@site/docs/img/whats-new-in-v15-pin-code.png)

### Değişken sezon üstverileri

Dizi sezonlarının bazen başlıklar ve kapak resimleri gibi kendi verileri vardır, bu yüzden şimdi bunu sezon sayfalarında görüntülüyoruz.

![Sezon görünümü örneği](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Daha fazla

S15’teki tüm değişikliklerin tam listesi için [tam değişiklik günlüğü](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md)’ne bakın.

## Geçiş

Dikkat edilmesi gereken belirli bir geçiş adımı yoktur.

Tüm büyük güncellemelerde olduğu gibi, güncellemeden önce şu anki sürümünüze geri dönme olanağına sahip olmak istiyorsanız, yapılandırmanızı ve yerel veritabanınızı içeren profil dizininizin yedeğini alabilirsiniz. Bu dizinin konumunu program günlüklerinizin üst kısmına yakın bir yerde bulabilirsiniz. `Profil dizini: [bazı sayfalar]/UMS`yi arayın.
