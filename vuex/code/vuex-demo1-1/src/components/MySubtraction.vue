<template>
  <div>
    <!-- <h3>当前最新的count值为: {{ count }}</h3> -->
    <h3>{{ showNum }}</h3>
    <button @click="btnHandler1">-1</button>
    <button @click="subN(3)">-N</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(5)">-N Async</button>

  </div>
</template>

<script>
// 1. 从vuex中按需导入mapState函数
// 1.从vuex中按需导入mapMutations 函数
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {}
  },
  // 2. 将全局数据，映射为当前组件的计算属性
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  },
  // 2.将指定的mutations 函数，映射为当前组件的methods 函数
  methods: {
    ...mapMutations(['sub', 'subN']), // 获得mapMutations映射的sub函数
    ...mapActions(['subAsync', 'subNAsync']),
    btnHandler1 () { // 当点击按钮时触发btnHandler1函数
      this.sub()
    }
    // btnHandler2 () {
    //   this.subN(3)
    // },
    // btnHandler3 () {
    //   this.subAsync()
    // }
  }
}
</script>
