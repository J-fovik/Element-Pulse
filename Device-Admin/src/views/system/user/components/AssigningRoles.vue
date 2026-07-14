<template>
	<el-dialog
		:model-value="true"
		:title="`[${form.nickName}]分配角色`"
		width="60vw"
		draggable
		destroy-on-close
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
			<el-form-item label="分配角色" prop="roleIds">
				<el-select v-model="form.roleIds" multiple filterable clearable>
					<el-option
						v-for="dict in roleList"
						:key="dict.roleId"
						:label="dict.roleName"
						:value="dict.roleId"
					/>
				</el-select>
			</el-form-item>
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

<script lang="ts" setup name="AssigningRoles">
import { useForm, useAsyncData, useBasicsState, curryingRequestUrl, URL } from '@/hooks';

/* 接受父组件参数 */
const props = defineProps({
	data: {
		type: Object,
		default: {},
	},
});

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	...props.data,
}));
const rules = {
	roleIds: [{ required: true, message: '请选择角色', trigger: 'change' }],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			submitData();
		} else return false;
	});
};
// 获取角色列表
const { data: roleList } = useAsyncData(async () => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.HANDLE_USER + '/' + 0,

		method: 'get',
	});
	if (err) return;
	return res?.data.roles;
});
// 获取详情
const getUserDetail = async (userId: number) => {
	const { res, err } = await curryingRequestUrl({
		url: URL.SYSTEM.HANDLE_USER + '/' + userId,
		method: 'get',
	});
	if (err) return;
	form.value = {
		...res?.data.user,
		roleIds: res?.data.roleIds,
	};
};
getUserDetail(props.data.userId);
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.AUTH_ROLE,
			params: {
				roleIds: form.value.roleIds.join(','),
				userId: form.value.userId,
			},
			method: 'put',
		},
		{
			before: () => setActiveKey('okLoading'), // 设置loading
			after: () => setActiveKey(null), // 关闭loading
			successMsg: '分配成功',
		},
	);
	if (err) return;
	// 触发成功
	emits('success');
	// 触发关闭
	emits('close');
};
</script>

<style scoped>
.transfer-footer {
	margin-left: 15px;
	padding: 6px 5px;
}
.el-table .cell {
	padding: 0 5px;
}
</style>
