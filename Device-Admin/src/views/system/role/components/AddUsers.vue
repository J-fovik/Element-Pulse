<template>
	<el-dialog
		:model-value="true"
		title="选择用户"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form :model="form" label-position="left" label-width="auto">
			<el-row :gutter="24">
				<el-col :span="6">
					<el-form-item label="用户名称">
						<el-input
							v-model.trim="form.userName"
							placeholder="用户名称"
							clearable
							@change="resetData()"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="手机号码">
						<el-input
							v-model.trim="form.phonenumber"
							placeholder="手机号码"
							clearable
							@change="resetData()"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<div class="flex justify-end align-center">
						<el-button :icon="Delete" @click="resetForm()"> 重置 </el-button>
					</div>
				</el-col>
			</el-row>
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
					<el-tag v-if="row.status == 1" type="danger">停用</el-tag>
					<el-tag v-else type="success">正常</el-tag>
				</template>
			</TablePlus>
			<el-pagination
				style="margin-top: 12px"
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
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
					v-if="!form.isReadOnly"
					v-loading.fullscreen.lock="activeKey == 'okLoading'"
					type="primary"
					element-loading-text="请稍后..."
					@click="validateData(formRef)"
				>
					确认
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup name="AddUsers">
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
import { CirclePlus, CircleCloseFilled, Search, Delete } from '@element-plus/icons-vue';
import { assignUsersTableColumns } from './table'; // 表头配置
import { ElMessageBox, ElMessage } from 'element-plus';

/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	...props.data,
}));
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
} = useTable(assignUsersTableColumns(), () => initData());
/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			submitData();
		} else return false;
	});
};
// 重置表单数据
const resetForm = () => {
	form.value.userName = '';
	form.value.phonenumber = '';
	resetData();
};
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.AUTH_USER_SELECT_ALL,
			params: {
				roleId: form.value.roleId,
				userIds: tableBaseOptions.selectedKeys.map((o) => o.userId).join(','),
			},
			method: 'put',
		},
		{
			before: () => setActiveKey('okLoading'), // 设置loading
			after: () => setActiveKey(null), // 关闭loading
			successMsg: '操作成功',
		},
	);
	// 处理错误
	if (err) return;
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
// 获取表格列表
const {
	data: tableData,
	loading,
	initData,
} = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.UN_ALLOCATED_LIST,
		params: {
			roleId: form.value.roleId,
			userName: form.value.userName,
			phonenumber: form.value.phonenumber,
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
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
