---
layout: post
title:  "[afterCode]cocos2d 热更版本号设置问题"
date:   2017-08-03 08:50:00
categories:  cocos2d hotupdate
---

之前发cocos2d 热更新包的时候,一直以为发热更新的时候,只要版本号和本地的版本号不同就会触发热更新,热更新完成之后就会进入新游戏状态.

# 原文简译

原文作者的意思,在日常开发和 code review 的时候发现了很多没有必要的`for循环`,而这些循环可以通过一些更加可读的方式来实现.所以作者开玩笑定义了一个 ***for 循环税***, 向那些写了没有必要的 for 循环的程序员征收.


## 1. 通过一个数组获得一个结果

比如数组求和

```JavaScript
const sum = (array) => {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
}

const numbers = [5, 25, 8, 18];
console.log(sum(numbers)); // logs 56
```

这样写求和是完全没有问题.只是这样来求和,你需要注意一些细节;`i`循环变量的控制要从`0`开始,而且是小于`array.length`. 有注意的地方的话就可能写错,滋生 bug.

比较推荐的方法不是直接用for 循环,而是采用 `reduce`(有些语言叫`fold`或者`aggregate`).这样可以完全不用去理会循环变量,关注你的求和的逻辑就好了.


```JavaScript
const sum = (array) => array.reduce(
  (total, current) => total + current,
  0);

const numbers = [5, 25, 8, 18];
console.log(sum(numbers)); // logs 56
```

## 2. 从一个数组通过变化得到一个新的数组

```JavaScript
const discount = (originalPrices, discountAmount) => {
    const multiplier = 1 - discountAmount;
    // we must clone the array
    let result = new Array(originalPrices);
    for (let i = 0; i < originalPrices.length; i++) {
        result[i] = originalPrices[i] * multiplier;
    }
    return result;
}

const prices = [5, 25, 8, 18];
console.log(discount(prices, 0.2)); //logs [ 4, 20, 6.4, 14.4 ]
```

这 for 循环也和上一个有一样的循环变量需要控制.推荐的做是采用`map`方法.那采用map 函数带来的另外一个好处就是,map函数直接返回一个新的数组,这样保证的原先的数组没有被修改过.

```JavaScript
const discount = (originalPrices, discountAmount) => {
    const multiplier = 1 - discountAmount;
    return originalPrices.map(price => price * multiplier);
}

const prices = [5, 25, 8, 18];
console.log(discount(prices, 0.2)); // logs [ 4, 20, 6.4, 14.4 ]
```

## 3. 需要含有从 n 到 m 的数组

其实这个例子是我觉得比较值得商榷的例子.作者举的例子是获得前 n 个自然数的平方.

作者给出的反例是

```JavaScript
const squaresBad = (n) => {
    let result = [];
    for (let i = 1; i <= n; i++) {
        result.push(i * i);
    }
    return result;
}

const squares = (n) => {
    let result = new Array(n);
    for (let i = 1; i <= n; i++) {
        result[i - 1] = i * i;
    }
    return result;
}

console.log(squaresBad(5)); // logs [ 1, 4, 9, 16, 25 ]
console.log(squares(5)); // logs [ 1, 4, 9, 16, 25 ]
```

第一个 `squaresBad` 实现非常朴素,按照顺序一个一个 push.作者认为这样的方法不好的原因是在于这样一直 push 存在[性能问题][3]. 笔者认为仅仅是因为性能问题否定这个 for 循环是太草率.

那第二个`squares` 实现虽然通过"预分配"数组的空间来避免了性能问题,但是需要`result[i - 1]` 其实也是需要注意的一个细节,也是一个容易出错的一个点.

那作者认为比较好的实现是什么呢

```JavaScript
const range = require("lodash.range")
const squaresLodash = (n) => range(1, n + 1).map(
    (n) => n * n);

const squares = (n) => [...Array(n).keys()].map(
    (n) => (n + 1) * (n + 1));

console.log(squaresLodash(5)); // logs [ 1, 4, 9, 16, 25 ]
console.log(squares(5)); // logs [ 1, 4, 9, 16, 25 ]
```

一个是通过第三方库 lodash 来生成 n 到 m 的数字,然后通过 map 函数来处理数据.另外一个利用 es6 的语法糖 `...`展开数组的方式.
笔者还是比较认同第一个方法,虽然带来了学习三方库的成本,但是显然更加的可读;然而利用语法糖的方案,其实在阅读时候反而带来了费解.

## 4. 如果你真的需要重复有副作用的调用.

作者认为你应该抽象一个工具函数`doNTimesLoop`来做重复的动作.而且还建议如果你的 js 环境支持尾调优化的话可以采用递归的方式来实现.

```JavaScript
const doNTimesLoop = (n, f) => {
    for (let i = 1; i <= n; i++) {
        f(i);
    }
}

const doNTimesRec = (n, f) => {
    const body = (m) => {
        if (m > n) return;
        f(m);
        return body(m + 1);
    }
    return body(1);
}
//both log "Hello world" five times
doNTimesLoop(5, x => console.log("Hello world"));
doNTimesRec(5, x => console.log("Hello world"));
```

# 到这里还没完

如果你看到这里觉得还蛮有意思的话,或者你这里觉得没什么意思的话,那我要告诉等你的是"从来评论才是本体". 显然这边富有争议的文章会带来了激烈的讨论. 那我"简译"几个有意思的评论

## [benchmar打脸篇][4]

原文作者在第三个问题"需要从 n 到 m 的数字", 说对一个空数组做 `result.push(i * i)` 会存在性能问题;之后有给出ES6 语法糖 `...`的解决方案.那有一个读者给出了一个简单的 benchmark

```JavaScript
console.time("Array.push");
var array = [];
for (var i = 0; i < 1e7; i++) array[i] = i;
console.timeEnd("Array.push");
// Array.push: 220ms

console.time("new Array.push");
var array = new Array(1e7);
for (var i = 0; i < 1e7; i++) array[i] = i;
console.timeEnd("new Array.push");
// new Array.push: 47ms

console.time("Array.map");
var array = [ ...Array(1e7).keys() ].map((_, i) => i);
console.timeEnd("Array.map");
// Array.map: 1209ms
```
当然除了吐槽性能查之外,也和我一样觉得这样的语法糖适得其反,搞得更加晦涩难懂.当然这个出打脸的同学也知道"做人留一线日后好见面", 说作者文章的其他部分还是很 spot-on (准确的).

那针对对 ES6 语法变的更加晦涩的部分,有一个路人给出了一个新的方案,也让人眼前一亮.

```JavaScript
console.time("Array.from");
var array = Array.from({length:1e7},(_, i) => i);
console.timeEnd("Array.from");
```
但是性能依旧不堪,笔者在自己的 MacBook Pro (Retina, 13-inch, Late 2012),用 node v7.10.1 跑的 [benchmark][5] 结果如下

```text
Array.push: 378.066ms
new Array.push: 112.525ms
new Array.push rev: 108.405ms
Array.map: 2505.947ms
Array.from: 1345.321ms
```

前后矛盾的作者,最后只好说 "Make it run, make it right, make it fast, make it small". 早知如此就不应该一开始说别人有性能问题了 : p


## [隔壁老王也来打脸][6]

其实作者写了这么多无非就是为了让 JS 写的更加函数式一点,这时候出来一位大神(姑且称之为老王).老王说采用函数式编程的方式,`Haskell`和`Scheme`,即使是 python 实现第一个对数组求和问题的时候都非常的清晰.但是使用 js 的 reduce 方法的话看起来就怪怪的. `(total, current) => total + current`光从代码层面来看, 为什么要把 `total` 和 `current` 相加呢?

老王又说虽然`for(;;)`的形式是很容易出错,但是`for in` 和 `for of`的写出来的代码也很清晰易懂啊.接着又不点名批评了下那些类似`Ramada`的库造就的如此晦涩的代码 `apply(compose(fn1, fn2.bind(arg)), value)`.接着补刀道,毕竟 js 还是 js 不像我大Haskell写的如此的简洁 .

最后老王说了写 js 的时候如果一味的追求函数式编程,就和以前一味的追求写面向对象(OOP)的代码一样, 原本在 js 中很简单的实现一定要生搬硬套,结果就是代码反而变得更加啰嗦.(老王这里举的例子就是js 中实现设计模式中的”命令模式”, 而这些命令模式的类其实就可以用一个简单的函数就能替代.)

面对大神碾压视角的评论,原作者也先俯首称臣表示,你说的挺有意思的;虽然你提的`for of`是个不错的选择,但是我还是觉得用 `reduce`比较爽.
呵呵!

## [直接怼的选手][7]
这位选手上来直接就说:”你说什么 for 循环税,老子还说 数组方法税呢.” 他的观点就是有时候那些刻意的”函数式”的代码对象与直接使用 for 循环来说反而更加的简洁和可维护性高;只是作者给的都是一些反例罢了.

# 真的快完了

简单的一个关于 for 循环的讨论炸出来了这么有意思的评论,首先国外的技术圈的氛围真的很好.

回到问题本身,我的观点是还是尽量使用这些所谓的数组函数,因为这些函数已经抽象出了一部分的逻辑;当你看到`map`,`reduce`,`filter`的时候你就知道代码的大概的意图,而且主要的逻辑的写在对应的回调里面了.如果你一定要用 for 循环的话,个人比较推荐使用下面两种形式

```JavaScript
for (const player of players){
	// do with player
}
```

```JavaScript
for (const [index,player] of players.entries()){
	// do with index, player
}
```

如果你在循环体里面又要`continue` 又要`break`的, 其实使用其他的循环方式可能更加合适(比如`do while`和`while`)


# 完
希望大家喜欢.

[1]:	http://www.douyu.com/aftercode
[2]:	https://dev.to/danhomola/dont-pay-the-for-looptax
[3]:	https://jsperf.com/array-assign-into-new-array-vs-push
[4]:	https://dev.to/danhomola/dont-pay-the-for-looptax/comments/92d
[5]:	https://gist.github.com/stormslowly/ba5cba0a519bff98030f52835ef3e0c6
[6]:	https://dev.to/danhomola/dont-pay-the-for-looptax/comments/95i
[7]:	https://dev.to/danhomola/dont-pay-the-for-looptax/comments/92l