<template>
	<div>
		<el-card shadow="hover" header="表格二次封装">
			<el-alert
				title="TablePlus 是el-table进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/table.html#%E5%9F%BA%E7%A1%80%E8%A1%A8%E6%A0%BC"
				type="warning"
				:closable="false"
			/>
			<TablePlus
				ref="tableRef"
				class="mt20"
				:tableData="tableData"
				:selection="visibleColumnsData.length > 0 ? true : false"
				:loading="loading"
				:selectable="selectable"
				:visibleColumnsData="visibleColumnsData"
				@select-keys="handleSelectionChange"
			>
				<template #status="{ row }">
					<el-switch v-model="row.status" active-value="1" inactive-value="0">
					</el-switch>
				</template>
				<template #operate="{ row }">
					<el-space spacer="|">
						<el-button type="success" text>详情</el-button>
						<el-button type="primary" text>编辑</el-button>
						<el-button type="danger" text>删除</el-button>
					</el-space>
				</template>
			</TablePlus>
		</el-card>
		<el-card shadow="hover" header="TablePlus 配置项" class="mt20">
			<el-descriptions :column="1" border>
				<el-descriptions-item label="loading"
					>loading加载，默认 false
				</el-descriptions-item>
				<el-descriptions-item label="selection"
					>是否为多选，默认为 false
				</el-descriptions-item>
				<el-descriptions-item label="tableData">
					表格数据 (接口返回数据)</el-descriptions-item
				>
				<el-descriptions-item label="visibleColumnsData">
					可视表头 (可看table.ts)
				</el-descriptions-item>
				<el-descriptions-item label="selectable">
					该方法可对当前列进行禁用判断
				</el-descriptions-item>
			</el-descriptions>
		</el-card>
		<el-card shadow="hover" header="visibleColumnsData 配置项" class="mt20">
			<el-alert
				title="更多配置，请查看 ：https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7"
				type="warning"
				:closable="false"
			/>
			<el-descriptions :column="1" border class="mt20">
				<el-descriptions-item label="title">表头展示的名称 </el-descriptions-item>
				<el-descriptions-item label="key">表头展示的字段</el-descriptions-item>
				<el-descriptions-item label="show">是否展示</el-descriptions-item>
				<el-descriptions-item label="tooltip">
					当内容过长被隐藏时是否显示 tooltip
				</el-descriptions-item>
				<el-descriptions-item label="align"> 对齐方式 </el-descriptions-item>
				<el-descriptions-item label="headerAlign">
					表头对齐方式， 若不设置该项，则使用表格的对齐方式
				</el-descriptions-item>
				<el-descriptions-item label="formatter"> 用来格式化内容 </el-descriptions-item>
			</el-descriptions>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="tablePlus">
import { useTable, curryingRequest, useAsyncData } from '@/hooks';
import { TABLE_DATA } from './options'; // 模拟接口数据
import { createTableColumns } from './table'; // 表头配置
// 表格hooks
const {
	tableRef, // 表格实例
	visibleColumnsData, //表格的列描述信息
	tableBaseOptions, //基础表格设置
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());
// 判断当前列是否可以选择
const selectable = (row: any) => {
	return row.status !== '1';
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncData(async () => {
	// const { res, err } = await curryingRequest(() =>
	//     getUserList({
	//         ...form.value,
	//         currentPage: tableBaseOptions.pagination.current,
	//         pageSize: tableBaseOptions.pagination.pageSize,
	//     })
	// );
	// // 处理错误
	// if (err) return;
	// 赋值总页数
	tableBaseOptions.pagination.total = TABLE_DATA.total;
	return TABLE_DATA.tableData; // 处理数据
});
</script>
