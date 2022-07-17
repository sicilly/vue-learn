<template>
  <div>
    <p>数量：{{ count }}</p>
    <p>状态：{{ state }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyCount',
  // props: ['count', 'state'],
  props: {
    count: {
      type: Number,  // 属性的值必须是 Number 类型
      required: true,  // 属性的值是必填项，如果没有指定 count 的值，会在终端进行警告提示
      default: 100  // 如果没有指定值，那么默认值为 100
    },
    state: Boolean,
    info: [String, Number],
    // 自定义验证函数，进行规则处理
    type: {
      validator(value) { // 通过 vaildator 函数，对 type 属性的值进行校验，属性值通过形参 value 接受
        // 返回 true 表示验证通过，只要匹配下面三个字符串中的一个就通过
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  },
}
</script>

<style lang="less" scoped></style>
