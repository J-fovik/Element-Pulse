<template>
	<Container>
		<el-alert
			:title="'目前菜单权限使用动态路由实现，注意观察左侧菜单变化（暂未使用）'"
			type="success"
			:closable="false"
		/>
		<el-button class="mt20" type="primary" :icon="Promotion" @click="handleToLogin">
			登录其他账号
		</el-button>
	</Container>
</template>

<script setup lang="ts" name="authMenu">
import { LOGIN_URL } from '@/config';
import jsCookie from 'js-cookie';
import { useUserStore } from '@/stores';
import { Promotion } from '@element-plus/icons-vue';

const router = useRouter();
const { setUserInfo } = useUserStore();

const handleToLogin = () => {
	// 请空用户信息
	setUserInfo({});
	// 清除Cookie
	jsCookie.remove('userToken');
	router.push(LOGIN_URL);
};
</script>

<style scoped lang="scss"></style>
