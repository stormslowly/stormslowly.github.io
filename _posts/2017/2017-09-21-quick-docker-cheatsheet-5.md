---
layout: post
title:  "[afterCode] docker 速成班 5: 组合 container"
date:   2017-09-22 10:50:00
categories:  aftercode docker cheatsheet
---

到现在为止,我们会从 docker hub 拉取自己需要的 image 文件并执行起来. 还会基于已有的 image 来制作自己特殊需要的 image . 但是如果我们完成一个功能需要多个 image 组合起来使用该怎么办呢?
虽然可以通过 Dockerfile 来制作一个这样的 image , 但是如果所有的功能都做在一个 image 中, 如果有一个模块需呀改变的话就需要重新构建整个 image.
作为一个程序员你知道,如果把所有的功能做到一个 image 里面相当于不断的"继承" 不同 image 的功能, 显然这个而不是一个好方法. 而且有前人告诉我们 "组合优于继承"!


### 那我们就试试如何组合使用 container.

在前一节,我们做好了一个 hello world 的 http 服务器工作在3000端口上. 现在我想用 nginx
作为反向代理到8080端口上访问这个服务.


如何将两个 container 组合起来呢? 通过网络. docker 安装之后应创建一些 network

```bash
$docker network ls
NETWORK ID          NAME                     DRIVER              SCOPE
a3ccacd179e5        bridge                   bridge              local
10768aaf02ae        host                     host                local
c2df063c31ab        none                     null                local
```

其中最常用的就是这个叫 `bridge` 的网络. 通过命令 `docker network inspect bridge` 来查看 network 的具体情况. 可以发现默认方式启动的 continer 都是在这个 `bridge` 的网络下. 而这些container 之间是相同的. 只是相互之间访问必须才用 ip 的方式来访问, 而且每次 container 启动的时候 ip 地址会是变化的. 所以要在 bridge network 下相互访问网路服务非常的麻烦.

```
$docker network inspect bridge
[
    {
        "Name": "bridge",
# 忽略....
        "Containers": {
            "91c3adde0212956c4cc2800dc9795165b1aea2a59547f74b441ec27e2427ac5a": {
                "Name": "graphite",
                "EndpointID": "f1e4c35371035e7149d80b9bb567282e686ae99cb118bc81bb6e7996efbe1993",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            },
            "d7ae7809b8530b4ee473991bd65cb6446c382c462e7d4702b7b81b8ec58b4362": {
                "Name": "grafana",
                "EndpointID": "9341a8a43bff28fb9077ba1a3d2b6609fd6a91214109e075658acbd9ba7ef840",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            }
        },
# 忽略...
    }
]
```

好在 docker 在用户自己创建的网络中提供了从 container 名字到对应 ip 的解析. 换句话说, 可以直接通过 container 的名字来访问需要的服务.

# 完成刚才的例子

首先我们为我们的 nginx 和 helloworld 网络服务器创建一个叫 "supernet" 的网络.

```bash
$docker network create supernet
```

然后通过`--network` 和 `--name` 启动一个加入到 supernet 网络的 hello world 网路服务.

```bash
$ docker  run --network supernet --name hello  --rm  pshu/helloworld:1.0.0
```

接着创建一个 `default.conf` 文件作为 nginx 服务器的反向代理配置文件, 将所有http 请求代理到 hello 容器的3000端口上.

```nginx.config
server {
    listen       8080;
    server_name  localhost;

    location / {
        proxy_pass   http://hello:3000;
    }
}
```

同样采用 `--network` 将运行 nginx 的容器也加入到 supernet 的网络中去;同时映射对应的配置文件和端口.


```bash
$docker run -it --rm  --network supernet  \
            -v $PWD/conf.d:/etc/nginx/conf.d -p 8080:8080 nginx
```

最后我就能通过 `http://127.0.0.0:8080` 访问到来自 hello container 中的 http 服务了.


# 完
希望大家喜欢.
