<script lang="ts" setup>
import { useAppStore } from '@/store'
import { computed } from 'vue'

const appStore = useAppStore()
// 面包屑数组
const breadcrumbList: any = computed(() => appStore.breadcrumbList)
</script>
<template>
  <div class="app-breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="(bread, index) in breadcrumbList" :key="index"> {{ bread.title }} </a-breadcrumb-item>
      <template #separator>
        <icon-right />
      </template>
    </a-breadcrumb>
  </div>
</template>

<style lang="scss">
.app-breadcrumb {
  display: inline-block;
  margin-left: 20px;
  .ant-breadcrumb {
    line-height: 64px;
  }
}
</style>
