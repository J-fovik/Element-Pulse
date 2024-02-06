<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { set } from '@vueuse/core'

const content = ref()
const getPoem = () => {
  const url = 'https://v2.jinrishici.com/one.json?client=browser-sdk/1.2?t=' + new Date().getTime()
  axios.get(url).then((res) => {
    set(content, res.data.data.content)
  })
}

getPoem()

const onRefresh = () => {
  getPoem()
}
</script>
<template>
  <a-layout-footer class="app-footer">
    <a-space>
      <div id="jinrishici-sentence">
        <template v-if="!content">正在加载今日诗词....</template>
        {{ content }}
      </div>
      <icon-refresh @click="onRefresh" class="app-refresh" />
    </a-space>
  </a-layout-footer>
</template>

<style lang="scss" scoped>
.app-footer {
  color: #555;
}
.app-refresh {
  cursor: pointer;
  color: #666;
}
</style>
