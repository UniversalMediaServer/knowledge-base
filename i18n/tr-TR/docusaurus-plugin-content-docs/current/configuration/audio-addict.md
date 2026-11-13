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

Audio Addict stations do not announce the current track inside the audio stream. UMS asks the
service instead and delivers the result to your player, so you still see what is playing. This is
described in [Internet radio and live titles](./internet-radio).

```
# Send live titles for Audio Addict stations. On by default.
audio_addict_icy_metadata = TRUE
```

## Curated playlists

Curated playlists play one track after another from your account. When the playlist reaches its end,
UMS can start over instead of stopping:

```
# Start a curated playlist again when it ends. Off by default.
audio_addict_playlist_loop = FALSE
```

## All settings at a glance

| Setting                               | Default | Purpose                                    |
| ------------------------------------- | ------- | ------------------------------------------ |
| `audio_addict_user`                   | —       | Your account name                          |
| `audio_addict_pass`                   | —       | Your password                              |
| `audio_addict_europe`                 | `TRUE`  | Prefer the European streaming server       |
| `audio_addict_icy_metadata`           | `TRUE`  | Send live titles to the player             |
| `audio_addict_episodes_per_container` | `20`    | Episodes per group before splitting        |
| `audio_addict_tree_cache_ttl_minutes` | `60`    | How long show and episode lists are reused |
| `audio_addict_playlist_loop`          | `FALSE` | Repeat a curated playlist when it ends     |
