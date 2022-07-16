<template>
    <div>
        <h1>这是 App.vue 组件</h1>
        <hr>
        <!-- 3.使用组件 -->
        <my-style></my-style>
    </div>
</template>

<script>
// 1.导入组件
import MyStyle from './Style.vue'

// 2.注册组件
export default {
    name: 'MyApp',
    components: {
        MyStyle
    }
}
</script>
