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

在实际开发中,我们经常会调用第三方的API, 调用的时候经常会根据调用的结果是否正常来处理不同的逻辑.
最常见的一个例子就是

```typescript
interface APIResponse{
    error: boolean
    errorMessage?:string
    data?: number[]
}
```

如果 API 调用正常, error 为 `false`, 那么就是在 data 成员中获取对应的数据; 如果调用失败 error 为 `true`, 到 errorMessage 中
获取错误信息.
 
在代码中使用这个类型的变量的话,各个字段都是可选的(因为带着`?`), 那 typescript 就不能帮助推断出当error 为 true 时, 只有 data 字段可以使用,而 errorMessage 是无效的.
如何让 typescript 也能理解这个类型字段和字段的关系呢?


```typescript
interface SuccessAPIResponse{
  error: false
  data: number[]
}


interface ErrorAPIResponse {
  error: true
  errorMessage:string
}

type APIResponse =  SuccessAPIResponse | ErrorAPIResponse 
```

那在使用 APIResponse 类型的数据的时候, typescript 的类型保护就能理解代码所处的逻辑位置, 然后根据对应具体类型来分析代码, 比如 


```typescript

const res : APIResponse

if(res.error){
  console.log(res.errorMessage)
  console.log(res.data)  // Error ErrorAPIResponse dont have attribute data
}else{
  console.log(res.data)  // ok
  console.log(res.errorMessage)
}
```



# 完
希望大家喜欢.