import { ElMessage } from 'element-plus';
/**
 * allArr 数组是否包含 arr 数组里面的所有内容
 * 判断两数组 字符串 是否相同
 * @param allArr
 * @param arr 需要判断的数组
 * @returns true/false
 */
export function everyIncludes(allArr: Array<any>, arr: Array<any>) {
	return arr.every((item) => allArr.includes(item));
}

/**
 * 数组删除某个值
 * @param arr 数组内容
 * @param val 要删除的值
 * @returns 删除后的数组
 */
export const arrRemoveVal = (arr: any, val: any) => {
	let index = arr.indexOf(val);
	if (index > -1) arr.splice(index, 1);
	return arr;
};

/**
 * 值是否存在于数组(可用于选值存数组 并 展示激活状态)
 * @param list 要判断的数组
 * @param key 要判断的值
 * @returns {boolean} - 如果数组中存在指定元素，返回 true；否则返回 false
 */
export const isExistArray = (list: any[], key: any): boolean => {
	return list.indexOf(key) > -1;
};

/**
 * 找到匹配的元素
 * @param options 要判断的数组
 * @param value 要判断的值
 * @returns 找出第一个符合条件的成员
 */
export const findOption = (options: Array<any>, value: string) => {
	return options.find((item) => item.value === value);
};

/**
 * 判断两数组 字符串 是否相同（用于按钮权限验证），数组字符串中存在相同时会自动去重（按钮权限标识不会重复）
 * @param news 新数据
 * @param old 源数据
 * @returns 两数组相同返回 `true`，反之则反
 */
export function judementSameArr(newArr: unknown[] | string[], oldArr: string[]): boolean {
	const news = removeDuplicate(newArr);
	const olds = removeDuplicate(oldArr);
	let count = 0;
	const leng = news.length;
	for (let i in olds) {
		for (let j in news) {
			if (olds[i] === news[j]) count++;
		}
	}
	return count === leng ? true : false;
}

/**
 * 数组、数组对象去重
 * 它接受两个参数：arr 是要去重的数组，attr 是一个可选参数，用于数组对象的去重，即去重时使用的键值。
 * @param arr 数组内容
 * @param attr 需要去重的键值（数组对象）
 * @returns
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
 * 判断数组或数组对象中所有属性是否为空,为空则删除该属性
 * @description
 * @param list 数组或数组对象
 * @returns 删除空值后的数组或数组对象
 */
export function handleEmptyObjects(list: EmptyArrayType) {
	const arr = [];
	for (const i in list) {
		const obj = list[i];
		const nonEmptyObj: any = {};
		for (const key in obj) {
			if (obj[key] !== '') {
				nonEmptyObj[key] = obj[key];
			}
		}
		if (Object.keys(nonEmptyObj).length > 0) {
			arr.push(nonEmptyObj);
		}
	}
	return arr;
}

/**
 * 判断数组对象中传入key是否为空,为空则删除对象
 * @param list 数组内容
 * @param key  要判断数组中是否存在的key(可不传，则是判断所有key)
 * @returns 删除空值后的数组对象
 */
export function filterObjectsByKey(list: Array<any>, key?: any) {
	if (key) {
		// 使用 filter 方法创建一个新数组，包含所有 key 属性非空且存在的元素
		return list.filter((item) => {
			// 检查当前对象中是否包含 key 属性
			return item.hasOwnProperty(key) && item[key] !== '';
		});
	} else {
		return list.filter((item) => {
			// 检查是否为对象
			if (typeof item === 'object' && item !== null) {
				// 检查是否为空对象
				if (Object.keys(item).length === 0) {
					return false; // 如果是空对象，则删除
				}
				// 检查所有属性是否为空
				return Object.values(item).every((value) => value !== '');
			}
			// 如果是对象且属性不为空，则保留
			return true;
		});
	}
}

/**
 * 统计函数
 * @param {Array} array - 要进行统计的数组
 * @param {Function} generateKey - 回调传入key
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
 * 调换顺序
 * @param arr 数组内容
 * @param index1  想要变动的该下标
 * @param index2  想要变成的下标
 * @returns 排好顺序的数组
 */
export function swapArray(arr: Array<any>, index1: any, index2: any) {
	arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	return arr;
}
// 上移
export function useArrayMoveUp(arr: Array<any>, index: number) {
	if (index == 0) {
		ElMessage.error('已经到最顶部了!!!');
		return arr;
	}
	swapArray(arr, index, index - 1);
}

// 下移
export function useArrayMoveDown(arr: Array<any>, index: number) {
	if (index >= arr.length - 1) {
		ElMessage.error('已经到最底部了!!!');
		return arr;
	}
	swapArray(arr, index, index + 1);
}

/**
 * 置顶或置底
 * @param arr 数组内容
 * @param index  想要变动的该下标
 * @param type  top 为置顶，bottom 为置底
 * @returns 排好顺序的数组
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
 * 数组的并集
 * @param arr1
 * @param arr2
 * @returns 并集数组的数组
 */
export function arrayUnion(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set([...arr1, ...arr2]));
}

/**
 * 数组的交集
 * @param arr1
 * @param arr2
 * @returns 交集数组的数组
 */
export function arrayCross(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set(arr1.filter((o) => arr2.includes(o))));
}

/**
 * 数组的差集
 * @param arr1
 * @param arr2
 * @returns 差集数组的数组
 */
export function arrayDiff(arr1: Array<any>, arr2: Array<any>) {
	return Array.from(new Set(arr1.concat(arr2).filter((o) => !arr1.includes(o) || !arr2.includes(o))));
}

/** 获取数组最大值 */
export const arrMaxValue = (arr: number[]) => {
	return Math.max.apply(null, arr);
};

/** 获取数组最小值 */
export const arrMinValue = (arr: number[]) => {
	return Math.min.apply(null, arr);
};

/** 数组求和 */
export const arrSummation = (arr: number[]) => {
	return arr.reduce((pre, cur) => pre + cur);
};

/** 获取数组平均值 */
export const averageValue = (arr: number[]) => {
	return arrSummation(arr) / arr.length;
};

// 数组扁平化
export const flattenArray = (arr: any) => {
	return arr.reduce((flat: any, toFlatten: any) => {
		return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
	}, []);
};

/**
 * 根据给定的函数将数组分成两个数组：一个满足条件，一个不满足
 * @param array 要处理的数组
 * @param fn  一个函数，用于测试数组中的每个元素
 * @returns  函数返回一个包含两个数组的数组，第一个数组是满足 predicate 函数的元素，第二个数组是不满足的元素
 */
export const partitionArray = <T>(array: T[], fn: (item: T) => boolean): [T[], T[]] => {
	return array.reduce(
		(acc: [T[], T[]], item: T) => {
			acc[fn(item) ? 0 : 1].push(item);
			return acc;
		},
		[[], []]
	);
};

/**
 * 重新组合数组
 * @param array 要处理的数组
 * @param groupByKey  用于分组的键
 * @param childName  要存储的子数组key的名称
 * @param mergeChildKey  要存储在子数组的键
 * @directive 根据key进行分组，并将另一个key存入子数组中
 * @directive 将[{yxmc: 'A', zySeq: 1 },{yxmc: 'B', zySeq: 2},{ yxmc: 'A', zySeq: 3 }],重组为 [{yxmc: 'A',children:[1,3]},{yxmc: 'B',children:[2]}] 的格式
 */
export const groupByAndMergeChildArrays = (array: Array<any>, groupByKey: any, childName: any, mergeChildKey: any) => {
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
 * 组成新数组
 * @param array1 要处理的数组1
 * @param array2  要处理的数组2
 * @param propertyName  两个数组有存在，并且要处理的key
 */
export const getIntersectionByProperty = <T extends ArrayItem, K extends keyof T>(array1: T[], array2: T[], propertyName: K): T[] => {
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
