<template>
  <div>
    <h3>当前最新的count值为: {{ $store.state.count }}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    btnHandler1 () {
      this.$store.commit('add')
    },
    btnHandler2 () {
      this.$store.commit('addN', 3) // commit的作用就是调用某个mutation函数
    }
  }
}
</script>
