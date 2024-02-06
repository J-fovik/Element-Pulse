<script setup lang="ts">
import { useAppStore } from '@/store'

const appStore = useAppStore()
// 点击展开收起
const toggleSiderBar = () => {
  appStore.setCollapsed(!appStore.collapsed)
}
</script>
<template>
  <div className="app-hamburger" @click="toggleSiderBar">
    <a-button size="mini">
      <icon-menu-unfold v-if="appStore.collapsed" />
      <icon-menu-fold v-else />
    </a-button>
  </div>
</template>
<style>
.app-hamburger {
  cursor: pointer;
  margin-left: 20px;
}
</style>
