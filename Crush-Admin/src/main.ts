import { createApp } from 'vue';
import App from './App.vue';
// pinia 仓库
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
// 导入并注册 SVG 图标
import 'virtual:svg-icons-register';
// element plus
import ElementPlus from 'element-plus';
// element 图标
import * as Icons from '@element-plus/icons-vue';
// 自定义指令
import { directives } from '@/directives/index';
// 路由
import router from '@/routers';
// 语言包
import I18n from '@/languages/index';
import VueGridLayout from 'vue-grid-layout';
// 全局错误
import errorHandler from '@/utils/errorHandler';
// 样式
import '@/assets/styles/app.scss';
// 阻止默认事件
import { addPreventDefault } from '@/utils/other';
const app = createApp(App);
const pinia = createPinia();
// 仓库持久化
pinia.use(piniaPluginPersistedstate);
app.config.errorHandler = errorHandler;
// 全局注册element图标
Object.keys(Icons).forEach((key) => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
// 自定义指令
directives(app);
// addPreventDefault();
app.use(ElementPlus).use(router).use(I18n).use(VueGridLayout).use(pinia).mount('#app');
