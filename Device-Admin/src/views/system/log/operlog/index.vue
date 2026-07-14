<template>
	<div>
		<CustomTableMould
			:table-columns="columnsData"
			fold
			@reset-search="resetForm"
			@search="resetData"
			><template #form>
				<el-form :model="form" label-position="left" label-width="auto">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="操作人员">
								<el-input
									v-model.trim="form.nickName"
									placeholder="操作人员"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="所属部门">
								<el-tree-select
									v-model="form.deptId"
									placeholder="请选择所属部门"
									:data="deptOptions"
									filterable
									check-strictly
									:render-after-expand="false"
									class="w-full"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="操作时间">
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
						<el-col :span="4">
							<el-form-item label="状态">
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
						<el-col :span="4">
							<el-form-item label="系统模块">
								<el-input
									v-model.trim="form.title"
									placeholder="系统模块"
									clearable
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
					:selection="false"
					border
					:loading="loading"
					:visibleColumnsData="visibleColumnsData"
					@select-keys="handleSelectionChange"
				>
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
											查看详情
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
<script setup lang="ts" name="operlog">
import { CirclePlus, Edit, Delete, View, ArrowDown, Download } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { createTableColumns } from './table'; // 表头配置
import { useDictionaryStore } from '@/stores';
import { convertDeptTree } from '@/utils';
import {
	useForm,
	useTable,
	useBasicsState,
	curryingRequest,
	useAsyncNoInitData,
	curryingRequestUrl,
	URL,
	useAsyncData,
} from '@/hooks';
import AddEditor from './components/AddEditor.vue';
const dictionaryStore = useDictionaryStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		operName: '', // 名称
		nickName: '', // 昵称
		deptId: '', // 部门id
		status: '', // 状态
		title: '', // 系统模块
		daterange: [], // 时间范围
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
// 清空日志操作
const handleClear = () => {
	ElMessageBox.confirm('是否确认清空所有操作日志数据项？', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.CLEAR_OPER,
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
// 获取部门数据
const { data: deptOptions, initData: getDeptOptions } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DEPT,
		params: {},
		method: 'get',
	});
	if (err) return;
	return res?.data?.map((item) => convertDeptTree(item)); // 处理数据
});
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = form.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_OPER,
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
onActivated(() => {
	initData();
});
</script>
