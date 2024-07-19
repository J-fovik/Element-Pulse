import { useAuthStore } from '@/stores/modules/auth';

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
	const route = useRoute();
	const authStore = useAuthStore();
	const authButtons = authStore.authButtonListGet[route.name as string] || [];
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
