import Vue from 'vue'  //1、导入Vue2的构造函数
import VueRouter from 'vue-router'   //2、导入3.x路由的构造函数
import UserList from '@/components/UserList.vue'    //3、导入需要使用路由切换的组件
import UserDetail from '@/components/UserDetail.vue'
//4、调用Vue.use()函数，把路由配置为Vue的插件
Vue.use(VueRouter)

const router=new VueRouter({  //5、创建路由对象
    // 声明路由规则
    routes:[
        { path: '/', redirect: '/users' },
        { path: '/users', component: UserList }, 
        { path: '/users/:id', component: UserDetail }, 
    ]
})

export default router  //6、向外共享路由对象