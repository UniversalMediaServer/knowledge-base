# Docker

其中某些步骤可能不适用于您的安装环境。了解它们的功能，然后根据需要忽略或进行自定义。

## 准备工作

有关操作系统支持和服务包的信息。

### Debian Linux

安装 Docker (Engine): https://docs.docker.com/engine/install/debian/

### Fedora Linux

安装 Docker (Engine): https://docs.docker.com/engine/install/fedora/

#### 补充说明

```
sudo usermod -a -G docker <username>;
```

请重新登录或重启计算机。

```
sudo su -;
mkdir /srv/UMS;
chcon -t svirt_sandbox_file_t /srv/UMS;
chgrp docker /srv/UMS;
chmod -R g+w /srv/UMS;
```

将存储挂载到主机上，并链接到该目录，通常为只读模式。 `mount <Videos-Share> '/srv/UMS/Videos'`

测试示例： 单纯在主机系统上创建指向另一个路径的符号链接可能无法正常工作，因为在 Docker 容器的已挂载卷路径之外，无法访问该路径。不妨试着将文件复制到此位置内。

## 容器配置

挂载以下卷：
- 媒体文件夹 `/root/media`
- 包含 UMS.conf 的配置文件夹 `/root/.config/UMS`

请从主机上开放/转发以下端口：1044、5001、9001。

以下脚本可实现这一功能（使用 fish shell）：
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

## 调查问题/事项

### 概述

```
docker ps -a;
#docker attach [--no-stdin] UMS; # Still unintentionally stops container when done inspecting..
docker container logs [-f] UMS;
docker exec -it UMS /bin/sh;
docker diff UMS;
```

要在终端中查看详细日志： `echo -e '\nlog_level=ALL' >> UMS.conf`

```
docker cp <containerName>:/var/log/UMS/root/debug.log ./;
```

### 挂载问题

在使用 Fedora CoreOS 时，我在尝试使用绑定挂载时遇到了访问/权限被拒绝的问题。

虽然建议改用 Docker 管理的命名卷功能，但为了避免这种复杂性，我发现只要在绑定挂载的描述符选项值后添加后缀 `:Z`，容器就能对主机文件进行写入操作。 `:z` 也可以作为替代方案，但安全建议通常会建议在应用程序/服务环境之间保持资源的隔离，而不是共享资源。

通过 journalctl 可以查看相应的错误信息，因此这是 SELinux 方面的问题。解决该问题的办法是运行 `chcon -Rt svirt_sandbox_file_t` host_dir，但这种做法似乎也不被推荐。

奇怪的是，在 Fedora Workstation 上并没有这个问题，但我猜是手动安装时添加了一个用于处理此问题的软件包。看来是SELinux容器的问题。

## 参考资料：

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
