---
layout: post
title:  "[afterCode]用 tailwind 重设计 blog样式"
date:   2017-12-10 10:50:00
categories:  aftercode tailwind redesign
---

# TailWind 是什么

首先 TailWind 只是一个 css 的工具,用来帮助用户构建自定义的 UI 组件. 不同于 Bootstrap
等其他的 UI 工具集; 它并没有内建好的的 UI 组件，只是备件了很多底层的工具类来帮助你统一的构建
自己的 UI 设计. 它背后的思想是, 每个网站都应该有自己的样子,不要两个不同的网站还长的这么像.

> Instead, Tailwind provides highly composable, 
low-level utility classes that make it easy to build complex user interfaces 
***without encouraging any two sites to look the same***.
  

那对于我这种 css 战斗力只有5的渣渣的来说的话, TailWind 提供的工具类,能帮我屏蔽掉很多具体的 css 细节
直接来做自己的 blog 设计. 


### 一个例子

<https://tailwindcss.com/docs/shadows#outer-shadow>

```html
<div class="shadow"></div>
<div class="shadow-md"></div>
<div class="shadow-lg"></div>
```
 
这三个 `shadow*` 相关的话就能帮我方便的实现不同深度的阴影的效果.至于 box-shadow 这些属性值了什么,我就不管了.


# 快速开始

```bash
yarn add  tailwindcss -D
```
安装好 tailwindcss , 在需要工作的目录执行

```bash
npx tailwind init 
```
就生成了一份 tailwind 的配置文件;里面的具体内容暂时不管. 在创建一个 css 文件


```css
/* file src/main.css */
@tailwind preflight;
@tailwind utilities;
/* 从这里开始你的设计吧 */

```




```bash
yarn add gulp gulp-plumber gulp-postcss gulp-uglifycss -D
```




# 完
希望大家喜欢.