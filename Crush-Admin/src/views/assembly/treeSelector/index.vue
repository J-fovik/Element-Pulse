<template>
	<div class="container">
		<TreeSelector
			:data="addressJson.address"
			id="code"
			icon="Grape"
			:default-value="singleSelected"
			title="树形控件(单)"
			:default-props="defaultProps"
			@change="changeTreeFilterSingle"
		/>
		<TreeSelector
			:data="menuList"
			class="ml10"
			id="name"
			multiple
			:default-value="manySelected"
			title="树形控件(多)"
			:default-props="{
				children: 'children',
				label: 'title',
			}"
			@change="changeTreeFilterMany"
		/>

		<div class="descriptions-box card ml10">
			<el-alert
				title="TreeSelector 是el-tree树形控件进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/tree.html"
				type="warning"
				:closable="false"
				class="mb20"
			/>
			<span> 树形筛选器 🍓🍇🍈🍉</span>
			<div class="mt20">树形控件(单) ： {{ singleSelected }}</div>
			<div class="mt20">树形控件(多) ： {{ manySelected }}</div>
			<el-descriptions title="配置项 📚" :column="1" border class="mt20">
				<el-descriptions-item label="data"> 分类数据 </el-descriptions-item>
				<el-descriptions-item label="title"> TreeSelector 标题 </el-descriptions-item>
				<el-descriptions-item label="id"> 选择的id，默认 'id' </el-descriptions-item>
				<el-descriptions-item label="width"> 组件宽度，默认 '220px' </el-descriptions-item>
				<el-descriptions-item label="multiple">
					是否为多选，默认为 false
				</el-descriptions-item>
				<el-descriptions-item label="expandAll">
					是否为全部展开，默认为 false
				</el-descriptions-item>
				<el-descriptions-item label="icon">
					节点图标，默认 'CaretRight'
				</el-descriptions-item>
				<el-descriptions-item label="defaultValue"> 默认选中的值 </el-descriptions-item>
				<el-descriptions-item label="defaultProps">
					配置项，默认{ children: 'children', label: 'label', }
				</el-descriptions-item>
				<el-descriptions-item label="labelLeft">
					左侧标签插槽 #labelLeft="{ node, data }"
				</el-descriptions-item>
				<el-descriptions-item label="labelRight">
					右侧标签插槽 #labelRight="{ node, data }"
				</el-descriptions-item>
				<el-descriptions-item label="operate">
					操作列插槽 #operate="{ node, data }"
				</el-descriptions-item>
			</el-descriptions>
		</div>
	</div>
</template>

<script setup lang="ts" name="treeSelector">
// 如果是后端返回路由或者返回name数组，要用前端路由进行展示 appMenus
import { appMenus } from '@/routers/base';
import addressJson from '@/assets/json/address.json';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
// 路由数组
const menuList = computed(() => userStore.showMenuListGet());

// 默认配置
const defaultProps = {
	children: 'children',
	label: 'name',
};
const singleSelected = ref();
const manySelected = ref();
// 单选选中
const changeTreeFilterSingle = (e: any) => {
	singleSelected.value = e;
};
// 多选选中
const changeTreeFilterMany = (e: any) => {
	manySelected.value = e;
};
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* height: 100%; */
		overflow-y: auto !important;
	}
}
</style>
