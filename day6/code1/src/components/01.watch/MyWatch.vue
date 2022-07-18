<template>
  <div>
    <h3>watch 侦听器的用法</h3>
    <input type="text" class="form-control" v-model.trim="info.username" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyWatch',
  data() {
    return {
      username: 'admin',
      info: {
        username: 'zs',
        age: 20,
      },
    }
  },
  watch: {
    // async username(newVal, oldVal) {
    //   console.log(newVal, oldVal)
    //   const {data: res} = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
    //   console.log(res)
    // },
    // username: {
    //   async handler(newVal, oldVal) {
    //     const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
    //     console.log(res)
    //   },
    //   // 立即触发 watch 侦听器
    //   immediate: true,
    // },
    // info: {  // 表示监听 info 对象的变化
    //   async handler(newVal) {
    //     const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal.username)
    //     console.log(res)
    //   },
    //   deep: true,  // 需要使用 deep 选项，否则 username 的值无法被监听到，因为 info 是一个对象
    // },
    'info.username': {  // 如果只想监听 info.username 属性值的变化，此时可以不用 deep
      async handler(newVal) {
        const { data: res } = await axios.get('https://www.escook.cn/api/finduser/' + newVal)
        console.log(res)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped></style>
