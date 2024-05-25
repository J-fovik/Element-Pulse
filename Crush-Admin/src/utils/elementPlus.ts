import { type LoadingOptions, ElLoading, ElNotification, ElMessageBox, ElMessage } from 'element-plus';
interface LoadingInstance {
	close: () => void;
}

// loading
export const elLoading = () => {
	// 默认配置
	const defaultOptions = {
		lock: true,
		text: '加载中...',
	};
	// loading实例
	let loadingInstance: LoadingInstance | null = null;
	// 开启loading
	const openElLoading = (options: LoadingOptions = {}) => {
		loadingInstance = ElLoading.service({
			...defaultOptions,
			...options,
		});
	};
	// 关闭loading
	const closeElLoading = () => {
		if (loadingInstance) {
			loadingInstance.close();
			loadingInstance = null;
		}
	};
	// 暴漏打开关闭loading方法
	return {
		openElLoading,
		closeElLoading,
	};
};

/**
 * 消息提示函数
 * @param message 消息内容
 * @param type type类型
 * @param dangerouslyUseHTMLString 是否解析标签
 */
export function toast(
	message: string | VNode,
	type: 'success' | 'warning' | 'info' | 'error' = 'success',
	dangerouslyUseHTMLString: boolean = false
) {
	ElNotification({
		message,
		type,
		dangerouslyUseHTMLString,
		duration: 3000,
	});
}
/**
 * 模态框提示函数
 * @param content 提示内容
 * @param type 类型
 * @param title 模态框标题
 */
export function showModal(content: string | VNode = '提示内容', type: 'warning' | 'info' | 'success' | 'error' = 'warning', title: string = '') {
	return ElMessageBox.confirm(content, title, {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type,
	});
}
/**
 * 弹出输入框
 * @param tip 提示信息
 * @param value 输入框内容
 * @returns
 */
export function showPrompt(tip: any, value = '') {
	return ElMessageBox.prompt(tip, '', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		inputValue: value,
	});
}
