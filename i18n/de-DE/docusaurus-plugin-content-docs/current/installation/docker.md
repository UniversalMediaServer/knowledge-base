# Docker

Einige dieser Schritte gelten möglicherweise nicht für Ihre Installation.  Understand what they do, and ignore, or customize as necessary.

## Preparation

Für Betriebssystem-Support und Service-Pakete.

### Debian Linux

Install Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Install Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Extra instructions

```
sudo usermod -a -G docker <username>;
```

Erneut anmelden oder den Rechner neu starten.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Mount storage to host and link into that directory, probably read-only. `mount <Videos-Share> '/srv/UMS/Videos'`

Test example: Simple symlinking to another path on the host system may not work, since there will be no access to it outside of the mounted volume path for the docker container.  Try copying files inside this location instead.

## Container-Setup

Mount the following volumes:
- Media folder `/media`
- Profile folder containing UMS.conf `/profile`

Diese Ports vom Server freigeben/weiterleiten: 1044, 5001, 9001.

The following scripts accomplish that (using the fish shell):
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

## Probleme und Probleme untersuchen

### Allgemein

```
docker ps -a;
#docker Anhang [--no-stdin] UMS; # Ungewollt den Container stoppen, wenn die Prüfung abgeschlossen wird..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Für detaillierte Protokolle geben Sie im Terminal ein: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Einbindungsprobleme

Bei der Verwendung von Fedora CoreOS hatte ich Zugriff/Erlaubnis verweigert bei der Verwendung von Bind Mounts.

It may be recommended to use the Docker-managed, named-volumes capability instead, but to avoid that complexity, I found that the additional `:Z` as a suffix to the bind mount's descriptor option value allowed container write access to host files. `:z` can also be used instead, but security advice may suggest keeping resources more isolated between application/service environments, rather than shared.

Passende Fehlermeldungen können mit Journalctl gesehen werden, so dass es sich um ein SELinux-Problem handelt. The solution for that would be to run `chcon -Rt svirt_sandbox_file_t` host_dir, but that also seems discouraged.

Seltsamerweise ist dies kein Problem auf der Fedora-Workstation, aber ich vermute, dass die manuelle Installation ein Paket hinzugefügt hat, um damit umzugehen. Anscheinend Container-selinux.

## Verweise

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
