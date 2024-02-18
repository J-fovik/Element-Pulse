<template>
  <el-container class="rounded bg-white" :style="{ height: (h + 'px') }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate">新增</el-button>
      <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
    </el-header>
    <el-container>
      <RollAside ref="RollAsideRef"/>
      <RollMain ref="RollMainRef"/>
    </el-container>
  </el-container>
</template>
<script setup>
import { ref } from "vue";
import RollAside from "@/components/RollAside.vue"
import RollMain from "@/components/RollMain.vue"
// 获取浏览器的高度
const windowHeight = window.innerHeight || document.body.clientHeight
// 内容高度为浏览器高度-头部高度-tab列表高度-padding
const h = windowHeight - 64 - 44 - 40
// 定义ref实例
const RollAsideRef = ref(null)
const RollMainRef = ref(null)

// 点击新增按钮调用RollAside组件暴漏的handleCreate的方法
const handleOpenCreate = ()=>RollAsideRef.value.handleCreate()
// 打开上传图片调用RollMainRef组件暴漏的openUploadFile的方法
const handleOpenUpload = ()=>RollMainRef.value.openUploadFile()

</script>
<style>
.image-header{
border-bottom: 1px solid #eeeeee;
@apply flex items-center;
}
</style>