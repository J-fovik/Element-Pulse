<template>
	<Container>
		<el-alert
			:title="'目前菜单权限使用动态路由实现，注意观察左侧菜单变化,使用 权限分配 前先看 README.md 的菜单权限'"
			type="success"
			:closable="false"
		/>
		<el-button class="mt20" type="primary" :icon="Promotion" @click="handleToLogin">
			登录其他账号
		</el-button>
		<el-button
			class="mt20"
			type="primary"
			:icon="Promotion"
			@click="setActiveKey('DistributionPower')"
		>
			权限分配
		</el-button>
		<DistributionPower
			v-if="activeKey === 'DistributionPower'"
			@close="setActiveKey(null)"
			@success="router.go(0)"
		/>
	</Container>
</template>

<script setup lang="ts" name="authMenu">
import { LOGIN_URL } from '@/config';
import { Session } from '@/utils/storage';
import { useUserStore } from '@/stores';
import { Promotion } from '@element-plus/icons-vue';
import { useBasicsState } from '@/hooks';
import DistributionPower from './components/DistributionPower.vue';

const router = useRouter();
const { setUserInfo } = useUserStore();
// 页面唯一元素控制
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
// 登录其他账户
const handleToLogin = () => {
	// 请空用户信息
	setUserInfo({});
	// 清除Cookie
	Session.remove('userToken');
	router.push(LOGIN_URL);
};
</script>

<style scoped lang="scss"></style>
