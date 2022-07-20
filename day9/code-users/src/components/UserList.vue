<template>
   <!-- 用户的表格 :data绑定数据源 -->
    <el-table :data="userList" stripe border>
        <!-- 这是索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 渲染姓名、年龄、头衔、创建时间列 -->
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="头衔" prop="position"></el-table-column>
        <el-table-column label="创建时间" prop="addtime"></el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'UserList',
    data(){
        // 返回一个对象
        return{
            userList:[]
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        // 获取用户列表的数据
        async getUserList(){
            const {data:res} = await this.$http.get('api/users')
            if(res.status!==0) return console.log('用户列表数据请求失败!')
            this.userList=res.data
            console.log(this.userList)
        }
    }
}
</script>

<style lang="less" scoped>

</style>