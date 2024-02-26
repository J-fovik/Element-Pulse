<template>
  <div class="title-container">
    <div class="left">
      <div class="date">{{ dateStr }}</div>
      <div class="time">{{ timeStr }}</div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { getNowDate } from '@/utils'
import { onUnmounted, ref } from 'vue'
// 获取现在时间
const date = getNowDate()
const dateStr = date[0]
const timeStr = ref(date[1])
const interval = setInterval(() => {
  timeStr.value = getNowDate()[1]
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>
<style lang="less" scoped>
.title-container {
  padding: 10px;
  display: flex;
  text-align: center;
  align-items: center;

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgb(var(--primary-1));
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
