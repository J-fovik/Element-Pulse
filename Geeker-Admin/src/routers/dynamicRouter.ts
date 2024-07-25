import router from '@/routers/index';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue');

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
	const userStore = useUserStore();
	const authStore = useAuthStore();

	// 1.无 token 停止执行下一步
	if (!userStore.token) return false;

	// 2.获取用户信息 && 获取菜单列表 && 按钮权限列表
	await userStore.getUserInfo();
	await authStore.getAuthMenuList();
	await authStore.getAuthButtonList();

	// 3.判断当前用户有没有菜单权限
	if (!authStore.authMenuListGet.length) return Promise.resolve(true);

	// 4.添加动态路由
	authStore.flatMenuListGet.forEach((item) => {
		item.children && delete item.children;
		if (item.component && typeof item.component == 'string') {
			item.component = modules['/src/views' + item.component + '.vue'];
		}
		if (item.meta.isFull) {
			router.addRoute(item as unknown as RouteRecordRaw);
		} else {
			router.addRoute('layout', item as unknown as RouteRecordRaw);
		}
	});
};
