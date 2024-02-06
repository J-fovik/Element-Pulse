<script lang="ts" setup>
import View from '@/components/View/index.vue'
import Player from 'xgplayer'
import play from 'xgplayer/dist/controls/play'
import fullscreen from 'xgplayer/dist/controls/fullscreen'
import progress from 'xgplayer/dist/controls/progress'
import volume from 'xgplayer/dist/controls/volume'
import pip from 'xgplayer/dist/controls/pip'
import flex from 'xgplayer/dist/controls/flex'

function init() {
  new Player({
    id: 'mse',
    url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
    poster: '//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg',
    width: 700,
    height: 400,
    controlPlugins: [play, fullscreen, progress, volume, pip, flex],
    pip: true, // 打开画中画功能
  })
}

onMounted(() => {
  init()
})
</script>
<template>
  <View class="app-page bg-gray-900">
    <a-card class="bg-gray-900">
      <div id="mse"></div>
    </a-card>
  </View>
</template>
<style lang="scss">
#mse {
  flex: auto;
  margin: 0 auto;
}
</style>
