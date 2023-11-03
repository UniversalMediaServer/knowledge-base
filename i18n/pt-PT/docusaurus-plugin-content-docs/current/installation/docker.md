# Docker

Some of these steps may not apply to your installation.  Entenda o que eles fazem, e ignore, ou personalize conforme necessário.

## Preparação

For operating system support and service packages.

### Debian Linux

Instalar o Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

Instalar o Docker (Engine): https://docs.docker.com/engine/install/debian/

#### Instruções adicionais

```
sudo usermod -a -G docker <username>;
```

Re-login or restart the machine.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Monte o armazenamento nativo e ligue-o nesse pasta, provavelmente só de leitura. `mount <Videos-Share> '/srv/UMS/Videos'`

Exemplo de teste: Simulação simbólica simples, para caminho diferente no sistema nativo pode não funcionar, já que não haverá acesso a ele fora do  caminho do volume montado para a pasta do docker.  Em vez disso, tente copiar para esta pasta.

## Container Setup

Monte os seguintes volumes:
- Pasta de mídia `/media`
- Pasta de perfil contendo UMS.conf `/profile`

Expose/forward these ports from the host: 1044, 5001, 9001.

Os seguintes scripts realizam isso (processo escama de peixe):
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

## Investigating Problems/Issues

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

Pode ser recomendável usar a capacidade de administração do Docker de nomes por volume, mas para evitar essa complexidade, Descobri que o adicional `:Z` como opção sufixo para descritor de montagem permitir o acesso de escrita ao suporte dos arquivos nativos. `:z` pode ser usado em alternativa, mas aconselha-sepor segurança manter os recursos mais isolados nos ambientes aplicativo/serviço, ao invés de partilhados.

Matching error messages can be seen using journalctl, so it is an SELinux problem. A solução seria executar `chcon -Rt svirt_sandbox_file_t` host_dir, mas isso também parece desencorajado.

Strangely this is not an issue on Fedora Workstation, but I guess installing it manually added a package to deal with this. Seems to be container-selinux.

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
