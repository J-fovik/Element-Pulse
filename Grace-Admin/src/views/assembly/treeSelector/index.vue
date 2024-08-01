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
			id="code"
			multiple
			label="name"
			:default-value="manySelected"
			title="树形控件(多)"
			:default-props="defaultProps"
			@change="changeTreeFilterMany"
		/>
		<div class="descriptions-box card ml10">
			<span class="text"> 树形筛选器 🍓🍇🍈🍉</span>
			<el-descriptions title="配置项 📚" :column="1" border>
				<el-descriptions-item label="data"> 分类数据 </el-descriptions-item>
				<el-descriptions-item label="title"> TreeSelector 标题 </el-descriptions-item>
				<el-descriptions-item label="id"> 选择的id，默认为 “id” </el-descriptions-item>
				<el-descriptions-item label="label">
					显示的label，默认为 “label”
				</el-descriptions-item>
				<el-descriptions-item label="multiple">
					是否为多选，默认为 false
				</el-descriptions-item>
				<el-descriptions-item label="icon"> 节点图标 </el-descriptions-item>
				<el-descriptions-item label="defaultValue"> 默认选中的值 </el-descriptions-item>
				<el-descriptions-item label="defaultProps"> 默认配置 </el-descriptions-item>
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
		align-items: center;
		height: 100%;
	}
}
</style>
