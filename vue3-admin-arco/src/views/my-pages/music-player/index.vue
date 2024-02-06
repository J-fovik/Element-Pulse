<script lang="ts" setup>
import View from '@/components/View/index.vue'
import APlayer from 'aplayer-ts'
import 'aplayer-ts/dist/APlayer.min.css'
import data from './data.json'

const playerRef = ref()

const init = () => {
  new APlayer({
    container: playerRef.value,
    audio: data,
  })
}

onMounted(() => {
  init()
})
</script>
<template>
  <View class="app-page">
    <a-card>
      <div ref="playerRef" class="w-3/5"></div>
    </a-card>
  </View>
</template>
<style lang="scss"></style>
