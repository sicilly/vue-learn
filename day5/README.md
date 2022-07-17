### 文章目录

- [一、props 验证](#props__1)
- - [1. 什么是 props 验证](#1__props__3)
  - [2. 对象类型的 props 节点](#2__props__11)
  - [3. 代码演示](#3__29)
- [二、计算属性](#_65)
- - [1. 什么是计算属性](#1__67)
  - [2. 如何声明计算属性](#2__77)
  - [3. 计算属性的使用注意点](#3__113)
  - [4. 计算属性案例](#4__122)
- [三、自定义事件](#_162)
- - [1. 什么是自定义事件](#1__164)
  - [2. 自定义事件的使用步骤](#2__171)
  - - [2.1 定义自定义事件](#21__177)
    - [2.2 监听自定义事件](#22__208)
- [四、组件上的 v-model](#_vmodel_235)
- - [1. 为什么需要在组件上使用 v-model](#1__vmodel_237)
  - [2. 在组件上使用 v-model 的步骤](#2__vmodel__247)
- [五、任务列表案例](#_303)
- - [1. 案例效果及知识点](#1__305)
  - [2. 整体实现步骤](#2__320)
  - - [2.1 使用 vite 初始化项目](#21__vite__323)
    - [2.2 梳理项目结构](#22__341)
    - [2.3 封装 todo-list 组件](#23__todolist__389)
    - - [2.3.1 创建并注册 TodoList 组件](#231__TodoList__391)
      - [2.3.2 基于 bootstrap 渲染列表组件](#232__bootstrap__442)
      - [2.3.3 渲染列表的 DOM 结构](#233__DOM__480)
    - [2.4 封装 todo-input 组件](#24__todoinput__533)
    - - [2.4.1 创建并注册 TodoInput 组件](#241__TodoInput__535)
      - [2.4.2 基于 bootstrap 渲染组件结构](#242__bootstrap__581)
      - [2.4.3 通过自定义事件向外传递数据](#243__604)
      - [2.4.4 实现添加任务的功能](#244__655)
    - [2.5 封装 todo-button 组件](#25__todobutton__693)
    - - [2.5.1 创建并注册 TodoButton 组件](#251__TodoButton__695)
      - [2.5.2 基于 bootstrap 渲染组件结构](#252__bootstrap__743)
      - [2.5.3 通过 props 指定默认激活的按钮](#253__props__772)
      - [2.5.4 通过 v-model 更新激活项的索引](#254__vmodel__816)
      - [2.5.5 通过计算属性动态切换列表的数据](#255__863)
- [总结](#_902)



# 一、props 验证

## 1. 什么是 props 验证

指的是：在封装组件时对外界传递过来的 props 数据进行**合法性的校验**，从而防止数据不合法的问题。
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751944.png)
使用数组类型的 props 节点的缺点：**无法为每个 prop 指定具体的数据类型。**



## 2. 对象类型的 props 节点

使用对象类型的 props 节点，可以对每个 prop 进行数据类型的校验，示意图如下：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751920.png)
对象类型的 props 节点提供了多种数据验证方案，例如：

- 基础的类型检查
  - 可以直接为组件的 prop 属性指定基础的校验类型，从而防止组件的使用者为其绑定错误类型的数据。
- 多个可能的类型
  - 如果某个 prop 属性值的类型不唯一，此时可以通过数组的形式，为其指定多个可能的类型。
- 必填项校验
  - 如果组件的某个 prop 属性是必填项，必须让组件的使用者为其传递属性的值，可以使用配置对象的方式
- 属性默认值
  - 在封装组件时，可以为某个 prop 属性指定默认值
- 自定义验证函数
  - 在封装组件时，可以为 prop 属性指定自定义的验证函数，从而对 prop 属性的值进行更加精确的控制



## 3. 代码演示

对于上面几种方案的演示代码如下：

```js
export default {
  props: { // 支持的8种基础类型
    propA: String,   // 字符串类型
    propB: Number,   // 数字类型
    propC: Boolean,  // 布尔值类型
    propD: Array,    // 数组类型
    propE: Object,   // 对象类型
    propF: Date,     // 日期类型
    propG: Function, // 函数类型
    propH: Symbol,   // 符号类型
    propI: [String, Number], // 使用数组方式，表示支持多个类型，例如：字符串或数字类型
    // 通过配置对象的形式，定义 prorp 属性的验证规则
    propJ: {
      type: Number, // 属性的值必须是 Number 类型
      require: true, // 属性的值是必填项，如果没有指定 propJ 的值，会在终端进行警告提示
      default: 100 // 如果没有指定值，那么默认值为 100
    },
    // 自定义函数，进行规则处理
    type: {
      // 通过 vaildator 函数，对 propK 属性的值进行校验，属性值通过形参 value 接受
      vaildator(value) {
        // 返回 true 表示验证通过，只要匹配下面三个字符串中的一个就通过
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
  }
}
```

在App.vue中使用组件

```html
<my-count :count="99" :state="true" info="abc" type="success"></my-count>
```



# 二、计算属性

## 1. 什么是计算属性

计算属性本质上就是一个 function 函数，它可以**实时监听** data 中数据的变化，并 return 一个计算后的新值，可以被模板结构或 methods 方法使用。



## 2. 如何声明计算属性

计算属性需要以 function 函数的形式声明到组件的 `computed` 选项中，示例代码如下：

```html
<template>
  <input type="text" v-model.number="count" />
  <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
  <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
</template>

<script>
export default {
  data() {
    return { count: 1 }
  },
  computed: {
    plus() {
      console.log('计算属性被执行了')
      return this.count * 2
    },
  },
  // methods: {
  //   plus() {
  //     console.log('方法被执行了')
  //     return this.count * 2
  //   }
  // }
}
</script>
```

注意：计算属性侧重于得到一个计算的结果，因此计算属性中必须有 return 返回值！



**计算属性 vs 方法**

相对于方法来说，**计算属性会缓存计算的结果**，只有计算属性的**依赖项发生变化**时，才会重新进行运算。因此，计算属性的性能更好

```html
<p>{{ count }} 乘以 2 的值为：{{ plus() }}</p>
<p>{{ count }} 乘以 2 的值为：{{ plus() }}</p>
<p>{{ count }} 乘以 2 的值为：{{ plus() }}</p>

computed: {
    plus() {
    	console.log('计算属性被执行了')
    	return this.count * 2
    },
},
```

![image-20220717191102650](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171911718.png)

```html
<p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
<p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
<p>{{ count }} 乘以 2 的值为：{{ plus }}</p>

methods: {
	plus() {
		console.log('方法被执行了')
		return this.count * 2
	}
}
```

![image-20220717191122961](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171911022.png)

## 3. 计算属性的使用注意点

1. 计算属性必须定义在 computed 节点中
2. 计算属性必须是一个 function 函数
3. 计算属性必须有返回值
4. 计算属性必须当做普通属性使用



## 4. 计算属性案例

案例需求，使用计算属性动态计算：

- 已勾选的商品总个数
- 已勾选的商品总价
- 结算按钮的禁用状态

```js
// 其余代码省略，关键使用在于三个计算属性的使用
computed: {
  // 动态计算出勾选水果的总数量，如果勾选了，就 +1，最后即可得出总数
  total() {
    let t = 0
    this.fruitlist.forEach(x => {
      if (x.state) {
        t += x.count
      }
    })
    return t
  },
  // 已勾选商品的总价格
  amount() {
    let a = 0
    this.fruitlist
      .filter(x => x.state)
      .forEach(x => {
        a += x.price * x.count
      })
    return a
  },
  // 控制按钮的禁用状态
  isDisabled() {
    return this.total === 0
  }
},
```



# 三、自定义事件

## 1. 什么是自定义事件

在封装组件时，为了让组件的使用者可以监听到组件内状态的变化，此时需要用到组件的自定义事件。
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751013.png)



## 2. 自定义事件的使用步骤

在封装组件时：**声明**自定义事件，然后**触发**自定义事件

在使用组件时：**监听**自定义事件

### 2.1 定义自定义事件

开发者为自定义组件封装的自定义事件，必须事先在 `emits` 节点中声明，然后在 emits 节点下声明的自定义事件，可以通过 `this.$emit('自定义事件的名称')` 方法进行触发，调用 `this.$emit()` 方法时，可以通过第 2 个参数为自定义事件传参，示例代码如下：

```html
<template>
  <p>count 的值是：{{ count }}</p>
  <button @click="add">+1</button>
</template>

<script>
export default {
  name: 'MyCounter',
  // 1. 在 emits 节点中，声明 my-counter 组件的自定义事件
  emits: ['countChange'],
  data() {
    return { count: 0 }
  },
  methods: {
    add() {
      this.count++
      // 2. 使用 this.$emit() 触发自定义事件，并传递参数
      this.$emit('countChange', this.count)
    },
  },
}
</script>
```



### 2.2 监听自定义事件

在使用自定义的组件时，可以通过 `v-on` 的形式监听自定义事件。示例代码如下：

```html
<template>
  <h1>app 根组件</h1>
  <!-- 使用 v-on 指令绑定监听事件 -->
  <my-counter @countChange="getCount"></my-counter>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  methods: {
    getCount(val) { // 触发事件，并接受传递过来的参数
      console.log('触发了 countChange 自定义事件', val)
    },
  },
  components: { MyCounter }
}
</script>
```



# 四、组件上的 v-model

## 1. 为什么需要在组件上使用 v-model

v-model 是双向数据绑定指令，当需要维护**组件内外数据的同步**时，可以在组件上使用 v-model 指令。示意
图如下：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751627.png)

- 外界数据的变化会自动同步到 counter 组件中
- counter 组件中数据的变化，也会自动同步到外界



## 2. 在组件上使用 v-model 的步骤

1. 父组件通过 **v-bind:** 属性绑定的形式，把数据传递给子组件
2. 子组件中，通过 **props** 接收父组件传递过来的数据
   ![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751750.png)
3. 在 v-bind: 指令之前添加 **v-model** 指令
4. 在子组件中声明 **emits** 自定义事件，格式为 **update:** xxx
5. 调用 **$emit()** 触发自定义事件，更新父组件中的数据
   ![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751591.png)

父组件代码：

```html
<template>
  <h1>App 根组件 ---- {{ count }}</h1>
  <button @click="count += 1">+1</button>
  <hr />
  <my-counter v-model:num="count"></my-counter>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  data() {
    return { count: 0 }
  },
  components: { MyCounter }
}
</script>
```

子组件代码：

```html
<template>
  <p>count值是：{{ num }}</p>
  <button @click="add">+1</button>
</template>

<script>
export default {
  name: 'MyCounter',
  props: ['num'],
  emits: ['update:num'],
  methods: {
    add() {
      this.$emit('update:num', this.num + 1)
    }
  }
}
</script>
```



# 五、任务列表案例

## 1. 案例效果及知识点

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751619.png)

**用到的知识点**

1. vite 创建项目
2. 组件的封装与注册
3. props
4. 样式绑定
5. 计算属性
6. 自定义事件
7. 组件上的 v-model



## 2. 整体实现步骤

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171751616.png)

### 2.1 使用 vite 初始化项目

1、在终端运行以下的命令，初始化 vite 项目：

```shell
npm init vite todolist -- --template vue
```

2、安装依赖项以及 less 语法依赖：

```shell
cd todolist
npm install
npm i less -D
```



### 2.2 梳理项目结构

1、重置 index.css 中的全局样式如下：

```css
:root {
  font-size: 12px;
}
  
body {
  padding: 8px;
}
```

2、重置 App.vue 组件的代码结构如下：

```html
<template>
  <div>
    <h1>App 根组件</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true },
      ],
    }
  },
}
</script>
```

3、删除 components 目录下的 HelloWorld.vue 组件。然后运行起来

```shell
npm run dev
```



### 2.3 封装 todo-list 组件

#### 2.3.1 创建并注册 TodoList 组件

1、在 `src/components/todo-list/` 目录下新建 `TodoList.vue` 组件，并声明如下的 props 属性 ：

```html
<template>
  <div>TodoList 组件</div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    // 列表数据
    list: {
      type: Array,
      required: true,
      default: [],
    },
  },
}
</script>

<style lang="less" scoped>
</style>
```

2、在 App.vue 组件中导入并注册 TodoList.vue 组件，然后进行使用：

```html
<template>
  <h1>App 根组件</h1>
  <todo-list :list="todolist"></todo-list>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'

export default {
  // 省略其他代码......
  // 注册私有组件
  components: {
    TodoList
  },
}
</script>
```



#### 2.3.2 基于 bootstrap 渲染列表组件

1、将**资料**目录下的 css 文件夹拷贝到 src/assets/ 静态资源目录中。
2、在 main.js 入口文件中，导入 src/assets/css/bootstrap.css 样式表：

```js
import { createApp } from 'vue'
import App from './App.vue'

// 导入 bootstrap.css 样式表
import './assets/css/bootstrap.css'
import './index.css'

createApp(App).mount('#app')
```

3、根据 bootstrap 提供的列表组（https://v4.bootcss.com/docs/components/list-group/#with-badges）和复选框（https://v4.bootcss.com/docs/components/forms/#checkboxes-and-radios-1）渲染列表组件的基本效果：

```html
<template>
  <ul class="list-group">
    <!-- 列表组 -->
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <!-- 复选框 -->
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="customCheck1" />
        <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
      </div>
      <!-- 徽标效果 -->
      <span class="badge badge-success badge-pill">完成</span>
      <span class="badge badge-warning badge-pill">未完成</span>
    </li>
  </ul>
</template>
```

#### 2.3.3 为TodoList声明props属性

1、为了接受外界传递过来的列表数据，需要在TodoList组件中声明如下的props属性：

```js
export default {
  name: 'TodoList',
  // 为了接受外界传递过来的列表数据
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
  },
}
```

2、在App组件中通过list属性，将数据传递到TodoList组件之中：

```html
<todo-list :list="TodoList"></todo-list>
```



#### 2.3.4 渲染列表的 DOM 结构

1、通过 v-for 指令，为 li 标签循环渲染列表的 DOM 结构：

```html
<!-- 列表组 -->
<li class="list-group-item d-flex justify-content-between align-items-center"
  v-for="item in list" :key="item.id">
  <!-- 复选框 -->
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" :id="item.id" />
    <label class="custom-control-label" :for="item.id">{{ item.task }}</label>
  </div>
  <!-- 徽标 -->
  <span class="badge badge-success badge-pill">完成</span>
  <span class="badge badge-warning badge-pill">未完成</span>
</li>
```

2、通过 v-if 和 v-else 指令，按需渲染 badge 效果：

```html
<span class="badge badge-success badge-pill" v-if="item.done">完成</span>
<span class="badge badge-warning badge-pill" v-else>未完成</span>
```

3、通过 v-model 指令，双向绑定任务的完成状态：

```html
<!-- 注意：父组件通过 props 传递过来的 list 是引用类型，这里 v-model 双向绑定的结果是：用户修改的是 App 组件中数据的状态 -->
<input type="checkbox" class="custom-control-input" :id="item.id" v-model="item.done" />
```

4、通过 v-bind 属性绑定，动态切换元素的 class 类名：

```html
<label class="custom-control-label" :class="item.done ? 'delete' : ''"
  :for="item.id">{{ item.task }}</label>
```

5、在 TodoList 组件中声明如下的样式，美化当前组件的 UI 结构

```css
.list-group {
  width: 400px;
}
.delete {
  text-decoration: line-through;
}
```



### 2.4 封装 todo-input 组件

#### 2.4.1 创建并注册 TodoInput 组件

1、在 src/components/todo-input/ 目录下新建 TodoInput.vue 组件：

```html
<template>
  <div>TodoInput 组件</div>
</template>

<script>
export default {
  name: 'TodoInput',
}
</script>

<style lang="less" scoped>
</style>
```

2、在 App.vue 组件中导入并注册 TodoInput.vue 组件，并使用：

```html
<template>
  <h1>App 根组件</h1>
  <todo-list :list="todolist"></todo-list>
  <todo-input></todo-input>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/todo-input/TodoInput.vue'

export default {
  // 省略其他代码......
  // 注册私有组件
  components: {
    TodoList, TodoInput,
  },
}
</script>
```



#### 2.4.2 基于 bootstrap 渲染组件结构

1、根据 bootstrap 提供的 inline-forms（https://v4.bootcss.com/docs/components/forms/#inline-forms）渲染 TodoInput 组件的基本结构。

```html
<template>
  <!-- form 表单 -->
  <form class="form-inline">
    <div class="input-group mb-2 mr-sm-2">
      <div class="input-group-prepend">
        <div class="input-group-text">任务</div>
      </div>
      <!-- 文本输入框 -->
      <input type="text" class="form-control" placeholder="请填写任务信息" style="width: 356px;" />
    </div>
    <!-- 添加按钮 -->
    <button type="submit" class="btn btn-primary mb-2">添加新任务</button>
  </form>
</template>
```



#### 2.4.3 通过自定义事件向外传递数据

1、在 TodoList 组件的 data 中声明如下的数据：

```js
data() {
  return {
    // 新任务的名称
    taskname: '',
  }
},
```

2、为 input 输入框进行 v-model 的双向数据绑定：

```html
<input type="text" class="form-control" placeholder="请填写任务信息" style="width: 356px;"
       v-model.trim="taskname"/>
```

3、监听 form 表单的 submit 事件，阻止默认提交行为并指定事件处理函数：

```html
<form class="form-inline" @submit.prevent="onFormSubmit"></form>
```

4、声明自定义事件，然后在 methods 中 onFormSubmit 事件处理函数如下：

```js
export default {
  name: 'TodoInput',
  // 声明自定义事件
  emits: ['add'],
  data() {
    return { taskname: '' }
  },
  methods: {
    onFormSubmit() {
      // 1. 判断任务名称是否为空
      if (!this.taskname) return alert('任务名称不能为空！')
      // 2. 触发自定义的 add 事件，并向外界传递数据
      this.$emit('add', this.taskname)
      // 3. 清空文本框
      this.taskname = ''
    },
  },
}
```



#### 2.4.4 实现添加任务的功能

1、在 App.vue 组件中监听 TodoInput 组件自定义的 add 事件：

```html
<!-- 监听 TodoInput 的 add 自定义事件 -->
<todo-input @add="onAddNewTask"></todo-input>
```

2、在 data 中声明 nextId 来模拟 id 自增操作，并且在 methods 中声明 onAddNewTask 事件处理函数：

```js
export default {
  data() {
    return {
      // 省略其他代码......
      // 下一个可用的 Id
      nextId: 4,
    }
  },
  methods: {
    onAddNewTask(taskname) {
      // 1. 向任务列表中新增任务信息
      this.todolist.push({
        id: this.nextId,
        task: taskname,
        done: false, // 完成状态默认为 false
      })
      // 2. 让 nextId 自增+1
      this.nextId++
    },
  },
  // 省略其他代码......
}
```



### 2.5 封装 todo-button 组件

#### 2.5.1 创建并注册 TodoButton 组件

1、在 src/components/todo-button/ 目录下新建 TodoButton.vue 组件：

```html
<template>
  <div>TodoButton 组件</div>
</template>

<script>
export default {
  name: 'TodoButton',
}
</script>

<style lang="less" scoped></style>
```

2、在 App.vue 组件中导入并注册 TodoButton.vue 组件，并使用：

```html
<template>
  <h1>App 根组件</h1>
  <todo-list :list="todolist"></todo-list>
  <todo-input @add="onAddNewTask"></todo-input>
  <todo-button></todo-button>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/todo-input/TodoInput.vue'
// 导入 TodoButton 组件
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  // 省略其他代码......
  // 注册私有组件
  components: {
    TodoList, TodoInput, TodoButton,
  },
}
</script>
```



#### 2.5.2 基于 bootstrap 渲染组件结构

1、根据 bootstrap 提供的 Button group（https://v4.bootcss.com/docs/components/button-group/）渲染 Todobutton 组件的基本结构。

```html
<template>
  <div class="button-container mt-3">
    <div class="btn-group">
      <button type="button" class="btn btn-primary">全部</button>
      <button type="button" class="btn btn-secondary">已完成</button>
      <button type="button" class="btn btn-secondary">未完成</button>
    </div>
  </div>
</template>
```

2、通过 button-container 类名美化组件的样式：

```html
<style lang="less" scoped>
.button-container {
  width: 400px;
  text-align: center;
}
</style>
```



#### 2.5.3 通过 props 指定默认激活的按钮

1、在 TodoButton 组件中声明如下的 props，用来指定默认激活的按钮的索引：

```html
<script>
export default {
  name: 'TodoButton',
  props: {
    // 激活项的索引值
    active: {
      type: Number,
      required: true,
      // 默认激活索引值为 0 的按钮（全部：0，已完成：1，未完成：2）
      default: 0,
    },
  },
}
</script>
```

2、通过**动态绑定 class 类名**的方式控制按钮的激活状态：

```html
<button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'">全部</button>
<button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'">已完成</button>
<button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'">未完成</button>
```

3、在 App 组件中声明**默认激活项的索引**，并通过**属性绑定**的方式传递给 TodoButton 组件：

```js
data() {
  return {
    // ......
    activeBtnIndex: 0,
  }
},

<todo-button :active="activeBtnIndex"></todo-button>
```



#### 2.5.4 通过 v-model 更新激活项的索引

> 父 -> 子：通过 props 传递了激活项的索引（active）
> 子 -> 父：需要更新父组件中激活项的索引
> 这种场景下可以使用 v-model 指令，维护组件内外数据的同步。

1、为 TodoButton 组件中的三个按钮分别绑定 click 事件处理函数如下：

```html
<button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'"
  @click="onBtnClick(0)">全部</button>
<button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'"
  @click="onBtnClick(1)">已完成</button>
<button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'"
  @click="onBtnClick(2)">未完成</button>
```

2、声明自定义事件，用来更新父组件通过 v-model 指令传递过来的 props 数据：

```html
<script>
export default {
  name: 'TodoButton',
  // 声明和 v-model 相关的自定义事件
  emits: ['update:active'],
  // 省略中间代码......
  methods: {
    // 按钮的点击事件处理函数
    onBtnClick(index) {
      // 1. 如果当前点击按钮的索引值，等于 props 传递过来的索引值，则不用触发自定义事件
      if (index === this.active) return
      // 2. 通过 this.$emit() 方法触发自定义事件
      this.$emit('update:active', index)
    },
  },
}
</script>
```

3、修改 App 组件的 todo-button 进行 v-model 绑定

```html
<todo-button v-model:active="activeBtnIndex"></todo-button>
```



#### 2.5.5 通过计算属性动态切换列表的数据

> 点击不同的按钮，切换显示不同的列表数据。此时可以根据当前激活按钮的索引，动态计算出要显示的列表数据并返回即可！

1、在 App 根组件中声明如下的计算属性：

```js
computed: {
  // 根据激活按钮的索引值，动态计算要展示的列表数据
  tasklist() {
    // 对源数据进行 switch...case 的匹配，并返回计算之后的结果
    switch (this.activeBtnIndex) {
      case 0: // 全部
        return this.todolist
      case 1: // 已完成
        return this.todolist.filter(x => x.done === true)
      case 2: // 未完成
        return this.todolist.filter(x => x.done !== true)
    }
  }
},
```

2、在 App 根组件的 DOM 结构中，修改 TodoList 组件的 :list 的值：

```html
<template>
  <h1>App 根组件</h1>
  <!-- 最后把 todolist 修改为 tasklist -->
  <todo-list :list="tasklist"></todo-list>
  <!-- 监听 TodoInput 的 add 自定义事件 -->
  <todo-input @add="onAddNewTask"></todo-input>
  <!-- 使用 v-model 进行父子组件数据的双向绑定 -->
  <todo-button v-model:active="activeBtnIndex"></todo-button>
</template>
```



# 总结

- 能够知道如何对 props 进行验证
  - 数组格式、对象格式
  - type、default、required、validator
- 能够知道如何使用计算属性
  - computed 节点、必须 return 一个结果、缓存计算结果
- 能够知道如何为组件绑定自定义事件
  - v-on 绑定自定义事件、emits、$emit()
- 能够知道如何在组件上使用 v-model
  - 应用场景：实现组件内外的数据同步
  - v-model:props名称、emits、$emit(‘update:props名称’)