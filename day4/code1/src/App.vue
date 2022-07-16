<template>
  <h1>这是<i>App.vue</i>组件</h1>
  <h3>abc---{{username}}</h3>
  <hr/>
  <p>count的值是: {{count}}</p>
  <button @click="addCount">+1</button>

  <my-swiper></my-swiper>
  <my-test></my-test>
  <hr>
  <my-search></my-search>
</template>

<script>
import Search from './components/02.privateReg/Search.vue'
// 所有组件相关的 data、methods方法等，都要定义在 export default 代码块中
export default {
  name:'MyApp',   // name 属性指向的是当前组件的名称，建议大驼峰命名
  // data 中 return 出去的对象，就是当前组件渲染期间需要用到的数据对象
  data() {
    return {
      username: '哈哈',
      count: 0,
    }
  },
  methods: { // 组件的处理函数
    addCount() {
      this.count++; // 通过this可以访问到data中的数据
    },
  },
  components:{  // 通过 components 节点，为当前组件注册私有子组件
    'my-search':Search,
  },
}
</script>

<style lang="less">
h1 {
  font-weight: normal;
  i {
    color: pink;
    font-style: normal;
  }
}
</style>