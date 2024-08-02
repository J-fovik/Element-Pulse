<template>
  <el-switch v-model="globalStore.isDark" inline-prompt :active-icon="Sunny" :inactive-icon="Moon" @change="switchDark" />
</template>

<script setup lang="ts" name="SwitchDark">
import { useTheme } from "@/hooks";
import { useGlobalStore } from "@/stores";
import { Sunny, Moon } from "@element-plus/icons-vue";
// 解构方法
const { switchDark } = useTheme();
const globalStore = useGlobalStore();
</script>
