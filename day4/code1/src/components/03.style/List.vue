<template>
    <div>
        <h1 class="title">这是 List.vue 组件</h1>

        <p>List中的p标签</p>
        <p>List中的p标签</p>

        <hr>
    </div>
</template>

<script>
export default {
    name: 'MyList'
}
</script>

<!-- scoped属性用来解决样式冲突 -->
<style lang="less" scoped>
    p {
        color: yellowgreen;
    }
</style>
