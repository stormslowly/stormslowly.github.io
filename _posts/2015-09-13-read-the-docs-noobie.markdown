---
layout: post
title:  "[afterCode]read the f**king docs"
date:   2015-09-13 10:50:00
categories:  afterCode node.js
---

>莎士比亚说
80%的bug，都可以通过阅读文档来解决

<br>

>亚里士多德说
另外20%的bug 可以通过单元测试来定位

## 找bug

`nshuffledCards` 概率平均返回`n`张牌，如果`n`大于牌的总数，在返回全部随机排序的.

```javascript
var nshuffledCards = (function () {
    var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    function swap(i, j) {
        temp = cards[i]
        cards[i] = cards[j]
        cards[j] = temp
    }
    return function (n) {
        var _n = lo.min(n, cards.length)
        var result = []
        for (var i = 0; i < _n; i++) {
            var select = lo.random(i, _n - 1)
            swap(i, select)
            result.push(cards[i])
        }
        return result
    }
})()
console.log(nshuffledCards(1))
```

###再给点提示
如果执行

```sh
$ node untitled.js
FATAL ERROR: JS Allocation failed - process out of memory
```

## 读文档
```js
_.min(collection, [iteratee], [thisArg])
```
>Arguments

>1. collection (Array|Object|string): The collection to iterate over.
2. \[iteratee\] (Function|Object|string): The function invoked per iteration.
3. \[thisArg\] (*): The this binding of iteratee.

`min`传入的第一个参数是一个集合. 如果传入的参数不对会如何呢？

```sh
> lo.min(1,2)
Infinity
```


## 结论

如果你写代码,不看文档,又不写单元测试,那么bug无处不在.
别问我为什么知道这些.



