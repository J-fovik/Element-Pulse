<template>
	<div>
		<CustomTableMould :table-columns="columnsData" @reset-search="resetForm" @search="resetData"
			><template #form>
				<el-form :model="form" label-position="left" label-width="auto">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="任务名称">
								<el-input
									v-model.trim="form.jobName"
									placeholder="任务名称"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="任务组名">
								<el-select v-model="form.jobGroup" filterable clearable>
									<el-option
										v-for="dict in dictionaryStore.getDictionaryInfo(
											'sys_job_group',
										)"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="任务状态">
								<el-select v-model="form.status" filterable clearable>
									<el-option label="正常" value="0"></el-option>
									<el-option label="停用" value="1"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
			<template #operateRight>
				<el-space>
					<el-button type="primary" :icon="CirclePlus" @click="setActiveKey('AddEditor')">
						添加任务
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
								<el-dropdown-item>
									<el-button
										type="primary"
										:icon="Operation"
										link
										@click="$router.push(`/basic/monitor/job/detail/index`)"
									>
										调度日志
									</el-button>
								</el-dropdown-item>
								<!-- <el-dropdown-item>
									<el-button
										type="danger"
										:icon="Delete"
										link
										:disabled="!tableBaseOptions.selectedKeys.length"
										@click="handleDelete"
									>
										批量导出
									</el-button>
								</el-dropdown-item> -->
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
				>
					<template #status="{ row }">
						<el-switch
							v-model="row.status"
							active-value="0"
							inactive-value="1"
							@click="handleStatusChange(row)"
						/>
					</template>
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
											编辑任务
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="danger"
											:icon="Delete"
											link
											@click="handleDelete(row)"
										>
											删除任务
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="primary"
											:icon="Pointer"
											link
											@click="handleOnExecute(row)"
										>
											执行一次
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="primary"
											:icon="View"
											link
											@click="
												setSelectRow({ ...row, isReadOnly: true }, () =>
													setActiveKey('AddEditor'),
												)
											"
										>
											查看详情
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="primary"
											:icon="Operation"
											link
											@click="
												$router.push(
													`/basic/monitor/job/detail/index?id=${row.jobId}`,
												)
											"
										>
											调度日志
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
	</div>
</template>
<script setup lang="ts" name="job">
import {
	CirclePlus,
	Edit,
	Delete,
	ArrowDown,
	View,
	Pointer,
	Operation,
} from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { createTableColumns } from './table'; // 表头配置
import { useDictionaryStore } from '@/stores';
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
const dictionaryStore = useDictionaryStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		jobGroup: '',
		jobName: '',
		status: '',
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
// 状态修改
const handleStatusChange = (row: any) => {
	const text = row.status == '0' ? '启用' : '停用';
	ElMessageBox.confirm(`确认要"${text}""${row.jobName}"任务吗？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.CHANGE_JOB_STATUS,
					baseURL: import.meta.env.VITE_JOB_URL as string,
					data: {
						jobId: row.jobId,
						status: row.status,
					},
					method: 'put',
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: `${text}成功`,
				},
			);
			if (err) return;
			if (res) {
				initData();
			}
		},
		() => {
			ElMessage.info('已取消');
			row.status = row.status === '0' ? '1' : '0';
		},
	);
};
// 批量删除操作/单个删除
const handleDelete = (row: any) => {
	let title = row?.jobId ? row.jobName : '已选中的数据项';
	let jobIds = row?.jobId
		? row.jobId
		: tableBaseOptions.selectedKeys.map((o) => o.jobId).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.HANDLE_JOB + '/' + jobIds,
					baseURL: import.meta.env.VITE_JOB_URL as string,
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
// 执行一次
const handleOnExecute = (row: any) => {
	ElMessageBox.confirm(`是否确认执行一次任务"${row.jobName}"？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.JOB_RUN,
					baseURL: import.meta.env.VITE_JOB_URL as string,
					method: 'put',
					data: {
						jobId: row.jobId,
						jobGroup: row.jobGroup,
					},
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: '执行成功',
				},
			);
			if (err) return;
			if (res) {
				initData();
			}
		},
		() => {
			ElMessage.info('已取消执行');
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
		url: URL.BASIC.QUERY_JOB,
		baseURL: import.meta.env.VITE_JOB_URL as string,
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
