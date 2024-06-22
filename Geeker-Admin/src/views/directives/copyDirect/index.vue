<template>
  <el-card shadow="hover" header="复制指令">
    <span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="box-content">
      <el-input v-model="data" placeholder="请输入内容" style="width: 500px">
        <template #append>
          <el-button v-copy="data"> 复制 </el-button>
        </template>
      </el-input>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="copyDirect">
const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");
</script>

<style scoped lang="scss"></style>
