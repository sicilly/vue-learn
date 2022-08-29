<template>
  <div>
    <!-- 3.使用组件 -->
    <my-addition></my-addition>
    <p>-----------------</p>
    <my-subtraction></my-subtraction>
  </div>
</template>

<script>
// 1.导入组件
import MyAddition from './components/MyAddition.vue'
import MySubtraction from './components/MySubtraction.vue'

export default {
  data () {
    return {}
  },
  // 2.注册组件
  components: {
    'my-addition': MyAddition,
    'my-subtraction': MySubtraction
  }
}
</script>

<style>

</style>
