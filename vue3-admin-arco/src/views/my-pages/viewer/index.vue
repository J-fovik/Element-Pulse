<script lang="ts" setup>
import View from '@/components/View/index.vue'
import data from './data.json'

const state = reactive({
  images: data,
})
</script>
<template>
  <View class="app-page">
    <ol class="app-order-list px-3">
      <li>
        <h3>点小图看大图</h3>
        <div class="app-demo-images-list" v-viewer>
          <a-space :size="10" wrap>
            <img class="img" v-for="img in state.images" :key="img" :src="img" />
          </a-space>
        </div>
      </li>
    </ol>
  </View>
</template>
<style lang="scss"></style>
