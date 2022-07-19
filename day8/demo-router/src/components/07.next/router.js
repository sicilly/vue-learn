import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './Home.vue'
import Main from './Main.vue'
import Login from './Login.vue'

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/main', component: Main },
    { path: '/login', component: Login },
  ],
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
const tokenStr = localStorage.getItem('token')  // 1. 读取 token
  // 2. 想要访问后台主页，且 token 不存在
  if (to.path === '/main' && !tokenStr) {
    // 3.1 强制跳转到登录页面
    next('/login')
  } else {
    // 3.2 访问的不是后台主页,直接放行
    next()
  }
})

export default router
