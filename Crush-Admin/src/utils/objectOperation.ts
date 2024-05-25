/**
 * 从当前页面 URL 中获取查询参数，并返回一个包含参数键值对的对象。
 * @returns {Object} 包含查询参数的对象
 * www.baidu.com?id=1&type=2
 * @returns {Object} {id: "1", type: "2"}
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
 * 将对象格式化为 URL 查询参数字符串。
 * @param {Object} obj - 包含键值对的对象
 * @param {boolean} [tag=true] - 是否在返回的字符串中包含问号 (?)
 * @returns {string} 格式化后的 URL 查询参数字符串
 * @returns {string} "?id=1&type=2"  或 "id=1&type=2"
 */
export const formatObjToParamStr = (obj: any, tag: boolean = true) => {
	let data = [],
		dStr = '';
	for (let key in obj) {
		data.push(`${key}=${obj[key]}`);
	}
	dStr = tag ? '?' + data.join('&') : data.join('&');
	return dStr;
};

/**
 * 从指定 URL 中获取指定名称的查询参数的值。
 * www.baidu.com?id=1&type=2
 * @param {string} name - 要获取的查询参数的名称
 * @param {string} [url=window.location.href] - 要解析的 URL 字符串（默认为当前页面 URL）
 * @returns {string} 查询参数的值，如果没有找到则返回空字符串
 * @returns getUrlParam('id','www.baidu.com?id=1&type=2') // 1
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

// 将query对象转成url参数
export function queryParams(query: any) {
	let q = [];
	// 遍历传过来的query参数
	for (const key in query) {
		// 如果有key，以键值对的形式push到q里
		if (query[key]) {
			// encodeURIComponent保证有值
			q.push(`${key}=${encodeURIComponent(query[key])}`);
		}
	}
	// 中间用&拼接
	let r = q.join('&');
	// 用问号的形式拼接到接口上
	r = r ? '?' + r : '';
	return r;
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: any, b: any): boolean {
	if (!a || !b) return false;
	let aProps = Object.getOwnPropertyNames(a);
	let bProps = Object.getOwnPropertyNames(b);
	if (aProps.length !== bProps.length) return false;
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i];
		let propA = a[propName];
		let propB = b[propName];
		if (!b.hasOwnProperty(propName)) return false;
		if (propA instanceof Object && propB instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false;
		} else if (propA !== propB) {
			return false;
		}
	}
	return true;
}

/**
 * 挑选对象属性
 * @param obj 要筛选的对象
 * @param props 在对象里删选的key
 * @returns 筛选后返回的新对象
 */
export const pickObjectKey = (obj: any, ...props: any) => {
	return Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));
};

/**
 * 检查对象是否包含指定属性。
 * @param {Object} obj - 要检查的对象
 * @param {string} key - 要检查的属性名
 * @returns {boolean} 如果对象包含指定属性，返回 true；否则返回 false
 */
export function objectHasKey(obj: any, key: any) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
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

// 对象转JSON
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
