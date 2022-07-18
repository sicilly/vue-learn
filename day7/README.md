### 文章目录

- [一、ref 引用](#ref__1)
- - [1. 什么是 ref 引用](#1__ref__2)
  - [2. 引用 DOM 和组件实例](#2__DOM__30)
  - [3. this.$nextTick(cb) 方法](#3_thisnextTickcb__85)
- [二、动态组件](#_124)
- - [1. 什么是动态组件](#1__126)
  - [2. 动态组件渲染和 keep-alive](#2__keepalive_134)
- [三、插槽](#_194)
- - [1. 什么是插槽](#1__196)
  - [2. 插槽的基础用法](#2__204)
  - [3. 具名插槽](#3__236)
  - [4. 作用域插槽](#4__288)
  - - [4.1 表格使用作用域插槽](#41__328)
- [四、自定义指令](#_376)
- - [1. 什么是自定义指令](#1__378)
  - [2. 声明私有自定义指令的语法](#2__386)
  - [3. 声明全局自定义指令的语法](#3__414)
  - [4. updated 函数](#4_updated__431)
  - [5. 指令的参数值](#5__461)
- [五、table 案例](#table__491)
- - [1. 案例效果](#1__493)
  - [2. 实现步骤](#2__499)
  - [3. 搭建项目基本结构](#3__509)
  - - [3.1 初始化项目](#31__511)
    - [3.2 梳理项目结构](#32__525)
  - [4. 请求商品列表的数据](#4__580)
  - [5. 封装 MyTable 组件](#5__MyTable__628)
  - - [5.1 创建并使用 MyTable 组件](#51__MyTable__635)
    - [5.2 封装 MyTable 的模板结构](#52__MyTable__680)
    - [5.3 预留名称为 body 的作用域插槽](#53__body__718)
  - [6. 实现删除功能](#6__787)
  - [7. 实现添加标签的功能](#7__806)
  - - [7.1 渲染标签](#71__808)
    - [7.2 输入框的焦点事件](#72__833)
    - [7.3 为商品添加新的 tag 标签](#73__tag__879)
    - [7.4 添加回车和 esc 键盘事件](#74__esc__900)
- [总结](#_919)



# 一、ref 引用

## 1. 什么是 ref 引用

ref 用来辅助开发者在不依赖于 jQuery 的情况下，获取 DOM 元素或组件的引用。

每个 vue 的组件实例上，都包含一个 `$refs` 对象，里面存储着对应的 DOM 元素或组件的引用。默认情况下，组件的 **$refs** 指向一个空对象。

```html
<template>
  <h1>App 根组件</h1>
  <button type="button" @click="getRefs">获取 $refs 引用</button>
</template>

<script>
export default {
  methods: {
    getRefs() {
      // this 表示当前组件的实例对象 Proxy
      console.log(this)
      // this.$refs 默认指向空对象 {}
      console.log(this.$refs)
    },
  },
}
</script>
```



## 2. 引用 DOM 和组件实例

如果想要使用 ref 引用页面上的 DOM 元素或组件实例，则可以按照如下的方式进行操作：

```html
<template>
  <!-- 使用 ref 属性，可以为对应的 DOM 或者 组件 添加引用名称 -->
  <h1 ref="myr1">App 根组件</h1>
  <button type="button" @click="getRefs">获取 $refs 引用</button>
  <my-counter ref="counterRef"></my-counter>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  methods: {
    getRefs() {
      // 通过 this.$refs.引用名称，获取到 DOM 元素的引用
      console.log(this.$refs.myr1)
      // 操作 DOM 元素，把文本颜色改成红色
      this.$refs.myr1.style.color = 'red'

      // 通过 this.$refs.引用名称，可以获取到组件的实例
      console.log(this.$refs.counterRef)
      // 获取到组件实例后，就可以调用组件上的 methods 方法
      this.$refs.counterRef.reset()
    },
  },
  components: { MyCounter },
}
</script>
```

Counter 组件：

```html
<template>
  <h3>Counter 组件 --- {{ count }}</h3>
  <button type="button" @click="count += 1">+1</button>
</template>

<script>
export default {
  name: 'MyCounter',
  data() { return { count: 0 } },
  methods: {
    reset() { this.count = 0 },
  },
}
</script>
```



## 3. this.$nextTick(cb) 方法

需求：控制文本框和按钮的按需切换，然后让文本框自动获得焦点

通过布尔值来控制文本框与按钮的切换。当文本框展示出来之后，添加 ref 引用，并调用原生 DOM 的 .focus() 方法让它立即获得焦点，示例代码如下：

```html
<template>
  <input type="text" v-if="inputVisible" ref="ipt" />
  <button type="button" v-else @click="showInput">展示 input 输入框</button>
</template>

<script>
export default {
  data() {
    return { inputVisible: false }
  },
  methods: {
    showInput() {
      this.inputVisible = true
      // 打印这个 DOM 引用，会发现此时根本没有这个 DOM 元素，如果调用 focus() 则报错
      console.log(this.$refs.ipt); // undefined

      // 把对 input 的操作，推迟到下次 DOM 更新之后，这样页面上就有这个 DOM 元素了
      this.$nextTick(() => {
        console.log(this.$refs.ipt)
        // 获取到文本框的引用对象，然后调用 focus() 方法
        this.$refs.ipt.focus()
      })
    },
  },
}
</script>
```

组件的 `$nextTick(cb)` 方法，会把 cb 回调**推迟到下一个 DOM 更新周期之后执行**。通俗的理解是：等组件的 DOM 异步地重新渲染完成后，再执行 cb 回调函数。从而能保证 cb 回调函数可以操作到最新的 DOM 元素。



# 二、动态组件

## 1. 什么是动态组件

动态组件指的是动态切换组件的显示与隐藏。vue 提供了一个内置的 `<component>` 组件，专门用来实现组件的动态渲染。`<component>` 是组件的占位符，通过 **is** 属性动态指定要渲染的组件名称。

使用示例：`<component is="要渲染的组件的名称"></component>`



## 2. 动态组件渲染和 keep-alive

默认情况下，切换动态组件时无法保持组件的状态。此时可以使用 vue 内置的 `<keep-alive>` 组件保持动态组件的状态。当组件在 `<keep-alive>` 内被切换时，它的 `mounted` 和 `unmounted` 生命周期钩子不会被调用，取而代之的是 `activated` 和 `deactivated`。示例代码如下：

更多参数查看官网文档：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive

```html
<template>
  <!-- 3.点击按钮，动态切换组件名称 -->
  <button type="button" @click="comName = 'MyHome'">首页</button>
  <button type="button" @click="comName = 'MyMovie'">电影</button>

  <!-- 2.通过 is 属性，动态指定要渲染的组件名称，使用 keep-alive 包裹 component 使其保持组件的状态 -->
  <keep-alive>
    <component :is="comName"></component>
  </keep-alive>
</template>

<script>
import MyHome from './Home.vue'
import MyMovie from './Movie.vue'

export default {
  data() {
    return { comName: 'MyHome' } // 1.表示当前需要渲染的组件名称
  },
  components: { MyHome, MyMovie },
}
</script>
```

Home.vue

```html
<template>
  <h3>Home 组件 --- {{ count }}</h3>
  <button type="button" class="btn btn-primary" @click="count += 1">+1</button>
</template>

<script>
export default {
  name: 'MyHome',
  data() { return { count: 0 } },
  // 如果不使用 keep-alive 会发现，每次组件切换都会进行创建或销毁
  created() { console.log('created') },
  unmounted() { console.log('unmounted') }
}
</script>
```

Movie.vue

```html
<template>
  <h3>Movie 组件</h3>
</template>
```



# 三、[插槽](https://so.csdn.net/so/search?q=插槽&spm=1001.2101.3001.7020)

## 1. 什么是插槽

插槽（Slot）是 vue 为组件的封装者提供的能力。允许开发者在封装组件时，把不确定的、希望由用户指定的部分定义为插槽。可以把插槽认为是组件封装期间，为用户预留的内容的占位符。
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181633083.png)



## 2. 插槽的基础用法

在封装组件时，可以通过 `<slot>` 元素定义插槽，从而为用户预留内容占位符。示例代码如下：

```html
<template>
  <!-- 使用组件时，为插槽指定具体的内容 -->
  <my-com>
    <img src="../../assets/logo.png" alt />
  </my-com>
</template>
```

组件：

```html
<template>
  <p>这是第一个 p 标签</p>
  <!-- 通过 slot 标签，为用户预留内容占位符（插槽） -->
  <slot></slot>
  <!-- 可以在 solt 标签内指定默认内容，如果用户没有指定，那么默认内容就会显示 -->
  <slot>这是后备内容</slot>
  <p>这是最后一个 p 标签</p>
</template>
```

注意：

- 在封装组件时**没有预留任何插槽**，那用户提供的任何自定义内容都会**被丢弃**。
- 可以为`<slot>`插槽提供后备内容（默认内容）。如果使用者没有为插槽提供任何内容，则后备内容会生效。



## 3. 具名插槽

如果在封装组件时需要预留多个插槽节点，则需要为每个 `<slot>` 插槽指定具体的 name 名称。这种带有具体名称的插槽叫做具名插槽。示例代码如下：

```html
<template>
  <my-article>
    <!-- 在 template 上使用 v-slot 指定要放到具体插槽位置的名字 -->
    <template v-slot:header>
      <h1>滕王阁序</h1>
    </template>
    <!-- 如果提供方没有指定名字，默认就是 default -->
    <template v-slot:default>
      <p>豫章故郡，洪都新府。</p>
      <p>星分翼轸，地接衡庐</p>
      <p>襟三江而带五湖，控蛮荆而引瓯越。</p>
    </template>
    <!-- v-slot: 可以简写为一个 # 号 -->
    <template #footer>
      <p>落款：王勃</p>
    </template>
  </my-article>
</template>
```

组件：

```html
<template>
  <!-- 我们希望把页头放到这里，使用 name 指定为插槽指定名称 -->
  <header>
    <slot name="header"></slot>
  </header>
  <!-- 我们希望把主要内容放到这里，不写默认 default -->
  <main>
    <slot></slot>
  </main>
  <!-- 我们希望把页脚放到这里 -->
  <footer>
    <slot name="footer"></slot>
  </footer>
</template>
```

注意：

- 没有指定 name 名称的插槽，会有隐含的名称叫做 **default**。
- 向具名插槽提供内容时，可以在 `<template>` 元素上使用 `v-slot` 指令，指定要放到具体插槽位置的名称。
- 具名插槽的简写形式，把 (**v-slot:**) 替换为字符 **#**。例如：v-slot:header 可以被重写为 #header



## 4. [作用域](https://so.csdn.net/so/search?q=作用域&spm=1001.2101.3001.7020)插槽

在封装组件的过程中，可以为预留的 `<slot>` 插槽绑定 props 数据，这种带有 props 数据的 `<slot>` 叫做作用域插槽。示例代码如下：

```html
<template>
  <my-test>
    <!-- 使用自定义组件时，可以接收作用域插槽传递过来的数据，名字可以任意一般使用 scope -->
    <template #default="scope">
      <!-- scope 接收到的是一个对象，对象内包含插槽绑定的 info 和 msg -->
      <p>{{ scope }}</p>
      <p>{{ scope.info.address }}</p>
    </template>
  </my-test>
</template>
```

组件：

```html
<template>
  <h3>这是 Test 组件</h3>
  <!-- 为插槽绑定数据 -->
  <slot :info="infomation" :msg="message"></slot>
</template>

<script>
export default {
  data() {
    return {
      infomation: { phone: '138xxxx6666', address: '中国北京' },
      message: 'abc'
    }
  },
}
</script>
```



### 4.1 表格使用作用域插槽

作用域插槽对外提供的数据对象，可以用解构赋值简化数据的接收过程。自定义单元格的渲染代码如下：

```html
<my-table>
  <!-- 作用域插槽对外提供的数据对象，可以通过解构赋值简化接收的过程 -->
  <template #default="{ user }">
    <td>{{ user.id }}</td>
    <td>{{ user.name }}</td>
    <td>
      <input type="checkbox" :checked="user.state" />
    </td>
  </template>
</my-table>
```

组件：封装组件过程中，可以通过**作用域插槽**把表格每一行的数据传递给组件的使用者。

```html
<template>
  <table>
    <tbody>
      <!-- 循环渲染表格数据，下面的 slot 是一个作用域插槽 -->
      <tr v-for="item in list" :key="item.id">
        <slot :user="item"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: '张三', state: true },
        { id: 2, name: '李四', state: false },
        { id: 3, name: '赵六', state: false },
      ],
    }
  },
}
</script>
```



# 四、自定义指令

## 1. 什么是自定义指令

vue 官方提供了 v-for、v-model、v-if 等常用的内置指令。除此之外 vue 还允许开发者自定义指令。

vue 中的自定义指令分为两类，分别是：**私有**自定义指令、**全局**自定义指令



## 2. 声明私有自定义指令的语法

在每个 vue 组件中，可以在 directives 节点下声明私有自定义指令。在使用自定义指令时，需要加上 v- 前缀。示例代码如下：

```html
<template>
  <!-- 使用自定义指令需要加上 v- 的前缀 -->
  <input type="text" v-focus />
</template>

<script>
export default {
  directives: {
    // 自定义私有指令 focus
    focus: {
      // 当被绑定的元素插入到 DOM 中时，会自动触发 mounted 函数
      mounted(el) {
        console.log(el)
        el.focus() // 让被绑定饿元素自动获取焦点
      },
    },
  },
}
</script>
```



## 3. 声明全局自定义指令的语法

全局共享的自定义指令需要通过**单页面应用程序的实例对象**进行声明，示例代码如下：

```js
const app = createApp(App)

// 注册一个全局自定义指令 focus
app.directive('focus', {
  mounted(el) {
    el.focus()
  },
})
```



## 4. updated 函数

mounted 函数只在元素第一次插入 DOM 时被调用，当 DOM 更新时 mounted 函数不会被触发。 updated 函数会在每次 DOM 更新完成后被调用。示例代码如下：

```js
app.directive('focus', {
  mounted(el) { // 第一次插入 DOM 时触发这个函数
    console.log('mounted')
    el.focus()
  },
  updated(el) { // 每次 DOM 更新时都会触发 updated 函数
    console.log('updated')
    el.focus()
  },
})
```

如果 mounted 和updated 函数中的逻辑完全相同，则可以简写成如下格式：

```js
app.directive('focus', (el) => {
  // 在 mounted 和 updated 时都会触发相同的业务处理
  el.focus()
})
```

注意：在 vue2 的项目中使用自定义指令时，【 mounted -> bind 】【 updated -> update 】



## 5. 指令的参数值

在绑定指令时，可以通过**等号**的形式为指令绑定具体的参数值，示例代码如下：

```html
<template>
  <!-- 使用 v-color 指令时，可以通过等号为指令绑定值 -->
  <h3 v-color="'red'">MyHome 组件 --- {{ count }}</h3>

  <input type="text" v-focus v-color="'cyan'" />
  <button type="button" @click="count += 1">+1</button>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  },
  directives: {
    color: (el, binding) => {
      // binding.value 就是使用指令时，绑定的值
      el.style.color = binding.value
    },
  },
}
</script>
```



# 五、table 案例

## 1. 案例效果

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181633928.png)
**用到的知识点**：组件封装、具名插槽、作用域插槽、自定义指令



## 2. 实现步骤

1. 搭建项目的基本结构
2. 请求商品列表的数据
3. 封装 MyTable 组件
4. 实现删除功能
5. 实现添加标签的功能



## 3. 搭建项目基本结构

### 3.1 初始化项目

1、在终端运行如下的命令，初始化 vite 项目、安装 less 和 axios 包：

```shell
npm init vite table -- --template vue
cd table
npm install
npm i less -D
npm i axios -S
12345
```

### 3.2 梳理项目结构

1、重置 App.vue 根组件的代码结构：

```html
<template>
  <div>
    <h1>App 根组件</h1>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
}
</script>

<style lang="less" scoped></style>
12345678910111213
```

2、删除 components 目录下的 HelloWorld.vue 组件

3、重置 index.css 中的样式：

```css
:root {
  font-size: 12px;
}

body {
  padding: 8px;
}
1234567
```

4、把 bootstrap 相关的文件放入 src/assets 目录下，然后在 main.js 中导入 bootstrap.css 和 axios 并全局配置：

```js
import { createApp } from 'vue'
import App from './App.vue'
// 导入 bootstrap 样式表
import './assets/css/bootstrap.css'
import './index.css'
// 导入 axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://www.escook.cn'

// 将 axios 挂载为全局的 $http 自定义属性
const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')
1234567891011121314
```



## 4. 请求商品列表的数据

> 步骤分析：
>
> 1. 在 App.vue 组件的 data 中声明 goodslist 商品列表数据
> 2. 在 methods 中声明 getGoodsList 方法，用来从服务器请求商品列表的数据，然后进行赋值
> 3. 声明 created 生命周期函数，并调用 getGoodsList 方法
> 4. 最后使用 `npm run dev` 打开 vue 调试面板查看是否有数据

示例代码如下：

```html
<template>
  <div>
    <h1>App 根组件</h1>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      // 商品列表数据
      goodslist: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 初始化商品列表的数据
    async getGoodsList() {
      // 发起 Ajax 请求
      const { data: res } = await this.$http.get('/api/goods')
      // 请求失败
      if (res.status !== 0) return console.log('获取商品列表失败！')
      // 请求成功
      this.goodslist = res.data
    }
  },

}
</script>
1234567891011121314151617181920212223242526272829303132
```



## 5. 封装 MyTable 组件

> MyTable 组件的封装要求
>
> 1. 用户通过名为 data 的 prop 属性，为 MyTable.vue 组件指定数据源
> 2. 在 MyTable.vue 组件中，预留名称为 header 的**具名插槽**，和名为 body 的**作用域插槽**

### 5.1 创建并使用 MyTable 组件

1、在 components/my-table 目录下新建 MyTable.vue 组件：

```html
<template>
  <div>MyTable 组件</div>
</template>
<script>

export default {
  name: 'MyTable',
}
</script>

<style lang="less" scoped></style>
1234567891011
```

2、在 App.vue 组件中导入并注册 MyTable.vue 组件，并进行使用：

```html
<template>
  <div>
    <h1>App 根组件</h1>
    <hr />
    <!-- 使用表格组件 -->
    <my-table></my-table>
  </div>
</template>

<script>
// 导入 MyTable 组件
import MyTable from './components/my-table/MyTable.vue'

export default {
  name: 'MyApp',
  // 省略中间代码......
  // 注册 MyTable 组件
  components: { MyTable }
}
</script>
1234567891011121314151617181920
```



### 5.2 封装 MyTable 的模板结构

1、基于 bootstrap 提供的 [Tables](https://v4.bootcss.com/docs/content/tables/)，在 MyTable.vue 组件中渲染最基本的模板结构，同时，为了提高组件的复用性，最好把表格的**标题区域**预留为**具名插槽**，方便使用者自定义表格的标题：

```html
<template>
  <table class="table table-bordered table-striped">
    <!-- 表格的标题区域 -->
    <thead>
      <tr>
        <!-- 命名插槽 -->
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody></tbody>
  </table>
</template>
12345678910111213
```

2、在 App.vue 组件中，通过具名插槽的形式，为 MyTable.vue 组件指定标题名称：

```html
<!-- 使用表格组件 -->
<my-table>
  <!-- 具名插槽，让使用者自定义表格标题 -->
  <template v-slot:header>
    <th>#</th>
    <th>商品名称</th>
    <th>价格</th>
    <th>标签</th>
    <th>操作</th>
  </template>
</my-table>
1234567891011
```



### 5.3 预留名称为 body 的作用域插槽

1、在 MyTable.vue 组件的 props 节点中声明表格的 data 数据源：

```js
export default {
  name: 'MyTable',
  props: {
    // 表格的数据源
    data: {
      type: Array, required: true, default: [],
    },
  },
}
123456789
```

2、在 MyTable.vue 组件中，通过 v-for 指令循环渲染表格的数据行，为了提高组件的复用性，最好把表格里的 td 单元格定义为插槽，同时为了使用者能够自定义内容的渲染方式，需要把 body 定义为**作用域插槽**。

```html
<template>
  <table class="table table-bordered table-striped">
    <!-- 表格的标题区域 -->
    <thead>
      <tr>
        <!-- 命名插槽 -->
        <slot name="header"></slot>
      </tr>
    </thead>
    <!-- 表格的主体区域 -->
    <tbody>
      <!-- 使用 v-for 指令，循环渲染表格的数据行 -->
      <tr v-for="(item, index) in data" :key="item.id">
        <!-- 为数据行的 td 预留的作用域插槽 -->
        <slot name="body" :row="item" :index="index"></slot>
      </tr>
    </tbody>
  </table>
</template>
12345678910111213141516171819
```

3、在 App.vue 组件中，基于作用域插槽的方式渲染表格的数据：

```html
<!-- 使用表格组件，并绑定数据源 -->
<my-table :data="goodslist">
  <!-- 表格的标题 -->
  <template v-slot:header>
    <th>#</th>
    <th>商品名称</th>
    <th>价格</th>
    <th>标签</th>
    <th>操作</th>
  </template>

  <!-- 表格每行的单元格,解构赋值 -->
  <template v-slot:body="{ row, index }">
    <td>{{ index + 1 }}</td>
    <td>{{ row.goods_name }}</td>
    <td>￥{{ row.goods_price }}</td>
    <td>{{ row.tags }}</td>
    <td>
      <button type="button" class="btn btn-danger btn-sm">删除</button>
    </td>
  </template>
</my-table>
12345678910111213141516171819202122
```



## 6. 实现删除功能

1、为删除按钮绑定 click 事件处理函数：

```html
<button type="button" class="btn btn-danger btn-sm" @click="onRemove(row.id)">删除</button>
1
```

2、在 App.vue 组件的 methods 中声明事件处理函数如下：

```js
// 根据 Id 删除商品信息
onRemove(id) {
  this.goodslist = this.goodslist.filter(x => x.id !== id)
},
1234
```



## 7. 实现添加标签的功能

### 7.1 渲染标签

1、修改 App.vue 组件，根据 bootstrap 提供的 [Badge](https://v4.bootcss.com/docs/components/badge/#contextual-variations) 效果进行循环渲染商品的标签，同时添加 input 和 button 标签，并进行按需展示，代码如下：

```html
<td>
  <!-- 基于当前行的 inputVisible 属性，来控制 input 和 button 的按需展示 -->
  <input type="text" class="form-control form-control-sm ipt-tag" />
  <button type="button" class="btn btn-primary btn-sm">+Tag</button>
  <!-- 循环渲染标签信息 -->
  <span class="badge badge-warning ml-2" v-for="item in row.tags" :key="item">{{ item }}</span>
</td>
1234567
```

2、使用 v-if 和 v-else 指令和 button 的点击事件，控制 input 和 button 的按需展示。

```html
<!-- 基于当前行的 inputVisible 属性，来控制 input 和 button 的按需展示 -->
<input type="text" class="form-control form-control-sm ipt-tag" v-if="row.inputVisible" />
<button type="button" class="btn btn-primary btn-sm" v-else 
        @click="row.inputVisible = true">+Tag</button>
1234
```



### 7.2 输入框的焦点事件

> 需求分析：
>
> 1. 自定义 v-focus 指令，进行自动获取焦点
> 2. 使用 v-model 指令把 input 输入框的值双向绑定到 row.inputValue 中
> 3. 监听文本框的 blur 事件，触发事件时，把**当前行的数据**作为参数传递进去
> 4. 声明 onInputConfirm 事件处理函数，当失去焦点时，对输入框进行隐藏

1、在 App.vue 组件中，通过 directives 节点自定义 v-focus 指令如下：

```js
directives: {
  // 封装自动获得焦点的指令
  focus(el) {
    el.focus()
  },
},
123456
```

2、为输入框添加 v-focus 指令、 v-model 的双向绑定，以及失去焦点时隐藏输入框的事件处理函数：

```html
<input
  type="text"
  class="form-control form-control-sm ipt-tag"
  v-if="row.inputVisible"
  v-focus
  v-model.trim="row.inputValue"
  @blur="onInputConfirm(row)"
/>
12345678
```

3、在 App.vue 组件的 methods 节点下声明 onInputConfirm 事件处理函数：

```js
onInputConfirm(row) {
  // 清空文本框的值
  row.inputValue = ''
  // 隐藏文本框
  row.inputVisible = false
}
123456
```



### 7.3 为商品添加新的 tag 标签

1、进一步修改 onInputConfirm 事件处理函数如下：

```js
onInputConfirm(row) {
  // 1. 把用户在文本框中输入的值，预先转存到常量 val 中
  const val = row.inputValue
  // 2. 清空文本框的值
  row.inputValue = ''
  // 3. 隐藏文本框
  row.inputVisible = false
  // 4. 如果 val 值为空，或已存在 tags 数组中，则不添加
  if (!val || row.tags.indexOf(val) !== -1) return
  // 5. 将用户输入的内容，作为新标签 push 到当前行的 tags 数组中
  row.tags.push(val)
}
123456789101112
```



### 7.4 添加回车和 esc 键盘事件

当用户在文本框中敲击了**回车键**时，希望能够把当前输入的内容添加为 tag 标签。而敲击下 **esc** 键时，希望能够快速清空文本框的内容。就可以为文本框绑定 keyup 事件：

```html
<input
  type="text"
  class="form-control form-control-sm ipt-tag"
  v-if="row.inputVisible"
  v-focus
  v-model.trim="row.inputValue"
  @blur="onInputConfirm(row)"
  @keyup.enter="onInputConfirm(row)"
  @keyup.esc="row.inputValue = ''"
/>
12345678910
```



# 总结

- 能够知道如何使用 ref 引用DOM 和组件实例

  - 通过 ref 属性指定引用的名称、使用 `this.$refs` 访问引用实例

- 能够知道$nextTick的调用时机

  - 组件的 DOM 更新之后，才执行 $nextTick 中的回调

- 能够说出keep-alive元素的作用

  - 保持动态组件的状态

- 能够掌握插槽的基本用法

  - `<slot>` 标签、具名插槽、作用域插槽、v-slot: 简写为 #

- 能够知道如何自定义指令

  - 私有自定义指令、全局自定义指令