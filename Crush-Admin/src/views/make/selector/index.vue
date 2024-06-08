<template>
	<div class="selector-container layout-pd">
		<el-card shadow="hover" header="图标选择器（1）(宽度自动)：">
			<IconSelector @get="onGetIcon" @clear="onClearIcon" v-model="state.modelIcon" />
		</el-card>
		<el-card shadow="hover" header="图标选择器(宽度自动)：参数 事件" class="mt15">
			<el-descriptions title="参数" :column="1" border>
				<el-descriptions-item label="v-model"> 需要双向绑定的数据 </el-descriptions-item>
				<el-descriptions-item label="prepend"> 输入框前置内容，只能字体图标 </el-descriptions-item>
				<el-descriptions-item label="size"> 尺寸 </el-descriptions-item>
				<el-descriptions-item label="placeholder"> 输入框占位文本 </el-descriptions-item>
				<el-descriptions-item label="title"> 弹窗标题 </el-descriptions-item>
				<el-descriptions-item label="disabled"> 是否禁用 </el-descriptions-item>
				<el-descriptions-item label="clearable"> 是否可清空 </el-descriptions-item>
				<el-descriptions-item label="emptyDescription"> 自定义空状态描述文字 </el-descriptions-item>
			</el-descriptions>
			<el-table :data="state.tableData" style="width: 100%" class="mt15">
				<el-table-column prop="a1" label="事件名称"> </el-table-column>
				<el-table-column prop="a2" label="说明"> </el-table-column>
				<el-table-column prop="a3" label="类型"> </el-table-column>
				<el-table-column prop="a4" label="回调参数"> </el-table-column>
			</el-table>
		</el-card>
		<el-card shadow="hover" header="图标选择器（2）(宽度自动)：" class="mt15">
			<SelectIcon v-model="iconValue" />
		</el-card>
		<el-card>
			<el-descriptions title="参数" :column="1" border>
				<el-descriptions-item label="v-model"> 需要双向绑定的数据 </el-descriptions-item>
				<el-descriptions-item label="title"> 模态框名称 </el-descriptions-item>
				<el-descriptions-item label="clearable"> 是否可清空 </el-descriptions-item>
				<el-descriptions-item label="placeholder"> 输入框占位文本 </el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="makeSelector">
// 定义变量内容
const state = reactive({
	modelIcon: '',
	tableData: [
		{
			a1: 'get',
			a2: '获取当前点击的 icon 图标',
			a3: 'function',
			a4: '(icon: string)',
		},
		{
			a1: 'clear',
			a2: '清空当前点击的 icon 图标',
			a3: 'function',
			a4: '(icon: string)',
		},
	],
});
const iconValue = ref('');
// 获取当前点击的 icon 图标
const onGetIcon = (icon: string) => {
	console.log(icon);
};
// 清空当前点击的 icon 图标
const onClearIcon = (icon: string) => {
	console.log(icon);
};
</script>
