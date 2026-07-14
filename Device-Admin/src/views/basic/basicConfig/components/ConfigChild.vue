<template>
	<el-drawer
		:model-value="true"
		title="基础配置明细"
		:close-on-click-modal="true"
		:destroy-on-close="true"
		@close="emits('close')"
		size="80%"
	>
		<el-space class="mb10 flex justify-end">
			<el-button
				type="primary"
				:icon="CirclePlus"
				@click="
					setSelectRow(
						{
							filterData: {
								...filterData,
							},
							dialogTitle: '新增基础配置数据',
							columns: columns,
							configTypeId: form.id,
						},
						() => setActiveKey('AddEditorData'),
					)
				"
			>
				新增数据
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
			<el-button type="primary" link @click="setCollapsed(!collapsed)">
				<el-icon class="mr5"
					><ArrowUpBold v-if="collapsed" /><ArrowDownBold v-else />
				</el-icon>
				{{ collapsed ? '折叠' : '展开' }}
			</el-button>
		</el-space>
		<el-form
			ref="formRef"
			:model="form"
			label-align="left"
			label-width="auto"
			:disabled="!!form.isReadOnly"
		>
			<el-row :gutter="24" v-if="collapsed">
				<el-col :span="4" v-for="item in columns" :key="item.key">
					<el-form-item :label="item.label">
						<el-input
							v-model.trim="filterData[item.key]"
							@change="resetData"
							placeholder="请输入"
							clearable
						/>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<TablePlus
			ref="tableRef"
			:tableData="tableData"
			:selection="true"
			border
			:loading="loading"
			:visibleColumnsData="createTableColumns()"
			@select-keys="handleSelectionChange"
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
										setSelectRow(
											{
												filterData: {
													...filterData,
													...row,
												},
												dialogTitle: '编辑基础配置数据',
												columns: columns,
												configTypeId: form.id,
											},
											() => setActiveKey('AddEditorData'),
										)
									"
								>
									编辑数据
								</el-button>
							</el-dropdown-item>
							<el-dropdown-item>
								<el-button
									type="danger"
									:icon="Delete"
									link
									@click="handleDelete(row)"
								>
									删除数据
								</el-button>
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</template>
		</TablePlus>
		<!-- 新增编辑详情 -->
		<AddEditorData
			v-if="activeKey === 'AddEditorData'"
			:data="selectRow"
			@success="initData"
			@close="setSelectRow({}, () => setActiveKey(null))"
		></AddEditorData>
		<!-- <template #footer>
			<el-space>
				<el-button type="primary" @click="onSubmit">确定</el-button>
				<el-button type="default" @click="emits('close')">取消</el-button>
			</el-space>
		</template> -->
	</el-drawer>
</template>

<script setup lang="ts" name="ConfigChild">
import { CirclePlus, Edit, Delete, ArrowDown, MoreFilled } from '@element-plus/icons-vue';
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
import { moneyFormat, textFormat, dateFormat } from '@/utils/commonFunction';
import AddEditorData from './AddEditorData.vue';

/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
// 控制折叠
const [collapsed, setCollapsed] = useBasicsState<boolean>(false);
// 列信息
const columns = ref([] as any);
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form } = useForm<any>(() => ({
	...props.data,
}));
// 查询数据
const filterData = ref({} as any);
// 初始化列信息
const initColumns = () => {
	const keys = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
	const zhNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
	columns.value = keys.map((key, i) => {
		const label = form.value[`column${key}`] || `第${zhNum[i]}栏`;
		const width = label?.length > 3 ? label.length * 16 + 20 : 100;
		filterData.value[`data${key}`] = '';
		return { label, key: `data${key}` };
	});
};
initColumns();
// 处理表格配置
const createTableColumns = () => {
	return [
		...columns.value.map((item) => ({
			...item,
			title: item.label,
			key: item.key,
			show: true,
			tooltip: true,
			align: 'center',
			headerAlign: 'center',
		})),
		{
			title: '操作',
			fixed: 'right',
			width: 70,
			key: 'operate',
			show: true,
			align: 'center',
		},
	];
};
// 单个删除/批量删除
const handleDelete = (row: any) => {
	let ids = row?.id ? row.id : tableBaseOptions.selectedKeys.map((o) => o.id).join(',');
	ElMessageBox.confirm(`是否确认删除选中的基础配置明细明细数据项？`, '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(
		async () => {
			const { res, err } = await curryingRequestUrl(
				{
					url: URL.BASIC.DELETE_BASIC_DETAIL + '/' + ids,
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
const {
	data: tableData,
	loading,
	initData,
} = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.BASIC.QUERY_BASIC_DETAIL,
		baseURL: import.meta.env.VITE_EMS_URL as string,
		params: {
			configTypeId: form.value.id,
			...filterData.value,
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
</script>

<style scoped lang="scss">
.card {
	border: none !important;
}
</style>
