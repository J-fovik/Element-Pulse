import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';
export const useUserStore = defineStore({
	id: 'geeker-user',
	state: (): UserState => ({
		token: '',
		userInfo: {} as any,
	}),
	getters: {},
	actions: {
		// 设置token
		setToken(token: string) {
			this.token = token;
		},
		// 设置用户信息
		setUserInfo(userInfo: UserState['userInfo']) {
			this.userInfo = userInfo;
		},
		// 获取用户信息
		async getUserInfo() {
			// const { data } = await getUserInfoApi();
			this.userInfo = {
				...this.userInfo,
				name: 'Geeker',
				// ...data
			};
		},
	},
	persist: piniaPersistConfig('geeker-user'),
});
