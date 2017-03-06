---
layout: post
title:  "[翻译] mongodb+express noSQL 注入"
date:   2017-03-04 11:50:00
categories:  afterCode nosql injection
---

<iframe height="500" width="100%" src="http://player.youku.com/embed/XMjU5NjEwNzM0MA==" frameborder="0" allowfullscreen="allowfullscreen"></iframe>


以前一直有印象 mongodb 的查询不同于 sql 的查询,因为没有字符串拼接不会出现类似 sql 注入的问题. 但是这个视频一个简单的例子就给出了 noSQL 环境下的注入的思路.

那其实作为一个web开发者, "永远不相信用户的输入"就应该作为自己的座右铭.

视频中提及的两个库的链接如下

* Joi <https://github.com/hapijs/joi>
* Celebrate <https://github.com/continuationlabs/celebrate>


# 完
