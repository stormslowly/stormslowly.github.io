---
layout: post
title:  "[翻译]MEAN简介"
date:   2014-03-10 9:12:00
categories: stack
---

原文地址:<http://code.tutsplus.com/tutorials/introduction-to-the-mean-stack--cms-19918>


Web应用的开发涉及到很多相关的技术和工具，比如数据库操作、服务器管理、前端数据的显示等等。开始一个新项目的时候就需要花费一些时间在这些工具和项目目录的创建上。这个时候我就需要框架或者工具组合来加速开发。


##什么是MEAN
“[MEAM][mean]是基于javascript现代web应用全栈开发工具。”

这是[MEAM][mean]的作者对它下的定义。可以看出MEAN是瞄准给前后端的Javascript工程师使用的，这个工具集主要包括下面几个部分

* [MongoDB](http://www.mongodb.org/)
* [Express](http://expressjs.com/)
* [AngularJS](http://angularjs.org/)
* [NodeJS](http://nodejs.org/)

MEAN这套工具汇聚了当前广大码农喜闻乐见的Javascript开发工具，为轻松构建复杂web应用打下了基础

##安装

两种安装方式

1. 使用[mean.io][mean]的安装包
2. 使用[Yeoman](http://yeoman.io/)的生成器


###1 安装包
这种安装方式非常简单。到[mean.io][mean]，下载安装包的``zip``文件。

或者用git下载MEAN，在命令行输入
```
git clone https://github.com/linnovate/mean.git
```

###2. Yeoman方式

很多开发者都为MEAN开发了Yeo的生成器，使用yeoman的生成器就下面两步。先安装生成器

```
npm install -g generator-meanstack
```

然后生成项目

```
yo meanstack
```

上面的例子是假设你已经安装mean的生成器和yeoman。想看看还有什么其他的MEAN的生成器，可以来[这里](http://yeoman.io/community-generators.html)，过滤下关键字“MEAN”,就会看到一大批。如果不知道如何安装Yeoman，看[这里](http://yeoman.io/)

Addy Osmani写了一篇关于MEAN和它的生成器的博客。强烈推荐，看了之后就知道如何安装和使用MEAN的生成器了。


为了教程演示的目的，本文采用Git clone的方式来安装演示。

##安装收尾

在命令行进入到安装(克隆)好MEAN的目录(译者注：记得先安装下所需要node模块，``npm install``)，然后执行``grunt``命令(我想你一定已经安装过``grunt-cli``了吧)。grunt会启动一个监听3000端口的Web服务器，浏览器里面看看<http://localhost:3000>。

![meanpage](https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/45/posts/19918/image/site.jpeg)

##MEAN带了什么
MEAN默认是一个blog应用引擎，支持多种认证的方式：Facebook、GitHub、Twitter、Google已经邮件+密码的方式。

估计你已将迫不及待的想看代码了。MEAN的目录结构看起来是这样的：

![structure](https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/45/posts/19918/image/folders.jpeg)


###服务器端
服务器端相关的文件夹和文件

* ``app``目录,主要包括MVC三大部分
* ``config``目录，包括应用的配置信息，控制服务器的行为
* ``server.js`` 应用入口

我们一个一个来看

####``server.js``
应用的入口，如果你不想用``grunt``来启动服务的话，可以直接用``node server.js``

``server.js``的主要功能

* 加载配置信息. 主要是应用本身的配置，认证和数据库连接的配置加载。
* 加载模型. 遍历``models``目录下(包括子目录)中模型定义文件，并且加载。
* 加载证书
* 初始化Express应用
* 配置Express应用
* 配置Express路由信息
* 在指定端口启动服务

####``config``目录
配置文件都在这目录中。在``env``目录主要包括开发环境、生产环境已经测试模式的配置的信息。

其他的配置文件是对应用本身的配置，比如express的配置，登陆证书的配置等。

####``app``目录
``app``都是服务器端的代码。为MVC创建的models，view和controllers三个目录，还有为了路由创建的文件夹。

项目创建时，就有``articles`` ``users``和``index``三个控制器，``models``目录下的``articles`` ``users``两个模型文件

默认创建的视图是如下结构

![viewstruct](https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/45/posts/19918/image/views.jpeg)

``includes``目录包web应用页面的页眉页脚。``layout``目录是页面的布局文件，这个布局文件应会用到``view``目录下``index.html``。

``users``目录包含注册登陆的页面代码。

在``views``根目录，除了``index.html``还有404和500的页面。

###客户端
客户端的文件都在``public``目录下，``css``和``img``目录分别包含项目的样式文件和图片文件。

特别要注意下``js``目录，里面包含了AngularJS代码，如初始化，指令，过滤器(目前都是空的)，还有默人blog应用创建的控制器和服务。``views``目录下是为blog应用中articles创建，编辑，查看的页面。

``lib``目录中是AngularJS库的代码。


##测试
``test``目录包含了项目的测试代码，服务器端的代码采用``Mocha``测试框架，客户端代码采用``Karma``

##所需工具
使用MEAN时，开发者需要安装好npm，bower，和grunt。

还有jshint也需要安装。通过grunt的配合就能监视代码，每次代码改动就会重新自动构建。

##预告
随后还会有第二个教程来演示如何在MEAN上创建一个应用，包括如何配置MEAN以适应于不同的应用场景。(译者注：我也会随时关注，尽快翻译的。)


###译者赠送一视频。
如果等不及tuts的第二篇教程，可以看看这个是视频
<http://tagtree.tv/mean-stack-episode1>(不过需要翻墙和twitter账号。)和 对以的代码<https://github.com/hendrikswan/tagtree-mean>

---
## 捐赠
如果您觉得本文对您有帮助，欢迎请译者喝一杯咖啡或者为译者赞助些奶粉钱

[![捐助作者](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/shupengfei)

<https://me.alipay.com/shupengfei>



[mean]:http://mean.io/