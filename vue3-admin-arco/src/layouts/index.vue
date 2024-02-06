<script setup lang="ts">
import AppHeader from './Header/index.vue' // 头部
import RootSider from './RootSider/index.vue' // 一级路由
import SiderBar from './SiderBar/index.vue' // 二级路由
import AppContent from './Content/index.vue' // 右边设置内容
import Settings from './Settings/index.vue' // 设置
import TagsView from './TagsView/index.vue' // tag页面

import './css/index.scss'

import { useAppStore } from '@/store'
import { computed } from 'vue'
const appStore = useAppStore()
// 判断navbar的布尔值
const navbar = computed(() => appStore.navbar)
// 判断menu的布尔值
const menu = computed(() => appStore.menu)

</script>
<template>
  <a-layout class="app-layout" style="min-height: 100vh">
    <a-layout>
      <RootSider />
      <SiderBar v-if="menu" />
      <a-layout>
        <AppHeader v-if="navbar" />
        <TagsView />
        <AppContent />
      </a-layout>
    </a-layout>
  </a-layout>
  <Settings />
</template>
