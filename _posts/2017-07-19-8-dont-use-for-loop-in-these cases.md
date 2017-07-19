---
layout: post
title:  "[简译]这些情况下别用 for 循环"
date:   2017-06-19 10:50:00
categories:  JavaScript for-loop
---

最近在做一个"程序员英语娱乐主题节目"<http://www.douyu.com/aftercode>的斗鱼直播, 直播的时候简单的解读了下[Don’t pay the for-loop tax](https://dev.to/danhomola/dont-pay-the-for-looptax). 事后想想觉得觉得蛮有意思的,觉得可以写篇 blog.

原文作者的意思,在日常开发和 code review 的时候发现了很多没有必要的`for循环`,而这些循环可以通过一些更加可读的方式来表达.所以作者定义了一个 ***for 循环税***, 向那些写了没有必要的 for 循环的程序员征收.

接下来列举下作者说的3中情况


### 1. 通过一个数组获得一个结果

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

比较推荐的方法不是直接用for 循环,而是采用 `reduce`(有些语言叫`fold`或者`aggregate`).这样可以完全不用去理会循环变量,关注你的求和动作就好了.


```JavaScript
const sum = (array) => array.reduce(
  (total, current) => total + current,
  0);

const numbers = [5, 25, 8, 18];
console.log(sum(numbers)); // logs 56
```

### 2. 从一个数组通过变化得到一个新的数组

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

这 for 循环也和上一个有一样的循环变量需要控制.推荐的做是采用`map`方法.

```JavaScript
const discount = (originalPrices, discountAmount) => {
    const multiplier = 1 - discountAmount;
    return originalPrices.map(price => price * multiplier);
}

const prices = [5, 25, 8, 18];
console.log(discount(prices, 0.2)); // logs [ 4, 20, 6.4, 14.4 ]
```





#完


希望对大家喜欢.