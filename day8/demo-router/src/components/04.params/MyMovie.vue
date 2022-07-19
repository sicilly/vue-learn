<template>
  <div>
     <!-- 方式一：$router.params 是路由的参数对象 -->
     <!-- 方式二：开启props传参后可以直接使用mid -->
    <h3>MyMovie 组件 --- {{ $route.params.mid }} --- {{ mid }}</h3>
    <!-- 绑定一个点击事件 -->
    <button type="button" class="btn btn-danger" @click="goBack">后退</button>
  </div>
</template>

<script>
export default {
  name: 'MyMovie',
  props: ['mid'], // 使用 props 接收路由规则中匹配到的参数项
  methods: {
    goBack() {
      this.$router.go(-1)  // 可以在浏览历史中进行前进和后退
    },
  },
}
</script>

<style lang="less" scoped></style>
