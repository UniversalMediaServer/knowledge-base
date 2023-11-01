# Docker

Some of these steps may not apply to your installation.  Entendre el que fan i ignorar o personalitzar segons sigui necessari.

## Preparació

For operating system support and service packages.

### Linux Debian

Instal·leu Docker (motor): https://docs.docker.com/engine/install/debian/

### Linux Fedora

Instal·leu Docker (motor): https://docs.docker.com/engine/install/fedora/

#### Instruccions addicionals

```
sudo usermod -a -G docker <username>;
```

Re-login or restart the machine.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Mount storage to host and link into that directory, probably read-only. `mount <Videos-Share> '/srv/UMS/Videos'`

Test example: Simple symlinking to another path on the host system may not work, since there will be no access to it outside of the mounted volume path for the docker container.  Try copying files inside this location instead.

## Container Setup

Munta els volums següents:
- Media folder `/media`
- Profile folder containing UMS.conf `/profile`

Expose/forward these ports from the host: 1044, 5001, 9001.

Fer-ho amb els scripts següents (utilitzant la closca de peix):
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

## Investigating Problems/Issues

### General

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Still unintentionally stops container when done inspecting..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

For detailed logs in the terminal: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Mount trouble

Using Fedora CoreOS, I had access/permission denied problems trying to use bind mounts.

Potser sigui recomanable utilitzar la capacitat de volums amb nom gestionada per Docker, però per evitar aquesta complexitat, vaig trobar que el `:Z` addicional com a sufix del valor de l'opció de descriptor del muntatge d'enllaç permetia l'escriptura del contenidor. accés als fitxers host. ​Consulta els detalls També es pot utilitzar I`:z`, però els consells de seguretat poden suggerir mantenir els recursos més aïllats entre entorns d'aplicació/servei, en lloc de compartir-los.

Matching error messages can be seen using journalctl, so it is an SELinux problem. La solució per a això seria executar `chcon -Rt svirt_sandbox_file_t` host_dir, però això també sembla desanimat.

Strangely this is not an issue on Fedora Workstation, but I guess installing it manually added a package to deal with this. Seems to be container-selinux.

## References

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
