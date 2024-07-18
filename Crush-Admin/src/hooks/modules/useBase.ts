import type { UnwrapRef } from 'vue';
type Dispatch<A> = (value: A) => void;
interface AnyObject {
	[key: string]: any;
}
// 状态
export const useBasicsState = <T>(
	value: T, // 默认值
	callback?: Dispatch<T> // 回调
): [Ref<UnwrapRef<T>>, Dispatch<T>] => {
	// 默认值
	const basicsState = ref<T>(value);
	// 修改默认值
	const setBasicsState = (newValue: T) => {
		// 判断修改结果不等于上一次
		if (basicsState.value !== newValue) {
			// 修改值
			basicsState.value = newValue as UnwrapRef<T>;
			// 存在后调事件调用
			if (callback) callback(newValue);
		}
	};
	// 暴露API
	return [basicsState, setBasicsState];
};
// new set
export const useBasicsSet = () => {
	const basicsSet = ref<Set<string>>(new Set([]));
	// 检查是否存在某个值
	const hasValue = (key: string) => {
		return basicsSet.value.has(key);
	};
	// 添加某个值
	const addValue = (key: string) => {
		if (!hasValue(key)) basicsSet.value.add(key);
	};
	// 删除某个值
	const deleteValue = (key: string) => {
		if (hasValue(key)) basicsSet.value.delete(key);
	};
	// 清空
	const clearValue = () => {
		basicsSet.value.clear();
	};
	// 暴露API
	return { basicsSet, hasValue, addValue, deleteValue, clearValue };
};
// new map
export const useBasicsMap = <T = AnyObject>(defaultValue = []) => {
	const basicsMap = ref<Map<string, T>>(new Map(defaultValue));
	// 获取成员总数
	const sizeValue = () => {
		return basicsMap.value.size;
	};
	// 检查是否存在某个值
	const hasValue = (key: string) => {
		return basicsMap.value.has(key);
	};
	// 查询某个值
	const getValue = (key: string) => {
		return basicsMap.value.get(key);
	};
	// 添加某个值
	const addValue = (key: string, value: T) => {
		basicsMap.value.set(key, value);
	};
	// 添加删除某个值
	const setValue = (key: string, value: T) => {
		if (hasValue(key)) {
			basicsMap.value.delete(key);
		} else {
			basicsMap.value.set(key, value);
		}
	};
	// 删除某个值
	const deleteValue = (key: string) => {
		basicsMap.value.delete(key);
	};
	// 清空
	const clearValue = () => {
		basicsMap.value.clear();
	};
	// 暴露API
	return { basicsMap, sizeValue, hasValue, setValue, getValue, addValue, deleteValue, clearValue };
};
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
