<script lang="ts" setup>
import { useSlots } from 'vue'

const slots = useSlots()
</script>
<template>
  <a-card class="app-page-view">
    <slot></slot>
    <div class="app-page-view-footer" v-if="slots.footer">
      <slot name="footer"></slot>
    </div>
  </a-card>
</template>
<style lang="scss">
.app-layout {
  .app-page-view {
    .app-page-view-footer {
      position: absolute;
      bottom: 0;
    }
    &:only-child {
      min-height: calc(100vh - 140px);
    }
  }
}
</style>
