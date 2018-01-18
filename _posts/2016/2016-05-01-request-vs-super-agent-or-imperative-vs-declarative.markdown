---
layout: post
title:  "[afterCode] 为什么我们选择了superagent 而不是 request"
date:   2016-05-01 08:50:00
categories:  afterCode node.js request superagent
---

开始了新的创业项目,作为项目的技术负责人和小伙伴们选择`modules`的时候,在使用[`request`](https://github.com/request/request) 还是 [`superagent`](https://github.com/visionmedia/superagent) 问题上展开了讨论.

request库目前已经10k多的star,而superagent 是7k多. 但是在这个问题上,我还是倾向于使用superagent, request依赖于`opts`参数来告诉request 如何发起这次请求,但是superagnet 通过 对象的方法来描述这个是一个什么样的请求. 虽然两个库都朝着语义化的方向前进,但是明显superagent做的更好一些.

讨论这个问题的时候更像是之前大家对`grunt`和`gulp`的比较.事实证明`gulp`这种更加语义话的描述任务的方式,更被大家所接受,而grunt这种基于配置的方式逐渐淡出历史舞台.

最后项目选择了`superagent`作为了我们的请求库,结合上`co`写起来轻便了很多.少写一些代码就离成功近了一些.

**do more with less !**


