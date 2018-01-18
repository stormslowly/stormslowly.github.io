---
layout: post
title:  "[afterCode]Typescript:到底是 number 还是 Timer"
date:   2018-01-18 10:50:00
categories:  aftercode typescript
---

## 问题

重构一个 ts 项目,原来的代码是这样的.

```typescript
class SUT {

  timeout: NodeJS.Timer

  defferIt(fn: () => void) {
    const timeInMs = 20000
    this.timeout = setTimeout(fn, timeInMs)
  }

  cancel() {
    clearTimeout(this.timeout)
  }
}
```

觉得 `timeInMs` 的表达还是有点啰嗦,就引入 `ms` 这个库来


```typescript
  defferIt(fn: () => void) {
    const timeInMs = ms('20s')
    this.timeout = setTimeout(fn, timeInMs)
  }
```

虽然这样更加可读了,Typescript编译的时候就直接报错了.

```txt
error TS2322: Type 'number' is not assignable to type 'Timer'.
```

查看 `node_modules/@types/node/index.d.ts` 发现这个函数定义的返回值就是`NodeJS.Timer`啊 

```
declare function setTimeout(callback: (...args: any[]) => void,
     ms: number, 
     ...args: any[]): NodeJS.Timer;
     
```

## 思索

转念一想,既然 ts 编译的时候说他返回的不是`NodeJS.Timer`了,那肯定有一个返回 number 的定义咯.
将调用的参数都删掉,然后点击查看定义, IDE 提示有三处定义. 其中一处是上面列出的;还有两处来自`es6`中的定义.

```typescript
// JavaScriptLanguage/jsLanguageServicesImpl/external/lib.es6.d.ts

declare function setTimeout(
    handler: (...args: any[]) => void, 
    timeout: number): number;

declare function setTimeout(
    handler: any, timeout?: any,
     ...args: any[]): number;

```

在回到我们重构的语句`timeInMs = ms('20s')`, 通过类型推断出timeInMs的类型是 `any`, 那 ts 的编译器就
认为你调用的是`lib.es6.d.ts`中的定义函数,返回值类型就是 number 了

## 解决

知道原因了解决起来就非常简单了 `timeInMs: number = ms('20s')`, 加上了明确的类型定义.
这样 ts 编译的时候就能根据明确的类型推断了.

有时候出了问题,不要瞎想是不是编译器出错了,其实编译器报错总是有原因的.
找到原因问题自然就解决了.

# 完
希望大家喜欢.