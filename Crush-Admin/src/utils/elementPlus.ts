/**
 * @name Element相关
 */
import { ElLoading, ElNotification, ElMessageBox } from 'element-plus';

/* ****************************   全局请求 loading   *********************************/

let loadingInstance: ReturnType<typeof ElLoading.service>;
let needLoadingRequestCount = 0;
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

/**
 * @description 显示全屏加载
 */
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		startLoading();
	}
	needLoadingRequestCount++;
};

/**
 * @description 隐藏全屏加载
 */
export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
};

/* ****************************   消息提示函数   *********************************/

/**
 * @description 消息提示函数
 * @param {String} message 消息内容
 * @param {String} type type类型（默认为 success ）
 * @param {String} title 标题（默认为空）
 * @param {Boolean} dangerouslyUseHTMLString 是否解析标签（默认为 false）
 * @returns ElNotification
 */
export function toast(
	message: string | VNode,
	type: 'success' | 'warning' | 'info' | 'error' = 'success',
	title: string = '',
	dangerouslyUseHTMLString: boolean = false
) {
	ElNotification({
		message,
		type,
		title,
		dangerouslyUseHTMLString,
		duration: 3000,
	});
}

/* ****************************   确认模态框   *********************************/

/**
 * @description 确认模态框
 * @param {String} content 提示内容（默认为 '提示内容'）
 * @param {String} type 类型（默认为 warning ）
 * @param {String} title 模态框标题（默认为空）
 * @returns ElMessageBox.confirm
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
 * @description 弹出输入框
 * @param {String} tip 提示信息
 * @param {String} value 输入框内容
 * @returns ElMessageBox.prompt
 */
export function showPrompt(tip: any, value = '') {
	return ElMessageBox.prompt(tip, '', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		inputValue: value,
	});
}
