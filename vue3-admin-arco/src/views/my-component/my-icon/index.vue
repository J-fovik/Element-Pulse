<script lang="ts" setup>
import View from '@/components/View/index.vue'
import { Icon } from '@iconify/vue'
</script>
<template>
  <View class="app-page-icon">
    <h2 class="mb-5">引入 <a href="https://icones.js.org/" target="_blank">@iconify/vue</a>图标</h2>
    <a-space :size="10">
      <Icon icon="mdi-light:home" />
      <Icon icon="bi:bell-fill" :inline="true" />
      <Icon class="red-icon" icon="bx:bx-home" :inline="true" />
    </a-space>
  </View>
</template>
<style lang="scss"></style>
