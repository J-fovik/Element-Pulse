<template>
	<div>
		<el-card shadow="hover" header="多功能表格">
			<el-alert
				title="TbleColumn 是el-table进行的二次封装，官方文档请查看 ：https://element-plus.org/zh-CN/component/table.html#%E5%9F%BA%E7%A1%80%E8%A1%A8%E6%A0%BC"
				type="warning"
				:closable="false"
			/>
			<el-table :data="tableData" border>
				<template v-for="(col, index) in columns" :key="index">
					<TableColumn :column="col" />
				</template>
				<el-table-column prop="date" label="出生日期" align="center" />
			</el-table>
		</el-card>
		<el-card shadow="hover" header="columns 配置项" class="mt20">
			<el-alert
				title="更多配置，请查看 ：https://element-plus.org/zh-CN/component/table.html#table-%E5%B1%9E%E6%80%A7"
				type="warning"
				:closable="false"
			/>
		</el-card>
	</div>
</template>
<script setup lang="ts" name="tableColumn">
import { ITableColumn } from '@/components/TableColumn/index.vue';

const tableData = [
	{ id: 1, name: '张三', age: 20, city: '北京', gender: '男', date: '2023-04-15' },
	{ id: 2, name: '李四', age: 25, city: '上海', gender: '女', date: '2023-04-16' },
];

const columns: ITableColumn[] = [
	{ type: 'index', label: '序号', width: '80' },
	{ label: '姓名', prop: 'name', width: '120' },
	{ label: '年龄', prop: 'age', width: '100' },
	{
		label: '地址',
		align: 'center',
		children: [
			{ label: '城市', prop: 'city', width: '150', align: 'center' },
			{ label: '性别', prop: 'gender', width: '200', align: 'center' },
		],
	},
];
</script>
