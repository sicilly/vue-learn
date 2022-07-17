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