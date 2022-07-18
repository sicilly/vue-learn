<template>
  <div>
    <h1>App 根组件 -- {{ color }}</h1>
    <!-- 点击按钮，color的值会从red变为blue，这个变化如何传给子孙组件 -->
    <button type="button" class="btn btn-primary" @click="color = 'blue'">Toggle Blue</button>

    <hr />

    <level-two></level-two>
  </div>
</template>

<script>
import LevelTwo from './LevelTwo.vue'
// 1. 从vue中按需导入computed函数
import { computed } from 'vue'

export default {
  name: 'MyApp',
  data() {
    return {
      color: 'red',
    }
  },
  provide() {
    return {
      // 2. 使用computed函数，可以把要共享的数据包装为响应式的数据
      color: computed(() => this.color),
      count: 1,
    }
  },
  components: {
    LevelTwo,
  },
}
</script>

<style lang="less" scoped></style>
