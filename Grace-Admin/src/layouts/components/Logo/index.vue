<template>
	<!-- Logo -->
	<div class="flx-center">
		<SvgIcon name="yuelong1" :color="primary" :iconStyle="{ width: '50px', height: '50px' }" />
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
