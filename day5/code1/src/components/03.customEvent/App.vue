<template>
  <div>
    <h1>app 根组件</h1>
    <hr />
<!-- v-on简写成@,要监听的事件名是countChange，然后自定义一个要触发的getCount函数 -->
    <my-counter @countChange="getCount"></my-counter>
  </div>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  methods: {
    // val是接收到的参数
    getCount(val) {
      console.log('触发了 countChange 自定义事件', val)
    },
  },
  components: {
    MyCounter,
  },
}
</script>

<style></style>
