<template>
	<div class="layout-flexBox">
		<el-card shadow="hover" class="layout-flexBox-left">
			<TreeFilter
				:data="addressJson.address"
				id="code"
				icon="ele-Grape"
				label="name"
				:default-value="singleSelected"
				title="树形控件(单)"
				:default-props="defaultProps"
				@change="changeTreeFilterSingle"
			>
			</TreeFilter>
		</el-card>
		<el-card shadow="hover" class="layout-flexBox-left">
			<TreeFilter
				:data="addressJson.address"
				id="code"
				multiple
				icon="ele-Grape"
				label="name"
				:default-value="manySelected"
				title="树形控件(多)"
				:default-props="defaultProps"
				@change="changeTreeFilterMany"
			>
			</TreeFilter>
		</el-card>

		<el-card shadow="hover" header="右侧展示数据" class="layout-flexBox-auto">
			<div>单选选中值: {{ singleSelected }}</div>
			<div class="mt50">多选选中值: {{ manySelected }}</div>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="pagesTreeFilter">
import addressJson from '/@/assets/json/address.json';
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
