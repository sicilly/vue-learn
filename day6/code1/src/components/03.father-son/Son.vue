<template>
  <div>
    <!-- 就可以使用num了 -->
    <h3>Son 子组件 --- {{ num }}</h3>
    <!-- 点击事件add函数 -->
    <button type="button" class="btn btn-danger" @click="add">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MySon',
  // 用props接收父组件传过来的值num
  props: ['num'],
  // 通过emits结点定义自定义事件numchange
  // emits: ['numchange'],
  // 通过emits结点定义自定义事件，固定写法['update:xxx']，xxx是要更新的属性值num
  emits: ['update:num'],
  methods: {
    // 在合适的时机调用add事件处理函数
    add() {
      // 通过this.$emit触发所声明的自定义事件numchange，并传递最新的值
      // this.$emit('numchange', this.num + 1)
      // 通过this.$emit触发所声明的自定义事件'update:num'，并传递最新的值
      this.$emit('update:num', this.num + 1)
    },
  },
}
</script>

<style lang="less" scoped></style>
