<script lang="ts" setup>
import View from '@/components/View/index.vue'
// 引入videojs以及样式文件
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'

const videoId = 'my-video-1'

function initVideo() {
  videojs(videoId, {}, function () {
    this.play()
  })
}

function disposeVideo() {
  const myPlayer = videojs(videoId)
  myPlayer.dispose()
}

onMounted(() => {
  initVideo()
})

onBeforeUnmount(() => {
  disposeVideo()
})
</script>
<template>
  <View class="app-page-videojs bg-black">
    <video :id="videoId" class="video-js vjs-default-skin" autoplay muted preload="auto">
      <source src="http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8" type="application/x-mpegURL" style="width: 100%; height: 100%" />
    </video>
  </View>
</template>
<style lang="scss">
.app-page-videojs {
  .video-js {
    margin: 0 auto;
  }
}
</style>
