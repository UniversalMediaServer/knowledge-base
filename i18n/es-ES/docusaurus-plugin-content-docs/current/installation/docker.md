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

Montar el Almacenamiento al Cliente y enlace a ese directorio, probablemente solo de lectura `mount <Videos-Share> '/srv/UMS/Videos'`

Texto de ejemplo: Enlace simbólico simple a otra ruta en el sistema anfitrión puede no funcionar, ya que no habrá acceso a él desde afuera de la ruta del volumen montado por el contenedor del docker.  En su lugar, intente copiar los archivos dentro de esta ubicación.

## Configurar Contenedor

Montar los siguientes volúmenes:
- Carpeta multimedia `/root/media`
- Carpeta de perfil que contiene UMS.conf `/root/.config/UMS`

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
#ligar a docker [--no-stdin] UMS; # Aún así, detiene el contenedor involuntariamente una vez finalizada la inspección..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Para ver los registros detallados en la terminal: `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problemas de montaje

Al usar Fedora CoreOS, tuve problemas de acceso/permiso denegado al intentar usar montajes de enlace.

Puede que se recomiende utilizar la funcionalidad de volúmenes con nombre gestionados por Docker, pero para evitar esa complejidad, descubrí que el sufijo adicional `:Z` al valor de la opción del descriptor del montaje de enlace permite el acceso de escritura del contenedor a los archivos del host. `:z` también se puede usar en su lugar, pero los consejos de seguridad pueden sugerir mantener los recursos más aislados entre entornos de aplicaciones/servicios, en lugar de compartirlos.

Los mensajes de error coincidentes se pueden ver usando journalctl, por lo que se trata de un problema de SELinux. La solución para eso sería ejecutar `chcon -Rt svirt_sandbox_file_t` host_dir, pero eso también parece desaconsejable.

Extrañamente, esto no es un problema en Fedora Workstation, pero supongo que al instalarlo manualmente se añade un paquete para solucionar esto. Parece ser un container-selinux.

## Referencias

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
