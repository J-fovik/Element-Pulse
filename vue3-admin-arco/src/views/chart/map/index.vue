<script lang="ts" setup>
import { bindOptions, getOptions } from './options'
import * as echarts from 'echarts'
import axios from 'axios'

const chartRef = ref<HTMLDivElement | null>(null)
const currentCity = 'china'
let chart: echarts.ECharts | null = null

const state = reactive<any>({
  geoJson: {}, // 请求json地图返回的geo数据
  mapData: [], // 地图上的数据，比如某些数据点
  mapName: '', // 当前城市名字
})

// 初始化chart
function initChart() {
  echarts.registerMap(currentCity, state.geoJson)
  chart = echarts.init(chartRef.value as any, 'dark')
  chart.setOption(bindOptions(currentCity) as any)
  chart.showLoading()
}

// 注册地图
const registerMap = (currentMap: any) => {
  if (!chart) {
    return
  }

  const mapName = (state.mapName = currentMap.name)
  const features: any[] = state.geoJson.features.filter((item: any) => {
    if (item.properties.name === mapName) {
      return item
    }
  })

  echarts.registerMap(mapName, {
    features,
  } as any)

  const option: any = getOptions(mapName, state.mapData)

  chart.clear()
  chart.setOption(option)
}

// 绑定下钻事件
const bindMap = () => {
  if (!chart) {
    return
  }

  chart.off('click').on('click', (currentMap: any) => {
    if (currentMap.componentSubType === 'effectScatter') {
      return
    }

    registerMap(currentMap)
  })
}

// 获取map
const getMapJson = () => {
  const mapApiUrl = import.meta.env.VITE_MAP_API_URL
  const url = `${mapApiUrl}/map/province/${currentCity}.json`

  axios({ url }).then(({ data }: any) => {
    state.geoJson = data
    initChart()
    bindMap()
    chart && chart.hideLoading()
  })
}

// 点击返回
const onBackMap = () => {
  getMapJson()
  state.mapName = ''
}

onMounted(() => {
  getMapJson()
})
</script>
<template>
  <div class="app-page relative">
    <div class="app-map-back">
      <h2 class="lum-char" @click.stop="onBackMap">
        <span v-if="!state.mapName" class="back-chart">{{ currentCity.toUpperCase() }}</span>
        <span v-else>点击返回</span>
        <template v-if="state.mapName">
          <div class="arco-breadcrumb-item-separator"><icon-right /></div>
          <span>{{ state.mapName }}</span>
        </template>
      </h2>
    </div>
    <div ref="chartRef" id="chart" class="app-line-chart" :style="{ width: 'calc(100vw - 340px)', height: 'calc(100vh - 135px)' }"> </div>
  </div>
</template>
<style lang="scss">
.app-map-back {
  position: absolute;
  top: 20px;
  left: 25px;
  z-index: 3999;
  color: #ffc;
  .lum-char {
    cursor: pointer;
  }
}
</style>
