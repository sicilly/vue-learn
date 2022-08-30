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
    showNum (state) {
      return '当前最新的数量是【' + state.count + '】'
    }
  },
  // 只有mutations中定义的函数，才有权利修改state中的数据
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
    addAsync (context) {
      setTimeout(() => {
        // 在actions中，不能直接修改state中的数据
        // 必须通过context.commit()触发某个mutation才行
        context.commit('add')
      }, 1000)
    },
    addNAsync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  modules: {
  }
})
