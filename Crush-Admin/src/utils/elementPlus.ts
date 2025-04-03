/**
 * @name Element组件二次封装
 */

import {
	type MessageHandler,
	ElLoading,
	ElNotification,
	ElMessageBox,
	ElMessage,
} from 'element-plus';
import { isFunction } from '@/utils/type';

/* ****************************    Loading 加载   *********************************/

let loadingInstance: ReturnType<typeof ElLoading.service>;
let needLoadingRequestCount = 0;
// 开启 Loading
const startLoading = (text: any) => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: text,
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
export const showFullScreenLoading = (text = '加载中...') => {
	if (needLoadingRequestCount === 0) {
		startLoading(text);
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

/* ****************************   Notification 通知   *********************************/

/**
 * 二次封装 Notification 通知
 * @param {string} message 消息内容
 * @param {'success' | 'warning' | 'info' | 'error'} type type类型（默认为 success ）
 * @param {string} title 标题（默认为空）
 * @param {boolean} dangerouslyUseHTMLString 是否解析标签（默认为 false）
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

/* ****************************   Message 消息提示   *********************************/
interface MessageParams {
	/** 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `info` */
	type?: 'info' | 'success' | 'warning' | 'error';
	/** 自定义图标，该属性会覆盖 `type` 的图标 */
	icon?: any;
	/** 是否将 `message` 属性作为 `HTML` 片段处理，默认 `false` */
	dangerouslyUseHTMLString?: boolean;
	/** 消息风格，可选 `el` 、`antd` ，默认 `antd` */
	customClass?: 'el' | 'antd';
	/** 显示时间，单位为毫秒。设为 `0` 则不会自动关闭，`element-plus` 默认是 `3000` ，平台改成默认 `2000` */
	duration?: number;
	/** 是否显示关闭按钮，默认值 `false` */
	showClose?: boolean;
	/** 文字是否居中，默认值 `false` */
	center?: boolean;
	/** `Message` 距离窗口顶部的偏移量，默认 `20` */
	offset?: number;
	/** 设置组件的根元素，默认 `document.body` */
	appendTo?: string | HTMLElement;
	/** 合并内容相同的消息，不支持 `VNode` 类型的消息，默认值 `false` */
	grouping?: boolean;
	/** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
	onClose?: Function | null;
}

/**
 * 二次封装 Message 通知
 * @param {string} message 消息提示
 * @param {Object} params 参数对象
 * @returns ElMessage
 */
export const message = (
	message: string | VNode | (() => VNode),
	params?: MessageParams
): MessageHandler => {
	if (!params) {
		return ElMessage({
			message,
			customClass: 'pure-message',
		});
	} else {
		const {
			icon,
			type = 'info',
			dangerouslyUseHTMLString = false,
			customClass = 'antd',
			duration = 2000,
			showClose = false,
			center = false,
			offset = 20,
			appendTo = document.body,
			grouping = false,
			onClose,
		} = params;

		return ElMessage({
			message,
			type,
			icon,
			dangerouslyUseHTMLString,
			duration,
			showClose,
			center,
			offset,
			appendTo,
			grouping,
			// 全局搜 pure-message 即可知道该类的样式位置
			customClass: customClass === 'antd' ? 'pure-message' : '',
			onClose: () => (isFunction(onClose) ? onClose() : null),
		});
	}
};

/**
 * 关闭所有 `Message` 消息提示函数
 */
export const closeAllMessage = (): void => ElMessage.closeAll();

/* ****************************   ElMessageBox 确认模态框   *********************************/

/**
 * 二次封装 ElMessageBox.confirm 确认模态框
 * @param {string} content 提示内容（默认为 '提示内容'）
 * @param {'warning' | 'info' | 'success' | 'error'} type 类型（默认为 warning ）
 * @param {string} title 模态框标题（默认为空）
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

/* ****************************  ElMessageBox 弹出输入框   *********************************/

/**
 * 二次封装 ElMessageBox.prompt 弹出输入框
 * @param {string} tip 提示信息
 * @param {string} value 输入框内容
 * @returns ElMessageBox.prompt
 */
export function showPrompt(tip: any, value = '') {
	return ElMessageBox.prompt(tip, '', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		inputValue: value,
	});
}

/* ****************************   操作数据信息   *********************************/
/**
 * 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {string} message 提示信息 (必传)
 * @param {'' | 'warning' | 'info' | 'success' | 'error'} confirmType icon类型 (不必传,默认为 warning)
 * @returns {Promise}
 */
export const useHandleData = (
	api: (params: any) => Promise<any>,
	params: any = {},
	message: string,
	confirmType: HandleData.MessageType = 'warning'
) => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: confirmType,
			draggable: true,
		})
			.then(async () => {
				const res = await api(params);
				if (!res) return reject(false);
				ElMessage({
					type: 'success',
					message: `${message}成功!`,
				});
				resolve(true);
			})
			.catch(() => {
				// cancel operation
			});
	});
};
