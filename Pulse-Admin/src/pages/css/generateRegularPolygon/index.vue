<template>
  <div class="rounded bg-white">
    <div class="container">
      <div class="content">
        <div class="box">
          <div class="graph" ref="graphRef" />
        </div>
        <div class="bottom">
          <div class="row">
            <span class="label">
              边数:
            </span>
            <el-slider :style="{
              display: 'flex',
              flex: 1,
              marginLeft: '10px',
              marginRight: '16px',
            }" :min="minSideNum" :max="maxSideNum" :step="1" v-model="n" />
            <el-input-number :min="minSideNum" :max="maxSideNum" :precision="0" v-model="n" />
          </div>
          <div class="row">
            <span class="label">
              旋转:
            </span>
            <el-slider :style="{
              display: 'flex',
              flex: 1,
              marginLeft: '10px',
              marginRight: '16px',
            }" :min="0" :max="360" :step="1" v-model="rotation" />
            <el-input-number :min="0" :max="360" :precision="0" v-model="rotation" />
          </div>
          <div class="codeBox">
            <span>{{ ".box {" }}</span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;
              {{ graphRef ? graphRef.clientWidth : 0 }}px;
            </span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;clip-path: polygon({{ polygonStr }});
            </span>
            <span>{{ "}" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

const minSideNum = 3;
const maxSideNum = 20;

const graphRef = ref();
const n = ref(minSideNum); // 边数
const rotation = ref(0); // 旋转
const polygonStr = ref("");
watch([n, rotation, graphRef], () => {
  if (graphRef.value) {
    let points = "";
    for (let i = 0; i < n.value; i++) {
      const deg = (rotation.value / 180) * Math.PI;
      let x = (50 + 50 * Math.cos((2 * Math.PI * i) / n.value + deg)).toFixed(2);
      let y = (50 + 50 * Math.sin((2 * Math.PI * i) / n.value + deg)).toFixed(2);
      points += `${x}%  ${y}%, `;
    }
    points = points.slice(0, -2);
    graphRef.value.style.setProperty("--points", points);
    polygonStr.value = points;
  }
}, { immediate: true })
</script>


<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 20px;
  overflow-y: auto;

  .content {
    display: flex;
    flex-direction: column;
    /* 控制整体宽高 */
    $boxWidth: 350px;
    $boxPadding: 20px;

    .box {
      box-sizing: border-box;
      width: $boxWidth;
      height: $boxWidth;
      border: 2px dashed #73828c;
      padding: $boxPadding;

      .graph {
        box-sizing: border-box;
        width: $boxWidth - 2 * $boxPadding;
        height: $boxWidth - 2 * $boxPadding;
        background: linear-gradient(135deg,
            #112437,
            #1d3450,
            #29588a,
            #116d6e,
            #5c8984,
            #47a992) fixed;
        clip-path: polygon(var(--points));
      }
    }

    .bottom {
      width: $boxWidth;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .row {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;

        .label {
          color: #444;
          margin-right: 6px;
          font-size: 15px;
          color: #666;
        }
      }

      .codeBox {
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
        background-color: #8bacaa;
        padding: 10px;
        color: #222;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>