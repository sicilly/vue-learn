<template>
  <button type="button" class="btn btn-light btn-sm" @click="goBack">后退</button>
  <!-- 直接使用props值 -->
  <h4 class="text-center">用户详情 --- {{id}}</h4>
</template>

<script>
export default {
  name: 'MyUserDetail',
  // 声明props参数
  props: ['id'],
  methods: {
    // 编程式导航实现后退功能
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
</style>