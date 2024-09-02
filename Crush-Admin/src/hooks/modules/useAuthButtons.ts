/**
 * @name 页面按钮权限
 */

import { useUserStore } from '@/stores';

// 按钮权限
export const useAuthButtons = () => {
	const route = useRoute();
	const { authButtonList } = useUserStore();
	const authButtons = authButtonList[route.name as string] || [];
	// 按钮权限
	const BUTTONS = computed(() => {
		// 当前页
		let currentPageAuthButton: { [key: string]: boolean } = {};
		// 遍历用户按钮权限 获取 当前页按钮权限
		authButtons.forEach((item) => (currentPageAuthButton[item] = true));
		return currentPageAuthButton;
	});
	return {
		BUTTONS,
	};
};
