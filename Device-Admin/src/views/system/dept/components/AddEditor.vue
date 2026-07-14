<template>
	<el-dialog
		:model-value="true"
		:title="form.dialogTitle"
		width="60vw"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" label-align="left" :rules="rules" label-width="auto">
			<el-row :gutter="24">
				<el-col :span="24" v-if="form.parentId != 0">
					<el-form-item label="上级部门" prop="parentId">
						<el-tree-select
							v-model="form.parentId"
							placeholder="请选择上级部门"
							:data="deptOptions"
							filterable
							check-strictly
							:render-after-expand="false"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门名称" prop="deptName">
						<el-input v-model="form.deptName" placeholder="请输入部门名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="orderNum">
						<el-input-number
							v-model.trim="form.orderNum"
							:min="0"
							:step="1"
							class="flex-1"
							controls-position="right"
							placeholder="请输入显示排序"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="负责人" prop="leader">
						<el-input v-model="form.leader" placeholder="请输入负责人" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="联系电话" prop="phone">
						<el-input
							v-model="form.phone"
							placeholder="请输入联系电话"
							maxlength="11"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio value="0">正常</el-radio>
							<el-radio value="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
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

<script lang="ts" setup name="AddEditor">
import { useForm, useBasicsState, useAsyncData, curryingRequestUrl, URL } from '@/hooks';
import { useUserStore } from '@/stores';
import { convertDeptTree } from '@/utils';
const userStore = useUserStore();
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
	parentId: '1506545158835290114',
	status: '0',
	...props.data,
}));
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
/* 表单验证 */
const rules = {
	parentId: [{ required: true, message: '请选择上级部门', trigger: 'blur' }],
	email: [
		{
			type: 'email',
			message: '请输入正确的邮箱地址',
			trigger: ['blur', 'change'],
		},
	],
	orderNum: [{ required: true, message: '请输入显示排序', trigger: 'blur' }],
	deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
	phone: [
		{
			pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
			message: '请输入正确的手机号码',
			trigger: 'blur',
		},
	],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			if (form.value.dialogTitle == '编辑部门') submitData('editApi');
			else submitData('addApi');
		} else return false;
	});
};
/* 提交数据 */
const submitData = async (type: 'addApi' | 'editApi') => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.HANDLE_DEPT,
			data: form.value,
			method: type == 'addApi' ? 'post' : 'put',
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
</script>
<style scoped lang="scss">
.addTable {
	.el-form-item {
		margin-bottom: 0px !important;
	}
}
</style>
