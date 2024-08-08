/**
 * @name 通用函数
 */

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
 * @param {} value 传入的值
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
