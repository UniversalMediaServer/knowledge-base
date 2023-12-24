---
sidebar_position: 2
---

# S14’te Neler Yeni

## Genel bakış

S14, kullanıcılarımızın isteklerine dayalı olarak önemli yeni özellikler içermektedir.

En büyük değişiklikler içeriğinize erişimi denetleme yeteneğini içerir. Farklı içerikleri farklı cihazlarda görüntüleme yeteneğinin yanı sıra buna pin kodları, avatarlar ve paylaşılan klasör grupları gibi kullanıcı hesaplarında yapılan iyileştirmeler de dahildir.

Ayrıca web ayarlarında ve oynatıcı arayüzlerinde, dosya gruplarını (örn. TV dizileri) tamamen oynatılmış olarak işaretleme yeteneğinin eklenmesi ve sisteminizin koyu/açık kipi tercihinin otomatik olarak algılanması da dahil olmak üzere birçok güncelleme yapılmıştır.

Ayrıca [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis.sourceforge.io/Download), [Yarn v4](https://yarnpkg.com/) ve bu Bilgi Bankasının oluşturucusu, [Docusaurus v3](https://docusaurus.io/) dahil olmak üzere bazı bağımlılıklarımızın ana sürümlerini öne çıkarma fırsatını da değerlendirdik.

Son olarak, gelecekteki hataları önlemek için deneme çerçevelerimizi geliştirmenin yanı sıra, yüzlerce hata düzeltmesi ve performans iyileştirmesi ekledik, üzerinde çalışmayı daha kolay hale getirmek için birçok kodu yeniden düzenledik.

## Yeni özellikler

### İşleyicileri ve ağ cihazlarını engelleyin/izin verin

Artık ayarlar alanındaki Giriş ekranından işleyiciye veya ağ cihazına dayanarak erişimi engelleyebilir ve izin verebilirsiniz.

![Bir işleyicinin nasıl engelleneceğine ilişkin örnek](@site/docs/img/whats-new-in-v14-block-renderer.png)

### İşleyicilere veya ağ cihazlarına varsayılan olarak izin verin veya engelleyin:

Artık işleyiciler ve ağ cihazları için varsayılan stratejiyi seçebilirsiniz. Önceden sadece tek bir strateji mümkündü: Ya her şeye izin verin ya da izinli listesiyle her şeyi reddedin. Artık tam denetim için reddetme listeleri ve izinli listeleriyle varsayılan olarak izin verebilir veya reddedebilirsiniz.

This makes UMS much more flexible for shared living situations or wide/low-trust local networks. It is also useful for those of you using powerline adapters for your network since that can result in unwanted access from neighbors.

![Example of how to set network allow preference](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Link person to renderer

You can now link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatars

People can have avatars to make them easier to see at a glance. You can set them on the user settings page along with the user groups

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Direct TMDB integration

You can now link your TMDB account with UMS in the General Settings area.

Doing this allows you to edit metadata based on search results from TMDB:

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### More

For a full list of all changes in v14, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

There are no special migration instructions for going from v13 to v14.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
