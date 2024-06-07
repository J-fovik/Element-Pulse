<template>
	<div ref="printRef" class="layout-pd">
		<el-card shadow="hover" header="导出表格">
			<!-- 按钮 -->
			<el-button type="warning" size="default" @click="exportExcel" v-throttle="2000">
				<SvgIcon name="iconfont icon-yunxiazai_o" :size="22" />XLSX导出</el-button
			>
			<el-button
				type="warning"
				size="default"
				:disabled="tableBaseOptions.selectedKeys.length == 0"
				@click="exportSelectExcel"
				v-throttle="2000"
			>
				<SvgIcon name="iconfont icon-yunxiazai_o" :size="22" />XLSX导出选中</el-button
			>
			<el-button type="warning" size="default" @click="tableExcel" v-throttle="2000">
				<SvgIcon name="iconfont icon-yunxiazai_o" :size="22" />table2excel导出</el-button
			>
			<el-button
				type="warning"
				size="default"
				:disabled="tableBaseOptions.selectedKeys.length == 0"
				@click="tableSelectExcel"
				v-throttle="2000"
			>
				<SvgIcon name="iconfont icon-yunxiazai_o" :size="22" />table2excel导出选中</el-button
			>
		</el-card>

		<el-card shadow="hover" header="表格" class="mt10">
			<!-- 表格 -->
			<el-table ref="tableRef" :data="tableData" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column
					v-for="(item, index) in columnsData"
					:key="index"
					:show-overflow-tooltip="item.tooltip"
					:prop="item.key"
					:width="item.width"
					:label="item.title"
					:align="item.align"
					:header-align="item.headerAlign"
					:show-header="item.show"
					:formatter="item.formatter"
				>
				</el-table-column>
				<template #empty>
					<el-empty description="暂无数据" />
				</template>
			</el-table>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="funExportTable">
import XLSX from 'xlsx';
import table2excel from 'js-table2excel';
import { TABLE_DATA } from './options';
import { createTableColumns } from './table'; // 表头配置
const columnsData = ref(createTableColumns());
const tableData = ref(TABLE_DATA.tableData);
const tableBaseOptions = reactive({
	selectedKeys: [], // 存储多选数组
});
// 多选
const handleSelectionChange = (e: any) => {
	tableBaseOptions.selectedKeys = e;
};
// xlsx导出Excel
const exportExcel = () => {
	// const workSheet = XLSX.utils.table_to_sheet((tableRef.value as any).$el);// 导出实例
	const data = tableData.value.map((it: any) => {
		return [it.sortTableNo, it.name, it.id, it.status == '1' ? '已完成' : '未完成', it.money ? it.money : '0'];
	});
	data.unshift(['序号', '名称', 'ID', '状态', '金额']);
	const workSheet = XLSX.utils.aoa_to_sheet(data);
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表');
	XLSX.writeFile(workBook, 'tale-list.xlsx');
};
// xlsx导出选中Excel
const exportSelectExcel = () => {
	const data = tableBaseOptions.selectedKeys.map((it: any) => {
		return [it.sortTableNo, it.name, it.id, it.status == '1' ? '已完成' : '未完成', it.money ? it.money : '0'];
	});
	data.unshift(['序号', '名称', 'ID', '状态', '金额']);
	const workSheet = XLSX.utils.aoa_to_sheet(data);
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表');
	XLSX.writeFile(workBook, 'table-list.xlsx');
};
// table2excel导出Excel
const tableExcel = () => {
	// 可再加过滤操作
	const data = tableData.value.map((it: any) => {
		it.status = it.status == '1' ? '已完成' : '未完成';
		it.money = it.money ? it.money : '0';
		it.address = it.address ? it.address : '-';
		return it;
	});
	// 表格名称默认 xls 格式
	table2excel(columnsData.value, data, `表格名称`);
};
// table2excel导出选中Excel
const tableSelectExcel = () => {
	// 可再加过滤操作
	const data = tableBaseOptions.selectedKeys.map((it: any) => {
		it.status = it.status == '1' ? '已完成' : '未完成';
		it.money = it.money ? it.money : '0';
		it.address = it.address ? it.address : '-';
		return it;
	});
	// 表格名称可选 xlsx 格式
	table2excel(columnsData.value, data, `表格名称.xlsx`);
};
</script>
