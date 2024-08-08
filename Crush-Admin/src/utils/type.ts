/**
 * @name type类型相关
 */

/**
 * @description 获取数据类型
 * @param {unknown} value 需要判断类型的数据
 * @returns {String} 该数据的数据类型
 */
export function getType(value: any) {
	if (value === null) return 'null';
	if (typeof value !== 'object') return typeof value;
	else return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 判断值是否为某个数据类型
 * @param {unknown} value 需要判断类型的数据
 * @param {String} type 判断的类型
 * @returns {Boolean} 该数据是此类型 返回true，否则为false
 */
export function is(value: unknown, type: string) {
	return Object.prototype.toString.call(value) === `[object ${type}]`;
}

/**
 * @description 是否为数值
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Number' 返回true，否则为false
 */
export function isNumber(value: unknown) {
	return Object.prototype.toString.call(value) === '[object Number]';
}

/**
 * @description 是否为字符串
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'String' 返回true，否则为false
 */
export function isString(value: unknown) {
	return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * @description 是否为布尔值
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Boolean' 返回true，否则为false
 */
export function isBoolean(value: unknown) {
	return Object.prototype.toString.call(value) === '[object Boolean]';
}

/**
 * @description 是否为日期
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Date' 返回true，否则为false
 */
export function isDate(value: unknown) {
	return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * @description 是否为正则
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'RegExp' 返回true，否则为false
 */
export function isRegExp(value: unknown) {
	return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * @description 是否为set
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Set' 返回true，否则为false
 */
export function isSet(value: unknown) {
	return Object.prototype.toString.call(value) === '[object Set]';
}

/**
 * @description 是否为map
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Map' 返回true，否则为false
 */
export function isMap(value: unknown) {
	return Object.prototype.toString.call(value) === '[object Map]';
}

/**
 * @description 是否为函数
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Function' 返回true，否则为false
 */
export function isFunction<T = Function>(value: unknown): value is T {
	return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * @description 是否为异步函数
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'AsyncFunction' 返回true，否则为false
 */
export function isAsyncFunction<T = any>(value: unknown): value is Promise<T> {
	return Object.prototype.toString.call(value) === '[object AsyncFunction]';
}

/**
 * @description 是否为对象
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Object' 返回true，否则为false
 */
export function isObject(value: unknown): value is Record<any, any> {
	return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
/**
 * @description 是否为数组
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Array' 返回true，否则为false
 */
export function isArray(value: any): value is Array<any> {
	return value && Array.isArray(value);
}

/**
 * @description 是否为null
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Null' 返回true，否则为false
 */
export function isNull(value: unknown): value is null {
	return value === null;
}

/**
 * @description 是否未定义
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Undefined' 返回true，否则为false
 */
export function isUndefined(value: unknown): value is undefined {
	return value === undefined;
}

/**
 * @description 是否为promise
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Promise' 和 'Object' 且有 then 和 catch 的方法 返回true，否则为false
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
	return (
		Object.prototype.toString.call(value) === '[object Promise]' &&
		isObject(value) &&
		isFunction(value.then) &&
		isFunction(value.catch)
	);
}

/**
 * @description 是否为 null || undefined
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为 'Null' || 'Undefined' 返回true，否则为false
 */
export function isNullOrUnDef(value: unknown): value is null | undefined {
	return isUndefined(value) || isNull(value);
}

/**
 * @description 是否为客户端环境
 * @returns {Boolean} 为真 返回true，否则为false
 */
export const isClient = (): boolean => {
	// 检查window对象是否存在
	return typeof window !== 'undefined';
};

/**
 * @description 是否为浏览器
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为真返回true，否则为false
 */
export const isWindow = (value: any): value is Window => {
	return (
		typeof window !== 'undefined' && Object.prototype.toString.call(value) === '[object Window]'
	);
};

/**
 * @description 是否为 DOM 元素
 * @param {unknown} value 需要判断类型的数据
 * @returns {Boolean} 为'Object' 且 否具有tagName属性 返回true，否则为false
 */
export const isElement = (value: unknown): value is Element => {
	return isObject(value) && !!value.tagName;
};

/**
 * @description 检测数据是否为空数据
 * @param {unknown} data - 需要检测的数据
 * @returns {boolean} - 如果数据为空，返回true；否则返回false
 */
export const isEmpty = (data: unknown): boolean => {
	// 检查数据是否为空字符串、'undefined'、undefined、null或'null'
	if (
		data === '' ||
		data === 'undefined' ||
		data === undefined ||
		data === null ||
		data === 'null'
	) {
		// 如果满足上述条件之一，返回true
		return true;
	}
	// 如果数据不是直接表示的空值，尝试使用JSON.stringify转换数据
	// 检查转换后的字符串是否为空对象、空数组或只有一个空对象的数组
	if (
		JSON.stringify(data) === '{}' ||
		JSON.stringify(data) === '[]' ||
		JSON.stringify(data) === '[{}]'
	) {
		// 如果满足上述条件之一，返回true
		return true;
	}
	// 如果数据既不是直接表示的空值，也不是空对象或空数组，返回false
	return false;
};
