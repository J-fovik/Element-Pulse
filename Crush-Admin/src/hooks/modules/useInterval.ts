/**
 * @name 定时器
 * @description 提供可控制的定时器功能，支持手动启动和停止，组件卸载时自动清理
 * @param {Function} callback - 定时执行的回调函数
 * @param {number} delay - 执行间隔时间(毫秒)
 * @returns {Object} 定时器控制方法
 * @property {Function} start - 启动定时器
 * @property {Function} stop - 停止定时器
 * @example
 * // 基础用法
 * const { start, stop } = useInterval(() => {
 *   console.log('每秒执行一次')
 * }, 1000)
 *
 * // 手动控制
 * start() // 启动定时器
 * stop()  // 停止定时器
 *
 * @example
 * // 配合组件生命周期使用
 * onMounted(() => {
 *   start() // 组件挂载时启动
 * })
 *
 * onBeforeUnmount(() => {
 *   stop()  // 组件卸载前停止(useInterval已自动处理)
 * })
 */
export function useInterval(callback: () => void, delay: number) {
	// 存储定时器ID，用于清理
	let timer: number | any;

	/**
	 * 启动定时器
	 * @description 以指定间隔重复执行回调函数
	 * @throws 当delay参数不合法时会抛出错误
	 */
	const start = () => {
		// 先停止已有定时器，避免重复创建
		stop();

		// 参数校验
		if (delay <= 0) {
			console.warn(`useInterval: 无效的delay值 ${delay}，必须大于0`);
			return;
		}

		// 设置定时器
		timer = setInterval(callback, delay);

		// 开发环境调试日志
		if (import.meta.env.DEV) {
			console.debug(`定时器已启动，间隔: ${delay}ms`);
		}
	};

	/**
	 * 停止定时器
	 * @description 清除当前运行的定时器
	 */
	const stop = () => {
		if (timer) {
			clearInterval(timer);
			timer = null;

			// 开发环境调试日志
			if (import.meta.env.DEV) {
				console.debug('定时器已停止');
			}
		}
	};

	// 组件卸载时自动停止定时器
	onUnmounted(() => {
		stop();
	});

	// 返回控制方法
	return {
		start,
		stop,
	};
}
