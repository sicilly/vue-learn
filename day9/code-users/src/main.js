import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 1、导入axios
import axios from 'axios'

Vue.config.productionTip = false
// 2、配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
