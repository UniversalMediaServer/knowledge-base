# Docker

Einige dieser Schritte gelten möglicherweise nicht für Ihre Installation.  Verstehen, was sie tun, ignorieren oder anpassen, wenn nötig.

## Vorbereitung

Für Betriebssystem-Support und Service-Pakete.

### Debian Linux

Docker installieren (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Docker installieren (Engine): https://docs.docker.com/engine/install/fedora/

#### Zusätzliche Anweisungen

```
sudo usermod -a -G docker <username>
```

Erneut anmelden oder den Rechner neu starten.

```
sudo su -
mkdir /srv/UMS
chcon -t svirt_sandbox_file_t /srv/UMS
chgrp docker /srv/UMS
chmod -R g+w /srv/UMS
```

Speicher einbinden, um dieses Verzeichnis zu Host und zu verlinken, wahrscheinlich schreibgeschützt. `mount <Videos-Share> '/srv/UMS/Videos'`

Testbeispiel: Einfache Symlinkung zu einem anderen Pfad auf dem Host-System funktioniert möglicherweise nicht da es außerhalb des eingebauten Lautstärkepfades für den Docker-Container keinen Zugriff darauf gibt.  Kopieren Sie stattdessen Dateien in diesem Verzeichnis.

## Container-Setup

Folgende Volumes mounten:
- Media folder `/root/media`
- Profile folder containing UMS.conf `/root/.config/UMS`

Diese Ports vom Gastgeber freigeben/weiterleiten: 1044, 5001, 9001.

Die folgenden Skripte vollenden dies (unter Verwendung der fish shell):
```
sudo su -
set rootDir "$HOME/.config/UMS"
mkdir -p "$rootDir/data"
​
docker pull universalmediaserver/ums
​
docker create --name UMS \
  -p 1044:1044 -p 5001:5001 -p 9001:9001 \
  -v /srv/UMS:/root/media \
  -v "$HOME/.config/UMS":/root/.config/UMS \
  universalmediaserver/ums \
​
docker start UMS
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

Es kann notwendig sein, stattdessen die Docker-gesteuerte, benannte Volumenfunktion zu verwenden, um diese Komplexität zu vermeiden. Ich habe festgestellt, dass das zusätzliche `:Z` als Suffix für die Mount-Deskriptor-Option bind Container-Schreibzugriff auf Host-Dateien erlaubt. `:z` kann auch stattdessen verwendet werden, aber Sicherheitsberatung kann dazu führen, dass Ressourcen zwischen Anwendungen/Service-Umgebungen stärker isoliert bleiben als freigegeben.

Passende Fehlermeldungen können mit journalctl eingesehen werden, so dass es sich um ein SELinux-Problem handelt. Die Lösung dafür wäre "chcon -Rt svirt_sandbox_file_t host_dir" auszuführen, aber davon wird auch abgeraten.

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
