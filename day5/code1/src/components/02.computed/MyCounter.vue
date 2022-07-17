<template>
  <div>
    <!-- 给文本框一个v-model 双向数据绑定 -->
    <input type="text" v-model.number="count" />
    <!-- 虽然计算属性是一个方法，但调用时不需要加括号 -->
    <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
    <p>{{ count }} 乘以 2 的值为：{{ plus }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyCounter',
  data() {
    return {
      count: 1,
    }
  },
  // 计算属性的计算结果会被缓存，性能好
  computed: {
    plus() {
      console.log('计算属性被执行了')
      return this.count * 2
    },
  },
  // 如果调用方法，会重复输出3次，表示方法的计算结果是不会被缓存的，性能低
  methods: {
  //   plus() {
  //     console.log('方法被执行了')
  //     return this.count * 2
  //   }
  }
}
</script>

<style></style>
