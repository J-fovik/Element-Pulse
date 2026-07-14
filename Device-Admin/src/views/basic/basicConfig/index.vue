<template>
	<div>
		<CustomTableMould :table-columns="columnsData" @reset-search="resetForm" @search="resetData"
			><template #form>
				<el-form :model="form" label-position="left" label-width="auto">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="配置编码">
								<el-input
									v-model.trim="form.configTypeCode"
									placeholder="配置编码"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="配置名称">
								<el-input
									v-model.trim="form.configTypeName"
									placeholder="配置名称"
									clearable
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
			<template #operateRight>
				<el-space>
					<el-button type="primary" :icon="CirclePlus" @click="setActiveKey('AddEditor')">
						新增配置
					</el-button>
					<el-dropdown trigger="click">
						<el-button type="primary" :icon="ArrowDown"> 批量操作 </el-button>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item>
									<el-button
										type="danger"
										:icon="Delete"
										link
										:disabled="!tableBaseOptions.selectedKeys.length"
										@click="handleDelete"
									>
										批量删除
									</el-button>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</el-space>
			</template>
			<template #table>
				<TablePlus
					ref="tableRef"
					:tableData="tableData"
					:selection="true"
					border
					:loading="loading"
					:visibleColumnsData="visibleColumnsData"
					@select-keys="handleSelectionChange"
					@row-click="
						(row, column, event) => setSelectRow(row, () => setActiveKey('ConfigChild'))
					"
				>
					<template #operate="{ row }">
						<el-dropdown trigger="click">
							<el-icon><MoreFilled /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
										<el-button
											type="primary"
											:icon="Edit"
											link
											@click="
												setSelectRow(row, () => setActiveKey('AddEditor'))
											"
										>
											编辑配置
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="danger"
											:icon="Delete"
											link
											@click="handleDelete(row)"
										>
											删除配置
										</el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</TablePlus>
			</template>
			<!-- 分页 -->
			<template #pagination>
				<el-pagination
					v-model:current-page="tableBaseOptions.pagination.current"
					v-model:page-size="tableBaseOptions.pagination.pageSize"
					:total="tableBaseOptions.pagination.total"
					:pager-count="tableBaseOptions.pagination.pagerCount"
					:page-sizes="tableBaseOptions.pagination.sizeList"
					background
					layout="total, sizes, prev, pager, next, jumper"
					@size-change="onPageSizeChange"
					@current-change="onCurrentChange"
				/>
			</template>
		</CustomTableMould>
		<!-- 新增编辑详情 -->
		<AddEditor
			v-if="activeKey === 'AddEditor'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditor>
		<!-- 子级 -->
		<ConfigChild
			v-if="activeKey === 'ConfigChild'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></ConfigChild>
	</div>
</template>
<script setup lang="ts" name="basicConfig">
import { CirclePlus, Edit, Delete, ArrowDown, MoreFilled } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { createTableColumns } from './table'; // 表头配置
import {
	useForm,
	useTable,
	useBasicsState,
	curryingRequest,
	useAsyncNoInitData,
	curryingRequestUrl,
	URL,
} from '@/hooks';
import AddEditor from './components/AddEditor.vue';
import ConfigChild from './components/ConfigChild.vue';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		configTypeName: '',
		configTypeCode: '',
	}),
	() => resetData(),
);
// 表格hooks
const {
	tableRef, // 表格实例
	selectRow, // 当前选中的值
	columnsData, // 表头设置
	visibleColumnsData, //表格的列描述信息
	tableBaseOptions, //基础表格设置
	onPageSizeChange, // 改变每页数量
	onCurrentChange, // 改变当前页码
	resetData, // 重置分页筛选
	setSelectRow, // 设置当前数据
	extendTableList, // 处理表格数据
	handleSelectionChange, // 多选
} = useTable(createTableColumns(), () => initData());
// 单个删除/批量删除
const handleDelete = (row: any) => {
	let title = row?.id ? row.configTypeName : '已选中的数据项';
	let ids = row?.id ? row.id : tableBaseOptions.selectedKeys.map((o) => o.id).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.DELETE_BASIC + '/' + ids,
					baseURL: import.meta.env.VITE_EMS_URL as string,
					method: 'delete',
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: '删除成功',
				},
			);
			if (err) return;
			if (res) {
				initData();
			}
		},
		() => {
			ElMessage.info('已取消删除');
		},
	);
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC.QUERY_BASIC,
		baseURL: import.meta.env.VITE_EMS_URL as string,
		params: {
			...form.value,
			pageNum: tableBaseOptions.pagination.current,
			pageSize: tableBaseOptions.pagination.pageSize,
		},
		method: 'get',
	});
	if (err) return;
	// 赋值总页数
	tableBaseOptions.pagination.total = res?.data.total ?? 0;
	return extendTableList(res?.data.list); // 处理数据
});
onActivated(() => {
	initData();
});
</script>
