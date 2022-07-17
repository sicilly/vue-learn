<template>
  <div>
    <h1>App 根组件</h1>

    <hr />

    <!-- 监听自定义事件add，指定一个函数onAddNewTask -->
    <todo-input @add="onAddNewTask"></todo-input>
    <!-- 最后把 todolist 修改为 tasklist -->
    <todo-list :list="tasklist" class="mt-2"></todo-list>
    <!-- 属性绑定，再通过v-model更新激活的按钮 -->
    <todo-button v-model:active="activeBtnIndex"></todo-button>
  </div>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/todo-list/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/todo-input/TodoInput.vue'
// 导入 TodoButton 组件
import TodoButton from './components/todo-button/TodoButton.vue'

export default {
  name: 'MyApp',
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true },
      ],
      // 下一个可用的 Id
      nextId: 4,
      // 默认激活的按钮为0
      activeBtnIndex: 0,
    }
  },
  // 计算属性
  computed: {
    // 根据激活按钮的索引值，动态计算要展示的列表数据
    tasklist() {
      // 对源数据进行 switch...case 的匹配，并返回计算之后的结果
      switch(this.activeBtnIndex) {
        case 0:  // 全部
          return this.todolist
        case 1:  // 已完成
          return this.todolist.filter(x => x.done === true)
        case 2:  // 未完成
          return this.todolist.filter(x => x.done !== true)
      }
    }
  },
  methods: {
    // 接收子组件传过来的taskname参数
    onAddNewTask(taskname) {
      // 1. 向任务列表中新增任务信息
      this.todolist.push({
        id: this.nextId,
        task: taskname,
        done: false, // 完成状态默认为 false
      })
      // 2. 让 nextId 自增+1
      this.nextId++
    },
  },
  // 注册组件
  components: {
    TodoList,
    TodoInput,
    TodoButton,
  },
}
</script>

<style lang="less" scoped></style>
