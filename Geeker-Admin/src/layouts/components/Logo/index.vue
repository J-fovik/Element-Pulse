<template>
	<!-- Logo -->
	<div class="flx-center">
		<img v-if="isDark" class="logo-img" src="@/assets/svgIcons/dragonWhite.svg" alt="logo" />
		<img v-else class="logo-img" src="@/assets/svgIcons/dragonBlack.svg" alt="logo" />
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
