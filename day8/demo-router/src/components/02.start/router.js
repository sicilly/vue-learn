// 1. 从 vue-router 中按需导入两个方法
// createRouter：用于创建路由对象，createWebHashHistory：用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from 'vue-router'
// 2. 导入需要被路由控制组件
import Home from './MyHome.vue'
import Movie from './MyMovie.vue'
import About from './MyAbout.vue'

// 3. 创建路由对象
const router = createRouter({
  // 指定路由的工作模式
  history: createWebHashHistory(),
  // 自定义路由高亮的 class 类
  linkActiveClass: 'active-router',
  // 声明路由的匹配规则
  routes: [
    // redirect 属性：当用户访问 path 地址时，会被重定向到 redirect 属性的地址
    // path 是 hash 地址，component 是要展示的组件
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/movie', component: Movie },
    { path: '/about', component: About },
  ],
})

// 4. 导出路由对象
export default router
