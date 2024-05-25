import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import  {router}  from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueParticles from 'vue-particles'
const app = createApp(App)
app.use(store)
app.use(router)
// 使用插画
app.use(VueParticles)

app.use(ElementPlus)
// 使用图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 引入windi.css样式库
import 'virtual:windi.css'
import 'animate.css';

// 引入权限控制白名单
import "./permission"
import "@/styles/index.scss";


// 加载条
import "nprogress/nprogress.css"
// 全局导入自定义指令权限控制
import permission from "@/directives/permission.js"
app.use(permission)


app.mount('#app')
