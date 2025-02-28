# Докер

Некоторые из этих шагов могут быть неприменимы к вашей установке.  Выясните, что они делают, и либо игнорируйте, либо настройте при необходимости.

## Подготовка

Для поддержки операционной системы и пакетов обновления.

### Debian Linux

Установить Docker (движок): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Установить Docker (движок): https://docs.docker.com/engine/install/debian/

#### Дополнительные инструкции

```
sudo usermod -a -G docker <username>;
```

Повторно войдите в систему или перезагрузите компьютер.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Подключите хранилище к хосту и перейдите по ссылке в этот каталог, доступный только для чтения. `mount <Videos-Share> '/srv/UMS/Videos'`

Пример теста: Простая символическая ссылка на другой путь в хост-системе может не сработать, поскольку к нему не будет доступа за пределами пути к подключенному тому для контейнера docker.  Вместо этого попробуйте скопировать файлы в это место.

## Установка контейнера

Монтировать следующие тома:
- Media folder `/root/media`
- Profile folder containing UMS.conf `/root/.config/UMS`

Откройте/перенаправьте эти порты с хоста: 1044, 5001, 9001.

Это позволяют сделать следующие сценарии (с использованием оболочки fish):
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

## Исследование проблем/выпусков

### Общие

```
docker ps -a;
#docker присоединяет [--no-stdin] UMS; # По-прежнему непреднамеренно останавливает контейнер после завершения проверки..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Для получения подробных логов в терминале: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Проблемы с монтированием

Используя Fedora CoreOS, у меня возникли проблемы с отказом в доступе / разрешении при попытке использовать привязку монтирования.

Рекомендуется вместо использовать поименованные тома, управляемые Docker, но чтобы избежать этой сложности, я обнаружил, что дополнительный `:Z` в качестве суффикса значения параметра привязки дескриптора позволяет контейнеру записывать файлы хоста. `:z` также может быть использован вместо этого, но в целях безопасности можно предложить держать ресурсы более изолированными между средами приложения/обслуживания, а не использовать их совместно.

Соответствующие сообщения об ошибках можно увидеть с помощью journalctl, так что это проблема SELinux. Решением будет запуск `chcon -Rt svirt_sandbox_file_t` host_dir, но это тоже может обескураживать.

Как ни странно, это не проблема на рабочей станции Fedora, но я предполагаю, что установка ее вручную добавила пакет для решения этой проблемы. Кажется, это контейнер-selinux.

## Рекомендации

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
