import { defineStore } from 'pinia';
import { KeepAliveState } from '@/stores/interface';
import { BY_NAME } from '@/config';
/**
 * @name 组件缓存仓库
 */
export const useKeepAliveStore = defineStore({
	id: `${BY_NAME}-keepAlive`,
	state: (): KeepAliveState => ({
		keepAliveName: [],
	}),
	actions: {
		// 添加缓存
		async addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name);
		},
		// 删除缓存
		async removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter((item) => item !== name);
		},
		// 设置缓存
		async setKeepAliveName(keepAliveName: string[] = []) {
			this.keepAliveName = keepAliveName;
		},
	},
});
