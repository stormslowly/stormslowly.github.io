---
layout: post
title:  "[afterCode]typescript 高级技巧"
date:   2017-11-12 10:50:00
categories:  aftercode typescript tips
---

#0x0 不只是 boolean

```typescript
function getAllOrOne<T>(i: T[]): T[] | T {
  if (Math.random() > 0.5) {
    return i[0]
  }
  return i
}

const allOrOne = getAllOrOne([1,2,3])

//这里只会按照 object 来提示代码

if(Array.isArray(allOrOne)){
    allOrOne.slice() // 只提示数组类型相关函数
}else{
    allOrOne.toFixed()  // 只提示 number类型 相关的函数
}
```

typescript 是根据什么知道数据的类型呢? 虽然从语言角度看 `Array.isArray` 的返回值 `boolean`,
如果仅仅是 `boolean` 是不能判断出上下文的数据类型的. 查看 `Array.isArray` 的定义可以发现, 
这这里并没有使用 `boolean` 而是采用 `arg is Array<any>` 的方式这样的话就能根据函数返回值来推导出
当前的数据类型.
 
```typescript
// lib.d.ts
interface ArrayConstructor {
    ...
    isArray(arg: any): arg is Array<any>;
    ...
    }
```

像 `Array.isArray` 的函数叫做 `类型保护(type guard)` 函数. 
在函数中只要使用了 `typeof` 或者 `instanceof`的表达式就会产生类型保护的效果

```typescript
function foo(x: number | string) {  
    if (typeof x === "string") {  
        return x.length;  // x 当做 string 类型来处理  
    }  
    else {  
        return x + 1;     // x 当做 number 类型来处理  
    }  
}
```

但是如果要让函数产生类型保护的效果就需要采用 `xx is T` 的形式来定义函数了. 如果涉及到类型判断的
`isXXX` 的函数记得使用


# 组合 组合 组合 

在实际使用中,我们经常会调用第三方的API, 调用的时候经常会根据调用的结果是否正常来处理不同的逻辑.
最常见的一个例子就是

```typescript
interface APIResponse{
    error: boolean
    errorMessage?:string
    data?: number[]
}
```




# 完
希望大家喜欢.