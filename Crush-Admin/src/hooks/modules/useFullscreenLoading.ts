/**
 * @name 全局Loading
 */

import type { LoadingOptions } from 'element-plus';
import { ElLoading } from 'element-plus';
interface UseFullscreenLoading {
	<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, options?: LoadingOptions): (
		...args: Parameters<T>
	) => Promise<ReturnType<T>>;
}

interface LoadingInstance {
	close: () => void;
}

const DEFAULT_OPTIONS = {
	lock: true,
	text: '加载中...',
};

// 全屏加载
export const useFullscreenLoading: UseFullscreenLoading = (fn, options = {}) => {
	// 传入一个函数 fn，在它执行周期内，加上「全屏」Loading
	let loadingInstance: LoadingInstance;
	return async (...args) => {
		try {
			loadingInstance = ElLoading.service({ ...DEFAULT_OPTIONS, ...options });
			return await fn(...args);
		} finally {
			loadingInstance.close();
		}
	};
};
