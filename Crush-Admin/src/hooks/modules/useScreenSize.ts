/**
 * @name 屏幕尺寸监听
 * @description 用于获取和监听浏览器窗口的尺寸变化
 * @returns {Object} 包含宽度和高度的响应式对象
 * @property {Ref<number>} width - 当前窗口宽度(响应式)
 * @property {Ref<number>} height - 当前窗口高度(响应式)
 * @example
 * // 在组件中使用
 * const { width, height } = useScreenSize()
 *
 * // 监听宽度变化
 * watch(width, (newVal) => {
 *   console.log('窗口宽度变为:', newVal)
 * })
 */
export function useScreenSize() {
	// 创建响应式引用存储窗口尺寸
	const width = ref(window.innerWidth);
	const height = ref(window.innerHeight);

	/**
	 * 更新窗口尺寸
	 * @private
	 */
	const updateSize = () => {
		// 更新当前窗口尺寸
		width.value = window.innerWidth;
		height.value = window.innerHeight;

		// 可以在此处添加调试信息
		// console.log(`窗口尺寸更新: ${width.value}x${height.value}`)
	};

	// 组件挂载时添加监听
	onMounted(() => {
		// 初始获取一次尺寸
		updateSize();

		// 添加resize事件监听
		window.addEventListener('resize', updateSize);

		// 注意：对于高频触发的事件，可以考虑添加防抖
		// window.addEventListener('resize', debounce(updateSize, 200))
	});

	// 组件卸载时移除监听
	onUnmounted(() => {
		// 移除resize事件监听
		window.removeEventListener('resize', updateSize);
	});

	// 返回响应式尺寸对象
	return {
		width,
		height,
	};
}
