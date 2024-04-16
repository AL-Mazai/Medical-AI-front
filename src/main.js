import { createApp } from 'vue'
// import { createRouter, createWebHistory } from 'vue-router'
import router from './router/index.js'
import App from './App.vue'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '../src/assets/style.css'
// import './theme/index.css'
import * as echarts from 'echarts';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


axios.defaults.baseURL = 'http://localhost:5003';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


// 注册全局变量 $echarts
app.config.globalProperties.$echarts = echarts

// 注册全局变量 $http
app.config.globalProperties.$http = axios

// 创建路由
// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/App', component: App, meta: { title: '肿瘤辅助诊断系统' } },
//   ]
// })

// 使用 ElementPlus
app.use(ElementPlus)

// 注册全局组件
app.component('App', App)

// 自定义全局方法 routerAppend
app.config.globalProperties.routerAppend = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend
}

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
