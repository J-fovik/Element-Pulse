<template>
	<!-- 修改密码 -->
	<el-dialog
		:model-value="true"
		title="修改密码"
		width="500px"
		draggable
		:close-on-click-modal="true"
		@close="emits('close')"
	>
		<el-form ref="formRef" :model="form" label-align="left" :rules="rules" label-width="auto">
			<el-form-item label="原密码" prop="oldPassword">
				<el-input v-model="form.oldPassword" type="password" show-password />
			</el-form-item>
			<el-form-item label="新密码" prop="newPassword">
				<el-input v-model="form.newPassword" type="password" show-password />
			</el-form-item>
			<el-form-item label="确认密码" prop="confirmPassword">
				<el-input v-model="form.confirmPassword" type="password" show-password />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="emits('close')">取消</el-button>
				<el-button
					v-loading.fullscreen.lock="activeKey == 'okLoading'"
					type="primary"
					element-loading-text="请稍后..."
					@click="validateData(formRef)"
					>确认</el-button
				>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts" name="PasswordDialog">
import { useForm, curryingRequestUrl, useBasicsState, URL } from '@/hooks';
import { useUserStore } from '@/stores';
// 用户信息
const { userInfo } = useUserStore();

/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
/* 父组件方法 */
const emits = defineEmits(['close', 'success']);
/* 表单 */
const { form, formRef } = useForm<any>(() => ({
	oldPassword: '',
	newPassword: '',
	confirmPassword: '',
}));
const equalToPassword = (rule, value, callback) => {
	if (form.value.newPassword !== value) {
		callback(new Error('两次输入的密码不一致'));
	} else {
		callback();
	}
};
/* 表单验证 */
const rules = {
	oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
	newPassword: [
		{ required: true, message: '请输入新密码', trigger: 'blur' },
		{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
	],
	confirmPassword: [
		{ required: true, message: '请再次输入新密码', trigger: 'blur' },
		{ required: true, validator: equalToPassword, trigger: 'blur' },
	],
};

/* 验证数据 */
const validateData = (formEl: any) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			/* 可加其他特殊校验 */
			submitData();
		} else return false;
	});
};
/* 提交数据 */
const submitData = async () => {
	const { res, err } = await curryingRequestUrl(
		{
			url: URL.USER.EDIT_PASS,
			params: {
				oldPassword: form.value.oldPassword,
				newPassword: form.value.newPassword,
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
</script>
