<template>
  <el-card shadow="hover" header="长按指令">
    <span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
    <el-button v-longpress="longpress" type="primary"> 长按2秒触发事件 </el-button>
  </el-card>
</template>

<script setup lang="ts" name="longpressDirect">
import { ElMessage } from "element-plus";
const longpress = () => {
  ElMessage.success("长按事件触发成功 🎉🎉🎉");
};
</script>

<style scoped lang="scss"></style>
