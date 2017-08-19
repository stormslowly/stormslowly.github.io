---
layout: post
title:  "[afterCode] docker 速成班 番外篇: 随机容器名"
date:   2017-08-19 15:50:00
categories:  aftercode docker cheatsheet
---

上一篇 blog 提到使用 docker 启动一个容器如果没有使用`--name`来指定容器名字的话,docker 会自动按照 `形容词_名人名`的形式生成一个.

那这些***名人***是谁呢?

源代码说明一切[/pkg/namesgenerator/names-generator.go#L105]
(https://github.com/moby/moby/blob/b5f68d7ed3a2a9db7bdbfd3bdee42d9d1a7e5423/pkg/namesgenerator/names-generator.go#L105)

>// Docker, starting from 0.7.x, generates names from notable scientists and hackers.

>// Please, for any amazing man that you add to the list, consider adding an equally amazing woman to it, and vice versa.

自 0.7.x docker 用一些著名的科学家和黑客名字来命名容器. 如果有你认为有还没有在这些列表中的话,给 docker 项目提交. 哈哈,想给牛逼项目提交 pr 吗? 又多了一个路子.

现在这个模块里面一共有160个名字,其中也有一些女性的科学家. 通过 grep 搜了下 female 只有6个. 所以刚才的注释也鼓励你提交一些牛逼的女性科学家或者黑客.

每个名人名字前面都会有1句很简单的介绍,然后带上对应的 wiki 的链接. 先翻译几个大家耳熟能详的几个名字吧.

```go

		// Nikola Tesla invented the AC electric system and every gadget ever used by a James Bond villain. https://en.wikipedia.org/wiki/Nikola_Tesla
	   // 特斯拉: 发明了交流电和所有007反派使用的武器
		"tesla",

		// Ken Thompson - co-creator of UNIX and the C programming language - https://en.wikipedia.org/wiki/Ken_Thompson
		// 汤普森:  unix 和 C 的联合创始人.(笔者注: 堪称程序员的祖师爷)
		"thompson",

		// Linus Torvalds invented Linux and Git. https://en.wikipedia.org/wiki/Linus_Torvalds
		// 林纳斯: geek 之神 发明了 linux 和 git
		"torvalds",

		// Alan Turing was a founding father of computer science. https://en.wikipedia.org/wiki/Alan_Turing.
	   // 图灵: 计算机科学之父. (14年的电影: [模仿游戏](https://movie.douban.com/subject/10463953/) 非常值得一看)
		"turing",

```

当然除了人名之外还有93个超有意思的形容词,背好这几个单词赞扬别人的时候就不怕词穷;当然骂别人也一样不怕没词. : p


# 完
希望大家喜欢.