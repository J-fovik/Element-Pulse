<template>
	<el-form ref="formRef" :model="form" :rules="rules" class="w-full">
		<el-form-item prop="username">
			<el-input v-model.trim="form.username" placeholder="用户名">
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
				placeholder="密码"
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
		<el-form-item>
			<el-checkbox v-model="form.rememberMe">记住密码</el-checkbox>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button
			:icon="UserFilled"
			round
			type="primary"
			:loading="activeKey === 'login'"
			@click="login(formRef)"
		>
			登录
		</el-button>
	</div>
</template>

<script setup lang="ts" name="LoginForm">
import md5 from 'md5';
import Cookies from 'js-cookie';
import { Session } from '@/utils/storage';
import type { FormInstance } from 'element-plus';
import { ElNotification } from 'element-plus';
import { HOME_URL } from '@/config';
import { getTimeState } from '@/utils';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { useKeepAliveStore, useTabsStore, useUserStore, useDictionaryStore } from '@/stores';
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { useForm, useBasicsState, curryingRequestUrl, URL } from '@/hooks';
// 项目名称
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;
const dictionaryStore = useDictionaryStore();
// form
const { form, formRef, resetForm } = useForm<any>(() => ({
	username: '',
	password: '',
	isVerify: 'N', // 是否开启验证码
	appId: '1000',
	captcha: '',
	uuid: '',
	rememberMe: false,
}));
/* 弹窗状态控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const router = useRouter();
const { initUserInfo, setUserInfo } = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();
/* 表单验证 */
const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};
const getCookie = () => {
	const rememberMe = Cookies.get('rememberMe');
	if (Boolean(rememberMe) === true) {
		const username = Cookies.get('username');
		const password = Cookies.get('password');
		form.value = {
			...form.value,
			username: username === undefined ? form.value.username : username,
			password: password === undefined ? form.value.password : decrypt(password),
			rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
		};
	}
};
// 登录
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (!valid) return;
		if (form.value.rememberMe) {
			Cookies.set('rememberMe', form.value.rememberMe);
		} else {
			Cookies.remove('rememberMe');
		}
		const formData = new FormData();
		formData.append('username', form.value.username);
		formData.append('password', form.value.password);
		formData.append('uuid', form.value.uuid);
		formData.append('isVerify', form.value.isVerify);
		formData.append('captcha', form.value.captcha);
		formData.append('appId', form.value.appId);
		const { res, err } = await curryingRequestUrl(
			{
				url: URL.USER.LOGIN,
				data: formData,
				method: 'post',
			},
			{
				before: () => setActiveKey('login'),
				after: () => setActiveKey(null),
			},
		);
		if (err) return;
		// 设置用户信息
		Session.set('userToken', res?.data.access_token);
		Cookies.set('username', form.value.username);
		const encryptedPwd = encrypt(form.value.password);
		if (typeof encryptedPwd === 'string') {
			Cookies.set('password', encryptedPwd);
		} else {
			Cookies.remove('password');
		}
		// 清空 tabs、keepAlive 数据
		tabsStore.setTabs([]);
		keepAliveStore.setKeepAliveName([]);
		dictionaryStore.initData();
		// 获取用户信息
		const isSuccess = await initUserInfo();
		if (isSuccess) {
			// 设置用户信息
			setUserInfo(res?.data);
			router.push(HOME_URL);
			ElNotification({
				title: getTimeState(),
				message: `欢迎登录 ${APP_TITLE}`,
				type: 'success',
				duration: 3000,
			});
		}
	});
};

// 监听回车事件
const onKeyUp = (e: any) => {
	if (e.key == 'Enter') login(formRef.value);
};
// 添加键盘监听
onMounted(() => {
	document.addEventListener('keyup', onKeyUp);
	getCookie();
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
	margin-top: 10px;
	white-space: nowrap;
	.el-button {
		width: 100%;
		height: 40px;
	}
}
</style>
