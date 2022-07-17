<template>
  <div>
    <!-- 渲染出number -->
    <p>count值是：{{number}}</p>
    <!-- 绑定点击事件add -->
    <button @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  // 用props接收父组件传过来的number
  props: ['number'],
  // 在子组件中声明 emits 自定义事件，格式为 update: xxx
  emits: ['update:number'],
  methods: {
    add() {
      // 调用 $emit() 触发自定义事件，更新父组件中的数据
      this.$emit('update:number', this.number + 1)
    }
  }
}
</script>

<style></style>
