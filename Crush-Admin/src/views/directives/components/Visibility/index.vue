<template>
	<div>
		<el-alert
			class="mb10"
			title="使用方式：v-visibility='fn'"
			type="success"
			:closable="false"
		/>
		<div class="text-center">
			<el-tag>{{ isVisibility ? '加薪了' : '没加薪' }}</el-tag>
		</div>
		<el-scrollbar>
			<div class="scrollbar-flex-content">
				<p v-for="item in 50" :key="item" class="scrollbar-demo-item">
					{{ item }}
				</p>
				<div class="scrollbar-demo-item visibility" v-visibility="fn">加薪了</div>
				<p v-for="item in 50" :key="item" class="scrollbar-demo-item">
					{{ 50 + item }}
				</p>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="Visibility">
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore();
// 主题色
const primary = computed(() => globalStore.primary);
// 是否可见
const isVisibility = ref(false);
// 接受函数
const fn = (type) => {
	isVisibility.value = type;
};
</script>
<style scoped>
.scrollbar-flex-content {
	display: flex;
}
.scrollbar-demo-item {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100px;
	height: 50px;
	margin: 10px;
	text-align: center;
	border-radius: 4px;
	background: v-bind(primary);
}
.visibility {
	background: var(--el-color-danger-light-9) !important;
}
</style>
