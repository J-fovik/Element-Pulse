<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import Screenfull from 'screenfull'

const state = reactive({
  title: '全屏',
  icon: true,
})
const { icon, title } = toRefs(state)
// 点击全屏还是退出
const handleFullScreen = () => {
  if (!Screenfull.isEnabled) {
    return false
  }
  // 切换全屏还是退出
  Screenfull.toggle()
  const isFullscreen = Screenfull.isFullscreen
  state.icon = isFullscreen
  state.title = isFullscreen ? '全屏' : '退出'
}
</script>
<template>
  <div class="app-fullscreen" @click="handleFullScreen">
    <a-tooltip :content="title">
      <a-button type="outline" :shape="'circle'">
        <icon-fullscreen v-if="icon" />
        <icon-fullscreen-exit v-else />
      </a-button>
    </a-tooltip>
  </div>
</template>
