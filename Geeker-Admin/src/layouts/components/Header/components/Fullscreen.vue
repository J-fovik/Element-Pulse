<template>
  <!-- 是否全屏 -->
  <div class="fullscreen">
    <i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="toolBar-icon" @click="handleFullScreen"></i>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import screenfull from "screenfull";
// 是否全屏
const isFullscreen = ref(screenfull.isFullscreen);
// 初始化是否全屏
onMounted(() => {
  screenfull.on("change", () => {
    if (screenfull.isFullscreen) isFullscreen.value = true;
    else isFullscreen.value = false;
  });
});
// 点击切换全屏显示
const handleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage.warning("当前您的浏览器不支持全屏 ❌");
  screenfull.toggle();
};
</script>
