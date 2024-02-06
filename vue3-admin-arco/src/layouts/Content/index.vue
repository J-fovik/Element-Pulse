<script lang="ts" setup>
import Source from './source.vue'

</script>
<template>
  <a-layout-content class="app-layout-content">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <!-- <transition appear name="fade" mode="out-in"> -->
        <!-- <transition appear name="zoom-in-top" mode="out-in"> -->
        <!-- <transition appear name="fade-slide" mode="out-in"> -->
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </a-layout-content>
  <Source />
</template>
