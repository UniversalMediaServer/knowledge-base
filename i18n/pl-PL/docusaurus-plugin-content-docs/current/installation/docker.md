# Docker

Niektóre z tych kroków mogą nie dotyczyć twojej instalacji.  Sprawdź, jaka jest ich rola i zignoruj je lub dostosuj w razie potrzeby.

## Przygotowanie

Dla wsparcia systemów operacyjnych i pakietów usług.

### Debian Linux

Zainstaluj silnik Dockera: https://docs.docker.com/engine/install/debian/

### Fedora Linux

Zainstaluj silnik Dockera: https://docs.docker.com/engine/install/fedora/

#### Dodatkowe instrukcje

```
sudo usermod -a -G docker <username>;
```

Zaloguj się ponownie lub zrestartuj urządenie.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Zamontuj wolumin w systemie hosta i podłącz go do tego katalogu, prawdopodobnie w trybie tylko do odczytu. `mount <Videos-Share> '/srv/UMS/Videos'`

Przykład testowy: Proste dowiązanie symboliczne do innej ścieżki w systemie hosta może nie zadziałać, ponieważ nie będzie do niej dostępu spoza ścieżki zamontowanej w kontenerze.  Zamiast tego spróbuj skopiować pliki do tej lokalizacji.

## Konfiguracja kontenera

Zamontuj następujące woluminy:
- Folder multimediów `/root/media`
- Folder zawierający profil UMS.conf `/root/.config/UMS`

Udostępnij/przekieruj następujące porty z systemu hosta: 1044, 5001, 9001.

Poniższe skrypty spełniają tę funkcję (używając powłoki terminala fish):
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

## Rozwiązywanie problemów

### Ogólne

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Nadal nieumyślnie zatrzymuje kontener po skończonej inspekcji...
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

W celu uzyskania szczegółowych raportów w terminalu: &lt;containerName&gt;echo -e '\nlog_level=ALL' &gt;&gt; UMS.conf</code>

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problemy z montowaniem

Używając Fedora CoreOS, próbując używać montowania z powiązaniem miałem problemy z uprawnieniami/odmową dostępu.

Zamiast niego można polecić używanie zarządzanych przez Dockera, nazwanych woluminów, lecz w celu uniknięcia tej złożoności zauważyłem, że dodanie `:Z` na końcu opcji deskryptora montowania z powiązaniem pozwala kontenerowi na zapis plików do hosta. Zamiast tego można użyć też `:z`, ale porady dotyczące bezpieczeństwa mogą zalecać utrzymywanie zasobów bardziej odizolowanych między środowiskami aplikacji/usług niż współdzielonych.

Takie same komunikaty błędów są widoczne przy użyciu journalctl, więc jest to problem SELinux. Rozwiązaniem byłoby uruchomienie `chcon -Rt svirt_sandbox_file_t` host_dir, ale wygląda na to, że to również jest odradzane.

Co dziwne, problem nie pojawia się na stacji roboczej z Fedorą. Możliwe, że manualna instalacja dodała pakiet, który sobie z tym radzi. Wygląda na to, że to container-selinux.

## Źródła

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
