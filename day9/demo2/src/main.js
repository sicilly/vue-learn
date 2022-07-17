import Vue from 'vue'  // 导入vue
import App from './App.vue'  // 导入待渲染的app.vue
import router from './router/index.js'  // 1、导入路由模块
import './element-ui'  // 导入element-ui组件
import { Loading } from 'element-ui'

// 1、导入axios
import axios from 'axios'

Vue.config.productionTip = false  // 不在终端显示vue的提示消息

// 2、配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:8080'  // 如果原接口存在跨域问题

// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios

// 声明变量，用来存储Loading组件的实例对象
let loadingInstance = null 

// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 调用Loading组件的service()方法，创建Loading组件的实例，并全屏展示 loading 效果
  loadingInstance = Loading.service({ fullscreen: true })
  // 配置 Token 认证
  config.headers.Authorization = 'Bearer xxx'
  console.log(config)
  // 这是固定写法，一定要return出去
  return config
})

// 配置响应拦截器
axios.interceptors.response.use(response => {
  // 关闭 loading 效果
  loadingInstance.close()
  // 这是固定写法，一定要return出去
  return response
})

// new一个vue对象
const app=new Vue({
  render: h => h(App),   // 指定要渲染的组件
  //2、挂载路由模块
  router,
})

app.$mount('#app')  // 挂载到指定的el区域
