/**
 * @name 网络状态
 * @returns 返回当前网络连接状态
 */

export function useNetworkStatus() {
	const isOnline = ref(navigator.onLine);

	// 更新网络状态
	const updateNetworkStatus = (event?: Event) => {
		isOnline.value = event ? navigator.onLine : !isOnline.value;
	};

	onMounted(() => {
		// 开始监听网络状态的变化
		window.addEventListener('online', updateNetworkStatus);
		window.addEventListener('offline', updateNetworkStatus);
	});

	onUnmounted(() => {
		// 移除监听网络状态的变化
		window.removeEventListener('online', updateNetworkStatus);
		window.removeEventListener('offline', updateNetworkStatus);
	});

	return { isOnline };
}
