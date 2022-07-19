<template>
  <div>
    <h3>MyHome 组件</h3>
    <!-- 动态绑定 to 属性的值，name 属性指定要跳转到的路由规则，params 属性指定要携带的路由参数 -->
    <router-link :to="{ name: 'mov', params: { mid: 2 } }">go to movie</router-link>
    <button type="button" class="btn btn-primary" @click="goToMovie(1)">go to movie</button>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  methods: {
    goToMovie(id) {
      // 调用 push 函数期间指定一个配置对象，name 是要跳转到的路由规则、params 是携带的路由参数
      this.$router.push({
        name: 'mov',
        params: {
          mid: id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
