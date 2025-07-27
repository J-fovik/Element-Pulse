/**
 * @name 定时器
 */

// 定时器
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
