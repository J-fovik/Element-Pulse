<template>
  <div style="width: 100%">
    <div class="container">
      <p ref="pRef" />
      <el-button type="primary" class="btn" @click="onceAgain">
        Once Again
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// 打字效果
import Typed from "typed.js";

let typed = null;
const pRef = ref();
const text = ref('你好,世界')
const onceAgain = () => {
  // 重置
  typed?.reset();
  // 开始
  typed?.start();
};

onMounted(() => {
  if (pRef.value) {
    const options = {
      strings: [text.value],
      typeSpeed: 60,
      showCursor: false,
    };
    typed = new Typed(pRef.value, options);
  }
})

onUnmounted(() => {
  typed?.destroy();
})
</script>



<style scoped lang="scss">
.container {
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-image: linear-gradient(to right, #04182C, #000c17, #04182C);

  p {
    font-size: 44px;
    font-weight: 500;
    height: 54px;
    line-height: 48px;
    text-align: center;
    white-space: nowrap;
  }

  .btn {
    margin-top: 80px;
  }
}
</style>