---
layout: post
title:  "[afterCode] webstorm tips 番外 1: 查看测试覆盖率"
date:   2017-03-17 10:50:00
categories:  afterCode webstorm tips
---

### 今日快捷键

```
无
```
----


其实这是一篇无关 tips 的 blog, 只是个人hack了下 webstorm 覆盖率相关的插件, 让 mocha + nyc 产生的 lcov 文件能够在 webstorm 中解析显示覆盖率出来. 

在实际开发中, 个人其实并***不是***很看重`测试覆盖率`这个指标. 原因非常的简单, 这是一个[后置指标](http://wiki.mbalib.com/wiki/%E6%BB%9E%E5%90%8E%E6%8C%87%E6%A0%87). 这个指标是能在代码***写完了***之后才给你一个数字, 如果去针对这个指标是编程的话, 出来的结果很可能会是为了测试而测试, 如果把这个当kpi来用的话更加愚蠢了; 而我认为好的规则(注意我说的是规则(rule),而且不是指标(index))应该是在代码的创作的过程中就给出代码好坏的反馈, 而且是反馈周期越短越好. 其实我想说的这个规则就是 TDD  :p

还是说回覆盖率吧~


# 0x0 

能够在 webstorm 显示任何测试产生的 lcov 文件, 早就在 webstorm 的 [issue](https://youtrack.jetbrains.com/oauth?state=%2Fissue%2FWEB-10303) 中了. 这个[评论](https://youtrack.jetbrains.com/issue/WEB-10303#comment=27-1349843)也给出了如何在webstorm 分析 lcov 的思路. 而我就顺着这个思路尝试下.


# 0x1 假装我们有karma测试

按照这篇[文章](https://www.jetbrains.com/help/webstorm/2016.3/monitoring-code-coverage-for-javascript.html) 配置好 webstorm 需要的 karma 和 karma-coverage.  配置`karma.conf.js` 最重要的时候, 需要写一个空的测试, 并把对应的测试文件放到 karam.conf.js 的 indclued 数组中去,  让 karma 正真跑起来. (如果不做这一步 webstorm 会发现没有测试文件就不会执行测试和对应的覆盖率分析)

还有一点就是,你已经能生产lcov文件了, 惯例是将lcov文件的放在项目的根目录 `coverage/lcov.info` 文件中.


```js
// file: karma.conf.js
...
    // 必须添加一个测试文件
    files: [
      "src/test/karma.js"
    ],
...
```

```js
describe.skip('karma dump test', () => {
  it('dump', () => {
  })
})
```



# 0x2 修改 karma 插件代码

根据自己的 webstorm 版本进入到 webstorm 的插件的目录, 路径会根据自己的版本不同而不同

```
/Applications/WebStorm 2017.1 EAP.app/Contents/plugins/js-karma/js_reporter/karma-intellij/lib
```

编辑文件 `intellijCoverageReporter.js`

改动如下

```diff
--- a/intellijCoverageReporter.js
+++ b/intellijCoverageReporter.js
@@ -195,7 +195,8 @@ function init(emitter, rootConfig) {

       var done = function() {
         findLcovInfoFile(rootConfig.coverageReporter.dir, function(lcovFilePath) {
-          intellijUtil.sendIntellijEvent('coverageFinished', lcovFilePath);
+          intellijUtil.sendIntellijEvent('coverageFinished',
+            path.join(process.cwd(),'coverage/lcov.info'));
         });
       };

```

作用就是用当karma执行完测试后, 分析的lcov文件,是当前项目的 `coverage/lcov.info` 文件.


# 0x3 触发分析 lcov

选择 `Karma` 的执行配置, 执对应的 `with coverage` 选项. 执行成功后, 右侧会出现 coverage 的窗口, 同时项目目录上会出现 coverage 信息.


![coverage window](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/coverage_in_structiure.png)



![coverage window](https://raw.githubusercontent.com/stormslowly/stormslowly.github.io/master/imgs/coverage_in_project.png)


# 完
