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

You can now enable pin code logins in the server settings.

![Example of the pin code view](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynamic season metadata

Seasons of TV shows sometimes have their own data like titles and cover images, so now we display that on the season pages.

![Example of season view](@site/docs/img/whats-new-in-v15-season-metadata.png)

### More

For a full list of all changes in v15, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

There are no specific migration steps to be aware of.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
