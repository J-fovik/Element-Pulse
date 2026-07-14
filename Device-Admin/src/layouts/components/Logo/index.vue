<template>
	<!-- Logo -->
	<div class="flx-center">
		<!-- <i :class="'iconfont icon-yuelong1'" class="font30" :style="{ color: primary }"></i> -->
		<img :src="Logo" style="width: 24px" alt="" />
	</div>
</template>
<script setup lang="ts" name="Logo">
import { useGlobalStore } from '@/stores';
import Logo from '@/assets/images/jcxrLogo.png';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
</script>
<style scoped lang="scss">
.logo-img {
	width: 24px;
	object-fit: contain;
}
</style>
