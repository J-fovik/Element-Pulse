# 一、目录：

```
├── vueNextAdmin
	├── public (存放浏览器标题favicon.ico、静态json数据)
	│
	├── src (存放视图、工具类、image)
	│	├── api (与服务端对接的接口函数定义。建议视图文件夹与api文件夹相同，如login文件夹)
	│	│   ├── login (登录接口函数)
	│	│   └── menu (菜单接口函数)
	│	│
	│	├── assets (本地静态资源：图片、svg等)
	│	│
	│	├── components (存放公用全局组件)
	│	│   ├── auth (鉴权)
	│	│   ├── cropper (裁剪图片)
	│	│   ├── editor (富文本编辑器)
	│	│   ├── iconSelector (图标选择器)
	│	│   ├── noticeBar (滚动通知)
	│	│   ├── svgIcon (自定义封装 svg 图标)
	│	│   └── customTable (自定义封装 table菜单)
	│	│   └── tablePlus (自定义封装 table)
	│	│
	│	├── directive (自定义指令内容)
	│	│
	│	├── hooks (自定义封装hooks)
	│	│
	│	├── i18n (存放框架国际化内容)
	│	│   ├── lang (框架内置国际化)
	│	│   └── pages (自定义国际化)
	│	│       ├── formI18n (表单)
	│	│       ├── home (首页)
	│	│       └── login (登录页)
	│	│
	│	├── layout (存放框架布局视图)
	│	│   ├── component (布局公用组件)
	│	│   ├── footer (页脚)
	│	│   ├── lockScreen (锁屏)
	│	│   ├── logo (logo)
	│	│   ├── main (主布局)
	│	│   ├── navBars (顶栏信息)
	│	│   │   ├── topBar (面包屑、关闭全屏、菜单搜索、布局配置、用户信息、消息通知)，（v2.4.33版本改）
	│	│   │   └── tagsView (标签页)
	│	│   ├── navMenu (导航菜单)
	│	│   ├── routerView (路由视图出口、外链、iframe内嵌)
	│	│   ├── upgrade (版本升级提示组件)
	│	│   └── sponsors (赞助商组件)
	│	│
	│	├── router (存放路由信息)
	│	│
	│	├── stores (存放组件的状态 pinia)
	│	│
	│	├── theme (存放框架样式)
	│	│   ├── common (基础样式)
	│	│   ├── media (媒体查询)
	│	│   └── mixins (scss混入)
	│	│
	│	├── types (ts 类型定义文件)
	│	│   ├── axios.d.ts (扩展 axios 数据返回类型，可自行扩展)
	│	│   ├── global.d.ts (全局 ts 类型定义申明)
	│	│   ├── layout.d.ts (layout 布局 ts 类型定义申明)
	│	│   ├── mitt.d.ts (mitt 事件总线 ts 类型定义申明)
	│	│   ├── pinia.d.ts (pinia ts 类型定义申明)
	│	│   └── views.d.ts (views 视图各界面 ts 类型定义申明)
	│	│
	│	├── utils (存放工具类函数)
	│	│
	│	├── views (存放页面视图)
	│	│		├── error (404、401)
	│	│		├── fun (功能演示)
	│	│		│   ├── clipboard (复制剪切)
	│	│		│   ├── countup (countup 数字滚动)
	│	│		│   ├── cropper (cropper 图片裁剪)
	│	│		│   ├── gridLayout (拖拽布局)
	│	│		│   ├── printJs (页面打印)
	│	│		│   ├── qrcode (qrcode 二维码生成)
	│	│		│   ├── splitpanes (窗格拆分器)
	│	│		│   ├── tagsView (tagsView 操作)
	│	│		│   └── wangEditor (wangEditor 编辑器)
	│	│		├── home (首页)
	│	│		├── limits (权限管理演示)
	│	│		│   ├── backEnd (后端控制)
	│	│		│   │   └── page (页面权限)
	│	│		│   └── frontEnd (前端控制)
	│	│		│       ├── btn (按钮权限)
	│	│		│       └── page (页面权限)
	│	│		├── login (登录界面)
	│	│		│   └── component (登录界面组件)
	│	│		├── pages (页面演示)
	│	│		│   ├── dynamicForm (动态复杂表单)
	│	│		│   ├── fadeUp (页面平滑上升)
	│	│		│   ├── formRules (多表单验证)
	│	│		│   │   └── component (多表单验证各组件)
	│	│		│   ├── lazyImg (图片懒加载)
	│	│		│   ├── tableRules (表单表格验证)
	│	│		│   ├── tree (树形改表格)
	│	│		│   ├── waterfall (瀑布屏)
	│	│		│   └── workflow (工作流)
	│	│		│       └── component (工作流组件)
	│	│		│           ├── contextmenu (工作流右键菜单)
	│	│		│           └── drawer (工作流拖拽组件)
	│	│		├── make (组件封装)
	│	│		│   ├── selector (图标选择器)
	│	│		│   ├── noticeBar (滚动通知栏)
	│	│		│   ├── svgDemo (svg 演示)
	│	│		│   └── tableDemo (自定义封装 table)
	│	│		├── params (路由参数演示)
	│	│		│   ├── common (普通路由)
	│	│		│   └── dynamic (动态路由)
	│	│		├── personal (个人中心)
	│	│		├── system (系统设置)
	│	│		│   ├── menu (菜单管理)
	│	│		│   │   └── component (菜单管理组件)
	│	│		│   └── user (用户管理)
	│	│		└── tools (工具类集合)
	│   │
	│	├── App.vue(应用程序的入口点)
	│	├── auto-import.d.ts(自动全局导入插件)
	│	├── components.d.ts(全局注册组件插件)
	│	└── main.ts(项目的入口文件)
	│
	├── .env (全局默认配置文件，无论什么环境都会加载合并)
	├── .env.development (开发环境的配置文件)
	├── .env.production (生产环境的配置文件)
	├── .eslintignore (eslint忽略配置)
	├── .eslintrc.js (eslint配置)
	├── .gitignore (git提交忽略配置)
	├── .prettierrc.js (prettier代码格式化配置)
	├── index.html (用户页面访问入口)
	├── package-lock.json (npm锁定安装时的包的版本号)
	├── package.json (包的依赖管理配置文件)
	├── README.md (框架介绍文件)
	├── tsconfig.json (ts配置文件)
	└── vite.config.ts (vite配置文件)
```

# 二、路由控制:

前端控制：/@/router/route.ts 修改菜单数据
后端控制：需先去 /src/stores/themeConfig.ts 下开启 isRequestRoutes: true，然后去 /@/api/menu/index.ts 中修改接口拿菜单数据
后端控制 与 前端控制 文件是相互独立的（互不影响），后端控制 不需要 roles 字段
还可用 router/route 里面的 routerArray 对比后端返回的数组

# 三、第三方插件使用[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#第三方插件使用)

主目录路径：[/@/views/fun](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun)，依赖位置：根目录 `package.json`

## vue-clipboard3 复制剪切[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#vue-clipboard3-复制剪切)

目录路径：[/@/views/fun/clipboard](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/clipboard)

相关库、文档：[vue-clipboard3](https://github.com/JamieCurnow/vue-clipboard3)

## countup 数字滚动[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#countup-数字滚动)

目录路径：[/@/views/fun/countup](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/countup)

相关库、文档：[countUp.js](https://github.com/inorganik/countUp.js)

## cropper 图片裁剪[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#cropper-图片裁剪)

目录路径：[/@/views/fun/cropper](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/cropper)

相关库、文档：[cropperjs](https://github.com/fengyuanchen/cropperjs)

## 地理坐标/地图[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#地理坐标-地图)

目录路径：[/@/views/fun/echartsMap](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/echartsMap)（根目录 index.html 中引入 `https://api.map.baidu.com/api?v=3.0&ak=wsijQt8sLXrCW71YesmispvYHitfG9gv&s=1`）

相关库、文档：[百度地图开放平台](https://lbsyun.baidu.com/)

## vue-grid-layout 拖拽布局[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#vue-grid-layout-拖拽布局)

目录路径：[/@/views/fun/gridLayout](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/gridLayout)

相关库、文档：[vue-grid-layout](https://github.com/jbaysolutions/vue-grid-layout)

## printJs 页面打印[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#printjs-页面打印)

目录路径：[/@/views/fun/printJs](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/printJs)

相关库、文档：[printJs](https://github.com/crabbly/Print.js)

## qrcode 二维码生成[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#qrcode-二维码生成)

目录路径：[/@/views/fun/qrcode](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/qrcode)

相关库、文档：[qrcodejs](https://github.com/davidshimjs/qrcodejs)

## splitpanes 窗格拆分器[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#splitpanes-窗格拆分器)

目录路径：[/@/views/fun/splitpanes](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/splitpanes)

相关库、文档：[splitpanes](https://github.com/antoniandre/splitpanes)

## wangEditor 编辑器[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/partyPlug/#wangeditor-编辑器)

目录路径：[/@/views/fun/wangEditor](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/fun/wangEditor)

相关库、文档：[wangEditor](https://github.com/wangeditor-team/wangEditor)

# 四、内置组件的使用[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/builtPlug/#内置组件的使用)

主目录路径：[/@/views/make](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/make)，依赖位置：根目录 `package.json`，后续整理封装更多

## 滚动通知栏[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/builtPlug/#滚动通知栏)

目录路径：[/@/components/noticeBar](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/views/make/noticeBar)

演示地址：[noticeBar](https://lyt-top.gitee.io/vue-next-admin-preview/#/make/noticeBar)

## 图标选择器[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/builtPlug/#图标选择器)

目录路径：[/@/components/iconSelector](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/components/iconSelector)

演示地址：[selector](https://lyt-top.gitee.io/vue-next-admin-preview/#/make/selector)

## svgIcon[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/builtPlug/#svgicon)

目录路径：[/@/components/svgIcon](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/components/svgIcon)

演示地址：[selector](https://lyt-top.gitee.io/vue-next-admin-preview/#/make/svgDemo)

## table[](https://lyt-top.gitee.io/vue-next-admin-doc-preview/config/builtPlug/#table)

目录路径：[/@/components/table](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/components/table)

演示地址：[table](https://lyt-top.gitee.io/vue-next-admin-preview/#/make/tableDemo)

# 五、工具类集合

代码路径：[/@/utils](https://gitee.com/lyt-top/vue-next-admin/tree/master/src/utils)

```
├── src/utils
	├── arrayOperation.ts (数组方法)
	├── authFunction.ts (用户权限指令，用于函数调用)
	├── build.ts (打包时调用)
	├── commonFunction.ts (通用函数基础类)
	├── fileOperation.ts (文件相关)
	├── elementPlus.ts (element组件二次封装)
	├── formatTime.ts (时间格式化)
	├── getStyleSheets.ts (自动获取css样式、svg 图标)
	├── loading.ts (全局loading、雪花屏)
	├── mitt.ts (事件总线初始化)
	├── objectOperation.ts (对象方法)
	├── options.ts (公共options)
	├── other.ts (其它公共类)
	├── request.ts (接口请求，axios)
	├── setIconfont.ts (设置icon、svg)
	├── storage.ts (设置浏览器永久、临时缓存)
	├── theme.ts (框架主题函数)
	├── toolsValidate.ts (正则工具类)
	├── typeOf.ts (检测工具)
	└── watermark.ts (页面水印)

```
