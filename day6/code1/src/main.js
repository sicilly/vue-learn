import { createApp } from 'vue'
//#region 导入 App 根组件
// import App from './components/01.watch/App.vue'
// import App from './components/02.life-cycle/App.vue'
// import App from './components/03.father-son/App.vue'
// import App from './components/04.brother/App.vue'
// import App from './components/05.provide&inject/App.vue'
//#endregion
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
