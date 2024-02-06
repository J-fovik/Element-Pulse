<script lang="ts" setup>
import View from '@/components/View/index.vue'
import VueDrawingCanvas from 'vue-drawing-canvas'

const state = reactive({
  initialImage: [
    {
      type: 'dash',
      from: {
        x: 262,
        y: 154,
      },
      coordinates: [],
      color: '#000000',
      width: 5,
      fill: false,
    },
  ],
  x: 0,
  y: 0,
  image: '',
  width: window.innerWidth - 380,
  height: window.innerHeight - 210,
  eraser: false,
  disabled: false,
  fillShape: false,
  line: 5,
  color: '#000000',
  strokeType: 'dash',
  lineCap: 'square',
  lineJoin: 'miter',
  backgroundColor: '#FFFFFF',
  backgroundImage: null,
})
const VueCanvasDrawing = ref<any>(null)

const { image, width, height, strokeType, lineCap, lineJoin, fillShape, eraser, line, color, initialImage } = toRefs(state)

// 撤销
const onUndo = () => {
  VueCanvasDrawing.value && VueCanvasDrawing.value.undo()
}
// 重做
const onRedo = () => {
  VueCanvasDrawing.value && VueCanvasDrawing.value.redo()
}
// 刷新
const onRedraw = () => {
  VueCanvasDrawing.value && VueCanvasDrawing.value.redraw()
}
// 重置
const onReset = () => {
  VueCanvasDrawing.value && VueCanvasDrawing.value.reset()
}
</script>
<template>
  <View class="app-page bg-purple-50">
    <div class="app-canvas-draw-action">
      <a-button-group type="primary">
        <a-button @click="onUndo">
          <template #icon><icon-undo /></template>
          撤销
        </a-button>
        <a-button @click="onRedo">
          <template #icon><icon-redo /></template>
          重做
        </a-button>
        <a-button status="success" @click="onRedraw" hidden>
          <template #icon><icon-refresh /></template>
          刷新
        </a-button>
        <a-button status="danger" @click="onReset">
          <template #icon><icon-sync /></template>
          重置
        </a-button>
      </a-button-group>
    </div>
    <vue-drawing-canvas
      ref="VueCanvasDrawing"
      v-model:image="image"
      :width="width"
      :height="height"
      :stroke-type="strokeType"
      :line-cap="lineCap"
      :line-join="lineJoin"
      :fill-shape="fillShape"
      :eraser="eraser"
      :line-width="line"
      :color="color"
      :initial-image="initialImage"
      save-as="png"
      :styles="{
        border: 'solid 1px #efefef',
      }"
    />
  </View>
</template>
<style lang="scss"></style>
