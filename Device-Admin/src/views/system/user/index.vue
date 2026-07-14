<template>
	<div
		class="card-tree container flex justify-center items-center"
		style="box-shadow: var(--el-border-color-light) 0px 0px 10px"
	>
		<el-splitter>
			<el-splitter-panel size="15%" min="200" :collapsible="true">
				<TreeSelector
					:data="deptList"
					id="deptId"
					:default-value="form.deptId"
					:expandAll="true"
					title="用户部门"
					:width="'100%'"
					:default-props="{
						children: 'children',
						label: 'deptName',
					}"
					@change="changeTreeFilterSingle"
				/>
			</el-splitter-panel>
			<el-splitter-panel>
				<!-- 右侧表格 -->
				<div class="descriptions-box card-noBorder">
					<CustomTableMould
						fold
						:table-columns="columnsData"
						@reset-search="resetForm"
						:isTool="false"
						@search="resetData"
					>
						<template #form>
							<el-form :model="form" label-position="left" label-width="auto">
								<el-row :gutter="24">
									<el-col :span="5">
										<el-form-item label="员工编号:">
											<el-input
												v-model.trim="form.userName"
												placeholder="员工编号"
												class="w-full"
												clearable
											/>
										</el-form-item>
									</el-col>
									<el-col :span="5">
										<el-form-item label="员工姓名:">
											<el-input
												v-model.trim="form.nickName"
												placeholder="员工姓名"
												class="w-full"
												clearable
											/>
										</el-form-item>
									</el-col>
									<el-col :span="5">
										<el-form-item label="用户状态">
											<el-select v-model="form.status" filterable clearable>
												<el-option label="正常" value="0"></el-option>
												<el-option label="停用" value="1"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="9">
										<el-form-item label="创建时间">
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
								<el-button
									type="primary"
									:icon="CirclePlus"
									@click="setActiveKey('AddEditor')"
									>新增用户</el-button
								>
								<!-- <el-dropdown trigger="click">
									<el-button type="primary" :icon="ArrowDown">
										批量操作
									</el-button>
									<template #dropdown>
										<el-dropdown-menu>
											<el-dropdown-item>
												<el-button
													type="danger"
													:icon="Delete"
													link
													:disabled="
														!tableBaseOptions.selectedKeys.length
													"
													@click="handleDelete"
												>
													批量删除
												</el-button>
											</el-dropdown-item>
										</el-dropdown-menu>
									</template>
								</el-dropdown> -->
							</el-space>
						</template>
						<template #table>
							<TablePlus
								ref="tableRef"
								border
								:tableData="tableData"
								:selection="true"
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
															setSelectRow(row, () =>
																setActiveKey('AddEditor'),
															)
														"
													>
														编辑用户
													</el-button>
												</el-dropdown-item>
												<el-dropdown-item>
													<el-button
														type="danger"
														:icon="Delete"
														link
														@click="handleDelete(row)"
													>
														删除用户
													</el-button>
												</el-dropdown-item>
												<el-dropdown-item>
													<el-button
														type="warning"
														:icon="Key"
														link
														@click="
															setSelectRow(row, () =>
																setActiveKey('ResetPass'),
															)
														"
													>
														重置密码
													</el-button>
												</el-dropdown-item>
												<el-dropdown-item>
													<el-button
														type="success"
														:icon="UserFilled"
														link
														@click="
															setSelectRow(row, () =>
																setActiveKey('AssigningRoles'),
															)
														"
													>
														分配角色
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
				</div>
			</el-splitter-panel>
		</el-splitter>
		<!-- 新增编辑详情 -->
		<AddEditor
			v-if="activeKey === 'AddEditor'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditor>
		<!-- 重置密码 -->
		<ResetPass
			v-if="activeKey === 'ResetPass'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></ResetPass>
		<!-- 分配角色 -->
		<AssigningRoles
			v-if="activeKey === 'AssigningRoles'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AssigningRoles>
	</div>
</template>

<script setup lang="ts" name="user">
import {
	CirclePlus,
	Edit,
	ArrowDown,
	Delete,
	Connection,
	Key,
	UserFilled,
} from '@element-plus/icons-vue';
import { convertDeptTree } from '@/utils';
import { ElMessageBox, ElMessage } from 'element-plus';
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
import { useUserStore } from '@/stores';
import { createTableColumns } from './table'; // 表头配置
import AddEditor from './components/AddEditor.vue';
import ResetPass from './components/ResetPass.vue';
import AssigningRoles from './components/AssigningRoles.vue';
const userStore = useUserStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		userName: '',
		nickName: '',
		daterange: [],
		status: '',
		deptId: undefined,
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
// 单选选中
const changeTreeFilterSingle = (e: any) => {
	form.value.deptId = e;
	initData();
};
// 批量删除操作/单个删除
const handleDelete = (row: any) => {
	let title = row?.userId ? row.userName : '已选中的数据项';
	let userIds = row?.userId
		? row.userId
		: tableBaseOptions.selectedKeys.map((o) => o.userId).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.HANDLE_USER + '/' + userIds,
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
// 用户状态修改
const handleStatusChange = (row: any) => {
	const text = row.status == '0' ? '启用' : '停用';
	ElMessageBox.confirm(`确认要"${text}""${row.roleName}"用户吗？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.CHANGE_USER_STATUS,
					data: {
						userId: row.userId,
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
// 获取部门数据
const { data: deptList, initData: initDeptList } = useAsyncNoInitData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DEPT,
		params: {},
		method: 'get',
	});
	if (err) return;
	return res?.data; // 处理数据
});
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = form.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_USER,
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
onActivated(async () => {
	await initDeptList();
	await initData();
});
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	overflow-y: auto;

	.descriptions-box {
		display: flex;
		flex: 1;
		flex-direction: column;
		/* height: 100%; */
		overflow-y: auto !important;
	}
}
</style>
