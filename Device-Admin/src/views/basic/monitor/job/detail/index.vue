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
							<el-form-item label="执行状态">
								<el-select v-model="form.status" filterable clearable>
									<el-option
										v-for="dict in dictionaryStore.getDictionaryInfo(
											'operlog_status',
										)"
										:key="dict.value"
										:label="dict.label"
										:value="dict.value"
									/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="执行时间">
								<el-date-picker
									v-model="form.daterange"
									type="daterange"
									range-separator="-"
									start-placeholder="开始"
									end-placeholder="结束"
									size="small"
									format="YYYY/MM/DD"
									value-format="YYYY-MM-DD"
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</template>
			<template #operateRight>
				<el-space>
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
										type="danger"
										:icon="Delete"
										link
										@click="handleClear"
									>
										清空日志
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
				>
					<template #jobGroup="{ row }">
						<el-tag
							:type="
								dictionaryStore.getDictionaryItem('sys_job_group', row.jobGroup)
									?.listClass
							"
							>{{
								dictionaryStore.getDictionaryItem('sys_job_group', row.jobGroup)
									?.label
							}}
						</el-tag>
					</template>
					<template #status="{ row }">
						<el-tag
							:type="
								dictionaryStore.getDictionaryItem('operlog_status', row.status)
									?.listClass
							"
							>{{
								dictionaryStore.getDictionaryItem('operlog_status', row.status)
									?.label
							}}
						</el-tag>
					</template>
					<template #operate="{ row }">
						<el-dropdown trigger="click">
							<el-icon><MoreFilled /></el-icon>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
										<el-button
											type="primary"
											:icon="View"
											link
											@click="
												setSelectRow(row, () => setActiveKey('AddEditor'))
											"
										>
											日志详情
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
<script setup lang="ts" name="jobDetail">
import { CirclePlus, Edit, Delete, ArrowDown, Operation, View } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { createTableColumns } from './table'; // 表头配置
import { useDictionaryStore } from '@/stores';
import dayjs from 'dayjs';
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
const route = useRoute();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		jobName: '', // 编码
		status: '', // 状态
		jobGroup: '', // 任务组名
		daterange: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 执行时间
	}),
	() => resetData(),
);
const curDetail = ref({} as any);
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
// 批量删除操作/单个删除
const handleDelete = (row: any) => {
	let title = row?.jobLogId ? row.jobName : '已选中的数据项';
	let jobLogIds = row?.jobLogId
		? row.jobLogId
		: tableBaseOptions.selectedKeys.map((o) => o.jobLogId).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.DEL_JOB_LOG + '/' + jobLogIds,
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
// 清空日志操作
const handleClear = () => {
	ElMessageBox.confirm('是否确认清空所有日志？', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.CLEAN_JOB_LOG,
					baseURL: import.meta.env.VITE_JOB_URL as string,
					method: 'delete',
				},
				{
					before: () => setActiveKey('loading'),
					after: () => setActiveKey(null),
					successMsg: '清空成功',
				},
			);
			if (err) return;
			if (res) {
				initData();
			}
		},
		() => {
			ElMessage.info('已取消清空');
		},
	);
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = form.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC.QUERY_JOB_LOG,
		baseURL: import.meta.env.VITE_JOB_URL as string,
		params: {
			...otherForm,
			beginTime: daterange[0],
			endTime: daterange[1],
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
/*  查询详情信息 */
const getDetail = async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC.HANDLE_JOB + '/' + route.query.id,
		baseURL: import.meta.env.VITE_JOB_URL as string,
		method: 'get',
	});
	if (err) return;
	curDetail.value = res?.data;
	form.value.jobName = res?.data.jobName;
	form.value.jobGroup = res?.data.jobGroup;
	initData();
};
/* 查询详情和编辑时才调用 */
if (route.query.id) {
	getDetail();
} else {
	initData();
}
</script>
