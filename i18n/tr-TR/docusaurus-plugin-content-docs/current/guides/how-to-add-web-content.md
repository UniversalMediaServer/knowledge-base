# Web içeriği nasıl eklenir

Bu makale web içeriğinin nasıl ekleneceğini açıklayacak.

## Görüntü yayınları

RSS bildirim bağlantılarını ekleyerek görüntü yayınlarına/kanallara abone olabilirsiniz veya YouTube söz konusu olduğunda bağlantıyı kanala girmeniz yeterlidir.

### 1: Paylaşılan İçerik bölümüne gidin

In the UMS settings in your web browser, open the menu and select Shared Content\
![Settings menu](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2: "Yeni paylaşılan içerik ekle" kalıcı penceresini açın

"Yeni paylaşılan içerik ekle" düğmesine tıkladığınızda, bu her türlü ortamı eklemenizi sağlayan bir kalıcı pencere açacaktır. The first step is to choose the "Video feed" type\
![New shared content options modal](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3: Yayınınızı ekleyin

Buraya yayınınızı ekleyebilirsiniz

#### Ad

Yayınlar kendi adlarını tanımladığından görüntü yayınları için "Ad" alanı etkisizleştirildi.

#### Yol

"Yol" alanı UMS tarafından görüntülenecek dizin yapısını tanımlar. Örneğin, eğer `Web/YouTube Kanalları`nı girerseniz yayınınız `Web` dizini içine yerleştirilmiş `YouTube Kanalları` dizininin içinde olacaktır. Bu, içeriğinizi istediğiniz gibi düzenlemenize olanak tanır ve özellikle farklı yayın sağlayıcılarınız olduğunda ve bunların tümünü aynı yerde bulunduran UMS’yi kullandığınızda kullanışlıdır.

#### Kaynak/URL

Bu görüntü yayınının bağlantısıdır. Genellikle ".xml" ile biter, ancak YouTube’un doğrudan bir kanal URL’sini kabul etmesini örn. `https://www.youtube.com/@kurzgesagt` şeklinde girmeye izin vererek farklı şekilde ele alıyoruz.

#### Yetkili gruplar

"Yetkili gruplar" alanı, bu yayını yalnızca UMS’de tanımlanmış ve farklı kullanıcılar ve/veya cihazlarla ilişkilendirilmiş belirli gruplar tarafından kullanılabilir olmasını sağlar. Daha fazla ayrıntı için [Güvenlik ve Gizlilik](../configuration/security-and-privacy.md#link-person-to-renderer) konusuna bakın.

Girdiğiniz seçeneklerden memnun olduğunuzda "Ekle" düğmesine tıklayın.

### Yayın sırası

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order\
![Shared content list and ordering ability](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort.png)

### Değişiklikleri kaydet

Daha fazla içerik eklemek/düzenlemek için önceki adımları tekrarlayabilir ve değişikliklerinizden memnun olduğunuzda sayfanın en altındaki "Kaydet" düğmesine tıklayabilirsiniz. Now you can see your content on your devices:\
![Example of a video feed on the web player](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)
