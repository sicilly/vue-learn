<template>
    <div data-v-001>
        <h1>这是 App.vue 组件</h1>

        <p>App中的p标签</p>
        <p>App中的p标签</p>

        <hr>
        <!-- 就可以使用了 -->
        <my-list></my-list>
    </div>
</template>

<script>
// 先导入要用到的list组件
import MyList from './List.vue'

export default {
    name: 'MyApp',
    // 用键值对注册组件
    components: {
        // 'MyList': MyList
        MyList
    }
}
</script>
<!-- scoped属性用来解决样式冲突 -->
<style lang="less" scoped>
    p {
        color: pink;
    }

    // deep样式穿透 让某些样式对子组件生效

    // vue2
    // /deep/ .title {
    //     color: skyblue;
    // }

    // vue3
    :deep(.title) {
        color: skyblue;
    }
</style>
