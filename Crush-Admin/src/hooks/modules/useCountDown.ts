/**
 * @name 倒计时
 */

// 倒计时
export const useCountDown = (value: number, interval: number = 1000, callback?: () => void) => {
	// 初始值
	const second = ref(value);
	// 计时器
	const timer = shallowRef<any>(null);
	// 是否开始计时
	const isStart = computed(() => {
		return second.value !== value;
	});
	// 开始倒计时
	const startCountDown = () => {
		if (second.value > 0) {
			// 设置延时器
			timer.value = setTimeout(() => {
				// 时间--
				second.value = second.value - 1;
				// 重复调用
				startCountDown();
			}, interval);
		} else {
			// 重置计时器
			resetCountDown();
			// 执行回调
			if (callback) callback();
		}
	};
	// 重置计时器
	const resetCountDown = () => {
		clearTimeout(timer.value);
		second.value = value;
	};
	// 页面卸载时清除定时器
	onUnmounted(() => {
		if (timer.value !== null) clearTimeout(timer.value);
	});
	// 暴露API
	return { second, isStart, startCountDown, resetCountDown };
};
