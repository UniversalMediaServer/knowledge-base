# Docker

Niektoré z týchto krokov sa nemusia vzťahovať na vašu inštaláciu.  Najprv si overte, na čo slúžia, a podľa potreby ich vynechajte alebo upravte.

## Príprava

Podpora operačného systému a potrebné balíky služieb.

### Debian Linux

Nainštalujte Docker Engine: https://docs.docker.com/engine/install/debian/

### Fedora Linux

Nainštalujte Docker Engine: https://docs.docker.com/engine/install/fedora/

#### Ďalšie pokyny

```
sudo usermod -a -G docker <username>;
```

Odhláste sa a znova prihláste alebo reštartujte počítač.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Pripojte úložisko k hostiteľskému systému a sprístupnite ho v tomto priečinku, pravdepodobne iba na čítanie. `mount <Videos-Share> '/srv/UMS/Videos'`

Skúšobný príklad: Samotný symbolický odkaz na inú cestu v hostiteľskom systéme nemusí fungovať, pretože kontajner Docker nemá prístup k cestám mimo pripojeného zväzku.  Namiesto toho skúste do tohto umiestnenia súbory skopírovať.

## Nastavenie kontajnera

Pripojte nasledujúce zväzky:
- Priečinok s médiami `/root/media`
- Priečinok profilu obsahujúci UMS.conf `/root/.config/UMS`

Sprístupnite alebo presmerujte tieto porty hostiteľa: 1044, 5001, 9001.

Nasledujúce skripty to vykonajú v shelli fish:
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

## Hľadanie príčin problémov

### Všeobecné postupy

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Po ukončení kontroly stále nechtiac zastaví kontajner.
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Podrobné protokoly v termináli: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problémy s pripájaním zväzkov

Pri používaní Fedora CoreOS som narazil na chyby odmietnutia prístupu alebo oprávnení pri pripájaní priečinkov hostiteľa pomocou bind mount.

Namiesto toho sa môže odporúčať použitie pomenovaných zväzkov spravovaných Dockerom. Aby som sa vyhol tejto zložitosti, zistil som, že pridanie prípony `:Z` k hodnote voľby bind mount umožnilo kontajneru zapisovať do súborov hostiteľa. Možno použiť aj `:z`, no z bezpečnostného hľadiska sa môže odporúčať oddeliť prostriedky jednotlivých aplikácií a služieb namiesto ich zdieľania.

Zodpovedajúce chybové hlásenia možno zobraziť pomocou journalctl, takže ide o problém so SELinux. Riešením by bolo spustiť `chcon -Rt svirt_sandbox_file_t` host_dir, ale zdá sa, že ani tento postup sa neodporúča.

Zaujímavé je, že na Fedora Workstation sa tento problém nevyskytuje. Predpokladám, že ručná inštalácia pridala balík, ktorý ho rieši. Zrejme ide o balík container-selinux.

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
