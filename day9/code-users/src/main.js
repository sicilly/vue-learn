import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1、导入axios
import axios from 'axios'
// 导入element-ui 及其样式表
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 将ElementUI安装位vue的插件
Vue.use(ElementUI)
// 不在终端里显示vue的提示消息
Vue.config.productionTip = false

// 声明格式化时间的全局过滤器
Vue.filter('dateFormat', dtStr => {
  const dt = new Date(dtStr)
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

// 2、配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
