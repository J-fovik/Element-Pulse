# 路由：

## 一、前端控制路由：

由前端自定义路由并渲染菜单路由

### 1、permission.js文件引入addRoutes方法，store.dispatch("getinfo")解构menus数组 ，最后调用传入数组addRoutes(menus)

### 2、@/router文件添加路由

### 3、@/layouts/components/FMenu.vue里 const afterAsideMenus = computed(() => store.state.menus)并遍历数据

## 二、后端控制路由：

由后端返回路由并对比前端路由渲染菜单路由

### 1、permission.js

### 2、@/router

### 3、@/layouts/components/FMenu.vue里 import { routerArray as frontAsideMenus } from '@/router' // 导入前端控制路由数组