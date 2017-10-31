---
layout: post
title:  "[afterCode] 一步一步从js迁移到ts日记"
date:   2017-05-14 10:50:00
categories:  afterCode transfer JavaScript TypeScript
---

# day0
手头基于`node`的棋牌项目服务端的代码,不算多也不算少14K Loc. 但是由于是一个历史遗留的项目, 前人在开发的时候太随意奔放, 给现在的维护和新开发的工作带来了很多障碍. 

在接手项目的第一刻开始, 我们就积极的引入各个层面的测试, 来保证项目的安全. 经过一段时间的积累, 游戏的核心的算法部分的单元测试和集成测试已经比较完备; 但是游戏流程控制相关的部分, 各个控制逻辑记录的状态的变量定义的非常随意, 有时候甚至会意义一样的 Flag 会有两个变量来定义. 虽然测试会帮助我们理解这些Flag和游戏流程控制, 但是这样的效率不是很满意. 这时我觉得应该是可以让 ***TypeScript*** 来帮助解决这个问题了.

所有的好代码都是一步一步进化而来的. 所以我并不着急一蹴而就. 但这又是一个线上项目, 一旦迁移的过程中任何差池老板都会直接崩溃. 这篇blog 就是用来记录迁移过程中战战兢兢的每一天. P.S: 希望我老板不要看到篇文章 :p


# day1 

## 编译代码

没有魄力也没有这么鲁莽, 直接把项目所有文件做`.js`=>`.ts`的重命名, 第一步就是让现有的代码能够在`typescript`编译器中顺利编译, 替换掉`babel`. 

理论上`ts`是`js`的超集, `babel`能编译通过的代码,`ts`也没有什么问题. 这个信念的支持下开始撸起袖子干.

根目录执行:

```bash
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
$ cat tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "strict": true,
        "sourceMap": false
    }
}
```

因为需要保留`js`文件,所以需要在`tsconfig.json`中添加允许编译`js`文件选项 `allowJs`; 目前项目使用的`node`版本 5.9.x, 所以就编译到 es6 ; 其他的一些杂项就根据文档推荐配置.
最终 `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": false,
    "sourceMap": false,
    "allowJs": true,
    "outDir": "dist/",
    "typeRoots": [
      "./node_modules/@types/"
    ],
    "moduleResolution": "node"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

直接在项目根目录执行 `tsc`, 项目编译完全完全没有问题. 但是执行项目` node dist/server.js` 的时候,发现了这样的问题.

由于很多第三方库,并不支持Js Module 的规范, 没有导出 `default` 对象, 所以编译出的代码使用defualt的方法会报错.

第三方库我们无法修改,那就修改我们导入的方式, 修改如下.

From:
 
```JavaScript
import mongoose from 'mongoose'
```
To:

```JavaScript
import * as mongoose from 'mongoose'
```

批量文件的修改就借助`sed`配合`-i`选项就地修改好了所与应用的方式. 还有几处类似 `import chai, {expect} from 'chai'` 的特殊情况为数不多就手动修改了. 这里必须吐槽下 Mac 自带的 sed, 和 gnu-sed 完全是两个世界的东西, 完成上面的编辑的命令组合是这样, 你认识吗? 

```bash
find src -name *.js | \
 xargs -n1 -I{}  \
 sed -i bak  -E  \
 "s/import[[:blank:]]+([[:alnum:]]+)[[:blank:]]+from[[:blank:]]+('[a-zA-z0-9-]+')/import * as \1 from \2/g" {}
```
所以强烈建议自己[手动安装下gnu-sed](http://stackoverflow.com/questions/30003570/how-to-use-gnu-sed-on-mac-os-x)


## 执行测试

因为 Mac sed 捣乱,浪费了不少时间, 但总算项目能执行起来了. 但是作为一位 TDD 的爱好者怎么能允许测试不能执行呢. 虽然直接`dist` 目录中执行对应测试代码是一种方式. 但是如果测试报错行号会有一定的偏移, debug 起来不爽. 所以打算通过 `node` 的 `register`机制, 直接在 `mocha` 中执行测试用例.

这里利用了 [`ts-node`](https://github.com/TypeStrong/ts-node)来作为`ts`文件的 compiler.

按照README文档配置了mocha选项

```
mocha --compilers ts:ts-node/register,tsx:ts-node/register [...args]
```

发现 js 文件一个都没有被 tsc 编译. 看了代码和 [issue](https://github.com/TypeStrong/ts-node/issues/237#issuecomment-268915329), 原来是`ts-node` 的注册生效是要在代码 require 到第一个 ts 或 tsx 文件才会生效. 用`ts-node` 的自己的说法就是采用了 *lazy* 模式. 在我们的使用场景下应该在 mocha 一开始执行就需要注册, 以便 tsc 来编译原来的 js 代码, 所以需要自己写个注册文件配置成非 lazy 模式. 最后我的 mocha 执行的配置 和 boot.js 文件.

```bash
mocha --harmony_default_parameters  \
 --harmony_destructuring  \
 --compilers ts:src/test/boot \
 --recursive src/test/match
```

```js
// src/test/boot.js
require('ts-node').register({})
```

>小明下班晚到家了1分钟, 太太大发雷霆; 小明委屈万分,辩解道:"我就晚到家一分钟,一分钟我能干什么啊?"; 太太含着泪说到:"一分钟能干些什么,你自己心里清楚!", 说完哭得更加大声.


# day2

change ts => js



# 完


