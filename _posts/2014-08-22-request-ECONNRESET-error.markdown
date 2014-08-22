---
layout: post
title:  "request的ECONNRESET错误"
date:   2014-08-22 12:50:12
categories: request.js node.js ECONNRESET
---

### [request.js](https://github.com/mikeal/request/)


>##Request — Simplified HTTP client

`request`的自我介绍的就说很清楚一个简化的HTTP客户端.
在实际的项目开发中会频繁的使用到网络API的调用,
这个时候使用`request`就能带来很多的便利.
而且`request`支持管道`pipe`操作,使用起来就更加的顺手了.

实际项目中使用的模型可以简化成如下的代码

``` js
http.createServer(function (req, res) {
    var x = request('http://anothersite.com' + req.url );
    req.pipe(x);
    x.pipe(res);
})
```

在实际测试的时候,当并发测试10+个请求的时候会得到,如下的错误.

```
 { [Error: socket hang up] code: 'ECONNRESET' }
```

这样的error很容易让人猜想是API服务器reset了server的请求,
但是发现如果并发请求直接从浏览器端发起,所有的API调用都是正常的.
所以还是自己server实现的问题.

结果各种Google原来是因为这个原因.`node.js`的http请求是共享Sockets的,
当对外的请求数量高了,新的请求就需要排队.
而且`request`库里面直接返回`ECONNRESET`.

```bash
$node
> http = require('http');
> http.globalAgent.maxSockets
5
```

知道了原因就容易解决了,最无脑的方法就是把`maxSockets`调到无限大.

```
http.globalAgent.maxSockets = Infinity
```

更好的方法参见这个[issue](https://github.com/mikeal/request/issues/142)
还没有仔细的研究forever代理的原理,所以我也只是用了无脑的方法 :)
