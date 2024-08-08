/**
 * @name 获取本地时间
 */

import { useIntervalFn } from '@vueuse/core';

// 获取时间
export const useTime = (isUpdate: Boolean = false) => {
	const year = ref(0); // 年份
	const month = ref(0); // 月份
	const day = ref(0); // 日期
	const hour = ref<number | string>(0); // 小时
	const minute = ref<number | string>(0); // 分钟
	const second = ref<number | string>(0); // 秒
	const week = ref(''); // 星期几
	const nowTime = ref<string>(''); // 当前时间
	// 更新时间
	const updateTime = () => {
		console.log(11);
		const date = new Date();
		year.value = date.getFullYear();
		month.value = date.getMonth() + 1;
		week.value = '日一二三四五六'.charAt(date.getDay());
		day.value = date.getDate();
		hour.value =
			(date.getHours() + '')?.padStart(2, '0') ||
			new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
		minute.value =
			(date.getMinutes() + '')?.padStart(2, '0') ||
			new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
		second.value =
			(date.getSeconds() + '')?.padStart(2, '0') ||
			new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getSeconds());
		nowTime.value = `${year.value}年${month.value}月${day.value} ${hour.value}:${minute.value}:${second.value}`;
	};
	updateTime();
	// 轮训查询
	const { pause, resume } = useIntervalFn(() => updateTime(), 1000, {
		immediate: false,
	});
	onMounted(() => {
		if (isUpdate) {
			resume(); // 开始定时更新
		}
	});
	// 停止更新时间的函数
	const stopUpdateTime = () => {
		pause(); // 暂停定时更新
	};
	// 再次开始更新时间的函数
	const startUpdateTime = () => {
		resume(); // 开始定时更新
	};
	return {
		year,
		month,
		day,
		hour,
		minute,
		second,
		week,
		nowTime,
		stopUpdateTime,
		startUpdateTime,
	};
};
