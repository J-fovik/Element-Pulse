import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import { directive } from '/@/directive/index';
import { i18n } from '/@/i18n/index';
import other from '/@/utils/other';
import ElementPlus from 'element-plus';
import '/@/theme/index.scss';
// 可拖拽和可调整大小的网格布局
import VueGridLayout from 'vue-grid-layout';
const app = createApp(App);
// 自定义指令
directive(app);
// 全局使用方法以及全局注册的icon图标组件
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus).use(i18n).use(VueGridLayout).mount('#app');
