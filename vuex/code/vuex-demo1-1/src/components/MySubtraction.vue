<template>
  <div>
    <h3>当前最新的count值为: {{ count }}</h3>
    <button>-1</button>
  </div>
</template>

<script>
// 1. 从vuex中按需导入mapState函数
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  // 2. 将全局数据，映射为当前组件的计算属性
  computed: {
    ...mapState(['count'])
  }
}
</script>
