# Web içeriği nasıl eklenir

Bu makale web içeriğinin nasıl ekleneceğini açıklayacak.

## Görüntü yayınları

RSS bildirim bağlantılarını ekleyerek görüntü yayınlarına/kanallara abone olabilirsiniz veya YouTube söz konusu olduğunda bağlantıyı kanala girmeniz yeterlidir.

### 1: Paylaşılan İçerik bölümüne gidin

Web tarayıcınızdaki UMS ayarlarında menüyü açın ve Paylaşılan İçerik’i seçin\
![Ayarlar menüsü](./img/how-to-add-web-content-1-shared-content.png)

### 2: "Yeni paylaşılan içerik ekle" kalıcı penceresini açın

"Yeni paylaşılan içerik ekle" düğmesine tıkladığınızda, bu her türlü ortamı eklemenizi sağlayan bir kalıcı pencere açacaktır. İlk adım "Görüntü yayını" türünü seçmektir\
![Yeni paylaşılan içerik seçenekleri kalıcı penceresi](./img/how-to-add-web-content-2-add-modal.png)

### 3: Yayınınızı ekleyin

Buraya yayınınızı ekleyebilirsiniz

#### Ad

Yayınlar kendi adlarını tanımladığından görüntü yayınları için "Ad" alanı etkisizleştirildi.

#### Yol

"Yol" alanı UMS tarafından görüntülenecek dizin yapısını tanımlar. For example, if you enter `Web/YouTube Channels`, your feed will be inside the `YouTube Channels` directory, nested within the `Web` directory. This lets you organize your content however you want, and is especially useful when you have different feed providers, and you are using UMS have them all in the same place.

#### Source/URL

This is the link to the video feed. It will usually end in `.xml`, but we handle YouTube differently to accept a channel URL directly, allowing you to enter e.g. `https://www.youtube.com/@kurzgesagt`

#### Authorized groups

The "Authorized groups" field lets you make this feed only available to certain groups defined in UMS that are associated with different users and/or devices. See [Security and Privacy](../configuration/security-and-privacy.md#link-person-to-renderer) for more details.

When you are happy with the options you entered, select the "Add" button.

### Feed order

If the feed link was valid, you should now see the "Name" field populated, and now you can drag the feed up or down to control the order\
![Shared content list and ordering ability](./img/how-to-add-web-content-3-see-name-and-sort.png)

### Save changes

You can repeat the previous steps to add/edit more content, and when you are happy with your changes, select the "Save" button at the bottom of the page. Now you can see your content on your devices:\
![Example of a video feed on the web player](./img/how-to-add-web-content-4-feed-player.png)
