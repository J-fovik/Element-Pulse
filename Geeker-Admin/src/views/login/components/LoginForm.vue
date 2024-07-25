<template>
	<el-form ref="formRef" :model="form" :rules="rules" size="large">
		<el-form-item prop="username">
			<el-input v-model.trim="form.username" placeholder="用户名：admin / user">
				<template #prefix>
					<el-icon class="el-input__icon">
						<user />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model.trim="form.password"
				type="password"
				placeholder="密码：123456"
				show-password
				autocomplete="new-password"
			>
				<template #prefix>
					<el-icon class="el-input__icon">
						<lock />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round size="large" @click="resetForm"> 重置 </el-button>
		<el-button
			:icon="UserFilled"
			round
			size="large"
			type="primary"
			:loading="activeKey === 'login'"
			@click="login(formRef)"
		>
			登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
import md5 from 'md5';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import { HOME_URL } from '@/config';
import { getTimeState } from '@/utils';
import { loginApi } from '@/api/modules/login';
import { useUserStore } from '@/stores/modules/user';
import { initDynamicRouter } from '@/routers/dynamicRouter';
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { useForm, useBasicsState, curryingRequest } from '@/hooks';
import { Local } from '@/utils/storage';
// form
const { form, formRef, resetForm } = useForm<any>(() => ({
	username: '',
	password: '',
}));
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const router = useRouter();
const userStore = useUserStore();

/* 表单验证 */
const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

// 登录
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (!valid) return;
		const { res, err } = await curryingRequest(
			() =>
				loginApi({
					...form.value,
					password: md5(form.value.password),
				}),
			{
				before: () => setActiveKey('login'),
				after: () => setActiveKey(null),
			}
		);
		if (err) return;
		// 1.存储token
		userStore.setToken(res?.data.access_token);
		// 2.添加动态路由
		const isNoPower = await initDynamicRouter();
		// 3.登录成功后的跳转
		signInSuccess(isNoPower);
	});
};
// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
	// 无登录权限时
	if (isNoPower) {
		ElNotification({
			title: '无权限访问',
			message: '当前账号无任何菜单权限，请联系系统管理员！',
			type: 'warning',
			duration: 3000,
		});
		// 清空token
		userStore.setToken('');
	} else {
		// 跳转到首页
		router.push(HOME_URL);
		ElNotification({
			title: getTimeState(),
			message: '欢迎登录 Geeker-Admin',
			type: 'success',
			duration: 3000,
		});
	}
};
// 监听回车事件
const onKeyUp = (e: any) => {
	if (e.key == 'Enter') login(formRef.value);
};
// 添加键盘监听
onMounted(() => {
	document.addEventListener('keyup', onKeyUp);
});
// 移除键盘监听
onBeforeUnmount(() => {
	document.removeEventListener('keyup', onKeyUp);
});
</script>

<style scoped lang="scss">
.login-btn {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 40px;
	white-space: nowrap;
	.el-button {
		width: 185px;
	}
}
</style>
