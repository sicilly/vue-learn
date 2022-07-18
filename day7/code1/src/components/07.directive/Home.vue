<template>
  <div class="home-container">
    <!-- 使用 v-color 指令时，可以通过等号为指令绑定值 -->
    <h3 v-color="'red'">MyHome 组件 --- {{ count }}</h3>
    <hr />
    <!-- 自定义指令 v-focus-->
    <input type="text" class="form-control" v-focus v-color="'cyan'" />
    <button type="button" class="btn btn-primary" @click="count += 1">+1</button>
  </div>
</template>

<script>
export default {
  name: 'MyHome',
  data() {
    return {
      count: 0,
    }
  },
  // 通过directives自定义私有指令 focus
  directives: {
    focus: {
      // 当被绑定的元素插入到 DOM 中时，会自动触发 mounted 函数
      mounted(el) {
        el.focus()  // 让被绑定饿元素自动获取焦点
      },
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  border: 1px solid #efefef;
  box-shadow: 0px 1px 10px #efefef;
  border-radius: 4px;
  padding: 20px;
  margin: 20px;
}

input.form-control {
  width: 280px;
}
</style>
