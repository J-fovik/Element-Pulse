/**
 * @name 通用函数
 */

import dayjs from 'dayjs';
import { numberToChineseCharacter } from 'pixiu-number-toolkit';
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
	if (value) {
		return Number.parseFloat(value as string).toFixed(scale);
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

/**
 * 手机号脱敏格式化
 * @param { string | number} phone 手机号码
 * @returns {string} 处理后的手机号码(155****8810)
 */
export function hidePhoneFormat(phone: string | number) {
	return phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}

/**
 * 驼峰命名格式化
 * @description 将下划线命名转换为驼峰命名:"user_name" ==> "userName"
 * @param {string} str 下划线命名的字符串
 * @returns {string} 驼峰命名字符串
 */
export const toHumpFormat = (str: string): string => {
	if (!str) return str;
	return str.replace(/\_(\w)/g, function (all, letter) {
		// 将中划线后面的第一个字母大写
		return letter.toUpperCase();
	});
};

/**
 * 数字转中文大写格式化
 * @param {*} value 当前值字符串
 * @param {string} unit 默认：仟佰拾亿仟佰拾万仟佰拾元角分
 * @param {string} v 初始值
 * @returns {string} 返回处理后的字符串
 */
export function numberCnUppercaseFormat(value: any, unit = '仟佰拾亿仟佰拾万仟佰拾元角分', v = '') {
	// 当前内容字符串添加 2个0，为什么??
	value += '00';
	// 返回某个指定的字符串值在字符串中首次出现的位置，没有出现，则该方法返回 -1
	let lookup = value.indexOf('.');
	// substring：不包含结束下标内容，substr：包含结束下标内容
	if (lookup >= 0) value = value.substring(0, lookup) + value.substr(lookup + 1, 2);
	// 根据内容 value 的长度，截取返回对应大写
	unit = unit.substr(unit.length - value.length);
	// 循环截取拼接大写
	for (let i = 0; i < value.length; i++) {
		v += '零壹贰叁肆伍陆柒捌玖'.substr(value.substr(i, 1), 1) + unit.substr(i, 1);
	}
	// 正则处理
	v = v
		.replace(/零角零分$/, '整')
		.replace(/零[仟佰拾]/g, '零')
		.replace(/零{2,}/g, '零')
		.replace(/零([亿|万])/g, '$1')
		.replace(/零+元/, '元')
		.replace(/亿零{0,3}万/, '亿')
		.replace(/^元/, '零元');
	// 返回结果
	return v;
}

/**
 * 数字转换为中文表示
 * @param {number | string} value 需要转换的数字
 * @returns {string} 返回转换后的中文数字字符串
 */
export const numberConvertChineseFormat = (value: any): string => {
	// 中文数字数组，对应阿拉伯数字 0-9
	const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
	// 单位数组，对应 '十', '百', '千'
	const units = ['', '十', '百', '千'];
	// 大单位数组，对应 '万', '亿', '兆'，这里 '兆' 作为最大的单位
	const bigUnits = ['', '万', '亿', '兆'];
	// 如果数字为 0，直接返回中文 '零'
	if (value === 0) {
		return chineseNumbers[0];
	}
	let result = ''; // 初始化结果字符串
	let zeroFlag = false; // 零标志，用于处理连续的零
	// 将数字转换为字符串并反转，方便从低位到高位处理
	const digits = value.toString().split('').reverse();
	for (let i = 0; i < digits.length; i++) {
		const digit = parseInt(digits[i], 10); // 获取当前位的数字
		const unitIndex = i % 4; // 计算单位索引，用于 '十', '百', '千'
		const bigUnitIndex = Math.floor(i / 4); // 计算大单位索引，用于 '万', '亿', '兆'
		// 如果当前位不是零
		if (digit !== 0) {
			// 拼接当前位的中文数字和单位，并添加到结果字符串前
			result = chineseNumbers[digit] + units[unitIndex] + result;
			zeroFlag = false; // 重置零标志
		} else {
			// 如果当前位是零，并且之前没有设置零标志
			if (!zeroFlag) {
				result = chineseNumbers[digit] + result; // 添加 '零' 到结果字符串前
				zeroFlag = true; // 设置零标志
			}
		}
		// 在每四位数字后添加大单位，并重置零标志
		if (unitIndex === 0 && i > 0) {
			result = bigUnits[bigUnitIndex] + result;
			zeroFlag = false;
		}
	}
	// 替换 '一十' 为 '十'
	result = result.replace('一十', '十');
	// 移除多余的 '零'，并确保结果字符串不以 '零' 结尾
	result = result.replace(/零+/g, '零').replace(/零$/, '');
	return result; // 返回转换后的中文数字字符串
};

/**
 * 数字转换为中文表示
 * @param {number | string} value 当前数字
 * @returns {string} 返回处理后的字符串
 */
export const numberToChineseFormat = (value: any) => {
	return numberToChineseCharacter(value);
};

/**
 * 大额数字格式化
 * @param {string | number} value 当前值字符串
 * @returns {string | number} 返回处理后的字符串
 */
export const numberFormat = (value: number | string): string | number => {
	const num = (value as any) * 1;
	if (num > 10000) {
		let sizesValue = '';
		if (num > 10000 && num < 99999999) {
			sizesValue = '万';
		} else if (num > 100000000) {
			sizesValue = '亿';
		}
		const i = Math.floor(Math.log(num) / Math.log(10000));
		return `${(num / Math.pow(10000, i)).toFixed(1)}${sizesValue}`;
	}
	return value;
};

/**
 * 大小写转换格式化
 * @param {string} str 待转换的字符串
 * @param {number} type 1:全大写 2:全小写 3:首字母大写
 * @returns {string} 转换后的字符串
 */
export function toCaseFormat(str: string, type: number = 1) {
	switch (type) {
		case 1:
			return str.toUpperCase();
		case 2:
			return str.toLowerCase();
		case 3:
			return str[0].toUpperCase() + str.substring(1).toLowerCase();
		default:
			return str;
	}
}

/**
 * 密码强度
 * @param {string} value 当前值字符串
 * @description 弱：纯数字，纯字母，纯特殊字符
 * @description 中：字母+数字 | 字母+特殊字符 | 数字+特殊字符
 * @description 强：字母+数字+特殊字符
 * @returns {string} 返回处理后的字符串：弱、中、强
 */
export function passwordStrengthFormat(value: string) {
	let v = '';
	// 弱：纯数字，纯字母，纯特殊字符
	if (/^(?:\d+|[a-zA-Z]+|[!@#$%^&\.*]+){6,16}$/.test(value)) v = '弱';
	// 中：字母+数字，字母+特殊字符，数字+特殊字符
	if (/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(value))
		v = '中';
	// 强：字母+数字+特殊字符
	if (
		/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
			value
		)
	)
		v = '强';
	// 返回结果
	return v;
}

/**
 * 去除空格格式化
 * @description both: 去除两边空格 | left: 去除左边空格 | right: 去除右边空格 | all: 去除所有空格
 * @param {string} str - 字符串
 * @param {'both' | 'left' | 'right' | 'all'} pos - 去除空格的位置
 * @returns {string} 返回处理后的字符串
 */
export function trimFormat(str: string, pos: Pos = 'both'): string {
	if (pos == 'both') {
		return str.replace(/^\s+|\s+$/g, '');
	} else if (pos == 'left') {
		return str.replace(/^\s*/, '');
	} else if (pos == 'right') {
		return str.replace(/(\s*$)/g, '');
	} else if (pos == 'all') {
		return str.replace(/\s+/g, '');
	} else {
		return str;
	}
}

/**
 * 输入小数或整数(不可以负数)
 * @param {string} value 当前值字符串
 * @param {number} decimalPlaces 保留的小数位数，默认2位
 * @returns {string} 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat(value: string, decimalPlaces: number = 2): string {
	// 检查decimalPlaces是否为数字且在合理范围内
	if (typeof decimalPlaces !== 'number' || decimalPlaces < 0 || decimalPlaces > 20) {
		throw new Error('decimalPlaces must be a number between 0 and 20');
	}
	// 匹配空格
	let v = value.replace(/(^\s*)|(\s*$)/g, '');
	// 只能是数字和小数点，不能是其他输入
	v = v.replace(/[^\d.]/g, '');
	// 以0开始只能输入一个
	v = v.replace(/^0{2}$/g, '0');
	// 保证第一位只能是数字，不能是点
	v = v.replace(/^\./g, '');
	// 小数只能出现1位
	v = v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
	// 小数点后面保留指定的位数
	v = v.replace(new RegExp(`^(\\-)?(\\d+)\\.(\\d{1,${decimalPlaces}}).*$`, 'g'), '$1$2.$3');
	// 返回结果
	return v;
}

/**
 * 输入数字(小数、整数或负数)
 * @param {string} value 当前值字符串
 * @param {number} decimalPlaces 保留的小数位数，默认2位
 * @returns {string} 返回处理后的字符串
 */
export function verifyNumber(value: string, decimalPlaces: number = 2): string {
	// 检查decimalPlaces是否为数字且在合理范围内
	if (typeof decimalPlaces !== 'number' || decimalPlaces < 0 || decimalPlaces > 20) {
		throw new Error('decimalPlaces must be a number between 0 and 20');
	}
	// 去除所有空格
	let v = value.replace(/\s+/g, '');
	// 只保留数字、负号和小数点，去掉其他字符
	v = v.replace(/[^-\d.]/g, '');
	// 处理负号，负号只能在开头，且只能出现一次
	if (v.includes('-')) {
		v = '-' + v.replace(/-/g, '');
	}
	// 处理前导零，如果开头是零且后面不是小数点，只保留一个零
	if (v.startsWith('0') && !v.startsWith('0.')) {
		v = v.replace(/^0+/, '0');
	}
	// 如果字符串以负号和零开头，并且不是"-0."的格式，则只保留"-0"
	if (v.startsWith('-0') && !v.startsWith('-0.')) {
		v = '-0';
	}
	// 确保字符串开头是负号、数字或"0."
	if (v.startsWith('.')) {
		v = '0' + v;
	}
	// 保证小数点只能出现一次
	if (v.includes('.')) {
		const parts = v.split('.');
		parts[1] = parts[1].substring(0, decimalPlaces); // 限制小数位数
		v = parts[0] + '.' + parts[1];
	}
	// 返回处理后的字符串
	return v;
}

/**
 * 正整数验证
 * @param {string} value 当前值字符串
 * @returns {string} 返回处理后的字符串
 */
export function verifyNumberInteger(value: string) {
	// 匹配空格
	let v = value.replace(/(^\s*)|(\s*$)/g, '');
	// 去掉 '.' , 防止贴贴的时候出现问题 如 0.1.12.12
	v = v.replace(/[\.]*/g, '');
	// 去掉以 0 开始后面的数, 防止贴贴的时候出现问题 如 00121323
	v = v.replace(/(^0[\d]*)$/g, '0');
	// 首位是0,只能出现一次
	v = v.replace(/^0\d$/g, '0');
	// 只匹配数字
	v = v.replace(/[^\d]/g, '');
	// 返回结果
	return v;
}

/**
 * 验证百分比（不可以小数）
 * @param {string} value 当前值字符串
 * @returns {string} 返回处理后的字符串
 */
export function verifyNumberPercentage(value: string): string {
	// 匹配空格
	let v = value.replace(/(^\s*)|(\s*$)/g, '');
	// 只能是数字和小数点，不能是其他输入
	v = v.replace(/[^\d]/g, '');
	// 不能以0开始
	v = v.replace(/^0/g, '');
	// 数字超过100，赋值成最大值100
	v = v.replace(/^[1-9]\d\d{1,3}$/, '100');
	// 返回结果
	return v;
}

/**
 * 验证百分比（可以小数）
 * @param {string} value 当前值字符串
 * @returns {string} 返回处理后的字符串
 */
export function verifyNumberPercentageFloat(value: string): string {
	let v = verifyNumberIntegerAndFloat(value);
	// 数字超过100，赋值成最大值100
	v = v.replace(/^[1-9]\d\d{1,3}$/, '100');
	// 超过100之后不给再输入值
	v = v.replace(/^100\.$/, '100');
	// 返回结果
	return v;
}

/**
 * 去掉中文及空格
 * @param {string} value 当前值字符串
 * @returns {string} 返回处理后的字符串
 */
export function verifyCnAndSpace(value: string) {
	// 匹配中文与空格
	let v = value.replace(/[\u4e00-\u9fa5\s]+/g, '');
	// 匹配空格
	v = v.replace(/(^\s*)|(\s*$)/g, '');
	// 返回结果
	return v;
}

/**
 * 去掉英文及空格
 * @param {string} value 当前值字符串
 * @returns {string} 返回处理后的字符串
 */
export function verifyEnAndSpace(value: string) {
	// 匹配英文与空格
	let v = value.replace(/[a-zA-Z]+/g, '');
	// 匹配空格
	v = v.replace(/(^\s*)|(\s*$)/g, '');
	// 返回结果
	return v;
}

// /**
//  * 金额格式化
//  * @param {*} value 传入的值
//  * @param {string} empty 默认无值状态 默认（''）
//  * @returns {string} 返回处理后的数据
//  */
// export function moneyFormat(value: any, empty = '') {
// 	if (value) {
// 		// 将输入值转换为字符串
// 		let newVal = value.toString();
// 		// 调用小数、整数或负数方法
// 		let v: any = verifyNumber(newVal);
// 		// 字符串转成数组
// 		v = v.toString().split('.');
// 		// \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
// 		v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// 		// 数组转字符串
// 		v = v.join('.');
// 		// 返回结果
// 		return v;
// 	}
// 	return empty;
// }
