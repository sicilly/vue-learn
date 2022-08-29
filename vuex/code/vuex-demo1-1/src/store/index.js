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
    // 第一个参数永远是state
    add (state) {
      state.count++
    },
    addN (state, step) {
      state.count += step
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    }
  },
  actions: {
  },
  modules: {
  }
})
