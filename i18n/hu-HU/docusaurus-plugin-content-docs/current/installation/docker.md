# Docker

Előfordulhat, hogy ezek közül néhány lépés nem vonatkozik az Ön telepítésére.  Understand what they do, and ignore, or customize as necessary.

## Preparation

Operációs rendszer-támogatás és szervizcsomagok.

### Debian Linux

Install Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Install Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Extra instructions

```
sudo usermod -a -G docker <username>;
```

Jelentkezzen be újra, vagy indítsa újra a gépet.

```
sudo mkdir /srv/UMS;
sudo chcon -t svirt_sandbox_file_t /srv/UMS;
sudo chown core:docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Csatlakoztassa a tárhelyet a hosztra, és linkelje be azt a könyvtárat, valószínűleg csak olvashatóan.

## Konténer beállítása

Mount the following volumes:
- Media folder `/media`
- Profile folder containing UMS.conf `/profile`

A következő portok feltárása/továbbítása az állomásról: 1044, 5001, 9001.

The following scripts accomplish that (using the fish shell):
```
sudo su -;
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

It may be recommended to use the Docker-managed, named-volumes capability instead, but to avoid that complexity, I found that the additional `:Z` as a suffix to the bind mount's descriptor option value allowed container write access to host files. `:z` can also be used instead, but security advice may suggest keeping resources more isolated between application/service environments, rather than shared.

A megfelelő hibaüzenetek a journalctl segítségével láthatók, tehát SELinux problémáról van szó. The solution for that would be to run `chcon -Rt svirt_sandbox_file_t` host_dir, but that also seems discouraged.

Furcsa módon ez nem probléma a Fedora Workstation-en, de azt hiszem, a kézi telepítéssel hozzáadtam egy csomagot, ami ezt kezeli. Úgy tűnik, hogy a container-selinux.

## Referenciák

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
