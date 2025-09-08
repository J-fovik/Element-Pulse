/**
 * @name 时间日期相关
 */

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
// 使用插件
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(duration);

/**
 * dayjs时间日期转换
 * @description format格式请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {string} value 传入日期时间，dayjs 格式
 * @param {string} format 需要转换的时间格式字符串（默认 YYYYMMDD）
 * @param {string} empty 需要转换的拼接符
 * @returns {string} 返回需要的时间字符串
 */
export const formatDayjs = (value: string, format: string = 'YYYYMMDD', empty = '-') => {
	if (value) {
		return dayjs(value).format(format);
	}
	return empty;
};

/**
 * 距离现在相对时间
 * @param {string} date 当前日期
 * @returns {string} 距离现在相对时间
 */
export const fromPastTime = (date: string) => {
	return dayjs().to(dayjs(date));
};

/**
 * 判断当前时间是否在开始-结束时间内
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 * @returns {boolean} 在范围内返回 true 否则 false
 */
export const isBetweenTime = (start: string, end: string) => {
	return dayjs(new Date()).isBetween(new Date(start), new Date(end));
};

// 查询时间是否相等
export const isSameTime = (newTime: string | Date, oldTime: string) => {
	return dayjs(newTime).isSame(oldTime, 'day');
};

/**
 * new Date时间日期转换
 * @description format 字符串随意，如 `YYYY-mm、YYYY-mm-dd`
 * @description format 季度："YYYY-mm-dd HH:MM:SS QQQQ"
 * @description format 星期："YYYY-mm-dd HH:MM:SS WWW"
 * @description format 几周："YYYY-mm-dd HH:MM:SS ZZZ"
 * @description format 季度 + 星期 + 几周："YYYY-mm-dd HH:MM:SS WWW QQQQ ZZZ"
 * @param {string} date 传入日期时间，new Date() 格式
 * @param {string} format 需要转换的时间格式字符串
 * @returns {string} 返回拼接后的时间字符串
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
 * 获取过去时间
 * @description format格式,请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {number} num 时间数量
 * @param {string} unit dayjs.ManipulateType的格式（可悬停在dayjs.ManipulateType上查看）
 * @param {string} format 需要转换的格式（默认 YYYY-MM-DD）
 * @returns {string} 返回需要的时间字符串
 */
export const getPastTime = (num: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD') => {
	return dayjs().subtract(num, unit).format(format);
};

/**
 * 获取过去时间
 * @description format格式,请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {number} num 时间数量
 * @param {string} unit dayjs.ManipulateType的格式（可悬停在dayjs.ManipulateType上查看）
 * @param {string} format 需要转换的格式（默认 YYYY-MM-DD）
 * @param {string} startOfDay 带可选 midnight 参数
 * @returns {string} 返回需要的时间字符串
 */
export const getPastStartOfTime = (
	num: number,
	unit: dayjs.ManipulateType,
	format = 'YYYY-MM-DD HH:mm:ss',
	startOfDay = false // 新增参数，是否设置为当天0点
) => {
	let time = dayjs().subtract(num, unit);
	if (startOfDay) {
		time = time.startOf('day'); // 设置为当天的0点
	}
	return time.format(format);
};

/**
 * 获取某个时间的前几分钟
 * @param {string} str 时间字符串
 * @param {number} num 时间数量
 * @returns {string} 返回需要的时间字符串
 */
export const getDateFrontMinutes = (str, num) => {
	var time = new Date(str);
	time.setMinutes(time.getMinutes() - num);
	return time;
};

/**
 * 获取某个时间的前几分钟
 * @param {string} str 时间字符串
 * @param {number} num 时间数量
 * @param {string} format 需要转换的格式（默认 YYYY-MM-DD HH:mm:ss）
 * @returns {string} 返回需要的时间字符串
 */
export const getDayjsFrontMinutes = (str, num, format: string = 'YYYY-MM-DD HH:mm:ss') => {
	return dayjs(str).subtract(num, 'minute').format(format);
};

/**
 * 获取未来时间
 * @description format格式,请查看：https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * @param {number} num 时间数量
 * @param {string} unit dayjs.ManipulateType的格式（可悬停在dayjs.ManipulateType上查看）
 * @param {string} format 需要转换的格式（默认 YYYY-MM-DD）
 * @returns {string} 返回需要的时间字符串
 */
export const getFutureTime = (num: number, unit: dayjs.ManipulateType, format = 'YYYY-MM-DD') => {
	return dayjs().add(num, unit).format(format);
};

/**
 * 日期时间转换
 * @param {string} value 传入日期时间
 * @param {string} empty 默认无值状态
 * @returns {string} 返回需要的时间字符串
 * @example
 * turnDateTime('20230405123045') // 2023-04-05 12:30:45
 */
export const turnDateTime = (value: string, empty = '-') => {
	if (value) {
		if (value.length <= 4) {
			return `${value.substring(0, 2)}:${value.substring(2, 4)}`;
		}
		if (value.length <= 8) {
			return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`;
		}
		return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(
			6,
			8
		)} ${value.substring(8, 10)}:${value.substring(10, 12)}:${value.substring(12, 14)}`;
	}
	return empty;
};

/**
 * 获取给定日期value所在的年份中的周数
 * @param {string} value 传入日期时间
 * @returns {number} 返回第几周数字值
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
 * 将时间转换为 `几秒前`、`几分钟前`、`几小时前`、`几天前`
 * @description param 10秒：  10 * 1000
 * @description param 1分：   60 * 1000
 * @description param 1小时： 60 * 60 * 1000
 * @description param 24小时：60 * 60 * 24 * 1000
 * @description param 3天：   60 * 60* 24 * 1000 * 3
 * @param {string} value 当前时间，new Date() 格式或者字符串时间格式
 * @param {string} format 需要转换的时间格式字符串（默认 YYYY-mm-dd）
 * @returns {string} 返回多久前，超过3天内返回日期
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
 * 获取当前时间对应的提示语
 * @returns {string} 提示语
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
 * new Date 获取现在时间
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
 * dayjs 获取现在时间
 * @returns {Array} [ '2024-08-05', '11:30:45', '星期一' ]
 */
export function getNowDayjs() {
	const date = dayjs().format('YYYY-MM-DD');
	const time = dayjs().format('HH:mm:ss');
	const week = dayjs().format('dddd');
	return [date, time, week];
}

/**
 * 获取两个日期之间的天数
 * @param {string} date1 日期1
 * @param {string} date2 日期2
 * @returns {number} 相差天数
 */
export function daysBetween(date1: any, date2: any) {
	const oneDay = 24 * 60 * 60 * 1000;
	return Math.round(Math.abs((date2 - date1) / oneDay));
}

/**
 * 解析身份证信息
 * @param {string} IdNumber 身份证号码
 * @returns {Object} {生日，性别}
 */
export const resolveIdNumberInfo = (IdNumber: string) => {
	const birthday = dayjs(IdNumber.substring(6, 14)).format('YYYY-MM-DD');
	const gender = (IdNumber.substring(16, 17) as any) % 2 === 0 ? '0' : '1';
	return { birthday, gender };
};

/**
 * 禁用时间段
 * @description 根据初始时间（startDate）和当前时间（current）的延后，确定一个时间段。
 * @param {any} current - 当前时间，通常是Date对象或dayjs对象。
 * @param {any} startDate - 初始时间，通常是Date对象或dayjs对象。
 * @param {number} num - 时间数量，表示从起始时间延后多少个单位时间。
 * @param {string} unit - dayjs.ManipulateType的时间单位，例如'day', 'month', 'year'等。
 * @returns {boolean} - 返回一个布尔值，表示该日期是否被禁用。（如果在给定的时间段内，则返回true，表示该日期被禁用；否则返回false。）
 */
export const disabledDate = (
	current: any,
	startDate: any,
	num: number,
	unit: dayjs.ManipulateType
) => {
	const start = dayjs(startDate); // 开始日期
	const end = start.add(num, unit).endOf('day');
	return current < start || current > end;
};

/**
 * 获取默认年份
 */
export const getGkYear = () => {
	// 获取当前日期
	const now = dayjs();
	// 以9月1日位 分界日期
	const boundaryDate = dayjs().month(8).date(1);
	// 比较当前日期是否大于分界日期
	if (now.isAfter(boundaryDate)) {
		// 当前日期大于分界日期，展示明年
		return now.add(1, 'year').year().toString();
	} else {
		// 当前日期小于等于分界日期，展示今年
		return now.year().toString();
	}
};

/**
 * 将秒数格式化为小时、分钟和秒的字符串形式。
 * @param {number} seconds - 需要格式化的秒数。
 * @returns {string} 返回格式化为 "HH:MM:SS" 的字符串。
 */
export const dayJsFormatTime = (seconds) => {
	// 使用 dayjs 将秒数转换为毫秒，然后格式化为 "HH:MM:SS"
	return dayjs.duration(seconds, 'second').format('HH:mm:ss');
};

/**
 * 将秒数格式化为小时、分钟和秒的字符串形式。
 * @param {number} seconds - 需要格式化的秒数。
 * @returns {string} 返回格式化为 "HH:MM:SS" 的字符串。
 */
export const formatTime = (seconds: number): string => {
	// 计算小时数
	const hours = Math.floor(seconds / 3600);
	// 计算分钟数（秒数除以3600取余后，再除以60）
	const minutes = Math.floor((seconds % 3600) / 60);
	// 计算剩余秒数（秒数对60取余）
	const secondsRemainder = Math.floor(seconds % 60);

	// 返回格式化的时间字符串，确保小时、分钟和秒都是两位数
	return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
		secondsRemainder < 10 ? '0' + secondsRemainder : secondsRemainder
	}`;
};

/**
 * 分钟转小时
 * @param {number} seconds - 需要格式化的分钟数。
 * @returns {string} 返回小时。
 */
export const secondsToMinutes = (seconds: any) => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	// 使用padStart确保秒数总是两位数
	return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 当前年减一年的年份数组
 */
export const getYearOptions = () => {
	const currentYear = new Date().getFullYear();
	return [currentYear - 1, currentYear - 2, currentYear - 3].map((o: any) => {
		return {
			value: String(o),
			label: String(o),
		};
	});
};

// 辅助函数：根据小时差判定颜色
const getColorByHours = (hours: number): string => {
	if (hours >= 24) return 'purple'; // 24小时以上 → 紫色
	if (hours >= 12) return 'red'; // 12-23小时 → 红色
	if (hours >= 6) return 'yellow'; // 6-11小时 → 黄色
	return ''; // 不足6小时 → 无特殊颜色（可自定义）
};

/**
 * 返回时间区间的颜色
 * @param date 传入日期
 * @returns 数字
 */
export const fromPastTimeWithColor = (date: string) => {
	const pastDate = dayjs(date);
	const now = dayjs();
	// 计算小时差（取整）
	const hoursDiff = Math.floor(now.diff(pastDate, 'minute') / 60);
	return getColorByHours(hoursDiff);
};
