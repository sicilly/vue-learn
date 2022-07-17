import Vue from 'vue'  // 导入vue
// 方式一：完整导入
//【1、完整导入 element ui 的组件】
// import ElementUI from 'element-ui'
//【2、完整引入 element ui 组件的样式】
// import 'element-ui/lib/theme-chalk/index.css'
//【3、把ElementUI注册为vue的插件(注册之后，即可在每个组件中直接使用每一个element ui的组件)】
// Vue.use(ElementUI)


// 方式二：按需导入
// [1、按需导入 element ui 的组件]
import {Button,Input} from 'element-ui'

// [2、把组件全局注册]
Vue.use(Button)
Vue.use(Input)