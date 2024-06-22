import { createApp } from "vue";
import App from "./App.vue";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// svg icons
import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// 自定义指令
import directives from "@/directives/index";
// vue Router
import router from "@/routers";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores";
// 全局错误
import errorHandler from "@/utils/errorHandler";
// 自定义样式
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
const app = createApp(App);

app.config.errorHandler = errorHandler;

// 全局注册element图标
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount("#app");
