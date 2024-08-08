/**
 * @name 对象相关方法
 */

const mode = import.meta.env.VITE_ROUTER_MODE;

/**
 * @description 从当前页面的URL中提取查询参数
 * @description www.baidu.com?id=1&type=2
 * @returns {Object} 返回一个包含参数键值对的对象 如：{id: "1", type: "2"}
 */
export const getQueryObject: () => Record<string, string> = () => {
	// 获取 URL 中的查询参数部分，兼容 hash 模式
	let search = window.location.search.substr(1) || window.location.hash.split('?')[1],
		obj: Record<string, string> = {};
	// 如果没有查询参数，返回空对象
	if (!search) return obj;
	// 将查询参数字符串分割为数组
	let paramsArr = search.split('&');
	// 遍历数组，将参数添加到对象中
	for (let i of paramsArr) {
		let arr = i.split('=');
		obj[arr[0]] = arr[1]; // 设置对象的键值对
	}
	// 返回包含查询参数的对象
	return obj;
};

/**
 * @description 将对象格式化为 URL 查询参数字符串
 * @param {Object} obj - 包含键值对的对象
 * @param {boolean} [tag = true] - 是否在返回的字符串中包含问号 (?)
 * @returns {String} URL查询参数的字符串 如："?id=1&type=2"  或 "id=1&type=2"
 */
export const formatObjToParamStr = (obj: object, tag: boolean = true): string => {
	// 存储的数组
	let data = [] as any,
		dStr = '';
	for (let key in obj) {
		data.push(`${key}=${obj[key]}`);
	}
	dStr = tag ? '?' + data.join('&') : data.join('&');
	return dStr;
};

/**
 * @description 将对象格式化为 URL 查询参数字符串
 * @param {Object} obj - 包含键值对的对象
 * @returns {String} URL查询参数的字符串 如："?id=1&type=2"
 */
export function queryParams(obj: object) {
	let q = [] as any;
	// 遍历传过来的obj参数
	for (const key in obj) {
		// 如果有key，以键值对的形式push到q里
		if (obj[key]) {
			// encodeURIComponent保证有值
			q.push(`${key}=${encodeURIComponent(obj[key])}`);
		}
	}
	// 中间用&拼接
	let r = q.join('&');
	// 用问号的形式拼接到接口上
	r = r ? '?' + r : '';
	return r;
}

/**
 * @description 从指定 URL 中获取指定名称的查询参数的值。
 * @description www.baidu.com?id=1&type=2
 * @param {String} name  要获取的查询参数的名称
 * @param {String} [url=window.location.href]  要解析的 URL 字符串（默认为当前页面 URL）
 * @returns {String} 查询参数的值，如果没有找到则返回空字符串 getUrlParam('id','www.baidu.com?id=1&type=2') // 1
 */
export const getUrlParam = (name: any, url: any) => {
	// 如果未提供 url 参数，则使用当前页面的 URL
	url = url || window.location.href;
	// 从 URL 中解析查询参数部分
	let search = url.includes('?') ? url.split('?')[1] : url.split('#')[1];
	// 如果没有查询参数，返回空字符串
	if (!search) return '';
	// 将查询参数字符串分割为数组
	let paramsArr = search.split('&');
	// 遍历数组，查找指定名称的查询参数
	for (let i of paramsArr) {
		let arr = i.split('=');
		if (arr[0] === name) {
			return arr[1]; // 返回查询参数的值
		}
	}
	// 如果没有找到指定名称的查询参数，返回空字符串
	return '';
};

/**
 * @description 判断两个对象是否相同
 * @param {Object} a 要比较的对象一
 * @param {Object} b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: object, b: object): boolean {
	// 检查两个对象是否都不为null或undefined
	if (!a || !b) return false;
	// 获取a对象的所有属性名称
	let aProps = Object.getOwnPropertyNames(a);
	// 获取b对象的所有属性名称
	let bProps = Object.getOwnPropertyNames(b);
	// 比较长度，如果长度不同，意味着属性数量不同
	if (aProps.length !== bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		// 获取当前遍历到的属性名称
		let propName = aProps[i];
		// 获取a对象中当前属性对应的值
		let propA = a[propName];
		// 获取b对象中当前属性对应的值
		let propB = b[propName];
		// 检查b对象自身是否拥有这个属性
		if (!b.hasOwnProperty(propName)) return false;
		// 如果两个属性值都是对象（包括数组）
		if (propA instanceof Object && propB instanceof Object) {
			// 递归地调用isObjectValueEqual来判断这两个对象是否相等
			if (!isObjectValueEqual(propA, propB)) return false;
			// 如果两个属性值不是对象，并且它们不相等
		} else if (propA !== propB) {
			return false;
		}
	}
	// 所有属性值都相等（包括嵌套对象）
	return true;
}

/**
 * @description 挑选对象属性
 * @param {any} obj - 要筛选的对象
 * @param {any[]} props - 在对象里筛选的键列表 如：['a', 'c'];
 * @returns {Object} 筛选后返回的新对象  如：{ a: 1, c: 3 }
 */
export const pickObjectKey = (obj: any, ...props: any[]): Object => {
	return Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));
};

/**
 * @description 检查对象是否包含指定属性。
 * @param {Object} obj - 要检查的对象
 * @param {String} key - 要检查的属性名
 * @returns {Boolean} 如果对象包含指定属性，返回 true；否则返回 false
 */
export function objectHasKey(obj: any, key: string) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * @description 对象深克隆
 * @param {Object} obj 源对象
 * @returns {Object} 克隆后的对象
 */
export function deepClone(obj: EmptyObjectType) {
	let newObj: EmptyObjectType;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (obj[attr] && typeof obj[attr] === 'object') {
			newObj[attr] = deepClone(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}

/**
 * @description 对象转JSON字符串
 * @param {Object} obj 源对象
 * @returns {String} JSON字符串
 */
export const toJSON = (obj: any) => {
	return JSON.stringify(obj, (_, value) => {
		switch (true) {
			case typeof value === 'undefined':
				return 'undefined';
			case typeof value === 'symbol':
				return value.toString();
			case typeof value === 'function':
				return value.toString();
			default:
				break;
		}
		return value;
	});
};

/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String} 路由地址 + params
 */
export function getUrlWithParams() {
	const url = {
		hash: location.hash.substring(1),
		history: location.pathname + location.search,
	};
	return url[mode];
}
