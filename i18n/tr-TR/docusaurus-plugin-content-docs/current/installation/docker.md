# Docker

Bu adımlardan bazıları kurulumunuza uygulanmayabilir.  Ne yaptıklarını anlayın ve gerekirse yoksayın ya da özelleştirin.

## Hazırlık

İşletim sistemi desteği ve hizmet paketleri için.

### Debian Linux

Docker’ı (Motor) yükleyin: https://docs.docker.com/engine/install/debian/

### Fedora Linux

Docker’ı (Motor) yükleyin: https://docs.docker.com/engine/install/fedora/

#### Fazladan talimatlar

```
sudo usermod -a -G docker <username>;
```

Yeniden oturum açın veya makineyi yeniden başlatın.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Anamakineye depolamayı bağlayın ve bu dizine bağlantılayın, muhtemelen salt okunurdur. `mount <Videos-Share> '/srv/UMS/Videos'`

Deneme örneği: Docker kapsayıcı için bağlanan birim yolunun dışında bu yola erişim olmayacağından, anamakine sistemindeki başka bir yola basit sembolik bağlantı çalışmayabilir.  Bunun yerine dosyaları bu konuma kopyalamayı deneyin.

## Kapsayıcı Ayarlama

Aşağıdaki birimleri bağlayın:
- Ortam klasörü `/media`
- UMS.conf `/profile` içeren profil klasörü

Anamakineden şu bağlantı noktalarını ortaya çıkarın/yönlendirin: 1044, 5001, 9001.

Aşağıdaki komut kodları bunu gerçekleştirir (balık kabuğunu kullanarak):
```
sudo su -;
set rootDir "$HOME/.config/UMS";
mkdir -p "$rootDir/data";
​
docker pull universalmediaserver/ums;
​
docker create --name UMS \
  -p 1044:1044 -p 5001:5001 -p 9001:9001 \
  -v /srv/UMS:/root/media \
  -v "$HOME/.config/UMS":/root/.config/UMS \
  universalmediaserver/ums \
;
​
docker start UMS;
```

## Sorunları/Sıkıntıları Araştırma

### Genel

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Araştırma bittiğinde yine de istemeden kapsayıcıyı durdurur.
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Terminaldeki ayrıntılı günlükler için: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Bağlama sorunu

Fedora CoreOS kullanarak, bind mount’ları kullanmaya çalışırken erişim/izin verilmedi sorunları yaşadım.

Adlandırılmış birimler yerine Docker tarafından yönetilen yeteneğinin kullanılması önerilebilir, ancak bu karmaşıklıktan kaçınmak için bind mount’un tanımlayıcı seçenek değerinin bir soneki olarak ek `:Z`’nin, anamakine dosyalarına kapsayıcı yazma erişimine izin verdiğini buldum. Bunun yerine `:z` de kullanılabilir, ancak güvenlik tavsiyesi, kaynakların uygulama/hizmet ortamları arasında paylaşılmak yerine daha izole tutulmasını önerebilir.

Eşleşen hata iletileri, journalctl kullanılarak görülebilir, bu nedenle bu bir SELinux sorunudur. Bunun çözümü, `chcon -Rt svirt_sandbox_file_t` host_dir komutunu çalıştırmak olacaktır, ancak bu pek de olası görünmez.

Garip bir şekilde bu, Fedora Workstation’da bir sorun değildir, ancak sanırım bunu yüklemek, bununla başa çıkmak için el ile bir paket ekler. Container-selinux gibi görünüyor.

## Başvurular

- https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label
- https://drive.google.com/file/d/1ORNc113a8is1K1ZZtp1r3iz44uzJDeRp/view
- https://fedora.pkgs.org/36/docker-ce-x86_64/docker-ce-20.10.16-3.fc36.x86_64.rpm.html#Install_HowTo
- https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/docker/Dockerfile
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841#issuecomment-672849793
- https://github.com/UniversalMediaServer/UniversalMediaServer/pull/1599
- https://github.com/UniversalMediaServer/UniversalMediaServer/tree/master/src/main/external-resources
- https://hub.docker.com/r/universalmediaserver/ums
- https://hub.docker.com/r/atamariya/ums/
- https://pkgs.org/download/docker-ce
- https://support.universalmediaserver.com/
- https://www.universalmediaserver.com/download/#docker
- https://www.universalmediaserver.com/forum/viewtopic.php?t=12922
- https://www.universalmediaserver.com/forum/viewtopic.php?t=14580
- https://www.universalmediaserver.com/forum/viewtopic.php?p=47952
