<script lang="ts" setup>
const baiduRef = ref()
const map = ref()
const point = ref()

function initMap(lng = 116.405725, lat = 39.935362) {
  map.value = new window.BMap.Map(baiduRef.value)
  point.value = new window.BMap.Point(lng, lat)

  map.value.centerAndZoom(point.value, 15)
  map.value.enableScrollWheelZoom(true) // 滚轮缩放
}

onMounted(() => {
  initMap()
})
</script>
<template>
  <div class="map" ref="baiduRef"></div>
</template>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: calc(100vh - 170px);
}
</style>
