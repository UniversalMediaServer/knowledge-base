# Docker

Bu adımlardan bazıları kurulumunuza uygulanmayabilir.  Ne yaptıklarını anlayın ve gerekirse yoksayın ya da özelleştirin.

## Fedora Linux Hazırlığı

İşletim sistemi desteği ve hizmet paketleri için.

```
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo;
sudo dnf install docker-ce;
sudo usermod -a -G docker <username>;
```

Yeniden oturum açın veya makineyi yeniden başlatın.

```
sudo systemctl start docker;
sudo mkdir /srv/UMS;
sudo chcon -t svirt_sandbox_file_t /srv/UMS;
sudo chown core:docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Anamakineye depolamayı bağlayın ve bu dizine bağlantılayın, muhtemelen salt okunurdur.

## Kapsayıcı Ayarlama

Aşağıdaki birimleri ve bağlantı noktalarını bağlayın:
- Ortam klasörü VOLUME /media
- UMS.conf VOLUME /profile içeren profil klasörü

Anamakineden şu bağlantı noktalarını ortaya çıkarın/yönlendirin: 1044, 5001, 9001.

Aşağıdaki komut kodları bu adımları gerçekleştirir:
```
set rootDir "/home/UMS/.config/UMS";
mkdir -p "$rootDir/data";
​
for file in "UMS.conf" "WEB.conf" "ffmpeg.webfilters"
  wget -P "$rootDir" \
    "https://raw.githubusercontent.com/UniversalMediaServer/UniversalMediaServer/master/src/main/external-resources/$file" \
  ;
end
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

Adlandırılmış birimler yerine Docker tarafından yönetilen yeteneğinin kullanılması önerilebilir, ancak bu karmaşıklıktan kaçınmak için bind mount’un tanımlayıcı seçenek değerinin bir soneki olarak ek :Z’nin, anamakine dosyalarına kapsayıcı yazma erişimine izin verdiğini buldum. Bunun yerine :z de kullanılabilir, ancak güvenlik tavsiyesi, kaynakların uygulama/hizmet ortamları arasında paylaşılmak yerine daha izole tutulmasını önerebilir.

Eşleşen hata iletileri, journalctl kullanılarak görülebilir, bu nedenle bu bir SELinux sorunudur. Bunun çözümü, chcon -Rt svirt_sandbox_file_t host_dir komutunu çalıştırmak olacaktır, ancak bu pek de olası görünmez.

Garip bir şekilde bu, Fedora Workstation’da bir sorun değildir, ancak sanırım bunu yüklemek, bununla başa çıkmak için el ile bir paket ekler. Container-selinux gibi görünüyor.

## Başvurular

- https://hub.docker.com/r/universalmediaserver/ums
- https://hub.docker.com/r/atamariya/ums/
- https://www.universalmediaserver.com/forum/viewtopic.php?t=14580
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841
- https://github.com/UniversalMediaServer/UniversalMediaServer/issues/1841#issuecomment-672849793
- https://docs.docker.com/engine/install/fedora/
- https://docs.docker.com/engine/install/fedora/#install-using-the-repository
- https://pkgs.org/download/docker-ce
- https://fedora.pkgs.org/36/docker-ce-x86_64/docker-ce-20.10.16-3.fc36.x86_64.rpm.html#Install_HowTo
- https://support.universalmediaserver.com/
- https://www.universalmediaserver.com/download/#docker
- https://www.universalmediaserver.com/forum/viewtopic.php?t=12922
- https://github.com/UniversalMediaServer/UniversalMediaServer/pull/1599
- https://github.com/UniversalMediaServer/UniversalMediaServer/blob/master/docker/Dockerfile
- https://github.com/UniversalMediaServer/UniversalMediaServer/tree/master/src/main/external-resources
- https://docs.docker.com/storage/bind-mounts/#configure-the-selinux-label
- https://drive.google.com/file/d/1ORNc113a8is1K1ZZtp1r3iz44uzJDeRp/view