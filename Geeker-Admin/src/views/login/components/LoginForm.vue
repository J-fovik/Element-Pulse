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
import { toast } from '@/utils/elementPlus';
import { HOME_URL } from '@/config';
import { getTimeState } from '@/utils';
import { loginApi } from '@/api/modules/login';
import { useUserStore, useTabsStore, useKeepAliveStore } from '@/stores';
import { initDynamicRouter } from '@/routers/dynamicRouter';
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { useForm, useBasicsState, curryingRequest } from '@/hooks';
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

// form
const { form, formRef, resetForm } = useForm<any>(() => ({
	username: '',
	password: '',
}));
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
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
		// 存储token
		userStore.setToken(res?.data.access_token);
		// 添加动态路由
		await initDynamicRouter();
		// 清空 tabs、keepAlive 数据
		tabsStore.setTabs([]);
		keepAliveStore.setKeepAliveName([]);
		// 跳转首页
		router.push(HOME_URL);
		// 欢迎登录提示
		toast(`欢迎登录 ${APP_TITLE}`, 'success', getTimeState());
	});
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
