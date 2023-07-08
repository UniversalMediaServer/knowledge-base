# Dokovací modul

Některé z těchto kroků se na vaši instalaci nevztahují.  Pochopit, co dělají, a podle potřeby ignorovat nebo přizpůsobit.

## Příprava Linuxu Fedora

Pro podporu operačního systému a balíčky služeb.

```
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo;
sudo dnf install docker-ce;
sudo usermod -a -G docker <username>;
```

Znovu se přihlašte nebo restartujte počítač.

```
sudo systemctl start docker;
sudo mkdir /srv/UMS;
sudo chcon -t svirt_sandbox_file_t /srv/UMS;
sudo chown core:docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Připojit úložiště k hostování a odkazovat do tohoto adresáře, pravděpodobně pouze pro čtení.

## Nastavení kontejneru

Připojit následující svazky a porty:
- Složka médií VOLUME /media
- Složka profilu obsahující UMS.conf VOLUME /profil

Zobrazit/povolit tyto porty hostitele: 1044, 5001, 9001

Následující skripty dělají tyto kroky:
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

Namísto toho může být doporučeno použít funkci pojmenovaných objemů řízenou dokovací stanicí, ale vyhnout se této složitosti, Zjistil jsem, že další :Z jako přípona pro svázanou hodnotu volby deskriptoru povolený přístup kontejneru k hostitelským souborům. Místo toho lze použít i :z, ale bezpečnostní doporučení mohou naznačovat, že zdroje jsou izolovanější mezi aplikacemi/servisním prostředím spíše než sdílenými.

Pomocí deníku můžete vidět odpovídající chybové zprávy, takže je to problém SELinux. Řešením by bylo spustit chcon -Rt svirt_sandbox_file_t host_dir, ale to se také zdá být odrazující.

Nejedná se o záležitost na pracovní stanici Fedory, ale domnívám se, že manulni instalace balíčku to vyřeší.  Vypadá to na container-selinux

## Odkazy

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