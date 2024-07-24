import { useBasicsState } from '@/hooks';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/elementPlus';
/**
 * @description 异步处理请求
 */
// 异步结果处理（初始化执行）
export const useAsyncData = <T = Array<any>>(api: () => Promise<any>, defaultValue = [] as T) => {
	// 加载状态
	const [loading, setLoading] = useBasicsState(true);
	// 定义赋值数据data
	const data = ref<T>(defaultValue);
	// 调用接口获取数据
	const initData = () => {
		// 打开loading
		if (loading.value === false) {
			setLoading(true);
			// showFullScreenLoading();
		}
		api()
			.then((response) => {
				// 成功后赋值结果
				data.value = response;
			})
			.finally(() => {
				// 完成后关闭loading
				setLoading(false);
				// tryHideFullScreenLoading();
			});
	};
	// 初始化执行
	initData();
	// 暴露数据及其方法
	return { data, loading, initData };
};

// 异步处理结果（不初始化执行）
export const useAsyncNoInitData = <T = Array<any>>(
	api: () => Promise<any>,
	defaultValue = [] as T
) => {
	// 加载状态
	const [loading, setLoading] = useBasicsState(true);
	// 定义赋值数据data
	const data = ref<T>(defaultValue);
	// 调用接口获取数据
	const initData = () => {
		if (loading.value === false) setLoading(true);
		api()
			.then((response) => {
				data.value = response;
			})
			.finally(() => {
				setLoading(false);
			});
	};
	// 暴露数据及其方法
	return { data, loading, initData };
};

// 异步返回监听数据变化
export const useAsyncWatchData = <T = Array<any>>(
	api: () => Promise<any>,
	{ watchSource, defaultValue = [] }: { watchSource: any; defaultValue: any } // 传入回调值，监听变化自动刷新数据（适用于；联动下拉筛选）
) => {
	// 加载状态
	const [loading, setLoading] = useBasicsState(true);
	// 定义赋值数据data
	const data = shallowRef<T>(defaultValue);
	// 调用接口获取数据
	const initData = () => {
		if (loading.value === false) setLoading(true);
		api()
			.then((response) => {
				data.value = response;
			})
			.finally(() => {
				setLoading(false);
			});
	};
	// 监听数据变化
	watch(watchSource, (value) => {
		// 监听变化重新请求数据
		if (value) initData();
		else data.value = defaultValue;
	});
	// 暴露数据及其方法
	return { data, loading, initData };
};
