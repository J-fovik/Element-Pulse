<template>
	<el-card shadow="hover">
		<template #header>
			<div class="flex items-center justify-between">
				<div v-if="isTitle">{{ title ? title : (route.meta.title as any) }}</div>
			</div>
		</template>
		<slot></slot>
	</el-card>
</template>

<script lang="ts" setup name="Container">
// 父组件参数
const props = withDefaults(
	defineProps<{
		isTitle?: boolean; // 是否展示标题
		title?: string; // 标题
	}>(),
	{
		isTitle: true,
		title: '',
	},
);
const route = useRoute();
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
}
:deep(.el-card__body) {
	padding: 0 20px 20px;
}
</style>
