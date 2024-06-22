<template>
  <el-card shadow="hover" header="防抖按钮">
    <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
    <el-button v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </el-button>
  </el-card>
</template>

<script setup lang="ts" name="debounceDirect">
import { ElMessage } from "element-plus";
const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>
<style scoped lang="scss"></style>
