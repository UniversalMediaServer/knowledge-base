# Docker

Některé z těchto kroků se na vaši instalaci nemusí vztahovat.  Nejprve si ujasněte, k čemu slouží, a podle potřeby je vynechte nebo upravte.

## Příprava

Pro podporu operačního systému a balíčky služeb.

### Debian Linux

Nainstalujte Docker Engine: https://docs.docker.com/engine/install/debian/

### Fedora Linux

Nainstalujte Docker Engine: https://docs.docker.com/engine/install/fedora/

#### Další pokyny

```
sudo usermod -a -G docker <username>;
```

Znovu se přihlašte nebo restartujte počítač.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Připojte úložiště k hostitelskému systému a zpřístupněte je v tomto adresáři, pravděpodobně pouze pro čtení. `mount <Videos-Share> '/srv/UMS/Videos'`

Zkušební příklad: Pouhý symbolický odkaz na jinou cestu v hostitelském systému nemusí fungovat, protože kontejner Dockeru nemá přístup mimo cestu připojeného svazku.  Zkuste místo toho soubory zkopírovat přímo do tohoto umístění.

## Nastavení kontejneru

Připojte následující svazky:
- Složka médií `/root/media`
- Složka profilu obsahující UMS.conf `/root/.config/UMS`

Zpřístupněte nebo přesměrujte tyto porty hostitele: 1044, 5001, 9001.

Provedou to následující skripty používající shell fish:
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

## Hledání příčin problémů

### Obecně

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Po dokončení kontroly stále neúmyslně zastavuje kontejner.
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Pro podrobné protokoly v terminálu: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Potíže s připojením svazků

Při použití Fedora CoreOS jsem při pokusu o připojení hostitelských adresářů (bind mounts) narazil na chyby odepřeného přístupu.

Místo toho lze doporučit pojmenované svazky spravované Dockerem. Abych se však vyhnul dalším komplikacím, zjistil jsem, že přidání přípony `:Z` k definici připojeného adresáře umožnilo kontejneru zapisovat do souborů hostitele. Lze použít také `:z`, ale z bezpečnostního hlediska může být vhodnější prostředky mezi aplikacemi a službami oddělit, místo aby je sdílely.

Odpovídající chybové zprávy lze zobrazit pomocí journalctl, jde tedy o problém se SELinuxem. Řešením by bylo spustit `chcon -Rt svirt_sandbox_file_t` host_dir, ale ani tento postup se zřejmě nedoporučuje.

Ve Fedora Workstation se tento problém kupodivu nevyskytuje. Předpokládám, že se při ruční instalaci přidal balíček, který jej řeší. Zřejmě jde o container-selinux.

## Odkazy

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
