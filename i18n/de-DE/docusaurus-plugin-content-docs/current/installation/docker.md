# Docker

Einige dieser Schritte gelten möglicherweise nicht für Ihre Installation.  Verstehen Sie, was sie bewirken, ignorieren oder passen Sie sie, wenn nötig, an.

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

Speicher einbinden und mit diesem Verzeichnis verlinken, wahrscheinlich schreibgeschützt. `mount <Videos-Share> '/srv/UMS/Videos'`

Testbeispiel: Ein einfacher Symlink auf einen anderen Pfad auf dem Host-System funktioniert möglicherweise nicht, da es außerhalb des eingehängten Volume-Pfades für den Docker-Container keinen Zugriff gibt.  Kopieren Sie stattdessen Dateien in diesem Verzeichnis.

## Container-Einrichtung

Folgende Volumes einhängen:
- Medien-Ordner `/root/media`
- Profilordner enthält UMS.conf `/root/.config/UMS`

Diese Ports vom Gastrechner freigeben/weiterleiten: 1044, 5001, 9001.

Die folgenden Skripte bewirken dies (unter Verwendung der fish shell):
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

## Probleme untersuchen

### Allgemein

```
docker ps -a;
#docker Anhang [--no-stdin] UMS; # Hält ungewollt den Container an, wenn die Überprüfung abgeschlossen ist..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Für detaillierte Protokolle geben Sie im Terminal ein: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Einbindungsprobleme

Unter Fedora CoreOS hatte ich Probleme mit "Zugriff/die Erlaubnis verweigert", als ich versuchte, "bind mounts" zu verwenden.

Es kann empfehlenswert sein, die Docker-gesteuerte "Benannte-Volumes"-Fähigkeit zu verwenden. Um diese Komplexität jedoch zu vermeiden, habe ich herausgefunden, dass das zusätzliche Suffix `:Z` zum Wert der Descriptor-Option des bind mount-Befehls dem Container Schreibzugriff auf Dateien des Gastrechners gegeben hat. `:z` kann auch stattdessen verwendet werden, aber Sicherheitsüberlegungen könnten zu dem Ergebnis führen, dass Ressourcen zwischen Anwendungen/Service-Umgebungen stärker isoliert bleiben sollten und nicht freigegeben.

Passende Fehlermeldungen können mit journalctl eingesehen werden, also ist es ein SELinux-Problem. Die Lösung dafür wäre, `"chcon -Rt svirt_sandbox_file_t` host_dir" auszuführen, aber davon wird scheinbar auch abgeraten.

Seltsamerweise ist dies kein Problem auf Fedora-Workstation, aber ich vermute, dass die manuelle Installation ein Paket hinzugefügt hat, um damit umzugehen. Scheint container-selinux zu sein.

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
