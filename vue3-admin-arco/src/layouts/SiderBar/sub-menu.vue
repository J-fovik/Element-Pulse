<script lang="ts" setup name="SubMenu">
import { toRef } from 'vue'
import AppIcon from '@/components/AppIcon/index.vue'

interface MenuProps {
  nav: any
}
// 使用 defineProps 获取 props 对象
const props = defineProps<MenuProps>()
const nav = toRef(props, 'nav') // 接受父组件传来的数组nav
</script>
<template>
  <a-sub-menu :key="nav.path">
    <template #title>
      <span>
        <AppIcon :type="nav.meta.icon" />
        <span>{{ nav.meta.title }}</span>
      </span>
    </template>
    <template v-for="(item, index) in nav.children">
      <!-- 如果子菜单项没有子菜单 -->
      <a-menu-item v-if="!item.children" :key="item.path" :title="item.meta.title">
        <span class="app-menu-item-inner-title">
          <AppIcon :type="item.meta.icon" />
          {{ item.meta.title }}
        </span>
      </a-menu-item>
      <!-- 如果子菜单项有子菜单，递归渲染 SubMenu 组件 -->
      <SubMenu v-else :key="index" :nav="item" />
    </template>
  </a-sub-menu>
</template>
<style lang="scss"></style>
