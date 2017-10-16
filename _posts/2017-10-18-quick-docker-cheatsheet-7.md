---
layout: post
title:  "[afterCode] docker 速成班 7: 实战 构建基于gratie/grafana监控应用"
date:   2017-10-18 10:50:00
categories:  aftercode docker cheatsheet
---

由于公司没有运维, 又需要监控服务器的一些数据信息, 想尽快的启动一个数值监控系统. 技术评估了下打算 graphite +  grafana 的方式来建设.

graphite 是一个时间数列数据库,并且自带一些简单 web 图形展示功能. 虽然 web 展示方面不是很完美,但是在收集时间数据上非常的方便和简单. 根据 <https://graphiteapp.org/> 官网的例子,只需要一个 tcp 连接就能向 graphite 服务上传基于时间的数值了.

```bash
echo "foo.bar 1 `date +%s`" | nc graphitehost 2003
```

而 [grafana](https://grafana.com/) 呢? 是一个颜值极高的数据图形化分析和监控应用. 至于颜值有多高呢?自己直接看看这个 demo 就能知道了 <http://play.grafana.org/>. 最重要的一点是 grafana 官方自带 graphite 的[数据源的插件](https://grafana.com/plugins/graphite). 这应用组合在一起就开箱即用了.

那为了方便快捷开发和开发这个系统,就决定用 docker-compose 的方式构建由graphite 和 grafana 组合的服务.

## 服务端配置

```yaml
version: '3'

services:
  graphite:
    container_name: monitor_graphite
    restart: always
    image: sitespeedio/graphite
    volumes:
      - ./data/graphite/storage/whisper:/opt/graphite/storage/whisper
      - ./data/graphite/storage-schemas.conf:/opt/graphite/conf/storage-schemas.conf
    ports:
      - "2003:2003"
      - "8093:80"
  grafana:
    container_name: monitor_grafana
    restart: always
    image: grafana/grafana
    ports:
      - 3018:3000
    environment:
      - "GF_SECURITY_ADMIN_PASSWORD=screct"
      - "GF_SERVER_ROOT_URL=http://subdomain.yourdomain.com"
    volumes:
      - "./data/grafana:/var/lib/grafana"
```
这里通过 volumes 字段将两个服务的磁盘空间都映射到本地主机上;映射的路径都可以在 docker hub 上这个容器说明里面看到;这样我们监控的数据就持久化到了本地.

在服务端通过 `docker-compose up -d` 就将服务启动起来了;用配置 grafana 默认管理员账户密码配置好 graphite 的数据源. 需要注意的就是在配置 graphite 的http url 的时候直接使用 `http://monitor_graphite` 就可以了; 访问的方式选择为`proxy`. 最后填好 graphite 对应的鉴权信息. 服务端 graphite 和 grafana 就配置好了.

这里需要注意的是, graphite 的 2003 是需要暴露到公网的. 所以记得设置主机的防火墙;还有就是由于是直接暴露到了公网的,最好针对访问的 ip 做好白名单.

# 客户端

收集数据的客户端其实非常的简单, 创建一个到 graphite 的 TCP 连接;然后写入自己需要的保存的数据即可.为了验证可行性,就直接用 node.js 来写入即可.

```javascript
// report.js

function ts() {
    return Math.floor(Date.now() / 1000)
}

const client = net.connect(config.graphitePort, config.graphiteHost, () => {
 client.setNoDelay(true)

  setInterval(function () {
    const [cpuUsageIn1Min] = os.loadavg()
    client.write(`server.${config.nameSpace}.os.cpu ${cpuUsageIn1Min} ${ts()}\n`)
  }, ms('10s'));
})

client.on('end', () => {
  process.exit(0)
})
```


# 最后

使用 docker 可以快速的构建起应用所需要基础设施,自己只要写一些定制的内容就很快的完成任务. 感谢 docker.

# 完
希望大家喜欢.
