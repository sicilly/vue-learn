<template>
  <div>
    <h1>App 根组件</h1>
    <hr />
<!-- 默认只展示按钮，添加一个引用名ipt -->
    <input type="text" class="form-control" v-if="inputVisible" ref="ipt" />
    <button type="button" class="btn btn-primary" v-else @click="showInput">展示 input 输入框</button>
  </div>
</template>

<script>
export default {
  name: 'MyApp',
  data() {
    return {
      inputVisible: false,  // 默认不展示文本框
    }
  },
  methods: {
    showInput() {
      // 要展示文本框并且立即获得焦点
      this.inputVisible = true
      // 组件的 $nextTick(cb) 方法，等DOM重新渲染后以后再执行cb回调，否则this.$refs.ipt就是undefined
      this.$nextTick(() => {
        console.log(this.$refs.ipt)
        // 获取到文本框的引用对象ipt，然后调用原生的 focus() 方法
        this.$refs.ipt.focus()
      })
    },
  },
}
</script>

<style lang="less" scoped>
input.form-control {
  width: 280px;
  display: inline;
  vertical-align: bottom;
}
</style>
