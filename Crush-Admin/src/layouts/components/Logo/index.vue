<template>
	<!-- Logo -->
	<div class="flx-center">
		<i :class="'iconfont icon-yuelong1'" class="font30" :style="{ color: primary }"></i>
	</div>
</template>
<script setup lang="ts" name="Logo">
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
</script>
<style scoped lang="scss">
.logo-img {
	width: 28px;
	object-fit: contain;
}
</style>
