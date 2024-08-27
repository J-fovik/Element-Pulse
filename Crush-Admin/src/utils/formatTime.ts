/**
 * @name 时间日期相关
 */

import dayjs from 'dayjs';

/**
 * @description dayjs时间日期转换
 * @description format格式请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {String} value 传入日期时间，dayjs 格式
 * @param {String} format 需要转换的时间格式字符串（默认 YYYYMMDD）
 * @param {String} empty 需要转换的拼接符
 * @returns {String} 返回需要的时间字符串
 */
export const formatDayjs = (value: string, format: string = 'YYYYMMDD', empty = '-') => {
	if (value) {
		return dayjs(value).format(format);
	}
	return empty;
};

/**
 * @description new Date时间日期转换
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @param {String} date 传入日期时间，new Date() 格式
 * @param {String} format 需要转换的时间格式字符串
 * @returns {String} 返回拼接后的时间字符串
 */
export function formatNewDate(date: Date, format: string): string {
	let we = date.getDay(); // 星期
	let z = getWeek(date); // 周
	let qut = Math.floor((date.getMonth() + 3) / 3).toString(); // 季度
	const opt: { [key: string]: string } = {
		'Y+': date.getFullYear().toString(), // 年
		'm+': (date.getMonth() + 1).toString(), // 月(月份从0开始，要+1)
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'M+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		'q+': qut, // 季度
	};
	// 中文数字 (星期)
	const week: { [key: string]: string } = {
		'0': '日',
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
		'5': '五',
		'6': '六',
	};
	// 中文数字（季度）
	const quarter: { [key: string]: string } = {
		'1': '一',
		'2': '二',
		'3': '三',
		'4': '四',
	};
	if (/(W+)/.test(format))
		format = format.replace(
			RegExp.$1,
			RegExp.$1.length > 1
				? RegExp.$1.length > 2
					? '星期' + week[we]
					: '周' + week[we]
				: week[we]
		);
	if (/(Q+)/.test(format))
		format = format.replace(
			RegExp.$1,
			RegExp.$1.length == 4 ? '第' + quarter[qut] + '季度' : quarter[qut]
		);
	if (/(Z+)/.test(format))
		format = format.replace(RegExp.$1, RegExp.$1.length == 3 ? '第' + z + '周' : z + '');
	for (let k in opt) {
		let r = new RegExp('(' + k + ')').exec(format);
		// 若输入的长度不为1，则前面补零
		if (r)
			format = format.replace(
				r[1],
				RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, '0')
			);
	}
	return format;
}

/**
 * @description 获取过去时间
 * @description format格式,请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {Number} num 时间数量
 * @param {String} unit dayjs.ManipulateType的格式（可悬停在dayjs.ManipulateType上查看）
 * @param {String} format 需要转换的格式（默认 YYYY-MM-DD）
 * @returns {String} 返回需要的时间字符串
 */
export const getPastTime = (num: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD') => {
	return dayjs().subtract(num, unit).format(format);
};

/**
 * @description 获取未来时间
 * @description format格式,请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {Number} num 时间数量
 * @param {String} unit dayjs.ManipulateType的格式（可悬停在dayjs.ManipulateType上查看）
 * @param {String} format 需要转换的格式（默认 YYYY-MM-DD）
 * @returns {String} 返回需要的时间字符串
 */
export const getFutureTime = (num: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD') => {
	return dayjs().add(num, unit).format(format);
};

/**
 * @description 日期时间转换
 * @description 例如，如果 value 是 "20230405123045"，函数将返回 "2023-04-05 12:30:45"。
 * @param {String} value 传入日期时间
 * @param {String} empty 默认无值状态
 * @returns {String} 返回需要的时间字符串
 */
export const turnDateTime = (value: string, empty = '-') => {
	if (value) {
		if (value.length <= 8) {
			return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
		} else {
			return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(
				6,
				8
			)} ${value.substring(8, 10)}:${value.substring(10, 12)}:${value.substring(12, 14)}`;
		}
	}
	return empty;
};

/**
 * @description 获取给定日期value所在的年份中的周数
 * @param {String} value 传入日期时间
 * @returns {Number} 返回第几周数字值
 */
export function getWeek(value: Date): number {
	let temptTime = new Date(value.getTime());
	// 周几
	let weekday = temptTime.getDay() || 7;
	// 周1+5天=周六
	temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
	let firstDay = new Date(temptTime.getFullYear(), 0, 1);
	let dayOfWeek = firstDay.getDay();
	let spendDay = 1;
	if (dayOfWeek != 0) spendDay = 7 - dayOfWeek + 1;
	firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
	let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000);
	let result = Math.ceil(d / 7);
	return result;
}

/**
 * @description 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @param {String} value 当前时间，new Date() 格式或者字符串时间格式
 * @param {String} format 需要转换的时间格式字符串（默认 YYYY-mm-dd）
 * @returns {String} 返回多久前，超过3天内返回日期
 */
export function formatPast(value: string | Date, format: string = 'YYYY-mm-dd'): string {
	// 传入格式处理、存储转换值
	let t: any, s: number;
	// 获取js 时间戳
	let time: number = new Date().getTime();
	// 是否是对象
	typeof value === 'string' || 'object' ? (t = new Date(value).getTime()) : (t = value);
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - t}`);
	if (time < 10000) {
		// 10秒内
		return '刚刚';
	} else if (time < 60000 && time >= 10000) {
		// 超过10秒少于1分钟内
		s = Math.floor(time / 1000);
		return `${s}秒前`;
	} else if (time < 3600000 && time >= 60000) {
		// 超过1分钟少于1小时
		s = Math.floor(time / 60000);
		return `${s}分钟前`;
	} else if (time < 86400000 && time >= 3600000) {
		// 超过1小时少于24小时
		s = Math.floor(time / 3600000);
		return `${s}小时前`;
	} else if (time < 259200000 && time >= 86400000) {
		// 超过1天少于3天内
		s = Math.floor(time / 86400000);
		return `${s}天前`;
	} else {
		// 超过3天
		let date = typeof value === 'string' || 'object' ? new Date(value) : value;
		return formatNewDate(date, format);
	}
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String} 提示语
 */
export function formatAxis() {
	let hours = new Date().getHours();
	if (hours < 6) return '凌晨好 🌟';
	else if (hours < 9) return '早上好 🌤️';
	else if (hours < 12) return '上午好 🌤️';
	else if (hours < 14) return '中午好 🌞';
	else if (hours < 17) return '下午好 ⛅';
	else if (hours < 19) return '傍晚好 🌥️';
	else if (hours < 22) return '晚上好 🌛';
	else return '夜里好 🌝';
}

/**
 * @description new Date 获取现在时间
 * @returns {Array} [ '2024-08-05', '11:30:45', '星期一' ]
 */
export function getNowNewDate() {
	const date = new Date();
	const sign2 = ':';
	const year = date.getFullYear(); // 年
	let month: string | number = date.getMonth() + 1; // 月
	let day: string | number = date.getDate(); // 日
	let hour: string | number = date.getHours(); // 时
	let minutes: string | number = date.getMinutes(); // 分
	let seconds: string | number = date.getSeconds(); //秒
	const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const week = weekArr[date.getDay()];
	// 给一位数的数据前面加 “0”
	if (month >= 1 && month <= 9) {
		month = '0' + month;
	}
	if (day >= 0 && day <= 9) {
		day = '0' + day;
	}
	if (hour >= 0 && hour <= 9) {
		hour = '0' + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
		minutes = '0' + minutes;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = '0' + seconds;
	}
	return [year + '-' + month + '-' + day, hour + sign2 + minutes + sign2 + seconds, week];
}

/**
 * @description dayjs 获取现在时间
 * @returns {Array} [ '2024-08-05', '11:30:45', '星期一' ]
 */
export function getNowDayjs() {
	const date = dayjs().format('YYYY-MM-DD');
	const time = dayjs().format('HH:mm:ss');
	const week = dayjs().format('dddd');
	return [date, time, week];
}

/**
 * @description 获取两个日期之间的天数
 * @param {String} date1 日期1
 * @param {String} date2 日期2
 * @returns {Number} 相差天数
 */
export function daysBetween(date1: any, date2: any) {
	const oneDay = 24 * 60 * 60 * 1000;
	return Math.round(Math.abs((date2 - date1) / oneDay));
}

/**
 * @description 解析身份证信息
 * @param {String} IdNumber 身份证号码
 * @returns {Object} {生日，性别}
 */
export const resolveIdNumberInfo = (IdNumber: string) => {
	const birthday = dayjs(IdNumber.substring(6, 14)).format('YYYY-MM-DD');
	const gender = (IdNumber.substring(16, 17) as any) % 2 === 0 ? '0' : '1';
	return { birthday, gender };
};
