<template>
	<el-drawer
		:model-value="true"
		title="权限分配"
		:close-on-click-modal="false"
		:destroy-on-close="true"
		@close="emits('close')"
	>
		<el-tree
			ref="treeRef"
			:data="getShowMenuList(appMenus)"
			show-checkbox
			node-key="name"
			:expand-on-click-node="true"
			:check-on-click-node="true"
			:check-strictly="false"
			:default-expanded-keys="manySelected"
			:default-checked-keys="manySelected"
			:highlight-current="true"
			:props="{
				children: 'children',
				label: 'title',
			}"
			@check="handleCheckChange"
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
import { ElTree } from 'element-plus';
import { getShowMenuList } from '@/utils/arrayOperation';
import { appMenus } from '@/routers/base';
import { Session } from '@/utils/storage';
// 树形控件实例
const treeRef = ref<InstanceType<typeof ElTree>>();
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
const manySelected = ref();
// 选中
const handleCheckChange = () => {
	manySelected.value = treeRef.value?.getCheckedKeys();
};
// 提交
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
