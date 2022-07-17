<template>
  <div>
    <p>count 的值是：{{ count }}</p>
    <!-- 绑定点击事件 -->
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  // 1. 用emits数组声明自定义事件countChange
  emits: ['countChange'],
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    add() {
      this.count++
      // 2. this.$emit() 触发自定义事件
      // 传入的第一个参数是事件名，第二个是要传递的自定义参数
      this.$emit('countChange', this.count)
    },
  },
}
</script>

<style></style>
