技术栈为：Vite, Vue3, Arco, Pinia, VueUse, Axios, UnoCSS, Scss

- Pinia
  这款框架与`React`的`Mobx`思路极为相似，是吸引了`Vuex`的优点改进了之后的一个极为灵活的管理工具。
- VueUse
  这款已经是`Vue2`项目的标配了，以方便、灵活、巧妙等特点吸引了大部分开发者，而作者也是一个高产且优秀的人，还有一款`UnoCSS`随后介绍。
- UnoCSS
  UnoCSS依灵活、高速的原子化方式应用在项目中，还是比较好的。

####  其它插件

- [screenfull](https://www.npmjs.com/package/screenfull)
  主要封装浏览器全屏事件
- [@iconify/vue](https://github.com/iconify/iconify)
  可以灵活引用多处图标，可以上这个网站进行查询 [https://icones.js.org/](https://icones.js.org/)
- [qrcode.vue](https://github.com/scopewu/qrcode.vue)
  以多种方式生成二维码，可以带Logo
- [vue3-pdfjs](https://github.com/randolphtellis/vue3-pdfjs)
  预览PDFJS
- [vue3-print-nb](https://www.npmjs.com/package/vue3-print-nb)
  打印页面

#### 2.3 技术栈
技术 | 说明 | 官网
----|----|----
Vue3 | JavaScript 框架 | [https://cn.vuejs.org/](https://cn.vuejs.org/)
Vite | Vite下一代的前端工具链 | [https://cn.vitejs.dev/](https://cn.vitejs.dev/)
@arco-design/web-vue | 前端UI组件库 | [https://arco.design/vue/](https://arco.design/vue/)
@vueuse/core | Vue工具库  | [https://vueuse.org/](https://vueuse.org/)
@iconify/vue | 图标字体库  | [https://www.npmjs.com/package/@iconify/vue](https://www.npmjs.com/package/@iconify/vue)
lodash | 工具库  | [https://lodash.com/](https://lodash.com/)
Vue3-clipboard | 剪贴板  | [https://github.com/Daizhen1995/vue3-clipboard](https://github.com/Daizhen1995/vue3-clipboard)
Qrcode | 生成二维码  | [https://github.com/soldair/node-qrcode](https://github.com/soldair/node-qrcode)
Md-editor-v3 | Markdown编辑器 | [https://github.com/imzbf/md-editor-v3](https://github.com/imzbf/md-editor-v3)
Juejin-markdown-themes | Juejin MD主题  | [https://github.com/xitu/juejin-markdown-themes](https://github.com/xitu/juejin-markdown-themes)
Sass | CSS 预编译工具  | [https://sass-lang.com/](https://sass-lang.com/)
Unocss | 原子化CSS | [https://github.com/unocss/unocss](https://github.com/unocss/unocss)
Animate.css | CSS动画库  | [https://animate.style/](https://animate.style/)
#### 2.4 文件结构
```javascript
├─dist // 打包资源
├─public
│  ├─pdf // pdf测试文档
│  └─tinymce4.7.5 // 富文本
└─src
    ├─api // api文档 
    ├─assets // 静态资源文档
    ├─components // 组件文档
    ├─config // 配置文档
    ├─hooks // hooks
    ├─layouts // 布局文档
    ├─router // 路由
    ├─store // Pinia
    ├─styles // css
    ├─types // ts
    ├─utils // 工具文档
    └─views // 视图层
        ├─basic // 基础
        ├─canvas // canvas
        ├─chart // 图表
        ├─form // 表单
        ├─login // 登录
        ├─map // 地图
        ├─my-component // 组件演练场
        ├─my-pages // 页面演练场
        ├─other // 其它
        ├─table // 表格
        └─video // 视频
```
#### 2.5 如何在本地运行
根目录下运行 `npm install`，然后运行 `npm dev`
```
// 切换环境
nvm install 16.0.0
nvm use 16.0.0

// 安装依赖
npm install

// 启动项目
npm start

// 清除 node_modules
npm run clean

// 全局安装 rimraf 之后方可使用
npm i rimraf -g

// 清除 node_modules 重新安装依赖
// 等同于 npm run clean && npm install
npm run reinstall

```
