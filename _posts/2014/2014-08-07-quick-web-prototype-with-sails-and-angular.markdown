---
layout: post
title:  "使用sails.js和angular.js快速构建网络应用原型"
date:   2014-08-07 12:50:12
categories: prototype sails.js yo
---

### [sails.js](http://sailsjs.org/)

node.js的rails.通过sails的命令行可以非常快速的创建CRUD API.

``` bash

$ mkdir prototype
$ cd prototype
$ sails new apiserver  // 创建sails 服务器
$ cd apiserver
$ sails generate item  // 产生了item的CRU API
```
修改下sails的配置,放sails服务能够被跨域访问,以方便angular.js开发.

在apiserver下`config/cors.js`如下修改

```javascript
-       allRoutes: false,
+       allRoutes: true,
```

启动sails apiserver
```
$ sails lift
```
`http://localhost:1337/item` 地址就能开是接受RESTful的api请求了

### [angular.js](https://angularjs.org/)

angular.js不用多少.他的`$resource`可以非常方便的和restiful接口工作.
先创建一个angular项目


```bash
$ mkdir frontend && cd $_
$ yo angular web
```

创建item相关路由
```
$ yo angular:route food
$ grunt serve
```

打开 `http://localhost:9000/#/item`

文件`frontend/app/scripts/controllers/item.js`

```js
'use strict';
angular.module('webApp')
  .controller('itemCtrl', function($scope, $resource) {

    var Item = $resource('http://localhost:1337/item', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    $scope.item = new Item();
    $scope.itemList = item.query();
    $scope.saveitem = function() {
      var method = $scope.item.id ? '$update' : '$save';
      $scope.item[method]({}, function() {
        $scope.item = new Item();
        $scope.itemList = item.query();
        console.log("Saved!!");
      })
    };
    $scope.edititem = function(item) {
      $scope.item = item;
    };
  });
```

页面文件`frontend/app/views/item.html`

```html
<div class="row">
  <form action="" ng-submit="saveItem()" method="POST" role="form">
    <legend>New Item</legend>
    <div class="form-group">
      <label for="">Item Name</label>
      <input type="text" ng-model="item.name" class="form-control" id="" placeholder="Input field" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <h1>^Item List^</h1>
  <ul>
    <li ng-repeat="item in itemList">
      {{ item.name }}
      <button ng-click="editItem(item)">Edit</button>
    </li>
  </ul>
</div>
```

### 刷新 <http://localhost:9000/#/item>

暂时一个粗糙的概念.
