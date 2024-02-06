<script lang="ts" setup>
import View from '@/components/View/index.vue'
import Watermark from 'watermark-plus'
import { ProjectName } from '@/config/constants'

const watermark = new Watermark({
  content: ProjectName,
})

function init() {
  watermark.create()
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  watermark.destroy()
})
</script>
<template>
  <View class="app-page">
    <a-card>文档正在开发中</a-card>
  </View>
</template>
<style lang="scss"></style>
