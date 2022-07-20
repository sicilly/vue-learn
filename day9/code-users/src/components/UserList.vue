<template>
    <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="dialogVisible = true">添加新用户</el-button>
        <!-- 用户的表格 :data绑定数据源 -->
        <el-table :data="userList" stripe border>
            <!-- 这是索引列 -->
            <el-table-column type="index" label="#"></el-table-column>
            <!-- 渲染姓名、年龄、头衔、创建时间列 -->
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="年龄" prop="age"></el-table-column>
            <el-table-column label="头衔" prop="position"></el-table-column>
            <el-table-column label="创建时间">
                <!-- 作用域插槽 -->
                <template #default="scope">
                {{ scope.row.addtime | dateFormat }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <!-- 作用域插槽 -->
                <template>
                <div>
                    <a href="#">详情</a>&nbsp;
                    <a href="#">删除</a>
                </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加用户的对话框 -->
        <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="50%">
            <!-- 添加用户的表单 -->
            <el-form :model="form" label-width="80px" :rules="formRules">
                <!-- 采集用户的姓名 -->
                <el-form-item label="用户姓名" prop="name">
                <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="用户年龄" prop="age">
                <el-input v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item label="用户头衔" prop="position">
                <el-input v-model="form.position"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'UserList',
    data(){
        // 返回一个对象
        return{
            userList:[],
            // 控制添加对话框的显示与隐藏
            dialogVisible: false,  
            // 要采集的用户的信息对象
            form: {
                name: '',
                age: '',
                position: '',
            },    
            // 表单的验证规则对象
            formRules: {
                name: [
                { required: true, message: '姓名是必填项', trigger: 'blur' },
                { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' },
                ],
                age: [
                { required: true, message: '年龄是必填项', trigger: 'blur' },
                { trigger: 'blur' },
                ],
                position: [
                { required: true, message: '头衔是必填项', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
                ],
            },      
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
    .el-table {
    margin-top: 15px;
    }
</style>