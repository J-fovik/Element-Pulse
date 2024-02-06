<script lang="ts" setup>
import type { Ref } from 'vue'
import View from '@/components/View/index.vue'
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
  <View class="app-page-chart">
    <a-card>
      <div ref="chartRef" id="chart" class="app-line-chart" :style="{ width: 'calc(100vw - 420px)', height: 'calc(100vh - 200px)' }"> </div>
    </a-card>
  </View>
</template>
<style lang="scss">
.app-line-chart {
  margin: 0 auto;
}
</style>
