---
layout: post
title:  "[afterCode] docker 速成班 2: container"
date:   2017-08-17 10:50:00
categories:  aftercode docker cheatsheet
---

本来想在一篇 blog 里面就写完所有的内容的,但是考虑考虑到文章太长会和 egghead 风格相背离,所以就按连载的形式来.


# 容器 container

image 是 docker 物质基础,有了这个才能让 docker 能运行起来, 运行起来的 image 称之为容器(container), 它docker 使用中的一等公民.

### 直接启动 container

```
// 使用 redis image 启动一个容器, 如果你没有下载过 redis image 的话会自动下载一个.
// image 的指定方法和删除 image 类似, 可以带上 tag 或者直接使用 image id
docker run redis 
```

### 后台执行 container

这样启动的 container 直接在前台执行, 通过 `ctrl+c` 就结束他的执行. 要是想后台执行就可以使用 `-d` 或者 `--detach` 来分离到后执行

```
docker run -d redis
e19308502859150e4480a8da7378884d3eea6269b6e0fe0bf3d458ab3039ae55
```

命令会返回一段 hash 值,这个其实就是这个正在运行的 container 的 id. 通过 `docker ps`能查看当前正处于运行状态(Up status)的容器,以及其他一些参数;这里会注意到一个 NAMES 字段, 表示的是这个 container 的名字. 之前执行的命令都没有指定 container 的名字,默认情况下 docker 会采用 `形容词_名人名`的形式给你的container 命名; 不过你也可以通过 `--name` 来给自己的 container 起名字.

```
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS                      NAMES
e19308502859        redis                "docker-entrypoint..."   21 minutes ago      Up 21 minutes       6379/tcp                   jovial_leavitt

```

### 停止一个 container

停止一个container 可以有两种方式一个是通过 container id 一个通过 name

```
docker stop jovial_leavitt
docker stop e19308502859
```


### 删除一个 container

停止一个容器之后,其实这个容器还是存在宿主机上的, 为什么一个容器停止之后还要保留呢? 考虑一下这种情况,容器意外退出了,你想查明为什么退出;如果容器都删除了,你怎么查呢.

```
// 查看包括已经停止的container 状态(所有的 container 的状态)
docker ps -a
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS                     PORTS                      NAMES
e19308502859        redis                "docker-entrypoint..."   About an hour ago   Exited (0) 3 minutes ago                              jovial_leavitt
```

删除一个容器和停止容器非常的相似,要把 `stop` 换成 `rm`就可以;记住container 是 docker 中的一等公民,所以你的rm是删除一个容器,要删除 image 的时候用的是 `rmi` 命令

```
docker rm jovial_leavitt
docker rm e19308502859
```

### 一个小 tip

对一个容器的基本操作是流程是启动(run)/停止(stop)/删除(rm);那我如果只是想简单临时的执行下容器的工具,就要使用三个命令非常的麻烦.比如我就想看下 redis 的版本, 可以采用以下的命令. `--rm` 选项会在 container 退出之后自动删除掉 container, 所以如果说只是为了想快速查看下container 相关的东西的话带上`--rm` 选项的话还是很方便的.

```
docker run --rm redis  redis-cli -v
redis-cli 4.0.1
```

# 完
希望大家喜欢.