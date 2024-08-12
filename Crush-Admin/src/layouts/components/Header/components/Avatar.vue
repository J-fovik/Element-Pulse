<template>
	<!-- 头像下拉 -->
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.gif" class="w-full h-full" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="setActiveKey('InfoDialog')">
					<el-icon><User /></el-icon>{{ $t('header.personalData') }}
				</el-dropdown-item>
				<el-dropdown-item @click="setActiveKey('PasswordDialog')">
					<el-icon><Edit /></el-icon>{{ $t('header.changePassword') }}
				</el-dropdown-item>
				<el-dropdown-item divided @click="logout">
					<el-icon><SwitchButton /></el-icon>{{ $t('header.logout') }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- 用户信息 -->
	<InfoDialog v-if="activeKey === 'InfoDialog'" @close="setActiveKey(null)"></InfoDialog>
	<!-- 修改密码 -->
	<PasswordDialog
		v-if="activeKey === 'PasswordDialog'"
		@close="setActiveKey(null)"
	></PasswordDialog>
</template>

<script setup lang="ts" name="Avatar">
import { Session } from '@/utils/storage';
import { LOGIN_URL } from '@/config';
import { logoutApi } from '@/api/modules/login';
import { useUserStore } from '@/stores';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useBasicsState } from '@/hooks';
import InfoDialog from './InfoDialog.vue';
import PasswordDialog from './PasswordDialog.vue';
/* 页面唯一元素控制 */
const [activeKey, setActiveKey] = useBasicsState<string | null>(null);
const router = useRouter();
const { setUserInfo } = useUserStore();

// 退出登录
const logout = () => {
	ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {
		// 执行退出登录接口
		await logoutApi();
		// 请空用户信息
		setUserInfo({});
		// 清除Cookie
		await Session.remove('userToken');
		// 到登陆页
		router.push(LOGIN_URL);
		ElMessage.success('退出登录成功！');
	});
};
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
}
</style>
