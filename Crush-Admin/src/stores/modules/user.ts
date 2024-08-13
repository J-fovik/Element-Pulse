import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import { curryingRequest } from '@/hooks';
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login';
import {
	getFlatMenuList,
	getShowMenuList,
	getAllBreadcrumbList,
	filterRoutes,
} from '@/utils/arrayOperation';
import { newModules } from '@/routers/base';
import { BY_NAME } from '@/config';
import authMenuNameList from '@/assets/json/authMenuNameList.json';

/**
 * @name 用户信息仓库
 */
export const useUserStore = defineStore(`${BY_NAME}-user`, () => {
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

	// 获取菜单权限
	const authMenuListGet = async () => {
		const frontRouteList = newModules.sort((a: any, b: any) => a.meta.order - b.meta.order); // 一：根据前端定义路由
		const { data: backRouteList } = await getAuthMenuListApi(); // 二：根据接口返回路由
		const frontFilterFrontRouteList = filterRoutes(
			newModules.sort((a: any, b: any) => a.meta.order - b.meta.order),
			authMenuNameList.data.menuNameList
		); // 三：根据后端name数组过滤前端定义的路由
		authMenuList.value = backRouteList;
	};
	// 获取按钮权限
	const authButtonListGet = async () => {
		const { data } = await getAuthButtonListApi();
		authButtonList.value = data;
	};

	// 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
	const showMenuListGet = () => getShowMenuList(authMenuList.value);
	// 菜单权限列表 ==> 扁平化之后的一维数组菜单，支持多级
	const flatMenuListGet = () => getFlatMenuList(authMenuList.value);
	// 递归处理后的所有面包屑导航列表
	const breadcrumbListGet = () => getAllBreadcrumbList(authMenuList.value);

	// 获取用户信息
	const initUserInfo = async () => {
		// // 获取用户信息
		// const { res, err } = await curryingRequest(() => getUserInfo());
		// // 处理错误
		// if (err) return false;
		// 获取权限列表
		await Promise.all([authMenuListGet(), authButtonListGet()]);
		// 设置token
		// if (res?.data.token) {
		// 	Session.set('userToken', res?.data.token);
		// }
		// 设置用户信息
		setUserInfo({
			...userInfo,
			name: BY_NAME,
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
		authButtonListGet,
		showMenuListGet,
		flatMenuListGet,
		breadcrumbListGet,
		initUserInfo,
		setRouteName,
	};
});
