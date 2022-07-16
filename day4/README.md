### 文章目录

- [一、单页面应用程序](#_1)
- - [1. 什么是单页面应用程序](#1__3)
  - [2. 单页面应用程序的特点](#2__9)
  - [3. 单页面应用程序的优点](#3__17)
  - [4. 单页面应用程序的缺点](#4__33)
  - [5. 如何快速创建 vue 的 SPA 项目](#5__vue__SPA__47)
- [二、vite 的基本使用](#vite__64)
- - [1. 什么是 vite](#1__vite_66)
  - [2. 创建 vite 的项目](#2__vite__80)
  - [3. 梳理项目的结构](#3__94)
  - [4. vite 项目的运行流程](#4_vite__113)
- [三、vue-cli 的基本使用](#vuecli__155)
- - [1. 什么是 vue-cli](#1__vuecli_157)
  - [2. 安装 vue-cli](#2__vuecli_167)
  - - [2.1 解决 Windows PowerShell 不识别 vue 命令的问题](#21__Windows_PowerShell__vue__191)
  - [3. 基于 vue ui 创建 vue 项目](#3__vue_ui__vue__206)
  - [4. 基于命令行创建 vue 项目](#4__vue__228)
- [四、组件化开发思想](#_249)
- - [1. 什么是组件化开发](#1__251)
  - [2. 组件化开发的好处](#2__260)
  - [3. vue 中的组件化开发](#3_vue__269)
- [五、vue 组件的构成](#vue__277)
- - [1. vue 组件组成结构](#1_vue__279)
  - [2. 组件的 template 节点](#2__template__291)
  - - [2.1 根节点问题](#21__312)
  - [3. 组件的 script 节点](#3__script__338)
  - - [3.1 script 中的 name 节点](#31_script__name__351)
    - [3.2 script 中的 data 节点](#32_script__data__366)
    - [3.3 script 中的 methods 节点](#33_script__methods__391)
  - [4. 组件的 style 节点](#4__style__413)
  - - [4.1 让 style 中支持 less 语法](#41__style__less__429)
- [六、组件的基本使用](#_450)
- - [1. 组件的注册](#1__452)
  - - [1.1 注册组件的两种方式](#11__460)
    - [1.2 全局注册组件](#12__472)
    - [1.3 局部注册组件](#13__509)
    - [1.4 组件注册时名称的大小写](#14__533)
  - [2. 组件之间的样式冲突问题](#2__546)
  - - [2.1 思考：如何解决组件样式冲突的问题](#21__555)
    - [2.2 style 节点的 scoped 属性](#22_style__scoped__576)
    - [2.3 deep 样式穿透](#23_deep__597)
  - [3. 组件的 props](#3__props_618)
  - - [3.1 什么是组件的 props](#31__props_629)
    - [3.2 在组件中声明 props](#32__props_644)
  - [4. Class 与 Style 绑定](#4_Class__Style__676)
  - - [4.1 动态绑定 HTML 的 class](#41__HTML__class_682)
    - [4.2 多种方式的总结](#42__742)
- [七、封装组件的案例](#_755)
- - [1. 案例需求](#1__757)
  - [2. 整体实现步骤](#2__775)
  - - [2.1 创建 MyHeader 组件](#21__MyHeader__777)
    - [2.2 定义 props 并使用](#22__props__804)
    - [2.3 App 组件中注册并使用](#23_App__825)
- [总结](#_852)



# 一、单页面应用程序

## 1. 什么是单页面应用程序

单页面应用程序（英文名：Single Page Application）简称 SPA，顾名思义，指的是一个 Web 网站中只有唯一的一个 HTML 页面，所有的功能与交互都在这唯一的一个页面内完成。
例如这个 Demo 项目：![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620897.png)



## 2. 单页面应用程序的特点

单页面应用程序将所有的功能局限于一个 web 页面中，仅在该 web 页面初始化时加载相应的资源（ HTML、JavaScript 和 CSS）。

一旦页面加载完成了，SPA **不会**因为用户的操作而进行页面的重新加载或跳转。而是利用 JavaScript 动态地变换 HTML 的内容，从而实现页面与用户的交互。



## 3. 单页面应用程序的优点

SPA 单页面应用程序最显著的 3 个优点如下：

- 良好的交互体验
  - 单页应用的内容的改变不需要重新加载整个页面
  - 获取数据也是通过 Ajax 异步获取
  - 没有页面之间的跳转，不会出现“白屏现象”
- 良好的前后端工作分离模式
  - 后端专注于提供 API 接口，更易实现 API 接口的复用
  - 前端专注于页面的渲染，更利于前端工程化的发展
- 减轻服务器的压力
  - 服务器只提供数据，不负责页面的合成与逻辑的处理，吞吐能力会提高几倍



## 4. 单页面应用程序的缺点

任何一种技术都有自己的局限性，对于 SPA 单页面应用程序来说，主要的缺点有如下两个：

- 首屏加载慢
  - 路由懒加载
  - 代码压缩
  - CDN 加速
  - 网络传输压缩
- 不利于 SEO
  - SSR 服务器端渲染



## 5. 如何快速创建 vue 的 SPA 项目

vue 官方提供了两种快速创建工程化的 SPA 项目的方式：

- 基于 vite 创建 SPA 项目
- 基于 vue-cli 创建 SPA 项目

|                            | vite                   | vue-cli                |
| -------------------------- | ---------------------- | ---------------------- |
| 支持的 vue 版本            | **仅支持 vue3.x**      | 支持 3.x 和 2.x        |
| 是否基于 webpack           | 否                     | 是                     |
| 运行速度                   | 快                     | 较慢                   |
| 功能完整度                 | **小而巧（逐渐完善）** | 大而全                 |
| 是否建议在企业级开发中使用 | 目前不建议             | 建议在企业级开发中使用 |



# 二、vite 的基本使用

## 1. 什么是 vite

Vite（法语意为 “快速的”，发音 /vit/，发音同 “veet”）是一种新型前端构建工具，能够显著提升前端开发体验。

它主要由两部分组成：

- 一个开发服务器，它基于原生 ES 模块提供了丰富的内建功能，比如速度快到惊人的模块热更新（HMR）。
- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620959.png)
那为什么选择使用 vite 呢？？？查看官方文档：https://cn.vitejs.dev/guide/why.html



## 2. 创建 vite 的项目

按照顺序执行如下的命令，即可基于 vite 创建 vue 3.x 的工程化项目：

```shell
npm init vite 项目名 -- --template vue

cd 项目名
npm install
npm run dev
```



## 3. 梳理项目的结构

使用 vite 创建的项目结构如下：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620084.png)

- node_modules 目录用来存放第三方依赖包
- public 是公共的静态资源目录
- src是项目的源代码目录（程序员写的所有代码都要放在此目录下）
  - **assets** 目录用来存放项目中所有的**静态资源文件**（css、fonts等）
  - **components** 目录用来存放项目中所有的**自定义组件**
  - **App.vue** 是项目的**根组件**
  - **index.css** 是项目的**全局样式表**文件
  - **main.js** 是整个项目的**打包入口文件**
- .gitignore 是 Git 的忽略文件
- index.html 是 SPA 单页面应用程序中唯一的 HTML 页面
- package.json 是项目的包管理配置文件



## 4. vite 项目的运行流程

在工程化的项目中，vue 要做的事情很单纯：通过 **main.js** 把 **App.vue** 渲染到 **index.html** 的指定区域中。其中：

- App.vue 用来编写待渲染的**模板结构**
- index.html 中需要预留一个 **el 区域**
- main.js 把 App.vue 渲染到了 index.html **所预留的区域**中

**在 App.vue 中编写模板结构**：清空 App.vue 的默认内容，并书写如下的模板结构：

```html
<template>
  <h1>这是 app 的根组件</h1>
</template>
```

**在 index.html 中预留 el 区域**：打开 index.html 页面，确认预留了 el 区域：

```html
<body>
  <!-- id 为 app 的 div 元素，就是将来 vue 控制的区域 -->
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
```

**在 main.js 中进行渲染**：按照 vue 3.x 的标准用法，把 App.vue 中的模板内容渲染到 index.html 页面的 el 区域中：

```js
// 1.从 vue 中按需导入 createApp 函数，这个函数用来创建 vue 的单页面应用程序示例
import { createApp } from 'vue'
// 2.导入待渲染的 App 组件
import App from './App.vue'

// 3.调用 createApp()，传入 App 组件，表示把 App 渲染到 index.html 页面上，返回值是单页面应用程序的实例
const elementApp = createApp(App)
// 4.调用 mount 方法，用来指定 vue 实际要控制的区域
elementApp.mount('#app')
```



# 三、vue-cli 的基本使用

## 1. 什么是 vue-cli

vue-cli（俗称：vue **脚手架**）是 vue 官方提供的、**快速生成 vue 工程化项目**的工具。它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程。程序员可以专注在撰写应用上，而不必花好几天去纠结 webpack 配置的问题。

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-bIafqsJO-1637409268750)(image/image-20211018172559726.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620912.png)

vue-cli 的中文官网首页：https://cli.vuejs.org/zh/



## 2. 安装 vue-cli

vue-cli 是基于 Node.js 开发出来的工具，因此需要使用 npm 将它安装为全局可用的工具：

```shell
# 全局安装 vue-cli
npm install -g @vue/cli

# 查看 vue-cli 版本，检验是否按照成功
vue --version
```

vue-cli 提供了创建项目的两种方式：

```shell
# 基于【命令行】创建
vue create 项目名

# 基于【图形化】创建
vue ui
```



### 2.1 解决 Windows [PowerShell](https://so.csdn.net/so/search?q=PowerShell&spm=1001.2101.3001.7020) 不识别 vue 命令的问题

默认情况下，在PowerShell 中执行 vue --version 命令会提示如下的错误消息：
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620868.png)

解决方案如下：

1. 以管理员身份运行 PowerShell
2. 执行 `set-ExecutionPolicy RemoteSigned` 命令
3. 输入字符 Y ，回车即可

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620945.png)



## 3. 基于 vue ui 创建 vue 项目

步骤1：在终端下运行 `vue ui` 命令，自动在浏览器中打开创建项目的可视化面板：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620512.png)
步骤2：在详情页面填写项目名称：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620706.png)
步骤3：在预设页面选择手动配置项目：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620714.png)
步骤4：在功能页面勾选需要安装的功能（Choose Vue Version、Babel、CSS 预处理器、使用配置文件）：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620214.png)
步骤5：在配置页面勾选 vue 的版本和需要的预处理器：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620836.png)
步骤6：将刚才所有的配置保存为预设（模板），方便下一次创建项目时复用之前的配置：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620925.png)
步骤7：创建项目并自动安装依赖包：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620497.png)
vue ui 的本质：通过可视化的面板采集到用户的配置信息后，在后台基于命令行的方式自动初始化项目：

项目创建完成后，自动进入项目仪表盘：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620741.png)

## 4. 基于命令行创建 vue 项目

步骤1：在终端下运行 `vue create 项目名` 命令，基于交互式的命令行创建 vue 的项目：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620718.png)
步骤2：选择要安装的功能：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620903.png)
步骤3：使用上下箭头选择 vue 的版本，并使用回车键确认选择：
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620868.png)
步骤4：使用上下箭头选择要使用的 css 预处理器，并使用回车键确认选择：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620244.png)
步骤5：使用上下箭头选择如何存储插件的配置信息，并使用回车键确认选择：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620296.png)
步骤6：是否将刚才的配置保存为预设：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620465.png)
步骤7：选择如何安装项目中的依赖包，后面就自动创建项目并安装依赖包：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620681.png)
步骤8：项目创建完成：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620589.png)

# 四、组件化开发思想

## 1. 什么是组件化开发

组件化开发指的是：根据**封装**的思想，**把页面上可重用的部分封装为组件**，从而方便项目的开发和维护。

例如：http://www.ibootstrap.cn/ 所展示的效果，就契合了组件化开发的思想。用户可以通过拖拽组件的方式，快速生成一个页面的布局结构。
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620002.png)

## 2. 组件化开发的好处

前端组件化开发的好处主要体现在以下两方面：

- 提高了前端代码的复用性和灵活性
- 提升了开发效率和后期的可维护性

## 3. vue 中的组件化开发

vue 是一个完全支持组件化开发的框架。

vue 中规定组件的后缀名是 .vue。之前接触到的 App.vue 文件本质上就是一个 vue 的组件。

# 五、vue 组件的构成

## 1. vue 组件组成结构

每个 .vue 组件都由 3 部分构成，分别是：

- template -> 组件的**模板结构**
- script -> 组件的 **JavaScript 行为**
- style -> 组件的**样式**

其中，每个组件中**必须包含** template 模板结构，而 script 行为和 style 样式是**可选的**组成部分。

## 2. 组件的 template 节点

vue 规定：每个组件对应的模板结构，需要定义到 `<template>` 节点中。在组件的 `<template>` 节点中，支持使用前面所学的指令语法，来辅助开发者渲染当前组件的 DOM 结构。代码示例如下：

```html
<template>
  <!-- 当前组件的 DOM 结构，需要定义在 template 节点中 -->
  <h1>这是 App 根组件</h1>
  <!-- 使用 {{}} 插值表达式 -->
  <p>生成一个随机数字：{{ (Math.random * 10).toFixed(2) }}</p>
  <!-- 使用 v-bind 属性绑定 -->
  <p :title="new Date.toLocaleTimeString()">学习 vue.js</p>
  <!-- 使用 v-on 事件绑定 -->
  <button @click="showInfo">按钮</button>
</template>
```

注意：`<template>` 是 vue 提供的**容器标签**，只起到包裹性质的作用，它**不会被渲染**为真正的 DOM 元素。

### 2.1 根节点问题

在 vue 2.x 的版本中，`<template>` 节点内的 DOM 结构仅支持**单个**根节点：

```html
<template>
  <!-- vue2.x 中，template 节点内所有元素，最外层必须有唯一的根节点进行包裹，否则报错 -->
  <div>
    <h1>h1 标题</h1>
    <h2>h2 标题</h2>
  </div>
</template>
```

但是，在 vue 3.x 的版本中，`<template>` 中支持定义多个根节点：

```html
<template>
  <!-- vue3.x 中，template 支持定义多个根节点 -->
  <h1>h1 标题</h1>
  <h2>h2 标题</h2>
</template>
```

## 3. 组件的 script 节点

vue 规定：组件内 `<script>` 节点是**可选**的，开发者可以在 `<script>` 节点中封装组件的 JavaScript 业务逻辑。

<script>节点的基本结构如下：

```js
// 所有组件相关的 data、methods方法等，都要定义在 export default 代码块中
export default {}
```

### 3.1 script 中的 name 节点

可以通过 name 节点为当前组件定义一个名称：

```js
export default {
  // name 属性指向的是当前组件的名称，建议大驼峰命名
  name:'MyApp'
}
```

在使用 vue-devtools 进行项目调试的时候，自定义的组件名称可以清晰的区分每个组件：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620110.png)



### 3.2 script 中的 data 节点

vue 组件渲染期间需要用到的数据，可以定义在 data 节点中：

```js
export default {
  // name 属性指向的是当前组件的名称，建议大驼峰命名
  name: 'MyApp',
  // data 中 return 出去的对象，就是当前组件渲染期间需要用到的数据对象
  data() {
    return {
      username: '哈哈',
    }
  },
}
```

**组件中的 data 必须是函数**

vue 规定：组件中的 data 必须是一个函数，不能直接指向一个数据对象。因此在组件中定义 data 数据节点时，下面的方式是错误的：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620161.png)
Vue3.x 必须是函数，否则直接在浏览器中报错，Vue2.x 会导致多个组件实例共用同一份数据的问题，请参考官方给出的示例：[data 必须是一个函数](https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数)

### 3.3 script 中的 methods 节点

组件中的事件处理函数，必须定义到 methods 节点中，示例代码如下：

```js
export default {
  name: 'MyApp', // 组件名
  data() { // 组件的数据
    return {
      count: 0,
    };
  },
  methods: { // 组件的处理函数
    addCount() {
      this.count++
    },
  },
};
```

## 4. 组件的 style 节点

vue 规定：组件内的 `<style>` 节点是可选的，开发者可以在 `<style>` 节点中编写样式美化当前组件的 UI 结构。`<style>` 节点的基本结构如下：

```html
<style lang="css">
h1 {
  font-weight: normal;
}
</style>
```

其中 `<style>` 标签上的 lang=“css” 属性是可选的，它表示所使用的样式语言。默认只支持普通的 css 语法，可选值还有 less、scss 等。

### 4.1 让 style 中支持 less 语法

如果希望使用 less 语法编写组件的 style 样式，可以按照如下两个步骤进行配置：

- 运行 `npm install less -D` 命令安装依赖包，从而提供 less 语法的编译支持
- 在 `<style>` 标签上添加 `lang="less"` 属性，即可使用 less 语法编写组件的样式

```html
<style lang="less">
h1 {
  font-weight: normal;
  i {
    color: red;
    font-style: normal;
  }
}
</style>
```

# 六、组件的基本使用

## 1. 组件的注册

组件之间可以进行相互的引用，vue 中组件的引用原则：先注册后使用。例如：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620495.png)
组件在被封装好之后，彼此之间是相互独立的，不存在父子关系，在使用组件的时候，根据彼此的嵌套关系，形成了父子关系、兄弟关系

### 1.1 注册组件的两种方式

vue 中注册组件的方式分为“全局注册”和“局部注册”两种，其中他们的区别如下：

- 被全局注册的组件，可以在全局任何一个组件内使用
  - 如果某些组件在开发期间的**使用频率很高**，推荐进行全局注册；
- 被局部注册的组件，只能在当前注册的范围内使用
  - 如果某些组件**只在特定的情况下会被用到**，推荐进行局部注册。
    ![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620693.png)![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207161620863.png)



### 1.2 全局注册组件

在 main.js 中导入组件并进行全局注册，在注册组件期间，除了可以直接提供组件的注册名称之外，还可以把组件的 name 属性作为注册后组件的名称，代码如下：

```js
import { createApp } from 'vue'
import App from './App.vue'

// 1. 导入需要被全局注册的组件 Swiper Test
import Swiper from './components/01.globalReg/Swiper.vue'
import Test from './components/01.globalReg/Test.vue'

const app = createApp(App)

// 2. 调用 app.component() 方法全局注册组件
app.component(Swiper.name, Swiper)
app.component('Test', Test)

app.mount('#app')
```

**全局注册组件使用**：使用 `app.component()` 方法注册的全局组件，直接以标签的形式进行使用即可，例如：

```html
<template>
  <h1>这是根组件</h1>
  <hr />
  <!-- 在其他组件中，直接以标签的方式，使用刚才的全局组件即可 -->
  <my-swiper></my-swiper>
  <!-- 推荐短横线命名法，虽然 MyTest 大驼峰命名也可以使用但不推荐 -->
  <my-test></my-test>
  <MyTest></MyTest>
</template>
```



### 1.3 局部注册组件

在组件 A 的 components 节点下，注册了组件 F。则组件 F 只能用在组件 A 中，不能被用在组件 C 中。

```html
<template>
  <h1>这是根组件</h1>
  <hr />
  <my-search></my-search>
</template>

<script>
import Search from './components/02.privateReg/Search.vue'

export default {
  components: { // 通过 components 节点，为当前组件注册私有子组件
    'my-search': Search,
  },
}
</script>
```



### 1.4 组件注册时名称的大小写

在进行组件的注册时，定义组件注册名称的方式有两种：

- 使用kebab-case

   命名法（俗称短横线命名法，例如 my-swiper 和 my-search）

  - 特点：必须严格按照短横线名称进行使用

- 使用PascalCase

  命名法（俗称帕斯卡命名法或大驼峰命名法，例如 MySwiper 和 MySearch）

  - 特点：既可以严格按照帕斯卡名称进行使用，又可以转化为短横线名称进行使用

**注意**：实际开发中，组件注册时，推荐帕斯卡命名法，因为它的适用性更强，DOM 使用时，推荐短横线命名法。



## 2. 组件之间的样式冲突问题

默认情况下，写在 .vue 组件中的样式会全局生效，因此很容易造成多个组件之间的样式冲突问题。导致组件之间样式冲突的根本原因是：

- 单页面应用程序中，所有组件的 DOM 结构，都是基于唯一的 index.html 页面进行呈现的
- 每个组件中的样式，都会影响整个 index.html 页面中的 DOM 元素



### 2.1 思考：如何解决组件样式冲突的问题

为每个组件分配唯一的自定义属性，在编写组件样式时，通过属性选择器来控制样式的作用域，示例代码如下：

```html
<template>
  <div class="app-container" data-v-001>
    <h1 data-v-001>App根组件</h1>
  </div>
</template>

<style>
/* 通过中括号属性选择器来防止冲突，因为每个组件分配的自定义属性是唯一的 */
.app-container[data-v-001] {
  border: 1px solid #000;
}
</style>
```



### 2.2 style 节点的 scoped 属性

为了提高开发效率和开发体验，vue 为 style 节点提供了 `scoped` 属性，从而防止组件之间的样式冲突问题：

```html
<template>
  <div class="app-container">
    <h1>App根组件</h1>
  </div>
</template>

<style scoped>
/* 通过scoped 属性，用来自动为每个组件分配唯一的自定义属性，并应用到当前组件 DOM 和 style 中 */
.app-container {
  border: 1px solid #000;
}
</style>
```



### 2.3 deep 样式穿透

如果给当前组件的 style 节点添加了 scoped 属性，则当前组件的样式对其子组件是不生效的。如果想让某些样式对子组件生效，可以使用 /deep/ 深度选择器。

```html
<style lang="less" scoped>
// .title 是对当前组件生效的，想让某些样式对子组件生效可以使用 deep
// /deep/ .title {
//   color: blue;
// }

:deep(.title) {
  color: blue;
}
</style>
```

注意：/deep/ 是 vue2.x 中实现样式穿透的方案。在 vue3.x 中推荐使用 :deep() 替代 /deep/。



## 3. 组件的 props

为了提高组件的复用性，在封装 vue 组件时需要遵守如下的原则：

- 组件的 DOM 结构、Style 样式要尽量复用
- 组件中要展示的数据，尽量由组件的使用者提供

为了方便使用者为组件提供要展示的数据，vue 组件提供了 props 的概念。



### 3.1 什么是组件的 props

props 是组件的自定义属性，组件的使用者可以通过 props 把数据传递到子组件内部，供子组件内部进行使用。还可以使用 v-bind 属性绑定的形式，为组件动态绑定 props 的值，父组件代码如下：

```html
<!-- 使用 v-bind 绑定为 title 和 author 赋值，pub -->
<my-article title="学习笔记" :author="'by ' + info.author" pub-time="1989"></my-article>
```

props 的作用：父组件通过 props 向子组件传递要展示的数据。

props 的好处：提高了组件的复用性。



### 3.2 在组件中声明 props

在封装 vue 组件时，可以把动态的数据项声明为 props 自定义属性。自定义属性可以在当前组件的模板结构中被直接使用。子组件代码如下：

```html
<!-- my-article 组件定义如下 -->
<template>
  <div>
    <h3>标题：{{title}}</h3>
    <h5>作者：{{author}}</h5>
    <h6>发布时间：{{pubTime}}</h6>
  </div>
</template>

<script>
export default {
  name: 'MyArticle',
  // 父组件传递给子组件的数据，必须在 props 节点中声明
  props: ['title', 'author', 'pubTime']
}
</script>
```

注意：

- 无法使用未声明的 props
  - 如果父组件给子组件传递了**未声明**的 props 属性，则这些属性**会被忽略**，无法被子组件使用
- props 的大小写命名
  - 如果使用 camelCase (驼峰命名法) 声明了 props 属性的名称，则有驼峰命名或短横线分隔命名法两种方式为其绑定属性的值

### 3.3 动态绑定props的值

可以使用v-bind属性绑定的形式，为组件动态绑定props的值，实例代码如下：

```js
<my-article :title="info.title" :author="'post by ' + info.author" :pub-time="info.pubTime"></my-article>


<script>
import MyArticle from './Article.vue'

export default {
    name: 'MyApp',
    data() {
        return {
            info: {
                title: 'asd',
                author: 'hjk',
                pubTime: '2022'
            }
        }
    },
    components: {
        MyArticle
    }
}
</script>
```



## 4. Class 与 Style 绑定

在实际开发中经常会遇到动态操作元素样式的需求。因此，vue 允许开发者通过 v-bind 属性绑定指令，为元素动态绑定 class 属性的值和行内的 style 样式。

### 4.1 动态绑定 HTML 的 class

示例代码如下：

```html
<template>
  <div>
    <!-- 可以通过三元表达式，动态绑定 class 的类名 -->
    <h3 :class="isItalic ? 'italic' : ''">MyStyle 组件</h3>
    <!-- 如果要动态绑定多个类名，可以使用数组语法 -->
    <h3 :class="[isItalic ? 'italic' : '', isDelete ? 'delete' : '']">MyStyle 组件</h3>
    <button @click="isItalic = !isItalic">Toggle Italic</button>
    <button @click="isDelete = !isDelete">Toggle Delete</button>

    <hr />
    <!-- 对与上面数组方式会让结构看起来很臃肿，可以使用对象语法简化 -->
    <h3 :class="classObj">MyStyle 组件</h3>
    <button @click="classObj.italic = !classObj.italic">Toggle Italic</button>
    <button @click="classObj.delete = !classObj.delete">Toggle Delete</button>

    <hr />
    <!-- 使用 :style 对象语法，看起来像 CSS 但其实是一个 JavaScript 对象 -->
    <div :style="{ fontSize: fsize + 'px', 'background-color': bgcolor }">study</div>
    <button @click="fsize += 1">字号 +1</button>
    <button @click="fsize -= 1">字号 -1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 字体是否倾斜、删除
      isItalic: false,
      isDelete: false,
      // 使用对象来优化数组方式
      classObj: {
        italic: false,
        delete: false,
      },
      // 控制文字的大小
      fsize: 30,
    }
  },
}
</script>

<style lang="less">
.italic {
  font-style: italic;
}

.delete {
  text-decoration: line-through;
}
</style>
```



### 4.2 多种方式的总结

- 动态绑定 HTML 的 class
  - 可以通过三元表达式，动态的为元素绑定 class 的类名
- 以数组语法绑定 HTML 的 class
  - 如果元素需要动态**绑定多个** class 的类名，此时可以使用数组的语法格式
- 以对象语法绑定 HTML 的 class
  - 使用数组语法动态绑定 class 会导致**模板结构臃肿**的问题。此时可以使用对象语法进行简化
- 以对象语法绑定内联的 style
  - `:style` 对象语法十分直观——看着非常像 CSS，但其实是一个 JavaScript 对象。CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名



# 七、封装组件的案例

## 1. 案例需求

封装要求：

- 允许用户自定义 title（标题）、bgcolor（背景色）、color（文本颜色），用户没自定义，用默认的
- MyHeader 组件需要在页面顶部进行 fixed 固定定位，且 z-index 等于 999

用到的知识点：组件的封装与注册，props，样式绑定

使用示例如下：

```html
<!-- 如果我们传入了属性就用我们自定义的，否则用默认的 -->
<my-header title="数据湖入门" backgroundColor="green" color="red"></my-header>
```



## 2. 整体实现步骤

### 2.1 创建 MyHeader 组件

使用 CSS 渲染 MyHeader 组件的基本结构，并且进行 fixed 固定定位

```html
<template>
  <div class="header-container">
  </div>
</template>

<style lang="less" scoped>
.header-container {
  height: 45px;
  background-color: pink;
  text-align: center;
  line-height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
```



### 2.2 定义 props 并使用

在 props 中接受 app 组件传递过来的数据，并为 div 进行动态绑定样式

```html
<template>
  <div class="header-container" :style="{ backgroundColor: backgroundColor, color: color }">
    {{title || 'Header 组件'}}
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  props: ['title', 'backgroundColor', 'color']
}
</script>
```



### 2.3 App 组件中注册并使用

先导入 MyHeader 组件，然后在 components 节点进行注册，然后进行使用，并删除属性进行测试

```html
<template>
  <div>
    <h1>App根组件</h1>
    <!-- 如果我们传入了属性就用我们自定义的，否则用默认的 -->
    <my-header title="数据湖入门" backgroundColor="green" color="red"></my-header>
  </div>
</template>

<script>
import MyHeader from './06.MyHeader/MyHeader.vue'

export default {
  name: 'MyApp',
  components: {
    MyHeader,
  },
}
</script>
```



# 总结

- 能够说出什么是单页面应用程序及组件化开发
  - SPA、只有一个页面、组件是对 UI 结构的复用
- 能够说出 .vue 单文件组件的组成部分
  - template、script、style（scoped、lang）
- 能够知道如何使用 vue-cli、vite 创建项目
  - vue ui 、vue create 项目名称
- 能够知道如何注册 vue 的组件
  - 全局注册（app.component）、局部注册（components）
- 能够知道如何声明组件的 props 属性
  - props 数组
- 能够知道如何在组件中进行样式绑定
  - 动态绑定 class、动态绑定 style