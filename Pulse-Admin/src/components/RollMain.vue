<template>
    <el-main class="roll-main">
        <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <div class="bottom">
            分页区域
        </div>
    </el-main>
    <el-drawer v-model="drawer" title="上传图片">
      <!-- 上传图片组件 -->
      <UploadFile :data="{ image_class_id }" @success="handleUploadSuccess"/>
    </el-drawer>
</template>
<script setup>
import { ref } from "vue"
import UploadFile from "./UploadFile.vue";
// 上传图片
const drawer = ref(false)
// 此id是分类id
const image_class_id = ref(133)
// 打开侧边抽屉
const openUploadFile = ()=>drawer.value = true
// 上传成功
const handleUploadSuccess = ()=>{
  // 执行操作
}
// 向父组件暴漏打开上传文件抽屉方法
defineExpose({
  openUploadFile
})


</script>

<style>
/* 相对定位 */
.roll-main{
  position: relative;
  background-color: #ffffff !important;
}
/* 居上，左右铺满，y轴自动溢出滚动 */
.roll-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.roll-main .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>