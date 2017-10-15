---
layout: post
title:  "[afterCode] docker 速成班 6: docker-compose"
date:   2017-10-15 10:50:00
categories:  aftercode docker cheatsheet
---

通过docker 的 network我们可以将多个 container 有机的组合起来构建出自己需要的服务. 但是这里有几个小问题就是

0. 不利于分享.
1. 步骤麻烦.(需要自己创建 network;指定container 使用 network;... )

那如何解决上面的两个问题呢?

## `docker-compose.yml`

第5节例子中的服务可以通过创建一个这样的`docker-compose.yml`文件来解决.

```yml
version: '3'
services:
  nginx:
    image: nginx
    ports:
      - 8080:8080
    volumes:
      - ./conf.d:/etc/nginx/conf.d
    depends_on:
      - nodeapp
  nodeapp:
    build: './'
    container_name: hello
    environment:
      - NODE_ENV=production
```

通过下面的命令就能将所有需要的 container 启动起来.

```bash
docker-compose up
```


`docker-compose.yml` 文件可以理解为为了让项目工作起来组织 docker container 的 [`yaml`](https://learnxinyminutes.com/docs/yaml/) 格式的配置文件. 一个 `docker-compose.yml` 文件就一个项目. 配置文件里面可以定义 `services`, `volumes` 和 `networks` 三个主要部分. 我个人的喜好是直接使用映射的方式来配置 container 的持久化的磁盘空间,所以比较少的用
volumes 部分;而一个 docker-compose.yml 启动起来之后,docker 会为这个项目创建一个默认的 networks, 默认情况下这些容器都是连接在这个 network 中. 而且还支持用 container_name 的 dns 解析; 所以最重要的还是 services 的定义, 而 services 的定义就是根据项目需要列举的 container 的定义.

对于 container 的定义大致有两类, 直接可以使用的 docker hub 上 image 的. 如这个例子中的 nginx 容器;简单的通过 `image` 字段就能指定需要的 image; 再通过 `ports`,`volumes`, `environment` 字段来指定 container 的端口映射,磁盘映射和环境变量配置等等. 能通过 `docker run` 选项做到的事情 `docker-compose.yml` 中都能做到. 特别提一点的就是在磁盘映射的时候, 宿主机的路径可以是用相对与`docker-compose.yml`的相对路径. 例子中 nginx 的定义下面的命令行一样的意义; 其中这个 `project_default` 是 `docker-compose.yml` 启动时创建的默认 network.

```bash
$docker run --network project_default  \
            -v $PWD/conf.d:/etc/nginx/conf.d -p 8080:8080 nginx
```

第二种定义的方式就基于 `Dockerfile`. 那容器是如何工作的就完全有 Dockerfile 来决定了. `build`字段是用来指定 Dockerfile所在的路径. 例子中定义的 nodeapp 服务, 还是用了 environment 来指定程序运行的环境变量;用 container_name 指定了容器的名字, 如果不做指定的话, container 的名字使用 `项目名_服务名` 的格式来命名. 而且我们在 nginx 服务反向代理的时候需要用 container 的名字来访问 node 中的 web 服务, 所以这里就定义了container 的名字.

通过 `Dockerfile`  和 `docker-compose.yml` 就能非常的方便的分享你项目运行和开发环境的配置了.


# 完
希望大家喜欢.
