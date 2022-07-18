<template>
  <div>
    <h1 class="mb-4">App 根组件</h1>
    <!-- 3. 绑定点击事件，动态修改当前要渲染的组件名 -->
    <button type="button" class="btn btn-primary" @click="comName = 'MyHome'">首页</button>
    <button type="button" class="btn btn-info ml-2" @click="comName = 'MyMovie'">电影</button>
    <hr />

    <!-- 使用组件 -->
    <!-- <my-home></my-home>
    <my-movie></my-movie> -->

    <!-- 2.通过 is 属性，动态指定要渲染的组件名称，使用 keep-alive 包裹 component 使其保持组件的状态 -->
    <!-- 用keep-alive 切换组件时不要销毁原来的组件 -->
    <keep-alive>
      <component :is="comName"></component>
    </keep-alive>
  </div>
</template>

<script>
// 导入组件
import MyHome from './Home.vue'
import MyMovie from './Movie.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 1. comName是一个变量，表示当前要渲染的组件名称
      comName: 'MyHome'
    }
  },
  // 注册组件
  components: {
    MyHome,
    MyMovie,
  },
}
</script>

<style lang="less" scoped></style>
