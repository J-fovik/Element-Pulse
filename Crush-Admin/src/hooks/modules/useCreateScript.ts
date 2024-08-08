/**
 * @name 创建script标签
 */

// 创建text/javascript的script标签
export const useCreateScript = async (src: string) => {
	try {
		// 创建script标签
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		document.head.appendChild(script);

		// 等待script标签加载完成
		await new Promise<void>((resolve) => {
			script.onload = () => resolve();
			script.onerror = () => resolve();
		});
	} catch (error) {
		// 处理错误
		console.error('Error creating script:', error);
	}
};
