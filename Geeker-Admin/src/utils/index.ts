const mode = import.meta.env.VITE_ROUTER_MODE;
/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns {Number}
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

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