import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { VueClipboard } from '@soerenmartius/vue3-clipboard' // 剪切板
import print from 'vue3-print-nb' // 打印
import VuePdf from 'vue3-pdfjs' // pdf预览
import VueViewer from 'v-viewer' // 图片预览

import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission'

import '@arco-design/web-vue/dist/arco.css'
import 'viewerjs/dist/viewer.css'
import '@/styles/app.scss'
import 'animate.css'
import 'uno.css'

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(router)
app.use(store)
// 剪切板
app.use(VueClipboard)
// 打印
app.use(print)
// PDF预览
app.use(VuePdf)
// 图片预览
app.use(VueViewer)

app.mount('#app')
