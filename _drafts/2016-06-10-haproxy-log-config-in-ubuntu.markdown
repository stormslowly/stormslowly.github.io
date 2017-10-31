---
layout: post
title:  "[afterCode]week22 收获"
date:   2016-05-20 11:50:00
categories:  afterCode picks skill
---


# youtbue-dl

- egghead.io 免费视频的下载
可以参考 <https://gist.github.com/ldong/b289d56090f98d02423c>

适当做的改进
```bash
$copy($('h4 a').toArray().map((i)=>$(i).attr('href')).join('\n'))
```
一上命令来获得需要的url列表,一来方便,二来可以避免但url过长出现`...`导致youtube-dl无法正常下载的情况

- can download  `.m3u` stream
直接把`.m3u`的地址给 `youtube-dl` 即可

# React 

- `key`属性







# 完
