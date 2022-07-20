# 1. vue-cli

> vue-cli（vue脚手架）是vue官方提供的，快速生成vue工程化项目的工具。
>
> - 特点：开箱即用、基于webpack、支持vue2和vue3的项目

（1）安装 vue-cli ：一台电脑只需要全局安装一次

- 注意：5.0.1版本的vue-cli存在一些bug，建议安装低版本 npm install -g @vue/cli@4.5.15

```coffeescript
npm install -g @vue/cli
```

（2）检查 vue-cli 是否安装完成

```css
vue --version
```

（3）创建项目

**第一种方式：基于交互式命令行方式创建vue项目**

```sql
vue create 项目名称
```

- 带(*)的选中状态：<空格>切换选中状态，<a>全部选中，<i>反选
- 运行项目：npm run serve

**第二种方式：基于可视化面板创建vue项目**

- vue ui的本质：通过可视化面板采集到用户的配置信息后，在后台基于命令行的方式自动初始化项目，所以创建项目时终端不要关闭。

```undefined
vue ui
```

- 步骤1：点击“创建”按钮-->选择项目的存放路径-->点击“在此创建新项目”按钮
- 步骤2：在详情页面填写项目名称-->点击“下一步”按钮
- 步骤3：在预设页面选择“手动”配置炫目-->点击“下一步”按钮
- 步骤4：在功能页面勾选需要安装的功能（Choose vue version、Babel、css预处理器、使用配置文件）-->点击“下一步”按钮
- 步骤5：在配置页面勾选vue的版本号（3.x）和需要的预处理器（less）-->点击“创建项目”按钮
- 步骤6：若为第一次使用ui创建vue项目，选择将刚才所有的配置保存为预设（模板），方便下一次创建项目时直接复用之前的配置。若不是第一次，则直接选择“创建项目，不保存预设”。【预设存储到了.vuerc配置文件中，可以在该文件中删除预设。】
- 步骤7：创建项目并自动安装依赖包。项目创建完成后，自动进入项目仪表盘。

（4）项目仪表盘：

​    运行项目：在项目仪表盘的任务中，点击serve里的“运行”打包并编译该项目，再点击“启动app”在浏览器中预览该项目。

​    发布项目：在项目仪表盘的任务中，点击build里的“运行”将项目进行生产环境中的编译，把项目发送给后端程序员，后端程序员就可以对项目进行部署了。

[Vue CLI🛠️ Vue.js 开发的标准工具](https://cli.vuejs.org/zh/)

------

# 2. vue2 项目

（1）vue2项目的基本结构

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171405106.png)

（2）vue2项目中使用路由

在vue2项目中，只能安装并使用3.x版本的vue-router。（版本3和版本4的路由的区别只有创建路由模块的方式不同。 ）

① 在vue2项目中安装3.x版本的路由。

```css
npm i vue-router@3.4.9 -S
```

② 在 src-->components 目录下，创建需要使用路由切换的组件。

③ 在src目录下创建 router-->index.js 路由模块。

```javascript
import Vue from 'vue'                       //1、导入Vue2的构造函数
import VueRouter from 'vue-router'          //2、导入3.x路由的构造函数

// @ 表示src目录
import Home from '@/components/Home.vue'    //3、导入需要使用路由切换的组件
import Movie from '@/components/Movie.vue'
 
Vue.use(VueRouter)                          //4、调用Vue.use()函数，把路由配置为Vue的插件
 
const router = new VueRouter({              //5、创建路由实例对象
  routes: [                                 // 通过routes声明路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
  ],
})
 
export default router                       //6、向外共享路由对象
```

> 注意：@ 代表 src 这层源代码目录，当写绝对路径时可以使用！

④ 在 main.js 中导入路由模块，并通过 router 属性进行挂载。

```javascript
import Vue from 'vue'  // 导入vue
import App from './App.vue'  // 导入待渲染的app.vue

//1、导入路由模块
import router from './router/index.js'

Vue.config.productionTip = false  // 不在终端显示vue的提示消息

// new一个vue对象
const app=new Vue({
  render: h => h(App),   // 指定要渲染的组件
  //2、挂载路由模块
  router,
})

app.$mount('#app')  // 挂载到指定的el区域
```

⑤App.vue中使用路由

```html
<template>
  <div>
    <h1>APP根组件</h1>
    <router-link to="/home">首页</router-link>&nbsp;
    <router-link to="/movie">电影</router-link>

    <hr>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'MyApp',
}
</script>

<style lang="less">

</style>

```

# 3. vue组件库

> 开发者可以把自己封装的.vue组件整理、打包并发布为npm的包，供他人下载使用。这种可以直接下载并在项目中使用的现成组件，称为vue组件库。

**vue组件库 vs bootstrap**：bootstrap只提供纯粹的原材料（css样式、HTML结构、js特效），需要开发者做进一步的组装和改造。vue组件库是遵循vue语法、高度定制的现成组件，开箱即用。

### 1. 常用vue组件库

（1）PC端

Element UI（适用于vue2项目）：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN)

Element Plus（适用于vue3项目）：[一个 Vue 3 UI 框架 | Element Plus](https://element-plus.org/zh-CN/#/zh-CN) 

View UI：[iView - A high quality UI Toolkit based on Vue.js](https://www.iviewui.com/)

（2）移动端

Mint UI：[Mint UI](http://mint-ui.github.io/#!/zh-cn)

Vant：[Vant 3 - Mobile UI Components built on Vue](https://youzan.github.io/vant/#/zh-CN)

### 2. Element UI

（1）在vue2项目中安装element-ui

```css
npm i element-ui -S
```

（2）引入element-ui

**第一种方式：完整引入**，在main.js中加入如下代码：

```javascript
//main.js部分关键代码

//1、完整导入 element ui 的组件
import ElementUI from 'element-ui'

//2、完整引入 element ui 组件的样式
import 'element-ui/lib/theme-chalk/index.css'

//3、把ElementUI注册为vue的插件【注册之后，即可在每个组件中直接使用每一个element ui的组件】
Vue.use(ElementUI)
```

在App.vue中使用

```html
<el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
</el-row>
```

**第二种方式：按需引入**，借助babel-plugin-component，只引入需要的组件，以减小项目体积。

① 安装babel-plugin-component包：

```css
npm i babel-plugin-component -D
```

② 修改根目录下的babel.config.js配置文件，新增plugins节点如下：

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
}
```

③ 如果只希望引入部分组件，需要在main.js中按需导入该组件，并全局注册该组件：

```javascript
//main.js部分关键代码
 
//1、按需导入 element ui 的组件
import {Button,Input} from 'element-ui'
//2、把组件全局注册
Vue.use(Button)
Vue.use(Input)
```

（3）把element-ui组件的导入和注册封装为独立模块

① 在src目录下新建element-ui/index.js模块，并声明如下代码：

```javascript
import Vue from 'vue'
//1、按需导入 element ui 的组件
import {Button,Input} from 'element-ui'
 
//2、把组件全局注册
Vue.use(Button)
Vue.use(Input)
```

② 在main.js文件中导入：

```javascript
//main.js 部分关键代码
//3、在main.js中导入
import './element-ui/index.js'
```

# 4. [axios](https://so.csdn.net/so/search?q=axios&spm=1001.2101.3001.7020) 拦截器

> [拦截器](https://so.csdn.net/so/search?q=拦截器&spm=1001.2101.3001.7020)（Interceptors）会在每次发起ajax请求和得到响应的时候自动被触发。

（1）在vue2项目中全局配置axios

​    ① 安装axios

```css
npm i axios -S
```

​    ② 在main.js入口文件中，通过**Vue构造函数**的**prototype原型对象**全局配置axios：

```javascript
//main.js 部分关键代码
 
// 1、导入axios
import axios from 'axios'
 
// 2、配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:8080'
 
// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios
```

③在App.vue中点击按钮发起请求

```js
<el-button type="primary" @click="getInfo">主要按钮</el-button>

export default {
  name: 'MyApp',
  methods:{
    async getInfo(){
      const {data:res} = await this.$http.get('/api/get',{params:{name:'zs',age:20}})
      console.log(res)
    }
  }
}
```



（2）拦截器：在每次发起ajax请求和得到响应的时候自动被触发

- 应用场景：Token身份认证、Loading效果.....

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171405439.png) （3）配置请求拦截器和响应拦截器

通过axios.interceptors.request.use(成功的回调,失败的回调)可以配置请求拦截器。

注意：失败的回调函数可以省略。    

通过axios.interceptors.response.use(成功的回调,失败的回调)可以配置响应拦截器。

注意：失败的回调函数可以省略。

```javascript
//main.js 
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { Loading } from 'element-ui'
 
// 不在终端里显示vue的提示消息
Vue.config.productionTip = false
 
// 1、导入axios
import axios from 'axios'
// 2、配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:8080'
 
// 声明变量，用来存储Loading组件的实例对象
let loadingInstance = null 
// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 调用Loading组件的service()方法，创建Loading组件的实例，并全屏展示 loading 效果
  loadingInstance = Loading.service({ fullscreen: true })
  // 配置 Token 认证
  config.headers.Authorization = 'Bearer xxx'
  console.log(config)
  // 这是固定写法，一定要return出去
  return config
})
 
// 配置响应拦截器
axios.interceptors.response.use(response => {
  // 关闭 loading 效果
  loadingInstance.close()
  // 这是固定写法，一定要return出去
  return response
})
 
// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios
 
const app=new Vue({
  render: h => h(App),
  //挂载路由模块
  router,
})
 
app.$mount('#app')
```

------

#  5. Proxy 跨域代理 

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171405764.png)

通过vue-cli创建的项目在遇到接口跨域问题时，可以通过**代理**的方式解决：

1. 把axios的**请求根路径**设置为**vue项目的运行地址**（接口请求不再跨域）
2. vue项目发现请求的接口不存在，把请求**转交给proxy代理**。
3. 代理把请求根路径**替换为**devServer.proxy属性的值，**发起真正的数据请求**。
4. 代理把请求到的数据，**转发给axios**。

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171405901.png)

 ① 在main.js入口文件中，把axios的请求根路径改造为当前web项目的根路径：

```javascript
// main.js 部分关键代码
// 配置请求根路径
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:8080'
```

② 在项目根目录下创建vue.config.js的配置文件，并声明如下的配置：

```javascript
module.exports = {
    devServer: {
        //当前项目在开发调试阶段，会把任何位置请求（没有匹配到静态资源文件的请求）代理到以下地址
        proxy: 'https://www.escook.cn',
    },
}
```

>  注意：devServer.proxy提供的代理功能，仅在开发调试阶段生效。项目上线发布时，依旧需要API接口服务器开启CORS跨域资源共享。

# 6. 综合案例

（1）知识点：vue-cli创建vue2项目，element-ui组件库，axios拦截器，proxy跨域接口代理，vuer-router路由

（2）实现步骤：① 初始化项目，② 渲染用户表格的数据，③ 基于全局过滤器处理时间格式，④ 实现添加用户的操作，⑤ 实现删除用户的操作，⑥ 通过路由跳转到详情页

（3）项目结构：

![img](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207171405627.png)

（4）实现代码 

vue.config.js：

```javascript
module.exports = {
    devServer: {
        port:3000,  //修改dev期间的端口号
        //open:true,  //自动打开浏览器
        //当前项目在开发调试阶段，会把任何位置请求（没有匹配到静态资源文件的请求）代理到以下地址
        proxy: 'https://www.escook.cn',
    },
}
```

/src/App.vue：

```html
<template>
  <div>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {
  name: 'MyApp',
}
</script>
 
<style lang="less" scoped></style>
```

/src/main.js：

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
// 1、导入axios
import axios from 'axios'
 
// 导入element-ui 及其样式表
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Loading } from 'element-ui'
// 将ElementUI安装位vue的插件
Vue.use(ElementUI)
 
// 不在终端里显示vue的提示消息
Vue.config.productionTip = false
 
// 声明格式化时间的全局过滤器
Vue.filter('dateFormat', dtStr => {
  const dt = new Date(dtStr)
  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
 
// 补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}
 
// 2、配置请求根路径
//axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
// 3、通过Vue构造函数的原型对象，全局配置axios
Vue.prototype.$http = axios
 
// 配置请求拦截器
let loadingInstance = null
axios.interceptors.request.use(config => {
  // 展示 loading 效果
  loadingInstance = Loading.service({ fullscreen: true })
  // 这是固定写法，一定要return出去
  return config
})
 
// 配置响应拦截器
axios.interceptors.response.use(response => {
  // 关闭 loading 效果
  loadingInstance.close()
  return response
})
 
const app=new Vue({
  render: h => h(App),
  //挂载路由模块
  router,
})
 
app.$mount('#app')
```

/src/router/index.js：

```javascript
import Vue from 'vue'                       //1、导入Vue2的构造函数
import VueRouter from 'vue-router'          //2、导入3.x路由的构造函数
 
import UserList from '@/components/UserList.vue'    //3、导入需要使用路由切换的组件
import UserDetail from '@/components/UserDetail.vue'
 
Vue.use(VueRouter)                          //4、调用Vue.use()函数，把路由配置为Vue的插件
 
const router = new VueRouter({              //5、创建路由对象
  routes: [                                 //5.1声明路由规则
    { path: '/', redirect: '/users' },
    { path: '/users', component: UserList },
    { path: '/users/:id', component: UserDetail, props: true },
  ],
})
 
export default router                       //6、向外共享路由对象
```

/src/components/UserList.vue：

```html
<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="dialogVisible = true">添加新用户</el-button>
 
    <!-- 用户的表格 -->
    <el-table :data="userList" stripe border>
        <!-- 这是索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 渲染姓名、年龄、头衔、创建时间列 -->
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="头衔" prop="position"></el-table-column>
        <el-table-column label="创建时间">
            <!-- 作用域插槽 -->
            <!-- v-slot:default="scope" -->
            <!-- #default="scope" -->
            <!-- v-slot="scope" -->
            <template #default="scope">
            {{ scope.row.addtime | dateFormat }}
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <!-- 作用域插槽 -->
            <template v-slot="{ row }">
            <div>
                <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
                <a href="#" @click.prevent="onRemove(row.id)">删除</a>
            </div>
            </template>
        </el-table-column>
    </el-table>
 
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加新用户" :visible.sync="dialogVisible" width="50%" @close="onDialogClosed">
        <!-- 添加用户的表单 -->
        <el-form :model="form" label-width="80px" :rules="formRules" ref="myaddForm">
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
            <el-button type="primary" @click="onAddNewUser">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
 
 
<script>
export default {
  name: 'UserList',
  data(){
    // 自定义验证函数：校验年龄
    let checkAge = (rule, value, cb) => {
        if (!Number.isInteger(value)) {
            return cb(new Error('请填写整数！'))
        }
        if (value > 100 || value < 1) {
            return cb(new Error('年龄必须在 1 到 100 之间！'))
        }
        cb() //验证通过
    }
    return{
        // 用户列表数据，默认为空数组
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
            { validator: checkAge, trigger: 'blur' },
            ],
            position: [
            { required: true, message: '头衔是必填项', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
            ],
        },
    }    
  },
  created(){
      // 调用此方法，请求用户列表数据
      this.getUserList()
  },
  methods:{
    // 请求用户列表数据
    async getUserList(){
        const {data:res}=await this.$http.get('/api/users')
        if(res.status!==0) return console.log('用户列表数据请求失败!')
        this.userList=res.data
        console.log(this.userList)
    },
    // 监听对话框关闭的事件
    onDialogClosed() {
        // 拿到 Form 组件的引用，调用 resetFields 函数，即可重置表单
        this.$refs.myaddForm.resetFields()
    },
    // 用户点击了添加按钮
    onAddNewUser() {
        this.$refs.myaddForm.validate(async valid => {
            if (!valid) return
            // 需要执行添加的业务处理
            const { data: res } = await this.$http.post('/api/users', this.form)
            if (res.status !== 0) return this.$message.error('添加用户失败！')
            this.$message.success('添加成功！')
            this.dialogVisible = false
            this.getUserList()
        })
    },
    // 点击了删除的链接
    async onRemove(id) {
        // 询问用户是否删除
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }).catch(err => err)
 
        // 判断是否点击了确认按钮
        if (confirmResult !== 'confirm') return this.$message.info('取消了删除！')
 
        // 发起请求，删除指定 id 的数据
        const { data: res } = await this.$http.delete('/api/users/' + id)
        if (res.status !== 0) return this.$message.error('删除失败！')
        // 提示删除成功，并刷新列表数据
        this.$message.success('删除成功！')
        this.getUserList()
    },
  },
}
</script>
 
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
</style>
```

/src/components/UserDetail.vue：

```html
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户详情</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="goBack">返回</el-button>
    </div>
    <div class="text item">
      <p>姓名：{{ userInfo.name }}</p>
      <p>年龄：{{ userInfo.age }}</p>
      <p>头衔：{{ userInfo.position }}</p>
    </div>
  </el-card>
</template>
 
<script>
export default {
  name: 'UserDetail',
  props: ['id'], // props传过来的是只读变量
  data() {
    return {
      userInfo: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get('/api/users/' + this.id)
      if (res.status !== 0) return this.$message.error('获取用户详情数据失败！')
      this.userInfo = res.data
      console.log(this.userInfo)
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
 
<style lang="less" scoped></style>
```

**element-ui 常见组件：**

Button 按钮：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/button)

Table 表格：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/table)

Dialog 对话框：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/dialog) 

Form 表单：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/form) 

Message 消息：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/message)

Message-Box 弹框：[Element - The world's most popular Vue UI framework](https://element.eleme.cn/#/zh-CN/component/message-box)

# 总结

![image-20220720163109598](https://picture-1308610694.cos.ap-nanjing.myqcloud.com/202207201631696.png)