# Docker 

Certaines de ces étapes peuvent ne pas s'appliquer à votre installation.  Comprenez ce qu'elles font et ignorez-les ou personnalisez-les, si nécessaire.

## Préparation

Pour le support du système d'exploitation et les paquets de service.

###

Installer Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Installer Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Instructions supplémentaires

```
sudo usermod -a -G docker <username>;
```

Reconnectez-vous ou redémarrez la machine.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Monter le stockage sur l'hôte et créer un lien dans ce répertoire, probablement en lecture seule. `monter <Videos-Share> '/srv/UMS/Videos'`

Exemple de test : Un simple lien symbolique vers un autre chemin sur le système hôte peut ne pas fonctionner, car il n'y aura pas d'accès en dehors du chemin du volume monté pour le conteneur docker.  Essayez plutôt de copier des fichiers à l'intérieur de cet emplacement.

## Configuration du conteneur

Monter les volumes suivants :
- Dossier média `/root/media`
- Dossier de profil contenant UMS.conf `/root/.config/UMS`

Exposer/transférer ces ports depuis l'hôte : 1044, 5001, 9001.

Les scripts suivants réalisent cela (en utilisant le coquillage de poisson):
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
```

## Enquêter sur les problèmes/questions

### Général

```
docker ps -a ;
#docker attach [--no-stdin] UMS ; # Arrête toujours involontairement le conteneur lorsque l'inspection est terminée...
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Pour les logs détaillés dans le terminal : `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problèmes de montage

En utilisant Fedora CoreOS, j'ai eu des problèmes d'accès/permission refusée en essayant d'utiliser les montages bind.

Il peut être recommandé d'utiliser la capacité de volumes nommés gérée par Docker à la place, mais pour éviter cette complexité, j'ai constaté que l'ajout de `:Z` en tant que suffixe à la valeur de l'option du descripteur du montage bind permettait au conteneur d'accéder en écriture aux fichiers de l'hôte. `:z` peut également être utilisé à la place, mais les conseils de sécurité peuvent suggérer de garder les ressources plus isolées entre les environnements d'application/service, plutôt que partagées.

Les messages d'erreur correspondants peuvent être vus en utilisant journalctl, il s'agit donc d'un problème SELinux. La solution pour cela serait d'exécuter `chcon -Rt svirt_sandbox_file_file_t` host_dir, mais cela semble également déconseillé.

Étrangement, ce n'est pas un problème sur Fedora Workstation, mais je suppose que l'installer manuellement a ajouté un paquet pour gérer cela. Il semble que ce soit un conteneur-selinux.

## Références

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
