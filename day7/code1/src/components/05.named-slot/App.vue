<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <!-- 使用组件 -->
    <my-article>
      <!-- 把template的内容放到header插槽，v-slot:header 可以被重写为 #header-->
      <template #header>
        <h1>滕王阁序</h1>
      </template>
      <template #default>
        <p>豫章故郡，洪都新府。</p>
        <p>星分翼轸，地接衡庐</p>
        <p>襟三江而带五湖，控蛮荆而引瓯越。</p>
      </template>
      <template #footer>
        <p>落款：王勃</p>
      </template>
    </my-article>
  </div>
</template>

<script>
// 导入组件
import MyArticle from './MyArticle.vue'

export default {
  name: 'MyApp',
  components: {
    // 注册组件
    MyArticle,
  },
}
</script>

<style lang="less" scoped></style>
