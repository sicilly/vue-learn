# demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 组合式api(Composition API)
使用传统的option配置方法写组件的时候问题， 随着业务复杂度越来越高， 代码量会不断的加大； 由于相关业务的代码需要遵循option的配置写到特定的区域，导致后续维护非常的复杂，同时代码可复用性
不高， 而composition-api就是为了解决这个问题而生的。
Composition API字面意思是组合API， 它是为了实现基于函数的逻辑复用机制而产生的。主要思想是， 我们将它们定义为从新的setup函数返回的JavaScript变量， 而不是将组件的功能(例如state、methods、computed等) 定义为对象属性。

## setup()方法应用

setup()函数是vue3中专门新增的方法，可以理解为composition api的入口

调用时机：

在创建组件之前被调用，所以在setup被执行时，组件实例并没有被创建，所以获取不到this。

```js
  // props 是传过来的属性
  // context 是上下文
  /*
  setup (props, context) {
    console.log('setup()---')
    console.log(this) // undefined
    console.log(props.one, props.two) // 1 2
    console.log(context.attrs.desc) // 没有用props接收到的属性可以在context.attrs中拿到
    console.log(context.slots.default())
    context.emit('myprint', '向父组件传数据')
  },
  */
  // 解构赋值的写法
  setup (props, { attrs, slots, emit }) {
    console.log('setup()---')
    console.log(this) // undefined
    console.log(props.one, props.two) // 1 2
    console.log(attrs.desc) // 没有用props接收到的属性可以在context.attrs中拿到
    console.log(slots.default())
    emit('myprint', '向父组件传数据')
  },
```

## Composition常用api

ref() 函数用来给定的值创建一个响应式的数据对象， ref() 的返回值是一个对象， 这个对象上只包含一个.value属性 

reactive是用来创建一个响应式对象 

将ref响应式数据挂载到reactive中， 当把ref() 创建出来值直接挂载到 reactive() 中时， 会自动把响应式数据对象的展开为原始的值， 不需要通 过.value就可以直接访问到 

双向绑定 

to Refs() 解构响应式对象 

readonly将响应式数据变回原始数据