# Docker

Jotkin näistä vaiheista eivät välttämättä koske asennustasi.  Ymmärtää, mitä ne tekevät, ja sivuuttaa, tai muokata tarvittaessa.

## Valmistelu

Käyttöjärjestelmän tuki- ja huoltopakettien osalta.

### Debian Linux

Asenna Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Asenna Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Lisäohjeet

```
sudo usermod -a -G docker <username>;
```

Kirjaudu uudelleen tai käynnistä kone uudelleen.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Liitä tallennustila isäntään ja linkitä hakemistoon, todennäköisesti vain-luku. `mount <Videos-Share> '/srv/UMS/Videos'`

Testiesimerkki: Yksinkertainen symlinkki toiseen isäntäjärjestelmän polkuun ei välttämättä toimi, koska siihen ei ole pääsyä dockeriin kiinnitetyn polun ulkopuolelta.  Yritä kopioida tiedostot tämän sijainnin sisällä.

## Kontin asetukset

Mount the following volumes:
- Mediakansio `/media`
- Profiili kansio, joka sisältää UMS.confin `/profile`

Expose/forward these ports from the host: 1044, 5001, 9001.

Seuraavat skriptit suorittavat tämän (käyttäen fish-terminaalia):
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

## Ongelmien tarkasteleminen

### Yleistä

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Jostain syystä tahattomasti pysäyttää säiliön kun tarkastus on valmis..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Yksityiskohtaiset lokit ovat terminaalissa: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Mount trouble

Using Fedora CoreOS, I had access/permission denied problems trying to use bind mounts.

It may be recommended to use the Docker-managed, named-volumes capability instead, but to avoid that complexity, I found that the additional `:Z` as a suffix to the bind mount's descriptor option value allowed container write access to host files. `:z` can also be used instead, but security advice may suggest keeping resources more isolated between application/service environments, rather than shared.

Matching error messages can be seen using journalctl, so it is an SELinux problem. The solution for that would be to run `chcon -Rt svirt_sandbox_file_t` host_dir, but that also seems discouraged.

Strangely this is not an issue on Fedora Workstation, but I guess installing it manually added a package to deal with this. Seems to be container-selinux.

## Viittaukset

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
