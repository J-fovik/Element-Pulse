<script lang="ts" setup>
import type { Ref } from 'vue'
import { useEcharts } from '@/hooks/web/useEcharts'
import { getOptions } from './options'

const chartRef = ref<HTMLDivElement | null>(null)

function initChart() {
  const { setOptions } = useEcharts(chartRef as Ref<HTMLDivElement>)
  setOptions(getOptions())
}

onMounted(() => {
  initChart()
})
</script>
<template>
  <div ref="chartRef" class="app-line-chart" :style="{ width: 'calc(100vw - 335px)', height: 'calc(100vh - 135px)' }"></div>
</template>
