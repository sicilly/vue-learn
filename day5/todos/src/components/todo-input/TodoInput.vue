<template>
<!-- 阻止表单默认提交，并指定事件处理函数 -->
  <form class="form-inline" @submit.prevent="onFormSubmit">
    <div class="input-group mb-2 mr-sm-2">
      <div class="input-group-prepend">
        <div class="input-group-text">任务</div>
      </div>
      <!-- v-model双向数据绑定，利用.trim事件修饰符去除多余空格 -->
      <input type="text" class="form-control" placeholder="请输入任务信息" style="width: 356px" v-model.trim="taskname" />
    </div>

    <button type="submit" class="btn btn-primary mb-2">添加新任务</button>
  </form>
</template>

<script>
export default {
  name: 'TodoInput',
  // 声明自定义事件
  emits: ['add'],
  data() {
    return {
      // 新任务的名称
      taskname: '',
    }
  },
  methods: {
    // 表单的提交事件处理函数
    onFormSubmit() {
      // 1. 判断是否为空
      if (!this.taskname) return alert('任务名称不能为空！')
      // 2. 触发自定义的add事件，并向外界传递数据
      this.$emit('add', this.taskname)
      // 3. 清空文本框
      this.taskname = ''
    },
  },
}
</script>

<style lang="less" scoped></style>
