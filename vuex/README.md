# Vuex

## 1 Vuex概述

### 1.1组件之间共享数据的方式

- 1 父向子传值: v-bind属性绑定
- 2 子向父传值: v-on事件绑定
- 3 兄弟组件之间共享数据: EventBus
  - $on接收数据的那个组件
  - $emit 发送数据的那个组件

### 1.2 Vuex是什么

Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的数据共享。

![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202208271204173.png)

### 1.3 使用Vuex统一管理状态的好处

1. 能够在vuex中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间地数据共享，提高开发效率
3. 存储在vuex中的数据都是响应式的，能够实时保持数据与页面的同步

### 1.4 什么样的数据适合存储到Vuex中

一般情况下，只有组件之间共享的数据，有必要存储到vuex中;对于组件中的私有数据,依旧存储在组件自身的data中即可。

- 使用Vuex管理数据的好处：
  A.能够在vuex中集中管理共享的数据，便于开发和后期进行维护。
  B.能够高效的实现组件之间的数据共享，提高开发效率。
  C.存储在vuex中的数据是响应式的，当数据发生改变时，页面中的数据也会同步更新。

## 2 Vuex的基本使用

### 2.1 图形化界面使用

- 1.`vue ui`
- 2.新建项目vuex_demo1–>手动–>Babel、Vuex、Linter、Use config files–>标准配置文件–>存预设–>运行。

### 2.2 命令行方式使用

- 1.安装vuex依赖包：`npm install vuex --save`
- 2.导入vuex包，安装到vue中

```js
import Vuex from 'vuex '
Vue.use (Vuex)
```

- 3.创建Vuex对象store，并暴露出去

```js
const store = new Vuex.Store({
    //state中存放的就是全局共享的数据
    state:{ count: 0 }
})
```

state中存放的就是共享的数据了，state可以看成组件中的data
祖先新增store键和Vuex实例对象值（这里以儿子和爷爷为例），爷爷中定义了，爸爸和儿子都能用（祖先组件中保存vuex对象，则后代都能用）

- 4.在new Vue实例期间，将store对象挂载到vue实例中

```js
new Vue ({
     el :' #app' ,
     render: h => h(app),
     router,
     //将创建的共享数据对象，挂载到Vue实例中
     //所有的组件，就可以直接从store 中获取全局的数据了
     store
})
```

- 5.使用（注意格式$this.store.state.数据）

## 3 Vuex中的核心概念

### 3.1 State

- State提供唯一的公共数据源，所有共享的数据都要统一放到Store中的State中存储
- 例如，打开项目中的store.js文件，在State对象中可以添加我们要共享的数据，如：count:0

```js
//创建store数据源，提供唯一公共数据
const store = new vuex. store ({
	state: { count: 0 }
})
```

在组件中访问State的两种方式：
方式一：

```
插值表达式，this.$store.state.全局数据名称

如：{{this.$store.state.count}}，template中this可以省略
```

方式二：

```js
// 1. 从vuex中按需导入mapState函数
import { mapState } from 'vuex'

// 2. 将全局数据，映射为当前组件的计算属性
computed: {
	...mapState(['count'])
}
```

### 3.2 Mutation

Mutation用于变更Store中的数据。
①只能通过mutation变更Store数据，不可以直接操作Store中的数据。
②通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。

this. $store. commit()是触发mutations的第一种方式

![image-20220829144332413](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202208291443466.png)

可以在触发mutations时传递参数：

1.打开store.js文件，在mutations中添加代码如下

```js
mutations: {
    addN(state,step){
      //第一个形参永远都是state也就是$state对象
      //第二个形参是调用add时传递的参数
      state.count+=step;
    }
  }
```

2.触发mutation,然后在Addition.vue中给按钮添加事件代码如下：

```js
<button @click="Add">+1</button>

methods:{
  Add(){
    //使用commit函数调用mutations中的对应函数，
    //第一个参数就是我们要调用的mutations中的函数名
    //第二个参数就是传递给add函数的参数
    this.$store.commit('addN',10)
  }
}
```

触发mutations的第二种方式:

```js
// 1.从vuex中按需导入mapMutations 函数
 import { mapMutations } from 'vuex'
// 2.将指定的mutations 函数，映射为当前组件的methods 函数
  methods:{
      //获得mapMutations映射的sub函数
      ...mapMutations(['sub']),
      //当点击按钮时触发Sub函数
      Sub(){
          //调用sub函数完成对数据的操作
          this.sub(10);
      }
  }
```

### 3.3 Action

- 在mutations中不能编写异步的代码，会导致vue调试器的显示出错。
- 在vuex中我们可以使用Action来执行异步操作。但是在Action中不能直接修改state中的数据，还是要通过context.commit()触发某个Mutation的方式间接变更数据。操作步骤如下：

触发actions的第一种方式：

1.打开store.js文件，修改Action，如下：

```js
const store = new Vue.Store({
mutations: {
    add(state){
      state.count++;
    }
  }
// 定义actions
actions: {
  addAsync(context){
    setTimeout(()=>{
      // 触发mutations
      context.commit('add');
    },2000)
  }
 }
})
```

2.触发，然后在Addition.vue中给按钮添加事件代码如下：

```js
<button @click="AddAsync">...+1</button>

methods:{
  AddAsync(){
  //触发actions的第一种方式,这里的dispatch 函数，专门用来触发action
    this.$store.dispatch('addAsync')
  }
}
```

触发actions异步任务时携带参数：
![在这里插入图片描述](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202208271204170.png)
触发actions的第二种方式：

```js
// 1.从vuex中按需导入mapActions 函数
import { mapActions } from 'vuex'
// 2.通过刚才导入的mapActions函数,将需要的actions函数，映射为当前组件的methods方法:
methods:{
  ...mapMutations(['subAsync'])
}
```

完整如下：

```javascript
import { mapState,mapMutations,mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  methods:{
      //获得mapMutations映射的sub函数
      ...mapMutations(['sub']),
      //当点击按钮时触发Sub函数
      Sub(){
          //调用sub函数完成对数据的操作
          this.sub(10);
      },
      //获得mapActions映射的addAsync函数
      ...mapActions(['subAsync']),
      asyncSub(){
          this.subAsync(5);
      }
  },
  computed:{
      ...mapState(['count'])    
  }
}
```

### 3.4 Getter

- Getter用于对Store中的数据进行加工处理形成新的数据，它只会包装Store中保存的数据，并不会修改Store中保存的数据，类似Vue的计算属性
- 当Store中的数据发生变化时，Getter生成的内容也会随之变化。

1.打开store.js文件，添加getters，如下：

```js
export default new Vuex.Store({
  .......
  getters:{
    //添加了一个showNum的属性
    showNum : state =>{
      return '最新的count值为：'+state.count;
    }
  }
})
```

2.然后打开Addition.vue

使用getters的第一种方式：

- 添加插值表达式使用getters。
  `{{this.$store.getters.showNum}}`

使用getters的第二种方式：

- 也可以在Addition.vue中，导入mapGetters，并将之映射为计算属性。

```js
import { mapGetters } from 'vuex'
computed:{
  ...mapGetters(['showNum'])
}
```





