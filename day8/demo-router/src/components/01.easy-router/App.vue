<template>
  <div>
    <h1>App 根组件</h1>
    <!-- 放三个链接 -->
    <a href="#/home">Home</a>&nbsp; <a href="#/movie">Movie</a>&nbsp; <a href="#/about">About</a>&nbsp;
    <hr />
    <!-- 通过:is动态绑定要展示的组件 -->
    <component :is="comName"></component>
  </div>
</template>

<script>
// 导入三个组件
import MyHome from './MyHome.vue'
import MyMovie from './MyMovie.vue'
import MyAbout from './MyAbout.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 给变量赋值
      comName: 'MyHome',
    }
  },
  created() {
    // 在created生命周期函数中监听 hash 值变化的事件
    window.onhashchange = () => {
      // 通过 location.hash 获取到最新的 hash 值，并进行匹配
      switch (location.hash) {
        case '#/home':
          this.comName = 'MyHome'
          break
        case '#/movie':
          this.comName = 'MyMovie'
          break
        case '#/about':
          this.comName = 'MyAbout'
          break
      }
    }
  },
  // 注册三个组件
  components: {
    MyHome,
    MyMovie,
    MyAbout,
  },
}
</script>

<style></style>
