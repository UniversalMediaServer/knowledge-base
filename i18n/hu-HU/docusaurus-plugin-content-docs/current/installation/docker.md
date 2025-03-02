# Docker

Előfordulhat, hogy ezek közül néhány lépés nem vonatkozik az Ön telepítésére.  Kérjük értelmezze, hogy mire jók egyes lépések, és hagyja figyelmen kívül, vagy alakítsa tetszése szerint.

## Előkészületek

Operációs rendszer-támogatás és szervizcsomagok.

### Debian Linux

Telepítse a Docker-t (Motor): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Telepítse a Docker-t (Motor): https://docs.docker.com/engine/install/fedora/

#### Extra instrukciók

```
sudo usermod -a -G docker <felhasználónév>;
```

Jelentkezzen be újra, vagy indítsa újra a gépet.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Csatlakoztassa a tárhelyet a hosztra, és linkelje be a könyvtárba, valószínűleg csak olvashatóan. `mount <Videos-Share> '/srv/UMS/Videos'`

Teszt példa: Előfordulhat, hogy a gazdagép rendszeren egy másik elérési útra való egyszerű szimlinkelés nem működik, mivel a docker-tároló csatlakoztatott kötetútvonalán kívül nem lesz elérhető.  Próbálja meg ehelyett a fájlok másolását ezen a helyen belülre.

## Konténer beállítása

Csatlakoztassa a következő köteteket:
- Media folder `/root/media`
- Profile folder containing UMS.conf `/root/.config/UMS`

A következő portok feltárása/továbbítása az állomásról: 1044, 5001, 9001.

a következő szkriptek valósítják meg ezt (a fish shell használatával):
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

## Problémák/problémák kivizsgálása

### Általános

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Még mindig véletlenül leállítja a konténert, amikor befejezte a vizsgálatot..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Részletes naplók a terminálban: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Mount hiba

A Fedora CoreOS-t használva hozzáférési/engedélyezési problémáim voltak, amikor megpróbáltam használni a kötési kötéseket.

Lehet, hogy ehelyett a Docker által kezelt, nevesített kötetek képességének használata ajánlott, de ennek a bonyolultságnak az elkerülése érdekében azt tapasztaltam, hogy a bind mount descriptor opció értékéhez hozzáadott `:Z` mint utótag lehetővé teszi a konténer írási hozzáférését az állomásfájlokhoz. :z is használható helyette, de a biztonsági tanácsok azt javasolhatják, hogy az erőforrásokat inkább az alkalmazás/szolgáltatás környezetek között elkülönítve tartsuk, mintsem megosztva.

A megfelelő hibaüzenetek a journalctl segítségével láthatók, tehát SELinux problémáról van szó. A megoldás erre a  `chcon -Rt svirt_sandbox_file_t` host_dir futtatása lenne, de ez is elvetendőnek tűnik.

Furcsa módon ez nem probléma a Fedora Workstation-en, de azt hiszem, a kézi telepítéssel hozzáadtam egy csomagot, ami ezt kezeli. Úgy tűnik, hogy a container-selinux.

## Referenciák

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
