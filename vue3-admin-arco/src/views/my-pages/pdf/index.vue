<script lang="ts" setup>
import VuePdfEmbed from 'vue-pdf-embed'
import { createLoadingTask } from 'vue3-pdfjs/esm'

const loading = ref(true)
const BaseUrl = import.meta.env.VITE_BASE_URL as string
const file = `${BaseUrl}/pdf/plans.pdf`
const state = reactive({
  source: file,
  pageNum: 1,
  scale: 1, // 缩放比例
  numPages: 0, // 总页数
})

// loading.value = true
onMounted(() => {
  const loadingTask = createLoadingTask(state.source)
  loadingTask.promise.then((pdf: { numPages: number }) => {
    state.numPages = pdf.numPages
    loading.value = false
  })
})
const scale = computed(() => `transform:scale(${state.scale})`)
function lastPage() {
  if (state.pageNum > 1) {
    state.pageNum -= 1
  }
}
function nextPage() {
  if (state.pageNum < state.numPages) {
    state.pageNum += 1
  }
}
function pageZoomOut() {
  if (state.scale < 2) {
    state.scale += 0.1
  }
}
function pageZoomIn() {
  if (state.scale > 1) {
    state.scale -= 0.1
  }
}
</script>
<template>
  <a-card class="app-page-pdf relative" :loading="loading">
    <div class="page-tool">
      <div class="page-tool-item" @click="lastPage"> 上一页 </div>
      <div class="page-tool-item" @click="nextPage"> 下一页 </div>
      <div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
      <div class="page-tool-item" @click="pageZoomOut"> 放大 </div>
      <div class="page-tool-item" @click="pageZoomIn"> 缩小 </div>
    </div>
    <div class="pdf-preview relative">
      <div class="pdf-wrap">
        <vue-pdf-embed :source="state.source" :style="scale" class="vue-pdf-embed" :page="state.pageNum" />
      </div>
    </div>
  </a-card>
</template>
<style lang="scss">
.app-page-pdf {
  min-height: calc(100vh - 180px);
}
.pdf-preview {
  width: 80%;
  height: calc(100vh - 150px);
  margin: 0 auto;
  overflow-y: auto;
  background-color: #e9e9e9;
  box-sizing: border-box;
  .vue-pdf-embed {
    margin: 0 auto;
  }
}
.pdf-wrap {
  overflow-y: auto;
}
.vue-pdf-embed {
  width: 100%;
  margin: 10px auto;
  text-align: center;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
}
.page-tool {
  width: 330px;
  margin: -10px auto 10px;
  z-index: 100;
  display: flex;
  padding-right: 15px;
  padding-left: 15px;
  color: white;
  cursor: pointer;
  background: rgb(66, 66, 66);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
}
.page-tool-item {
  padding: 8px 15px;
  padding-left: 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #666;
  }
}
</style>
