/**
 * @name 工具校验集合
 */

// verifyNumberIntegerAndFloat verifyNumber

/**
 * @description 输入小数或整数(不可以负数)
 * @param {String} val 当前值字符串
 * @param {Number} decimalPlaces 保留的小数位数，默认2位
 * @returns {String} 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat(val: string, decimalPlaces: number = 2): string {
	// 检查decimalPlaces是否为数字且在合理范围内
	if (typeof decimalPlaces !== 'number' || decimalPlaces < 0 || decimalPlaces > 20) {
		throw new Error('decimalPlaces must be a number between 0 and 20');
	}
	// 匹配空格
	let v = val.replace(/(^\s*)|(\s*$)/g, '');
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
 * @description 输入数字(小数、整数或负数)
 * @param {String} val 当前值字符串
 * @param {Number} decimalPlaces 保留的小数位数，默认2位
 * @returns {String} 返回处理后的字符串
 */
export function verifyNumber(val: string, decimalPlaces: number = 2): string {
	// 检查decimalPlaces是否为数字且在合理范围内
	if (typeof decimalPlaces !== 'number' || decimalPlaces < 0 || decimalPlaces > 20) {
		throw new Error('decimalPlaces must be a number between 0 and 20');
	}
	// 去除所有空格
	let v = val.replace(/\s+/g, '');
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
 * @description 正整数验证
 * @param {String} val 当前值字符串
 * @returns {String} 返回处理后的字符串
 */
export function verifyNumberInteger(val: string) {
	// 匹配空格
	let v = val.replace(/(^\s*)|(\s*$)/g, '');
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
 * @description 验证百分比（不可以小数）
 * @param {String} val 当前值字符串
 * @returns {String} 返回处理后的字符串
 */
export function verifyNumberPercentage(val: string): string {
	// 匹配空格
	let v = val.replace(/(^\s*)|(\s*$)/g, '');
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
 * @description 验证百分比（可以小数）
 * @param {String} val 当前值字符串
 * @returns {String} 返回处理后的字符串
 */
export function verifyNumberPercentageFloat(val: string): string {
	let v = verifyNumberIntegerAndFloat(val);
	// 数字超过100，赋值成最大值100
	v = v.replace(/^[1-9]\d\d{1,3}$/, '100');
	// 超过100之后不给再输入值
	v = v.replace(/^100\.$/, '100');
	// 返回结果
	return v;
}
/************************************************************************************************************************************* */

/**
 * @description 验证手机号
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export function phoneRule(val: string) {
	return (
		val && /^((12[0-9])|(13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|1,5-9]))\d{8}$/.test(val)
	);
}

/**
 * @description 验证座机号码
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const landlinePhoneRule = (val: string) => {
	// 使用正则表达式来验证中国大陆的座机号码格式
	// 区号是3到4位数字，电话号码是7到8位数字
	// 允许区号和电话号码之间有连字符或空格
	return !!val && /^(0\d{2,3}-?)?\d{7,8}$/.test(val);
};

/**
 * @description 验证网址格式(url地址)
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
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
 * @description 验证IP地址
 * @param val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
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
 * @description 验证邮箱地址
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export function emailRule(val: string) {
	// 使用复杂的正则表达式来验证邮箱格式
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		val
	);
}

/**
 * @description 验证邮政编码
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export function postalCodeRule(val: string) {
	return val && /^[1-9][0-9]{5}$/.test(val);
}

/**
 * @description 验证汉字
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const chineseCharacterRule = (val: string) => {
	return val && /[^\u4E00-\u9FA5]/.test(val);
};

/**
 * @description 验证数字
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const numberRule = (val: string) => {
	return val && /^[-]?\d+$/.test(val);
};

/**
 * @description 验证英文
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const englishRule = (val: string) => {
	return val && /^[a-zA-Z]+$/.test(val);
};

/**
 * @description 验证全特殊字符
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
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
 * @description 验证字母数字组合
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const alphanumericRule = (val: string) => {
	return val && /^[0-9a-zA-Z]*$/.test(val);
};

/**
 * @description 验证字母汉字组合
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export const alphabetChineseCharactersRule = (val: string) => {
	return val && /^[a-zA-Z\u4e00-\u9fa5]+$/.test(val);
};

/**
 * @description 验证身份证
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
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
 * @description 验证姓名
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export function fullNameRule(val: string) {
	return val && /^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(val);
}

/**
 * @description 验证车牌号
 * @param {String} val 当前值字符串
 * @returns {Boolean} 符合返回true，否则false
 */
export function numberplateRule(val: string) {
	return (
		val &&
		/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(
			val
		)
	);
}

/**
 * @description 验证时间格式是否为 24 小时制（HH:mm:ss）
 * @param {String} time 判断时间
 * @returns {Boolean} 符合返回true，否则false
 */
export const is24H = (time: string) => {
	const reg = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
	return time && reg.test(time);
};

/**************************************************************************************************************************************************** */

// element表单验证是否是手机号
export function checkPhoneNumber(rule: any, value: any, callback: any) {
	if (!value) callback(new Error('请输入手机号码'));
	if (!phoneRule(value) && !landlinePhoneRule(value)) callback(new Error('请输入正确的手机号码'));
	callback();
}

// 解决浮点数bug
export const roundNum = (num: number, decimalPlaces: number = 2) => {
	const factor = 10 ** decimalPlaces;
	return Math.round(num * factor) / factor;
};

/**
 * 去掉中文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyCnAndSpace(val: string) {
	// 匹配中文与空格
	let v = val.replace(/[\u4e00-\u9fa5\s]+/g, '');
	// 匹配空格
	v = v.replace(/(^\s*)|(\s*$)/g, '');
	// 返回结果
	return v;
}
/**
 * @description 去掉英文及空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyEnAndSpace(val: string) {
	// 匹配英文与空格
	let v = val.replace(/[a-zA-Z]+/g, '');
	// 匹配空格
	v = v.replace(/(^\s*)|(\s*$)/g, '');
	// 返回结果
	return v;
}
/**
 * @description 去除空格
 * @param {string} str - 字符串
 * @param {string} pos - 去除空格的位置
 * pos="both": 去除两边空格
 * pos="left": 去除左边空格
 * pos="right": 去除右边空格
 * pos="all": 去除所有空格 */
type Pos = 'both' | 'left' | 'right' | 'all';
export function trim(str: string, pos: Pos = 'both'): string {
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
 * 禁止输入空格
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyAndSpace(val: string) {
	// 匹配空格
	let v = val.replace(/(^\s*)|(\s*$)/g, '');
	// 返回结果
	return v;
}
/**
 * 匹配文字变色（搜索时）
 * @param val 当前值字符串
 * @param text 要处理的字符串值
 * @param color 搜索到时字体高亮颜色
 * @returns 返回处理后的字符串
 */
export function verifyTextColor(val: string, text = '', color = 'red') {
	// 返回内容，添加颜色
	let v = text.replace(new RegExp(val, 'gi'), `<span style='color: ${color}'>${val}</span>`);
	// 返回结果
	return v;
}
// 大额数字转换
export const numberFormat = (val: number | string): string | number => {
	const num = (val as any) * 1;
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
	return val;
};
/**
 * 数字转中文大写
 * @param val 当前值字符串
 * @param unit 默认：仟佰拾亿仟佰拾万仟佰拾元角分
 * @returns 返回处理后的字符串
 */
export function verifyNumberCnUppercase(val: any, unit = '仟佰拾亿仟佰拾万仟佰拾元角分', v = '') {
	// 当前内容字符串添加 2个0，为什么??
	val += '00';
	// 返回某个指定的字符串值在字符串中首次出现的位置，没有出现，则该方法返回 -1
	let lookup = val.indexOf('.');
	// substring：不包含结束下标内容，substr：包含结束下标内容
	if (lookup >= 0) val = val.substring(0, lookup) + val.substr(lookup + 1, 2);
	// 根据内容 val 的长度，截取返回对应大写
	unit = unit.substr(unit.length - val.length);
	// 循环截取拼接大写
	for (let i = 0; i < val.length; i++) {
		v += '零壹贰叁肆伍陆柒捌玖'.substr(val.substr(i, 1), 1) + unit.substr(i, 1);
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
 * @desc 手机号脱敏
 * @demo 155****8810  */
export function hidePhone(phone: string) {
	return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
}

/**
 * @desc 格式化电话号码
 * @demo 183-7983-6654 */
export function formatPhone(mobile: string, formatStr = '-') {
	return mobile.replace(/(?=(\d{4})+$)/g, formatStr);
}

/**
 * 登录账号 (字母开头，允许5-16字节，允许字母数字下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 登录账号正确
 */
export function verifyAccount(val: string) {
	// false: 登录账号不正确
	if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(val)) return false;
	// true: 登录账号正确
	else return true;
}

/**
 * 密码 (以字母开头，长度在6~16之间，只能包含字母、数字和下划线)
 * @param val 当前值字符串
 * @returns 返回 true: 密码正确
 */
export function verifyPassword(val: string) {
	// false: 密码不正确
	if (!/^[a-zA-Z]\w{5,15}$/.test(val)) return false;
	// true: 密码正确
	else return true;
}

/**
 * 强密码 (字母+数字+特殊字符，长度在6-16之间)
 * @param val 当前值字符串
 * @returns 返回 true: 强密码正确
 */
export function verifyPasswordPowerful(val: string) {
	// false: 强密码不正确
	if (
		!/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
			val
		)
	)
		return false;
	// true: 强密码正确
	else return true;
}

/**
 * 密码强度
 * @param val 当前值字符串
 * @description 弱：纯数字，纯字母，纯特殊字符
 * @description 中：字母+数字，字母+特殊字符，数字+特殊字符
 * @description 强：字母+数字+特殊字符
 * @returns 返回处理后的字符串：弱、中、强
 */
export function verifyPasswordStrength(val: string) {
	let v = '';
	// 弱：纯数字，纯字母，纯特殊字符
	if (/^(?:\d+|[a-zA-Z]+|[!@#$%^&\.*]+){6,16}$/.test(val)) v = '弱';
	// 中：字母+数字，字母+特殊字符，数字+特殊字符
	if (/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(val)) v = '中';
	// 强：字母+数字+特殊字符
	if (
		/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&\.*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&\.*]+$)(?![\d!@#$%^&\.*]+$)[a-zA-Z\d!@#$%^&\.*]{6,16}$/.test(
			val
		)
	)
		v = '强';
	// 返回结果
	return v;
}
