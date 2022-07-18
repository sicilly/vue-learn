<template>
  <div>
    <h3>数据发送方 --- count 的值为：{{ count }}</h3>
    <!-- 声明一个点击事件add -->
    <button type="button" class="btn btn-primary" @click="add">+1</button>
  </div>
</template>

<script>
// 1. 导入刚才定义的 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  name: 'MyLeft',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    // add事件
    add() {
      this.count++   // count自增
      // 2. 调用 bus.emit() 方法触发自定义事件countChange，并发送数据给兄弟组件
      bus.emit('countChange', this.count)
    },
  },
}
</script>

<style lang="less" scoped></style>
