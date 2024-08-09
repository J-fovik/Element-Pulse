/**
 * @name 通用函数
 */

import dayjs from 'dayjs';
import { verifyNumber } from '@/utils/toolsValidate';

/**
 * @description 百分比格式化(应用于展示数据)
 * @param {String | Number} value 传入的值
 * @returns {String} 返回处理后的数据
 */
export const percentFormat = (value: string | number) => {
	return value ? `${value}%` : '-';
};

/**
 * @description 金额格式化
 * @param {*} val 传入的值
 * @param {String} empty 默认无值状态 默认（''）
 * @returns {String} 返回处理后的数据
 */
export function moneyFormat(val: any, empty: string = '') {
	if (val) {
		// 将输入值转换为字符串
		let newVal = val.toString();
		// 调用小数、整数或负数方法
		let v: any = verifyNumber(newVal);
		// 字符串转成数组
		v = v.toString().split('.');
		// \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
		v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		// 数组转字符串
		v = v.join('.');
		// 返回结果
		return v;
	}
	return empty;
}

/**
 * @description 文本格式化
 * @param {} value 传入的值
 * @param {String} empty 无值状态返回值 默认（'-'）
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
 * @param {String} empty 默认无值状态 默认（'-'）
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
 * @param {String} empty 默认无值状态 默认（'-'）
 * @returns {String} 返回处理后的数据
 */
export const dayjsFormat = (value: string, format: string, empty = '-') => {
	if (value) {
		return dayjs(value).format(format);
	}
	return empty;
};
