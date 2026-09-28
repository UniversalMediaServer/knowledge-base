# Docker

Деякі з цих кроків можуть не стосуватися вашого встановлення.  Візьміть до уваги, як вони працюють, знехтуйте або пристосуйте їх за потреби.

## Підготовка

Щодо підтримки операційних систем та пакетів послуг.

### Для «Debian» (Linux)

Встановіть рушій «Docker» → https://docs.docker.com/engine/install/debian/

### Для «Fedora» (Linux)

Встановіть рушій «Docker» → https://docs.docker.com/engine/install/fedora/

#### Додаткові вказівки

```
sudo usermod -a -G docker <username>;
```

Повторно увійдіть у систему або перезапустіть комп’ютер.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Змонтуйте накопичувач на хості та створіть посилання на каталог, найімовірніше, з доступом тільки для читання. `mount <Videos-Share> '/srv/UMS/Videos'`

Приклад тесту: Просте створення символічного посилання на інший шлях у хост-системі може не спрацювати, оскільки за межами шляху до змонтованого тому для контейнера Docker доступ до нього буде неможливий.  Спробуйте скопіювати файли з цієї теки натомість.

## Налаштування контейнера

Змонтуйте такі томи:
- Медіатека `/root/media`
- Тека облікового запису, що містить UMS.conf `/root/.config/UMS`

Розкрийте/перенаправте з хоста такі порти: 1044, 5001, 9001.

Наступні скрипти допомагають це зробити (з використанням оболонки «fish»):
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

## Виявлення проблем

### Загальні

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Програма все ще мимоволі зупиняє контейнер після завершення перевірки.
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Доступ до детальних журналів командою в терміналі: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Проблеми з монтуванням

Під час роботи з Fedora CoreOS виникали проблеми з відмовою у доступі/дозволі при спробі використовувати монтування типу «bind».

Натомість можна рекомендувати використовувати функцію іменованих томів, що керуються Docker, але, щоб уникнути цієї складності зʼясувалося, що додавання додаткового `:Z` як суфікса до значення параметра дескриптора прив’язки дозволило контейнеру отримати доступ для запису до файлів хоста. `:z` також можна використовувати як альтернативу, але з міркувань безпеки рекомендується краще ізолювати ресурси між середовищами додатків/сервісів, а не надавати до них спільний доступ.

Відповідні повідомлення про помилки можна переглянути за допомогою команди `journalctl`, отже, це проблема «SELinux». Розв'язання цієї проблеми могло б стати виконання команди `chcon -Rt svirt_sandbox_file_t` host_dir, але, схоже, це теж не є бажаним.

Як не дивно, у Fedora Workstation цієї проблеми немає, але, мабуть, під час ручної інсталяції було додано пакет, який розв'язує цю проблему. Схоже, це container-selinux.

## Першоджерела

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
