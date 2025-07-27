# Docker

Alguns destes passos podem não ser aplicáveis a sua instalação. Entenda o que eles fazem e ignore ou customize conforme necessário.

## Preparação

Por Sistema Operacional e gerenciadores de pacote.

### Debian Linux

Instalar Docker Engine:  https://docs.docker.com/engine/install/debian/

### Fedora Linux

Instalar Docker Engine: https://docs.docker.com/engine/install/fedora/

#### Instruções adicionais

```
sudo usermod -a -G docker <username>;
```

Refaça o Login ou reinicie a máquina.

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

Montar armazenamento para o host e fazer link para aquele diretório, provavelmente read-only `mount <Videos-Share> '/srv/UMS/Videos'`

Exemplo de teste: Só fazer link simbólico(symlink) para outro caminho no sistema do host pode não funcionar, já que não haverá acesso a ele fora do caminho do volume montado para o contêiner do docker.  Tente copiar arquivos dentro desse local.

## Configurações do container

Montar os seguintes volumes:
- Media folder `/root/media`
- Profile folder containing UMS.conf `/root/.config/UMS`

Exponha ou redirecione estas portas do host(máquina hospedeira do Docker): 1044, 5001, 9001.

O scripts a seguir fazem isso (usando o fish shell):
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

## Investigando problemas ou falhas:

### Gerais

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Continua parando o container quando executamos o comando inspect do docker

docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

Para Informações mais detalhadas no terminal:` echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### Problemas no Ponto de Montagem(mount)

Usando Fedora CoreOS, eu tive esses problemas de acesso/permissao negada usando vinculo de montagem(bind mounts)

Pode ser recomendável, como alternativa, usar a funcionalidade de volumes nomeados gerenciados pelo Docker, mas, para evitar a complexidade, descobri que o `:Z` adicional como sufixo do valor opcional do descritor do bind da montagem permite acesso de escrita aos arquivos do host pelo container. `:z` também pode ser usado como alternativa, mas, por razões de segurança pode ser recomendável manter os recursos dos ambientes de aplicação e serviço mais isolados, em vez de compartilhados.

Mensagem de erros similares podem ser observadas utilizando journalctl, então é um problema do SELinux. A solução seria executar  `chcon -Rt svirt_sandbox_file_t host_dir `, mas isso também parece desencorajado.

Estranhamente isso não é um problema no Fedora Workstation, porém eu acredito que instalar manualmente adicionou um pacote para lidar com isto. Aparenta ser o pacote container-selinux

## Referências:

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
