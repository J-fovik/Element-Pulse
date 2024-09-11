/**
 * @name 其他方法
 */

import { ElMessage } from 'element-plus';
import { useClipboard } from '@vueuse/core';
import clipboard from 'vue-clipboard3';

/**
 * 获取指定范围内的随机整数
 * @param {number} start - 开始范围
 * @param {number} end - 结束范围
 * @returns {number} 返回一个介于start和end之间的整数
 */
export function getRandomInteger(start = 0, end: number): number {
	const range = end - start;
	const random = Math.floor(Math.random() * range + start);
	return random;
}

/**
 * 获取指定范围内的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} 返回一个介于min和max之间的随机数
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * 生成随机字符串
 * @param {number} length 需要的随机数长度
 * @returns {string} 所需要长度的随机字符串
 */
export const randomStr = (length: number) => {
	const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += str[Math.floor(Math.random() * str.length)];
	}
	return result;
};

/**
 * 点击复制文本(vue-clipboard3)
 * @param {*} value 要复制的文本
 * @returns {Promise}
 */
export const copyText = (value: any) => {
	if (!value) return ElMessage.error('请输入文本');
	const { toClipboard } = clipboard();
	return new Promise((resolve, reject) => {
		try {
			//复制
			toClipboard(value);
			//下面可以设置复制成功的提示框等操作
			ElMessage.success('复制成功');
			resolve(value);
		} catch (e) {
			//复制失败
			ElMessage.error('复制失败');
			reject(e);
		}
	});
};

/**
 * 点击复制文本(浏览器自带)
 * @param {*} value 要复制的文本
 */
export const writeText = (value: any) => {
	if (!value) return ElMessage.error('请输入文本');
	navigator.clipboard.writeText(value);
	ElMessage.success('复制成功，内容为：' + value);
};

/**
 * 点击复制文本(vueuse/core)
 * @param {*} value 要复制的文本
 */
export const copy = (value: any) => {
	if (!value) return ElMessage.error('请输入文本');
	// copy为方法 ，isSupported为支不支持，text为返回粘贴内容，source为复制内容
	const { copy, isSupported, text } = useClipboard({ source: value });
	copy(value).then(() => {
		ElMessage.success('复制成功，内容为：' + value);
	});
	if (!isSupported) {
		ElMessage.error('当前浏览器不支持此功能');
	}
};

/**
 * 等待指定时间
 * @param {number} millisecond 等待时长（毫秒）
 * @returns {Promise}
 */
export const sleep = (millisecond: number): Promise<any> =>
	new Promise((resolve) => setTimeout(resolve, millisecond));

/**
 * 获取浏览器默认语言
 * @returns {string} 语言
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
 * 图片懒加载
 * @description data-xxx 属性用于存储页面或应用程序的私有自定义数据
 * @param {string} el dom 目标元素
 * @param {Array} arr 列表数据
 * @example
 * `<img :data-img="item.img" :data-key="index" :data-dom="index" />` ==> `lazyImg('[data-dom]', imgList.value)`
 */
export const lazyImg = (el: string, arr: EmptyArrayType) => {
	const io = new IntersectionObserver((res) => {
		res.forEach((v: any) => {
			if (v.isIntersecting) {
				const { img, key } = v.target.dataset;
				v.target.src = img;
				v.target.onload = () => {
					io.unobserve(v.target);
					arr[key]['loading'] = false;
				};
			}
		});
	});
	nextTick(() => {
		document.querySelectorAll(el).forEach((img) => io.observe(img));
	});
};

/**
 * 判断是否是移动端
 * @returns {boolean} 为真 返回true，否则为false
 */
export function isMobile() {
	if (
		navigator.userAgent.match(
			/('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
		)
	) {
		return true;
	} else {
		return false;
	}
}

/**
 * 去除字符串的HTML标签
 * @param {string} htmlString - 包含HTML标签的字符串
 * @returns {string} - 返回去除HTML标签后的纯文本内容
 * @example
 * removeHtmlTag(`<div>111</div>`) // 111
 */
export const removeHtmlTag = (htmlString: any) => {
	return new DOMParser().parseFromString(htmlString, 'text/html').body.textContent || '';
};

/**
 * 检查浏览器类型
 * @returns {string} - 浏览器类型
 */
export const detectBrowser = () => {
	const { userAgent } = navigator;
	if (userAgent.indexOf('Chrome') > -1) {
		return 'Chrome';
	} else if (userAgent.indexOf('Safari') > -1) {
		return 'Safari';
	} else if (userAgent.indexOf('Firefox') > -1) {
		return 'Firefox';
	} else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
		return 'IE';
	}
	return 'Unknown';
};

/**
 * 计算元素到文档顶部的距离
 * @description 确保DOM元素已经挂载后，再获取偏移量 (onMounted)
 * @param {HTMLElement} element - 要计算距离的DOM元素
 * @returns {number} - 元素到文档顶部的距离（以像素为单位）
 */
export function getElementOffsetTop(element: HTMLElement | null): number {
	let offsetTop = 0; // 初始化偏移量为0
	// 循环遍历元素的offsetParent，累加offsetTop值
	while (element) {
		offsetTop += element.offsetTop; // 累加当前元素的offsetTop
		element = element.offsetParent as HTMLElement | null; // 移动到下一个offsetParent
	}
	return offsetTop; // 返回累加后的总偏移量
}

/**
 * 生成唯一 uuid
 * @returns {string} - 返回一个格式化的UUID字符串
 */
export function generateUUID(): string {
	let uuid = ''; // 初始化uuid字符串为空
	for (let i = 0; i < 32; i++) {
		// 循环32次以生成32个16进制字符
		let random = (Math.random() * 16) | 0; // 生成一个0到15之间的随机数
		if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-'; // 在指定位置添加连字符
		// 根据位置调整随机数以符合UUID的版本4规范
		uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
	}
	return uuid; // 返回生成的UUID字符串
}

/**
 * 解决浮点数bug
 * @param {number} num 待转换的字符串
 * @param {number} decimalPlaces 保留的小数位数，默认2位
 * @returns {number} 处理后的数值
 */
export const roundNum = (num: number, decimalPlaces: number = 2) => {
	const factor = 10 ** decimalPlaces;
	return Math.round(num * factor) / factor;
};

/**
 * 节流函数，用于限制函数在特定时间内的执行次数。
 * @param {Function} callback - 需要节流的回调函数。
 * @param {number} wait - 节流的时间间隔，单位为毫秒(默认1000毫秒)。
 * @returns {Function} 返回一个节流后的函数。
 */
export const throttle = (callback, wait: number = 1000) => {
	// 用于存储setTimeout的返回值，以便后续可以取消它
	let timeout;
	// 记录上一次成功执行回调函数的时间
	let lastCallTime = 0;
	/**
	 * 返回的节流函数，可以接收任意数量的参数。
	 * @param {...*} args - 传递给回调函数的参数。
	 */
	return function (...args) {
		// 获取当前时间
		const now = Date.now();
		// 计算距离下一次可以执行回调函数的剩余时间
		const remainingTime = wait - (now - lastCallTime);

		// 如果剩余时间小于等于0，立即执行回调函数
		if (remainingTime <= 0) {
			callback(...args);
			// 更新上一次成功执行回调函数的时间
			lastCallTime = now;
		} else {
			// 如果还有剩余时间，取消之前的setTimeout，并重新设置一个新的
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				// 当剩余时间到达时，执行回调函数
				callback(...args);
				// 更新上一次成功执行回调函数的时间
				lastCallTime = Date.now();
			}, remainingTime);
		}
	};
};

/**
 * 防抖函数，确保在指定的时间内，即使多次触发，也只执行一次。
 * @param {Function} callback - 需要被防抖执行的函数。
 * @param {number} wait - 在执行回调函数前需要等待的时间，单位为毫秒(默认500毫秒)。
 * @returns {Function} 返回一个新函数，该函数被防抖。
 */
export const debounce = (callback, wait: number = 500) => {
	// 用于存储setTimeout的返回值，以便后续可以取消它
	let timeout;
	/**
	 * 返回的防抖函数，可以接收任意数量的参数。
	 * @param {...*} args - 传递给回调函数的参数。
	 */
	return function (...args) {
		// 如果有之前的setTimeout，则取消它
		if (timeout) clearTimeout(timeout);
		// 设置一个新的setTimeout，在指定时间后执行回调函数
		timeout = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};

/**
 * 并发控制函数，用于同时执行多个Promise，但同时保持执行的数量不超过指定限制。
 * @param {Promise[]} promises - 一个Promise对象的数组，每个Promise代表一个异步操作。
 * @param {number} limit - 同时执行的Promise的最大数量。
 * @returns {Promise} 返回一个新的Promise，当所有Promise执行完毕时，该Promise会被解决。
 */
export const concurrentPromises = (promises: any, limit: number = 2) => {
	// 返回一个新的Promise，其解决和拒绝回调将在所有Promise执行完毕后执行。
	return new Promise((resolve, reject) => {
		// 初始化计数器i和结果数组result。
		let i = 0;
		let result = [] as any;
		// 定义执行器函数，用于执行Promise并处理结果。
		const executor = () => {
			// 如果所有Promise都已执行完毕，则解决外层Promise。
			if (i >= promises.length) {
				return resolve(result);
			}
			// 获取当前Promise。
			const promise = promises[i++];
			// 解析Promise并处理成功和失败的情况。
			Promise.resolve(promise)
				.then((value) => {
					// 将成功结果添加到result数组中。
					result.push(value);
					// 如果还有Promise未执行完毕，则继续执行下一个Promise。
					if (i < promises.length) {
						executor();
					} else {
						// 如果所有Promise都已执行完毕，则解决外层Promise。
						resolve(result);
					}
				})
				.catch(reject); // 捕获并拒绝Promise执行过程中的任何错误。
		};
		// 循环调用执行器函数，直到达到限制或Promise数组长度。
		for (let j = 0; j < limit && j < promises.length; j++) {
			executor();
		}
	});
};

/**
 * 创建一个平滑的数字动画函数。
 * @param {number} from  动画开始时的数字值。
 * @param {number} to  动画结束时的数字值。
 * @param {number} [duration=1000]  动画持续的时间，以毫秒为单位。
 * @param {Function} onUpdate  动画过程中的回调函数，当动画更新时会被调用，可以用来更新UI或者执行其他操作。
 */
export const animation = ({ from, to, duration = 3000, onUpdate }: any) => {
	// 赋值开始数字
	let value = from;
	// 记录开始时间
	const start = Date.now();
	//  速度 = (终点 - 起点) / 总的时间
	const speed = (to - from) / duration;
	// 辅助函数，让value变化一点
	function _run() {
		// 时间
		const t = Date.now() - start;
		// 如果时间超过了运动时间
		if (t >= duration) {
			// 把value设置为终点
			value = to;
			// 存在并执行函数，传入当前值
			onUpdate && onUpdate(value);
			return;
		}
		// 改变value值 (form + 时间 + 速度)
		value = from + t * speed;
		// 存在并执行函数，传入当前值
		onUpdate && onUpdate(value);
		// 注册下一次变化
		requestAnimationFrame(_run);
	}
	_run();
};
