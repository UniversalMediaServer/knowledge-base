# Audio Addict Network Radio

**Audio Addict Network**, premium internet radyo istasyonlarından oluşan bir koleksiyondur, aşağıdakiler dahil:

Classical Radio, Radio Tunes, Rock Radio, Jazz Radio, Zen Radio ve DI.fm.

Bu radyo istasyonlarına erişmek için ücretli bir **premium hesap** gereklidir. Aynı kullanıcı adı ve parola hepsine erişim sağlayacağından yalnızca sitelerden birine kaydolmanız gerekir.

UMS, mevcut tüm AudioAddict radyo sitelerini, kanallarını ve süzgeçlerini otomatik olarak okur. **Favorites** kanalı da desteklenmektedir.

## Yapılandırma

AudioAddict desteğini etkinleştirmek için `UMS.conf` dosyanıza aşağıdaki satırları ekleyin:

```
# TRUE = Avrupa akış sunucusunu tercih eder
audio_addict_europe = TRUE veya FALSE

# Kullanıcı adınız
audio_addict_user = KULLANICI ADI

# Parolanız
audio_addict_pass = PAROLA
```

## Konum

**Audio Addict Radio Network** klasörü ortam kitaplığınızda bulunur. Buradan mevcut tüm istasyonlara doğrudan göz atabilir ve bunlara doğrudan erişebilirsiniz.

## Programlar ve bölümler

DI.fm ağı, canlı istasyonların yanı sıra bir **Olaylar** klasörü de sunar. Yaklaşan programları listeler ve zaten yayınlanmış bir programın kaydını da sunar, böylece daha sonra dinleyebilirsiniz.

Arka kataloğu olan programlar, eski bölümleri tutan kendilerine ait bir klasöre sahiptir. Bazı programların yüzlercesi bulunur, bu yüzden klasör, her biri içerdiği bölüm numaraları ve tarihlerle etiketlenmiş daha küçük gruplara bölünmüştür.

```
# Bir grubun bölünmeden önce elinde tuttuğu bölüm sayısı. Varsayılan 20, en az 1.
audio_addict_episodes_per_container = 20
```

Bu listeyi oluşturmak, biraz zaman alan, hizmetten etkinlikleri ve her programın bölümlerini istemek anlamına gelir. UMS yanıtı hatırlar böylece gözatma ve oynatmayı başlatmadan tekrar ücret ödenmez:

```
# Program ve bölüm listelerinin dakika olarak ne kadar süreyle yeniden kullanıldığı.
# Varsayılan 60. Hizmete her seferinde sormak için 0’a ayarlayın.
audio_addict_tree_cache_ttl_minutes = 60
```

Daha uzun bir süre gözatmayı daha hızlı hale getirir, daha kısa bir süre yeni yayınlanan bölümleri daha çabuk alır. UMS’nin aldığı adresler varsayılan saatten çok daha uzun süre geçerli kalır, bu yüzden bu değeri küçük tutmaya gerek yoktur.

## Canlı başlıklar

Audio Addict istasyonları ses akışı içinde şu anki parçayı duyurmaz. UMS bunun yerine hizmete sorar ve sonucu çalıcınıza iletir, böylece ne çalındığını görmeye devam edersiniz. Bu, [İnternet radyosu ve canlı başlıklar](./internet-radio) bölümünde açıklanır.

```
# Audio Addict istasyonları için canlı başlıklar gönderin. Varsayılan olarak açıktır.
audio_addict_icy_metadata = TRUE
```

## Seçmece çalma listeleri

Seçmece çalma listeleri, hesabınızdaki parçaları birbiri ardına çalar. Çalma listesi sona erdiğinde, UMS durmak yerine baştan başlayabilir:

```
# Seçmece bir çalma listesini sona erdiğinde yeniden başlatın. Varsayılan olarak kapalıdır.
audio_addict_playlist_loop = FALSE
```

## Bir bakışta tüm ayarlar

| Ayar                                  | Varsayılan | Amaç                                                            |
| ------------------------------------- | ---------- | --------------------------------------------------------------- |
| `audio_addict_user`                   | —          | Hesap adınız                                                    |
| `audio_addict_pass`                   | —          | Parolanız                                                       |
| `audio_addict_europe`                 | `TRUE`     | Avrupa yayın akışı sunucusunu tercih et                         |
| `audio_addict_icy_metadata`           | `TRUE`     | Çalıcıya canlı başlıklar gönder                                 |
| `audio_addict_episodes_per_container` | `20`       | Ayırmadan önce grup başına bölümler                             |
| `audio_addict_tree_cache_ttl_minutes` | `60`       | Program ve bölüm listeleri ne kadar süreyle yeniden kullanılsın |
| `audio_addict_playlist_loop`          | `FALSE`    | Seçmece bir çalma listesini bittiğinde tekrarla                 |
