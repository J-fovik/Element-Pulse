/**
 * @name 数组相关方法
 */

import { ElMessage } from 'element-plus';
import type { RouteRecordNormalized } from 'vue-router';

/**
 * 数组的并集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array} 去重后的合集数组
 */
export function arrayUnion(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set([...arr1, ...arr2]));
}

/**
 * 数组的交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array} 去重后的交叉数组
 */
export function arrayCross(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set(arr1.filter((o) => arr2.includes(o))));
}

/**
 * 数组的差集
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
 * 获取数组最大值
 * @param {Array} arr
 * @returns {number} 最大值
 */
export const arrMaxValue = (arr: number[]) => {
	return Math.max.apply(null, arr);
};

/**
 * 获取数组最小值
 * @param {Array} arr
 * @returns {number} 最小值
 */
export const arrMinValue = (arr: number[]) => {
	return Math.min.apply(null, arr);
};

/**
 * 数组求和
 * @param {Array} arr
 * @returns {number} 合计
 */
export const arrSummation = (arr: number[]) => {
	return arr.reduce((pre, cur) => pre + cur);
};

/**
 * 获取数组平均值
 * @param {Array} arr
 * @returns {number} 平均值
 */
export const averageValue = (arr: number[]) => {
	return arrSummation(arr) / arr.length;
};

/**
 * 计算丢失的最小数字
 * @param {Array} arr 要查找的数组
 * @returns {number} 丢失的最小数
 */
export const smallestMissingNumber = (arr: Array<any>) => {
	let sortedNumbers = [...arr].map(Number).sort((a, b) => a - b); // 将字符串转换为数字并排序
	let smallestMissing = 1; // // 初始化最小缺失数字为1
	for (let i = 0; i < sortedNumbers.length; i++) {
		// 如果当前数字不等于最小缺失数字，则找到了缺失的最小数字
		if (sortedNumbers[i] !== smallestMissing) {
			return smallestMissing;
		}
		// 否则，更新最小缺失数字
		smallestMissing++;
	}
	return smallestMissing;
};

/**
 * 调换顺序
 * @param {Array} arr 数组内容
 * @param {number} [index1]  当前的索引
 * @param {number} [index2]  最终的索引
 * @returns {Array} 排好顺序的数组
 */
export function swapArray(arr: Array<any>, index1: number, index2: number) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	return arr;
}

/**
 * 上移
 * @param {Array} arr 数组内容
 * @param {number} [index]  当前的索引
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
 * 下移
 * @param {Array} arr 数组内容
 * @param {number} [index]  当前的索引
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
 * 置顶或置底
 * @param {Array} arr 数组内容
 * @param {number} [index]  当前的索引
 * @param {'top' | 'bottom'} type  top 为置顶，bottom 为置底
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
 * 简单数组扁平化
 * @param {Array} arr
 * @returns {Array} 扁平化后的一维数组
 */
export const flattenArray = (arr: any) => {
	return arr.reduce((flat: any, toFlatten: any) => {
		return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
	}, []);
};

/**
 * 找到匹配的元素
 * @param {Array} options 要判断的数组
 * @param {string} value 要匹配的值
 * @param {string} [key] 要在对象上检查的属性名
 * @returns {object | null} 找出第一个符合条件的成员
 */
export const findOption = (options: Array<any>, value: string, key: string = 'value') => {
	return options.find((item) => item[key] === value);
};

/**
 * 从数组中删除具有特定值或属性的对象 (支持对象数组)
 * @param {Array} arr 数组内容
 * @param {number | string } value 要删除的值
 * @param {string} [key] 用于比较的对象属性名 (仅在处理对象数组时需要)
 * @returns {Array} 删除后的数组
 */
export const arrRemoveVal = (arr: any[], value: number | string, key?: string): any[] => {
	let index = -1;
	if (key) {
		// 处理对象数组
		index = arr.findIndex((item) => item[key] === value);
	} else {
		// 处理基本类型数组
		index = arr.indexOf(value);
	}
	if (index > -1) {
		arr.splice(index, 1);
	}
	return arr;
};

/**
 * 判断一个数组是否是另一个数组的子集(allArr是否全包含arr) (支持对象数组)
 * @param {Array} allArr 全部元素的数组
 * @param {Array} arr 需要判断是否为子集的数组
 * @param {Function} [isEqual] (可选)自定义比较函数(要保证自定义函数的正确性)
 * @returns {boolean} 如果 arr 是 allArr 的子集，返回 true；否则返回 false
 */
export const isArraySubset = (
	allArr: Array<any>,
	arr: Array<any>,
	isEqual?: (a: any, b: any) => boolean
) => {
	// 定义默认比较函数，如果两个元素严格相等，则返回 true
	const defaultIsEqual = (a: any, b: any) => a === b;
	// 如果提供了自定义比较函数，则使用它；否则使用默认比较函数
	const compare = isEqual || defaultIsEqual;
	// 遍历 arr，确保每个元素在 allArr 中至少有一个匹配项
	// 如果所有元素都能找到匹配，则 arr 是 allArr 的子集，否则，返回 false
	return arr.every((item) => allArr.some((allItem) => compare(item, allItem)));
};

/**
 * 值是否存在于数组中 (支持对象数组)
 * @param {Array} arr 要判断的数组
 * @param {number | string} value 要判断的值
 * @param {string} [key] 用于比较的对象属性名 (仅在处理对象数组时需要)
 * @returns {boolean} - 如果数组中存在指定元素或属性值，返回 true；否则返回 false
 */
export const isExistArray = (arr: any[], value: number | string, key?: string): boolean => {
	if (key) {
		// 处理对象数组
		return arr.some((item) => item[key] === value);
	} else {
		// 处理基本类型数组
		return arr.includes(value);
	}
};

/**
 * 判断两数组是否相同,可做按钮鉴权(自动去重)
 * @param {Array} arr1 第一个数组
 * @param {Array} arr2 第二个数组
 * @returns {boolean} 两数组相同返回 `true`，反之则 `false`
 */
export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean => {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);
	return set1.size === set2.size && [...set1].every((item) => set2.has(item));
};

/**
 * 数组去重(保留首次出现数据)(支持对象数组)
 * @description 它接受两个参数：arr 是要去重的数组，key 是一个可选参数，用于对象数组的去重，即去重时使用的键值。
 * @param {Array} arr 数组内容
 * @param {string} [key] 需要去重的键值 (仅在处理对象数组时需要)
 * @returns {Array} 去重后数组
 */
export function removeDuplicate(arr: EmptyArrayType, key?: any) {
	if (!Object.keys(arr).length) {
		return arr;
	} else {
		if (key) {
			const obj: EmptyObjectType = {};
			return arr.reduce((cur: EmptyArrayType[], item: EmptyArrayType) => {
				obj[item[key]] ? '' : (obj[item[key]] = true && item[key] && cur.push(item));
				return cur;
			}, []);
		} else {
			return [...new Set(arr)];
		}
	}
}

/**
 * 过滤掉 对象数组 中不存在该 key 的对象
 * @param {Array} arr 数组内容
 * @param {string} [key]  过滤掉该不存在该key的对象 (可不传，则是判断所有key)
 * @returns {Array} 过滤后的对象数组
 */
export function filterArrayByProperty(arr: Array<any>, key?: any) {
	// 如果传key
	if (key) {
		// 使用 filter 方法创建一个新数组，包含所有存在的 key 属性
		return arr.filter((item) => {
			// 检查当前对象中是否包含 key 属性
			return (
				item.hasOwnProperty(key) &&
				item[key] !== '' &&
				item[key] !== null &&
				item[key] !== undefined
			);
		});
	} else {
		return arr.filter((item) => {
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
 * 根据给定的函数将数组分成两个数组：一个满足条件，一个不满足(支持对象数组)
 * @param {Array} arr 要处理的数组对象
 * @param {Function} callback 回调函数，返回一个布尔值
 * @returns {[Array,Array]} 第一个数组是满足函数返回条件的数组，第二个数组是不满足条件的数组
 */
export const partitionArray = <T>(arr: T[], callback: (item: T) => boolean): [T[], T[]] => {
	return arr.reduce(
		(acc: [T[], T[]], item: T) => {
			if (callback(item)) {
				// 满足函数返回条件的数组
				acc[0].push(item);
			} else {
				// 不满足条件的数组
				acc[1].push(item);
			}
			return acc;
		},
		[[], []] as [T[], T[]]
	);
};

/**
 * 根据指定键重组数组 并 收集子键的值或对象
 * @param {Array} arr 要处理的数组
 * @param {string} [groupByKey] 用于分组的键名，数组中的对象将根据这个键的值进行分组 (yxmc)
 * @param {string} [childName] 子数组在结果对象中的键名，用于存储分组后的子项 (children)
 * @param {string} [mergeChildKey] 可选参数，如果提供则只收集数组中每个对象的这个键的值；如果未提供则收集整个对象
 * @returns {Array} 重组后的数组
 */
export const groupByAndCollectChildKeys = (
	arr: Array<any>,
	groupByKey: any,
	childName: any,
	mergeChildKey?: any
) => {
	return arr.reduce((acc, cur) => {
		// 检查 acc 数组中是否已经存在相同 groupByKey 的项
		const existingItem: any = acc.find((item: any) => item[groupByKey] === cur[groupByKey]);
		if (existingItem) {
			// mergeChildKey决定是添加子键的值还是整个对象
			if (mergeChildKey) {
				// 存在mergeChildKey，只添加这个键的值
				existingItem[childName].push(cur[mergeChildKey]);
			} else {
				// 不存在mergeChildKey，添加整个对象
				existingItem[childName].push(cur);
			}
		} else {
			// mergeChildKey决定是添加子键的值还是整个对象
			if (mergeChildKey) {
				// 存在mergeChildKey，赋值这个键的值
				acc.push({
					...cur,
					[childName]: [cur[mergeChildKey]],
				});
			} else {
				// 不存在mergeChildKey，赋值整个对象
				acc.push({
					...cur,
					[childName]: [cur],
				});
			}
		}
		return acc;
	}, []);
};

/**
 * 根据两个数组中 相同的属性值 返回公共key存在的数组
 * @param {Array} arr1 要处理的数组1
 * @param {Array} arr2  要处理的数组2
 * @param {string} [propertyName]  两个数组都存在的key，并且要处理的key
 * @returns {Array} 重组后的数组
 */
export const mergeArrayItemsByCommonProperty = <T extends ArrayItem, K extends keyof T>(
	arr1: T[],
	arr2: T[],
	propertyName: K
): T[] => {
	// 创建一个新的 Set，包含 arr1 中所有元素的指定属性值
	const propertyValues = new Set(arr1.map((item) => item[propertyName]));
	// 使用 filter 方法筛选出 arr2 中属性值存在于 Set 中的元素
	// 并合并两个数组的属性到返回的对象中
	return arr2
		.filter((item) => propertyValues.has(item[propertyName]))
		.map((item2) => {
			// 查找 arr1 中与当前 item2 相匹配的对象
			const matchingItem1 = arr1.find((item1) => item1[propertyName] === item2[propertyName]);
			// 合并两个对象的属性
			return { ...matchingItem1, ...item2 };
		});
};

/**
 * 根据两个数组中 根据相同的属性值 进行数组合并
 * @param {Array} arr1 要处理的数组1
 * @param {Array} arr2  要处理的数组2
 * @param {string} [key]  两个数组都存在的key，并且要处理的key
 * @returns {Array} 重组后的数组
 */
export const mergeArraysByKey = (
	arr1: ArrayItem[],
	arr2: ArrayItem[],
	key: string
): ArrayItem[] => {
	// 创建一个映射，用于存储 arr1 中元素的 id 与其索引的对应关系
	const map = new Map<number, ArrayItem>();
	arr1.forEach((item) => {
		map.set(item[key], item);
	});
	// 遍历 arr2，并与 arr1 中的元素合并
	arr2.forEach((item2) => {
		const item1 = map.get(item2[key]);
		if (item1) {
			// 如果 arr1 中存在相同 id 的元素，则合并它们
			map.set(item2[key], { ...item1, ...item2 });
		} else {
			// 如果不存在，则将 arr2 中的元素添加到映射中
			map.set(item2[key], item2);
		}
	});
	// 返回合并后的数组
	return Array.from(map.values());
};

/**
 * 使用递归过滤出需要渲染在左侧菜单的列表 (需剔除 isHide == true 的菜单)
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
 * 使用递归处理扁平化菜单, 方便添加动态路由(支持多级)
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
 * 使用递归处理扁平化菜单, 方便添加动态路由(支持多级)
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
 * 使用递归找出所有面包屑
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {object} result 处理后的结果
 * @returns {object} 路径 作为 key 的所有对象
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
 * 递归地收集数组中每个对象指定键的值
 * @param {Array} arr 要处理的数组列表
 * @param {string} [key] 要收集的键（默认为'name'）
 * @returns {Array} 存储所有指定键值的一维数组
 */
export const collectKeySpecifiedValues = (arr: any[], key: string = 'name'): string[] => {
	let values: string[] = [];
	arr.forEach((item) => {
		// 如果路由有指定的key属性，则添加到values数组中
		if (item.hasOwnProperty(key)) {
			values.push(item[key]);
		}
		// 如果路由有children属性，递归收集子路由的key值
		if (item.children) {
			values = values.concat(collectKeySpecifiedValues(item.children, key));
		}
	});
	return values;
};

/**
 * 根据name数组,对路由数组进行递归过滤
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
 * 根据name数组,对路由数组进行递归重组
 * @param {Array} routes 菜单列表
 * @param {Array} nameList name数组
 * @returns {Array} 递归重组后的name所在的对象 组成的新数组
 */
export const reduceRoutes = (routes: Array<any>, nameList: any): Array<any> => {
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
};

/**
 * 使用递归过滤需要缓存的菜单 name
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
 * 递归查找与路径匹配的菜单对象
 * @param {Array} menuList 菜单列表
 * @param {string} path 当前访问地址
 * @returns {Object | null} 对应的菜单对象，如果未找到则返回 null
 */
export const findMenuRecursivelyByPath = (menuList: Array<any>, path: string) => {
	for (const item of menuList) {
		if (item.path === path) return item;
		if (item.children) {
			const res = findMenuRecursivelyByPath(item.children, path);
			if (res) return res;
		}
	}
	return null;
};

/**
 * 递归查找具有指定键值对的列表对象
 * @param {Array} arr 对象数组，其中每个对象都可能有子对象
 * @param {any} value 要查找的键的预期值
 * @param {string} [key] 要查找的键名，默认为 'value'
 * @returns {Object | null} 如果找到具有指定键值对的对象则返回该对象，否则返回 null
 */
export const findObjectRecursivelyByKeyValue = (
	arr: Array<any>,
	value: any,
	key: string = 'value'
) => {
	for (const item of arr) {
		// 检查当前对象的指定键是否与给定的值匹配, 如果匹配，返回当前对象
		if (item[key] === value) return item;
		// 如果当前对象有子对象（children），递归地在子对象中查找
		if (item.children) {
			// 递归调用函数，搜索子对象数组
			const res = findObjectRecursivelyByKeyValue(item.children, value, key);
			if (res) return res;
		}
	}
	return null;
};

/**
 * 递归提升meta.title 提成到与 meta 同级
 * @param {Array} menuList 菜单列表
 * @returns {Array} 菜单
 */
export const elevateTitles = (menuList) => {
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
};

/**
 * 对象数组指定key转数字
 * @param {Array} arr 对象数组
 * @param {Array} numberKeys 对象数组内需要转数字的字符串组成的数组
 * @returns {Array} 处理后数组
 */
export const turnArrayKeys = (arr: Array<any>, numberKeys: Array<string> = []) => {
	return arr.map((item) => {
		// 指定key转数字
		if (numberKeys.length) {
			numberKeys.forEach((key) => {
				if (item[key] !== undefined) {
					item[key] = item[key] * 1;
				}
			});
		}
		return item;
	});
};

/**
 * 数组转对象(重复key会覆盖)
 * @param {Array} arr 对象数组
 * @param {string} [key] 作为对象的键的key
 * @returns {Object} 处理后对象
 */
export const arrayToObject = <T extends ArrayItem>(arr: T[], key: keyof T): Record<string, T> => {
	// 使用 reduce 方法将数组转换为一个对象
	return arr.reduce((acc: Record<string, T>, item: T) => {
		// 将当前项的指定键作为对象的键，当前项作为值
		acc[item[key]] = item;
		// 返回累加器对象
		return acc;
	}, {} as Record<string, T>); // 初始化累加器为一个空对象，并指定其类型
};

/**
 * 数组转对象(重复值存数组)(可用作字典)
 * @param {Array} arr 对象数组
 * @param {string} [key] 作为对象的键的key
 * @returns {Object} 返回处理后数组对象
 */
export const groupByKeyUsingObjectMethod = <T>(arr: T[], key: keyof T) => {
	return Object.groupBy(arr, (item: any) => item[key].toString());
};

/**
 * 数组转对象(重复值存数组)(可用作字典)
 * @param {Array} arr 对象数组
 * @param {string} [key] 作为对象的键的key
 * @returns {Object} 返回处理后数组对象
 */
export const groupByReduce = <T extends ArrayItem, K extends keyof T>(
	arr: T[],
	key: K
): { [key: string]: T[] } => {
	return arr.reduce((acc: { [key: string]: T[] }, item: T) => {
		// 使用typeof获取键的类型，然后创建字符串索引签名
		const itemKey = item[key] as string;
		// 如果累加器中还没有这个key的键，则创建一个新数组
		if (!acc[itemKey]) {
			acc[itemKey] = [];
		}
		// 将当前项添加到对应key的数组中
		acc[itemKey].push(item);
		return acc;
	}, {});
};

/**
 * 将数组项分组到对象中(重复值存数组)(可用作字典)
 * @param {Array} arr 数组对象
 * @param {Function} callback 回调函数，用于从数组元素中提取键值
 * @returns {Object} 返回处理后数组对象
 */
export const groupArrayItemsIntoObject = <T>(arr: T[], callback: (item: T) => string) => {
	const result: { [key: string]: T[] } = {};
	arr.forEach((item) => {
		const key = callback(item);
		if (!result[key]) {
			result[key] = [];
		}
		result[key].push(item);
	});

	return result;
};

/**
 * 统计函数(统计数量)
 * @param {Array} arr - 要进行统计的对象数组
 * @param {Function} generateKey - 回调返回一个用于统计的键
 * @returns {Array} 处理后的对象
 */
export function countBy<T>(arr: Array<T>, generateKey: (item: T) => any): { [key: string]: any } {
	const result: { [key: string]: number } = {};
	// 遍历数组
	for (const u of arr) {
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
 * 检查数组中是否存在重复项（基于回调函数生成的唯一键）
 * @param array 要检查的数组
 * @param callback 生成唯一键的回调函数，接收数组元素，返回字符串作为比较依据
 * @returns 如果存在重复项返回 `true`，否则返回 `false`
 */
export function hasDuplicates<T>(array: T[], callback: (item: T) => string): boolean {
	const seen = new Set<string>(); // 用于存储已见过的键
	return array.some((item) => {
		const key = callback(item); // 调用回调生成唯一键
		if (seen.has(key)) {
			return true; // 如果键已存在，说明有重复
		}
		seen.add(key); // 否则记录该键
		return false;
	});
}
