<template>
  <!-- 展开折叠 -->
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
// 改变展开或折叠
const changeCollapse = () => globalStore.setGlobalState("isCollapse", !globalStore.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
