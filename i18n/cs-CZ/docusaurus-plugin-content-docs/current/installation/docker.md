# Dokovací modul

Některé z těchto kroků se na vaši instalaci nevztahují.  Pochopit, co dělají, a ignorovat nebo podle potřeby přizpůsobit.

## Příprava

Pro podporu operačního systému a balíčky služeb.

### Debian Linux

Instalovat Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Instalovat Docker (Engine): https://docs.docker.com/engine/install/fedora/

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

Mount storage to host and link into that directory, probably read-only. `mount <Videos-Share> '/srv/UMS/Videos'`

Test example: Simple symlinking to another path on the host system may not work, since there will be no access to it outside of the mounted volume path for the docker container.  Try copying files inside this location instead.

## Nastavení kontejneru

Připojte následující svazky:
- Složka médií `/media`
- Složka profilu obsahující UMS.conf `/profile`

Zobrazit/povolit tyto porty hostitele: 1044, 5001, 9001

Tyto skripty to docílí (pomocí fish shell):
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

## Vyšetřování problémů/problémů

### Obecná ustanovení

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Přesto nezáměrně zastaví kontejner při provedení prohlídky..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Podrobné logy v terminálu: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problém s připojením

Použití Fedora CoreOS, jsem měl přístup a oprávnění odepřen problémy se spojením spojení.

Namísto toho může být doporučeno použít funkci pojmenovaných objemů řízenou dokovací stanicí, ale vyhnout se této složitosti, Zjistil jsem, že dodatečná `:Z` jako přípona pro příponu deskriptoru povolená hodnota deskriptoru kontejneru pro zápis do hostitelských souborů. Místo toho lze použít i `:z` ale bezpečnostní doporučení mohou naznačovat, že zdroje jsou izolovanější mezi aplikacemi/servisním prostředím spíše než sdílenými.<0><0>

Pomocí deníku můžete vidět odpovídající chybové zprávy, takže je to problém SELinux. Řešením by bylo spustit `chcon -Rt svirt_sandbox_file_t` host_dir, ale to se také nezdá být dobré.

Nejedná se o záležitost na pracovní stanici Fedory, ale domnívám se, že manulni instalace balíčku to vyřeší.  Vypadá to na container-selinux

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
