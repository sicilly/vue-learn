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