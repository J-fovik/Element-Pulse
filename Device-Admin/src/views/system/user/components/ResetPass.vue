<template>
	<el-dialog
		:model-value="true"
		:title="`重置${form.nickName}的密码`"
		width="60vw"
		draggable
		destroy-on-close
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
			<el-form-item label="新密码" prop="password">
				<el-input v-model="form.password" placeholder="请输入新密码" />
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

<script lang="ts" setup name="ResetPass">
import { useForm, curryingRequest, useBasicsState, curryingRequestUrl, URL } from '@/hooks';

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
	password: [
		{ required: true, message: '请输入新密码', trigger: 'blur' },
		{
			min: 5,
			max: 20,
			message: '员工密码长度必须介于 5 和 20 之间',
			trigger: 'blur',
		},
	],
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
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.SYSTEM.RESET_PASS,
			data: {
				userId: form.value.userId,
				password: form.value.password,
			},
			method: 'put',
		},
		{
			before: () => setActiveKey('okLoading'), // 设置loading
			after: () => setActiveKey(null), // 关闭loading
			successMsg: '重置成功',
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
