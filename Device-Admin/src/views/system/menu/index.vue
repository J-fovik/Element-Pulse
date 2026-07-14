<template>
	<div>
		<CustomTableMould
			:isTool="false"
			:table-columns="columnsData"
			@reset-search="resetForm"
			@search="resetData"
		>
			<template #form>
				<el-form :model="form" label-position="left">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="菜单名称">
								<el-input
									v-model.trim="form.menuName"
									placeholder="菜单名称"
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
					</el-row>
				</el-form>
			</template>
			<template #operateRight>
				<el-space>
					<el-button
						type="primary"
						:icon="CirclePlus"
						@click="
							setSelectRow({ dialogTitle: '新增菜单' }, () =>
								setActiveKey('AddEditor'),
							)
						"
						>新增</el-button
					>
				</el-space>
			</template>
			<template #table>
				<el-table
					border
					v-loading="loading"
					:data="tableData"
					highlight-current-row
					row-key="menuId"
					:tree-props="{
						children: 'children',
						hasChildren: 'hasChildren',
					}"
					:header-cell-style="{ background: '#F1F1F1', color: '#666666' }"
				>
					<el-table-column
						label="菜单名称"
						align="left"
						fixed
						header-align="center"
						width="200"
						prop="menuName"
						show-overflow-tooltip
					/>
					<el-table-column label="图标" align="center" width="60" prop="icon">
						<template #default="scope">
							<div v-if="scope.row.icon">
								<el-icon>
									<component :is="scope.row.icon"></component>
								</el-icon>
							</div>
							<div v-else></div>
						</template>
					</el-table-column>
					<el-table-column label="排序" align="center" width="60" prop="orderNum" />
					<el-table-column
						label="权限标识"
						align="center"
						width="90"
						prop="perms"
						show-overflow-tooltip
					/>
					<el-table-column
						label="组件路径"
						align="center"
						header-align="center"
						width="250"
						prop="component"
						show-overflow-tooltip
					/>
					<el-table-column
						label="路由"
						header-align="center"
						min-width="290"
						prop="path"
						show-overflow-tooltip
					/>
					<el-table-column
						label="路由参数"
						width="120"
						prop="query"
						show-overflow-tooltip
					/>
					<el-table-column label="类型" align="center" width="90">
						<template #default="scope">
							<el-tag v-if="scope.row.parentId == '0'" type="warning">目录</el-tag>
							<el-tag v-else type="success">菜单</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="状态" align="center" width="90">
						<template #default="scope">
							<el-tag v-if="scope.row.status == 1" type="danger">停用</el-tag>
							<el-tag v-else type="success">正常</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" align="center" prop="createTime" width="180">
						<template #default="scope">
							<span>{{ scope.row.createTime }}</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" align="center" label="操作" width="70">
						<template #default="scope">
							<el-dropdown trigger="click">
								<el-icon><MoreFilled /></el-icon>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>
											<el-button
												v-if="scope.row.menuType != 'F'"
												type="primary"
												:icon="CirclePlusFilled"
												link
												@click="
													setSelectRow(
														{
															parentId: scope.row.menuId,
															dialogTitle: '新增菜单',
														},
														() => setActiveKey('AddEditor'),
													)
												"
											>
												新增
											</el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button
												type="primary"
												:icon="Edit"
												link
												@click="
													setSelectRow(
														{
															...scope.row,
															parentId: scope.row.parentId,
															dialogTitle: '编辑菜单',
														},
														() => setActiveKey('AddEditor'),
													)
												"
											>
												编辑
											</el-button>
										</el-dropdown-item>
										<el-dropdown-item>
											<el-button
												type="danger"
												:icon="Delete"
												link
												@click="handleDelete(scope.row.menuId)"
											>
												删除
											</el-button>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
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
<script setup lang="ts" name="menu">
import { CirclePlus, CirclePlusFilled, Edit, Delete } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';
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

// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		menuName: '', // 名称
		status: '', //
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
} = useTable([], () => initData());
// 删除菜单
const handleDelete = (id: any) => {
	ElMessageBox.confirm('确认删除已选中的数据项?', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.HANDLE_MENU + '/' + id,
					method: 'delete',
				},
				{
					before: () => setActiveKey('login'),
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
		url: URL.SYSTEM.QUERY_MENU,
		params: {
			...form.value,
		},
		method: 'get',
	});
	if (err) return;
	return res?.data; // 处理数据
});
// onActivated 可用于跳转页面返回刷新列表
onActivated(() => {
	initData();
});
</script>
