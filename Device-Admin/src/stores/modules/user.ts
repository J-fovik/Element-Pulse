import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import { curryingRequestUrl, URL } from '@/hooks';
import {
	getFlatMenuList,
	getShowMenuList,
	getAllBreadcrumbList,
	filterRoutes,
	reduceRoutes,
	elevateTitles,
	convertMenuItem,
} from '@/utils';

export const useUserStore = defineStore(`user`, () => {
	// 用户信息
	const userInfo = ref({} as any);
	// 当前页面的 router name，用来做按钮权限筛选
	const routeName = ref('');
	// 菜单权限
	const authMenuList = ref([] as any);
	// 按钮权限
	const authButtonList = ref([] as any);

	// 设置用户信息
	const setUserInfo = (value) => {
		userInfo.value = value;
	};
	// 转换菜单格式
	function transformMenuData(originalData) {
		// 添加固定的首页菜单项
		const homeMenu = {
			path: '/home',
			name: 'Home',
			component: '/home/index',
			meta: {
				icon: 'HomeFilled',
				title: '首页',
				isLink: '',
				isHide: false,
				isFull: false,
				isAffix: true,
				requiresAuth: true,
				isKeepAlive: true,
			},
		};
		// 转换原始菜单数据
		const transformedMenus = originalData.map((item) => convertMenuItem(item));
		// 合并首页菜单和转换后的菜单
		return {
			data: [homeMenu, ...transformedMenus],
		};
	}
	// 获取菜单权限
	const authMenuListGet = async () => {
		const { res, err } = await curryingRequestUrl({
			url: URL.PUBLIC.GET_ROUTES_LIST,
			method: 'get',
		});
		if (err) return;
		const transformedData = transformMenuData(res?.data);
		const backRouteList = elevateTitles(transformedData.data);
		authMenuList.value = backRouteList;
	};
	// 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
	const showMenuListGet = () => getShowMenuList(authMenuList.value);
	// 菜单权限列表 ==> 扁平化之后的一维数组菜单，支持多级
	const flatMenuListGet = () => getFlatMenuList(authMenuList.value);
	// 递归处理后的所有面包屑导航列表
	const breadcrumbListGet = () => getAllBreadcrumbList(authMenuList.value);

	// 获取用户信息
	const initUserInfo = async () => {
		// 获取用户信息
		const { res, err } = await curryingRequestUrl({
			url: URL.USER.GET_USER_INFO,
			method: 'get',
		});
		// 处理错误
		if (err) return false;
		// 获取权限列表
		await Promise.all([authMenuListGet()]);
		// 设置token
		// if (res?.content.token) {
		// 	Session.set('userToken', res?.content.token);
		// }
		// 设置用户信息
		setUserInfo({
			...userInfo.value,
			...res?.data.user,
			authButtonList: res?.data.permissions,
			roles: res?.data.roles,
		});
		// 获取成功
		return true;
	};
	// 设置当前路由名称
	const setRouteName = (name: string) => {
		routeName.value = name;
	};
	// 暴露API
	return {
		routeName,
		userInfo,
		authMenuList,
		authButtonList,
		setUserInfo,
		authMenuListGet,
		showMenuListGet,
		flatMenuListGet,
		breadcrumbListGet,
		initUserInfo,
		setRouteName,
	};
});
