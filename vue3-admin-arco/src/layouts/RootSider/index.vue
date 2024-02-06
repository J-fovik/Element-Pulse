<script setup lang="ts">
import { routerArray, routes } from '@/router' // 导入路由数组
import { useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon/index.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const router = useRouter()
const collapsed = ref(false)
// 默认打开一级路由下面的二级路由的第一条路径
const openedMenu = computed(() => router.currentRoute.value.matched[0].path)

// 点击一级路由左侧菜单获取一级路由路径
const handleMenu = (path: string) => {
  setPath(path) // 调用函数设置路径
  router.push(path) // 跳转路由
}
// 设置路径
const setPath = (path: string) => {
  const current = getCurrentMenu(routes, path) // 调用函数
  current && appStore.setRoutes(current) // 调用useAppStore仓库的设置路由方法
}
// 定一个函数接受路由和当前一级路径，返回当前活跃路由对象
const getCurrentMenu = (routers: any, path: string) => {
  return routers.find((item: any) => item.path === path)
}
// 初始化默认设置路由路径
setPath(router.currentRoute.value.matched[0].path)
</script>
<template>
  <a-layout-sider style="width: 100px" class="app-root-sider">
    <a-menu theme="dark" :collapsed="collapsed" :default-selected-keys="[openedMenu]" @menu-item-click="handleMenu">
      <a-menu-item v-for="item in routerArray" :key="item.path">
        <AppIcon :type="item?.meta?.icon" />
        <span class="name">{{ item?.meta?.title }} </span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
