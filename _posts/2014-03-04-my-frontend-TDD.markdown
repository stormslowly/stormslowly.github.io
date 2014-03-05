---
layout: post
title:  "[笔记]1.Karma前端TDD试水 "
date:   2014-03-03 12:50:12
categories: editor
---


##起
博主是电信行业的码农，在工作单位也搞搞单元测试和TDD了什么。目前对Web技术很感兴趣，尝试新的领域里面也试试看TDD.

这次要用TDD的方式要实现一个简单画图板功能，支持Chrome和Firefox。

##准备工作

###安装[Karma](https://github.com/karma-runner/karma)


```bash
npm install -g karma
```


墙内的朋友安装的时候可能会看到这样的错误

```
Downloading http://cdn.bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.7-windows.zip
Saving to C:\TEMP\phantomjs\phantomjs-1.9.7-windows.zip

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: read ECONNRESET
    at errnoException (net.js:901:11)
    at TCP.onread (net.js:556:19)
```

这个时候需要自己手动下载一份``phantomjs-1.9.7-windows.zip``放到对应目录，然后继续执行```npm install -g karma```，安装就会成功。

执行``karma init ``
就会像执行``npm init``，一样提示你配置好你的``karma.conf.js``文件。配置文件里面主要就是一个JSON对象，根据注释提示调整下即可。(如果你和我一样使用的测试框架是Mocha,断言库是chai的话，还需要为Karma安装Mocha的插件``npm install karma-mocha & npm install karma-chai``。)

我的[配置文件](https://github.com/stormslowly/frontendtdd/blob/master/karma.conf.js)和目录结构

```
./
│  karma.conf.js
├─lib
|
└─test
    testwwp.js
```


启动karma，karma会启动你需要的浏览器，并执行case。不过我们还没有添加任何Case。

```
>karma start
INFO [karma]: Karma v0.10.9 server started at http://localhost:9876/
INFO [launcher]: Starting browser Chrome
INFO [launcher]: Starting browser Firefox
WARN [launcher]: Chrome have not captured in 60000 ms, killing.
WARN [launcher]: Firefox have not captured in 60000 ms, killing.
INFO [launcher]: Trying to start Chrome again.
INFO [launcher]: Trying to start Firefox again.
INFO [Chrome 33.0.1750 (Windows 7)]: Connected on socket XSBr3JzPetUpruEbr30w
INFO [Firefox 27.0.0 (Windows 7)]: Connected on socket LfejRTLN--KYyhSlr30x
Chrome 33.0.1750 (Windows 7): Executed 0 of 0 ERROR (1.061 secs / 0 secs)
Firefox 27.0.0 (Windows 7): Executed 0 of 0 ERROR (1.252 secs / 0 secs)
```

###添加Case

按照TDD的节奏，该写一个失败的Case了。

```javascript
"use strict";

var expect = chai.expect;

describe('fist test',function() {

  it('should failed',function() {
    expect(1).to.equal(2);
  });

});
```

Karma的配置文件加载了Mocha和Chai，在测试文件中就不需要像node.js一样``require('xxx')``了。如果你的karma配置文件中``autoWatch``是 ``true``的话，当你保存文件之后Karma就告诉你的Case在两个浏览器里面执行的结果了。


```
INFO [watcher]: Changed file "D:/git/karmatddpost/test/testwwp.js".
Chrome 33.0.1750 (Windows 7) fist test should failed FAILED
        expected 1 to equal 2
        AssertionError: expected 1 to equal 2
Firefox 27.0.0 (Windows 7) fist test should failed FAILED
        expected 1 to equal 2
Chrome 33.0.1750 (Windows 7): Executed 1 of 1 (1 FAILED) ERROR (0.357 secs / NaN secs)
Firefox 27.0.0 (Windows 7): Executed 1 of 1 (1 FAILED) ERROR (0.383 secs / NaN secs)
```

#完
Karma的TDD的工作环境算是配置好了。接下来就可以开发简易画图板了。

---
## 捐赠
如果您觉得本文对您有帮助，欢迎请作者一杯咖啡

[![捐助作者](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/shupengfei)

<https://me.alipay.com/shupengfei>



