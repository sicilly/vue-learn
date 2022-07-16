### 文章目录

- [Vue 基础入门](#Vue__1)
- - [一、Vue 简介](#Vue__3)
  - - [1. 什么是 vue](#1__vue_5)
    - - [1.1 解读核心关键词：构建用户界面](#11__14)
      - [1.2 构建用户界面的传统方式](#12__21)
      - [1.3 使用 vue 构建用户界面](#13__vue__28)
      - [1.4 解读核心关键词：框架](#14__35)
      - [1.5 总结：什么是 vue](#15__vue_53)
    - [2. vue 的特性](#2_vue__62)
    - - [2.1 数据驱动视图](#21__69)
      - [2.2 双向数据绑定](#22__80)
      - [2.3 MVVM](#23_MVVM_89)
      - [2.4 MVVM 的工作原理](#24_MVVM__102)
    - [3. vue 的版本](#3_vue__112)
    - - [3.1 vue3.x 和 vue2.x 版本的对比](#31_vue3x__vue2x__123)
  - [二、Vue 的基本使用](#Vue__135)
  - - [1. 导入 Vue 的多种方式](#1__Vue__139)
    - - [1.1 CDN引入](#11_CDN_149)
      - [1.2 下载和引入](#12__165)
    - [2. 基本使用步骤](#2__176)
    - [3. 声明式和命令式](#3__203)
  - [三、Vue 的调试工具](#Vue__216)
  - - [1. 安装 vue-devtools 调试工具](#1__vuedevtools__218)
    - [2. 配置 Chrome 中的 vue-devtools](#2__Chrome__vuedevtools_232)
  - [四、Vue 的指令与过滤器](#Vue__241)
  - - [1. 指令的概念](#1__243)
    - - [1.1 内容渲染指令](#11__258)
      - - [v-text](#vtext_262)
        - [Mustache语法](#Mustache_277)
        - [v-html](#vhtml_291)
        - [v-once](#vonce_316)
        - [v-pre](#vpre_342)
        - [v-cloak](#vcloak_352)
      - [1.2 属性绑定指令](#12__372)
      - - [使用 Javascript 表达式](#_Javascript__403)
      - [1.3 事件绑定指令](#13__429)
      - - [绑定事件并传参](#_469)
        - [事件参数对象](#_489)
        - [事件修饰符](#_520)
        - [按键修饰符](#_541)
      - [1.4 双向绑定指令](#14__563)
      - - [v-model 指令的修饰符](#vmodel__584)
      - [1.5 条件渲染指令](#15__597)
      - - [v-if 和 v-show 的区别](#vif__vshow__612)
        - [v-else、v-else-if](#velsevelseif_626)
      - [1.6 列表渲染指令](#16__641)
      - - [使用 key 维护列表的状态](#_key__666)
        - [key 的注意事项](#key__683)
    - [2. 过滤器（vue3删除）](#2_vue3_693)
    - - [2.1 私有和全局过滤器](#21__714)
      - [2.2 连续调用多个过滤器](#22__727)
      - [2.3 过滤器的兼容性](#23__763)
  - [五、品牌列表案例（vue2编写）](#vue2_773)
  - - [1. 案例效果及知识点](#1__775)
    - [2. 整体实现步骤规划](#2__787)
    - - [2.1 创建基本的 vue 实例](#21__vue__797)
      - [2.2 基于 vue 渲染表格数据](#22__vue__825)
      - [2.3 添加品牌](#23__887)
      - [2.4 删除品牌](#24__938)
  - [总结](#_957)



# Vue 基础入门

## 一、Vue 简介

### 1. 什么是 vue

官方给出的概念：Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的**渐进式框架**。

**渐进式框架**：Vue 不强求你一次性接受并使用它的全部功能特性，我们可以在项目中一点点来引入和使用 Vue，而不是用 Vue 的一个小功能，就必须用 Vue 来开发整个项目。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-9p06Y0Ba-1637408112550)(image/image-20211008105300139.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229806.png)

#### 1.1 解读核心关键词：构建用户界面

[前端开发](https://so.csdn.net/so/search?q=前端开发&spm=1001.2101.3001.7020)者最主要的工作，就是为网站的使用者（又称为：网站的用户）构建出**美观、舒适、好用**的网页。

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229115.png)

#### 1.2 构建用户界面的传统方式

在传统的 Web 前端开发中，是基于 jQuery + 模板引擎的方式来构建用户界面的。

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229152.png)

#### 1.3 使用 vue 构建用户界面

使用 vue 构建用户界面，解决了 jQuery + 模板引擎 的诸多痛点，极大的提高了前端开发的效率和体验。

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229100.png)

#### 1.4 解读核心关键词：[框架](https://so.csdn.net/so/search?q=框架&spm=1001.2101.3001.7020)

官方给 vue 的定位是前端框架，因为它提供了**构建用户界面的一整套解决方案**（俗称 Vue 全家桶）：

- vue（核心库）
- vue-router（路由方案）
- vuex（状态管理方案）
- vue 组件库（快速搭建页面 UI 效果的方案）

以及**辅助 vue 项目**开发的一系列工具：

- vue-cli（npm 全局包：一键生成工程化的 vue 项目 - 基于 webpack、大而全）
- vite（npm 全局包：一键生成工程化的 vue 项目 - 小而巧）
- vue-devtools（浏览器插件：辅助调试的工具）
- vetur、volar（vscode 插件：提供语法高亮和智能提示）

#### 1.5 总结：什么是 vue

vue 是一套用于构建用户界面的前端框架。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-tGNeEnvC-1637408112553)(image/image-20211008113407773.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229151.png)



### 2. vue 的特性

vue 框架的特性，主要体现在如下两方面：

- 数据驱动视图
- 双向数据绑定

#### 2.1 数据驱动视图

在使用了 vue 的页面中，vue 会**监听数据的变化**，从而**自动重新渲染页面**的结构。示意图如下：

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-4KDwVuFk-1637408112556)(image/image-20211008113546929.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229149.png)

好处：当页面数据发生变化时，页面会自动重新渲染！

注意：数据驱动视图是**单向的数据绑定**。

#### 2.2 双向数据绑定

在填写表单时，双向数据绑定可以辅助开发者在**不操作 DOM 的前提下**，**自动**把用户填写的内容同步到数据源中。示意图如下：

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-9Rem0dqy-1637408112559)(image/image-20211008114925186.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229733.png)

好处：开发者不再需要手动操作 DOM 元素，来获取表单元素最新的值！

#### 2.3 MVVM

Vue官方其实有说明，Vue虽然并没有完全遵守MVVM的模型，但是整个设计是受到它的启发的。

MVVM 是 vue 实现数据驱动视图和双向数据绑定的核心原理。它把每个 HTML 页面都拆分成了如下三个部分：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229541.png)
在 MVVM 概念中：

- Model 表示当前页面渲染时所依赖的数据源。
- View 表示当前页面所渲染的 DOM 结构。
- ViewModel 表示 vue 的实例，它是 MVVM 的核心。

#### 2.4 MVVM 的工作原理

ViewModel 作为 MVVM 的核心，是它把当前页面的**数据源**（Model）和**页面的结构**（View）连接在了一起。
![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-feKEMz5C-1637408112562)(image/image-20211008150138124.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229659.png)
当**数据源发生变化**时，会被 ViewModel 监听到，VM 会根据最新的数据源**自动更新**页面的结构

当**表单元素的值发生变化**时，也会被 VM 监听到，VM 会把变化过后最新的值**自动同步**到 Model 数据源中



### 3. vue 的版本

当前，vue 共有 3 个大版本，其中：

- 2.x 版本的 vue 是目前企业级项目开发中的主流版本
- 3.x 版本的 vue 于 2020-09-19 发布，生态还不完善，尚未在企业级项目开发中普及和推广
- 1.x 版本的 vue 几乎被淘汰，不再建议学习与使用

总结：3.x 版本的 vue 是未来企业级项目开发的趋势，2.x 版本的 vue 在未来（1 ~ 2年内）会被逐渐淘汰；

#### 3.1 vue3.x 和 vue2.x 版本的对比

vue2.x 中**绝大多数的 API 与特性**，在 vue3.x 中同样支持。同时，vue3.x 中还新增了 3.x 所特有的功能、并废弃了某些 2.x 中的**旧功能**：

新增的功能例如：组合式 API、多根节点组件、更好的 TypeScript 支持等

废弃的旧功能如下：过滤器、不再支持 on，off 和 $once 实例方法等

详细的变更信息，请参考官方文档给出的迁移指南：https://v3.cn.vuejs.org/guide/migration/introduction.html



## 二、Vue 的基本使用

Vue 就是一个 JavaScript 的库：我们不要把它想象的非常复杂，我们就把它理解成一个已经帮助我们封装好的库，在项目中可以引入并且使用它即可。

### 1. 导入 Vue 的多种方式

那么安装和使用Vue这个JavaScript库有哪些方式呢？官网给出了五种：https://v3.cn.vuejs.org/guide/installation.html，先学习 CDN 和下载并自托管两种。

1. 在页面中通过 CDN 的方式来引入
2. 下载 Vue 的 JavaScript 文件，并且自己手动引入
3. 通过 npm 包管理工具安装，它可以和 [webpack](https://webpack.js.org/) 或 [Rollup](https://rollupjs.org/) 模块打包器配合使用。
4. 通过官方提供的 [Vue CLI](https://github.com/vuejs/vue-cli) 创建项目。
5. 使用 [Vite](https://github.com/vitejs/vite) 创建项目，它可以实现闪电般的启动。

#### 1.1 CDN引入

CDN 称之为内容分发网络（Content Delivery Network，缩写：CDN）

- 它是指通过相互连接的网络系统，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。
- 常用的CDN服务器可以大致分为两种：
  - 自己的CDN服务器：需要购买自己的CDN服务器，目前阿里、腾讯、Google等都可以购买CDN服务器
  - 开源的CDN服务器：国际上使用比较多的是unpkg、JSDelivr、cdnj

Vue的CDN引入：

```html
<script src="https://unpkg.com/vue@next"></script>
```

#### 1.2 下载和引入

- 打开 [unpkg](https://unpkg.com/browse/vue@next/dist/) 链接，找到 vue.global.js 文件，打开然后复制所有代码
- 在自己项目中创建一个文件比如：vue.js，将代码复制到其中，然后通过 script 标签引入刚才的文件

```html
<script src="../js/vue.js"></script>
```



### 2. 基本使用步骤

1. 导入 vue.js 的 script 脚本文件
2. 在页面中声明一个将要被 vue 所控制的 DOM 区域
3. 创建 vm 实例对象（vue 实例对象）

```html
<!-- 4. 声明要被 vue 所控制的 DOM 区域 -->
<div id="app">{{username}}</div>

<!-- 1. 导入 vue 的脚本文件 -->
<script src="https://unpkg.com/vue@next"></script>
<script>
  // 2. 声明 data 数据源对象
  const Counter = {
    data() {
      return { username: 'zs' }
    }
  }

  // 3. 创建 vue 的实例对象，使用 mount 表示 vue 要控制的区域
  Vue.createApp(Counter).mount('#app')
</script>
```



### 3. 声明式和命令式

- 原生开发和 Vue 开发的模式和特点，是完全不同的，这里其实涉及到两种不同的编程范式：
  - 命令式编程：关注 how to do，即一步一步告诉计算机先做什么再做什么
  - 声明式编程：关注 what to do，即应该做什么但不指定具体要怎么做，而是由框架完成 how 的过程
- 在原生的实现过程中，我们是如何操作的呢？
  - 我们每完成一个操作，都需要通过JavaScript编写一条代码，来给浏览器一个指令，这样的编写代码的过程，我们称之为命令式编程，早期的原生 JS 和 JQ 开发，都是通过这种命令式在编写代码
- 在 Vue 的实现过程中，我们是如何操作的呢？
  - 在 createApp 传入的对象中声明需要的内容，template（模板）、data（数据）、methods（方法）
  - 这样的编写代码的过程，就是声明式编程，目前Vue、React、Angular的编程模式，都为声明式编程



## 三、Vue 的调试工具

### 1. 安装 vue-devtools 调试工具

vue 官方提供的 vue-devtools 调试工具，能够方便开发者对 vue 项目进行调试与开发。只要在浏览器中访问一个使用了 vue 的页面，F12 打开浏览器的开发者工具，切换到 Vue 面板，即可使用 vue-devtools 调试当前的页面。

Chrome 浏览器在线安装 vue-devtools ：

vue 2.x 调试工具：https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

vue 3.x 调试工具：https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg

注意：vue2 和 vue3 的浏览器调试工具不能交叉使用！详细参考：[官方文档](https://devtools.vuejs.org/guide/installation.html)

### 2. 配置 Chrome 中的 vue-devtools

打开网址：chrome://extensions/，找到 Vue.js devtools 点击左下角详细，并勾选如下的两个选项：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229678.png)



## 四、Vue 的指令与过滤器

### 1. 指令的概念

指令（Directives）是 vue 为开发者提供的模板语法，用于**辅助开发者渲染页面的基本结构**。

指令是 vue 开发中最基础、最常用、最简单的知识点，vue 中的指令**按照不同的用途**可以分为如下 6 大类：[官网参考地址](https://v3.cn.vuejs.org/api/directives.html)

- **内容渲染**指令
- **属性绑定**指令
- **事件绑定**指令
- **双向绑定**指令
- **条件渲染**指令
- **列表渲染**指令



#### 1.1 内容渲染指令

内容渲染指令用来辅助开发者**渲染 DOM 元素的文本内容**。

##### v-text

```html
<!--把 username 对应的值，渲染到下面 p 标签中-->
<p v-text="username"></p>

<!--把 gender 对应的值，渲染到下面 p 标签中-->
<!--注意：p 标签中默认的文本 “性别” 会被 gender 的值覆盖掉-->
<p v-text="gender">性别</p>
```

注意：v-text 指令会覆盖元素内默认的值。



##### Mustache语法

vue 提供的 {{ }} 语法，专门用来解决 v-text 会覆盖默认文本内容的问题。这种 {{ }} 语法的专业名称是插值表达式（英文名为：Mustache）。

```html
<!--使用 {{}} （插值表达式），将对应的值渲染到元素内容节点中-->
<p>姓名：{{username}}</p>
<p>性别：{{gender}}</p>
```

注意：相对于 v-text 指令来说，插值表达式在开发中更常用一些！因为它**不会覆盖**元素中默认的文本内容。



##### v-html

v-text 指令和插值表达式只能渲染纯文本内容。如果要把包含 HTML 标签的字符串渲染为页面的 HTML 元素，则需要用到 v-html 这个指令：

```html
<div id="app">
  <p v-text="desc"></p>
  <p>{{desc}}</p>
  <!--上面两种均不能达到我们想要的效果，而 v-html 就可以-->
  <p v-html="desc"></p>
</div>
<script src="https://unpkg.com/vue@next"></script>
<script>
  const Counter = {
    data() {
      return { desc: '<h1 style="color:red;">abc<h1>' }
    }
  }

  Vue.createApp(Counter).mount('#app')
</script>
```

最终渲染的结果为：
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229513.png)

##### v-once

只渲染元素和组件**一次**。当数据发生改变时，元素或组件及其所有的子节点将被视为静态内容并跳过。可以用于性能优化。

```html
<div id="app">
  <h2>{{counter}}</h2>
  <!-- 被 v-once 修饰的 DOM 元素，里面的 counter 数量不会发生变化 -->
  <div v-once>
    <h2>{{counter}}</h2>
    <button @click="counter ++">+1</button>
  </div>
</div>

<script>
  const App = {
    data() {
      return { counter: 100 }
    }
  }
  Vue.createApp(App).mount('#app');
</script>
```

##### v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量不需要编译的指令的节点会加快编译。

```html
<h2 v-pre>{{ this will not be compiled }}</h2>
```

##### v-cloak

这个指令保持在元素上直到关联组件实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到组件实例准备完毕。这样就不会出现因为网络延迟，导致页面上显示未被编译的 Mustache 括号标签。

```html
<div v-cloak>
  {{ message }}
</div>
123
<style>
  [v-cloak] {
    display: none;
  }
</style>
```



#### 1.2 属性绑定指令

如果需要为**元素的属性动态绑定属性值**，则需要用到 v-bind 属性绑定指令。用法示例如下：

由于 v-bind 指令在开发中使用频率非常高，因此，vue 官方为其提供了简写形式（简写为英文的 : ）

```html
<body>
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
  <!-- 使用 v-bind 指令，为 placeholder 属性动态绑定值 -->
  <input type="text" v-bind:placeholder="inputValue">
  <!-- 为 img 的 src 属性动态绑定值，v-bind 可以使用 : 简化 -->
  <img :src="imgSrc" alt="">
</div>
    
<script>
  const Counter = {
    data() {
      return {
        inputValue: '请输入内容',
        imgSrc: 'https://cn.vuejs.org/images/logo.png',
      }
    }
  }
  Vue.createApp(Counter).mount('#app')
</script>
```



##### 使用 Javascript 表达式

在 vue 提供的模板渲染语法中，除了支持绑定简单的数据值之外，还支持 Javascript 表达式的运算，例如：

```html
<!-- 数据源
data: {
  number: 9,
  ok: false,
  message: 'ABC',
  id: 3,
  user: {
    name: 'zs',
  },
}, 
-->
<p>{{number + 1}}</p>
<p>{{ok ? 'true' : 'false'}}</p>
<p>{{message.split('').reverse().join('')}}</p>
<!-- {{}} 和 v-bind 绑定中，使用单引号括起来就是字符串，否则就会去 vue 的 data 中找 -->
<p :id="'list-' + id">xxx</p>
<p>{{user.name}}</p>
```



#### 1.3 事件绑定指令

vue 提供了 v-on 事件绑定指令，用来辅助程序员为 DOM 元素绑定事件监听，由于 v-on 指令在开发中使用频率非常高，因此，vue 官方为其提供了**简写形式**（简写为英文的 @ ）

原生 DOM 对象有 onclick、oninput、onkeyup 等原生事件，替换为 vue 的事件绑定形式后，分别为：**v-on:click、v-on:input、v-on:keyup**，语法格式如下：

```html
<!-- vue 实例要控制的 DOM 区域 -->
<div id="app">
  <h3>count 的值为：{{count}}</h3>
  <!-- 点击按钮，让 data 中的 count 值自增 +1 -->
  <button v-on:click="addCount">+1</button>
   <!-- 简写：v-on 替换为 @ 符号，而且如果函数比较简单，只有一行，可以简写到行内 -->
   <button @click="count-=1">-1</button>
   <!-- 传入一个对象，可以绑定多个事件 -->
  <button @="{click: addCount, mousemove: mouseMove}">多功能按钮</button>
</div>

<script>
  const Counter = {
    data() {
      return { count: 0 }
    },
    methods: { // 方法需要定义在 methods 节点中
      // 点击按钮，让 count 自增 +1
      addCount() {
        // 此处 this 表示当前 vm 对象，使用 this 可以访问到 data中的数据
        this.count += 1
      },
      mouseMove() { console.log("鼠标移动了") },
    },
  }
  Vue.createApp(Counter).mount('#app')
</script>
```

注意：通过 v-on 绑定的事件处理函数，需要在 methods 节点中进行声明



##### 绑定事件并传参

在使用 v-on 指令绑定事件时，可以使用 ( ) 进行传参，示例代码如下：

```html
<h3>count 的值为：{{count}}</h3>
<button @click="addCount(2)">+2</button>

methods: {
  // 在形参处使用 step 来接受
  addCount(step, e) {
    this.count += step
  },
},
```



##### 事件参数对象

在原生的 DOM 事件绑定中，可以在事件处理函数的形参处，接收事件参数对象 event。同理，在 v-on 指令所绑定的事件处理函数中，同样可以接收到事件参数对象 event，示例代码如下：

```html
<h3>count 的值为：{{count}}</h3>
<!-- 如果带了参数，那么可以使用 $event 用来表示原始事件参数对象，可以解决被覆盖的问题 -->
<button @click="addCount(2, $event)">+2</button>
<!-- 如果不带小括号，那么方法处就可以直接使用 e 来接收事件参数对象 -->
<button @click="subCount">-1</button>

methods: {
  // 在形参处使用 step 来接受，而 e 代表接受的事件对象 event
  addCount(step, e) {
    const bgColor = e.target.style.backgroundColor
    e.target.style.backgroundColor = bgColor === 'red' ? '' : 'red'
    this.count += step
  },
  subCount(e) {
    console.log(e)
    this.count -= 1
  },
},
```

注意：$event 是vue提供的特殊变量 ， 用来表示原生的事件参数对象 event 。$event 可以解决事件参数对象 event 被覆盖的问题。



##### 事件修饰符

在事件处理函数中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。常用的 5 个事件修饰符如下，更加详细的参考官方文档：https://v3.cn.vuejs.org/api/directives.html#v-on

| 事件修饰符 | 说明                                                      |
| ---------- | --------------------------------------------------------- |
| .prevent   | 阻止默认行为（例如：阻止 a 连接的跳转、阻止表单的提交等） |
| .stop      | 阻止事件冒泡                                              |
| .capture   | 以捕获模式触发当前的事件处理函数                          |
| .once      | 绑定的事件只触发1次                                       |
| .self      | 只有在 event.target 是当前元素自身时触发事件处理函数      |

语法格式如下：

```html
<h4>.prevent 事件修饰符的应用场景</h4>
<a href="https://www.baidu.com" @click.prevent="onLinkClick">百度首页</a>
```



##### 按键修饰符

在监听键盘事件时，我们经常需要判断详细的按键。此时，可以为键盘相关的事件添加按键修饰符，例如：

```html
<!--当按下 enter 键时调用 submit，按 esc 时候调用 clearInput-->
<input type="text" @keyup.enter="submit" @keyup.esc="clearInput"/>

methods: {
  submit(e) { // 获取文本框最新的值
    console.log('摁下了 enter 键，最新的值是：' + e.target.value)
  },
  clearInput(e) { // 清空文本框的值
    e.target.value = ''
  },
},
```



#### 1.4 双向绑定指令

vue 提供了 **v-model 双向数据**绑定指令，用来辅助开发者在不操作 DOM 的前提下，快速获取表单的数据。更多的表单用法参考官方文档：https://v3.cn.vuejs.org/guide/forms.html

```html
<p>用户名是：{{username}}</p>
<input type="text" v-model="username" />

<p>选中的省份是：{{province}}</p>
<select v-model="province">
  <option value="">请选择</option>
  <option value="1">北京</option>
  <option value="2">河北</option>
  <option value="3">黑龙江</option>
</select>
```

**注意**：`v-model` 指令只能配合表单元素一起使用！而且`v-bind`是单向绑定，不要混淆了



##### v-model 指令的修饰符

为了方便对用户输入的内容进行处理，vue 为 v-model 指令提供了 3 个修饰符，分别是：

| 修饰符  | 作用                           | 示例                             |
| ------- | ------------------------------ | -------------------------------- |
| .number | 自动将用户的输入值转为数值类型 | `<input v-model.number="age" />` |
| .trim   | 自动过滤用户输入的首尾空白字符 | `<input v-model.trim="msg" />`   |
| .lazy   | 在“change”时而非“input”时更新  | `<input v-model.lazy="msg" />`   |



#### 1.5 条件渲染指令

条件渲染指令用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：

- `v-if`
- `v-show`

```html
<button @click="flag = !flag">Toggle Flag</button>
<p v-if="flag">请求成功 --- 被 v-if 控制</p>
<p v-show="flag">请求成功 --- 被 v-show 控制</p>
```



##### v-if 和 v-show 的区别

实现原理不同：

- v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏；
- v-show 指令会动态为元素添加或移除 style=“display: none;” 样式，从而控制元素的显示与隐藏；

性能消耗不同：v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此：

- 如果需要非常**频繁地切换，则使用 v-show** 较好
- 如果在运行时条件**很少改变，则使用 v-if** 较好



##### v-else、v-else-if

v-if 可以单独使用，或配合 `v-else` 或 `v-else-if` 指令一起使用：

注意：v-else 和 v-else-if 指令**必须配合** v-if 指令一起使用，否则它将不会被识别！

```html
<p v-if="type === 'A'">优秀</p>
<p v-else-if="type === 'B'">良好</p>
<p v-else-if="type === 'C'">一般</p>
<p v-else>差</p>
```



#### 1.6 列表渲染指令

vue 提供了 `v-for` 指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。v-for 指令需要使用 `item in items` 的特殊语法，其中：items 是**待循环的数组**，item 是**当前的循环项**

v-for 还支持一个可选的第二个参数，即当前项的索引。语法为 `(item, index) in items`，示例代码如下：

```html
<ul>
  <li v-for="(item, index) in list">索引是：{{index}}，姓名是：{{item.name}}</li>
</ul>

data: {
  list: [
    {id: 1, name: 'zs'},
    {id: 2, name: 'ls'},
  ],
},
```

**注意**：v-for 的 item 项和 index 索引都是形参，可以根据需要进行**重命名**。例如：`(user, i) in userList`



##### 使用 key 维护列表的状态

当列表的数据变化时，默认情况下，vue 会**尽可能的复用**已存在的 DOM 元素，从而提升渲染的性能。但这种默认的性能优化策略，会导致**有状态的列表无法被正确更新**。

为了给 vue 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，提升渲
染的性能。此时，需要为每项提供一个**唯一的 key 属性**：

```html
<!-- 加 key 的好处：正确维护列表的状态，复用 DOM 元素，提升渲染性能 -->
<li v-for="(user, index) in userlist" :key="user.id">
  <input type="checkbox" />
  姓名：{{user.name}}
</li>
```



##### key 的注意事项

1. key 的值只能是**字符串**或**数字**类型
2. key 的值必须具有**唯一性**（即：key 的值不能重复）
3. 建议把数据项 id 属性的值作为 key 的值（因为 id 属性的值具有唯一性）
4. 使用 index 的值当作 key 的值没有任何意义（因为 index 的值不具有唯一性）
5. 建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）



### 2. 过滤器（vue3删除）

过滤器（Filters）是 vue 为开发者提供的功能，常用于文本的格式化。过滤器可以用在两个地方：插值表达式和 v-bind 属性绑定。过滤器定义在 filters 节点下，filters 是和 data 节点平级的

过滤器应该被添加在 JavaScript 表达式的尾部，由管道符进行调用，示例代码如下：

```html
<!-- 在 {{}} 或 v-bind 中使用管道符调用过滤器，表示对 message 的值进行格式化 -->
<p :title="info | capitalize">{{message | capitalize}}</p>

filters: { // 在filters节点下定义过滤器
  capitalize(str) { // 把首字符转大写
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
```



#### 2.1 私有和全局过滤器

在 filters 节点下定义的过滤器，称为私有过滤器，因为它只能在当前 vm 实例所**控制的 el 区域**内使用。如果希望在多个 vue 实例之间共享过滤器，则可以按照如下的格式定义全局过滤器：

```js
// 全局过滤器，参数一：过滤器名字，参数二：处理函数
Vue.filter('capitalize', (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1) + '~~~'
})
```



#### 2.2 连续调用多个过滤器

过滤器可以串联地进行调用，同时过滤器的本质是 JavaScript 函数，因此可以接收参数，例如：

```html
<div id="app">
  <p :title="info | capitalize">{{message | capitalize | maxLength(3)}}</p>
</div>

<script src="./lib/vue-2.6.12.js"></script>
<script>
  // 首字母转大写的全局过滤器
  Vue.filter('capitalize', (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })

  // 控制文本长度的全局过滤器，参数一：永远是管道符前面的值，参数二开始才是调用过滤器传递过来的参数
  Vue.filter('maxLength', (str, len = 10) => {
    if (str.length <= len) return str
    return str.slice(0, len) + '...'
  })

  const vm = new Vue({
    el: '#app',
    data: {
      message: 'hello vue.js',
      info: 'title info',
    },
  })
</script>
```

注意：传参时，参数一永远是管道符前面处理的值，参数二开始才是我们自己编写调用的值



#### 2.3 过滤器的兼容性

过滤器仅在 vue 1.x 和 2.x 中受支持，在 vue 3.x 的版本中剔除了过滤器相关的功能。

在企业级项目开发中：如果项目已经升级到了 vue 3.x，官方建议使用计算属性或方法代替被剔除的过滤器功能

具体迁移指南，参考官网给出的说明：https://v3.cn.vuejs.org/guide/migration/filters.html#migration-strategy



## 五、品牌列表案例（vue2编写）

### 1. 案例效果及知识点

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161229549.png)

**用到的知识点**

- bootstrap 4.x 相关的知识点：卡片（Card）、表单相关（Forms）、按钮（Buttons）、表格（Tables）
- vue 指令与过滤器相关的知识点：插值表达式、属性绑定、事件绑定、双向数据绑定、修饰符、条件渲染、列表渲染、全局过滤器



### 2. 整体实现步骤规划

1. 创建基本的 vue 实例
2. 基于 vue 渲染表格数据
3. 实现添加品牌的功能
4. 实现删除品牌的功能
5. 实现修改品牌状态的功能



#### 2.1 创建基本的 vue 实例

步骤1：导入 vue 的 js 文件：

```html
<!-- 1.导入 vue 的 js 文件 -->
<script src="./lib/vue-2.6.12.js"></script>
```

步骤2：创建 vue 实例对象：

```js
// 2. 创建 vue 的实例对象
const vm = new Vue({
  el: '#app',
  data: {
    // 品牌列表数据
    brandlist: [
      {id: 1, brandname: '宝马', state: true, addtime: new Date()},
      {id: 2, brandname: '奥迪', state: false, addtime: new Date()},
      {id: 3, brandname: '奔驰', state: true, addtime: new Date()},
    ],
  },
})
```



#### 2.2 基于 vue 渲染表格数据

步骤1：使用 v-for 指令循环渲染表格的数据：

```html
<tbody>
  <tr v-for="(item, index) in brandlist" :key="item.id">
    <td>{{index + 1}}</td>
    <td>{{item.brandname}}</td>
    <td>{{item.state}}</td>
    <td>{{item.addtime}}</td>
    <td><a href="javascript:;">删除</a></td>
  </tr>
</tbody>
```

步骤2：将品牌的状态渲染为 Switch 开关效果：

Switch 开关效果的官方文档地址：https://v4.bootcss.com/docs/components/forms/#switches

```html
<td>
  <div class="custom-control custom-switch">
    <!--基于 checkbox 渲染 switch 开关效果-->
    <input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.state"/>
    <!--switch 开关后面的描述文本-->
    <label class="custom-control-label" :for="item.id" v-if="item.state">已启用</label>
    <label class="custom-control-label" :for="item.id" v-else>已禁用</label>
  </div>
</td>
```

步骤3：使用全局过滤器对时间进行格式化：

```html
<!--调用全局过滤器对时间进行格式化-->
<td>{{item.addtime | dateFormat}}</td>
12
// 全局过滤器，对时间进行格式化
Vue.filter('dateFormat', (dateStr) => {
  const dt = new Date(dateStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}
```



#### 2.3 添加品牌

步骤1：阻止表单的默认提交行为：

```html
<form class="form-inline" @submit.prevent>
	<!--省略内部 DOM 结构-->
</form>
```

步骤2：为 input 输入框进行 v-model 双向数据绑定，并且监听 input 输入框的 keyup 事件，通过 **.esc 按键修饰符**快速清空文本框中的内容：

```html
<!-- 文本输入框 -->
<input type="text" class="form-control" v-model.trim="brandname" @keyup.esc="brandname = ''"/>
```

步骤3：为**添加品牌**的 button 按钮绑定 click 事件处理函数：

```html
<!-- 提交表单的按钮 -->
<button type="submit" class="btn btn-primary mb-2" @click="addNewBrand">添加品牌</button>
```

步骤4：在 data 中声明 nextId 和 brandname 属性（nextId 用来记录下一个可用的 id 值），并在 methods 中声明 `addNewBrand` 事件处理函数：

```js
data: {
  brandname: '',
  nextId: 4,
},

methods:{
  addNewBrand() { // 添加新的品牌处理函数
    if (!this.brandname) return alert('品牌名称不能为空！')
    // 添加新的品牌数据到brandlist
    this.brandlist.push({
      id: this.nextId,
      brandname: this.brandname,
      state: true,
      addtime: new Date(),
    })
    // 重置文本框的值，以及让 nextId 自增 +1
    this.brandname = ''
    this.nextId++
  },
}
```



#### 2.4 删除品牌

步骤1：为删除的 a 链接绑定 click 点击事件处理函数，并阻止其默认行为：

```html
<a href="#" @click.prevent="removeBrand(item.id)">删除</a>
```

步骤2：在 methods 节点中声明 `removeBrand` 事件处理函数如下：

```js
// 根据 id 删除对应的数据
removeBrand(id) {
  this.brandlist = this.brandlist.filter(x => x.id !== id)
},
```



## 总结

- 能够知道 vue 的基本使用步骤

  - 导入 vue.js 文件
  - 得到 vm 实例对象
  - 声明 el 和 data 数据节点
  - MVVM 的对应关系
  
- 掌握 vue 中常见指令的基本用法

  - 插值表达式、v-bind、v-on、v-if 和 v-else
  - v-for 和 :key、v-model
  
- 掌握 vue 中过滤器的基本用法

  - 全局过滤器：Vue.filter(‘过滤器名称’, function)
- 私有过滤器：定义在 filters 节点