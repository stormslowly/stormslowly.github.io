---
layout: post
title:  "[afterCode]week22 收获"
date:   2016-06-04 11:50:00
categories:  afterCode picks skill
---


# youtbue-dl

## egghead.io 免费视频的下载
可以参考 <https://gist.github.com/ldong/b289d56090f98d02423c>

适当做的改进

```bash
$copy($('h4 a').toArray().map((i)=>$(i).attr('href')).join('\n'))
```
以上命令来获得需要的url列表,一来方便,二来可以避免但url过长出现`...`导致youtube-dl无法正常下载的情况

##下载 `.m3u` 流

直接把`.m3u`的地址给 `youtube-dl` 即可

# React 

## `key`属性

如果你通过数组渲染出来的组件,之后是需要重新排序,并且排序之后的顺序又会影响原先的数组(类似双向数据绑定),那么不要简单的采用`map`函数传递过来的`index`作为key,这样会导致排序之后页面不会重新渲染,因为`key`是一样的.

## ref回调的妙用:模块的装饰

当对应组件挂载到`dom`后,`ref`回调会被调用.按照 facebook 的说法,回调接受的参数为对应的组件. 如果是`<div>`则是`DOM`对象,如果一个自定义的组件的则是一个 react 组件. 这需要注意下.

既然获得了`DOM`对象的话就可以调用第三方库来装饰这个对象. 这是`sortable`的一个例子<https://github.com/RubaXa/Sortable#support-react-es2015--typescript-syntax> .

但是这样带来的一个问题就是:由于直接使用`sortable`,对应的组件就不能后端渲染了.


# 完
