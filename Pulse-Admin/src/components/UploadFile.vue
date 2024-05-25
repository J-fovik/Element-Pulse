<template>
  <!-- drag	是否启用拖拽上传 -->
  <!-- action	请求 URL -->
  <!-- multiple	是否支持多选文件 -->
  <!-- headers	设置上传的请求头部 -->
  <!-- ** name	上传的文件字段名 ** -->
  <!-- data	上传时附带的额外参数  -->
  <el-upload drag :action="uploadImageAction" multiple :headers="{
    token
  }" name="img" :data="data" :on-success="uploadSuccess" :on-error="uploadError">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
<script setup>
// 导入接口地址
import { uploadImageAction } from "@/api/image"
import { getToken } from "@/composables/auth"
import { toast } from "@/composables/util"
// 获取token
const token = getToken()

// 接受传过来的参数
defineProps({
  data: Object,
})

const emit = defineEmits(["success"])
// 上传成功后操作
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  emit("success", {
    response, uploadFile, uploadFiles
  })
}
// 上传失败后操作
const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).msg || "上传失败"
  toast(msg, "error")
}
</script>