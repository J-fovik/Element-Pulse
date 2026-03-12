# Crush-Admin

## 文件资源目录 📚

```ts
├── Crush-Admin
    ├─ .vscode # VSCode 推荐配置
    ├─ build # Vite 配置项
    ├─ public # 静态资源文件（该文件夹不会被打包）
    ├─ src
    │ ├─ api # API 接口管理
    │ ├─ assets # 静态资源文件
    │ ├─ components # 全局组件
    │ ├─ config # 全局配置项
    │ ├─ directives # 全局指令文件
    │ ├─ hooks # 常用 Hooks 封装
    │ ├─ languages # 语言国际化 i18n
    │ ├─ layouts # 框架布局模块
    │ ├─ routers # 路由管理
    │ ├─ stores # pinia store
    │ ├─ typings # 全局 ts 声明
    │ ├─ utils # 常用工具库
    │ ├─ views # 项目所有页面
    │ ├─ App.vue # 项目主组件
    │ ├─ auto-import.d.ts # 自动引入
    │ ├─ components.d.ts # 全局注册组件
    │ ├─ main.ts # 项目入口文件
    │ └─ vite-env.d.ts # 指定 ts 识别 vue
    ├─ .env # vite 常用配置
    ├─ .env.development # 开发环境配置
    ├─ .env.production # 生产环境配置
    ├─ .env.test # 测试环境配置
    ├─ .gitignore # 忽略 git 提交
    ├─ index.html # 入口 html
    ├─ package-lock.json # 依赖包包版本锁
    ├─ package.json # 依赖包管理
    ├─ README.md # README 介绍
    ├─ tsconfig.json # typescript 全局配置
    └─ vite.config.ts # vite 全局配置文件
```

## 路由配置

注:本项目为前端注册路由,可根据后端返回路由菜单 name 进行路由权限拦截

```ts
/** 路由参数简介 \*/
interface RouteRecordRaw {
   /** 路由访问路径 \*/
   path: string;
   /** 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选) \*/
   name: string;
   /** 路由重定向地址 \*/
   redirect: string;
   /** 视图文件路径 \*/
   component: string | (() => Promise<unknown>);
   /** 路由元信息 \*/
   meta: {
        /** 菜单和面包屑对应的图标 \*/
        icon: string;
        /** 路由标题 (用作 document.title || 菜单的名称) \*/
        title: string;
        /** 排序 \*/
        order: number;
        /** 是否在菜单中隐藏, 需要高亮的 path (通常用作详情页高亮父级菜单) \*/
        activeMenu: string;
        /** 路由外链时填写的访问地址 \*/
        isLink: string;
        /** 是否在菜单中隐藏 (通常列表详情页需要隐藏) \*/
        isHide: boolean;
        /** 菜单是否全屏 (示例：数据大屏页面) \*/
        isFull: boolean; ??
        /** 菜单是否固定在标签页中 (首页通常是固定项) \*/
        isAffix: boolean;
        /** 当前路由是否缓存 \*/
        isKeepAlive: boolean;
        /** 是否需要认证 \*/
        requiresAuth: boolean;
   };
        /** 多级路由嵌套 \*/
   children: RouteRecordRaw[];
}
```

## Hooks 方法

```ts
├── src/hooks/modules
	├── useAsyncRequest.ts (异步处理请求)
	├── useAuthButtons.ts (页面按钮权限)
	├── useBase.ts (基本方法包括state、set、map)
	├── useCountDown.ts (倒计时)
	├── useCreateScript.ts (创建script标签)
	├── useDebounceCustomRef.ts (输入框防抖)
	├── useFullscreenLoading.ts (全局Loading)
	├── useInterval.ts (定时器)
	├── useNetworkStatus.ts (网络状态)
	├── useRequest.ts (请求二次封装)
	├── useScreenSize.ts (屏幕尺寸)
	├── useTable.ts (菜单表格包括表格、表单)
	├── useTheme.ts (全局主题)
	├── useTime.ts (获取本地时间)
	└── useWebSocket.ts (WebSocket)

注释:useCreateScript, useDebounceCustomRef, useRequest 可放utils里
```

## 公共方法

```ts
├── src/utils
	├── arrayOperation.ts (数组相关方法)
	├── color.ts (颜色主题相关)
	├── china.ts (EChart地图)
	├── commonFunction.ts (通用函数)
	├── elementPlus.ts (Element组件二次封装)
	├── errorHandler.ts (全局代码错误捕捉)
	├── fileOperation.ts (文件相关)
	├── formatTime.ts (时间日期相关)
	├── getStyleSheets.ts (获取样式表)
	├── loading.ts (全局loading样式)
	├── mittBus.ts (mitt事件总线通讯)
	├── objectOperation.ts (对象相关方法)
	├── options.ts (公共options数据)
	├── other.ts (其他方法)
	├── rules.ts (规则校验集合)
	├── setIconfont.ts (设置字体图标)
	├── storage.ts (浏览器缓存相关)
	├── type.ts (type类型相关)
    ├── watermark.ts (页面水印)
	└── window.ts (浏览器操作相关)
```

## 字体图标

```
    注：本项目用到两种引入方式
        一：下载到本地 (@/assets/iconfont)
        二：引入线上图标 (@/utils/setIconfont.ts)
```

## 校验、格式化代码：

````

    <!-- 检测代码 -->

    npm lint:eslint

    <!-- 格式化代码 -->

    npm lint:prettier

    <!-- 格式化样式 -->

    npm lint:stylelint

```
````

## 菜单权限

只需要处理 @/stores/modules/user.ts (三种方式控制菜单权限)

```
    // 获取菜单权限
	const authMenuListGet = async () => {
		// 一：根据前端定义路由
		const frontRouteList = appMenus;

		// 二：根据接口返回路由
		const { data } = await getAuthMenuListApi();
		const backRouteList = elevateTitles(data);

		// 三：根据后端name数组过滤前端定义的路由(目前用缓存模拟的，首次使用需要先给权限保存缓存才行)，这种情况暂不支持三级菜单
		const reduceRoutesList = reduceRoutes(appMenus, Session.get('menu'));
		authMenuList.value = backRouteList;
	};

```

## 请求二次封装

方式一：传入@/api/modules 文件夹下接口，所有参数都@/api/modules 里面函数里定义
详情请看 @/views/login/components/loginForm.vue
import { curryingRequest } from '@/hooks';

```
    export const curryingRequest = async <T = any>(
        api: () => Promise<any>, // 请求接口 (@/api/modules文件夹下)
        options?: {
            before?: () => void;
            after?: () => void;
            successMsg?: string;
        }
    ) => {
        // 默认值
        const params: { res: HttpResponse<T> | null; err: HttpError | null } = {
            res: null,
            err: null,
        };
        // 请求之前
        if (options?.before) options.before();
        // 请求监听 处理错误
        try {
            const res = await api();
            params.res = res as HttpResponse<T>;
        } catch (err: any) {
            params.err = err as HttpError;
        }
        // 请求之后
        if (options?.after) options.after();
        // 请求成功提示
        if (!params.err && options?.successMsg) ElMessage.success(options.successMsg);
        // 返回结果
        return params;
    };
```

方式二：传入@/api/url 文件夹下接口，所有参数都在调用时传入 (便于维护)
详情请看 @/views/login/components/LoginFormUrl.vue
import { curryingRequestUrl, URL } from '@/hooks';

```
    export const curryingRequestUrl = async <T = any>(
        requestConfig: AxiosRequestConfig<any>, // 请求接口 (@/api/url 文件夹下)
        options?: {
            before?: () => void;
            after?: () => void;
            successMsg?: string;
        }
    ) => {
        // 默认值
        const params: { res: HttpResponse<T> | null; err: HttpError | null } = {
            res: null,
            err: null,
        };
        // 请求前
        if (options?.before) options.before();
        // 请求监听 处理错误
        try {
            const res = await request(requestConfig);
            params.res = res as any as HttpResponse<T>;
        } catch (err: any) {
            params.err = err as HttpError;
        }
        // 请求前
        if (options?.after) options.after();
        // 请求成功提示
        if (!params.err && options?.successMsg) ElMessage.success(options.successMsg);
        // 返回结果
        return params;
    };
```
