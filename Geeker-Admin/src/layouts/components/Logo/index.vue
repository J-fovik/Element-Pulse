<template>
	<!-- Logo -->
	<div class="flx-center">
		<img class="logo-img" src="@/assets/svgIcons/logo.svg" alt="logo" />
	</div>
</template>
<script setup lang="ts" name="Logo">
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore();
// 主题
const isDark = computed(() => globalStore.isDark);
</script>
<style scoped lang="scss">
.logo-img {
	width: 28px;
	object-fit: contain;
}
</style>
