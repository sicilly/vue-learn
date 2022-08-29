import Vue from 'vue' // 导入vue
import App from './App.vue' // 导入根组件
import store from './store' // 导入store中向外暴露的实例对象

Vue.config.productionTip = false
// new了一个Vue实例
new Vue({
  store, // 挂载store，这样vue中每一个组件都可以访问到store中共享的数据了
  render: h => h(App)
}).$mount('#app')
