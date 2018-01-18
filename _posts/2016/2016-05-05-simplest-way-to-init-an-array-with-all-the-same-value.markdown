---
layout: post
title:  "[afterCode]js中如何快捷的创建一个含有相同初始值的数组"
date:   2016-05-04 10:50:00
categories:  afterCode node.js array
---


# 目标
``` JavaScript
function createArrayWith(length,value){...}

createArrayWith(2,3) => [3, 3]
createArrayWith(2,{test:2}) => [{test:2}, {test:2}]
```

**条件: 尽量的简洁**


# 首先想到的是map

```JavaScript
function createArrayWith(length,value){
   return new Array(length).map(function(){
   		return value
   })
}
```

## 失败

```JavaScript
createArrayWith(2,3)
[ , ]
```

## 原因

> map calls a provided callback function once for each element in an array, in order, and constructs a new array from the results. callback is invoked only for indexes of the array which have assigned values, including undefined. It is not called for missing elements of the array (that is, indexes that have never been set, which have been deleted or which have never been assigned a value).

from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>

原来数组中的"空"元素,`map`(包括`foreEach`)都是不会去遍历处理的. 而只传一个参数`new`出来数组,每个元素都是空的

# 死磕map

观察`Array` 构造函数的接口

>```JavaScript
new Array(element0, element1[, ...[, elementN]])
new Array(arrayLength)
```

可以用不定参数的方式来创建

## 用apply试试

```JavaScript
function createArrayWith(length,value){
   return Array.apply(null,new Array(length)).map(function(){
   		return value
   })
}

// 可行
createArrayWith(2,3)
[ 3, 3 ]
```

### 使用ES6的语法简化下

```JavaScript
function createArrayWith(length,value){
   return Array.apply(null,new Array(length)).map(()=>value)
}

createArrayWith(2,3)
[ 3, 3 ]
```

### 好像`new`也可以去掉

```JavaScript
function createArrayWith(length,value){
   return Array.apply(null,Array(length)).map(()=>value)
}

createArrayWith(2,3)
[ 3, 3 ]
```

到了这一步好像是最简洁的实现方式了,但是看起来是在太怪异了.

# ES6到底

在[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) 过`Array` 方法的时候,发现了居然有这个一个[函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

```JavaScript
arr.fill(value[, start = 0[, end = this.length]])
```

顿时草泥马奔腾,原来ES6添加了这个新函数.

在ES6的环境下的话,最简洁的方式还是


```JavaScript
function createArrayWith(length,value){
   return new Array(length).fill(value)
}

createArrayWith(2,3)
[ 3, 3 ]
```

折腾完毕








