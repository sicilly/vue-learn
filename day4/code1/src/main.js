// 1. 按需导入createApp函数
import {createApp} from 'vue'

// 2. 导入待渲染的App.vue组件
// import App from './App.vue'
// import App from './components/03.style/App.vue'
// import App from './components/04.props/App.vue'
// import App from './components/05.class&style/App.vue'
import App from './components/06.MyHeader/App.vue'


// 【1. 导入需要被全局注册的组件】
import Swiper from './components/01.globalReg/Swiper.vue'
import Test from './components/01.globalReg/Test.vue'

// 3. 调用createApp函数，创建SPA应用的实例
const app=createApp(App);

// 【2. 调用app.component方法全局注册组件】
// app.component('my-swiper',Swiper)
app.component('mySwiper',Swiper)  // 通过name属性注册组件
// app.component('my-test',Test)
app.component(Test.name,Test)

// 4. 调用mount()把App组件的模板结构，渲染到指定的el区域中
app.mount('#app');
