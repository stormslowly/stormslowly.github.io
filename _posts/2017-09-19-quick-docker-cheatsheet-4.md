---
layout: post
title:  "[afterCode] docker 速成班 4: 自建 Image"
date:   2017-09-19 10:50:00
categories:  aftercode docker cheatsheet
---

通过 docker hub 能获得很多别人定制好的image, 但是如果自己想制作一个自己容器该怎么弄呢?

## 用 Dockerfile

Dockerfile 就像一个脚本文件, 告诉 docker 如何创建一个新的 Image.
下面举例来用 node.js 来制作一个 http 服务器的 image.


# FROM 指令

刚才提到了社区已经有很多很好用的 docker images, 那我们要构建自己的 iamge 的话就可以在这些 image 的基础上来做. 我们要做一个基于 node.js 的 http 服务器, 那首先就是找一个已经安装好 node.js 的 image, docker hub 已经有了 node.js 官方 images 了, 直接利用这些资源就可以了. 利用的方式就是使用 `FROM` 指令.

```
// Dockerfile
FROM node:8.5
```
通过 FROM 来指定 node.js 的版本和拉取 image 的格式一样. 如果你需要依赖的 image 是社区版本的话,要写上对应的 namespace 名字.

# COPY 指令

有了 node.js 之后我们要写一个 http 服务器. 直接新建一个 `index.js` 文件, 使用 node.js 官方 hello world 的例子.

```JavaScript
// index.js
// ref https://nodejs.org/en/about/
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

有了这个服务器代码之后, 就要将这个 index.js 文件从我们的主机上用 `COPY` 指令拷贝到容器中.这个语法和我们平时使用`cp`的格式非常类似,要注意的是容器中的地址采用绝对地址.

```
// Dockerfile
FROM node:8.5
COPY  index.js /root/index.js
```

# CMD 指令

为了让我们的http 服务器启动起来就用 `CMD` 在容器中执行的命令.

```
// Dockerfile
FROM node:8.5
COPY  index.js /root/index.js
CMD node /root/index.js
```

在容易中执行 `node /root/index.js` 这样我们的 http 服务就在容器中启动了

# EXPOSE 指令

虽然启动了服务, 也只是在容器内部自 high; 为了能让服务能在容易意外被使用,就要将服务端口暴露出去.

```
// Dockerfile
FROM node:8.5
COPY  index.js /root/index.js
EXPOSE 3000
CMD node /root/index.js
```

这里需要注意的是, 要把 `EXPOSE` 放在服务启动之前. 不然端口的暴露就会有问题. 别问我为什么会知道,说多了都是泪.

# 最后一步构建

到这里我们的 Dockefile 就完成了,但是我们 image 文件在哪里啊.当让是要通过 docker 的 build 命令构建出来咯.这里的`-t` 选项告诉 docker 这生成出来的 image 的 tag 是什么. 我们自己的做的 image 属于是社区的 image 记得在 image 名字前面加上自己的 namespace.

```bash
docker build . -t pshu/helloWorld:1.0.0
```

docker 就会先去 docker hub 拉取 node.js 的镜像, 然后按照 Dockerfile 中的
```
Step 1/4 : FROM node:8.5
8.5: Pulling from library/node
aa18ad1a0d33: Pull complete
15a33158a136: Pull complete
f67323742a64: Pull complete
c4b45e832c38: Pull complete
f83e14495c19: Pull complete
41fea39113bf: Pull complete
f28b27a3711e: Pull complete
2079c2e3f89a: Pull complete
Digest: sha256:27e459456c552642c520a36f934b0e1646043d43877a5e018e9bb3f251d2ef76
Status: Downloaded newer image for node:8.5
 ---> de1099630c13
Step 2/4 : COPY index.js /root/index.js
 ---> 947429cca879
Removing intermediate container 1f813f1cbf71
Step 3/4 : CMD node index.js
 ---> Running in 17425d436856
 ---> c720248bb068
Removing intermediate container 17425d436856
Step 4/4 : EXPOSE 3000
 ---> Running in d1b924412684
 ---> 969f16cac45d
Removing intermediate container d1b924412684
Successfully built 969f16cac45d
Successfully tagged pshu/helloworld:1.0.0
```

docker build 完成就能看见自己的 image 了.

```
$docker images
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
pshu/helloworld        1.0.0               969f16cac45d        31 seconds ago      673MB
```

接着我们之只要用 docker run 命令就能把这个 image 跑起来了.

```
docker run --rm -i -p 3000:3000 pshu/helloworld:1.0.0
```

本地的3000端口就能访问到这个 hello world 的 http 服务了.

# 完
希望大家喜欢.
