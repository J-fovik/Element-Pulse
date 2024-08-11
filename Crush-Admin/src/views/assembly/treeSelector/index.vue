<template>
	<div class="container">
		<TreeSelector
			:data="addressJson.address"
			id="code"
			icon="Grape"
			label="name"
			:default-value="singleSelected"
			title="树形控件(单)"
			:default-props="defaultProps"
			@change="changeTreeFilterSingle"
		/>
		<TreeSelector
			:data="addressJson.address"
			class="ml10"
			id="code"
			multiple
			label="name"
			:default-value="manySelected"
			title="树形控件(多)"
			:default-props="defaultProps"
			@change="changeTreeFilterMany"
		/>

		<div class="descriptions-box card ml10">
			<span> 树形筛选器 🍓🍇🍈🍉</span>
			<el-descriptions title="配置项 📚" :column="1" border class="mt20">
				<el-descriptions-item label="data"> 分类数据 </el-descriptions-item>
				<el-descriptions-item label="title"> TreeSelector 标题 </el-descriptions-item>
				<el-descriptions-item label="id"> 选择的id，默认 'id' </el-descriptions-item>
				<el-descriptions-item label="width"> 组件宽度，默认 '220px' </el-descriptions-item>
				<el-descriptions-item label="multiple">
					是否为多选，默认为 false
				</el-descriptions-item>
				<el-descriptions-item label="icon">
					节点图标,默认 'CaretRight'
				</el-descriptions-item>
				<el-descriptions-item label="defaultValue"> 默认选中的值 </el-descriptions-item>
				<el-descriptions-item label="defaultProps">
					配置项 默认{ children: 'children', label: 'label', }
				</el-descriptions-item>
			</el-descriptions>
		</div>
	</div>
</template>

<script setup lang="ts" name="treeSelector">
import addressJson from '@/assets/json/address.json';
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
		height: 100%;
	}
}
</style>
