<template>
  <div>
    <h1>App 根组件 -- {{ count }}</h1>
    <button type="button" class="btn btn-primary" @click="count += 1">+1</button>
    <hr />

    <!-- 3. 以标签形式使用子组件 -->
    <!-- 父传子：v-bind属性绑定，把num传递给子组件，值是count -->
    <!-- 子传父：监听numchange事件，并且定义要触发的getNum事件 -->
    <!-- <my-son :num="count" @numchange="getNum"></my-son> -->

    <!-- 使用v-model实现父子组件数据双向同步，此时不用再监听numchange事件了 -->
    <my-son v-model:num="count"></my-son>
  </div>
</template>

<script>
// 1. 导入子组件
import MySon from './Son.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      count: 0,
    }
  },
  // methods: {  // 接收形参 
  //   getNum(num) {
  //     this.count = num
  //   }
  // },
  // 2. 注册子组件
  components: {
    MySon,
  },
}
</script>

<style lang="less" scoped></style>
