import { defineStore } from 'pinia';
import { KeepAliveState } from '@/stores/interface';

export const useKeepAliveStore = defineStore({
	id: 'geeker-keepAlive',
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
