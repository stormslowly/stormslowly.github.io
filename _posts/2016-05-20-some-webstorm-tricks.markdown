---
layout: post
title:  "[afterCode]分享一些webstorm技巧"
date:   2016-05-20 11:50:00
categories:  afterCode webstorm skill
---


一些个人技巧,希望对你有用


* `webstorm` 是能够补全`require`的文件路径和已经在`package.json`中已经定义的依赖包
* 可以通过下载`d.ts`来提高补全的能力 `preference..` => `Languages & Frameworks` => `Javascript` => `Libraries` => `download` 选择你需要的模块的

* 活用`Livetemplate`

比如: 经常需要新建`mongoose model` 就可以创建一个template, 通过`mongoosemodel`触发

```
'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var $Model$Schema = new Schema({

})
$Model$Schema.index('')
$Model$Schema.method('methodName', function () {})

var $Model$ = mongoose.model('$Model$', $Model$Schema)
module.exports = $Model$
```

还有`co`的两个teamplate

```
return co(function* co$fn$() {
$END$
})
```

```
return co.call(this,function* co$fn$(){
$END$
})
```

两个templatge中的`$fn`变量都定义为 `capitalize(jsMethodName())`

利用变量定义可以实现一些比较炫酷的功能比如我的`log`模板是这样的

```
console.log("$FILE_NAME$ $LINE$ $FUNC$",$info$)
```

触发就会展开为

```
console.log("Reservation.js 18 coConfirmTo",);
```
debug完了 按照log中带的文件/函数名信息去删对应的代码即可



## 完
