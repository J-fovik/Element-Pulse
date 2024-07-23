import { ElLoading, ElNotification, ElMessageBox } from 'element-plus';

/* ****************************   全局请求 loading   *********************************/
let loadingInstance: ReturnType<typeof ElLoading.service>;
// 开启 Loading
const startLoading = () => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	});
};
// 结束 Loading
const endLoading = () => {
	loadingInstance.close();
};
// 显示全屏加载
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		startLoading();
	}
	needLoadingRequestCount++;
};
// 隐藏全屏加载
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
};

/* ****************************   消息提示函数   *********************************/
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

/* ****************************   确认模态框   *********************************/
/**
 * 确认模态框
 * @param content 提示内容
 * @param type 类型
 * @param title 模态框标题
 */
export function showModal(
	content: string | VNode = '提示内容',
	type: 'warning' | 'info' | 'success' | 'error' = 'warning',
	title: string = ''
) {
	return ElMessageBox.confirm(content, title, {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type,
	});
}

/* ****************************   弹出输入框   *********************************/
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
