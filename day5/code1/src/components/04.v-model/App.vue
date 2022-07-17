<template>
  <div>
    <h1>App 根组件  ---- {{count}}</h1>
    <button @click="count += 1">+1</button>
    <hr />

  <!-- 在 v-bind: 指令之前添加 v-model指令，绑定一个number自定义属性， 值为count-->
    <my-counter v-model:number="count"></my-counter>
  </div>
</template>

<script>
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      count: 0,
    }
  },
  components: {
    MyCounter
  }
}
</script>

<style></style>
