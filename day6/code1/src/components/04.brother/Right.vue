<template>
  <div>
    <h3>数据接收方 --- num 的值为：{{ num }}</h3>
  </div>
</template>

<script>
// 1. 导入刚才定义的 eventBus.js 模块，得到共享的 bus 对象
import bus from './eventBus.js'

export default {
  name: 'MyRight',
  data() {
    return {
      num: 0,
    }
  },
  // created生命周期：只要这个组件在内存中被创建完成了
  created() {
    // 2. 调用 bus.on() 方法，注册一个自定义事件countChange，把外界传过来的参数count存到自身的num
    bus.on('countChange', count => {
      this.num = count
    })
  },
}
</script>

<style lang="less" scoped></style>
