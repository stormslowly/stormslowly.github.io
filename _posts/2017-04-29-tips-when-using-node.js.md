---
layout: post
title:  "[简译] 外国大厂对node.js工程师的建议"
date:   2017-04-29 10:50:00
categories:  node.js tips 翻译
---


原视频地址：
<https://www.youtube.com/watch?v=gePCzPTEXSU>

## 你对 node.js 初学者你有什么建议.

![Wyatt](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/wyatt.jpg)

### Wyatt Preul
Joyent 产品工程师

>不要一开始就依赖 npm 上的模块, 尝试自己从头实现一些基本的功能, 直到你真正需要一个模块的时候再引入他;
另外一个建议就是, 在社区保持活跃,参加到当地社区的活动中去; 可以尝试对 node 做一些贡献, 哪怕只是更正 README 或者文档之类的提交.

笔者注: 如果时间充足学习一门语言的最好方法就是造轮子.前提就是时间充足和学习期间

![Wyatt](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/pratrick.jpg)
### Patrick Ritchie
HomeAway 高级软件经理

>找一个切入点, 让 node 帮助你迅速的开展业务,展现出他的价值. 然后寻找更加完善和强大的 node 的程序来支撑你的业务. node 和其他的软件还是有很多大的区别的. 所以你需要一个完整的程序来实现你的商业目标.


![Wyatt](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/steven.jpg)

###Steven Faulkner
Bustle 工程总监
> 刚开始学习 node 的时候多看看你使用模块的代码,研究它背后的工作原理; node 界也有很多多产的开发者, 他们开发了很多不同类型的模块, 多读读他们的代码以理解他们背后的思想.

几年前的 npm top contributor 列表: <https://gist.github.com/michalbe/71f6f9e5938eeb781dc4> 可惜了 TJ 大神已经暂别 node 圈了.


## node.js 的实践方面的建议
所谓的最佳实践


![charlie.jpg](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/charlie.jpg)
### Charlie Robbins
GoDaddy 技术总监

> 1. 使用私有的 NPM 库
2. 如果你第一条没有做到, 那换一条建议就是不要把 `node_modules` 提交到版本管理里面, 不会有好结果的
3. 在 package.json 中使用 git URL 最终也会带来麻烦, 虽然这样做在没有私有 npm 时的能帮你解决一些问题.

译者注: 总之就是一句话: 是要用 私有npm;

可以参考 cnpm 的解决方案
<https://github.com/cnpm/cnpmjs.org/wiki/Deploy-a-private-npm-registry-in-5-minutes>


![Paul](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/paul.jpg)
## Paul Milham

WildwWorks 工程师

>1. 在可能出现异常的地方正确的处理异常
2. 当你的应用处于一个未知状态的时候,毫不留情的重启你的服务进程
3. 一定要有测试;在你提交代码后有自动化执行的测试.
4. js 是动态类型的语言, 所以一定要有严格的数据检查;确保进入你的应用的数据是你期望的, 特别是在 API 层面

译者注: 第二条可能很多人不能接受, 要让你的服务进程能够随时重启对系统的架构能力最基本的考验.当然第三条也很重要, 很难想想一个复杂的系统没有测试,没有自动化测试要怎么维护.



![James](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/james.jpg)
### James Hush

Netflix 软件工程师

> 当你在生产环境下开始一个新项目的时候, 一定要锁定依赖关系; 不要在 package.json 出现 "^","~"; 直接锁定依赖关系.

译者注: 我个人强烈推荐使用 ***yarn** , 如果你对 yarn 不是很喜欢的话,那就在项目的根目录下创建 `.npmrc` 文件, 写入 `save-exact = true`

> 如果你要升级 node.js 版本. 一定要先让你团队的人知道你升级了 node.js 的本版; 如果有人在你升级 node.js 版本后不能运行程序. `rm -rf node_modules` 然后 `npm i`, 90% 能解决你的问题.

译者注: node.js 发展太快了, 如果项目激进的话直接用最新的版本好了. 保守的跟紧 TLS.


![Patrick](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/pratrick.jpg)
### Patrick Ritchie
HomeAway 高级软件经理

> JVM 的线程机制可以让你压榨完系统的所有资源来一定接受新的连接; 但是 node 只有已经一个进程和有限的内存资源.

译者注: 那就是学会用 cluster 和学习微服务架构

## 最后的建议

(白云: 就剩一句话了啊?)


![Sarah](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/sarah.jpg)

### Sarah Saltrick Meyer

buzzfeed 程序媛

>node的发展和互联网变化一样迅速, 同样它也和互联网一样慢慢的变好. 你不可能花上6年时间出现等一个新的语言出现, 然后把之前的工作抛到脑后.


译者注: 她的意思是不是 node.js 虽然现在不是很完善,但是发展的越来越好,应该顺势而为. 因为没有采访的上下文,我也不知道她为什么要说 __6年__ 时间.


![Paul](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/tips/paul.jpg)
### Paul Milham

WildwWorks


> 我鼓励大家去接受 JavaScript. js 是一门很棒的语言, 可以使用在各个领域. js 作为一个门动态的类型的语言出现在你视野时候, 你需要一些态度上的转变, 有些开发者甚至对动态类型还有一些偏见. 其实动态的特性让会让代码变得更加的的简洁和易读, 但是首先还是你得接受她, 拥抱她; 而不是通过一些编译到 js 的语言来绕开 js.

哈哈,个人感觉没有掌握 js 去使用类似 ts 的语言的话确实造成一些问题. 至于 dart 之类我没有用过也不能发表什么.


#完


希望对大家有帮助.