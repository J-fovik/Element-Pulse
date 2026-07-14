/**
 * @name 通用函数
 */

import dayjs from 'dayjs';
type Pos = 'both' | 'left' | 'right' | 'all';

/**
 * 百分比格式化
 * @param {*} value 传入的值
 * @param {string} empty 无值状态返回值 默认（'-'）
 * @returns {string} 返回处理后的数据
 */
export const percentFormat = (value: any, empty = '-') => (value ? `${value}%` : empty);

/**
 * 文本格式化
 * @param {*} value 传入的值
 * @param {string} empty 无值状态返回值 默认（'-'）
 * @returns {string} 返回处理后的数据
 */
export const textFormat = (value: any, empty = '-') => (value ? value : empty);

/**
 * 文本单位格式化
 * @param {*} value 传入的值
 * @param {string} unit 有值带的单位
 * @param {string} empty 无值状态返回值 默认（'-'）
 * @returns {string} 返回处理后的数据
 */
export const unitFormat = (value: any, unit: string, empty = '-') => {
	return [undefined, null, , 0, '0'].includes(value) ? empty : value ? value + unit : empty;
};

/**
 * 小数格式化
 * @param {*} value 传入的值
 * @param {number} scale 保留的位数（默认两位小数）
 * @param {string} empty 默认无值状态 默认（'-'）
 * @returns {string} 返回处理后的数据
 */
export const scaleFormat = (value: any, scale: number = 2, empty = '-') => {
	// 检查是否为有效数字
	if (value !== null && value !== undefined && !isNaN(value) && value !== '') {
		const num = Number(value);
		if (!isNaN(num)) {
			return num.toFixed(scale);
		}
	}
	return empty;
};
/**
 * 时间格式化
 * @param {*} value 传入的值
 * @param {string} format 需要的格式默认（'YYYY-MM-DD'）
 * @param {string} empty 默认无值状态 默认（'-'）
 * @returns {string} 返回处理后的数据
 */
export const dateFormat = (value: any, format: string = 'YYYY-MM-DD', empty = '-') => {
	if (value) {
		return dayjs(value).format(format);
	}
	return empty;
};

/**
 * 金额格式化
 * @param {*} value 传入的值
 * @param {string} empty 默认无值状态 默认（''）
 * @returns {string} 返回处理后的数据
 */
export const moneyFormat = (value: any, empty = '0') => {
	if (value) {
		// 字符串转成数组
		const v = value.toString().split('.');
		v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		// 数组转字符串
		return v.join('.');
	}
	return empty;
};

/**
 * 电话号码格式化
 * @param {string | number} phone 手机号码
 * @param {string} empty 默认无值状态 默认（'-'）
 * @returns {string} 处理后的手机号码(183-7983-6654)
 */
export function phoneFormat(phone: string | number, empty = '-') {
	return phone.toString().replace(/(?=(\d{4})+$)/g, empty);
}
