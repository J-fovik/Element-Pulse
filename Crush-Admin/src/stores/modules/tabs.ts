import router from '@/routers';
import { defineStore } from 'pinia';
import { getUrlWithParams } from '@/utils/objectOperation';
import { useKeepAliveStore } from './keepAlive';
import { TabsState, TabsMenuProps } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';
import { BY_NAME } from '@/config';

const keepAliveStore = useKeepAliveStore();
/**
 * @name Tab仓库
 */
export const useTabsStore = defineStore({
	id: `${BY_NAME}-tabs`,
	state: (): TabsState => ({
		tabsMenuList: [],
	}),
	getters: {},
	actions: {
		// 添加标签
		async addTabs(tabItem: TabsMenuProps) {
			if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
				this.tabsMenuList.push(tabItem);
			}
			// 添加缓存
			if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
				keepAliveStore.addKeepAliveName(tabItem.path);
			}
		},
		// 删除标签
		async removeTabs(tabPath: string, isCurrent: boolean = true) {
			if (isCurrent) {
				this.tabsMenuList.forEach((item, index) => {
					if (item.path !== tabPath) return;
					const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
					if (!nextTab) return;
					router.push(nextTab.path);
				});
			}
			// 删除缓存
			const tabItem = this.tabsMenuList.find((item) => item.path === tabPath);
			tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.path);
			// 设置标签
			this.tabsMenuList = this.tabsMenuList.filter((item) => item.path !== tabPath);
		},
		// 清除左右标签
		async closeTabsOnSide(path: string, type: 'left' | 'right') {
			const currentIndex = this.tabsMenuList.findIndex((item) => item.path === path);
			if (currentIndex !== -1) {
				const range =
					type === 'left'
						? [0, currentIndex]
						: [currentIndex + 1, this.tabsMenuList.length];
				this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
					return index < range[0] || index >= range[1] || !item.close;
				});
			}
			// 设置缓存
			const KeepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive);
			keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path));
		},
		// 关闭其他标签
		async closeMultipleTab(tabsMenuValue?: string) {
			this.tabsMenuList = this.tabsMenuList.filter((item) => {
				return item.path === tabsMenuValue || !item.close;
			});
			// 设置缓存
			const KeepAliveList = this.tabsMenuList.filter((item) => item.isKeepAlive);
			keepAliveStore.setKeepAliveName(KeepAliveList.map((item) => item.path));
		},
		// 设置标签
		async setTabs(tabsMenuList: TabsMenuProps[]) {
			this.tabsMenuList = tabsMenuList;
		},
		// 设置当前标签标题
		async setTabsTitle(title: string) {
			this.tabsMenuList.forEach((item) => {
				if (item.path == getUrlWithParams()) item.title = title;
			});
		},
	},
	persist: piniaPersistConfig(`${BY_NAME}-tabs`),
});
