/**
 * @name 颜色主题相关
 */

import { ElMessage } from 'element-plus';

/**
 * hex颜色转rgb颜色
 * @param {string} str 颜色值字符串
 * @returns {string} 返回处理后的颜色值
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
 * rgb颜色转Hex颜色
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
 * 加深颜色值
 * @param {string} color 颜色值字符串
 * @param {number} level 加深的程度，限0-1之间
 * @returns {string} 返回处理后的颜色值
 */
export function getDarkColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * 变浅颜色值
 * @param {string} color 颜色值字符串
 * @param {number} level 加深的程度，限0-1之间
 * @returns {string} 返回处理后的颜色值
 */
export function getLightColor(color: string, level: number) {
	let reg = /^\#?[0-9A-Fa-f]{6}$/;
	if (!reg.test(color)) return ElMessage.warning('输入错误的hex颜色值');
	let rgb = hexToRgb(color);
	for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
	return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * 是否为 16 进制颜色
 * @param {string} str 需判断的字符串
 * @returns {boolean} 为真返回true，否则为false
 */
export const isHexColor = (str: string) => {
	return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/**
 * 获取随机颜色
 * @returns {string} 返回 # 拼接的六位颜色值
 */
export const randomColor = () => {
	return (
		'#' +
		Math.floor(Math.random() * 0xffffff)
			.toString(16)
			.padEnd(6, '0')
	);
};

/**
 * 设置高亮
 * @param {any} text  要判断是否高亮的文字
 * @param {any} keyword  高亮关键词
 */
export const setHightLightStr = (text: any, keyword: any) => {
	let hightLightStr = `<span style="color: #ffa864">$&</span>`;
	let reg = new RegExp(keyword, 'gi');
	return text.replace(reg, hightLightStr);
};
