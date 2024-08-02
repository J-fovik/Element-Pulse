<template>
	<div class="card container justify-center items-center">
		<el-icon size="100" :color="primary"><Link /></el-icon>
		<div class="mt30 font10">页面 "{{ route.meta.title as any }}" 已在新窗口中打开</div>
		<el-button class="mt30" round @click="onGotoFullPage">
			<span>立即前往体验</span>
		</el-button>
	</div>
</template>

<script setup lang="ts" name="outerChain">
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
const route = useRoute();
// 立即前往
const onGotoFullPage = () => {
	window.open(`${route.meta.isLink}`);
};
</script>

<style scoped lang="scss"></style>
