import type { RouteRecordNormalized } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { ElMessage } from "element-plus";

const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
	let timeNow = new Date();
	let hours = timeNow.getHours();
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = '';
	if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
		defaultBrowserLang = 'zh';
	} else {
		defaultBrowserLang = 'en';
	}
	return defaultBrowserLang;
}

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUrlWithParams() {
	const url = {
		hash: location.hash.substring(1),
		history: location.pathname + location.search,
	};
	return url[mode];
}

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
 * @description 根据name数组,对路由数组进行递归过滤
 * @param {Array} routes 菜单列表
 * @param {Array} nameList name数组
 * @returns {Array} 递归过滤后的name所在的对象 组成的数组（返回新数组，不改变原有数组）
 */
export function filterRoutes(routes, nameList) {
	// 创建一个中间变量来存储过滤后的结果
	const filteredRoutes = [] as any;
	// 遍历 routes 数组
	routes.forEach((route) => {
		// 检查 name 是否在 nameList 中
		if (nameList.includes(route.name)) {
			// 如果存在子路由，递归过滤子路由
			if (route.children) {
				// 创建子路由数组的副本
				const childRoutes = route.children.slice();
				// 递归过滤子路由
				const filteredChildRoutes = filterRoutes(childRoutes, nameList);
				// 如果子路由长度为空，不添加到结果数组
				if (filteredChildRoutes.length > 0) {
					filteredRoutes.push({ ...route, children: filteredChildRoutes });
				}
			} else {
				// 如果没有子路由，直接添加到结果数组
				filteredRoutes.push(route);
			}
		}
	});
	return filteredRoutes;
}

/**
 * @description 根据name数组,对路由数组进行递归重组
 * @param {Array} routes 菜单列表
 * @param {Array} nameList name数组
 * @returns {Array} 递归重组后的name所在的对象 组成的新数组
 */
export function reduceRoutes(routes: Array<any>, nameList: any): Array<any> {
	return routes.reduce((menus, next) => {
		// 判断是否存在子菜单
		const menuChildren = next.children
			? next.children.filter((child: any) => nameList?.includes(child.name))
			: [];
		// 判断是否存在子菜单
		if (menuChildren.length) {
			menus.push({ ...next, children: menuChildren });
		}
		// 判断一级菜单是否显示
		const isMenu = nameList?.includes(next.name);
		// 判断一级菜单是否显示 并且不存在子菜单
		if (isMenu && !menuChildren.length) {
			menus.push({ ...next, children: null });
		}
		return menus;
	}, []);
}

/**
 * @description 递归提升meta.title 提成到与 meta 同级
 * @param {Array} menuList 菜单列表
 * @returns {Array} 菜单
 */
export function elevateTitles(menuList) {
	return menuList.map((item) => {
		// 创建一个新对象，包含原始对象的所有属性
		const newItem = { ...item };
		// 如果meta对象存在，提取title并添加到新对象中
		if (item.meta) {
			newItem.title = item.meta.title;
		}
		// 如果存在子菜单，递归处理子菜单
		if (item.children) {
			newItem.children = elevateTitles(item.children);
		}
		return newItem;
	});
}
/**
 * @description hex颜色转rgb颜色
 * @param {String} str 颜色值字符串
 * @returns {String} 返回处理后的颜色值
 */
export function hexToRgb(str: any) {
	let hexs: any = "";
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) return ElMessage.warning("输入错误的hex");
	str = str.replace("#", "");
	hexs = str.match(/../g);
	for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
	return hexs;
  }
  
  /**
   * @description rgb颜色转Hex颜色
   * @param {*} r 代表红色
   * @param {*} g 代表绿色
   * @param {*} b 代表蓝色
   * @returns {String} 返回处理后的颜色值
   */
  export function rgbToHex(r: any, g: any, b: any) {
	let reg = /^\d{1,3}$/;
	if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return ElMessage.warning("输入错误的rgb颜色值");
	let hexs = [r.toString(16), g.toString(16), b.toString(16)];
	for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
	return `#${hexs.join("")}`;
  }
  
  /**
   * @description 加深颜色值
   * @param {String} color 颜色值字符串
   * @param {Number} level 加深的程度，限0-1之间
   * @returns {String} 返回处理后的颜色值
   */
  export function getDarkColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
  }
  
  /**
   * @description 变浅颜色值
   * @param {String} color 颜色值字符串
   * @param {Number} level 加深的程度，限0-1之间
   * @returns {String} 返回处理后的颜色值
   */
  export function getLightColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning("输入错误的hex颜色值");
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
  }
  