import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 1
  },
  getters: {
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions: {
  },
  modules: {
  }
})
