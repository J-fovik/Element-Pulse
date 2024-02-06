import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import * as echarts from 'echarts'
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core'

export function useEcharts(chartDom: Ref<HTMLDivElement>) {
  let chartInstance: echarts.ECharts | null = null

  // 初始化
  function initChart() {
    const el = unref(chartDom)

    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el)
  }

  // 响应resize
  function resize() {
    chartInstance?.resize()
  }

  // 获取示例
  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initChart()
    }

    return chartInstance
  }

  // 设置选项
  function setOptions(options: EChartsOption, clear = true) {
    if (!chartInstance) {
      initChart()
    }

    clear && chartInstance?.clear()
    chartInstance?.setOption(unref(options))
  }

  // 防抖，300ms内只响应最后一次
  const debouncedFn = useDebounceFn(() => {
    resize()
  }, 300)

  window.addEventListener('resize', debouncedFn)

  tryOnUnmounted(() => {
    if (!chartInstance) {
      return
    }

    window.removeEventListener('resize', resize)
    chartInstance.dispose()
    chartInstance = null
  })

  return {
    setOptions,
    echarts,
    resize,
    getInstance,
  }
}
