import { defineStore } from 'pinia';
import { AuthState } from '@/stores/interface';
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login';
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from '@/utils/menu';
import { appRoutes } from '@/routers/staticRouter';
import { BY_NAME } from '@/config';
export const useAuthStore = defineStore({
	id: `${BY_NAME}-auth`,
	state: (): AuthState => ({
		// 按钮权限列表
		authButtonList: {},
		// 菜单权限列表
		authMenuList: [],
		// 当前页面的 router name，用来做按钮权限筛选
		routeName: '',
	}),
	getters: {
		// 按钮权限列表
		authButtonListGet: (state) => state.authButtonList,
		// 菜单权限列表 ==> 这里的菜单没有经过任何处理
		authMenuListGet: (state) => state.authMenuList,
		// 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
		showMenuListGet: (state) => getShowMenuList(state.authMenuList),
		// 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
		flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
		// 递归处理后的所有面包屑导航列表
		breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList),
	},
	actions: {
		// 获取按钮权限
		async getAuthButtonList() {
			const { data } = await getAuthButtonListApi();
			this.authButtonList = data;
		},
		// 获取菜单权限
		async getAuthMenuList() {
			const { data } = await getAuthMenuListApi();
			this.authMenuList = data; //appRoutes.sort((a: any, b: any) => a.meta.order - b.meta.order);
		},
		// 设置当前路由名称
		async setRouteName(name: string) {
			this.routeName = name;
		},
	},
});
