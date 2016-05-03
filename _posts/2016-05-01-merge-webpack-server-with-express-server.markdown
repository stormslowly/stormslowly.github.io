---
layout: post
title:  "[afterCode] webpack开发服务器和已有服务组合的另外一个思路"
date:   2016-04-30 08:50:00
categories:  afterCode node.js webpack
---

解决的问题
1. `webpack hot module reload`在某些情况下无法自动更新 react 应用

2. 对已有的服务侵入式的修改.

3. 开发时需要在两个端口上启动两个服务器,一个`backend server`一个`webpack devserver`

## 方法

### webpack config

`webpack.config.js` 采用[react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate/blob/master/webpack.config.js)

注意修改自己的`entry`中服务器的地址和端口,直接改成`backend server`的ip和端口

`output.publicPath` 也要修改成`backend server`中对应的静态文件的路径,如

`publicPath: 'http://127.0.0.1:4000/dist/'`

## backend server的修改


已有的`backend server` express server 导出为 `backendApp`.

定义`app.js` 如下

```javascript
var WebPackDevServer = require('webpack-dev-server')
var backendApp = require('./backendApp')

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('./webpack.config.dev');

  const compiler = webpack(config);
  var devServer = new WebPackDevServer(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    contentBase: false
  })
  devServer.app.use(backendApp)

  module.exports = devServer
} else {
  module.exports = expressApp
}
```

`devServer.app.use(backendApp)` 这行就是这个思路的关键,相当于`dev server` mixin了`backend server`的所有功能, 并且替换了需要编译的js静态文件,使得他们具有hot reload的功能.


### 启动服务

我们项目的习惯会为每个项目建立一个`boot.js`启动服务的文件, 也可以选择其他方式启动服务,其实就是调用`app.listen`启动服务.


```javascript
var app = require('./app');
var port = process.env.PORT || 4000

app.listen(port, function () {
  console.log('helloworld server listening on port ' + port)
})
```

这样就能在开发阶段只需要开启`backend server`就能享受`webpack devserver`带来的自动重新编译功能和gaearon大神带来的react reload.


