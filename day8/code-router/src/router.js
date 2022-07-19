// 1. 按需导入对应的函数
import { createRouter, createWebHashHistory } from 'vue-router'
// 导入组件
import Login from './components/MyLogin.vue'
import Home from './components/MyHome.vue'
// 导入左侧菜单对应的组件
import Users from './components/menus/MyUsers.vue'
import Rights from './components/menus/MyRights.vue'
import Goods from './components/menus/MyGoods.vue'
import Orders from './components/menus/MyOrders.vue'
import Settings from './components/menus/MySettings.vue'
// 导入用户详情组件
import UserDetail from './components/user/MyUserDetail.vue'

// 创建路由实例对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // 路由重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/home',
      // 重定向到users
      redirect: '/home/users',
      component: Home,
      name: 'home',
      // 通过 children 属性，为 home 规则定义子路由规则
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights },
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'settings', component: Settings },
         // 用户详情页的路由规则，开启props传参
        { path: 'users/:id', component: UserDetail, props: true },
      ],
    },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户访问的是否为登录页
  if (to.path === '/login') return next()
  // 获取 token 值
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
  } else {
    next()
  }
})
// 3. 向外共享路由实例对象
export default router
