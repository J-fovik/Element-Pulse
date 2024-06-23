# Geeker-Admin

### 文件资源目录 📚

```text
Geeker-Admin
├─ .husky                  # husky 配置文件
├─ .vscode                 # VSCode 推荐配置
├─ build                   # Vite 配置项
├─ public                  # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                  # API 接口管理
│  ├─ assets               # 静态资源文件
│  ├─ components           # 全局组件
│  ├─ config               # 全局配置项
│  ├─ directives           # 全局指令文件
│  ├─ hooks                # 常用 Hooks 封装
│  ├─ languages            # 语言国际化 i18n
│  ├─ layouts              # 框架布局模块
│  ├─ routers              # 路由管理
│  ├─ stores               # pinia store
│  ├─ styles               # 全局样式文件
│  ├─ typings              # 全局 ts 声明
│  ├─ utils                # 常用工具库
│  ├─ views                # 项目所有页面
│  ├─ App.vue              # 项目主组件
│  ├─ auto-import.d.ts     # 自动引入
│  ├─ components.d.ts      # 全局注册组件
│  ├─ main.ts              # 项目入口文件
│  └─ vite-env.d.ts        # 指定 ts 识别 vue
├─ .env                    # vite 常用配置
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .env.test               # 测试环境配置
├─ .gitignore              # 忽略 git 提交
├─ index.html              # 入口 html
├─ package-lock.json       # 依赖包包版本锁
├─ package.json            # 依赖包管理
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
└─ vite.config.ts          # vite 全局配置文件
```

### 路由配置

/** 路由参数简介 \*/
interface RouteRecordRaw {
/** 路由访问路径 _/
path: string;
/\*\* 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选) _/
name: string;
/** 路由重定向地址 \*/
redirect: string;
/** 视图文件路径 _/
component: string | (() => Promise<unknown>);
/\*\* 路由元信息 _/
meta: {
/** 菜单和面包屑对应的图标 \*/
icon: string;
/** 路由标题 (用作 document.title || 菜单的名称) _/
title: string;
/\*\* 是否在菜单中隐藏, 需要高亮的 path (通常用作详情页高亮父级菜单) _/
activeMenu: string;
/** 路由外链时填写的访问地址 \*/
isLink: string;
/** 是否在菜单中隐藏 (通常列表详情页需要隐藏) _/
isHide: boolean;
/\*\* 菜单是否全屏 (示例：数据大屏页面) _/
isFull: boolean;
/** 菜单是否固定在标签页中 (首页通常是固定项) \*/
isAffix: boolean;
/** 当前路由是否缓存 _/
isKeepAlive: boolean;
};
/\*\* 多级路由嵌套 _/
children: RouteRecordRaw[];
}
