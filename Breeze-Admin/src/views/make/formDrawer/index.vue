<template>
	<div class="selector-container layout-pd">
		<el-card shadow="hover" header="抽屉组件">
			<el-button type="primary" @click="openDrawer">打开抽屉</el-button>
		</el-card>
		<!-- 抽屉组件 -->
		<FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">表单信息</FormDrawer>
		<el-card shadow="hover" header="图标选择器(宽度自动)：参数" class="mt15">
			<el-table :data="state.tableData" style="width: 100%">
				<el-table-column prop="a1" label="参数"> </el-table-column>
				<el-table-column prop="a2" label="说明"> </el-table-column>
				<el-table-column prop="a3" label="类型"> </el-table-column>
				<el-table-column prop="a4" label="可选值"> </el-table-column>
				<el-table-column prop="a5" label="默认值"> </el-table-column>
			</el-table>
		</el-card>

		<el-card shadow="hover" header="图标选择器(宽度自动)：事件" class="mt15">
			<el-table :data="state.tableData1" style="width: 100%">
				<el-table-column prop="a1" label="事件名称"> </el-table-column>
				<el-table-column prop="a2" label="说明"> </el-table-column>
				<el-table-column prop="a3" label="类型"> </el-table-column>
				<el-table-column prop="a4" label="回调参数"> </el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="makeFormDrawer">
// 引入组件
const drawerTitle = ref('抽屉');
const formDrawerRef = ref<any>(null);
// 提交
const handleSubmit = () => {
	formDrawerRef.value.showLoading;
	// 请求接口，成功后关闭loading
	formDrawerRef.value.close();
	formDrawerRef.value.hideLoading;
};
// 定义变量内容
const state = reactive({
	tableData: [
		{
			a1: 'title',
			a2: '抽屉标题',
			a3: 'string',
			a4: '',
			a5: '',
		},
		{
			a1: 'size',
			a2: 'Drawer 窗体的大小（字符串带%)',
			a3: 'string/number',
			a4: '',
			a5: '45%',
		},

		{
			a1: 'confirmText',
			a2: '按钮标题',
			a3: 'string',
			a4: '',
			a5: '提交',
		},
		{
			a1: 'destroyOnClose',
			a2: '控制是否在关闭 Drawer 之后将子元素全部销毁',
			a3: 'boolean',
			a4: 'true',
			a5: 'false',
		},
	],
	tableData1: [
		{
			a1: 'open',
			a2: '打开抽屉',
			a3: 'function',
			a4: '',
		},
		{
			a1: 'close',
			a2: '关闭抽屉',
			a3: 'function',
			a4: '',
		},
		{
			a1: 'showLoading',
			a2: '打开loading',
			a3: 'function',
			a4: '',
		},
		{
			a1: 'hideLoading',
			a2: '关闭loading',
			a3: 'function',
			a4: '',
		},
		{
			a1: 'submit',
			a2: '提交成功后',
			a3: 'function',
			a4: '',
		},
	],
});
// 打开抽屉
const openDrawer = () => {
	formDrawerRef.value.open();
};
</script>
