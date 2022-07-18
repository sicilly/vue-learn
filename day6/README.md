### 文章目录

- [一、watch 侦听器](#watch__1)
- - [1. 什么是 watch 侦听器](#1__watch__3)
  - [2. watch 侦听器的基本语法](#2_watch__9)
  - [3. axios + watch 检测用户名是否可用](#3_axios__watch__39)
  - [4. immediate 选项](#4_immediate__56)
  - [5. deep 选项](#5_deep__76)
  - [6. 计算属性 vs 侦听器](#6__vs__108)
- [二、组件的生命周期](#_116)
- - [1. 组件运行的过程](#1__118)
  - [2. 如何监听组件的不同时刻](#2__130)
  - [3. 组件中的生命周期函数](#3__146)
  - [4. 完整的生命周期图示](#4__156)
- [三、组件之间的数据共享（重点）](#_164)
- - [1. 组件之间的关系](#1__166)
  - [2. 父子组件之间的数据共享](#2__179)
  - - [2.1 父组件向子组件共享数据](#21__187)
    - [2.2 子组件向父组件共享数据](#22__233)
    - [2.3 父子组件之间数据的双向同步](#23__292)
  - [3. 兄弟组件之间的数据共享](#3__342)
  - - [3.1 安装 mitt 依赖包](#31__mitt__349)
    - [3.2 创建公共的 EventBus 模块](#32__EventBus__357)
    - [3.3 在数据接收方自定义事件](#33__372)
    - [3.4 在数据接发送方触发事件](#34__398)
    - [3.5 测试兄弟组件](#35__426)
  - [4. 后代关系组件之间的数据共享](#4__450)
  - - [4.1 父节点通过 provide 共享数据](#41__provide__454)
    - [4.2 子孙节点使用响应式的数据](#42__488)
  - [5. vuex](#5_vuex_526)
  - [6. 总结](#6__532)
- [四、vue 3.x 中全局配置 axios](#vue_3x__axios_547)
- - [1. 为什么要全局配置 axios](#1__axios_549)
  - [2. 如何全局配置 axios](#2__axios_561)
- [五、购物车案例](#_570)
- - [1. 案例效果](#1__572)
  - [2. 实现步骤](#2__577)
  - [3. 初始化项目结构](#3__588)
  - [4. 封装 es-header 组件](#4__esheader__631)
  - - [4.1 创建并注册 EsHeader 组件](#41__EsHeader__633)
    - [4.2 封装 es-header 组件](#42__esheader__674)
  - [5. 基于 axios 请求商品列表数据](#5__axios__739)
  - - [5.1 请求商品列表数据](#51__741)
  - [6. 封装 es-footer 组件](#6__esfooter__783)
  - - [6.1 创建并注册 EsFooter 组件](#61__EsFooter__785)
    - [6.2 封装 es-footer 组件](#62__esfooter__831)
    - - [6.2.1 渲染组件的基础布局](#621__841)
      - [6.2.2 封装自定义属性](#622__913)
      - [6.2.3 封装自定义事件 fullChange](#623__fullChange_958)
  - [7. 封装 es-goods 组件](#7__esgoods__999)
  - - [7.1 创建并注册 EsGoods 组件](#71__EsGoods__1001)
    - [7.2 封装 es-goods 组件](#72__esgoods__1051)
    - - [7.2.1 渲染组件的基础布局](#721__1059)
      - [7.2.2 封装自定义属性](#722__1159)
      - [7.2.3 封装自定义事件 stateChange](#723__stateChange_1233)
  - [8. 实现合计、结算数量](#8__1288)
  - [9. 封装 es-counter 组件](#9__escounter__1326)
  - - [9.1 创建并注册 EsCounter 组件](#91__EsCounter__1328)
    - [9.2 封装 es-counter 组件](#92__escounter__1370)
    - - [9.2.1 渲染组件的基础布局](#921__1379)
      - [9.2.2 实现数值的渲染及加减操作](#922__1418)
      - [9.2.3 处理输入框的输入结果](#923__1485)
      - [9.2.4 更新购物车中商品的数量](#924__1541)
- [总结](#_1598)



# 一、watch 侦听器

## 1. 什么是 watch 侦听器

watch 侦听器允许开发者监视数据的变化，从而针对数据的变化做特定的操作。例如，监视用户名的变化并发起请求，判断用户名是否可用。



## 2. watch 侦听器的基本语法

开发者需要在 watch 节点下，定义自己的侦听器。实例代码如下：

```html
<template>
  <div>
    <h3>watch 侦听器的用法</h3>
    <input type="text" class="form-control" v-model.trim="username" />
  </div>
</template>

<script>
export default {
  name: 'MyWatch',
  data() {
    return { username: '' }
  },
  watch: {
    // 表示监听 username 值的变化，参数一：变化之后的值，参数二：变化之前的值
    username(newVal, oldVal) {
      console.log(newVal, oldVal)
    },
  },
}
</script>
```



## 3. [axios](https://so.csdn.net/so/search?q=axios&spm=1001.2101.3001.7020) + watch 检测用户名是否可用

[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020) username 值的变化，并使用 axios 发起 Ajax 请求，检测当前输入的用户名是否可用：

```js
watch: {
  async username(newVal, oldVal) {
    console.log(newVal, oldVal)
    // 使用 axios 发起请求，判断用户名是否可用
    const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
    console.log(res)
  },
}
```



## 4. immediate 选项

默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使用 immediate 选项。实例代码如下：

```js
watch: {
  username: {
    // handler 是固定写法，表示当 username 变化时调用 handler
    async handler(newVal, oldVal) {
      const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
      console.log(res)
    },
    // 表示组件加载完毕后，立即调用一次当前的 watch 侦听器
    immediate: true,
  },
}
```



## 5. deep 选项

当 watch 侦听的是一个对象，如果对象中的属性值发生了变化，则无法被监听到，此时需要使用 deep 选项。如果只想监听对象中单个属性的变化，可以不用 deep，代码示例如下：

```js
<input type="text" class="form-control" v-model.trim="info.username" />

data() {
  return {
    info: { username: 'zs', age: 20 },
  }
},

watch: {
  info: { // 表示监听 info 对象的变化
    async handler(newVal) {
      const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal.username)
      console.log(res)
    },
    // 需要使用 deep 选项，否则 username 的值无法被监听到，因为 info 是一个对象
    deep: true,
  },
  // 也可以只想监听 info.username 属性值的变化，此时可以不用 deep
  'info.username': {
    async handler(newVal) {
      const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
      console.log(res)
    },
  },
}
```



## 6. 计算属性 vs 侦听器

- 计算属性和侦听器侧重的应用场景不同
- **计算属性**侧重于监听多个值的变化，最终计算并**返回一个新值**
- **侦听器**侧重于监听单个数据的变化，最终执行特定的业务处理，**不需要有任何返回值**



# 二、组件的[生命周期](https://so.csdn.net/so/search?q=生命周期&spm=1001.2101.3001.7020)

## 1. 组件运行的过程

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172231204.png)

组件的生命周期（Life Cycle）指的是：组件从**创建** -> **运行**（渲染） -> **销毁**的整个过程，强调的是一个**时间段**。

生命周期函数：是由 vue 框架提供的内置函数，会伴随着组件的生命周期，自动按次序执行。

注意：生命周期强调的是时间段，生命周期函数强调的是时间点。



## 2. 如何监听组件的不同时刻

vue 框架为组件内置了不同时刻的生命周期函数，生命周期函数会伴随着组件的运行而**自动调用**。例如：

- 当组件在内存中被**创建完毕**之后，会自动调用 `created` 函数
- 当组件被成功的**渲染到页面上**之后，会自动调用 `mounted` 函数
- 当组件**被销毁完毕**之后，会自动调用 `unmounted` 函数

**如何监听组件的更新**

当组件的 data 数据更新之后，vue 会自动重新渲染组件的 DOM 结构，从而保证 View 视图展示的数据和 Model 数据源保持一致。

当组件被重新渲染完毕之后，会自动调用 updated 生命周期函数。



## 3. 组件中的生命周期函数

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-b8E06QPB-1637674107948)(image/image-20211013114930688.png)]](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172231273.png)

注意：在实际开发中，created 是最常用的生命周期函数！

疑问：为什么不在 beforeCreate 中发 AJAX 请求初始数据？因为在 beforeCreate 这个阶段是无法访问到 data 里面数据的，即便发起了请求，但是请求到的数据是无法挂载到 data 中进行使用的



## 4. 完整的生命周期图示

可以参考 vue 官方文档给出的生命周期图示，进一步理解组件生命周期执行的过程：[生命周期图示](https://v3.cn.vuejs.org/guide/instance.html#生命周期图示)
![实例的生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)



# 三、组件之间的数据共享（重点）

## 1. 组件之间的关系

在项目开发中，组件之间的关系分为如下 3 种，示意图如下：

1. 父子关系(e.g.  A和B)
2. 兄弟关系(e.g.  B和C、B和F)
3. 后代关系(e.g.  A和D)

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172231272.png)



## 2. 父子组件之间的数据共享

父子组件之间的数据共享又分为：

1. 父 -> 子共享数据
2. 子 -> 父共享数据
3. 父 <-> 子双向数据同步

### 2.1 父组件向子组件共享数据

![image-20220718112459095](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181124210.png)

父组件通过 **v-bind 属性绑定**向子组件共享数据。同时，子组件需要使用 **props** 接收数据。示例代码如下：

**父组件**：定义按钮让 count 自增，通过 v-bind: 的形式，把数据传递给子组件

```html
<template>
  <h1>App 根组件 -- {{ count }}</h1>
  <button type="button" class="btn btn-primary" @click="count += 1">+1</button>
  <hr />
  <!-- 3. 以标签形式使用子组件，使用 v-bind 绑定 -->
  <my-son :num="count"></my-son>
</template>

<script>
// 1. 导入子组件
import MySon from './Son.vue'

export default {
  data() {
    return { count: 0 }
  },
  // 2. 注册子组件
  components: { MySon },
}
</script>
```

**子组件**：使用 props 属性接收父组件传递过来的数据

```html
<template>
  <h3>Son 子组件 --- {{ num }}</h3>
</template>

<script>
export default {
  name: 'MySon',
  props: ['num'],
}
</script>
```

### 2.2 子组件向父组件共享数据

![image-20220718112415315](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181124404.png)

子组件通过自定义事件的方式向父组件共享数据。示例代码如下：

**父组件**：使用 v-on 监听子组件的自定义事件，子组件使用 this.$emit() 时，v-on 就会监听到然后做对应的处理

```html
<template>
  <h1>App 根组件 -- {{ count }}</h1>
  <hr />
  <!-- 1. 使用 v-on 监听子组件的自定义 -->
  <my-son @numchange="getNum"></my-son>
</template>

<script>
import MySon from './Son.vue'

export default {
  data() {
    return { count: 0 }
  },
  methods: {
    // 2. 通过形参接受子组件传递过来的值
    getNum(num) { this.count = num }
  },
  components: { MySon },
}
</script>
```

**子组件**：通过 emits 声明自定义事件，当方法被调用时，使用 `this.$emit()` 触发自定义事件，更新父组件

```html
<template>
  <h3>Son 子组件 --- {{ num }}</h3>
  <button type="button" class="btn btn-danger" @click="add">+1</button>
</template>

<script>
export default {
  name: 'MySon',
  // 1.声明自定义事件
  emits: ['numchange'],
  data() {
    return { num: 0 }
  },
  methods: {
    add() {
      this.num++
      // 2. 数据变化时，触发自定义事件
      this.$emit('numchange', this.num)
    },
  },
}
</script>
```

### 2.3 父子组件之间数据的双向同步

父组件在使用子组件期间，可以使用 v-model 指令维护组件内外数据的双向同步：

![image-20220718113442260](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181134332.png)

父组件：

```html
<template>
  <h1>App 根组件 -- {{ count }}</h1>
  <button type="button" @click="count += 1">+1</button>
  <hr />
  <my-son v-model:num="count"></my-son>
</template>

<script>
import MySon from './Son.vue'

export default {
  data() {
    return { count: 0 }
  },
  components: { MySon },
}
</script>
```

子组件：

```html
<template>
  <h3>Son 子组件 --- {{ num }}</h3>
  <button type="button" @click="add">+1</button>
</template>

<script>
export default {
  name: 'MySon',
  props: ['num'], // props 接受父组件的值
  emits: ['update:num'], // 此处事件需要为 update
  methods: {
    add() {
      this.$emit('update:num', this.num + 1)
    },
  },
}
</script>
```



## 3. 兄弟组件之间的数据共享

兄弟组件之间实现数据共享的方案是 EventBus。可以借助于第三方的包 mitt 来创建 eventBus 对象，从而实
现兄弟组件之间的数据共享。示意图如下：
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172232128.png)

### 3.1 安装 mitt 依赖包

在项目中运行如下的命令，安装 mitt 依赖包：

```shell
npm install mitt -D
```

### 3.2 创建公共的 EventBus 模块

在项目中创建公共的 eventBus 模块如下：

```js
// eventBus.js 文件

// 导入 miit 包
import mitt from 'mitt'

// 创建 EventBus 实例对象，然后将对象共享出去
const bus = mitt()
export default bus
```

### 3.3 在数据接收方自定义事件

在数据接收方，调用 `bus.on('事件名称', 事件处理函数)` 方法注册一个自定义事件。示例代码如下：

```html
<template>
  <h3>数据接收方 --- num 的值为：{{ num }}</h3>
</template>

<script>
// 1. 导入刚才定义的 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  name: 'MyAccept',
  data() { return { num: 0 } },
  created() {
    // 2. 调用 bus.on() 方法，注册一个自定义事件，通过事件处理函数的形参接受数据
    bus.on('countChange', count => {
      this.num = count
    })
  },
}
</script>
```

### 3.4 在数据接发送方触发事件

在数据发送方，调用 `bus.emit('事件名称', 要发送的数据)` 方法触发自定义事件。示例代码如下：

```html
<template>
  <h3>数据发送方 --- count 的值为：{{ count }}</h3>
  <button type="button" @click="add">+1</button>
</template>

<script>
// 1. 导入刚才定义的 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  name: 'MySend',
  data() { return { count: 0 } },
  methods: {
    add() {
      this.count++
      // 2. 调用 bus.emit() 方法触发自定义事件，并发送数据
      bus.emit('countChange', this.count)
    },
  },
}
</script>
```

### 3.5 测试兄弟组件

在根组件中注册并使用，然后进行测试

```html
<template>
  <!-- 使用组件 -->
  <my-send></my-send>
  <hr />
  <my-accept></my-accept>
</template>

<script>
import MySend from './Send.vue'
import MyAccept from './Accept.vue'

export default {
  components: { MyAccept, MySend },
}
</script>
```



## 4. 后代关系组件之间的数据共享

后代关系组件之间共享数据，指的是父节点的组件向其子孙组件（比如B向G，B向H）共享数据。此时组件之间的嵌套关系比较复杂，可以使用 provide 和 inject 实现后代关系组件之间的数据共享。

![image-20220718134357715](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181343770.png)

### 4.1 父节点通过 provide 共享数据

父节点的组件可以通过 provide 方法，对其子孙组件共享数据：

```html
<template>
  <h1>App 根组件 - {{ color }}</h1>
  <button type="button" @click="color = 'blue'">Toggle Blue</button>
  <hr />
  <level-two></level-two>
</template>

<script>
import LevelTwo from './LevelTwo.vue'
import { computed } from 'vue'

export default {
  data() {
    // 1. 定义父组件要向子孙组件共享的数据
    return { color: 'red' }
  },
  // 2. provide 函数的 return 对象中，就包含了要向子孙组件共享的数据
  provide() {
    return {
      // 使用 computed 函数，可以把共享的数据包装成响应式的数据 
      color: computed(() => this.color),
      count: 1,
    }
  },
  components: { LevelTwo },
}
</script>
```

### 4.2 子孙结点通过inject接收数据

![image-20220718134651430](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181346513.png)

### 4.3 父节点对外共享响应式的数据

![image-20220718135425448](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207181354515.png)



### 4.4 子孙节点使用响应式的数据

如果父级节点共享的是响应式的数据（会被修改的），则子孙节点必须以 .value 的形式进行使用。示例代码如下：

```html
<template>
  <h3>Level Two 二级组件</h3>
  <hr />
  <level-three></level-three>
</template>

<script>
import LevelThree from './LevelThree.vue'

export default {
  name: 'LevelTwo',
  components: { LevelThree },
}
</script>

<template>
  <!-- 响应式数据，必须以 .value 形式进行使用 -->
  <h5>Level Three 三级组件 --- {{ color.value }} --- {{ count }}</h5>
</template>

<script>
export default {
  name: 'LevelThree',
  // 子孙节点，使用 inject 接收父节点向下共享的 color 数据
  inject: ['color', 'count'],
}
</script>
```



## 5. vuex

vuex 是终极的组件之间的数据共享方案。在企业级的 vue 项目开发中，vuex 可以让组件之间的数据共享变得**高效、清晰、且易于维护。**
![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172231694.png)



## 6. 总结

- 父子关系
  - 父 -> 子 属性绑定
  - 子 -> 父 事件绑定
  - 父 <-> 子 组件上的 v-model
- 兄弟关系
  - EventBus
- 后代关系
  - provide & inject
- 全局数据共享
  - vuex



# 四、vue 3.x 中全局配置 axios

## 1. 为什么要全局配置 axios

在实际项目开发中，几乎每个组件中都会用到 axios 发起数据请求。此时会遇到如下两个问题：

- 每个组件中都需要导入 axios（代码臃肿）
- 每次发请求都需要填写完整的请求路径（不利于后期的维护）

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172232194.png)

## 2. 如何全局配置 axios

在 main.js 入口文件中，通过 `app.config.globalProperties` 全局挂载 axios，示例代码如下：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172232171.png)

main.js

```js
import { createApp } from 'vue'

import App from './components/06.network/App.vue'

import './assets/css/bootstrap.css'
import './index.css'

import axios from 'axios'

// 用createApp创建单页面实例，用app接收
const app = createApp(App)
// 请求路径
axios.defaults.baseURL = 'https://www.escook.cn'
// 通过app.config.globalProperties全局挂载 axios
app.config.globalProperties.$http = axios
// 调用mount方法
app.mount('#app')
```

PostInfo.vue

```js
<template>
  <div>
    <h3>Post Info 组件</h3>
    <hr />

    <button type="button" class="btn btn-success" @click="postInfo">发起 POST 请求</button>
  </div>
</template>

<script>
export default {
  name: 'PostInfo',
  methods: {
    async postInfo() {
      const { data: res } = await this.$http.post('/api/post', { name: 'zs', age: 20 })
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped></style>
```

get请求同理，发送params参数即可

```js
async getInfo() {
    const { data: res } = await this.$http.get('/api/get', {
    	params: {
    		name: 'ls',
    		age: 33,
    	},
    })
    console.log(res)
},
```

# 五、购物车案例

## 1. 案例效果

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207172232349.png)



## 2. 实现步骤

1. 初始化项目基本结构
2. 封装 EsHeader 组件
3. 基于 axios 请求商品列表数据
4. 封装 EsFooter 组件
5. 封装 EsGoods 组件
6. 封装 EsCounter 组件



## 3. 初始化项目结构

1、运行如下的命令，初始化 vite 项目，启用 less 语法，安装 axios ：

```shell
npm init vite cart -- --template vue
cd cart
npm install
npm i less -D
npm i axios -S
```

2、清空 App.vue 组件内容，删除 components 目录下的 HelloWorld.vue 组件

3、初始化 index.css 全局样式如下：

```css
:root {
  font-size: 12px;
}
```

4、把 bootstrap 相关的文件放入 src/assets 目录下，然后在 main.js 中导入 bootstrap.css 和 axios 并全局配置

```json
import { createApp } from 'vue'
import App from './App.vue'
// 导入 bootstrap
import './index.css'
import './assets/css/bootstrap.css'
// 导入 axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://www.escook.cn'

// 将 axios 挂载为全局的 $http 自定义属性
const app = createApp(App)
app.config.globalProperties.$http = axios
app.mount('#app')
```



## 4. 封装 es-header 组件

### 4.1 创建并注册 EsHeader 组件

1、在 src/components/es-header/ 目录下新建 EsHeader.vue 组件：

```html
<template>
  <div>EsHeader 组件</div>
</template>

<script>
export default {
  name: 'EsHeader',
}
</script>

<style lang="less" scoped></style>
```

2、在 App.vue 组件中导入并注册 EsHeader.vue 组件，并在 template 中使用：

```html
<template>
  <div>
    <!-- 使用 es-header 组件 -->
    <es-header></es-header>
  </div>
</template>

<script>
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'

export default {
  // 注册 header 组件
  components: { EsHeader, },
}
</script>
```



### 4.2 封装 es-header 组件

> 封装需求：
>
> 1. 允许用户自定义 title 标题内容、color 文字颜色、bgcolor 背景颜色、fsize 字体大小
> 2. es-header 组件必须**固定定位**到页面顶部的位置，**高度**为 45px，**文本居中**，z-index 为 999

1、在 es-header 组件中封装以下的 props 属性：

```js
export default {
  name: 'EsHeader',
  props: {
    // 标题内容
    title: { type: String, default: 'es-header', },
    // 背景颜色
    bgcolor: { type: String, default: '#007BFF', },
    // 文字颜色
    color: { type: String, default: '#ffffff', },
    // 文字大小
    fsize: { type: Number, default: 12, },
  }
}
```

2、渲染标题内容，并动态为 DOM 元素绑定**行内**的 style 样式对象，添加 header-container 类名，进一步美化：

```html
<template>
  <div class="header-container" :style="{ color: color, backgroundColor: bgcolor, fontSize: fsize + 'px' }">{{ title }}</div>
</template>

<style lang="less" scoped>
.header-container {
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
```

3、在 App 根组件中使用 es-header 组件时，通过 title 属性指定标题内容，并给 div 添加 css 样式：

```html
<div class="app-container"> 
  <!-- 使用 es-header 组件，指定 title 属性的值 -->
  <es-header title="购物车案例"></es-header>
</div>

<style lang="less" scoped>
/* 给最外层 div 添加 */
.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}
</style>
```



## 5. 基于 axios 请求商品列表数据

### 5.1 请求商品列表数据

> 在 App.vue 根组件进行
>
> 1. 在 data 中声明 goodslist 用于存放商品列表数据
> 2. 声明 created 生命周期函数，进行**预调用** getGoodsList 方法（该方法用于获取商品列表数据）
> 3. 在 methods 节点中，声明刚才预调用的 getGoodsList 方法，使用 axios 发送请求

```html
<script>
import EsHeader from './components/es-header/EsHeader.vue'

export default {
  data() {
    return {
      // 商品列表的数据
      goodslist: [],
    }
  },
  // 组件实例创建完毕之后的生命周期函数
  created() {
    // 调用 methods 中的 getGoodsList 方法，请求商品列表的数据
    this.getGoodsList()
  },
  methods: {
    // 请求商品列表的数据
    async getGoodsList() {
      // 1. 通过组件实例 this 访问到全局挂载的 $http 属性，并发起 AJAX 数据请求
      const { data: res } = await this.$http.get('/api/cart')
      // 2. 判断请求是否成功
      if (res.status !== 200) return alert('请求商品列表数据失败！')
      // 3. 将请求到的数据存储到 data 中，供页面渲染期间使用
      this.goodslist = res.list
    },
  },
  components: { EsHeader, },
}
</script>
```



## 6. 封装 es-footer 组件

### 6.1 创建并注册 EsFooter 组件

1、在 src/components/es-footer/ 目录下新建 EsFooter.vue 组件：

```html
<template>
  <div>EsFooter 组件</div>
</template>

<script>
export default {
  name: 'EsFooter',
}
</script>

<style lang="less" scoped></style>
```

2、在 App.vue 组件中导入并注册 EsFooter.vue 组件，并在 template 中使用：

```html
<template>
  <div class="app-container">
    <!-- 使用 es-header 组件，指定 title 属性的值 -->
    <es-header title="购物车案例"></es-header>
    <!-- 使用 es-footer 组件 -->
    <es-footer></es-footer>
  </div>
</template>

<script>
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'
// 导入 footer 组件
import EsFooter from './components/es-footer/EsFooter.vue'

export default {
  // 省略中间代码......
  // 注册 header、footer 组件
  components: { EsHeader, EsFooter, },
}
</script>
```



### 6.2 封装 es-footer 组件

> 封装需求
>
> 1. es-footer 组件必须**固定定位到页面底部**的位置，**高度**为 50px，内容**两端贴边对齐**，zindex 为 999
> 2. 允许用户自定义 amount 总价格（单位是元），并在渲染时 保留两位小数
> 3. 允许用户自定义 total 总数量，并渲染到**结算按钮**中；如果要结算的商品数量为0，则**禁用**结算按钮
> 4. 允许用户自定义 isfull 全选按钮的选中状态
> 5. 允许用户通过**自定义事件**的形式，监听全选按钮**选中状态的变化** ，并获取到最新的选中状态

#### 6.2.1 渲染组件的基础布局

1、将 EsFooter.vue 组件在页面底部进行固定定位，然后根据 bootstrap 提供的 [Checkboxes](https://v4.bootcss.com/docs/components/forms/#checkboxes) 和 [Buttons](https://v4.bootcss.com/docs/components/buttons/#examples) 渲染左侧的全选按钮、合计对应的价格区域、与结算按钮

```html
<template>
  <div class="footer-container">
    <!-- 全选按钮 -->
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="fullCheck" />
      <label class="custom-control-label" for="fullCheck">全选</label>
    </div>

    <!-- 合计 -->
    <div>
      <span>合计：</span>
      <span class="amount">￥0.00</span>
    </div>

    <!-- 结算按钮 -->
    <button type="button" class="btn btn-primary">结算(0)</button>
  </div>
</template>
```

2、在当前组件的 `<style>` 节点中美化全选按钮、总价格、结算按钮的样式：

```css
<style lang="less" scoped>
.footer-container {
  // 设置宽度和高度
  height: 50px;
  width: 100%;
  // 设置背景颜色和顶边框颜色
  background-color: white;
  border-top: 1px solid #efefef;
  // 底部固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  // 内部元素的对齐方式
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 设置左右 padding
  padding: 0 10px;
}

.amount {
  color: red;
  font-weight: bold;
}

.btn-primary {
  // 设置固定高度、圆角效果、最小宽度
  height: 38px;
  border-radius: 19px;
  min-width: 90px;
}
</style>
```

3、在全局样式表 index.css 中覆盖全选按钮的圆角样式：

```css
.custom-checkbox .custom-control-label::before {
  border-radius: 1.25rem;
}
```



#### 6.2.2 封装自定义属性

1、在 EsFooter.vue 组件的 props 节点中，声明如下的自定义属性：

```js
export default {
  name: 'EsFooter',
  props: {
    // 已勾选商品的总价格
    amount: { type: Number, default: 0, },
    // 已勾选商品的总数量
    total: { type: Number, default: 0, },
    // 全选按钮的选中状态，true 表示选中，false 表示未选中
    isfull: { type: Boolean, default: false, },
  },
}
```

2、在 DOM 结构中渲染 amount 和 total 值，并**动态控制**结算按钮的状态，为复选框**动态绑定** ckecked 属性值：

```html
<template>
  <div class="footer-container">
    <!-- 全选按钮 -->
    <div class="custom-control custom-checkbox">
      <!-- 为复选框动态绑定 ckecked 属性值 -->
      <input type="checkbox" class="custom-control-input" id="fullCheck" :checked="isfull" />
      <label class="custom-control-label" for="fullCheck">全选</label>
    </div>

    <!-- 合计 -->
    <div>
      <span>合计：</span>
      <!-- 将 amount 的值保留两位小数 -->
      <span class="amount">￥{{ amount.toFixed(2) }}</span>
    </div>

    <!-- 结算按钮，disabled 的值为 true，表示禁用按钮 -->
    <button type="button" class="btn btn-primary" :disabled="total === 0">结算({{ total }})</button>
  </div>
</template>
```



#### 6.2.3 封装自定义事件 fullChange

目标：通过自定义事件 fullChange，把最新的选中状态传递给组件的使用者

1、监听复选框选中状态变化的 change 事件：

```html
<!-- 为复选框动态绑定 ckecked 属性值，添加 change 事件 -->
<input type="checkbox" class="custom-control-input" id="fullCheck"
  :checked="isfull" @change="onCheckBoxChange"/>
```

2、在 emits 中声明自定义事件，在 methods 中声明 onCheckBoxChange 事件处理函数，并通过 $emit() 触发自定义事件，将事件对象 e 获取到的最新选中状态，传递给当前组件的使用者：

```js
// 声明自定义事件
emits: ['fullChange'],
methods: {
  onCheckBoxChange(e) {
    // 触发自定义事件，e.target.checked 是复选框最新的选中状态
    this.$emit('fullChange', e.target.checked)
  },
},
```

3、在 App.vue 的 methods 中声明 onFullStateChange 函数，监听全选按钮状态的变化，然后修改每件商品的状态：

```js
// 监听全选按钮状态的变化，修改其他商品为全选按钮最新的选中状态
onFullStateChange(isFull) {
  this.goodslist.forEach(x => x.goods_state = isFull)
},
1234
<!-- 使用 es-footer 组件，自定义属性和事件 -->
<es-footer :isfull="false" :amount="0" :total="0" @fullChange="onFullStateChange"></es-footer>
```



## 7. 封装 es-goods 组件

### 7.1 创建并注册 EsGoods 组件

1、在 src/components/es-goods/ 目录下新建 EsGoods.vue 组件：

```html
<template>
  <div>EsGoods 组件</div>
</template>

<script>
export default {
  name: 'EsGoods',
}
</script>

<style lang="less" scoped></style>
```

2、在 App.vue 组件中导入并注册 EsGoods.vue 组件，并在 template 中使用：

```html
<template>
  <div class="app-container">
    <!-- 使用 es-header 组件，指定 title 属性的值 -->
    <es-header title="购物车案例"></es-header>
    <!-- 使用 es-goods 组件 -->
    <es-goods></es-goods>
    <!-- 使用 es-footer 组件，自定义属性和事件 -->
    <es-footer :isfull="false" :amount="0" :total="0" @fullChange="onFullStateChange"></es-footer>
  </div>
</template>

<script>
// 导入 header 组件
import EsHeader from './components/es-header/EsHeader.vue'
// 导入 footer 组件
import EsFooter from './components/es-footer/EsFooter.vue'
// 导入 goods 组件
import EsGoods from './components/es-goods/EsGoods.vue'

export default {
  // 省略中间代码....
  // 注册 header、footer、goods 组件
  components: { EsHeader, EsFooter, EsGoods },
}
</script>
```



### 7.2 封装 es-goods 组件

> 封装需求
>
> 1. 实现 EsGoods 组件的基础布局
> 2. 封装组件的 6 个**自定义属性**（id, thumb，title，price，count，checked）
> 3. 封装组件的**自定义事件** stateChange ，允许外界监听组件选中状态的变化

#### 7.2.1 渲染组件的基础布局

1、渲染 EsGoods 的基础 DOM 结构，然后根据 bootstrap 提供的 [Checkboxes](https://v4.bootcss.com/docs/components/forms/#checkboxes) 渲染商品缩略图之外包裹复选框：

```html
<template>
  <div class="goods-container">
    <!-- 左侧图片和复选框区域 -->
    <div class="left">
      <!-- 复选框 -->
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="customCheck1" />
        <!-- 将商品图片包裹于 label 之中，点击图片可以切换“复选框”的选中状态-->
        <label class="custom-control-label">
          <!-- 商品的缩略图 -->
          <img src alt="商品图片" class="thumb" />
        </label>
      </div>
    </div>

    <!-- 右侧信息区域 -->
    <div class="right">
      <!-- 商品名称 -->
      <div class="top">xxxx</div>
      <div class="bottom">
        <!-- 商品价格 -->
        <div class="price">￥0.00</div>
        <!-- 商品数量 -->
        <div class="count">数量</div>
      </div>
    </div>
  </div>
</template>
```

2、美化组件的布局样式，并覆盖复选框的默认样式，然后添加顶边框：

```html
<style lang="less" scoped>
.goods-container {
  display: flex;
  padding: 10px;
  // 左侧图片的样式
  .left {
    margin-right: 10px;
    // 商品图片
    .thumb {
      display: block;
      width: 100px;
      height: 100px;
      background-color: #efefef;
    }
  }
  // 右侧商品名称、单价、数量的样式
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .top {
      font-weight: bold;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
}
// 覆盖复选框的默认样式
.custom-control-label::before,
.custom-control-label::after {
  top: 3.4rem;
}
// 添加顶边框
.goods-container {
  display: flex;
  padding: 10px;
  // 最终生成的选择器为 .goods-container + .goods-container
  // 在 css 中，（+）是相邻兄弟选择器，表示：选择紧连着另一元素后的元素，二者具有相同的父元素。
  + .goods-container {
    border-top: 1px solid #efefef;
  }
}
</style>
```

3、在 App.vue 组件中循环渲染 EsGoods.vue 组件：

```html
<!-- 使用 es-goods 组件 -->
<es-goods v-for="item in goodslist" :key="item.id"></es-goods>
```



#### 7.2.2 封装自定义属性

> 每件商品的唯一标识符（id）、缩略图（thumb）、商品名称（title）、单价（price）、数量（count）、勾选状态（checked）这 6 个属性

1、在 EsGoods.vue 组件的 props 节点中，声明如下的自定义属性，然后在 DOM 结构中渲染商品的信息数据：

```html
<template>
  <div class="goods-container">
    <!-- 左侧图片和复选框区域 -->
    <div class="left">
      <!-- 复选框，动态绑定 input 的 id 属性和 label 的 for 属性值 -->
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" :id="id" :checked="checked" />
        <!-- 将商品图片包裹于 label 之中，点击图片可以切换“复选框”的选中状态-->
        <label class="custom-control-label" :for="id">
          <img :src="thumb" alt="商品图片" class="thumb" />
        </label>
      </div>
    </div>

    <!-- 右侧信息区域 -->
    <div class="right">
      <!-- 商品名称 -->
      <div class="top">{{ title }}</div>
      <div class="bottom">
        <!-- 商品价格 -->
        <div class="price">￥{{ price.toFixed(2) }}</div>
        <!-- 商品数量 -->
        <div class="count">数量：{{ count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EsGoods',
  props: {
    // 1. 唯一的 key 值，id 值可以是字符串也可以是数值
    id: { type: [String, Number], required: true, },
    // 2. 商品的缩略图
    thumb: { type: String, required: true, },
    // 3. 商品的名称
    title: { type: String, required: true, },
    // 4. 单价
    price: { type: Number, required: true, },
    // 5. 数量
    count: { type: Number, required: true, },
    // 6. 商品的勾选状态
    checked: { type: Boolean, required: true, },
  },
}
</script>
```

2、在 App.vue 组件中使用 EsGoods.vue 组件时，动态绑定对应属性的值：

```html
<!-- 使用 es-goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
></es-goods>
```

#### 7.2.3 封装自定义事件 stateChange

点击复选框时，可以把最新的勾选状态，通过自定义事件的方式传递给组件的使用者。

1、在 EsGoods.vue 组件中，监听 checkbox 选中状态变化的事件：

```html
<input type="checkbox" class="custom-control-input" :id="id" :checked="checked" @change="onCheckBoxChange"/>
```

2、在 emits 中声明自定义事件，在 methods 中声明 onCheckBoxChange 事件处理函数，并通过 $emit() 触发自定义事件，将事件对象 e 获取到的最新选中状态，传递给当前组件的使用者：

```js
emits: ['stateChange'],
methods: {
  onCheckBoxChange(e) {
    // 向外发送的数据是一个对象，包含了 { id, value } 两个属性，e.target.checked 是最新的勾选状态
    this.$emit('stateChange', {
      id: this.id,
      value: e.target.checked,
    })
  },
},
```

3、在 App.vue 的 methods 中声明 onGoodsStateChange 处理函数，并在使用时监听 stateChange 事件，进行测试：

```js
// 监听商品选中状态变化的事件
onGoodsStateChange(e) {
  // 1. 根据 id 进行查找（注意：e 是一个对象，包含了 id 和 value 两个属性）
  const findResult = this.goodslist.find(x => x.id === e.id)
  // 2. 找到了对应的商品，则更新其选中状态
  if (findResult) {
    findResult.goods_state = e.value
  }
},
123456789
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
  @stateChange="onGoodsStateChange"
></es-goods>
```



## 8. 实现合计、结算数量

需求：动态统计已勾选商品的总价格、总数量，而这两个依赖于 goodslist 中每一件商品信息的变化，此场景下适合使用**计算属性**。

1、在 App.vue 中声明如下的计算属性：

```js
computed: {
  // 已勾选商品的总价
  amount() {
    let a = 0
    this.goodslist
      .filter(x => x.goods_state)
      .forEach(x => {
        a += x.goods_price * x.goods_count
      })
    return a
  },
  // 已勾选商品的总数量
  total() {
    let t = 0
    this.goodslist
      .filter(x => x.goods_state)
      .forEach(x => (t += x.goods_count))
    return t
  },
},
```

2、在 App.vue 中使用 EsFooter.vue 组件时，动态绑定已勾选商品的总价格和总数量：

```html
<!-- 使用 es-footer 组件，自定义属性和事件 -->
<es-footer :isfull="false" :amount="amount" :total="total" @fullChange="onFullStateChange"></es-footer>
```



## 9. 封装 es-counter 组件

### 9.1 创建并注册 EsCounter 组件

1、在 src/components/es-counter/ 目录下新建 EsCounter.vue 组件：

```html
<template>
  <div>EsCounter 组件</div>
</template>

<script>
export default {
  name: 'EsCounter',
}
</script>

<style lang="less" scoped></style>
```

2、在 EsGoods.vue 组件中导入并注册 EsCounter.vue 组件：

```js
// 导入 counter 组件
import EsCounter from '../es-counter/EsCounter.vue'
export default {
  name: 'EsGoods',
  // 注册 counter 组件
  components: { EsCounter }
}
```

3、在 EsGoods.vue 的 template 模板结构的商品数量 div 中使用 EsCounter.vue 组件：

```html
<!-- 商品数量 -->
<div class="count">
  <!-- 使用 es-counter 组件，替换掉：数量：{{ count }} -->
  <es-counter></es-counter>
</div>
```



### 9.2 封装 es-counter 组件

> 封装需求
>
> 1. 渲染组件的**基础布局**
> 2. 实现数量值的**加减操作**，并处理 min **最小值**
> 3. 使用 watch **侦听器**处理文本框输入的结果，封装 numChange **自定义事件**传递给使用者
> 4. 父组件更新购物车商品的数量

#### 9.2.1 渲染组件的基础布局

1、基于 bootstrap 提供的 Buttons https://v4.bootcss.com/docs/components/buttons/#examples 和 form-control 渲染组件的基础布局：

```html
<template>
  <div class="counter-container">
    <!-- 数量 -1 按钮 -->
    <button type="button" class="btn btn-light btn-sm">-</button>
    <!-- 输入框 -->
    <input type="number" class="form-control form-control-sm iptnum" />
    <!-- 数量 +1 按钮 -->
    <button type="button" class="btn btn-light btn-sm">+</button>
  </div>
</template>
```

2、美化当前组件的样式：

```html
<style lang="less" scoped>
.counter-container {
  display: flex;
  // 按钮的样式
  .btn {
    width: 25px;
  }
  // 输入框的样式
  .ipt-num {
    width: 34px;
    text-align: center;
    margin: 0 4px;
  }
}
</style>
```

#### 9.2.2 实现数值的渲染及加减操作

> 思路分析：
>
> 1. 加减操作需要依赖于 EsCounter 组件的 data 数据
> 2. 初始数据依赖于父组件通过 props 传递进来
> 3. 购买商品时，购买数量最小值为 1
>
> 将父组件传递进来的 props 初始值转存到 data 中，形成 EsCounter 组件的内部状态！

1、在 EsCounter.vue 中声明 props，然后将 props 的 num 初始值转存到 data 中，因为 data 中的数据是**可读可写**的，然后在 methods 中声明按钮点击的事件处理函数：

```js
export default {
  name: 'EsCounter',
  props: {
    // 数量值【只读数据】
    num: { type: Number, default: 0 },
    // 最小值，属性的值默认为 NaN，表示不限制最小值
    min: { type: Number, default: NaN },
  },
  data() {
    return {
      // 内部状态值【可读可写的数据】，通过 this 可以访问到 props 中的初始值
      number: this.num,
    }
  },
  methods: {
    // -1 按钮的事件处理函数
    onSubClick() {
      // 判断条件：min 的值存在，且 number - 1 之后小于 min
      if (!isNaN(this.min) && this.number - 1 < this.min) return
      this.number -= 1
    },
    // +1 按钮的事件处理函数
    onAddClick() { this.number += 1 },
  },
}
```

2、把 data 中的 number 双向绑定到 input 输入框，然后为 -1 和 +1 按钮绑定点击事件：

```html
<!-- 数量 -1 按钮 -->
<button type="button" class="btn btn-light btn-sm" @click="onSubClick">-</button>
<!-- 输入框，绑定在 data 中的 number -->
<input type="number" class="form-control form-control-sm iptnum" v-model.number="number" />
<!-- 数量 +1 按钮 -->
<button type="button" class="btn btn-light btn-sm" @click="onAddClick">+</button>
```

> **注意**：不要直接把 num 通过 v-model 指令双向绑定到 input 输入框，因为 vue 规定 props 的值是只读的！例如下面的做法是错误的：
>
> ```html
> <!-- Warning 警告：不要模仿下面的操作 -->
> <input type="number" class="form-control form-control-sm ipt-num" v-model.number="num" />
> ```

3、在 EsGoods.vue 中通过属性绑定，将数据传递到 EsCounter.vue 组件中，并指定 min 最小值：

```html
<!-- 使用 es-counter 组件，替换掉：数量：{{ count }} ，并指定数量的最小值为 1 -->
<es-counter :num="count" :min="1"></es-counter>
```

#### 9.2.3 处理输入框的输入结果

> 思路分析：
>
> 1. 将输入的新值转化为整数
> 2. 如果转换的结果不是数字或小于 1 ，则强制 number 的值等于1
> 3. 如果新值为小数，则把转换的结果赋值给 number
> 4. 使用自定义事件的方式，把最新的数据传递给组件的使用者

1、为输入框的 v-model 指令添加 .lazy 修饰符（当输入框触发 change 事件时更新 vmodel 所绑定到的数据源）：

```html
<input type="number" class="form-control form-control-sm iptnum" v-model.number.lazy="number" />
```

2、在 EsCounter.vue 组件中声明自定义事件，通过 watch 侦听器监听 number 数值的变化，然后触发自定义事件：

```js
emits: ['numChange'],
watch: {
  // 监听 number 数值的变化
  number(newVal) {
    // 1. 将输入的新值转化为整数
    const parseResult = parseInt(newVal)
    // 2. 如果转换的结果不是数字，或小于1，则强制 number 的值等于 1
    if (isNaN(parseResult) || parseResult < 1) {
      this.number = 1
      return
    }
    // 3. 如果新值为小数，则把转换的结果赋值给 number
    if (String(newVal).indexOf('.') !== -1) {
      this.number = parseResult
      return
    }
    // 4. 触发自定义事件，把最新的 number 数值传递给组件的使用者
    this.$emit('numChange', this.number)
  },
},
```

3、在 EsGoods.vue 组件中监听 EsCounter.vue 组件的自定义事件，并在 methods 中声明对应的事件处理函数：

```html
<!-- 使用 es-counter 组件替换：数量：{{ count }} ，并指定数量的最小值为1，和监听自定义事件-->
<es-counter :num="count" :min="1" @numChange="getNumber"></es-counter>
12
// 监听数量变化的事件
getNumber(num) {
  console.log(num)
},
```

#### 9.2.4 更新购物车中商品的数量

> 思路分析：
>
> 1. 在 EsGoods 组件中声明自定义事件，然后触发自定义事件，向外传递数据对象 { id, value }
> 2. 在 EsGoods 组件中获取到最新的商品数量
> 3. 在 App 根组件中监听 EsGoods 组件的自定义事件，并根据 id 更新对应商品的数量

1、在 EsGoods.vue 中声明自定义事件 countChange，然后修改前面的 getNumber 函数，进行触发自定义事件：

```js
emits: ['stateChange', 'countChange'],

// 监听数量变化的事件
getNumber(num) {
  // 触发自定义事件，向外传递数据对象 { id, value }，
  this.$emit('countChange', {
    id: this.id, // 商品的 id
    value: num, // 最新的数量
  })
},
```

2、在 App.vue 根组件中使用 EsGoods.vue 组件时，监听它的自定义事件 countChange ：

```html
<!-- 使用 es-goods 组件 -->
<es-goods
  v-for="item in goodslist"
  :key="item.id"
  :id="item.id"
  :thumb="item.goods_img"
  :title="item.goods_name"
  :price="item.goods_price"
  :count="item.goods_count"
  :checked="item.goods_state"
  @stateChange="onGoodsStateChange"
  @countChange="onGoodsCountChange"
></es-goods>
```

3、在 methods 中声明对应的事件处理函数：

```js
// 监听商品数量变化的事件
onGoodsCountChange(e) {
  // 1. 根据 id 进行查找
  const findResult = this.goodslist.find(x => x.id === e.id)
  // 2. 找到了对应的商品，则更新其数量
  if (findResult) {
    findResult.goods_count = e.value
  }
}
```



# 总结

- 能够掌握 watch 侦听器的基本使用
  - 定义最基本的 watch 侦听器
  - immediate、 deep、监听对象中单个属性的变化
- 能够知道 vue 中常用的生命周期函数
  - 创建阶段、运行阶段、销毁阶段
  - created、mounted
- 能够知道如何实现组件之间的数据共享
  - 父子组件、兄弟组件、后代组件
- 能够知道如何在 vue3 的项目中全局配置 axios
  - main.js 入口文件中进行配置
  - app.config.globalProperties.$http = axios