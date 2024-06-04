<template>
	<div class="layout-flexBox">
		<el-card shadow="hover" class="layout-flexBox-left">
			<TreeFilter
				:data="addressJson.address"
				id="code"
				multiple
				label="name"
				:default-value="selected"
				title="树形控件"
				:default-props="defaultProps"
				@change="changeTreeFilter"
			>
			</TreeFilter>
		</el-card>
		<el-card shadow="hover" header="右侧展示数据" class="layout-flexBox-auto">选中值: {{ selected }}</el-card>
	</div>
</template>
<script setup lang="ts" name="pagesTreeFilter">
import addressJson from './address.json';
// 默认配置
const defaultProps = {
	children: 'children',
	label: 'name',
};
const selected = ref('11');
// 选中
const changeTreeFilter = (e: any) => {
	selected.value = e;
};
</script>
