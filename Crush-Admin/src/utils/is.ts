/**
 * @name is相关
 */

/**
 * @description 判断数据类型
 * @param {*} val 需要判断类型的数据
 * @returns {String} 该数据的数据类型
 */
export function isType(val: any) {
	if (val === null) return 'null';
	if (typeof val !== 'object') return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 判断值是否为某个类型
 * @param {unknown} val 需要判断类型的数据
 * @param {String} type 判断的类型
 * @returns {Boolean} 该数组是此类型为true，否则为false
 */
export function is(val: unknown, type: string) {
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description 是否为函数
 * @param {unknown} val 需要判断类型的数据
 * @returns {Boolean} 为 'Function' 返回true，否则为false
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, 'Function');
}

/**
 * @description 是否已定义
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 不为 'undefined' 返回true，否则为false
 */
export const isDef = <T = unknown>(val?: T): val is T => {
	return typeof val !== 'undefined';
};

/**
 * @description 是否未定义
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'undefined' 返回true，否则为false
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
	return !isDef(val);
};

/**
 * @description 是否为对象
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 不为 null 且为 'Object' 返回true，否则为false
 */
export const isObject = (val: any): val is Record<any, any> => {
	return val !== null && is(val, 'Object');
};

/**
 * @description 是否为时间
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'Date' 返回true，否则为false
 */
export function isDate(val: unknown): val is Date {
	return is(val, 'Date');
}

/**
 * @description 是否为数值
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'Number' 返回true，否则为false
 */
export function isNumber(val: unknown): val is number {
	return is(val, 'Number');
}

/**
 * @description 是否为AsyncFunction
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'AsyncFunction' 返回true，否则为false
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
	return is(val, 'AsyncFunction');
}

/**
 * @description 是否为promise
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'Promise' 且有 then 和 catch 的方法 返回true，否则为false
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
	return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description 是否为字符串
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'String' 返回true，否则为false
 */
export function isString(val: unknown): val is string {
	return is(val, 'String');
}

/**
 * @description 是否为boolean类型
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为 'Boolean' 返回true，否则为false
 */
export function isBoolean(val: unknown): val is boolean {
	return is(val, 'Boolean');
}

/**
 * @description 是否为数组
 * @param {*} val 需要判断类型的数据
 * @returns {Boolean} 为数组 返回true，否则为false
 */
export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}

/**
 * @description 是否客户端
 * @returns {Boolean} 为真返回true，否则为false
 */
export const isClient = () => {
	return typeof window !== 'undefined';
};

/**
 * @description 是否为浏览器
 * @returns {Boolean} 为真返回true，否则为false
 */
export const isWindow = (val: any): val is Window => {
	return typeof window !== 'undefined' && is(val, 'Window');
};

/**
 * @description 是否为 element 元素
 * @returns {Boolean} 为真返回true，否则为false
 */
export const isElement = (val: unknown): val is Element => {
	return isObject(val) && !!val.tagName;
};

/**
 * @description 是否为 null
 * @returns {Boolean} 为真返回true，否则为false
 */
export function isNull(val: unknown): val is null {
	return val === null;
}

/**
 * @description 是否为 null || undefined
 * @returns {Boolean} 为真返回true，否则为false
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
	return isUnDef(val) || isNull(val);
}

/**
 * @description 是否为 16 进制颜色
 * @returns {Boolean} 为真返回true，否则为false
 */
export const isHexColor = (str: string) => {
	return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};
