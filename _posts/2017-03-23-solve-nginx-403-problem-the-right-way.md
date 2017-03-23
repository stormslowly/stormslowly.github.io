---
layout: post
title:  "[afterCode] 终于用正确的方式解决nginx 403 错误"
date:   2017-03-23 10:50:00
categories:  afterCode nginx
---

当安装启动好自己的 nginx 服务, 上传好自己的静态文件后. 很多人都会碰到 403 这个错误.
搜索网络基本得到的答案是

1. 服务器的根目录没有 `index.html index.htm index.php` 文件
2. 根目录的权限不够


第一个问题很好解决,缺啥补啥; 或者通过 `index` 指令制定 failover 的文件.
权限不够就各种解法了. 比如

```bash
$ chmod -R 777 /some/path/
```
有些比较理智的会和你说权限只要`755`就可以了啊.但是你发现改了这些还没有用的时候. 就开始尝试修改文件所在用户和用户组. 结果一样没有什么用.

最后你心一横, 直接在 nginx 的配置文件里面 `user root;`. 然后站点访问正常就算了.


但是解决正确的方法是什么呢?

当 nginx 使用一个目录作为 root 来使用的时候, 除了需要获得这个目录下所有文件的下的读权限以外, 还需要能够成功的访问到这个路径. 换句话说到达这个目录的每个文件夹, nginx 都要有`x`权限. 确认是否都有 `x` 的权限可以使用目录 `namei` 帮助查找.

```bash
[root@cloud test]# namei -l /root/test/index.html
f: /root/test/index.html
dr-xr-xr-x root root /            # 第一列 权限 用户 用户组 路径
dr-xr-x--- root root root         # /root 目录显然对非组内的用户是没执行权限
drwxr-xr-x root root test
-rwxrwxrwx root root index.html
```

所以如果不小心你把站点的文件放在 root 的文件夹下, 除了用 root 执行ngxin 或者把 nginx 添加到 root 组真的没有什么其他办法可以解决这样造成的 403 错误了. 所以最好还是为 nginx 在其他更加合适的地方(`/home/nginx`, `/user/share/nginx/html`) 存放站点文件.


这里突然想到了一句话来警示自己在解决403权限问题时滥用各种方法乱投医的行为.

> 优化的方法方法大家都知道, 这只能算1分. 找到真正需要采用这个优化方法的地方才能得到另外的99分.

祝大家都能得到💯

# 完


