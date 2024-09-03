<template>
	<el-drawer
		:model-value="true"
		title="权限分配"
		:close-on-click-modal="false"
		:destroy-on-close="true"
		@close="emits('close')"
	>
		<TreeSelector
			:data="getShowMenuList(appMenus)"
			id="name"
			multiple
			:default-value="manySelected"
			:default-props="{
				children: 'children',
				label: 'title',
			}"
			@change="changeTreeFilterMany"
		/>
		<template #footer>
			<el-space>
				<el-button type="primary" @click="onSubmit">确定</el-button>
				<el-button type="default" @click="emits('close')">取消</el-button>
			</el-space>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="DistributionPower">
// 如果是后端返回路由或者返回name数组，要用前端路由进行展示 appMenus
import { getShowMenuList } from '@/utils/arrayOperation';
import { appMenus } from '@/routers/base';
import { Session } from '@/utils/storage';
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
const manySelected = ref();
// 多选选中
const changeTreeFilterMany = (e: any) => {
	manySelected.value = e;
};
const onSubmit = () => {
	Session.set('menu', manySelected.value);
	emits('success');
	emits('close');
};
onMounted(() => {
	manySelected.value = Session.get('menu');
});
</script>

<style scoped lang="scss">
.card {
	border: none !important;
}
</style>
