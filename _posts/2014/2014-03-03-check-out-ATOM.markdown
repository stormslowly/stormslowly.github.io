---
layout: post
title:  "[翻译]Atom 来了!"
date:   2014-03-03 12:50:12
categories: editor
---
原文地址:[http://code.tutsplus.com/tutorials/check-out-atom-githubs-new-development-editor--net-37030](http://code.tutsplus.com/tutorials/check-out-atom-githubs-new-development-editor--net-37030)


最近似乎没有什么新的编辑器出现让人耳目一新的。最近一次在web开发社区掀起热潮的应该就是Sublime Text，以及它方便的包管理工具Package Control了。

嗯,不过Github似乎是想要通过Atom来改变下编辑器软件的平静的现状。目前笔者用的是Beta版Atom，本文也只会给出对Atom做大概的一个介绍。还有要注意的就是，目前Atom的文档也还不完善，有些feature最后会是怎么还不能确定，所以本文也只是讲一些重要的功能

##21世纪geek编辑器

首先笔者要强调的是目前Atom只是一个beta版本，以后到底会有多少功能保留或者加入谁都说不准。比如我现在还没找到一个基于目录创建项目的方法，而且也很想要这个功能。但是目前作为beta版本的ATOM还是让我很满意的。

接下来要说的是，ATOM是完全基于web技术实现的。底层的架构是基于Chromium(是的就是google的Chrome的Chromium)，所有的窗口都是一个本地渲染的网页。有人会问，为什么不直接像Cloud9IDE做一个基于浏览器的编辑器呢？虽然目前来看浏览器文件操作相关的API有了一定的发展，但是仍然有很多的限制。所以采用桌面应用程序的方式还是有必要的。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-developer-tools.png)

是的，你没看错，在Atom中调用Chromium开发工具，我还选中了一个DOM元素，更诡异的事是，还能在Chromium开发工具里面修改代码。这也印证了ATOM是基于Web的。

ATOM还采用了node.js来访问文件系统和包管理。这样就让Atom的包管理具有很强的灵活性和可扩展性。面对浩如烟好的npm资源，ATOM的可配置型也变得异常突出。

最后这句话可能最能说明Atom团队为什么要采用Web技术。
>整个计算机产业都在给力的推动web技术发展，所以我们很有信心将Atom植根于这片的肥沃的土壤中。原生UI技术起起落落，而web技术在每年的变化中变得越来越可靠和普遍。我们很高兴我们能在web技术领域继续深入。


初见Atom，估计肯定会觉得它是sublime text的堂兄弟，Sublime中外貌协会的同学估计会对他一见倾心。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-full.png)

当然，程序员第一要关心还是是支持的语言。笔者虽然目前主要工作在javascript上，但是也很想尝试下ruby on rails，所以能支持的语言越多好。Atom不仅支持Ruby的语法高亮，还支持RoR，还有:

* Python
* CoffeeScript
* Go
* Sass
* YAML

等等

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-languages.png)


Atom不仅仅支持语法高亮，还有对应语法的Snippet。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-js.png)

以上面的Javascript举个例子，在编辑器里面输入``ife``然后再按``tab``键，``ife``就能扩展为

```
if (true) {

} else {

}
```

输入``f``然后``tab``,就会展开成一个匿名函数的定义

```
function () {
}
```

类似的功能TextExpander和其他一些编辑器也有，很高兴Github加入了这个功能。

##轻松可配置
Sublime text(包括V3)都很让我抓狂的一件事情就是需要手动调整很多配置(译者：而且是一个配置文件形式配置非常不直观)。在Atom里面就，将所有的配置信息放在一个面板里面，主要的配置项

* 字体、大小
* 行号
* 主题
* 包管理

还在能配置页中激活或者禁用一个包。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-settings.png)

个性化编辑器是每个码农都要干的事情，给每日相对的编辑器选一个自己喜欢的主题就非常的重要。Atom自带5个主题，亮暗都有；而且通过包管理你扩展你选择。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-themes.png)

看到"Monokai"，是不是很开心啊！

还记不记得我刚才提过能在Atom里面使用chromium的开发者工具，Atom的每个页面都是一个本地渲染的网页。嘿嘿，那就好了，你有超多的方法来改变页面中外观，在开发者工具里面能查看页面中的DOM元素的样式。通过修改``styles.less``来定义自己的样式，这样你就控制每类元素的展现方式。要修改``styles.lee``也非常简单，*Atom->Open Your Stylesheet*，然后编辑就行了。

```
.editor {
  .meta.tag.sgml.doctype.html { font-size: 26px; }
}
```

这个例子里面，笔者将.editor类下的``DOCTYPE``的字体设置为``26px``，
那实际页面看起来是这样的。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-less.png)

通过修改样式文件就能更加随意的修改编辑器的样子了。

Atom中的包管理工具除了能够安装主题之外，还能安装插件来扩展Atom。这个和sublime中的 package control很像，但是Atom是直接自带了一个包管理工具，不需要像Sublime Text一样用个脚本来安装。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-packages.png)

点击*安装*按钮，Atom就提供了一些'精选'的插件，通过输入框还能到包管理中心搜索你想要的包。


```
apm install <package name>
```
如果你喜欢命令行，那就试试apm(*A*tom *P*ackage *M*anager)。下面是安装autocomplete的例子

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-apm-install.png)

目前的话，Atom中的扩展包数量还[非常有限](https://atom.io/packages)

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-packages-registry.png)

但一些必要的包还是能找到的,比如

* [.md的预览 Previewing Markdown](https://atom.io/packages/markdown-preview)
* [行跳转 Going to a specific line](https://atom.io/packages/go-to-line)
* [自动保存 AutoSave](https://atom.io/packages/autosave)

我想Github很快就让很多Sublime text包的作者将自己开发的包移植到Atom中。而且现在已经有[文档](https://atom.io/docs/v0.60.0/converting-a-text-mate-bundle)说能将TextMate的bundle移植到Atom中。而Textmate的bundle和Sublime是兼容的，所以估计sublime的包也能很方便的一直到Atom中。不过别太当真，因为笔者还没测试过呢。

不过现在也给社区做[贡献](https://atom.io/docs/v0.60.0/contributing)的好时机，[为社区提供一些新的插件](https://atom.io/docs/v0.60.0/creating-a-package)。目前Atom已经有了大部分基础功能的包，目前还缺少一些重磅的功能，比如Linter和语法高亮。不过我相信这些空缺马上就会被填补的。

Atom的快捷键配置文件是在``~/.atom/keymap.cson``，你也可以通过菜单找到*Atom > Open Your Keymap*，这个配置文件还有些例子来指导你如何设置快捷键。

唯一一个你需要记住的快捷键就是*Command-Shift-P*，这个快捷键会弹出窗口里面包含着所有可用的快捷键，还能模糊搜索。

![](https://cdn.tutsplus.com/net/uploads/2014/02/atom-command-palette.png)

Atom官网的[入门指导](https://atom.io/docs/v0.60.0/getting-started)提供了很多有用的信息，非常值得一读。由于目前Atom项目文档还是很少，对Atom的了解你还是要通过反复采坑来学到。


##比较
很多人肯定会问Atom和Sublime比到底如何？说实话Sublime目前还是我最爱编辑器，Atom也是款很不错的Beta测试产品。但是目前还是不愿意切换。Sublime的内建的功能加上目前繁荣的扩展生态，对我来说是一个很成熟的编辑器。

但是话说回来，Atom有Github这个黄金招牌在绝对是很有分量的。铁打的Geek气息，尤其基于Chromium和Node.js所带来的扩展性，Atom的插件包肯定会有长足的发展的。

目前，Github将Beta版的Atom免费提供给码农们捣鼓。如果以后Atom采用合理的价格策略，并且插件的生态圈能快速的发展起来的话，我最终还是会选择Atom的。

---
## 捐赠
如果您觉得本文对您有帮助，欢迎请译者一杯咖啡

[![捐赠EventProxy](https://img.alipay.com/sys/personalprod/style/mc/btn-index.png)](https://me.alipay.com/shupengfei)
