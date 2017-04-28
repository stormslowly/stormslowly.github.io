---
layout: post
title:  "[简译] Typescript 2.3 发布"
date:   2017-04-28 10:50:00
categories:  typescript
---


原文地址：
<https://blogs.msdn.microsoft.com/typescript/017/04/27/announcing-typescript-2-3/>

Typescript: 简单点说就是一个 JavaScript 的超集，这个超集合里面带上了一些可配置的类型检查。 使用Typescript 可以在 JavaScript 的动态特性和类型检查中间找到一个平衡来提高开发工作效率。（之后Typescript 简写为 ts）


开始使用 ts 很方便，直接用 npm 或者 windows 下的 NuGet 就可以了

```
npm install -g typescript
```

在编辑支持方面 Visual Stuido 系列通过升级包就能支持最新 ts 版本，毕竟微软自己的产品嘛；其他编辑器如 visual studio code 和 sublime text 对有对应的插件。(我个人推荐使用 webstorm)

下面介绍2.3的一些新特性


### 增加 JavaScript 的 _检查_ 支持

为了让用用户能从 js 到 ts 平滑过渡，原先能通过 `--allowJs` 来支持 ts 和 js 文件的混合在一起编译，对js部分是完全不做类型检查的。 ts 2.3 可以通过两种方式来实现对混合在一起的 js 文件一起做类型检查，但这个检查应该不会很严格（原文是说 a new “soft” form of checking）

第一种方法是在 js 文件头上打上 `// @ts-check`

```JavaScript
// @ts-check

/**
 * @param {string} input
*/
function foo ( input ) {
  input.tolowercase ()
       // ~~~~~~~~~~~ Error!  Should be toLowerCase
} 
```

这个例子就是中 ts 就从 jsdoc 知道参数是 string 类型，所以 ts 就会发现 tolowercase 是调用了一个不存在函数。

第二种方法就是通过配置 `tsconfig.json`

```
  {
     " compilerOptions " : {
         " target " : " es5 " ,
         " module " : " commonjs " ,
         " allowJs " : true ,
         " checkJs " : true ,  //  <==== 看这里
         " outDir " : " ./lib "
     },
     " include " : [
         " ./src/**/* "
     ]
 }

```

增加了 `allowJs:true`

有了这些配置之后, 通过 .d.ts 文件, 你就能在 js 文件中享受各种方便的代码补全功能

如果想针对个别文件和代码行关闭 ts 的检查,可以使用下面的注释

* 忽略此文件检查 // @ts-nocheck
* 忽略该行 // @ts-ignore 

此外要注意的一点是 ts 只是做了类型检查, 你的那些 ESLint 的工具还是应该保留的, 毕竟每个工具的强项不同, 所以让各个工具各司其职.

### 开放插件机制

为了提高用户在使用 ts 的过程中更加的流畅和省心. ts 团队提供了插件接口来加强其他语言编辑时候的体验.
这里举例了

* angular 的模板支持 <https://marketplace.visualstudio.com/items?itemName=Angular.ng-template>
* GraphQL 的支持 <https://github.com/Quramy/ts-graphql-plugin>
* Vue 的模板支持 <https://github.com/octref/vetur/>


如果想学习插件的开发, 参考这个链接
<https://github.com/RyanCavanaugh/sample-ts-plugin>


### 默认参数类型

这里通过了 react component 的泛型定义来举例

```JavaScript
class Component<P, S> {
    // ...
}
```
一个 react 组件会接受一组属性它的类型是P, 还有一组状态描述它的类型是 S. 

但是有时候我们写的组件都是无状态的, 所以要通过显示告诉给 ts 编译器状态的类型是 `object` 或者 `{}`

```
class FooComponent extends React.Component<FooProps, object> {
    // ...
}
```

2.3 之后对类型也做默认值, 那组件的定义可以变成

```
class Component<P, S = object> {
    // ...
}
```
甚至直接写 `Component<FooProps>`, 等效于  Component<FooProps, object>

类型的默认值并不需要和类型完全一致,只要他可以配置给此类型的变量就行了, 换句话说: 默认值只要是该类型的子集即可.


### Generator 和 async generator 的支持

详细见文章 <https://blogs.msdn.microsoft.com/typescript/2017/04/10/announcing-typescript-2-3-rc/>

这个特性我用的不多, 担心说错自己看原文吧


### 更加方便setup和更加严格的严格机制

原先的 `tsc --init` 只会在 tsconfig.json 文件中生成基本的配置信息, 当自己需要一些特殊配置信息的时候就需要查文档. 现在通过 `tsc --init --all` 就能在配置中把所有配置都打开, 并且有对应的注释帮助你决定时候使用该选项.

```
{
  "compilerOptions": {
    /*  Basic  Options */
    "target": "es5",              /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",         /* Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    // "lib": [],                 /* Specify library files to be included in the compilation:  */
    // "allowJs": true,           /* Allow javascript files to be compiled. */
    // "checkJs": true,           /* Report errors in .js files. */
    // "jsx": "preserve",         /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,       /* Generates corresponding '.d.ts' file. */
    // "sourceMap": true,         /* Generates corresponding '.map' file. */
    // ...
  }
}
```


增加了 `--strict` 选项一键打开下面所有的选项

* `--noImplicitAny`
* `--strictNullChecks`
* `--noImplicitThis`
* `--alwaysStrict` 在所有文件中打开 JavaScript 的严格模式

打开 `--strict` 模式的是 ts 团队认为能够帮助你调整到 ts 的最优使用体验(但是代价就是要严格定义所有的使用类型). 新版的 tsc --init 出来的 tsconfig 文件就是默认打开 `--strict` 的

# 完

祝大家 happy hacking !