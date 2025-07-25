/**
 * @name 规则校验集合
 */

/**
 * 验证手机号
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function phoneRule(val: string) {
	return (
		val && /^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(val)
	);
}

/**
 * 验证座机号码
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const landlinePhoneRule = (val: string) => {
	// 使用正则表达式来验证中国大陆的座机号码格式
	// 区号是3到4位数字，电话号码是7到8位数字
	// 允许区号和电话号码之间有连字符或空格
	return val && /^(0\d{2,3}-?)?\d{7,8}$/.test(val);
};

/**
 * 验证网址格式(url地址)
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function websiteRule(val: string) {
	return (
		val &&
		/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
			val
		)
	);
}

/**
 * 验证硬盘路径
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const hardDrivePath = (val: any) => {
	let windowsRegex = /^[a-zA-Z]:\\(?:[^\\\/:*?"<>|\r\n]+\\)*[^\\\/:*?"<>|\r\n]*$/;
	let unixRegex = /^\/(?:[^\/\0]+\/)*[^\/\0]*$/;
	// 检查是否是 Windows 路径
	if (windowsRegex.test(val)) {
		return true;
	}
	// 检查是否是 Unix/Linux/macOS 路径
	if (unixRegex.test(val)) {
		return true;
	}
	// 如果都不匹配，则路径格式不正确
	return false;
};

/**
 * 验证IP地址
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function iPAddressRule(val: string) {
	// 验证 IPv4 地址
	const ipv4Regex =
		/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	if (ipv4Regex.test(val)) return true;

	// 验证 IPv6 地址
	const ipv6Regex =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(:[0-9a-fA-F]{1,4}){1,6}|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
	if (ipv6Regex.test(val)) return true;
	// 返回 false 如果不是 IPv4 或 IPv6 地址
	return false;
}

/**
 * 验证邮箱地址
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function emailRule(val: string) {
	// 使用复杂的正则表达式来验证邮箱格式
	return (
		val &&
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			val
		)
	);
}

/**
 * 验证邮政编码
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function postalCodeRule(val: string): boolean {
	if (!val) return false;
	return /^[1-9]\d{5}$|^0[1-9]\d{4}$/.test(val);
}

/**
 * 验证汉字
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const chineseCharacterRule = (val: string) => {
	return val && /^[\u4e00-\u9fa5]+$/.test(val);
};

/**
 * 验证数字
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const numberRule = (val: string) => {
	return val && /^[-]?\d+$/.test(val);
};

/**
 * 验证英文
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const englishRule = (val: string) => {
	return val && /^[a-zA-Z]+$/.test(val);
};

/**
 * 验证全特殊字符
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const specialCharactersRule = (val: string) => {
	return (
		val &&
		/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/.test(
			val
		)
	);
};

/**
 * 验证字母数字组合
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const alphanumericRule = (val: string) => {
	return val && /^[0-9a-zA-Z]*$/.test(val);
};

/**
 * 验证字母汉字组合
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const alphabetChineseCharactersRule = (val: string) => {
	return val && /^[a-zA-Z\u4e00-\u9fa5]+$/.test(val);
};

/**
 * 验证身份证号码
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const identityCardRule = (val: string) => {
	return (
		val &&
		(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/.test(val) ||
			/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
				val
			))
	);
};

/**
 * 验证姓名，包括少数民族名字
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function fullNameRule(val: string) {
	return val && /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(val);
}

// /**
//  * 验证车牌号码
//  * @param {string} val 当前值字符串
//  * @returns {boolean} 符合返回true，否则false
//  */
// export function numberplateRule(val: string) {
// 	return (
// 		val &&
// 		/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
// 			val
// 		)
// 	);
// }

/**
 * 验证车牌号码（兼容燃油车、新能源车）
 * @param {string} val 车牌号
 * @returns {boolean} 符合返回 true，否则 false
 */
export function numberplateRule(val: string) {
	if (!val) return false;
	// 普通车牌（燃油车）：第1位省份 + 第2位A-Z + 后5位字母/数字（最后一位可挂学警港澳等）
	const standardPlate =
		/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳使领]?$/;
	// 新能源车牌（纯电动D/插电混动F）：6位，第6位是D/F
	const newEnergyPlate =
		/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z]([0-9]{5}[DF]|[DF][A-HJ-NP-Z0-9][0-9]{4})$/;
	return standardPlate.test(val) || newEnergyPlate.test(val);
}

/**
 * 验证时间格式为24小时制(HH:mm:ss)
 * @param {string} time 判断时间
 * @returns {boolean} 符合返回true，否则false
 */
export const twentyFourRule = (time: string) => {
	const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
	return time && reg.test(time);
};

/**
 * 验证强密码 (字母+数字+特殊字符，长度在6-16之间)
 * @param {string} val 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export function strongPasswordRule(val: string) {
	return /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
		val
	);
}

/**
 * 版本号
 * @param {string} version 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const validateVersion = (version: any) => {
	return /^\d+\.\d+\.\d+$/.test(version);
};

/**
 * 特殊字符正则
 * @param {string} version 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const specialRegExp = (val: any) => {
	return /[`~!@#$%^&*()_+<>?？\\:"{},.。，\/;'[\]]+/g.test(val);
};

/**
 * 正整数验证
 * @param {string} value 当前值字符串
 * @returns {boolean} 符合返回true，否则false
 */
export const positiveIntegerRule = (value: string): boolean => {
	// 首先，确保输入不是空字符串
	if (!value) {
		return false;
	}
	// 使用正则表达式来检查输入是否为正整数
	const isPositiveInteger = /^\d+$/.test(value);
	// 如果输入是正整数，进一步检查它是否在1到1000之间
	if (isPositiveInteger) {
		const numberValue = parseInt(value, 10);
		if (numberValue > 0 && numberValue <= 1000) {
			return true;
		}
	}
	// 如果输入不是正整数或不在指定范围内，返回false
	return false;
};

/**
 * 验证element表单输入是否为有效的手机号
 * @param {Object} rule - 验证规则对象，通常包含一些验证信息，如是否必填等
 * @param {string} value - 待验证的表单输入值
 * @param {Function} callback - 验证结束后的回调函数，用于通知验证结果
 * @returns {void} 该函数没有返回值，通过回调函数传递验证结果
 */
export function validatePhone(rule: any, value: any, callback: any) {
	if (!value) callback(new Error('请输入手机号'));
	if (!phoneRule(value)) callback(new Error('请输入正确的手机号'));
	callback();
}

/**
 * 验证element表单输入是否为有效的手机号或座机号
 * @param {Object} rule - 验证规则对象，通常包含一些验证信息，如是否必填等
 * @param {string} value - 待验证的表单输入值
 * @param {Function} callback - 验证结束后的回调函数，用于通知验证结果
 * @returns {void} 该函数没有返回值，通过回调函数传递验证结果
 */
export function validatePhoneOrLandline(rule: any, value: any, callback: any) {
	if (!value) callback(new Error('请输入手机号'));
	if (!phoneRule(value) && !landlinePhoneRule(value)) callback(new Error('请输入正确的手机号'));
	callback();
}
