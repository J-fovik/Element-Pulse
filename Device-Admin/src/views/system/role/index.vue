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
							<el-form-item label="角色名称">
								<el-input
									v-model.trim="form.roleName"
									placeholder="角色名称"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="权限字符">
								<el-input
									v-model.trim="form.roleKey"
									placeholder="权限字符"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="状态">
								<el-select v-model="form.status" filterable clearable>
									<el-option label="正常" value="0"></el-option>
									<el-option label="停用" value="1"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
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
					<el-button type="primary" :icon="CirclePlus" @click="setActiveKey('AddEditor')">
						添加角色
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
											编辑角色
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="danger"
											:icon="Delete"
											link
											@click="handleDelete(row)"
										>
											删除角色
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="warning"
											:icon="Connection"
											link
											@click="
												setSelectRow(row, () =>
													setActiveKey('DataPermission'),
												)
											"
										>
											数据权限
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="success"
											:icon="Check"
											link
											@click="
												setSelectRow(row, () => setActiveKey('AssignUsers'))
											"
										>
											分配用户
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
		<!-- 分配数据权限 -->
		<DataPermission
			v-if="activeKey === 'DataPermission'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></DataPermission>
		<!-- 分配用户 -->
		<AssignUsers
			v-if="activeKey === 'AssignUsers'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AssignUsers>
	</div>
</template>
<script setup lang="ts" name="SystemRole">
import { CirclePlus, Edit, ArrowDown, Delete, Connection, Check } from '@element-plus/icons-vue';
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
import DataPermission from './components/DataPermission.vue';
import AssignUsers from './components/AssignUsers.vue';
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		roleName: '', // 名称
		roleKey: '',
		status: '', // 状态
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
// 批量删除操作/单个删除
const handleDelete = (row: any) => {
	let title = row?.roleId ? row.roleName : '已选中的数据项';
	let roleIds = row?.roleId
		? row.roleId
		: tableBaseOptions.selectedKeys.map((o) => o.roleId).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.HANDLE_ROLE + '/' + roleIds,
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
// 角色状态修改
const handleStatusChange = (row: any) => {
	const text = row.status == '0' ? '启用' : '停用';
	ElMessageBox.confirm(`确认要"${text}""${row.roleName}"角色吗？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.CHANGE_ROLE_STATUS,
					data: {
						roleId: row.roleId,
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
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncNoInitData(async () => {
	const { daterange, ...otherForm } = form.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_ROLE,
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
