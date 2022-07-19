### 文章目录

- [一、前端路由的概念与原理](#_1)
- - [1. 什么是路由](#1__3)
  - [2. 前端路由的工作方式](#2__25)
  - [3. 实现简易的前端路由](#3__39)
- [二、vue-router 的基本使用](#vuerouter__117)
- - [1. 什么是 vue-router](#1__vuerouter_119)
  - [2. vue-router 4.x 的基本使用步骤](#2_vuerouter_4x__130)
  - - [2.1 在项目中安装 vue-router](#21__vuerouter_137)
    - [2.2 定义路由组件](#22__147)
    - [2.3 声明路由链接和占位符](#23__156)
    - [2.4 创建路由模块](#24__176)
- [三、vue-router 的高级用法](#vuerouter__232)
- - [1. 路由重定向](#1__234)
  - [2. 路由高亮](#2__253)
  - [3. 嵌套路由](#3__286)
  - - [3.1 声明子路由链接和子路由占位符](#31__298)
    - [3.2 通过 children 属性声明子路由规则](#32__children__317)
  - [4. 动态路由匹配](#4__349)
  - - [4.1 动态路由的概念](#41__369)
    - [4.2 $route.params 参数对象](#42_routeparams__384)
    - [4.3 使用 props 接收路由参数](#43__props__397)
  - [5. 编程式导航](#5__423)
  - - [5.1 $router.push](#51_routerpush_438)
    - [5.2 $router.replace](#52_routerreplace_463)
    - [5.3 $router.go](#53_routergo_472)
  - [6. 命名路由](#6__512)
  - - [6.1 命名路由实现声明式导航](#61__525)
    - [6.2 命名路由实现编程式导航](#62__538)
  - [7. 导航守卫](#7__564)
  - - [7.1 声明全局导航守卫](#71__571)
    - [7.2 守卫方法的 3 个形参](#72__3__586)
    - [7.3 next 函数的 3 种调用方式](#73_next__3__605)
    - [7.4 结合 token 控制后台主页的访问权限](#74__token__616)
- [四、后台管理案例](#_635)
- - [1. 案例效果](#1__637)
  - [2. 实现步骤](#2__645)
  - [3. 搭建项目基本结构](#3__658)
  - [4. 模拟并实现登录功能](#4__703)
  - [5. 通过路由渲染 Home.vue](#5__Homevue_777)
  - [6. 实现退出登录的功能](#6__817)
  - [7. 全局控制路由的访问权限](#7__844)
  - [8. 将左侧菜单改造为路由链接](#8__863)
  - [9. 实现跳转到用户详情页的功能](#9__934)
  - [10. 编程式导航实现后退功能](#10__975)
- [总结](#_1017)



# 一、前端路由的概念与原理

## 1. 什么是路由

路由（英文：router）就是对应关系。路由分为两大类：后端路由、前端路由

**后端路由**指的是：请求方式、请求地址与 function 处理函数之间的对应关系。在 node.js 中，express 路由的基本用法如下：

```js
const express = require('express')
const router = express.Router()

router.get('/userlist', function (req, res) {/* 路由的处理函数 */ })
router.post('/adduser', function (req, res) {/* 路由的处理函数 */ })

module.exports = router
```

**前端路由**通俗易懂的理解就是：**Hash 地址**与**组件**之间的**对应关系**。

> SPA 与前端路由的关系：SPA 指的是一个 web 网站只有唯一的一个 HTML 页面，所有组件的展示与切换都在这唯一的一个页面内完成。此时，**不同组件之间的切换需要通过前端路由**来实现。



## 2. 前端路由的工作方式

1. 用户点击了页面上的路由链接
2. 导致了 **URL 地址栏中的 Hash 值**发生了变化
3. **前端路由监听了到 Hash 地址的变化**
4. 前端路由把**当前 Hash 地址对应的组件**渲染都浏览器中

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054768.png)

结论：前端路由，指的是 Hash 地址与组件之间的对应关系！



## 3. 实现简易的前端路由

> 步骤分析：
>
> 1. 导入并注册 MyHome、MyMovie、MyAbout 两个组件。
> 2. 通过 `<component>` 标签的 is 属性，动态切换要显示的组件。
> 3. 在组件的结构中声明 3 个 `<a>` 链接，通过点击不同的 `<a>` 链接，切换浏览器地址栏中的 Hash 值
> 4. 在 created 生命周期函数中监听浏览器地址栏中 Hash 地址的变化，动态切换要展示的组件的名称

App.vue 组件：

```html
<template>
  <h1>App 根组件</h1>
  <!-- 定义 href 切换浏览器地址栏 hash 值 -->
  <a href="#/home">Home</a>&nbsp;
  <a href="#/movie">Movie</a>&nbsp;
  <a href="#/about">About</a>&nbsp;
  <hr />
  <!-- 通过 component 组件的 is 属性，动态切换要显示的组件 -->
  <component :is="comName"></component>
</template>

<script>
import MyHome from './MyHome.vue'
import MyMovie from './MyMovie.vue'
import MyAbout from './MyAbout.vue'

export default {
  data() {
    return { comName: 'MyHome' }
  },
  created() {
    console.log(1)
    // 监听 hash 值变化的事件
    window.onhashchange = () => {
      // 通过 location.hash 获取到最新的 hash 值，并进行匹配
      switch (location.hash) {
        case '#/home':
          this.comName = 'MyHome'
          break
        case '#/movie':
          this.comName = 'MyMovie'
          break
        case '#/about':
          this.comName = 'MyAbout'
          break
      }
    }
  },
  components: { MyHome, MyMovie, MyAbout },
}
</script>
```

MyHome、MyMovie、MyAbout 组件：

```html
<template>
  <h3>MyHome 组件</h3>
</template>

<template>
  <h3>MyMovie 组件</h3>
</template>

<template>
  <h3>MyAbout 组件</h3>
</template>
```



# 二、vue-router 的基本使用

## 1. 什么是 vue-router

vue-router 是 vue.js 官方给出的路由解决方案。它只能结合 vue 项目进行使用，能够轻松的管理 SPA 项目中组件的切换。

vue-router 目前有 3.x 的版本和 4.x 的版本。其中：

- vue-router 3.x 只能结合 vue2 进行使用，官方文档地址：https://router.vuejs.org/zh/
- vue-router 4.x 只能结合 vue3 进行使用，官方文档地址：https://next.router.vuejs.org/zh/



## 2. vue-router 4.x 的基本使用步骤

> 1. 在项目中安装 vue-router
> 2. 定义路由组件
> 3. 声明路由链接和占位符
> 4. 创建路由模块
> 5. 在 main.js 中导入并挂载路由模块

### 2.1 在项目中安装 vue-router

在 vue3 的项目中，只能安装并使用 vue-router 4.x。安装的命令如下：

```shell
npm install vue-router@4 -S
```



### 2.2 定义路由组件

在项目中定义 MyHome、MyMovie、MyAbout 三个组件，将来要使用 vue-router 来控制它们的展示与切换：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054580.png)

### 2.3 声明路由链接和[占位符](https://so.csdn.net/so/search?q=占位符&spm=1001.2101.3001.7020)

使用 `<router-link>` 标签来声明路由链接，并使用 `<router-view>` 标签来声明路由占位符。代码如下：

```html
<template>
  <h1>App 组件</h1>
  <!-- 声明路由链接 -->
  <router-link to="/home">首页</router-link>&nbsp;
  <router-link to="/movie">电影</router-link>&nbsp;
  <router-link to="/about">关于</router-link>
  <hr />
  
  <!-- 声明路由占位符 -->
  <router-view></router-view>
</template>
```



### 2.4 创建路由模块

在项目中创建 router.js 文件表示路由模块，按照如下 4 个步骤创建并得到路由的实例对象：

> 1、从 vue-router 中按需导入两个方法
>
> 2、导入需要使用路由控制的组件
>
> 3、创建路由实例对象，并指定路由规则
>
> 4、向外共享路由实例对象

```js
// 1. 从 vue-router 中按需导入两个方法
// createRouter：用于创建路由对象，createWebHashHistory：用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 导入需要被路由控制组件
import Home from './MyHome.vue'
import Movie from './MyMovie.vue'
import About from './MyAbout.vue'

// 3. 创建路由对象
const router = createRouter({
  // 3.1 通过 history 属性指定路由的工作模式
  history: createWebHashHistory(),
  // 3.2 通过 routers 数组，指定路由的匹配规则
  routes: [
    // path 是 hash 地址，component 是要展示的组件
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})

// 4. 向外导出路由对象，供其他模块导入并使用
export default router
```

5、在 main.js 中导入并挂载路由模块

```js
import { createApp } from 'vue'
import App from './App.vue'
// 1. 导入路由模块
import router from './components/02.start/router'

const app = createApp(App)

// 2. 挂载路由模块，app.use() 用于挂载第三方的插件模块
app.use(router)
app.mount('#app')
```



# 三、vue-router 的高级用法

## 1. 路由[重定向](https://so.csdn.net/so/search?q=重定向&spm=1001.2101.3001.7020)

路由重定向指的是：用户在访问地址 A 的时候，**强制用户跳转**到地址 C ，从而展示特定的组件页面。通过路由规则的 redirect 属性，指定一个新的路由地址，可以很方便地设置路由的重定向：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // redirect 属性：当用户访问 path 地址时，会被重定向到 redirect 属性的地址
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```



## 2. 路由高亮

可以通过如下的两种方式，将激活的路由链接进行高亮显示：

1、**使用默认的高亮 class 类**：被激活的路由链接，默认会应用一个叫做 router-link-active 的类名。开发者可以使用此类名选择器，为激活的路由链接设置高亮的样式：

```css
/* 在 index.css 中，重写 router-link-active 的样式 */
.router-link-active {
  background-color: red;
  color: white;
  font-weight: bold;
}
```

2、**自定义路由高亮的 class 类**：在创建路由的实例对象时，开发者可以基于 linkActiveClass 属性，自定义路由链接被激活时所应用的类名：

```js
const router = createRouter({
  history: createWebHashHistory(),
  // 自定义路由高亮的 class 类名，默认的 router-link-active 类名会被覆盖
  linkActiveClass: 'router-active',
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})
```



## 3. 嵌套路由

通过路由实现组件的嵌套展示，叫做嵌套路由。使用步骤如下：

1. 声明**子路由链接**和**子路由占位符**
2. 在父路由规则中，通过 children 属性**嵌套声明**子路由规则

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054633.png)

### 3.1 声明子路由链接和子路由占位符

在 MyAbout.vue 组件中，声明 tab1 和 tab2 的子路由链接以及子路由占位符。示例代码如下：

```html
<template>
  <h3>MyAbout 组件</h3>
  <!-- 声明子路由链接 -->
  <router-link to="/about/tab1">Tab1</router-link>&nbsp;
  <router-link to="/about/tab2">Tab2</router-link>
  <hr />

  <!-- 声明子路由占位符 -->
  <router-view></router-view>
</template>
```



### 3.2 通过 children 属性声明子路由规则

在 router.js 路由模块中，导入需要的组件，并使用 children 属性声明子路由规则。需要注意的是：子路由规则的 path 不要以 / 开头，示例代码如下：

```js
import Tab1 from './tabs/MyTab1.vue'
import Tab2 from './tabs/MyTab2.vue'

const router = createRouter({
  history: createWebHashHistory(), // 指定路由的工作模式
  // 声明路由的匹配规则
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { // about 页面的路由规则
      path: '/about',
      component: About,
      // 嵌套路由的重定向
      redirect: '/about/tab1',
      // 通过 children 属性嵌套声明子级路由规则
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 },
      ],
    },
  ],
})
```



## 4. 动态路由匹配

思考：有如下 3 个路由链接：

```html
<router-link to="/movie/1">电影1</router-link>
<router-link to="/movie/2">电影2</router-link>
<router-link to="/movie/3">电影3</router-link>
```

定义如下 3 个路由规则，是否可行呢？可以，但是路由规则的复用性差。

```js
{ path: '/movie/1', component: Movie },
{ path: '/movie/2', component: Movie },
{ path: '/movie/3', component: Movie },
```



### 4.1 动态路由的概念

动态路由指的是：把 Hash 地址中可变的部分定义为参数项，从而提高路由规则的复用性。在 vue-router 中使用英文的冒号（:）来定义路由的参数项。示例代码如下：

```js
// 动态路由匹配，使用 : 进行声明，冒号后面是动态参数的名称
{ path: '/movie/:mid', component: Movie },
// 使用上面一个，可以代替下面三个，提高复用性
{ path: '/movie/1', component: Movie },
{ path: '/movie/2', component: Movie },
{ path: '/movie/3', component: Movie },
```



### 4.2 $route.params 参数对象

通过动态路由匹配的方式渲染出来的组件中，可以使用 `$route.params` 对象访问到动态匹配的参数值。

```html
<template>
  <!-- $router.params 是路由的参数对象 -->
  <h3>MyMovie 组件 --- {{ $route.params.mid }} --- {{ mid }}</h3>
</template>
```



### 4.3 使用 props 接收路由参数

为了简化路由参数的获取形式，vue-router 允许在路由规则中开启 props 传参。示例代码如下：

```js
// 声明 props 属性为 true，在 Movie 中可以使用 props 的方式接收到路由匹配到的参数项
{ path: '/movie/:mid', component: Movie, props: true },
```

使用时：

```html
<template>
  <h3>MyMovie 组件 --- {{ mid }}</h3>
</template>

<script>
export default {
  name: 'MyMovie',
  props: ['mid'], // 使用 props 接收路由规则中匹配到的参数项
}
</script>
```



## 5. 编程式导航

通过调用 API 实现导航的方式，叫做编程式导航。与之对应的，通过点击链接实现导航的方式，叫做声明式导航。例如：

- 普通网页中点击 `<a>` 链接、vue 项目中点击 `<router-link>` 都属于声明式导航
- 普通网页中调用 `location.href` 跳转到新页面的方式，属于编程式导航

vue-router 提供了许多编程式导航的 API，其中最常用的 API 分别是：

- `this.$router.push('hash 地址')`：跳转到指定 hash 地址，并增加一条历史记录
- `this.$router.replace('hash 地址')`：跳转到指定的 hash 地址，并替换掉当前的历史记录
- `this.$router.go(数值 n)`：实现导航历史的前进、后退



### 5.1 $router.push

调用 `this.$router.push()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。示例代码如下：

```html
<template>
  <h3>MyHome 组件</h3>
  <button type="button" @click="goToMovie(3)">导航到Movie页面</button>
</template>

<script>
export default {
  name: 'MyHome',
  methods: {
    goToMovie(id) {
      // push 方法中，传入需要跳转的页面地址
      this.$router.push('/movie/' + id)
    },
  },
}
</script>
```



### 5.2 $router.replace

调用 `this.$router.replace()` 方法，可以跳转到指定的 hash 地址，从而展示对应的组件页面。用法和上面一样，而 push 和 replace 的区别：

- push 会增加一条历史记录
- replace 不会增加历史记录，而是替换掉当前的历史记录



### 5.3 $router.go

调用 `this.$router.go()` 方法，可以在浏览历史中进行前进和后退。在实际开发中，一般只会前进和后退一层页面。因此 vue-router 提供了如下两个便捷方法：

- `$router.back()`：在历史记录中，后退到上一个页面
- `$router.forward()`：在历史记录中，前进到下一个页面

示例代码如下：

```html
<template>
  <h3>MyMovie 组件 --- {{ $route.params.mid }} --- {{ mid }}</h3>
  <button type="button" @click="go">冲</button>
</template>

<script>
export default {
  name: 'MyMovie',
  props: ['mid'], // 使用 props 接收路由规则中匹配到的参数项
  methods: {
    go() { 
      // 向前移动一条记录，与 router.forward() 相同
      router.go(1)
      
      // 返回一条记录，与router.back() 相同
      router.go(-1)
      
      // 前进 3 条记录
      router.go(3)
      // 如果没有那么多记录，静默失败
      router.go(-100)
      router.go(100)
    },
  },
}
</script>
```



## 6. 命名路由

通过 name 属性为路由规则定义名称的方式，叫做命名路由。示例代码如下：

```js
// 使用 name 属性为当前路由规则定义一个名称
{ name: 'mov', path: '/movie/:mid', component: Movie, props: true },
```

注意：命名路由的 name 值**不能重复**，必须保证唯一性！



### 6.1 命名路由实现声明式导航

为 `<router-link>` 标签动态绑定 to 属性的值，并通过 name 属性指定要跳转到的路由规则。期间还可以用 params 属性指定跳转期间要携带的路由参数。示例代码如下：

```html
<template>
  <h3>MyHome 组件</h3>
  <router-link :to="{ name: 'mov', params: { mid: 2 } }">go to movie</router-link>
</template>
```



### 6.2 命名路由实现编程式导航

调用 push 函数期间指定一个配置对象，name 是要跳转到的路由规则、params 是携带的路由参数：

```html
<template>
  <h3>MyHome 组件</h3>
  <button type="button" @click="goToMovie(1)">go to movie</button>
</template>

<script>
export default {
  methods: {
    goToMovie(id) {
      this.$router.push({
        name: 'mov',
        params: { mid: id },
      })
    },
  },
}
</script>
```



## 7. 导航守卫

导航守卫可以控制路由的访问权限。示意图如下：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054571.png)

### 7.1 声明全局导航守卫

每次发生路由的导航跳转时，都会触发全局前置守卫。因此，在全局前置守卫中，程序员可以对每个路由进行访问权限的控制，代码示例如下：

```js
// 创建路由对象，省略中间代码
const router = createRouter({ ...... })

// 调用路由对象的 beforeEach，声明全局前置导航守卫
// beforeEach 需要传递一个 fn 函数，每次拦截到路由请求时都会调用，所以 fn 也叫守卫方法 
router.beforeEach(fn)
```



### 7.2 守卫方法的 3 个形参

全局导航守卫的守卫方法中接收 3 个形参，格式为：

```js
router.beforeEach((to, from, next) => {
  // to：目标路由对象
  // from：当前导航离开的路由对象
  // next：是一个函数，表示放行，调用 next() 表示放行
})
```

注意：

- 如果不声明 next 形参，则默认允许用户访问每一个路由！
- 如果声明了 next 形参，则必须调用 next() 函数，否则不允许用户访问任何一个路由！



### 7.3 next 函数的 3 种调用方式

参考示意图，分析 next 函数的 3 种调用方式最终导致的结果：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054591.png)

- 当前用户拥有后台主页的访问权限，直接放行：next()
- 当前用户没有后台主页的访问权限，强制其停留在当前页面：next(false)
- 当前用户没有后台主页的访问权限，强制其跳转到登录页面：next(’/login’)



### 7.4 结合 token 控制后台主页的访问权限

```js
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 1. 读取 token
  const tokenStr = localStorage.getItem('token')
  // 2. 想要访问后台主页，且 token 不存在
  if (to.path === '/main' && !tokenStr) {
    // next(false) // 3.1 不允许跳转
    next('/login') // 3.2 强制跳转到登录页面
  } else {
    next() // 3.3 直接放行
  }
})
```



# 四、后台管理案例

## 1. 案例效果

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207191054276.png)

**用到的知识点**：命名路由、路由重定向、导航守卫、嵌套路由、动态路由匹配、编程式导航



## 2. 实现步骤

1. 搭建项目基本结构
2. 展示 Login.vue 登录组件，并模拟实现登录功能
3. 通过路由渲染 Home.vue
4. 实现退出登录的功能
5. 全局控制路由的访问权限
6. 将左侧菜单改造为路由链接
7. 渲染用户管理页面的数据，实现跳转到用户详情页的功能
8. 开启路由的 props 传参，通过编程式导航实现后退功能



## 3. 搭建项目基本结构

1、解压资料文件夹，打开文件目录安装 router 包：

```shell
npm install
npm i vue-router@4 -S
```

2、在 src 目录下新建 router.js 路由模块：

```js
// 1. 按需导入对应的函数
import { createRouter, createWebHashHistory } from 'vue-router'

// 2. 创建路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
})

// 3. 向外共享路由实例对象
export default router
```

3、在 main.js 入口文件中导入并挂载路由对象：

```js
import { createApp } from 'vue'
import App from './App.vue'
// 导入 bootstrap 样式表和全局自定义样式表
import './assets/css/bootstrap.css'
import './index.css'
// 导入路由模块
import router from './router'

const app = createApp(App)
// 挂载路由对象
app.use(router)

app.mount('#app')
```



## 4. 模拟并实现登录功能

1、在 router.js 模块中导入 Login.vue 组件：

```js
import Login from './components/MyLogin.vue'
```

2、声明路由规则如下：

```js
routes: [
  // 路由重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
],
```

3、在App.vue组件中声明路由占位符：

```html
<template>
<!-- 路由占位符 -->
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MyApp',
}
</script>

<style lang="less" scoped>
</style>

```

4、为用户名和密码的文本框进行 v-model 双向数据绑定，登录按钮绑定点击事件处理函数：

```html
<!-- 登录名称 -->
<div class="form-group form-inline">
  <label for="username">登录名称</label>
  <input type="text" class="form-control ml-2" id="username" placeholder="请输入登录名称" 				 autocomplete="off" v-model="username"/>
</div>
<!-- 登录密码 -->
<div class="form-group form-inline">
  <label for="password">登录密码</label>
  <input type="password" class="form-control ml-2" id="password" placeholder="请输入登录密码"
         v-model="password"/>
</div>
<!-- 登录和重置按钮 -->
<div class="form-group form-inline d-flex justify-content-end">
  <button type="button" class="btn btn-secondary mr-2">重置</button>
  <button type="button" class="btn btn-primary" @click="onLoginClick">登录</button>
</div>
```

5、在 MyLogin.vue 组件中声明如下的 data 数据，在 methods 中声明 onLoginClick 事件处理函数如下：

```js
data() {
  return {
    username: '',
    password: '',
  }
},
methods: {
  onLoginClick() {
    // 判断用户名和密码是否正确
    if (this.username === 'admin' && this.password === '123456') {
      // 登录成功，跳转到后台主页
      this.$router.push('/home')
      // 模拟存储 Token 的操作
      return localStorage.setItem('token', 'Bearer xxx')
    }
    // 登录失败，清除 Token
    localStorage.removeItem('token')
  },
},
```



## 5. 通过路由渲染 Home.vue

1、在 router.js 中导入 Home.vue 组件：

```js
import Home from './components/MyHome.vue'
```

2、在 routes 路由规则的数组中，声明对应的路由规则：

```js
routes: [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, name: 'login' },
  // Home 组件的路由规则
  { path: '/home', component: Home },
],
```

3、渲染 Home.vue 组件的基本结构：

```html
<template>
  <div class="home-container">
    <!-- 头部组件 -->
    <my-header></my-header>
    
    <!-- 主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏区域 -->
      <my-aside></my-aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body"></div>
    </div>
  </div>
</template>
```



## 6. 实现退出登录的功能

1、在 MyHeader.vue 组件中，为 退出登录 按钮绑定 click 事件处理函数：

```html
<!-- 右侧按钮区域 -->
<div class="layout-header-right">
  <button type="button" class="btn btn-light" @click="onLogout">退出登录</button>
</div>
```

2、在 methods 中声明如下的事件处理函数：

```js
methods: {
  // 退出按钮的点击事件处理函数
  onLogout() {
    // 移除 Token
    localStorage.removeItem('token')
    // 强制跳转到“登录页面”
    this.$router.push('/login')
  },
},
```



## 7. 全局控制路由的访问权限

1、在 router.js 模块中，通过 router 路由实例对象，全局挂载路由导航守卫：

```js
// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页面，直接放行
  if (to.path === '/login') return next()
  // 获取 Token 值，Token 值不存在，强制跳转到登录页面
  const token = localStorage.getItem('token')
  if (!token) { return next('/login') }
  // 存在 Token 值，直接放行
  next()
})
```



## 8. 将左侧菜单改造为路由链接

1、打开 MyAside.vue 组件，把 li 内部的纯文本升级改造为 `<router-link>` 组件：

```html
<template>
  <div class="layout-aside-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/orders">订单管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/settings">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>
```

2、打开 Home.vue 组件，在 右侧内容主体区域中声明子路由的占位符：

```html
<!-- 右侧内容主体区域 -->
<div class="home-main-body">
  <!-- **子路由的占位符** -->
  <router-view></router-view>
</div>
```

3、在 router.js 中导入左侧菜单对应的组件：

```js
import Users from './components/menus/MyUsers.vue'
import Rights from './components/menus/MyRights.vue'
import Goods from './components/menus/MyGoods.vue'
import Orders from './components/menus/MyOrders.vue'
import Settings from './components/menus/MySettings.vue'
```

4、通过 children 属性，为 home 规则定义子路由规则如下：

```js
// Home 组件的路由规则
{
  path: '/home',
  component: Home,
  // 用户访问 /home 时，重定向到 /home/users
  redirect: '/home/users',
  // 子路由规则
  children: [
    { path: 'users', component: Users },
    { path: 'rights', component: Rights },
    { path: 'goods', component: Goods },
    { path: 'orders', component: Orders },
    { path: 'settings', component: Settings },
  ],
},
```



## 9. 实现跳转到用户详情页的功能

1、在 MyUsers.vue 组件中，通过 v-for 指令循环渲染用户列表的数据，将详情改为路由链接：

```html
<tbody>
  <tr v-for="(item, i) in userlist" :key="item.id">
    <td>{{ i + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.age }}</td>
    <td>{{ item.position }}</td>
    <td>
      <router-link :to="'/home/users/' + item.id">详情</router-link>
    </td>
  </tr>
</tbody>
```

2、在 router.js 中导入用户详情页组件：

```js
import UserDetail from './components/user/MyUserDetail.vue'
```

3、在 home 规则的 children 节点下，声明 用户详情页 的路由规则：

```js
// 子路由规则
children: [
  { path: 'users', component: Users },
  { path: 'rights', component: Rights },
  { path: 'goods', component: Goods },
  { path: 'orders', component: Orders },
  { path: 'settings', component: Settings },
  // 用户详情页的路由规则
  { path: 'users/:id', component: UserDetail, props: true },
],
```



## 10. 编程式导航实现后退功能

1、在 MyUserDetail.vue 组件中声明 props 参数，并在结构中直接使用路由参数：

```html
<template>
  <button type="button" class="btn btn-light btn-sm">后退</button>
  <h4 class="text-center">用户详情 --- {{ id }}</h4>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id'],
}
</script>
```

2、在 MyUserDetail.vue 组件中，为后退按钮绑定点击事件处理函数：

```html
<template>
  <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
  <h4 class="text-center">用户详情 --- {{ id }}</h4>
</template>

<script>
export default {
  name: 'MyUserDetail',
  props: ['id'],
  methods: {
    // 编程式导航实现后退功能
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
```



# 总结

- 能够知道如何在 vue 中配置路由
  - createRouter、app.use(router)
- 能够知道如何使用嵌套路由
  - 通过 children 属性进行路由嵌套、子路由的 hash 地址不要以 / 开头
- 能够知道如何实现动态路由匹配
  - 使用冒号声明参数项、this.$route.params、props: true
- 能够知道如何使用编程式导航
  - this.router.push、this.router.go(-1)
- 能够知道如何使用全局导航守卫
  - `路由实例.beforeEach((to, from, next) => { /* 必须调 next 函数 */ })`
