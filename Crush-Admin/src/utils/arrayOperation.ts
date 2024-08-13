/**
 * @name 数组相关方法
 */

import { ElMessage } from 'element-plus';
import type { RouteRecordNormalized } from 'vue-router';

/**
 * @description allArr 数组 是否包含 arr 数组里面的所有内容
 * @param {Array} allArr
 * @param {Array} arr 需要判断的数组
 * @returns {Boolean} 如果 全包含 返回 true；否则返回 false
 */
export function everyIncludes(allArr: Array<any>, arr: Array<any>) {
	return arr.every((item) => allArr.includes(item));
}

/**
 * @description 数组删除某个值
 * @param {Array} arr 数组内容
 * @param {Number | String} val 要删除的值
 * @returns {Array} 删除后的数组
 */
export const arrRemoveVal = (arr: any, val: any) => {
	let index = arr.indexOf(val);
	if (index > -1) arr.splice(index, 1);
	return arr;
};

/**
 * @description 值是否存在于数组 (可用于选值存数组 并 展示激活状态)
 * @param {Array} list 要判断的数组
 * @param {Number | String} key 要判断的值
 * @returns {boolean} - 如果数组中存在指定元素，返回 true；否则返回 false
 */
export const isExistArray = (list: any[], key: any): boolean => {
	return list.indexOf(key) > -1;
};

/**
 * @description 找到匹配的元素
 * @param {Array} options 要判断的数组
 * @param {String} value 要判断的值
 * @returns {Object | Null} 找出第一个符合条件的成员
 */
export const findOption = (options: Array<any>, value: string) => {
	return options.find((item) => item.value === value);
};

/**
 * @description 判断两数组是否相同,可做按钮鉴权(自动去重)
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @returns {Boolean} 两数组相同返回 `true`，反之则 `false`
 */
export function arraysAreEqual(arr1: any[], arr2: any[]): boolean {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);
	return set1.size === set2.size && [...set1].every((item) => set2.has(item));
}

/**
 * @description 数组、数组对象去重
 * @description 它接受两个参数：arr 是要去重的数组，attr 是一个可选参数，用于数组对象的去重，即去重时使用的键值。
 * @param {Array} arr 数组内容
 * @param {String} attr 需要去重的键值（数组对象时才传）
 * @returns {Array} 去重后数组或数组对象
 */
export function removeDuplicate(arr: EmptyArrayType, attr?: any) {
	if (!Object.keys(arr).length) {
		return arr;
	} else {
		if (attr) {
			const obj: EmptyObjectType = {};
			return arr.reduce((cur: EmptyArrayType[], item: EmptyArrayType) => {
				obj[item[attr]] ? '' : (obj[item[attr]] = true && item[attr] && cur.push(item));
				return cur;
			}, []);
		} else {
			return [...new Set(arr)];
		}
	}
}

/**
 * @description 过滤掉 数组对象 中不存在该 key 的对象
 * @param {Array} list 数组内容
 * @param {String} key  过滤掉该不存在该key的对象 (可不传，则是判断所有key)
 * @returns {Array} 过滤后的数组对象
 */
export function filterObjectsByKey(list: Array<any>, key?: any) {
	// 如果传key
	if (key) {
		// 使用 filter 方法创建一个新数组，包含所有存在的 key 属性
		return list.filter((item) => {
			// 检查当前对象中是否包含 key 属性
			return (
				item.hasOwnProperty(key) &&
				item[key] !== '' &&
				item[key] !== null &&
				item[key] !== undefined
			);
		});
	} else {
		return list.filter((item) => {
			// 检查是否为对象
			if (typeof item === 'object' && item !== null) {
				// 检查是否为空对象
				if (Object.keys(item).length === 0) {
					return false; // 如果是空对象，则删除
				}
				// 检查所有属性是否存在
				return Object.values(item).every(
					(value) => value !== '' && value !== null && value !== undefined
				);
			}
			// 如果是对象且属性不为空，则保留
			return true;
		});
	}
}

/**
 * @description 统计函数
 * @param {Array} array - 要进行统计的数组 数组对象
 * @param {Function} generateKey - 回调传入key
 * @returns {Array} 处理后的数组对象
 */
export function countBy<T>(array: Array<T>, generateKey: (item: T) => any): { [key: string]: any } {
	const result: { [key: string]: number } = {};
	// 遍历数组
	for (const u of array) {
		// 回调获取key
		const key = generateKey(u);
		if (result[key]) {
			result[key]++;
		} else {
			result[key] = 1;
		}
	}
	return result;
}

/**
 * @description 调换顺序
 * @param {Array} arr 数组内容
 * @param {Number} index1  当前的索引
 * @param {Number} index2  最终的索引
 * @returns {Array} 排好顺序的数组
 */
export function swapArray(arr: Array<any>, index1: number, index2: number) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	return arr;
}

/**
 * @description 上移
 * @param {Array} arr 数组内容
 * @param {Number} index  当前的索引
 * @returns {Array} 排好顺序的数组
 */
export function useArrayMoveUp(arr: Array<any>, index: number) {
	if (index == 0) {
		ElMessage.error('已经到最顶部了!!!');
		return arr;
	}
	swapArray(arr, index, index - 1);
}

/**
 * @description 下移
 * @param {Array} arr 数组内容
 * @param {Number} index  当前的索引
 * @returns {Array} 排好顺序的数组
 */
export function useArrayMoveDown(arr: Array<any>, index: number) {
	if (index >= arr.length - 1) {
		ElMessage.error('已经到最底部了!!!');
		return arr;
	}
	swapArray(arr, index, index + 1);
}

/**
 * @description 置顶或置底
 * @param {Array} arr 数组内容
 * @param {Number} index  当前的索引
 * @param {String} type  top 为置顶，bottom 为置底
 * @returns {Array} 排好顺序的数组
 */
export function useArrayMove(arr: Array<any>, index: number, type?: 'top' | 'bottom') {
	// 下标大于等于数组长度 并且是置底
	if (index >= arr.length - 1 && type == 'bottom') {
		ElMessage.error('已经到最底部了!!!');
		return arr;
		// 下标为0 并且不为 置底
	} else if (index == 0 && type != 'bottom') {
		ElMessage.error('已经到最顶部了!!!');
		return arr;
	}
	const [item] = arr.splice(index, 1); // 从数组中移除元素并获取它
	// 默认top
	if (type === 'bottom') {
		arr.push(item); // 将元素添加到数组的末尾
	} else {
		arr.unshift(item); // 将元素添加到数组的开头
	}
	return arr; // 返回更新后的数组
}

/**
 * @description 数组的并集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array} 去重后的合集数组
 */
export function arrayUnion(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set([...arr1, ...arr2]));
}

/**
 * @description 数组的交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array} 去重后的交叉数组
 */
export function arrayCross(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set(arr1.filter((o) => arr2.includes(o))));
}

/**
 * @description 数组的差集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array} 去重后的交叉之外数组
 */
export function arrayDiff(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(
		new Set(arr1.concat(arr2).filter((o) => !arr1.includes(o) || !arr2.includes(o)))
	);
}

/**
 * @description 获取数组最大值
 * @param {Array} arr
 * @returns {Number} 最大值
 */
export const arrMaxValue = (arr: number[]) => {
	return Math.max.apply(null, arr);
};

/**
 * @description 获取数组最小值
 * @param {Array} arr
 * @returns {Number} 最小值
 */
export const arrMinValue = (arr: number[]) => {
	return Math.min.apply(null, arr);
};

/**
 * @description 数组求和
 * @param {Array} arr
 * @returns {Number} 合计
 */
export const arrSummation = (arr: number[]) => {
	return arr.reduce((pre, cur) => pre + cur);
};

/**
 * @description 获取数组平均值
 * @param {Array} arr
 * @returns {Number} 平均值
 */
export const averageValue = (arr: number[]) => {
	return arrSummation(arr) / arr.length;
};

/**
 * @description 简单数组扁平化
 * @param {Array} arr
 * @returns {Array} 扁平化后的一维数组
 */
export const flattenArray = (arr: any) => {
	return arr.reduce((flat: any, toFlatten: any) => {
		return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
	}, []);
};

/**
 * @description 根据给定的函数将数组对象分成两个数组：一个满足条件，一个不满足
 * @param {Array} array 要处理的数组对象
 * @param {Function} fn  一个函数，用于测试数组对象中的每个属性
 * @returns {Array} 第一个数组是满足函数返回条件的数组，第二个数组是不满足条件的数组
 */
export const partitionObject = <T>(array: T[], fn: (item: T) => boolean): [T[], T[]] => {
	return array.reduce(
		(acc: [T[], T[]], item: T) => {
			if (fn(item)) {
				acc[0].push(item);
			} else {
				acc[1].push(item);
			}
			return acc;
		},
		[[], []] as [T[], T[]]
	);
};

/**
 * @description 根据key重组数组
 * @description 由[{yxmc: 'A', zySeq: 1 },{yxmc: 'B', zySeq: 2 },{ yxmc: 'A', zySeq: 3 }]
 * @description 变成[{yxmc: 'A', children:[1, 3]},{yxmc: 'B', children: [2] }]
 * @param {Array} array 要处理的数组
 * @param {String} groupByKey  用于分组的键 （yxmc）
 * @param {String} childName  要存储的数组key的名称 （children）
 * @param {String} mergeChildKey  要存储在子数组的键 （zySeq）
 * @returns {Array} 重组后的数组
 */
export const groupByAndMergeChildArrays = (
	array: Array<any>,
	groupByKey: any,
	childName: any,
	mergeChildKey: any
) => {
	return array.reduce((acc, cur) => {
		// 检查 acc 数组中是否已经存在相同 groupByKey 的项
		const existingItem: any = acc.find((item: any) => item[groupByKey] === cur[groupByKey]);
		if (existingItem) {
			// 如果存在，将 cur[mergeChildKey] 添加到 existingItem.child 数组中
			existingItem[childName].push(cur[mergeChildKey]);
		} else {
			// 如果不存在，创建一个新的项并加入 acc 数组
			acc.push({
				...cur,
				[childName]: [cur[mergeChildKey]],
			});
		}
		return acc;
	}, []);
};

/**
 * @description 根据两个数组中 相同的属性值 组装成一个完整数组
 * @param {Array} array1 要处理的数组1
 * @param {Array} array2  要处理的数组2
 * @param {String} propertyName  两个数组都存在的key，并且要处理的key
 * @returns {Array} 重组后的数组
 */
export const getIntersectionByProperty = <T extends ArrayItem, K extends keyof T>(
	array1: T[],
	array2: T[],
	propertyName: K
): T[] => {
	// 创建一个新的 Set，包含 array1 中所有元素的指定属性值
	const propertyValues = new Set(array1.map((item) => item[propertyName]));
	// 使用 filter 方法筛选出 array2 中属性值存在于 Set 中的元素
	// 并合并两个数组的属性到返回的对象中
	return array2
		.filter((item) => propertyValues.has(item[propertyName]))
		.map((item2) => {
			// 查找 array1 中与当前 item2 相匹配的对象
			const matchingItem1 = array1.find(
				(item1) => item1[propertyName] === item2[propertyName]
			);
			// 合并两个对象的属性
			return { ...matchingItem1, ...item2 };
		});
};

/**
 * @description 根据两个数组中 相同的属性值 组装成一个完整数组
 * @param {Array} array1 要处理的数组1
 * @param {Array} array2  要处理的数组2
 * @param {String} key  两个数组都存在的key，并且要处理的key
 * @returns {Array} 重组后的数组
 */
export function mergeArraysByKey<T1 extends Record<string, any>, T2 extends Record<string, any>>(
	array1: T1[],
	array2: T2[],
	key: (keyof T1 & keyof T2) | any
): T1[] {
	// 创建一个新的数组，用于存储结果
	const mergedArray: T1[] = [];
	// 遍历 array1 数组，并查找 array2 中具有相同 key 的元素
	array1.forEach((item1) => {
		const matchingItem2 = array2.find((item2) => item2[key] === item1[key]);
		if (matchingItem2) {
			// 如果找到匹配项，合并两个对象的属性并添加到 mergedArray 中
			mergedArray.push({ ...item1, ...matchingItem2 });
		}
	});
	return mergedArray;
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array} 递归过滤后的数组
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.filter((item) => {
		item.children?.length && (item.children = getShowMenuList(item.children));
		return !item.meta?.isHide;
	});
}

/**
 * @description 使用递归处理扁平化菜单, 方便添加动态路由(支持多级)
 * @param {Array} menuList 菜单列表
 * @returns {Array} 扁平化后的数组
 */
export function getFlattenMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.flatMap((item) => [
		item,
		...(item.children ? getFlattenMenuList(item.children) : []),
	]);
}

/**
 * @description 使用递归处理扁平化菜单, 方便添加动态路由(支持多级)
 * @param {Array} routes 菜单列表
 * @returns {Array} 扁平化后的数组
 */
export const getFlatMenuList = (routes: any) => {
	const flattenRoutes = (routeList: any) => {
		return routeList.reduce((acc: RouteRecordNormalized[], route: any) => {
			const { children, ...routeWithoutChildren } = route;
			// 存在children，递归处理
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
 * @description 使用递归找出所有面包屑
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object} 路径 作为 key 的所有对象
 */
export const getAllBreadcrumbList = (
	menuList: Menu.MenuOptions[],
	parent = [],
	result: { [key: string]: any } = {}
) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item];
		// 存在children，递归处理
		if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
	}
	return result;
};

/**
 * @description 递归来收集数组中所有元素的某个键的值
 * @param {Array} Array 数组列表
 * @param {string} key 要收集的键（默认name）
 * @returns {Array} 存储所有key值的一维数组 ['**','**']
 */
export function collectAllArrKeys(Array: any, key: string = 'name'): string[] {
	let values: string[] = [];
	Array.forEach((item) => {
		// 如果路由有指定的key属性，则添加到values数组中
		if (item.hasOwnProperty(key)) {
			values.push(item[key]);
		}
		// 如果路由有children属性，递归收集子路由的key值
		if (item.children) {
			values = values.concat(collectAllArrKeys(item.children, key));
		}
	});
	return values;
}

/**
 * @description 根据name数组,对路由数组进行递归过滤
 * @param {Array} routes 菜单列表
 * @param {Array} nameList name数组
 * @returns {Array} 递归过滤后的name所在的对象 组成的数组
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

/**
 * @description 使用递归过滤需要缓存的菜单 name
 * @param {Array} menuList 所有菜单列表
 * @param {Array} keepAliveNameArr 缓存的菜单 name ['**','**'](额外)
 * @returns {Array} 存储所有需要缓存的name所组成的一维数组
 */
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
 * @description 递归查询当前 path 所对应的菜单对象
 * @param {Array} menuList 菜单列表
 * @param {String} path 当前访问地址
 * @returns {Object | null}对应的菜单对象
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
