<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-drag; 需将设为absolute，其父元素为relative"
			type="success"
			:closable="false"
		/>
		<div class="father">
			<div class="cursor-pointer drag flx-center" v-drag>拖拽我</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="Drag">
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
</script>
<style scoped>
.father {
	height: 200px;
	background: v-bind(primary);
	position: relative;
}
.drag {
	width: 50px;
	height: 50px;
	background-color: blueviolet;
	position: absolute;
}
</style>
