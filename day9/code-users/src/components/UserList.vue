<template>
  <div>UserList组件</div>
</template>

<script>
export default {
    name:'UserList',
    data(){
        userList:[]
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