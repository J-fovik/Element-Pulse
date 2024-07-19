import { createApp } from 'vue';
import App from './App.vue';
// element css
import 'element-plus/dist/index.css';
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css';
// // 导入并注册 SVG 图标
import 'virtual:svg-icons-register';
// element plus
import ElementPlus from 'element-plus';
// element 图标
import * as Icons from '@element-plus/icons-vue';
// 自定义指令
import directives from '@/directives/index';
// 路由
import router from '@/routers';
// 语言包
import I18n from '@/languages/index';
// pinia 仓库
import pinia from '@/stores';
// 全局错误
import errorHandler from '@/utils/errorHandler';
// 自定义样式
import '@/assets/styles/app.scss';
const app = createApp(App);

app.config.errorHandler = errorHandler;
// 全局注册element图标
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount('#app');
