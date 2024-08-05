/**
 * @name Element常用表单校验规则
 */
/**
 * 输入小数或整数(不可以负数)
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function verifyNumberIntegerAndFloat(val: string) {
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
	// 小数点后面保留2位
	v = v.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
	// 返回结果
	return v;
}
/**
 * （输入）金额用 `,` 区分开
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
 */
export function moneyFormatComma(val: string) {
	// 调用小数或整数(不可以负数)方法
	let v: any = verifyNumberIntegerAndFloat(val);
	// 字符串转成数组
	v = v.toString().split('.');
	// \B 匹配非单词边界，两边都是单词字符或者两边都是非单词字符
	v[0] = v[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	// 数组转字符串
	v = v.join('.');
	// 返回结果
	return v;
}
/**
 * （输入）正整数验证
 * @param val 当前值字符串
 * @returns 返回处理后的字符串
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
// 手机号验证
export const phoneRule = (value: string) => {
	return value && /^1[3-9][0-9]{9}$/.test(value);
};
// 座机验证
export const landlinePhoneRule = (value: string) => {
	return value && /^(0[1-9]\d{1,2}-?)?\d{7,8}$/.test(value);
};
// element表单验证是否是手机号
export function checkPhoneNumber(rule: any, value: any, callback: any) {
	if (!value) callback(new Error('请输入手机号码'));
	if (!phoneRule(value) && !landlinePhoneRule(value)) callback(new Error('请输入正确的手机号码'));
	callback();
}