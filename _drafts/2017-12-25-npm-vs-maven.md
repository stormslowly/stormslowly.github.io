---
layout: post
title:  "[afterCode]npm vs maven"
date:   2017-12-10 10:50:00
categories:  aftercode 2col npm maven
---


# 安装


```npm
直接现在安装 node.js 安装包, 自带 npm
```

```maven

// 确保 JAVA_HOME 正确设置
// 下载 maven 安装包
$tar xzvf apache-maven-3.5.2-bin.tar.gz

//添加 maven bin 到 系统 path 下
```

显然 npm 的安装更加的方便.

# 依赖配置文件

```
package.json
//json 格式
```

```
pom.xml
// xml
```

# 工具本身配置

```npm
1. 修改配置文件 ~/.npmrc

2. 命令行配置方法:
npm config set <key> <value>
``` 

```maven

修改 maven 的配置文件


<mirror>
  <id>alimaven</id>
  <mirrorOf>central</mirrorOf>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
</mirror>

``` 


# 完
希望大家喜欢.