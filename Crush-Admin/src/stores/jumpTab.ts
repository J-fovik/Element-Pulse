import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import mittBus from '/@/utils/mitt';

// 页签控制
export const useTabStore = defineStore('tabStore', () => {
	// 路由信息
	const route = useRoute();
	// 路由控制
	const router = useRouter();
	// 返回
	const jumpTabName = (name?: string) => {
		// 关闭当前页
		mittBus.emit('onCurrentContextmenuClick', Object.assign({}, { contextMenuClickId: 1, ...route }));
		// 手动控制跳转
		if (name) {
			router.replace({ name });
		} else {
			router.replace({ name: (route.meta.superiorName as string) ?? 'home' });
		}
	};
	// 暴露API
	return {
		jumpTabName,
	};
});
