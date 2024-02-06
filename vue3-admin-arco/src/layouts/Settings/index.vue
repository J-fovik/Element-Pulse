<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import Column from './column.vue'

const appStore = useAppStore()
const visible: any = computed(() => appStore.globalSettings)
const contentOpts = [
  { name: '导航栏', key: 'navbar', defaultVal: appStore.navbar },
  { name: '菜单栏', key: 'menu', defaultVal: appStore.menu },
]
const othersOpts = [{ name: '暗黑模式', key: 'colorWeek', defaultVal: appStore.colorWeek }]
// 关闭drawer设置
const handleCancel = () => {
  appStore.updateSettings({ globalSettings: false })
  // 获取实时的状态
  // 赋值给 contentOpts 数组的 defaultVal 属性
  contentOpts.forEach(opt => {
    if (opt.key === 'navbar') opt.defaultVal = appStore.navbar
    else if (opt.key === 'menu') opt.defaultVal = appStore.menu
  })
  // 赋值给 othersOpts 数组的 defaultVal 属性
  othersOpts.forEach(opt => {
    if (opt.key === 'colorWeek') opt.defaultVal = appStore.colorWeek
  })
}
</script>
<template>
  <a-drawer :visible="visible" @cancel="handleCancel" unmount-on-close :footer="false">
    <template #title>全局配置</template>
    <Column :options="contentOpts" title="内容区域" />
    <a-divider class="app-drawer-div" />
    <Column :options="othersOpts" title="其它设置" />
  </a-drawer>
</template>
<style lang="scss">
.arco-drawer {
  .arco-drawer-header {
    display: none;
  }
}

.app-drawer-div {
  border-bottom-style: dashed;
  margin: 10px 0 15px;
}
</style>
