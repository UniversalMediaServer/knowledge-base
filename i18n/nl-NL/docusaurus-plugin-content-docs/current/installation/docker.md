# Docker

Sommige van deze stappen zijn mogelijk niet van toepassing op jouw installatie.  Begrijp wat ze doen en negeren of pas aan als nodig.

## Voorbereiding

Voor besturingsysteem ondersteuning en servicepakketten.

### Debian Linux

Installeer Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Installeer Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Extra instructies

```
sudo usermod -a -G docker <username>;
```

Herlog of herstart de machine.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Koppel de opslag aan de host en maak een link naar die map, waarschijnlijk alleen-lezen. `mount <Videos-Share> '/srv/UMS/Videos'`

Test voorbeeld: Eenvoudige symlink naar een ander pad op het host-systeem werkt mogelijk niet, omdat er buiten het gekoppelde volumepad voor de docker geen toegang meer zal zijn.  Probeer in plaats daarvan bestanden naar deze locatie te kopiëren.

## Container setup

Koppel de volgende volumes
- Mediamap `/root/media`
- Profielmap met UMS.conf `/root/.config/UMS`

Stel de volgende poorten vanaf de host beschikbaar/stuur ze door: 1044, 5001, 9001.

De volgende scripts bereiken dat (met behulp van de fish shell):
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

## Problemen/problemen onderzoeken

### Algemeen

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Nog steeds onbedoeld stopt container bij inspecteren ..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Voor gedetailleerde logs in de terminal: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Koppel problemen

Met behulp van Fedora CoreOS had ik toestemming geweigerd om bind mounts te gebruiken.format@@0

Het kan worden aangeraden om in plaats daarvan het Docker-management- en naamvolume te gebruiken, maar om die complexiteit te vermijden. Ik vond dat de extra `:Z` als achtervoegsel van de beschrijvingswaarde van de bind-mount, de schrijfrechten van de container voor de host bestanden toestaat. `:z` kan ook worden gebruikt, maar veiligheidsadvies kan suggereren dat bronnen meer geïsoleerd worden gehouden tussen toepassingen/serviceomgevingen in plaats van gedeeld.

Overeenkomende foutmeldingen kunnen worden gezien met journalctl, dus is het een probleem met SELinux. De oplossing hiervoor zou zijn om `chcon -Rt svirt_sandbox_t` host_dir, maar dat lijkt ook ontmoedigd te zijn.

Vreemd genoeg is dit geen probleem op Fedora Workstation, maar ik denk dat handmatig een pakket moet worden geïnstalleerd om dit aan te pakken. Het lijkt op container-selinux.

## Referenties

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
