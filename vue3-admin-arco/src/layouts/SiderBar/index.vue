<script setup lang="ts">
import { useAppStore, useTagStore } from '@/store'
import { computed, ref, watch } from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
import AppIcon from '@/components/AppIcon/index.vue'
import { set } from '@vueuse/core' // 以维持响应性的方式更新可响应对象或 ref 的值。它确保对对象或 ref 所做的更改能够被 Vue 的响应性系统正确追踪

import SubMenu from './sub-menu.vue'
// 获取仓库实例
const appStore = useAppStore()
const tagStore = useTagStore()

const router = useRouter()
const route = useRoute()
// 获取应用的路由配置
const menu: any = computed(() => appStore.routes)
const openKeys = ref<string>('') // 打开的菜单项
const selectedKeys = ref<string>('') // 当前路由的路径

// 辅助函数：将路由对象映射为面包屑格式
const selectBreadcrumb = (routes: any) => routes.map(({ path, meta: { title } }: any) => ({ title, path }))
// 辅助函数：设置菜单的打开和选中状态
const setMenuKeys = (r: RouteLocationNormalized) => {
  // 设置 openKeys（打开的菜单项）的值，如果当前路由的层级大于等于 2，就取倒数第二层的路径，否则为空字符串。
  set(openKeys, r.matched.length >= 2 ? r.matched.slice(-2, -1)[0].path : '')
  // 设置 selectedKeys（选中的菜单项）的值为当前路由的路径
  set(selectedKeys, r.path)
  // 调用函数，将当前路由的 matched 属性映射为面包屑格式的数组 currentMenu
  const currentMenu = selectBreadcrumb(r.matched)
  const tag = r.matched.slice(-1)[0]
  // 获取当前路由的最后一层路由对象，并设置面包屑列表
  appStore.setBreadcrumbList(currentMenu)
  // 将当前路由的最后一层路由对象添加为标签，其中包含标题（title）和路径（path）信息
  tagStore.addTag({ title: tag.meta.title, path: tag.path })
}
// 菜单项点击事件处理函数
const onMenuClick = (key: string) => {
  router.push(key)
}
// 监听路由变化，更新菜单状态
watch(() => route, setMenuKeys, {
  immediate: true,
  deep: true,
})
</script>
<template>
  <a-layout-sider class="app-sider" :collapsed="appStore.collapsed">
    <a-menu :style="{ height: '100%' }" :default-open-keys="[openKeys]" :auto-open-selected="true"
      :selected-keys="[selectedKeys]" breakpoint="xl" @menu-item-click="onMenuClick">
      <!-- 使用 v-for 遍历菜单项 -->
      <template v-for="nav in menu.children" :key="nav.path">
        <!-- 如果菜单项没有子菜单或只有一个子菜单 -->
        <template v-if="nav?.children?.length === 1">
          <!-- 渲染菜单项 -->
          <a-menu-item :key="nav.path" :title="nav.children[0].meta.title">
            <!-- 使用 AppIcon 组件渲染菜单项的图标 -->
            <AppIcon :type="nav.children[0].meta.icon" />
            <!-- 显示菜单项的标题 -->
            <span>{{ nav.children[0].meta.title }}</span>
          </a-menu-item>
        </template>
        <!-- 如果菜单项有多个子菜单 -->
        <template v-else>
          <!-- 渲染带子菜单的菜单项 -->
          <a-menu-item v-if="!nav.children" :key="nav.path" :path="nav.path" :title="nav.meta.title">
            <!-- 使用 AppIcon 组件渲染菜单项的图标 -->
            <AppIcon :type="nav.meta.icon" />
            <!-- 显示菜单项的标题 -->
            <span class="name">{{ nav.meta.title }} </span>
          </a-menu-item>
          <!-- 递归渲染子菜单 -->
          <SubMenu v-else :nav="nav" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
