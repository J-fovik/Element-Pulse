import type { RouteRecordNormalized } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.filter((item) => {
		item.children?.length && (item.children = getShowMenuList(item.children));
		return !item.meta?.isHide;
	});
}

/**
 * @description 使用递归处理扁平化菜单 支持多级
 * @param {Array} routes 菜单列表
 * @returns {Array}
 * */
export const getFlatMenuList = (routes: any) => {
	const flattenRoutes = (routeList: any) => {
		return routeList.reduce((acc: RouteRecordNormalized[], route: any) => {
			const { children, ...routeWithoutChildren } = route;
			if (children && children.length > 0) {
				const childRoutes = flattenRoutes(children);
				return [...acc, routeWithoutChildren, ...childRoutes];
			} else {
				return [...acc, routeWithoutChildren];
			}
		}, []);
	};
	return flattenRoutes(routes);
};
/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object}
 */
export const getAllBreadcrumbList = (
	menuList: Menu.MenuOptions[],
	parent = [],
	result: { [key: string]: any } = {}
) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item];
		if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
	}
	return result;
};

/**
 * @description 定义一个递归函数来收集所有路由的name
 * @param {Array} Array 路由列表
 * @returns {Array}
 * */
export function collectAllRouteNames(Array: any): string[] {
	let names: string[] = [];
	Array.forEach((route) => {
		// 如果路由有name属性，则添加到names数组中
		if (route.name) {
			names.push(route.name);
		}
		// 如果路由有children属性，递归收集子路由的name
		if (route.children) {
			names = names.concat(collectAllRouteNames(route.children));
		}
	});

	return names;
}
/**
 * @description 使用递归过滤需要缓存的菜单 name (该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveNameArr 缓存的菜单 name ['**','**']
 * @returns {Array}
 * */
export function getKeepAliveRouterName(
	menuList: Menu.MenuOptions[],
	keepAliveNameArr: string[] = []
) {
	menuList.forEach((item) => {
		item.meta.isKeepAlive && item.name && keepAliveNameArr.push(item.name);
		item.children?.length && getKeepAliveRouterName(item.children, keepAliveNameArr);
	});
	return keepAliveNameArr;
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组 (第一版本地路由鉴权会用到，该函数暂未使用)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @returns {Array}
 */
export function getMenuListPath(
	menuList: Menu.MenuOptions[],
	menuPathArr: string[] = []
): string[] {
	for (const item of menuList) {
		if (typeof item === 'object' && item.path) menuPathArr.push(item.path);
		if (item.children?.length) getMenuListPath(item.children, menuPathArr);
	}
	return menuPathArr;
}
/**
 * @description 递归查询当前 path 所对应的菜单对象 (该函数暂未使用)
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}
 */
export function findMenuByPath(
	menuList: Menu.MenuOptions[],
	path: string
): Menu.MenuOptions | null {
	for (const item of menuList) {
		if (item.path === path) return item;
		if (item.children) {
			const res = findMenuByPath(item.children, path);
			if (res) return res;
		}
	}
	return null;
}
/**
 * @description 根据name数组，对路由数组进行递归过滤
 * @param {Array} routes 菜单列表
 * @param {Array} nameList name数组
 * @returns {Array}
 */
export function filterRoutes(routes, nameList) {
	return routes
		.map((route) => {
			// 存在子路由
			if (route.children) {
				route.children = filterRoutes(route.children, nameList);
				// 子路由长度为空，删除key
				if (route.children.length === 0) {
					delete route.children;
				}
			}
			// 返回包含name的对象，否则为null
			return nameList.includes(route.name) ? route : null;
		})
		.filter((route) => route !== null);
}
