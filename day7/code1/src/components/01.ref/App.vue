<template>
  <div>
    <!-- 使用 ref 属性，可以为对应的 DOM 或者 组件 起一个引用名称 -->
    <h1 ref="myh1">App 根组件</h1>
    <hr />
    <!-- 绑定点击事件getRefs -->
    <button type="button" class="btn btn-primary" @click="getRefs">获取 $refs 引用</button>
    <!-- 给组件添加ref属性 -->
    <my-counter ref="counterRef"></my-counter>
  </div>
</template>

<script>
// 导入组件
import MyCounter from './Counter.vue'

export default {
  name: 'MyApp',
  methods: {
    getRefs() {
      console.log(this.$refs)  // 拿到这个DOM元素的引用
      this.$refs.myh1.style.color = 'red'  // 通过$refs操作DOM元素

      console.log(this.$refs.counterRef)  // 拿到组件的引用对象
      this.$refs.counterRef.reset()  // 调用组件的方法
    },
  },
  // 注册组件
  components: {
    MyCounter,
  },
}
</script>

<style lang="less" scoped></style>
