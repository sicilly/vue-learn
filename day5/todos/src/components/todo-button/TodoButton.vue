<template>
  <div class="mt-3 btn-container">
    <div class="btn-group" role="group" aria-label="Basic example">
      <!-- 动态绑定 class 类名的方式控制按钮的激活状态 -->
      <!-- 点击时触发自定义事件，把点击的按钮索引作为参数 -->
      <button type="button" class="btn" :class="active === 0 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(0)">全部</button>
      <button type="button" class="btn" :class="active === 1 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(1)">已完成</button>
      <button type="button" class="btn" :class="active === 2 ? 'btn-primary' : 'btn-secondary'" @click="onBtnClick(2)">未完成</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoButton',
  // 声明和 v-model 相关的自定义事件
  emits: ['update:active'],
  // 通过 props 指定默认激活的按钮
  props: {
    // 激活项的索引值
    active: {
      type: Number,
      required: true,
      default: 0,  // 默认激活索引值为 0 的按钮（全部：0，已完成：1，未完成：2）
    },
  },
  methods: {
    // 按钮的点击事件处理函数
    onBtnClick(index) {
      // 1. 如果当前点击按钮的索引值，等于 props 传递过来的索引值，则不用触发自定义事件
      if (index === this.active) return
      // 2. 通过 this.$emit() 方法触发自定义事件
      this.$emit('update:active', index)
    },
  },
}
</script>

<style lang="less" scoped>
.btn-container {
  width: 400px;
  text-align: center;
}
</style>
