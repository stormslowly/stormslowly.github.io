---
layout: post
title:  "[afterCode] 我的3个 git tips"
date:   2017-05-01 10:50:00
categories:  afterCode git tips
---

这不是一篇关于 git 入门的文章,是我个人在使用 git 中觉得比较有用的3个小技巧,分享出来希望对大家有帮助.

# 自动纠错

使用 git 时候会不会经常碰到这样的情况,输错了命令,然后 git 还问你是你是不是这个意思啊?

```bash
$git configu
git: 'configu' is not a git command. See 'git --help'.

Did you mean this?
	config
```

很多情况下 git 都猜对了你们的命令, 为什么不让它在猜对的基础上直接让他执行呢?  如下配置

```bash
git config --global help.autocorrect  10
```
最后的数字表示 多少100ms 后自动纠正执行命令. 看你多信任 git 了, 我自己设置的是 1. 设置为0的话表示不自动纠正.



## 善用 alias

就像使用 shell 的时候你没个十七八个 alias 怎么和别人打招呼,git 也一样; 下面就是我的 alias 配置. 非常推荐 [`st` ,`ci`,`ca`,`co` ], 这些命令在开发的过程中会频繁的用到通过缩写可以节约不少时间; 还有就是这 `lg` 配置到你的 git 中去, 谁用谁知道.

```bash
$ git config --list | grep alias

alias.st=status
alias.ci=commit
alias.co=checkout
alias.dt=difftool
alias.lg=log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen%cr %C(bold blue)<%an>%Creset'
alias.ca=commit -a
alias.gi=grep -i
```
哦, 如何配置 alias

```bash
                                +- alias 的内容
                                |
git config --global alias.ca "commit -a"
                          | 
                          +- alias 的名字
```

这里的 `--global`选项会让这个 alias 在所有 git 项目中使用, 如果你的 home 目录下没有 `.gitconfig`文件的话可能还要自己新建一个; 如果不想全局生效就去掉这个选项.



# 搜索代码


我知道你们都会用 grep, 但如果在一个 node 项目中想搜索代码的时候,需要忽略`node_modules`下的文件; 如果你用了 babel 类似的东西编译过, 还要忽略 `dist`下的 js 文件. 那你可能会对 grep 配置一堆的 `exclude-dir` 的选项.为什么我会知道这么多,因为我也年轻过.

```bash
alias grep="grep --exclude-dir node_modules --exclude-dir .git"
```

显然这个不是一个正确的做法, 其实这些需要 exclude 的文件都是在 项目下通过`.gitignore`知道的一清二楚; 所以 git 内建了一个 grep 命令; 它和 gnu grep 使用完全一致,唯一的区别: 它只会对 git 项目下的内容进行搜索, .gitignore 中的忽略的内容是不算去搜索的. 结合上面的 alias 赶紧配置一个自己称手的 alias 吧

```bash
git grep -i express
```
所有项目下含有 express 的文件就都出现了. 结合 alias 可以配置一个 gi

```
git config --global alias.gi "grep -i"
```



# 完

希望对大家有帮助.