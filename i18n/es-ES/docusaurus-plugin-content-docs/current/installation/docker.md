# Docker

Algunos de estos pasos pueden no aplicarse a su instalación.  Entienda lo que hacen, e ignore o personalice como sea necesario.

## Preparación

Para soporte del sistema operativo y paquetes de servicio.

### Debian Linux

Instale Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Instale Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### Instrucciones adicionales

```
sudo usermod -a -G docker <username>;
```

Vuelva a iniciar sesión o reinicie el equipo.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Montar el Almacenamiento al Cliente y enlacelo a ese directorio, probablemente solo de lectura `mount <Videos-Share> '/srv/UMS/Videos'`

Texto de ejemplo: Enlace simbólico simple a otra ruta en el sistema anfitrión puede no funcionar, ya que no habrá acceso a él desde afuera de la ruta del volumen montado por el contenedor del docker.  En su lugar, intente copiar los archivos dentro de esta ubicación.

## Configurar Contenedor

Montar los siguientes volúmenes:
- Media folder `/root/media`
- Profile folder containing UMS.conf `/root/.config/UMS`

Exponga/reenvíe estos puertos desde el host: 1044, 5001, 9001.

El siguiente script logra eso (usando la shell fish):
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

## Investigando Problemas/Inconvenientes

### General

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Still unintentionally stops container when done inspecting..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

For detailed logs in the terminal: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Mount trouble

Using Fedora CoreOS, I had access/permission denied problems trying to use bind mounts.

It may be recommended to use the Docker-managed, named-volumes capability instead, but to avoid that complexity, I found that the additional `:Z` as a suffix to the bind mount's descriptor option value allowed container write access to host files. `:z` can also be used instead, but security advice may suggest keeping resources more isolated between application/service environments, rather than shared.

Matching error messages can be seen using journalctl, so it is an SELinux problem. The solution for that would be to run `chcon -Rt svirt_sandbox_file_t` host_dir, but that also seems discouraged.

Strangely this is not an issue on Fedora Workstation, but I guess installing it manually added a package to deal with this. Parece ser un container-selinux.

## References

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
