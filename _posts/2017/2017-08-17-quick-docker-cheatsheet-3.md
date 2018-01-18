---
layout: post
title:  "[afterCode] docker 速成班 3: 使用 container 中的功能"
date:   2017-08-17 10:50:00
categories:  aftercode docker cheatsheet
---

通过docker 将 container 执行起来了,不是为了看看容器的状态,而是想使用 container 中的功能.介绍两种方式来使用容器中的功能.

# 通过端口访问 container 中的服务

通过端口的方式来使用 container 提供的服务是最简单的了.只要通过 `-p` 或者 `--publish` 选项来向宿主机暴露服务端口就可以了.

比如我们可以这样在后台启动一个 redis 服务.并将 container 中的 redis 的服务端口6379映射到宿主机上的7788端口.
```
docker run -d -p 7788:6379 redis 
```

在宿主机上,我们可以通过下面的命令访问 容器中的服务

```
redis-cli -p 7788
redis 127.0.0.1:7788>
```
这里需要注意的是 -p 选项通过`:`来区别宿主机上的端口和容器中的端口; `:`前的是宿主机的, `:`后的是容器的. 如果有多个端口需要映射的话可以多次使用 -p 选项,例如: `-p 3008:80 -p 7788:6379` 就是将容器中的80,6379端口,分别映射到宿主机的3008和7788端口

# 通过磁盘映射

例如我们使用 nginx web服务器来提供个静态资源的 web 服务; 静态资源是在宿主机上的, 我们就可以采用磁盘映射的方式来向 container 提供我们的静态资源. 例如当前路径就是本 blog 的 静态 web 资源.

```bash
$ls _site
CNAME      css        imgs       node.js    request.js typescript
aftercode  editor     index.html nodejs     stack      unittest
cat2       feed.xml   javascript prototype  test       youtube
```

我们就可以通过 `-v` 选项来将当前目录的绝对路径映射到 container 中的 `/usr/share/nginx/html`.这样 nginx 启动的时候使用的就是我们 `_site` 文件夹中的静态资源了;当然了最后还要将 nginx 的 80 映射到宿主机的3009端口上,才能在本地 `http://127.0.0.1:3009` 端口访问 web 服务.

```bash
docker run --rm -v $PWD/_site:/usr/share/nginx/html -p 3009:80 nginx
```

通过 -v 选项主要注意的就是: 宿主机需要映射的地址必须使用***绝对地址***来指定; 如果需要映射多个路径的可以使用和映射端口的方式通过多个 `-v` 来完成映射.



# 完
希望大家喜欢.