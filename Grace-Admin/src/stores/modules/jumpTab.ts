import { defineStore } from 'pinia';
import { useTabsStore } from './tabs';
import { BY_NAME } from '@/config';

// 页签控制
export const useJumpTabStore = defineStore(`${BY_NAME}-jumpTab`, () => {
	// 路由信息
	const route = useRoute();
	// 路由控制
	const router = useRouter();
	//   tabs仓库
	const tabStore = useTabsStore();

	// 返回
	/* 首先删除当前标签，如果传入name，则重定向到该name，否则查找route.query.name，有则跳转route.query.name，最后则跳转到上级页面 */
	const jumpTabName = (name?: string) => {
		if (route.meta.isAffix) return;
		tabStore.removeTabs(route.fullPath);
		// 手动控制跳转
		if (name) {
			router.replace({ name });
		} else {
			// 需保证路由配置此name
			if (route.query.name) {
				router.replace({ name: route.query.name as string });
			} else {
				router.replace({ path: (route.meta.activeMenu as string) ?? '/home' });
			}
		}
	};
	// 暴露API
	return {
		jumpTabName,
	};
});
