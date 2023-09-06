# Docker

Einige dieser Schritte gelten möglicherweise nicht für Ihre Installation.  Verstehen Sie, wie sie funktionieren, und ignorieren sie Sie oder passen Sie sie an, wenn nötig.

## Fedora Linux Vorbereitung

Für Betriebssystem-Support und Service-Pakete.

```
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo;
sudo dnf install docker-ce;
sudo usermod -a -G docker <username>;
```

Erneut anmelden oder den Rechner neu starten.

```
sudo systemctl start docker;
sudo mkdir /srv/UMS;
sudo chcon -t svirt_sandbox_file_t /srv/UMS;
sudo chown core:docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Speicher auf dem Server einbinden, um zu diesem Verzeichnis zu verlinken, wahrscheinlich schreibgeschützt.

## Container-Setup

Verbinden Sie die folgenden Volumes und Ports:
- Medienordner VOLUME /media
- Profilordner mit UMS.conf VOLUME /profile

Diese Ports vom Server freigeben/weiterleiten: 1044, 5001, 9001.

Die folgenden Skripte erledigen diese Schritte:
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

Es kann empfohlen werden, stattdessen die Docker-gesteuerte, benannte Volumenfunktion zu verwenden, um diese Komplexität zu vermeiden. Ich habe festgestellt, dass der zusätzliche :Z als Suffix für die Deskriptor-Option des Bind Mounts Container Schreibzugriff auf Host-Dateien erlaubt. :z kann stattdessen auch verwendet werden, aber Sicherheitsbetrachtungen könnten dazu führen, dass Ressourcen zwischen Anwendungen/Service-Umgebungen stärker isoliert gehalten werden statt gemeinsam genutzt.

Passende Fehlermeldungen können mit Journalctl gesehen werden, so dass es sich um ein SELinux-Problem handelt. Die Lösung dafür wäre "chcon -Rt svirt_sandbox_file_t host_dir" auszuführen, aber davon wird aich abgeraten.

Seltsamerweise ist dies kein Problem auf der Fedora-Workstation, aber ich vermute, dass die manuelle Installation ein Paket hinzugefügt hat, um damit umzugehen. Anscheinend Container-selinux.

## Verweise

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