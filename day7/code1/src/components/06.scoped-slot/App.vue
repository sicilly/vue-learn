<template>
  <div>
    <h1>App 根组件</h1>
    <hr />

    <!-- 使用自定义组件 -->
    <my-test>
      <!-- 解构赋值接收作用域插槽传过来的数据 -->
      <template #default="{ msg, info }">
        <p>{{ msg }}</p>
        <p>{{ info.address }}</p>
      </template>
    </my-test>
    <hr />

    <my-table>
      <!-- 接收用户数据 -->
      <template #default="{ user }">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>
          <input type="checkbox" :checked="user.state" />
        </td>
      </template>
    </my-table>
  </div>
</template>

<script>
// 导入组件
import MyTest from './MyTest.vue'
import MyTable from './MyTable.vue'

export default {
  name: 'MyApp',
  // 注册组件
  components: {
    MyTest,
    MyTable,
  },
}
</script>

<style lang="less" scoped></style>
