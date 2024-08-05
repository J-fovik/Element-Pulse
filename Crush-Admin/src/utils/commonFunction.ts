/**
 * @name 通用函数
 */
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';

/**
 * @description 百分比格式化(应用于展示数据)
 * @param {String | Number} value 传入的值
 * @returns {String} 返回处理后的数据
 */
export const percentFormat = (value: string | number) => {
	return value ? `${value}%` : '-';
};

/**
 * @description 金额格式化(应用于展示数据)
 * @param {String} value 传入的值
 * @param {String} empty 无值状态返回值
 * @returns {String} 返回处理后的数据
 */
export const moneyFormat = (value: string, empty = '0') => {
	if (value) {
		const values = value.split('.');
		values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return values.join('.');
	}
	return empty;
};

/**
 * @description 文本格式化
 * @param {*} value 传入的值
 * @param {String} empty 无值状态返回值
 * @returns {String} 返回处理后的数据
 */
export const textFormat = (value: any, empty = '-') => {
	if (value === null || value === undefined || value === '') {
		return empty;
	} else {
		return value;
	}
};

/**
 * @description 小数格式化(应用于展示数据)
 * @param {String | Number} value 传入的值
 * @param {Number} scale 保留的位数（默认两位小数）
 * @param {String} empty 默认无值状态
 * @returns {String} 返回处理后的数据
 */
export const scaleFormat = (value: string | number | undefined, scale: number = 2, empty = '-') => {
	if (value) {
		return Number.parseFloat(value as string).toFixed(scale);
	}
	return empty;
};

/**
 * @description 时间格式化
 * @param {String} value 传入的值
 * @param {String} format 需要的格式
 * @param {String} empty 默认无值状态
 * @returns {String} 返回处理后的数据
 */
export const dayjsFormat = (value: string, format: string, empty = '-') => {
	if (value) {
		return dayjs(value).format(format);
	}
	return empty;
};

/**
 * @description 等待指定时间
 * @param {Number} millisecond 等待时长（毫秒）
 */
export const sleep = (millisecond: number): Promise<any> =>
	new Promise((resolve) => setTimeout(resolve, millisecond));

/**
 * @description 点击复制文本
 * @param {*} text 要复制的文本
 */
export const clipboard = (text: any) => {
	navigator.clipboard.writeText(text);
	ElMessage.success('复制成功，内容为：' + text);
};

/**
 * @description 随机数
 * @param {Number} length 需要的随机数长度
 * @returns 所需要长度的随机数
 */
export const randomString = (length: number) => {
	const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';
	for (let i = length; i > 0; --i) {
		result += str[Math.floor(Math.random() * str.length)];
	}
	return result;
};
