---
layout: post
title:  "下载youtube视频的另外牛X方法: youtube-dl"
date:   2014-06-04 12:50:12
categories: youtube download
---

``` bash
$node -e "console.log(new Date())"
Thu Jun 05 2014 21:09:46 GMT+0800 (China Standard Time)
```

## 悲
先说一件遗憾的事情,[userscript](http://userscripts.org/)已经关闭快一个月了.虽然有[代替的站点](http://www.ghacks.net/2014/05/09/userscripts-org-good-alternatives/)出现,但是userscript上的资源没有任何的备份,很多好脚本找不到了。

我为什么会发现这个事情的呢，[原先](http://stormslowly.github.io/youtube/2014/02/20/download-youtube-vedio-and-close-captions.html)用的[脚本](http://userscripts.org/scripts/show/25105)不能解析高清晰度的视频，看看作者有没有更新才发现userscript挂了这么久了。

## 喜
于是又开始google新的下载方法，结果发现了神器[*youtube-dl*](https://github.com/rg3/youtube-dl). 作者还很贴心给准备了可执行文件。youtube-dl提供了100多个选项，肯定能满足你的需求。但是由于youtube-dl给提供了100多个选项使用的时候肯定有很多疑惑。Linux可以用`alias`方便使用。windows需要写个bat包装下使用。像我用的`downyt.bat`,在命令行直接`downyt.bat youtube-url` 按自己的配置下载了。

`downyt.bat`
```
d:\usrbin\youtube-dl.exe %* --proxy "https://127.0.0.1:8080" --write-sub  --no-mtime  --output %%(title)s_%%(resolution)s.%%(ext)s  --no-part --all-subs --restrict-filenames
```

||
|:--|:----|
|选项|含义|
|--proxy| 在天朝你没个代理你怎么混啊|
|--write-sub| 下载字幕，这里的字幕是用户上传的字幕，不是youtube自动生成的CC字幕
|--all-subs | 如果有字幕的话，就下载所有字幕，收集癖:)
|--restrict-filenames| 避免在下载的文件名中使用:等特殊字符
|--no-mtime | 不修改文件的mtime，文件的更新时间为下载的时间，这样方便管理
|--output| 下载文件命名模板，还是为了方便管理

>注意: yutube-dl默认是再下载清晰度最高的视频源。如果代理速度不好的还是通过`--format`选项来指定下载那个清晰度的文件



[jsbinurl]: http://jsbin.com/
[jsfiddleurl]: http://jsfiddle.net/

