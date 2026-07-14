import type { RouteRecordNormalized } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';
import { utils, writeFile } from 'xlsx-js-style';
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
	result: { [key: string]: any } = {},
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
	let hexs: any = '';
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(str)) return ElMessage.warning('输入错误的hex');
	str = str.replace('#', '');
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
	if (!reg.test(r) || !reg.test(g) || !reg.test(b))
		return ElMessage.warning('输入错误的rgb颜色值');
	let hexs = [r.toString(16), g.toString(16), b.toString(16)];
	for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
	return `#${hexs.join('')}`;
}

/**
 * @description 加深颜色值
 * @param {String} color 颜色值字符串
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
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
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

// /**
//  * 递归转换单个菜单项
//  * @param {Object} item 原始菜单项
//  * @returns {Object} 转换后的菜单项
//  */
// export function convertMenuItem(item: any) {
// 	// 处理图标名称（移除el-icon-前缀）
// 	// const iconName = item.menuIcon.startsWith('el-icon-')
// 	// 	? item.menuIcon.replace('el-icon-', '')
// 	// 	: item.menuIcon;
// 	// 将powerCode转换为首字母大写的驼峰命名
// 	// const name = item.powerCode.charAt(0).toUpperCase() + item.powerCode.slice(1);
// 	// 基础转换
// 	const newItem = {
// 		path: item.path,
// 		name: item.name,
// 		...item,
// 		meta: {
// 			icon: item.meta.icon ? item.meta.icon : 'Menu',
// 			title: item.meta.title,
// 			isLink: '',
// 			isHide: item.hidden,
// 			isFull: false,
// 			isAffix: false,
// 			requiresAuth: true,
// 			// isKeepAlive: ['CommonJournalSheet', 'CommonScheduling'].includes(name) ? false : true,
// 			isKeepAlive: true,
// 		},
// 	} as any;

// 	// 处理子菜单
// 	if (item.children && item.children.length > 0) {
// 		// 有子菜单时添加redirect和children
// 		newItem.redirect = `${item.path}/${item.children[0].path}`;
// 		newItem.children = item.children.map((child) => {
// 			const childItem = convertMenuItem(child);
// 			// 处理子菜单的path（拼接父path）
// 			childItem.path = `${item.path}/${child.path}`;
// 			// 添加component字段
// 			childItem.component = `${childItem.path}/index`;
// 			return childItem;
// 		});
// 	} else {
// 		// 没有子菜单的项需要添加component字段
// 		newItem.component = `${item.path}/index`;
// 	}
// 	return newItem;
// }
/**
 * 递归转换单个菜单项
 * @param {Object} item 原始菜单项
 * @param {string} parentPath 父级完整路径（用于多级菜单拼接）
 * @returns {Object} 转换后的菜单项
 */
export function convertMenuItem(item: any, parentPath: string = '') {
	// 1. 计算当前项的完整路径
	// 如果后端返回的已经是绝对路径（以 / 开头），则直接使用；否则拼接父路径
	// const fullPath = item.path.startsWith('/')
	// 	? item.path
	// 	: parentPath
	// 		? `${parentPath}/${item.path}`
	// 		: item.path;
	const fullPath =
		item.path && item.path.startsWith('/')
			? item.path.replace(/\/+$/, '') // 绝对路径：去除末尾的多余斜杠
			: joinPaths(parentPath, item.path || ''); // 相对路径：智能拼接
	if (item.path.includes('inspectionMonthReport')) {
		console.log('item.meta?.title', item.meta?.title);
	}
	// 2. 基础转换（注意：...item 要放在前面，避免被同名属性覆盖）
	const newItem = {
		...item,
		path: fullPath, // 使用计算出的完整路径
		name: item.name,
		meta: {
			icon: item.meta?.icon ? item.meta.icon : 'Menu',
			title: item.meta?.title,
			isLink: '',
			isHide: item.hidden,
			isFull: false,
			isAffix: false,
			requiresAuth: true,
			isKeepAlive: true,
		},
	} as any;
	// 3. 处理子菜单
	if (item.children && item.children.length > 0) {
		// 有子菜单时添加redirect，使用当前完整路径拼接第一层子路由的path
		newItem.redirect = `${fullPath}/${item.children[0].path}`;
		// 递归处理子菜单，将当前层的 fullPath 作为 parentPath 传下去
		newItem.children = item.children.map((child) => {
			return convertMenuItem(child, fullPath);
		});
	} else {
		// 没有子菜单的项需要添加component字段，直接使用 fullPath
		newItem.component = `${fullPath}/index`;
	}
	return newItem;
}
/**
 * 智能拼接路径，确保斜杠使用规范
 * @param paths 路径段数组
 * @returns 拼接后的规范路径
 */
function joinPaths(...paths: string[]): string {
	// 过滤掉空字符串、null、undefined
	const validPaths = paths.filter(Boolean);
	// 如果没有有效路径，返回空字符串
	if (validPaths.length === 0) return '';

	// 确保第一个路径以/开头，但不以/结尾（除非是根路径/）
	let result = validPaths[0].replace(/\/+$/, ''); // 去除末尾的/
	if (!result.startsWith('/')) {
		result = '/' + result;
	}

	// 处理后续路径段
	for (let i = 1; i < validPaths.length; i++) {
		let path = validPaths[i];
		// 去除当前路径段开头的/
		path = path.replace(/^\/+/, '');
		// 去除当前路径段末尾的/
		path = path.replace(/\/+$/, '');
		// 如果路径段非空，则拼接
		if (path) {
			result += '/' + path;
		}
	}

	// 如果最终结果是空，则返回根路径/
	return result || '/';
}

// 处理部门树层级数据
export const convertDeptTree = (item: any) => {
	// 基础转换：部门名称 -> label，部门ID -> value
	const newItem = {
		label: item.deptName,
		value: item.deptId,
	} as any;

	// 递归处理子菜单
	if (item.children && item.children.length > 0) {
		newItem.children = item.children.map((child) => {
			const childItem = convertDeptTree(child);
			childItem.label = child.deptName;
			childItem.value = child.deptId;
			return childItem;
		});
	}
	return newItem;
};
// 处理菜单树层级数据
export const convertMenuTree = (item: any) => {
	// 基础转换：菜单名称 -> label，菜单ID -> value
	const newItem = {
		label: item.menuName,
		value: item.menuId,
	} as any;

	// 递归处理子菜单
	if (item.children && item.children.length > 0) {
		newItem.children = item.children.map((child) => {
			const childItem = convertMenuTree(child);
			childItem.label = child.menuName;
			childItem.value = child.menuId;
			return childItem;
		});
	}
	return newItem;
};
// 处理树层级数据
export const convertTree = (item: any, label: string, value: string, children?: any) => {
	const newItem = {
		label: item[label],
		value: item[value],
	} as any;

	// 递归处理子菜单
	if (item[children] && item[children].length > 0) {
		newItem.children = item[children].map((child) => {
			const childItem = convertTree(child, label, value, children);
			childItem.label = child[label];
			childItem.value = child[value];
			return childItem;
		});
	}
	return newItem;
};

/**
 * JSON数据导出为Excel
 * @param {Object} params - 导出参数
 * @param {Array} params.header - 表头数组（如['配置编码','配置名称']）
 * @param {Array} params.data - 数据二维数组（如[['001','配置1'],['002','配置2']]）
 * @param {String} params.filename - 文件名（不含.xlsx）
 */
// export function export_json_to_excel({ header, data, filename = 'excel-list' }) {
// 	// 1. 构造工作表数据（表头+内容）
// 	const wsData = [header, ...data];

// 	// 2. 创建工作表
// 	const ws = utils.aoa_to_sheet(wsData);

// 	// 3. (可选优化) 自动设置列宽，防止内容被遮挡
// 	// 计算每一列的最大宽度
// 	const colWidths = wsData.map((row) =>
// 		row.map((val) => {
// 			// 先判断是否为null/undefined，然后计算字符长度
// 			// 中文字符宽度较宽，这里简单处理，实际可能需要更精确计算
// 			if (val == null) return 10;
// 			const valStr = String(val);
// 			// 一个中文字符算2个长度，英文算1个
// 			const length = valStr.replace(/[\u0391-\uFFE5]/g, 'aa').length;
// 			return Math.max(10, length + 2); // 最小宽度10，加一点padding
// 		}),
// 	);

// 	// 取每一列的最大宽度
// 	const result = colWidths[0].map((val, index) => {
// 		return Math.max(...colWidths.map((row) => row[index]));
// 	});

// 	// 设置列宽
// 	ws['!cols'] = result.map((w) => ({ wch: w }));

// 	// 4. 创建工作簿并添加工作表
// 	const wb = utils.book_new();
// 	utils.book_append_sheet(wb, ws, 'Sheet1');

// 	// 5. 导出文件
// 	writeFile(wb, `${filename}.xlsx`);
// }
/**
 * JSON数据导出为Excel (支持样式)
 * @param {Object} params - 导出参数
 * @param {Array} params.header - 表头数组（如['配置编码','配置名称']）
 * @param {Array} params.data - 数据二维数组（如[['001','配置1'],['002','配置2']]）
 * @param {String} params.filename - 文件名（不含.xlsx）
 */
export function export_json_to_excel({ header, data, filename = 'excel-list' }) {
	// 1. 构造工作表数据（表头+内容）
	const wsData = [header, ...data];

	// 2. 创建工作表
	const ws = utils.aoa_to_sheet(wsData);

	// 3. 设置表头样式：背景色 #f5f7fa + 字体加粗
	header.forEach((item, index) => {
		// 获取单元格地址，如 "A1", "B1" (第一行，第index列)
		const cellAddress = utils.encode_cell({ r: 0, c: index });

		// 确保单元格存在
		if (!ws[cellAddress]) ws[cellAddress] = { v: '' };

		// 设置样式
		ws[cellAddress].s = {
			font: {
				bold: true, // 字体加粗
				// 字体颜色默认黑色即可，无需额外设置
			},
			fill: {
				fgColor: { rgb: 'F5F7FA' }, // 背景色修改为 f5f7fa
			},
			alignment: {
				horizontal: 'center', // 水平居中
				vertical: 'center', // 垂直居中
			},
			border: {
				// (可选) 给表头加个边框会让表格更清晰
				bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
			},
		};
	});

	// 4. 自动设置列宽
	const colWidths = wsData.map((row) =>
		row.map((val) => {
			if (val == null) return 10;
			const valStr = String(val);
			// 一个中文字符算2个长度，英文算1个
			const length = valStr.replace(/[\u0391-\uFFE5]/g, 'aa').length;
			return Math.max(10, length + 2);
		}),
	);

	// 取每一列的最大宽度
	const result = colWidths[0].map((val, index) => {
		return Math.max(...colWidths.map((row) => row[index]));
	});

	ws['!cols'] = result.map((w) => ({ wch: w }));

	// 5. 创建工作簿并添加工作表
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, 'Sheet1');

	// 6. 导出文件
	writeFile(wb, `${filename}.xlsx`);
}
