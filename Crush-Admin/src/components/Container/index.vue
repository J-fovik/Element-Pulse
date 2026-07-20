<template>
	<el-card shadow="hover">
		<template #header>
			<div class="flex items-center justify-between">
				<div v-if="isTitle">{{ title ? title : currentTitle }}</div>
			</div>
		</template>
		<slot></slot>
	</el-card>
</template>

<script lang="ts" setup name="Container">
import { findMenuItemByRouteName } from '@/utils/arrayOperation';
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
import { useUserStore } from '@/stores';
const route = useRoute();
const userStore = useUserStore();
// 路由数组
const menuList = computed(() => userStore.showMenuListGet());
// 使用计算属性来获取当前页面的标题
const currentTitle = computed(() => {
	// 1. 获取当前路由的 name
	const currentRouteName = route.name as string;
	// 2. 调用查找函数
	const foundMenuItem = findMenuItemByRouteName(menuList.value, currentRouteName);
	// 3. 如果找到了菜单项，返回其 title，否则返回一个默认值或空字符串
	return foundMenuItem ? foundMenuItem?.title : (route.name as string);
});
</script>
<style lang="scss" scoped>
:deep(.el-card__header) {
	border-bottom: none;
}
:deep(.el-card__body) {
	padding: 0 20px 20px;
}
</style>
