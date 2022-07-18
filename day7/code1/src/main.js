import { createApp } from 'vue'
//#region import App
// import App from './components/01.ref/App.vue'
// import App from './components/02.$nextTick/App.vue'
// import App from './components/03.dynamic/App.vue'
// import App from './components/04.base-slot/App.vue'
// import App from './components/05.named-slot/App.vue'
// import App from './components/06.scoped-slot/App.vue'
//#endregion
import App from './components/07.directive/App.vue'

import './assets/css/bootstrap.css'
import './index.css'

const app = createApp(App)

// 声明全局自定义指令
/* app.directive('focus', {
  mounted(el) { // 第一次插入 DOM 时触发这个函数
    console.log('mounted')
    el.focus()
  },
  updated(el) {  // 每次 DOM 更新时都会触发 updated 函数
    console.log('updated')
    el.focus()
  },
}) */

// 如果 mounted 和updated 函数中的逻辑完全相同，则可以简写成如下格式
app.directive('focus', (el) => {
  el.focus()
})

// binding.value 就是使用指令时，绑定的值
app.directive('color', (el, binding) => {
  el.style.color = binding.value
})

app.mount('#app')
