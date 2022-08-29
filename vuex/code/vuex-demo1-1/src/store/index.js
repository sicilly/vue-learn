import Vue from 'vue' // 导入vue
import Vuex from 'vuex' // 导入vuex
// Vuex安装到项目中
Vue.use(Vuex)
// new了一个Vuex.Store构造函数的实例并暴露出去
export default new Vuex.Store({
  state: {
    count: 0 // 在全局提供一个共享的数据count
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
