---
layout: post
title:  "[翻译] node.js 的 UnhandledPromiseRejectionWarning"
date:   2017-04-05 10:50:00
categories:  afterCode webstorm tips
---


## TLDR;

Promise的错误处理不当, 会导致很多隐藏的Bug. 所以在 Node.js 6.6.0 之后, 如果原生的Promise 没有catch Rejection 就会在 console 打印一条警告; 可以监听 Node 进程 `unhandledRejection` 事件来获得 Rejection 的 Error 信息和关闭警告. Async/await 可以让Promise处理更加方便, 但是也一定 catch async 函数的返回的Promise; async 函数的返回的是一个原生的Promise, 无法被替换成其他第三方的 Promise 实现. 


译文
---------

自 Node.js 6.6.0 添加了一个特性(或者说是bug): [默认输出未处理的Rejection的Promise到标准输出](https://nodejs.org/api/process.html#process_event_rejectionhandled); 这个特性会偶尔有用. 简单点说就是下面的代码会有一个标准输出打印一个错误日志.

```javascript
// node -v  6.10.0
Promise.reject(new Error('woops'));

/*
$ node test.js
(node:83530) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: woops
*/
```

[之前知名Promise库 bluebird 也有类似的功能](http://bluebirdjs.com/docs/api/suppressunhandledrejections.html). 在我之前的[issue](https://github.com/nodejs/node/issues/830#issuecomment-254904199)曾经表示非常讨厌这个功能, 但它只是我不是用 bluebird 的各种原因的其中一个. 可是这个功能现在已加入到 node 中了, 所以接下来的日子我们将无法摆脱这个 "bug". 与其怨天尤人还不如我们研究下如何好好利用这个功能.


什么是未处理的 Rejection?
-------------------------------

"Rejcetion" 是 Promise 表示错误状态的一个规范的说法. 在 ES6 的定义中, Promise 是一个[含有三个状态的状态机: "pending", "fulfilled" 和 "rejected"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

一个处于 pending 状态的 Promise 表示一个异步的操作正在执行当中; "fulfilled" 的表示异步的操作已经完成; "Rejected" 的表示异步操作因为某些原因已经失败了.比如: 我们用 MongoDB 驱动去连接一个不存在的 MongoDB 数据库, 那么我们就会到的一个 Promise 的 Rejection.

```javascript
const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://notadomain');

/* Output:
$ node test.js
(node:9563) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: failed to connect to server [notadomain:27017] on first connect [MongoError: getaddrinfo ENOTFOUND notadomain notadomain:27017]
(node:9563) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

ES6 的 Promise 的构造函数接受一个称为"执行器"的函数, 这个函数接受两个参数, `resolve`函数 和 `reject`函数. 调用 `reject()` 是可以使一个Promise 进如 rejection 状态, 这是第一种方法.


```javascript
new Promise((resolve, reject) => {
  setTimeout(() => reject('woops'), 500);
});

/* Output:
$ node test.js
(node:8128) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): woops
(node:8128) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

另外一种方法就是直接在"执行器"函数中直接抛出异常.

```javascript
new Promise(() => { throw new Error('exception!'); });

/* Output
$ node test.js
(node:8383) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: exception!
(node:8383) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

之前已经有一些讨论, 认为[在执行器中直接抛出异常是一种糟糕的实践](http://2ality.com/2016/03/promise-rejections-vs-exceptions.html). 我表示强烈的反对. 健壮的错误处理是重要的设计模式目标, 如果不能直接在执行器中直接抛出异常, 而是采用类似 callback 时代中, 用 `try/catch` 包裹住回到异步函数来捕获异常来说是一种倒退.

[then函数链式调用](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#Chaining)可以处理 Promise 处理的 Rejection. Promise 还提供了 `.catch()` 这个辅助方法直接来处理 Rejection.

```javascript
new Promise((_, reject) => reject(new Error('woops'))).
  // Prints "caught woops"
  catch(error => { console.log('caught', error.message); });

// `.catch(fn)` 等效于 `.then(null, fn)`
new Promise((_, reject) => reject(new Error('woops'))).
  // Prints "caught woops"
  then(null, error => { console.log('caught', error.message); });
```

看到这里觉得 Promise 的错误处理很简单是吧? 看看下面的代码会打印什么.


```javascript
new Promise((_, reject) => reject(new Error('woops'))).
  catch(error => { console.log('caught', err.message); });
```

它会打印 "UnhandledPromiseRejectionWarning".  注意 `err` 是一个未定义的变量.

```
$ node test.js
(node:9825) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): ReferenceError: err is not defined
(node:9825) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

这就是为什么未处理的 Rejection 会很容易的隐藏在代码之中. 你认为你已经处理了 Promise 的异常, 而实际情况是你在处理的过程中在 `.catch()` 中引入了新的异常. 刚才那个例子还能看起来有点傻, 但是下面这个因为错误配置了 [`sentry`](https://docs.sentry.io/clients/node/), 在使用 sentry 来记录 Promise 错误的时候就会造成一个新的未处理的Rejection.

```javascript
const sentry = require('raven');

new Promise((_, reject) => reject(new Error('woops'))).
  catch(error => new Promise((resolve, reject) => {
    sentry.captureMessage(error.message, function(error) {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  }));

/* Output
$ node test.js
(node:10019) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): TypeError: Cannot read property 'user' of undefined
(node:10019) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
*/
```

正是因为这种未处理的Rejection 非常的难查, node.js 引入了全局处理未处理的Rejection的机制.



`unhandledRejection`事件 
-----------------------


node 进程使用[`unhandledRejection`事件](https://nodejs.org/api/process.html#process_event_unhandledrejection) 用来处理未处理的 Reject 的 Promise,事件处理函数的第一个函数是Promise 的 reject 的错误. 需要注意的是这个事件只能用来处理node 原生的 Promise, 即使你用  `global.Promise = require('bluebird')` 来替换全局的 Promise 库也没用.


```javascript
process.on('unhandledRejection', error => {
  // 打印 "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

new Promise((_, reject) => reject(new Error('woops'))).
  catch(error => {
    // 因为 err 未定义, 所以这个console.log 不会执行.
    console.log('caught', err.message);
  });
```

'unhandledRejection' 事件处理函数接收的 error 参数并没有强制要求必须是一个 Javascript 的 Error 对象. 虽然用一个非 Error 对象来调用 `reject()` [不是一个好习惯](http://eslint.org/docs/rules/prefer-promise-reject-errors), 但是'unhandledRejection'的处理函数得到的参数就是 reject 的调用参数.


```javascript
process.on('unhandledRejection', error => {
  // 打印 "unhandledRejection woops!"
  console.log('unhandledRejection', error.test);
});

new Promise((_, reject) => reject({ test: 'woops!' }));
```

注意你已经监听了 'unhandledRejection', 默认输入到console的 `UnhandledPromiseRejectionWarning` 警告就不再打印. 这个信息只有在没有监听这个实践的时候打印. 如果你想临时的关闭警告, 用一个空函数调用 `catch()`即可


```javascript
process.on('unhandledRejection', error => {
  // 不会打印 因为空函数catch了错误.
  console.log('unhandledRejection', error.test);
});

new Promise((_, reject) => reject({ test: 'woops!' })).catch(() => {});
```

当你完全确认你不需要处错误情况下, 你可以采用这样的方法来关闭未处理的Rejection. 有哪些情况是真正需要关闭错误处理的警告呢? 比如测试的当中, 我们需要 stub 一个函数, 让他返回一个指定的 Promise. 
看下面的例子.

```javascript
const sinon = require('sinon');

const obj = {
  fn: () => {}
};

before(function() {
  sinon.stub(obj, 'fn').returns(Promise.resolve());
});

it('works', function() {
  return obj.fn();
});
```

返回一个 Resolve 的 Promise的代码是完全没有问题的, 但是如果需要范围一个 Rejection 的 Promise呢, 看下面的代码, 它是会导致 未处理的 Rejection Promise 的问题的.

```javascript
const assert = require('assert');
const sinon = require('sinon');

const obj = {
  fn: () => {}
};

before(function() {
  sinon.stub(obj, 'fn').returns(Promise.reject(new Error('test')));
});

it('works', function() {
  return obj.fn().catch(error => {
    assert.equal(error.message, 'test');
  });
});
```

在这种场景下 Promise 就打破了 Promise 的抽象边界. `catch()` 不再一个没有副作用的纯函数 (它的调用与否可能会影响全局的警告打印). 就上一个例子, 如果想不打印未处理啊的 Rejection 的警告, 就需要对stub返回的Promise先catch一次. (译者注: ***同一个Promise是可以被then多次的***,所以也可以被catch多次; 注意这里说的 then 多次不是指 then 的链式调用, then的链式调用的时候, 每then一次就会产生一个新的Promise)
 
```javascript
before(function() {
  const p = Promise.reject(new Error('test'));
  p.catch(() => {});
  // 这样就没有 warning 了, 这个rejection 已经被处理过了.
  sinon.stub(obj, 'fn').returns(p);
});
```

Async/Awati的方案
-------

[Async/await](http://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js.html) 相对于自己手动采用then的链式调用的一大优点就是: await 会帮助帮你处理 `catch()`

```javascript
async function test() {
  // 没有警告
  await Promise.reject(new Error('test'));
}

test().catch(() => {});
```

注意这里是因为 在 `test()` 函数之后已经 `catch()` 了, 所以没有打印警告. 如果没有 `catch()` 已经会有警告

```javascript
async function test() {
  // 会打印警告
  await Promise.reject(new Error('test'));
}

test();

/* Output:
$ node test.js
(node:13912) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 2): Error: test
(node:13912) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code. */
```

Async/await 让你可以让 Promise 参与到一些复杂的流程控制中去, 比如循环,条件控制等等. 需要注意的是 Async 是会返回一个 Promise 的, 记得去 `cacth()`

还有一点就是, async 函数返回的是一个原生的 Promise, 你是无法替换成其他第三方的 Promise 的. 所以别想着替换原生 Promise 让Async逃脱出未处理的Rejection警告的魔爪.

```javascript
global.Promise = require('bluebird');

async function test() {
  await Promise.reject(new Error('test'));
}

// 打印 "false"
console.log(test().catch(() => {}) instanceof require('bluebird'));
```

_虽然你无法替换  async/await 中的 Promise 实现, 但是可以用  [co](https://www.npmjs.com/package/co) 这样的黑科技来模拟 async/await 的操作. 顺便广告下: 如果你想自己从头写一个 co 库, 来加强对 async/await 的理解, 可以原文作者的书[ES6 generators](http://es2015generators.com/)_
# 完
