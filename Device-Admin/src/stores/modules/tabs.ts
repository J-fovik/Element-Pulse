import { defineStore } from 'pinia';
import { getUrlWithParams } from '@/utils';
import { useKeepAliveStore } from './keepAlive';
import { TabsMenuProps } from '@/stores/interface';
import { Local } from '@/utils/storage';

export const useTabsStore = defineStore(`tabs`, () => {
	// 缓存仓库
	const keepAliveStore = useKeepAliveStore();
	// 路由信息
	const route = useRoute();
	// 路由控制
	const router = useRouter();
	// tabs标签页
	const tabsMenuList = ref(Local.get(`tabs`) ?? ([] as any));
	// 添加标签
	const addTabs = async (tabItem: TabsMenuProps) => {
		if (!tabsMenuList.value.length) {
			tabsMenuList.value.push(tabItem);
		} else if (tabsMenuList.value?.every((item) => item.path !== tabItem.path)) {
			tabsMenuList.value.push(tabItem);
		}
		// 添加缓存
		if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
			keepAliveStore.addKeepAliveName(tabItem.path);
		}
		await updateLocal();
	};
	// 删除标签
	const removeTabs = async (tabPath: string, isCurrent: boolean = true) => {
		if (isCurrent) {
			tabsMenuList.value.forEach((item, index) => {
				if (item.path !== tabPath) return;
				const nextTab = tabsMenuList.value[index + 1] || tabsMenuList.value[index - 1];
				if (!nextTab) return;
				router.push(nextTab.path);
			});
		}
		// 删除缓存
		const tabItem = tabsMenuList.value.find((item) => item.path === tabPath);
		tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
		// 设置标签
		tabsMenuList.value = tabsMenuList.value.filter((item) => item.path !== tabPath);
		await updateLocal();
	};
	// 清除左右标签
	const closeTabsOnSide = async (path: string, type: 'left' | 'right') => {
		const currentIndex = tabsMenuList.value.findIndex((item) => item.path === path);
		if (currentIndex !== -1) {
			const range =
				type === 'left' ? [0, currentIndex] : [currentIndex + 1, tabsMenuList.value.length];
			tabsMenuList.value = tabsMenuList.value.filter((item, index) => {
				return index < range[0] || index >= range[1] || !item.close;
			});
		}
		// 设置缓存
		const KeepAliveList = tabsMenuList.value.filter((item) => item.isKeepAlive);
		keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path));
		await updateLocal();
	};
	// 关闭其他标签
	const closeMultipleTab = async (tabsMenuValue?: string) => {
		tabsMenuList.value = tabsMenuList.value.filter((item) => {
			return item.path === tabsMenuValue || !item.close;
		});
		// 设置缓存
		const KeepAliveList = tabsMenuList.value.filter((item) => item.isKeepAlive);
		keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path));
		await updateLocal();
	};
	// 设置标签
	const setTabs = async (tabsList: any) => {
		tabsMenuList.value = tabsList;
		await updateLocal();
	};
	// 设置当前标签标题
	const setTabsTitle = async (title: string) => {
		tabsMenuList.value.forEach((item) => {
			if (item.path == getUrlWithParams()) item.title = title;
		});
		await updateLocal();
	};
	// 返回
	/* 首先删除当前标签，如果传入name，则重定向到该name，否则查找route.query.name，有则跳转route.query.name，最后则跳转到上级页面 */
	const jumpTabName = (name?: string) => {
		if (route.meta.isAffix) return;
		removeTabs(route.fullPath);
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
	// 更新缓存
	const updateLocal = () => {
		Local.set(`tabs`, tabsMenuList.value);
	};
	return {
		tabsMenuList,
		addTabs,
		removeTabs,
		closeTabsOnSide,
		closeMultipleTab,
		setTabs,
		setTabsTitle,
		jumpTabName,
		updateLocal,
	};
});
