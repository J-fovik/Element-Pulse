<template>
	<div>
		<CustomTableMould :table-columns="columnsData" @reset-search="resetForm" @search="resetData"
			><template #form>
				<el-form :model="form" label-position="left" label-width="auto">
					<el-row :gutter="24">
						<el-col :span="4">
							<el-form-item label="字典名称">
								<el-input
									v-model.trim="form.dictName"
									placeholder="字典名称"
									clearable
								/>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="字典类型">
								<el-input
									v-model.trim="form.dictType"
									placeholder="字典类型"
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
						添加字典
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
										type="danger"
										:icon="Delete"
										link
										@click="handleRefreshCache"
									>
										刷新缓存
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
					<template #dictType="{ row }">
						<el-link
							type="primary"
							@click="$router.push(`/system/dict/detail/index?id=${row.dictId}`)"
							>{{ row.dictType }}</el-link
						>
					</template>
					<template #status="{ row }">
						<el-tag v-if="row.status == 1" type="danger">停用</el-tag>
						<el-tag v-else type="success">正常</el-tag>
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
											编辑
										</el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button
											type="danger"
											:icon="Delete"
											link
											@click="handleDelete(row)"
										>
											删除
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
<script setup lang="ts" name="dict">
import { CirclePlus, Edit, ArrowDown, Delete } from '@element-plus/icons-vue';
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
import { useDictionaryStore } from '@/stores';
import AddEditor from './components/AddEditor.vue';
const dictionaryStore = useDictionaryStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 表单hooks
const { form, resetForm } = useForm(
	() => ({
		dictType: '', // 名称
		dictName: '', // 编码
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
// 刷新缓存操作
const handleRefreshCache = () => {
	ElMessageBox.confirm('是否确认刷新缓存？', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			await dictionaryStore.initData();
			ElMessage.success('刷新成功');
		},
		() => {
			ElMessage.info('已取消刷新');
		},
	);
};
// 批量删除操作/单个删除
const handleDelete = (row: any) => {
	let title = row?.dictId ? row.dictName : '已选中的数据项';
	let dictIds = row?.dictId
		? row.dictId
		: tableBaseOptions.selectedKeys.map((o) => o.dictId).join(',');
	ElMessageBox.confirm(`是否确认删除${title}？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.SYSTEM.HANDLE_DICT + '/' + dictIds,
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
	const { daterange, ...otherForm } = form.value;
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.QUERY_DICT,
		params: {
			...form.value,
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
