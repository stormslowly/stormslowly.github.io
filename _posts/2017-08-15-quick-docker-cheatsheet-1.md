---
layout: post
title:  "[afterCode] docker 速成班 1: image"
date:   2017-08-17 10:50:00
categories:  aftercode docker cheatsheet
---

在"程序员英语娱乐主题节目"[http://www.douyu.com/aftercode][1]的直播中介绍了下在 egghead 网站学习 docker 的视频. 由于时间仓促只学习了一部分, 最近因为的公司的原因也没有时间继续搞直播, 所以想写一篇 blog 分享下自己的 docker 的学习经验. 想学习 egghead 简短有效的风格, 所以就将文章题目定为"速成班".

## 准备
本地已经安装好了 docker. 现在各个操作系统上安装 docker 都非常的容易就不在这边介绍了

第二点就是配置好 dockerhub 的镜像站点.这里可以参考[这篇文章](https://yq.aliyun.com/articles/29941?spm=5176.100239.blogcont7695.18.vc2Jc7).



# image

image 有人翻译成`镜像`,但我觉得还是差这么一点味道,所以还是坚持用它的英文原名称呼它.

## 获取 image
image 是 docker 使用的基础, 有了 docker image 才能让 docker 跑起来.

获得 image 的方法就是采用 `docker pull` 命令, 它和 `git pull`的含义非常相似.


```bash
// 该命令是从 dockerhub 获取官方的 redis image
docker pull redis

// 获取指定 tag 的 redis image, 这里是4.0版本
docker pull redis:4.0
//不给出 tag 的话默认获取最新的 tag, 即 lastest. 下面的命令就相当于上面的第一条命令
docker pull redis:lastest  

// 获取来自社区(非官方)的 redis, / 之前的东西称为 namespace (命名空间)
// 这里就是获取 bitnami 制作的 redis image
docker pull bitnami/redis

// 社区镜像同样支持tag
docker pull binami/redis:4.0
```

## 查看已经下载的 image

```
docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               latest              b8efb18f159b        3 weeks ago         107MB
mongo               latest              6833171fe0ad        3 weeks ago         359MB
rabbitmq            latest              951e8c07aaa5        3 months ago        180MB
mongo               3.4                 6329fba85f65        3 months ago        360MB
redis               3.2.8-alpine        83638a6d3af2        5 months ago        19.8MB
nginx               <none>              db079554b4d2        6 months ago        182MB
```

## 删除 images

```
// 删除 mongo image
docker rmi  mongo

// 删除对应 tag 的 images, 这个行为和 pull 指定 image 是一样的.
docker rmi  mongo:3.4
 

// 通过 image id 来删除 image
docker rmi 6329fba85f65
// 其实不需要输入完整的 id ,一般情况下只要输入几位 id 就能定位到对应 image 然后删除, 这个和 git 中使用 commit 的 sha1 hash 也非常的类似
docker rmi 6329
```

# 完
希望大家喜欢.

[1]:	http://www.douyu.com/aftercode