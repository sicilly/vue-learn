<template>
  <div>
    <!-- color现在是响应式数据，必须以 .value 形式进行使用 -->
    <h5>Level Three 三级组件 --- {{ color.value }} --- {{ count }}</h5>
  </div>
</template>

<script>
export default {
  name: 'LevelThree',
  // 通过inject来接收
  inject: ['color', 'count'],
}
</script>

<style lang="less" scoped></style>
