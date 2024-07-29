import router from '@/routers/index';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
import { LOGIN_URL } from '@/config';
import { toast } from '@/utils/elementPlus';
// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue');

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
	const userStore = useUserStore();
	const authStore = useAuthStore();
	try {
		// 无 token 停止执行下一步
		if (!userStore.token) return false;
		// 获取用户信息 && 获取菜单列表 && 按钮权限列表
		await userStore.getUserInfo();
		await authStore.getAuthMenuList();
		await authStore.getAuthButtonList();
		// 判断当前用户有没有菜单权限
		if (!authStore.authMenuListGet.length) {
			// 通知无权限消息
			toast('当前账号无任何菜单权限，请联系系统管理员！', 'warning', '无权限访问');
			// 清空Token
			userStore.setToken('');
			// 去登录页
			router.replace(LOGIN_URL);
			return Promise.reject('No permission');
		}
		// 添加动态路由
		authStore.flatMenuListGet.forEach((item) => {
			// 存在children并删除
			item.children && delete item.children;
			// 处理组件模块
			if (item.component && typeof item.component == 'string') {
				item.component = modules['/src/views' + item.component + '.vue'];
			}
			// 根据isFull添加路由
			if (item.meta.isFull) {
				router.addRoute(item as unknown as RouteRecordRaw);
			} else {
				router.addRoute('layout', item as unknown as RouteRecordRaw);
			}
		});
		// 当用户信息 || 按钮 || 菜单 返回new promise实例请求出错时执行
	} catch (error) {
		// 清空Token
		userStore.setToken('');
		// 重定向到登陆页
		router.replace(LOGIN_URL);
		return Promise.reject(error);
	}
};
