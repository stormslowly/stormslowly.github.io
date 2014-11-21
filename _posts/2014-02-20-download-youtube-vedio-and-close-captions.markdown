---
layout: post
title:  "下载Youtube视频和CC字幕"
date:   2014-02-20 12:28:12
categories: youtube
---

在兲朝看到youtube上好玩的东西就忍不住想收藏，有些视频又是英文的，
加之自己的听力又不是很好，就又想下载对应视频的CC字幕。经过一番search终于搞定了这个需求。
(P.S 本文不涉及如何翻墙)


##下载youtube视频
安装油猴脚本 [Download YouTube Videos as MP4](http://userscripts.org/scripts/show/25105)

!['Download YouTube Videos as MP4  screen shot'](http://i.imgur.com/GyOQCe1.png)


##下载youtube CC(Close Caption)字幕
安装油猴脚本 [Get the youtube CC subtitle](http://userscripts.org/scripts/show/392036)

!['get youtube CC'](http://i.imgur.com/Wu2we0L.png)

## Close Caption转换工具 cc2srt

```
>git clone https://github.com/stormslowly/cc2srt.git
>npm install cc2srt -g
>cc2srt CloseCaption.xml
```

这样就讲google CC文件转换成srt字幕文件，在播放视频的时候加载就是了。

## 完!
----
## 捐赠
如果您觉得本文对您有帮助，欢迎请作者一杯咖啡

[![捐赠EventProxy](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/shupengfei)
